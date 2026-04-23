import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, FormsModule, CommonModule, TableModule, MessagesModule, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router){

  }
}
