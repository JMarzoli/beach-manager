/**
 * Author: @Julian - @Leonid
 * Description: componente che fornisce la possibilità ad un utente di prenotare postazioni 
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders , } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeachesModule } from './beaches.module';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beaches',
  templateUrl: './beaches.component.html',
  styleUrls: ['./beaches.component.scss']
})

export class BeachesComponent implements OnInit {
  beachesUrl = 'http://localhost:4200/api/beach';
  reservationUrl = 'http://localhost:4200/api/reservation';  
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  beaches: Array<any>; 
  locations: Array<any>; 
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
    private _router: Router, 
    private ActivatedRoute: ActivatedRoute, 
    private http: HttpClient
    ) { 
      this.beaches = new Array<any>();
      this.locations = new Array<any>();
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
    // setting a parameter in each beach, used for showing or not the location 
    this.beaches.forEach(function(item){item.displayDatePicker = false; } )
    this.showLocations = !this.showLocations; 
  }

  // used for opening the date picker of a location to reserve it 
  displayDatePicker(id:any){
    let item = this.locations.find(i => i.id === id); 
    item.displayDatePicker = !item.displayDatePicker; 
  }

  // stores a new reservation by calling the api 
  submitReservation(locationId:any){
    this.reservation.get("locationId")?.setValue(locationId);
    let formObj = this.reservation.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.http
        .post(this.reservationUrl, serializedForm, {headers: this.headers})
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
    let url = this.beachesUrl.concat(`/${beachId}/locations`)
    return this.http.get<any>(url)
  }

  // used for notify the succesfully created resvation at the user 
  async notifySuccess(response: Object){
    this.successAlert = !this.successAlert
    setTimeout(() => {
      this.successAlert = !this.successAlert;
    }, 2500);
  }

  // used for notify the user, that and error occurred and the reservation is not stored 
  notifyError(response: Object){
    this.errorAlert = !this.errorAlert
    setTimeout(() => {
      this.errorAlert = !this.errorAlert;
    }, 2500);
  }

}


