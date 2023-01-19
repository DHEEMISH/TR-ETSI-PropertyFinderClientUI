import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ConfigService {
  constructor(private http: HttpClient) { }

  public getCities(){
    return this.http.get('https://tretsifindpropertyapi.azurewebsites.net/api/property/GetCity');
  }

  public getPropertiesBySelectedCities(cities : string[]): any{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' });
    return this.http.post('https://tretsifindpropertyapi.azurewebsites.net/api/property/GetPropertiesByCity', cities, { headers: headers});
  }
}