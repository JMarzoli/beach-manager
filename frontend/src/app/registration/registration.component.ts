/**
 * Author: @Julian
 * Description: componenete responsabili di gestire la registrazione 
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  message: string
  
  accountType: string

  form: FormGroup = new FormGroup({
    username : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    role : new FormControl('')  
 });

  constructor(
    private _router: Router, 
    private ActivatedRoute: ActivatedRoute, 
    private http: HttpClient
    ) { 
      this.message = ''
      this.accountType = ''
  }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams
            .subscribe(params => {
                if(params['message'] === 'false'){
                    this.message = 'Invalid credential'; 
                }
            }
        );
  }

  submit() {
    console.log(this.accountType); 
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj); 
    this.http
        .post('http://localhost:4200/api/auth/signup', serializedForm, {headers: headers})
        .subscribe({
            next: data => this.redirect(JSON.parse(JSON.stringify(data))),
            error: data => this.redirect(JSON.parse(JSON.stringify(data)))
        })
}

redirect(response: Object) {
  type ObjectKey = keyof typeof response; 
  const tokenKey = 'sigupToken' as ObjectKey;
  var destination = 'login'; 
  var params = {}; 
  if(response[tokenKey]) {
   destination = 'login'; 
  } else {
   params = {message:false}
  }
  this._router.navigate(
   [destination],{queryParams: params}
   )
}

//sets the account type to create
public setRole(type: string){
  this.form.get("role")?.setValue(type); 
  console.log(this.form.get("role")?.getRawValue.toString); 
}

}
