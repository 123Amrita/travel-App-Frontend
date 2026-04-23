import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { FormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MessagesModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  public user= new UserModel();
  public errorMessage: String = "";
  successMessage: any[]=[];
  constructor(public location: Location, private AuthService: AuthService, private Router: Router) { };

  back() {
    this.location.back();
  }

  signup(data: UserModel) {
    if (data && data.emailId && data.name && data.password) {
      data.role = "Admin";
      this.AuthService.signup(data).subscribe((res : any) => {
        console.log(res);
        if (res) {
          this.successMessage= [{summary : 'Success', detail: "User successfully logged in"}];
          this.Router.navigate(["/loginPage"]);
        }
      },
        error => {
          this.errorMessage = error.error.message;
        })
    }
  }
}
