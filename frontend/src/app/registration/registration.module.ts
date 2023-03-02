import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegistrationComponent } from './registration.component';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
    declarations: [ RegistrationComponent ],
    bootstrap:    [ RegistrationComponent ],
})
export class RegistrationModule {}