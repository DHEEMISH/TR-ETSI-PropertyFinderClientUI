import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-please-login',
  templateUrl: './please-login.component.html',
  styleUrls: ['./please-login.component.css']
})
export class PleaseLoginComponent {
  isCollapsed: boolean = false;
  isUserAuthenticated: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router, public socialAuthService: SocialAuthService,) {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
   }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  public logout = () => {
    this.authService.logout();

    if(this.authService.isExternalAuth)
      this.authService.signOutExternal();

    this.router.navigate(["/authentication/login"]);
  }

}
