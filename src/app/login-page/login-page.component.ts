import { Component } from '@angular/core';
import { UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {MessagesModule} from 'primeng/messages';
import { Message } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/state';
import { Observable } from 'rxjs';
import { getUserData } from '../store/selectors/selectors';
import { saveUserData } from '../store/actions/actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, MessagesModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public user= new UserModel();
  public loginUser= new UserModel();
  public errorMessage: String= "";
  public signupDiv: boolean= false;
  successMessage: any[]=[];
  loginForm!: FormGroup;

  userData$ : Observable<UserModel>;

  constructor(private http: HttpClient, private AuthService: AuthService, private Router: Router, private formBuilder: FormBuilder
    , private store: Store<AppState>
  ) { 
    this.userData$ = this.store.select(getUserData);
  }

  ngOnInit(){
    this.signupDiv= false;
    this.loginForm= this.formBuilder.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    })
  }

    onSubmit() {
      if(this.loginForm.valid){
        this.AuthService.login(this.loginForm.value).subscribe((res : any) => {
          console.log(res);
          if(res.token && res.message === "User successfully logged in"){
             sessionStorage.setItem("token", res.token);
             this.successMessage= [{summary : 'Success', detail: "User successfully logged in"}];
             localStorage.setItem('token', res.token);
             localStorage.setItem('user', JSON.stringify(res.userData));
             if(res.userData){
             this.store.dispatch(saveUserData({user: res.userData}));
             }
             this.Router.navigate(["/usersList"]);
          }else{
             this.errorMessage= "Please fill all mandatory fields.";
          }
        },
         error => {
            this.errorMessage= error?.error?.message;
        })
      }else{
        this.errorMessage= 'Please fill the mandatory fields';
      }
      
    }

    showSignup(){
      this.Router.navigate(['/signup']);
    }
}
