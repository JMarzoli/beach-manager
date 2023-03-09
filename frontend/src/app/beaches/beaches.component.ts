/**
 * Author: @Julian & @Leonid
 * Description: componente responsabile di gestire la prenotazione delle postazioni
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders , } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { BeachesModule } from './beaches.module';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beaches',
  templateUrl: './beaches.component.html',
  styleUrls: ['./beaches.component.scss']
})
export class BeachesComponent implements OnInit {

  beachesUrl = environment.apiUrl + '/api/beach';
  reservationUrl = environment.apiUrl + '/api/reservation';  
  locationsUrl = ''; 
  beaches: Array<any>; 
  locations: Array<any>; 
  reservationLocations: Array<any>;
  beachLocationsId: any;
  reservationBody = {}; 
  showLocations: boolean;
  successAlert = false; 
  errorAlert = false; 
  range: any; 
  reservation: FormGroup = new FormGroup({
    date_start: new FormControl(''),
    date_end: new FormControl(''),
    locationId: new FormControl('')
  })

  constructor(
    private http: HttpClient
    ) { 
      this.beaches = new Array<any>();
      this.locations = new Array<any>();
      this.reservationLocations = new Array<any>(); 
      this.showLocations = false; 
    }
    
  ngOnInit(): void {
    // retriving all the beaches from backend
    this.getBeaches().subscribe(
      (data) => { this.beaches = data.elements; }
    )
  }

  // shows the locations of the selected beach 
  selectBeach(beachId: any) {
    this.getLocations(beachId).subscribe(
      (data) => { this.locations = data.elements }
    );
    this.beaches.forEach(function(item){item.displayDatePicker = false; } )
    this.showLocations = !this.showLocations; 
  }

  displayDatePicker(id:any){
    let item = this.locations.find(i => i.id === id); 
    item.displayDatePicker = !item.displayDatePicker; 
  }


  // TODO aggiungere logica che crea il body dinamicamente
  submitReservation(locationId:any){
    /* this.reservationBody = {    
      "date_start": "2032-01-01T23:00:00.000Z",
      "date_end": "2043-01-01T23:00:00.000Z",
      "locationId":2
    } */
    this.reservation.get("locationId")?.setValue(locationId);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let formObj = this.reservation.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    console.log("Serialized form: " + serializedForm);  
    this.http
        .post(this.reservationUrl, serializedForm, {headers: headers})
        .subscribe({
          next: data => this.notifySuccess(JSON.parse(JSON.stringify(data))),
          error: data => this.notifyError(JSON.parse(JSON.stringify(data)))
        })
  }

  // calls the api for retriving the beaches 
  getBeaches(): Observable<any> {
    return this.http.get<any>(this.beachesUrl)
  }

  // calls the api for retriving the location of a particular beach 
  getLocations(beachId : any): Observable<any> {
    this.locationsUrl = environment.apiUrl + `/api/beach/${beachId}/locations`;
    console.log("Chiamata all'url: " + this.locationsUrl);  
    return this.http.get<any>(this.locationsUrl)
  }

  async notifySuccess(response: Object){
    this.successAlert = !this.successAlert
  }

  notifyError(response: Object){
  }

}


