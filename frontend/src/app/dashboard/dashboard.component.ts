import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DasboardModule } from './dashboard.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDataUrl = 'http://localhost:4200/api/user-data'
  userReservationsUrl = 'http://localhost:4200/api/reservation'
  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3OTUxMDc2LCJleHAiOjE2NzgwMzc0NzZ9.4Rlu6TijjG6fd8noeOAtUnMIy_Vs1ZUbAGc5VQXuqfY"
  header = new HttpHeaders().set('x-access-token', this.accessToken);
  userData: any;
  userReservation: Array<any>;

  constructor(
    private _router: Router, 
    private ActivatedRoute: ActivatedRoute, 
    private http: HttpClient
    ) {
      this.userData = undefined;
      this.userReservation = new Array<any>();
    }

  ngOnInit(): void {
    this.getUserData().subscribe(
      data => { this.userData = data }  
    )
    this.getUserReservation().subscribe(
      data => { this.userReservation = data.elements }
    )
  }

  deleteReservation(reservationId: any) {
    let url = `http://localhost:4200/api/reservation/${reservationId}`;
    console.log("Chiamata: " + url);
    this.http.delete(url, {headers: this.header}).subscribe();
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDataUrl, {headers: this.header})
  }

  getUserReservation(): Observable<any> {
    return this.http.get<any>(this.userReservationsUrl, {headers: this.header})
  }
}
