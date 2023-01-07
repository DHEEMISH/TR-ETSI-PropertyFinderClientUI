import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { RegisterPropertyComponent } from '../register-property/register-property.component';

@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    RegisterPropertyComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SocialLoginModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterUserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registerPoperty', component: RegisterPropertyComponent },
    
    ])
  ]
})
export class AuthenticationModule { }
