import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AppState } from '../store/state/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { getUserData } from '../store/selectors/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
//userName = localStorage.getItem('username') || 'User';
private platformId = inject(PLATFORM_ID);
userData$: Observable<UserModel>;
userName: String= "";
url: string="";
  constructor(private router: Router,private store: Store<AppState>) {
        this.userData$ = this.store.select(getUserData);
        this.store.select(state => state).subscribe( x => this.userName= x.userData.name);
  }

  ngOnChanges(){
    this.url=this.router.url;
  }

  logout() {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/loginPage']);
  }
}
