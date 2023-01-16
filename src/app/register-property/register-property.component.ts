import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { PasswordConfirmationValidatorService } from '../shared/custom-validators/password-confirmation-validator.service';
import {  citydto } from '../_interfaces/property/cityDto';
import { PropertyRegistrationDto } from '../_interfaces/property/propertyForRegistrationDto.model';

@Component({
  selector: 'app-register-property',
  templateUrl: './register-property.component.html',
  styleUrls: ['./register-property.component.css']
})
export class RegisterPropertyComponent {
  registerPropertyForm!: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  cities!: citydto[];  
  constructor(private propService: PropertyService,private router: Router) { 
    this.getCititesList();
  }

  ngOnInit(): void {
    this.registerPropertyForm = new FormGroup({
      description: new FormControl(''),
      builtup: new FormControl(''),
      houseType: new FormControl(''),
      deposit: new FormControl('', [Validators.required]),
      postedOn: new FormControl(''),
      propertyCost:new FormControl(''),
      downpayment: new FormControl(''),
      availableFrom: new FormControl(''),
      propImgUrl: new FormControl(''),
      furnished : new FormControl(''),
      preferredCustomer:new FormControl(''),
      houseOwnerName:new FormControl(''),
      cityName:new FormControl(''),
      ownerContact:new FormControl(''),

    });
  }


  public registerProperty = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const property: PropertyRegistrationDto = {
      description: formValues.description,
     
      availableFrom: formValues.availableFrom,
      postedOn: formValues.postedOn,
      propertyCost: formValues.propertyCost,
      builtup: formValues.builtup,
      propImgUrl:formValues.propImgUrl,
      cityName: formValues.cityName,
      deposit: formValues.deposit,
      downpayment: formValues.downpayment,
      furnished:formValues.furnished,
      houseOwnerName:formValues.houseOwnerName,
      houseType:formValues.houseType,
      ownerContact:formValues.ownerContact,
      preferredCustomer:formValues.preferredCustomer,
    
    };

    this.propService.registerProperty("api/property/CreateProperty", property)
    .subscribe({
     // next: (_: any) => console.log("Successful registration"),
      next: (_) => this.router.navigate(["/home"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
  get f(){
    return this.registerPropertyForm.controls;
  }

  getCititesList() {
    this.propService.GetAllCities("api/property/GetCity").subscribe({
      next: (result: any) => (this.cities = result),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
