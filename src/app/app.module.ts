import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from 'src/error-pages/not-found/not-found.component';
import { ForbiddenComponent } from 'src/error-pages/forbidden/forbidden.component';
import { AuthGuard } from './guards/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatButtonModule} from '@angular/material/button';
export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent, SearchBarComponent, HouseListComponent, HouseDetailsComponent, LandingPageComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'landing', component: LandingPageComponent},
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          )
      },
      { path: '404', component : NotFoundComponent},
      { path: 'forbidden', component: ForbiddenComponent },
      { path: '', redirectTo: '/landing', pathMatch: 'full' },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://tretsifindpropertyapi.azurewebsites.net'],
        disallowedRoutes: [],
      },
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '377351469595-oi2ie1nmcl9dn5bbbp2ksthnbkrrrmgf.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AppModule {}
