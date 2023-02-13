/**
 * Author: @Leonid
 * Description: componente responsabile di gestire l'autenticazione
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private _router: Router, private ActivatedRoute: ActivatedRoute) { 
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
    var destination = 'login';
    var params = {};
    
    //TODO implementare chiamata a backend
    const result = false;
    //TODO

    if(result){
      destination='dashboard';
    }else{
      params = { message:result}
    }

    this._router.navigate([destination],{ 
      queryParams: params
    })
  }
}