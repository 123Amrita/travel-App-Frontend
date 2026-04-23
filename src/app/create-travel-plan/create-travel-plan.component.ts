import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ItineraryModel } from '../models/itinerary-model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-travel-plan',
  standalone: true, 
  imports: [FormsModule, ProgressSpinnerModule, CommonModule, MessagesModule, ReactiveFormsModule, MatSidenavModule, MatTableModule, DropdownModule, 
    CalendarModule, DialogModule],
  templateUrl: './create-travel-plan.component.html',
  styleUrl: './create-travel-plan.component.css'
})
export class CreateTravelPlanComponent {
    
    public travelForms! : FormGroup;
    public places= [{name: "Goa"},
                    {name: "Kolkata"},
                    {name: "Bangalore"},
                    {name: "Chennai"},
                    {name: "Delhi"},
                    {name: "Ahmedabad"},
                    {name: "Trivanduram"},
                    {name: "Bhuwaneshwar"}
    ];

    public destinations= [{name: "Triund Trek, Himachal Pradesh", picture: "assets/triund_trek_images.jpg"},
                          {name: "Valley of Flowers Trek, Uttarakhand", picture: "assets/valey-of-flowers.png"},
                          {name: "Great Lakes Trek, Kashmir", picture: "assets/Kashmir-Great-Lakes-trek-Shepherd-Traveller.jpg"},
                          {name: "Nongriat Trek, Meghalaya", picture: "assets/Nongriat-Double-Decker-Root-Bridge-Trek.webp"},
                          {name: "Hampta Pass Trek, Himachal Pradesh", picture: "assets/Hampta-Pass-Himachal.webp"},
                          {name: "Chembra Peak, Kerala", picture: "assets/chembra.jpg"},
                          {name: "Dzongri – Goecha La Trek, Sikkim", picture: "assets/Goecha-La-Trek-Sikkim.webp"},
                          {name: "Markha Valley Trek, Ladakh", picture: "assets/Markha.jpg"},
                          {name: "Rajmachi Trek, Maharashtra", picture: "assets/rajmachi.jpg"},
                          {name: "Sandakphu Phalut Trek, West Bengal", picture: "assets/+(2).avif"}

      ];
    public difficultyOptions= [{name: "Hard"},
                        {name: "Moderate"},
                        {name: "Easy"}
    ];
    public groupTypeOptions= [{name: "Single"},
                       {name: "Couple"},
                       {name: "Group of 3"},
                       {name: "Group of 4 or more than 4"}
    ];
    public stayPreferenceOptions= [{name: "Camping"},
                            {name: "Homestay"},
                            {name: "Hotels"}

    ];
    public foodPreferenceOptions= [{name: "Veg"}, {name: "Non-veg"}, {name: "No preference"}];
    public AIOverview: any;
    public trekPic: string= "";
    public destinationName: String= "";
    public spinnerOn: boolean= true;

    constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router){}

    ngOnInit(){
      this.spinnerOn= false;
      this.travelForms= this.formBuilder.group({
        travelName: ['', [Validators.required, Validators.minLength(3)]],
        source: ['', Validators.required],
        destination: ['', Validators.required],
        startDate: [new Date() as Date, Validators.required],
        endDate: [new Date() as Date, Validators.required],
        totalBudget: ['', [Validators.required, Validators.min(1000)]],
        difficulty: ['', Validators.required],
        groupType: ['', Validators.required],
        stayPreference: ['', Validators.required],
        foodPreference: ['', Validators.required],
        specialNotes: ['', Validators.required]
      }, { validators: this.dateValidator });

      this.trekPic= "";
      if(this.authService.storedDestination){
      const selected= this.destinations.find( x => x.name === this.authService.storedDestination);
      if(selected){
         this.travelForms.patchValue({destination : selected});
         this.showTrekDetails();
      }
      };
      const savedData = this.authService.getFormData();

      if (savedData) {
      this.travelForms.patchValue(savedData);
      this.travelForms.patchValue({startDate : new Date(savedData.startDate) as Date});
      this.travelForms.patchValue({endDate : new Date(savedData.endDate) as Date});
      }
    }

    showTrekDetails(){
       let trek= this.travelForms.value.destination.name;
       let param= { "destination": trek};
       this.destinationName= trek;
       this.trekPic= this.destinations.filter( x => x.name === trek)[0].picture;
       this.authService.getTrekDetails(param).subscribe( (res: any) => {
         console.log(res);
         this.AIOverview= JSON.parse(res.overview).travelInfo[0];
       })
    }

    private formatText(text: string) {
    // Replace **bold** with <strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong style=`font-size: 20px;font-style: bold;color: #030136;`>$1</strong>');

    // Replace lines starting with • into <li> items
    html = html
      .split('\n')
      .map(line => {
        if (line.trim().startsWith('*')) {
          return `<li>${line.trim().substring(1).trim()}</li>`;
        }
        if (line.trim().startsWith('+')) {
          return `<li>${line.trim().substring(1).trim()}</li>`;
        }
        return `<p>${line.trim()}</p>`;
      })
      .join('');

    // Wrap bullet points in <ul>
    html = html.replace(/(<li>.*<\/li>)+/g, match => `<ul>${match}</ul>`);

    // Sanitize HTML before binding
    return html;
  }

  onSubmit(){
    if (this.travelForms.invalid) {
    this.travelForms.markAllAsTouched();
    return;
    }
    if(this.travelForms.valid){
      this.authService.setFormData(this.travelForms.value);
      this.travelForms.value.startDate= this.travelForms.value.startDate.toString();
      this.travelForms.value.endDate= this.travelForms.value.endDate.toString();
      this.spinnerOn= true;
      this.authService.createItinerary(this.travelForms.value).subscribe((res : any) => {
        console.log(res);
        //this.authService.itineraryData= res.overview;
        //let overview= res.overview.split('\n\n```json')[1];
        //let trek= overview.split('```\n\n**')[0];
        if(res){
        this.spinnerOn= false;
        this.authService.itineraryData= JSON.parse(res.overview);
        console.log(this.authService.itineraryData);
        this.authService.travelData= this.travelForms.value;
        this.router.navigate(['/iteneraryPage']);
        }    
      }
    )
  }
}

createTravel(){
    this.router.navigate(['/createTravel']);
  }

  goToDashboard(){
    this.router.navigate(['/usersList'])
  }

  dateValidator(group: FormGroup) {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;

  if (start && end && end < start) {
    return { dateInvalid: true };
  }
  return null;
}
}
