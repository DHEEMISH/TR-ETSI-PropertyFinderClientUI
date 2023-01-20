import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { RegistrationResponseDto } from '../_interfaces/response/registrationResponseDto.model';
import { Router } from '@angular/router';
import { PropertyRegistrationDto } from '../_interfaces/property/propertyForRegistrationDto.model';
import { citydto } from '../_interfaces/property/cityDto';
import { GeoLocationDto } from '../_interfaces/response/geolocationDto.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private _isPropertyCreatedSubject = new BehaviorSubject<boolean>(false);
  isisPropertyCreated: Observable<boolean> =
    this._isPropertyCreatedSubject.asObservable();
  api_key: string='9e19f5dc10114bf9a544b682a6afd273';

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private router: Router
  ) {}

  updateUserAuthenticationStatus() {
    return this.http
      .get<boolean>(`${environment.userApiUrl}/user/login`, {
        withCredentials: true,
      })
      .pipe(
        tap((isPropCreated) => {
          this._isPropertyCreatedSubject.next(isPropCreated);
        })
      );
  }

  setPropertyAsNotCreated() {
    this._isPropertyCreatedSubject.next(false);
  }

  public registerProperty = (route: string, body: PropertyRegistrationDto) => {
    return this.http.post<RegistrationResponseDto>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };

  public GetGeoLocation = (route: any) => {
    return this.http.get<GeoLocationDto>(          
        this.envUrl.locationAddress + this.api_key,  
      { params: route }
    );
  };
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  public GetAllCities = (route: string) => {
    return this.http.get<citydto>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  };
}
