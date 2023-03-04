/**
 * Author: @Julian
 * Description: componente responsabile di gestire l'autenticazione
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeachesModule } from './beaches.module';


@Component({
  selector: 'app-beaches',
  templateUrl: './beaches.component.html',
  styleUrls: ['./beaches.component.scss']
})
export class BeachesComponent implements OnInit {

  beachesUrl = 'http://localhost:4200/api/beach';
  reservationUrl = 'http://localhost:4200/api/reservation';  
  locationsUrl = '';
  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3OTUxMDc2LCJleHAiOjE2NzgwMzc0NzZ9.4Rlu6TijjG6fd8noeOAtUnMIy_Vs1ZUbAGc5VQXuqfY"
  beachesHeader = new HttpHeaders().set('x-access-token', this.accessToken);
  locationsHeader = new HttpHeaders().set('x-acces-token', this.accessToken); 
  beaches: Array<any>; 
  locations: Array<any>; 
  reservationLocations: Array<any>;
  beachLocationsId: any;
  reservationBody = {}; 
  showLocations: boolean;
  showDatePicker: boolean;  

  constructor(
    private _router: Router, 
    private ActivatedRoute: ActivatedRoute, 
    private http: HttpClient
    ) { 
      this.beaches = new Array<any>();
      this.locations = new Array<any>();
      this.reservationLocations = new Array<any>(); 
      this.showLocations = false; 
      this.showDatePicker = false;
    }
    
  ngOnInit(): void {
    this.getBeaches().subscribe(
      (data) => { this.beaches = data.elements; }
    )
  }

  // shows the locations of the selected beach 
  selectBeach(beachId: any) {
    this.getLocations(beachId).subscribe(
      (data) => { this.locations = data.elements }
    ); 
    this.showLocations = !this.showLocations; 
  }

  selectDates(){
    this.showDatePicker = true; 
  }

  // TODO aggiungere logica che crea il body dinamicamente
  submitReservation(){
    this.reservationBody = {    
      "date_start": "2032-01-01T23:00:00.000Z",
      "date_end": "2043-01-01T23:00:00.000Z",
      "locationId":2
    }
    this.http.post(this.reservationUrl, this.reservationBody, {headers: this.beachesHeader})
              .subscribe(data => { console.log("reservation data: " + data) }
              );
  }

  // calls the api for retriving the beaches 
  getBeaches(): Observable<any> {
    return this.http.get<any>(this.beachesUrl, {headers: this.beachesHeader})
  }

  // calls the api for retriving the location of a particular beach 
  getLocations(beachId : any): Observable<any> {
    this.locationsUrl = `http://localhost:4200/api/beach/${beachId}/locations`;
    console.log("Chiamata all'url: " + this.locationsUrl);  
    return this.http.get<any>(this.locationsUrl, {headers: this.beachesHeader})
  }


}


