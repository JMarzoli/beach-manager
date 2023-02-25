import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component'; 



@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, CommonModule, DashboardComponent],
  declarations: [ DashboardComponent ],
  bootstrap:    [ DashboardComponent ]
})
export class LoginModule { 
}