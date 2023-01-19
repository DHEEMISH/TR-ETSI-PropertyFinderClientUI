import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
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
