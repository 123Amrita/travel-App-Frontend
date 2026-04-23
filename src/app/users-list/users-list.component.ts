import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {TableModule} from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItineraryModel } from '../models/itinerary-model';
import { CarouselModule } from 'primeng/carousel';
import { AppState } from '../store/state/state';
import { Store } from '@ngrx/store';
import { getUserData } from '../store/selectors/selectors';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, SidebarModule, ButtonModule, MatSidenavModule, MatTableModule, 
    CarouselModule, ProgressSpinnerModule, DialogModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  errorMessage: any;
  responsiveOptions: any[]=[];
  userData$: Observable<UserModel>;
  userName: String= "";
  spinnerOn: boolean= false;
 
  constructor(private http: HttpClient, private AuthService: AuthService, private Router: Router, private store: Store<AppState>) {
    this.userData$ = this.store.select(getUserData);
    this.store.select(state => state).subscribe( x => this.userName= x.userData.name);
   }
  
  public usersList: UserModel[]= [];
  public tripList: ItineraryModel[] = [];
  public sidebarVisible1: boolean= true;

  public destinations= [{name: "Triund Trek, Himachal Pradesh", picture: "assets/triund_trek_images.jpg",
    description: "Triund trek, nestled in Himachal Pradesh, is a scenic trail near McLeodganj. It offers breathtaking views of the Dhauladhar range and Kangra Valley. The moderate hike, about 9 km, is perfect for beginners. Camping under starry skies makes it unforgettable, blending adventure, nature, and serenity in one journey."
  },
                          {name: "Valley of Flowers Trek, Uttarakhand", picture: "assets/valey-of-flowers.png",
                            description: "Valley of Flowers trek in Uttarakhand is a mesmerizing journey through a UNESCO World Heritage Site. The trail unveils vibrant alpine meadows, rare Himalayan flora, and snow-clad peaks. Starting from Govindghat, it’s a moderate trek, perfect for nature lovers. Blooming flowers create a breathtaking paradise, especially during monsoon season."
                          },
                          {name: "Great Lakes Trek, Kashmir", picture: "assets/Kashmir-Great-Lakes-trek-Shepherd-Traveller.jpg",
                            description: "Great Lakes Trek in Kashmir is a breathtaking adventure through alpine meadows, pristine lakes, and snow-clad peaks. The moderate-to-challenging trail spans about 70 km, showcasing seven stunning glacial lakes. Wildflowers, rolling valleys, and panoramic Himalayan views make it one of India’s most picturesque treks, especially in summer."
                          },
                          {name: "Nongriat Trek, Meghalaya", picture: "assets/Nongriat-Double-Decker-Root-Bridge-Trek.webp",
                            description: "Nongriat trek in Meghalaya is a unique journey to the famous double-decker living root bridge. Starting from Tyrna village, the trail descends over 3,500 steps through lush forests and waterfalls. It’s challenging yet rewarding, offering cultural encounters, natural wonders, and an unforgettable glimpse of indigenous Khasi ingenuity."
                          },
                          {name: "Hampta Pass Trek, Himachal Pradesh", picture: "assets/Hampta-Pass-Himachal.webp",
                            description: "Hampta Pass trek in Himachal Pradesh is a dramatic crossover between lush Kullu Valley and stark Lahaul landscapes. The 35 km trail offers alpine meadows, glacial streams, and snow-clad peaks. Moderate in difficulty, it’s perfect for adventure seekers. The contrasting scenery makes this trek a thrilling and unforgettable Himalayan journey."
                          },
                          {name: "Chembra Peak, Kerala", picture: "assets/chembra.jpg",
                            description: "Chembra Peak in Kerala, the highest in Wayanad at 2,100 meters, offers a thrilling trek through lush tea plantations and forests. The highlight is the heart-shaped lake en route, believed never to dry. The moderate climb rewards trekkers with panoramic views of misty hills and vibrant valleys."
                          },
                          {name: "Dzongri – Goecha La Trek, Sikkim", picture: "assets/Goecha-La-Trek-Sikkim.webp",
                            description: "Dzongri–Goecha La trek in Sikkim is a high-altitude adventure offering spectacular views of Mt. Kanchenjunga. The trail winds through rhododendron forests, alpine meadows, and remote villages. Challenging yet rewarding, it spans about 90 km. Sunrise at Goecha La, with towering Himalayan peaks, is the trek’s unforgettable highlight."
                          },
                          {name: "Markha Valley Trek, Ladakh", picture: "assets/Markha.jpg",
                            description: "Markha Valley trek in Ladakh is a captivating journey through barren mountains, vibrant monasteries, and remote villages. The trail crosses high passes like Kongmaru La, offering panoramic views of Kang Yatse peaks. Rich in culture and landscapes, this moderate trek blends adventure with Ladakh’s unique Buddhist heritage and desert beauty."
                          },
                          {name: "Rajmachi Trek, Maharashtra", picture: "assets/rajmachi.jpg",
                            description: "Rajmachi trek in Maharashtra is a popular trail near Lonavala, leading to the historic Rajmachi Fort. The route passes through lush forests, waterfalls, and scenic valleys. It’s accessible year-round, with monsoon adding charm. The trek blends adventure, history, and nature, offering panoramic views of the Sahyadri mountains."
                          },
                          {name: "Sandakphu Phalut Trek, West Bengal", picture: "assets/+(2).avif",
                            description: "Sandakphu–Phalut trek in West Bengal is famed for panoramic views of the world’s tallest peaks, including Everest, Kanchenjunga, Lhotse, and Makalu. The trail winds through Singalila National Park, rich in flora and fauna. Moderate in difficulty, it rewards trekkers with breathtaking sunrises and unforgettable Himalayan vistas."
                          }

      ];

  ngOnInit(){
    this.usersList= [];
    this.fetchUsersList();
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
  };

  fetchUsersList(){
    this.spinnerOn= true;
    this.AuthService.getTripList().subscribe((res: any) => {
      if(res.data){
       this.spinnerOn= false; 
       this.tripList= res.data;
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
      }
    },error => {
      this.errorMessage= error?.error?.message;
    })
  }

  createTravel(){
    this.Router.navigate(['/createTravel']);
  }

  goToDashboard(){
    this.Router.navigate(['/usersList'])
  }

  deleteTrip(id : string){
    this.AuthService.deleteTrip({"id": id}).subscribe((res : any) => {
       console.log(res);
    })
  }

  goToCreateItinerary(destination :string){
    this.AuthService.storedDestination= destination;
    this.Router.navigate(['/createTravel']);
  }

}
