import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BeachesComponent } from './beaches/beaches.component';
import { DatesComponent } from './dates/dates.component';
import { LocationsComponent } from './locations/locations.component';
import { RegistrationModule } from './registration/registration.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {NgFor, NgForOf} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    DatesComponent,
    LocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RegistrationModule,
    HttpClientModule,
    CommonModule,
    NgFor,
    NgForOf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
