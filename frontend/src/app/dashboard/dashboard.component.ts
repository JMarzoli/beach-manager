/**
 * Author: @Leonid & @Julian
 * Description: componente responsabile della visualizzazione delle prenotazioni, oltre alle informazioni utente
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDataUrl = environment.apiUrl+'/api/user-data'
  userReservationsUrl = environment.apiUrl+'/api/reservation'
  userData: any;
  userReservation: Array<any>;
  dataReady: boolean = false;

  constructor(
    private http: HttpClient
    ) {
      this.userReservation = new Array<any>();
    }

  ngOnInit(): void {
    this.getUserData().subscribe(
      data => { this.userData = data; this.dataReady = true; }  
    )
    this.getUserReservation().subscribe(
      data => { this.userReservation = data.elements }
    )
  }

  deleteReservation(reservationId: any) {
    let url = environment.apiUrl+`/api/reservation/${reservationId}`;
    this.http.delete(url).subscribe(() => this.reload() );
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDataUrl)
  }

  getUserReservation(): Observable<any> {
    return this.http.get<any>(this.userReservationsUrl)
  }

  reload(){
    this.getUserReservation().subscribe(data => { this.userReservation = data.elements }); 
  }
}
