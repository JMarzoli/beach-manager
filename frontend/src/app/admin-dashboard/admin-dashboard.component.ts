/**
 * Author: @Julian & @Leonid
 * Description: admin panel, responsabile per la gestione delle spiagge
 */

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  beachesUrl = environment.apiUrl + '/api/beach';
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  beaches: Array<any>;
  locations: Array<any>; 
  displayLocations: boolean; 
  action1 = ''; 
  action2 = '';
  focusBeachId: any;
  newLocationForm: FormGroup = new FormGroup({
    beachId: new FormControl(''),
    ombrella_number: new FormControl(''),
    price: new FormControl('')
  })
  newBeachForm: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private _router: Router, 
    private ActivatedRoute: ActivatedRoute, 
    private http: HttpClient
    ) {
      this.beaches = new Array<any>();
      this.locations = new Array<any>();
      this.displayLocations = false; 
    }

  ngOnInit(): void {
    this.getBeaches().subscribe(
      (data) => { this.beaches = data.elements; }
    )
  }

  setAction1(action: string) {
    this.action1 = action;
  }

  setAction2(action: string) {
    this.action2 = action
  }

  // calls the api for retriving the beaches 
  getBeaches(): Observable<any> {
    return this.http.get<any>(this.beachesUrl);
  }

  getLocations(beachId: any) {
    let url = environment.apiUrl + `/api/beach/${beachId}/locations`;
    this.http.get<any>(url).subscribe(
      data => { this.locations = data.elements; }
    )
  }

  showLocations(id: any){
    this.displayLocations = !this.displayLocations;
    this.focusBeachId = id; 
    this.getLocations(id);  
  }

  deleteBeach(id: any){
    let url = this.beachesUrl.concat(`/${id}`);
    this.http.delete(url).subscribe(); 
  }

  deleteLocation(beachId: any, locationId: any){
    let url = environment.apiUrl + `/api/beach/${beachId}/locations/${locationId}`;
    this.http.delete(url).subscribe(); 
  }

  createLocation(){
    this.newLocationForm.get("beachId")?.setValue(this.focusBeachId); 
    let formObj = this.newLocationForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    let url = environment.apiUrl + `/api/beach/${this.focusBeachId}/locations`;
    this.http.post(url, serializedForm, {headers: this.headers}).subscribe(
      data => { console.log(data); }
    ) 
  }

  createBeach(){
    let formObj = this.newBeachForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.http.post(this.beachesUrl, serializedForm, {headers: this.headers}). subscribe(
      data => { console.log(data) }
    )
  }

}
