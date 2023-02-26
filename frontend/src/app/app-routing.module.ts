import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { BeachesComponent } from './beaches/beaches.component';
import { DatesComponent } from './dates/dates.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'beaches', component: BeachesComponent },
  { path: 'dates', component: DatesComponent },
  { path: 'locations', component: LocationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
