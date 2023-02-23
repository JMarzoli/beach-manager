import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { MaterialModule } from './material.module';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule, HttpClientModule, CommonModule],
    declarations: [ SignupComponent ],
    bootstrap:    [ SignupComponent ]
})

export class SignupModule{}