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
  locationsUrl = '';
  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3OTQwNDY1LCJleHAiOjE2NzgwMjY4NjV9.OiaMxXaG4j56yxV2Wjc2YxTHIvz-QWqK12myci8KI18"
  beachesHeader = new HttpHeaders().set('x-access-token', this.accessToken);
  locationsHeader = new HttpHeaders().set('x-acces-token', this.accessToken); 
  beaches: Array<any>; 
  locations: Array<any>; 
  beachLocationsId: any; 
  showLocations: boolean; 

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
    this.getBeaches().subscribe(
      (data) => { this.beaches = data.elements; }
    )
  }

  // shows the locations of the selected beach 
  selectBeach(beachId: any) {
    console.log("submit works!");
    this.getLocations(beachId).subscribe(
      (data) => { this.locations = data.locations }
    ); 
    this.showLocations = !this.showLocations; 
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


