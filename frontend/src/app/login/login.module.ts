import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { MaterialModule } from './material.module';


@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, HttpClientModule, CommonModule],
  declarations: [ LoginComponent ],
  bootstrap:    [ LoginComponent ]
})
export class LoginModule { 
}
