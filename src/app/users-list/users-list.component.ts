import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { UserModel } from '../models/user-model';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
//import {TableModule} from 'primeng/table';
//import { SidebarModule } from 'primeng/sidebar';
//import { ButtonModule } from 'primeng/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ItineraryModel } from '../models/itinerary-model';
import { CarouselModule } from 'primeng/carousel';
import { AppState } from '../store/state/state';
import { Store } from '@ngrx/store';
import { getUserData } from '../store/selectors/selectors';
import { MatTableModule } from '@angular/material/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { DESTINATIONS } from '../models/destination-data';
import { catchError, Observable, of, shareReplay, take, tap } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSidenavModule, ProgressSpinnerModule, DialogModule, CarouselModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  errorMessage: any;
  responsiveOptions: any[]=[];
  userData$!: Observable<UserModel>;
  userName: String= "";
  spinnerOn: boolean= false;
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser;
 
  constructor( private authService: AuthService, private Router: Router, private store: Store<AppState>) {
    this.userData$ = this.store.select(getUserData);
    this.store.select(state => state).subscribe( x => this.userName= x.userData.name);
   }
  
  public usersList: UserModel[]= [];
  public tripList: ItineraryModel[] = [];
  public sidebarVisible1: boolean= true;

  public destinations= DESTINATIONS;
  tripList$!: Observable<any>;

  ngOnInit(){
    this.usersList= [];
    this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
       ];
    this.spinnerOn= false;
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit called');
    console.log('isPlatformBrowser:', isPlatformBrowser(this.platformId));
    this.fetchUsersList();
  }

  fetchUsersList(){
    console.log('fetchUsersList called');
    this.spinnerOn= true;
    this.authService.getTripList().subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        this.tripList = res.data;
        this.tripList.forEach( x => {
        if(x.destination){
        let picture= this.destinations.filter(des => des.name === x.destination)[0];
        if(picture){
        x.picture= picture.picture
        }
        if(picture){
        x.description= picture.description
        }
        }
        
        if(x.startDate && x.endDate){
          let date1= new Date(x.endDate);
          let date2= new Date(x.startDate);
          x.days= (date1.getDate()- date2.getDate());
        }
       })
        this.spinnerOn = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.spinnerOn = false;
      }
    });
  }

  createTravel(){
    this.Router.navigate(['/createTravel']);
  }

  goToDashboard(){
    this.Router.navigate(['/usersList'])
  }

  deleteTrip(id : string){
    this.authService.deleteTrip({"id": id}).subscribe((res : any) => {
       console.log(res);
    })
  }

  goToCreateItinerary(destination :string){
    this.authService.storedDestination= destination;
    this.Router.navigate(['/createTravel']);
  }

}
