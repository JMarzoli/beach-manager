import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //reading the token stored in the login phase 
    const localToken = localStorage.getItem('token'); 
    //putting the access token into the request header
    req = req.clone({ headers: req.headers.set('x-access-token', '' + localToken)})
    return next.handle(req); 
  }
}
