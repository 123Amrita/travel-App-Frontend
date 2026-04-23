import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  travelData: any;
  storedDestination: string = "";

  constructor(private http: HttpClient) { }

  private baseURL= "http://localhost:3800";
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

  getTripList(){
    return this.http.get(this.baseURL + '/api/auth/getTripList');
  }

  deleteTrip(id : any){
    return this.http.post(this.baseURL + '/api/auth/deleteTrip', id);
  }
}
