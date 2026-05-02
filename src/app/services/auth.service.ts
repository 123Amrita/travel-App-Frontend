import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  travelData: any;
  storedDestination: string = "";
  itineraryFromDashboard: boolean= false;
  showTravelData: boolean= false;
  editItinerary: boolean= false;
  editTripId: string= "";

  constructor(private http: HttpClient) { }

  private baseURL= "https://login-project-ntv9.onrender.com";
  public itineraryData: any;

  travelFormData: any = null;

setFormData(data: any) {
  this.travelFormData = data;
}

getFormData() {
  return this.travelFormData;
}

  signup(data: any){
    return this.http.post(this.baseURL + '/api/auth/signup',data);
  }

  login(data: any){
    return this.http.post(this.baseURL + '/api/auth/login',data);
  }

  getUsersList(){
    return this.http.get(this.baseURL + '/api/auth/getUsersList');
  }

  getTrekDetails(data: any){
    return this.http.post(this.baseURL + '/api/auth/getTrekDetails', data);
  }

  createItinerary(data: any){
    return this.http.post(this.baseURL + '/api/auth/createItinerary', data);
  }

  saveItinerary(data: any){
    return this.http.post(this.baseURL + '/api/auth/saveItinerary', data);
  }

  updateItinerary(data: any){
    return this.http.post(this.baseURL + '/api/auth/updateItinerary', data);
  }

  getTripList(data: any){
    return this.http.post(this.baseURL + '/api/auth/getTripList', data);
    //return of({ data: [] });
  }

  deleteTrip(id : any){
    return this.http.post(this.baseURL + '/api/auth/deleteTrip', id);
  }

  
}
