import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { MaterialModule } from './material.module';


@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
  declarations: [ LoginComponent ],
  bootstrap:    [ LoginComponent ]
})
export class LoginModule { 
}
