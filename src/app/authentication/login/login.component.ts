import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';
import { AuthResponseDto } from 'src/app/_interfaces/response/authResponseDto.model';
import { ExternalAuthDto } from 'src/app/_interfaces/externalAuth/externalAuthDto.model';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { take } from 'rxjs';
//import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private returnUrl!: string;
  public user: SocialUser = new SocialUser();
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;
  option: boolean = false;
  
  constructor(
    private authService: AuthenticationService,
    public socialAuthService: SocialAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      useremail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
     
    this.socialAuthService.authState.subscribe(response => {
      this.externalLogin(response);
    });
  }

  loginUser = (loginFormValue: any) => {
    this.authService.isExternalAuth = false;
    this.showError = false;
    const login = { ...loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.useremail,
      password: login.password,
      clientURI: '',
    };

    this.authService.loginUser('api/users/login', userForAuth).subscribe({
      next: (res: AuthResponseDto) => {
        localStorage.setItem('token', res.token);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigateByUrl('/home');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
       // this.router.navigate([this.returnUrl]);
        this.router.navigateByUrl("/forbidden");
      },
    });
  };


  externalLogin = (user: any) => {
    this.showError = false; 
     const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken,
      };
      this.validateExternalAuth(externalAuth);
  };

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.authService
      .externalLogin('api/users/externallogin', externalAuth)
      .subscribe({
        next: (res: { token: string; isAuthSuccessful: boolean }) => {
          localStorage.setItem('token', res.token);
          this.authService.sendAuthStateChangeNotification(
            res.isAuthSuccessful
          );
          this.router.navigateByUrl("/home");
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
          this.authService.signOutExternal();
          this.router.navigate([this.returnUrl]);
          this.router.navigateByUrl("/forbidden");
        },
      });
  }
}
