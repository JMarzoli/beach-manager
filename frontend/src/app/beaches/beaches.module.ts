import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeachesComponent } from './beaches.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports:      [ MatFormFieldModule, FormsModule, MatDatepickerModule, CommonModule, BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, NgFor, NgForOf],
  declarations: [ BeachesComponent ],
  bootstrap:    [ BeachesComponent ]
})
export class BeachesModule { 
}