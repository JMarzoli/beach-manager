/**
 * Author: @Leonid
 * Description: componente responsabile di gestire l'autenticazione
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  message: string;
  errorAlert = false;  

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  roles: Array<any>;

  constructor(
      private _router: Router, 
      private ActivatedRoute: ActivatedRoute, 
      private http: HttpClient
      ) { 
    this.message = '';
    this.roles = new Array<any>();
  }

  // Se on init il parametro message è valorizzato a false scrivo invalid credentials
  ngOnInit(): void {
    this.ActivatedRoute.queryParams
      .subscribe(params => {
        if(params['message'] === 'false'){
          this.message='Invalid credentials';
        }
      }
    );
  }
  
  submit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.http
      .post(environment.apiUrl + '/api/auth/signin', serializedForm, {headers: headers})
      .subscribe({
        next: (data: any) => { 
          localStorage.setItem('token', data.accessToken);
          this.roles = data.roles;
          this.redirect(JSON.parse(JSON.stringify(data))); 
        },
        error: data => {
          this.redirect(JSON.parse(JSON.stringify(data)))
        },
      });
  }

  redirect(response: Object){
    type ObjectKey = keyof typeof response;
    const tokenKey = 'accessToken' as ObjectKey;
    var destination = 'login';
    var params = {};
    if(response[tokenKey]){
      if(this.roles.includes('ROLE_ADMIN')) {
        destination = 'admin'
      } else { destination = 'dashboard'; }
    }else{
      this.notifyError(); 
      params = { message:false }
    }
    this._router.navigate([destination],{ 
      queryParams: params
    })
  }

  // used for notify the user, that and error occurred and the reservation is not stored 
  notifyError(){
    this.errorAlert = !this.errorAlert
    setTimeout(() => {
      this.errorAlert = !this.errorAlert;
    }, 2500);
   }

}