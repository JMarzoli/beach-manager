/**
 * Author: @Julian & @Leonid
 * Description: componenete responsabili di gestire la registrazione 
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  message: string
  accountType: string
  errorAlert = false; 
  missingAlert = false; 

  form: FormGroup = new FormGroup({
    username : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    role : new FormControl('', Validators.required)  
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
    )
  }

  submit() {
    if(!this.form.valid) {
      this.notifyMissing();
      console.log("invalid")
      return; 
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj); 
    this.http
        .post(environment.apiUrl + '/api/auth/signup', serializedForm, {headers: headers})
        .subscribe({
            next: data => this.redirectLogin(JSON.parse(JSON.stringify(data))),
            error: data => { 
              this.notifyError(),
              this.redirectError(JSON.parse(JSON.stringify(data))) 
            }
        })
  } 

  redirectError(response: Object) {
    this.notifyError(); 
    var params = {}; 
    params = {message:false}; 
  }

  redirectLogin(response: Object){
    const destination = 'login'; 
    this._router.navigate(
    [destination]
    )
  }

  //sets the account type to create
  public setRole(type: string){
    this.form.get("role")?.setValue(type); 
  }

  // used for notify the user, that and error occurred and the reservation is not stored 
  notifyError(){
    console.log("error");
    this.errorAlert = !this.errorAlert
    setTimeout(() => {
      this.errorAlert = !this.errorAlert;
    }, 2500);  
  }

  // used for notify the user, that and error occurred and the reservation is not stored 
  notifyMissing(){
    console.log("error");
    this.missingAlert = !this.missingAlert
    setTimeout(() => {
      this.missingAlert = !this.missingAlert;
    }, 2500);
  }

}
