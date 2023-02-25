/**
 * Author: @Leonid
 * Description: componente responsabile di gestire l'autenticazione
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  message: string;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
      private _router: Router, 
      private ActivatedRoute: ActivatedRoute, 
      private http: HttpClient
      ) { 
    this.message = '';
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
      .post('http://localhost:4200/api/auth/signin', serializedForm, {headers: headers})
      .subscribe({
        next: data => this.redirect(JSON.parse(JSON.stringify(data))),
        error: data => this.redirect(JSON.parse(JSON.stringify(data))),
      });
  }

  redirect(response: Object){
    type ObjectKey = keyof typeof response;
    const tokenKey = 'accessToken' as ObjectKey;
    var destination = 'login';
    var params = {};

    if(response[tokenKey]){
      destination='dashboard';
    }else{
      params = { message:false}
    }
    this._router.navigate([destination],{ 
      queryParams: params
    })
  }
}