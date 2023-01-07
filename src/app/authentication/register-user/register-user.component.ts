import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDto } from './../../_interfaces/user/userForRegistrationDto.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { Router } from '@angular/router';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  constructor(private authService: AuthenticationService,private router: Router,
    private passConfValidator: PasswordConfirmationValidatorService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
      userName:new FormControl(''),
      preferredLocation: new FormControl('')
    });
   // this.passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);

  }
  public validateControl = (controlName: string) => {
    return this.registerForm.getError(controlName).invalid && this.registerForm.getError(controlName).touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.getError(controlName).hasError(errorName)
  }
  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      clientURI: ''
    };

    this.authService.registerUser("api/users/Registration", user)
    .subscribe({
     // next: (_: any) => console.log("Successful registration"),
      next: (_) => this.router.navigate(["/authentication/login"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}