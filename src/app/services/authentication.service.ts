import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment.prod';
import { AuthResponseDto } from '../_interfaces/response/authResponseDto.model';
import { RegistrationResponseDto } from '../_interfaces/response/registrationResponseDto.model';
import { UserForRegistrationDto } from '../_interfaces/user/userForRegistrationDto.model';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from '../_interfaces/externalAuth/externalAuthDto.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  public isExternalAuth: boolean = false;
  private _isUserAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isUserAuthenticated: Observable<boolean> =
    this._isUserAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private router: Router,
    private externalAuthService: SocialAuthService
  ) {
    this.externalAuthService.authState.subscribe((user: any) => {
      console.log(user);
      this.extAuthChangeSub.next(user);
      this.isExternalAuth = true;
    });
  }

  updateUserAuthenticationStatus() {
    return this.http
      .get<boolean>(`${environment.userApiUrl}/user/login`, {
        withCredentials: true,
      })
      .pipe(
        tap((isAuthenticated) => {
          this._isUserAuthenticatedSubject.next(isAuthenticated);
        })
      );
  }

  setUserAsNotAuthenticated() {
    this._isUserAuthenticatedSubject.next(false);
  }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };

  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this.http.post<AuthResponseDto>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };


  public signOutExternal = () => {
    this.externalAuthService.signOut();
  };
}
