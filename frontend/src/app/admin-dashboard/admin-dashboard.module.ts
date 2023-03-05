import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  imports:      [ MatDatepickerModule, CommonModule, BrowserModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, HttpClientModule, NgFor, NgForOf],
  declarations: [ AdminDashboardComponent ],
  bootstrap:    [ AdminDashboardComponent ]
})
export class AdminDashboardModule { 
}