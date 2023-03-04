import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { BeachesComponent } from './beaches.component';

@NgModule({
  imports:      [ MatDatepickerModule, CommonModule, BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, NgFor, NgForOf],
  declarations: [ BeachesComponent ],
  bootstrap:    [ BeachesComponent ]
})
export class BeachesModule { 
}