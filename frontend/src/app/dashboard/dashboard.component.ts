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
    this.http.delete(url).subscribe();
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDataUrl)
  }

  getUserReservation(): Observable<any> {
    return this.http.get<any>(this.userReservationsUrl)
  }
}
