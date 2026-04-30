import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../services/auth.service';
import { ItineraryModel } from '../models/itinerary-model';
import { MatTableModule } from '@angular/material/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-itinerary-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MessagesModule, ReactiveFormsModule, MatSidenavModule, MatTableModule, DropdownModule, 
    CalendarModule, ProgressSpinnerModule,DialogModule, RouterModule],
  templateUrl: './itinerary-page.component.html',
  styleUrl: './itinerary-page.component.css'
})
export class ItineraryPageComponent {
  trekPic: string= "";
  trekName: string= "";
  message: string= "";
  dayCards: any[]=[];
  public spinnerOn: boolean= true;

  constructor(public router: Router, public authService: AuthService){}

  overview: string="";

  ngOnInit(){
    this.spinnerOn= false;

    if(!this.authService.itineraryFromDashboard){

    if(this.authService.travelData){
    this.trekName= this.authService.travelData.destination.name;
    }
    if(this.authService.itineraryData){
    this.dayCards= this.authService.itineraryData.itinerary;
    }

    }else{

    if(this.authService.travelData){
    this.trekName= this.authService.travelData.destination.name;
    }
    if(this.authService.itineraryData){
    this.dayCards= this.authService.itineraryData;
    }

    }

    //this.authService.travelData?.forEach( (x : any)=> {
    let start= this.authService.travelData?.startDate;
    let end= this.authService.travelData?.endDate;
    if(start && end){
          let date1= new Date(end);
          let date2= new Date(start);
          this.authService.travelData.days= (date1.getDate()- date2.getDate());
        };
  }

  saveItinerary(){
    this.authService.travelData.AIOverview= JSON.stringify(this.authService.itineraryData.itinerary);
    this.spinnerOn= true;
    this.authService.travelData.userId= JSON.parse(localStorage.getItem("user") || '{}')._id;
    this.authService.travelData.createdAt= new Date();
    this.authService.saveItinerary(this.authService.travelData).subscribe( (res : any) => {
      if(res.status === 200){
        this.spinnerOn= false;
        this.message= "Your Trip Plan is successfully saved.";
        this.router.navigate(['/usersList']);
      }
    },
    (error) => {
      this.message= "There's some issue saving this. Please try again later.";
    })
  }

  createTravel(){
    this.authService.showTravelData= false;
    this.authService.storedDestination= "";
    this.router.navigate(['/createTravel']);
  }

  goToDashboard(){
    this.router.navigate(['/usersList'])
  }

  goBack(){
    this.authService.showTravelData= true;
    this.router.navigate(['/createTravel']);
  }

  editItinerary(){
    this.authService.showTravelData= true;
    this.authService.editItinerary= true;
    this.router.navigate(['/createTravel']);
  }

  deleteItinerary(){
    this.spinnerOn= true;
    this.authService.deleteTrip({"id": this.authService.travelData._id}).subscribe((res : any) => {
       console.log(res);  
    })
  }

  updateItinerary(){
   this.spinnerOn= true;
   this.authService.updateItinerary(this.authService.travelData).subscribe( (res : any) => {
      if(res.status === 200){
        this.spinnerOn= false;
        this.message= "Your Trip Plan is updated and saved.";
        this.router.navigate(['/usersList']);
      }
    },
    (error) => {
      this.message= "There's some issue saving this. Please try again later.";
    })
  }

  downloadItinerary(){
     window.print();
  }

}
