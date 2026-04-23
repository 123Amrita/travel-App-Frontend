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
    if(this.authService.travelData){
    this.trekPic= this.authService.travelData.destination.picture;
    this.trekName= this.authService.travelData.destination.name;
    }
    if(this.authService.itineraryData){
    //this.overview= this.formatText(this.authService.itineraryData);

    this.dayCards= this.authService.itineraryData.itinerary;
    }
  }

  saveItinerary(){
    this.authService.travelData.AIOverview= (this.authService.itineraryData).toString();
    this.spinnerOn= true;
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
    this.router.navigate(['/createTravel']);
  }

  goToDashboard(){
    this.router.navigate(['/usersList'])
  }

  goBack(){
    this.router.navigate(['/createTravel']);
  }

}
