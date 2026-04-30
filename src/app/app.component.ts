import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {TableModule} from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { HeaderComponent } from './header/header.component';
import { AppState } from './store/state/state';
import { Store } from '@ngrx/store';
import { saveUserData } from './store/actions/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, FormsModule, CommonModule, TableModule, MessagesModule, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private platformId = inject(PLATFORM_ID);
  constructor(public router: Router, private store: Store<AppState>){

  }

   ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.store.dispatch(saveUserData({ user: JSON.parse(savedUser) }));
      }
    }
  }
}
