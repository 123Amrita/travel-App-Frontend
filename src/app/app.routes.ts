import { Routes } from '@angular/router';

export const routes: Routes = [
    {path : '', loadComponent: () => import('./users-list/users-list.component').then( m => m.UsersListComponent)},
    {path : 'loginPage', loadComponent: () => import('./login-page/login-page.component').then( m => m.LoginPageComponent)},
    {path : 'usersList', loadComponent: () => import('./users-list/users-list.component').then( m => m.UsersListComponent)},
    {path : 'signup', loadComponent: () => import('./signup-page/signup-page.component').then( m => m.SignupPageComponent)},
    {path : 'createTravel', loadComponent: () => import('./create-travel-plan/create-travel-plan.component').then( m => m.CreateTravelPlanComponent)},
    {path : 'iteneraryPage', loadComponent: () => import('./itinerary-page/itinerary-page.component').then( m => m.ItineraryPageComponent)}
];


