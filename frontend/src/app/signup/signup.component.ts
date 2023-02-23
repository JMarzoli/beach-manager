/**
 * Author: @Julian
 * Description: componenete responsabili di gestire la registrazione 
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    
    message: string; 
    data: Date = new Date(); 
    focus : boolean; 
    focus1 : boolean; 
    focus2: boolean;
    focus3: boolean; 
    form: FormGroup = new FormGroup({
        username : new FormControl(''),
        email : new FormControl(''),
        password : new FormControl(''),
        role : new FormControl('["user"]')
     });
    
    constructor(
        private _router: Router, 
        private ActivatedRoute: ActivatedRoute, 
        private http: HttpClient
    ) {
        this.message = '';
        this.focus = false; 
        this.focus1 = false; 
        this.focus2 = false;
        this.focus3 = false; 
        }
    
    ngOnInit(): void {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        this.ActivatedRoute.queryParams
            .subscribe(params => {
                if(params['message'] === 'false'){
                    this.message = 'Invalid immision'; 
                }
            }
        );
    }

    submit() {
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

}