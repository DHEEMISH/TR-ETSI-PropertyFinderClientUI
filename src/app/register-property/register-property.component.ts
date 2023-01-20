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
  selectpropertyType!: PropertyRegistrationDto;
  selectcity!: string;
  propertyType!: string;
  furnished!: string;
  preferredCustomer!: string;
  showMsg: boolean = false;
  constructor(private propService: PropertyService,private router: Router) { 
    this.getCititesList();
  }

  ngOnInit(): void {

    this.registerPropertyForm = new FormGroup({
      description: new FormControl(''),
      title: new FormControl(''),
      builtup: new FormControl(''),
      propertyType: new FormControl(''),
      deposit: new FormControl({value: '0.0', disabled: false}, Validators.required),
      postedOn: new FormControl(''),
      propertyCost:new FormControl({value: '0.0', disabled: true}, Validators.required),
      downpayment: new FormControl({value: '0.0', disabled: true}, Validators.required),
      availableFrom: new FormControl(''),
      propImgUrl: new FormControl(''),
      furnished : new FormControl(''),
      preferredCustomer:new FormControl({value: '', disabled: true}, Validators.required),
      houseOwnerName:new FormControl(''),
      cityName:new FormControl(''),
      ownerContact:new FormControl(''),

    });
  }
  toggle(){
    this.registerPropertyForm.get('propertyCost')?.enable();
    this.registerPropertyForm.get('downpayment')?.enable();
    this.registerPropertyForm.get('preferredCustomer')?.disable();
  }
  togglecustomer(){
    this.registerPropertyForm.get('propertyCost')?.disable();
    this.registerPropertyForm.get('downpayment')?.disable();
    this.registerPropertyForm.get('preferredCustomer')?.enable();
  }
 
  changeCity(event:Event)
  {
   this.selectcity = String((event.target as HTMLInputElement).value)
  }
  
  changepropertyType(event:Event)
  {
   this.propertyType = String((event.target as HTMLInputElement).value)
  }

  changepreferredCustomer(event:Event)
  {
   this.preferredCustomer = String((event.target as HTMLInputElement).value)
  }
  public registerProperty = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const property: PropertyRegistrationDto = {
      title: formValues.title,
      availableFrom: formValues.availableFrom,
      postedOn: formValues.postedOn,
      description: formValues.description,
      propertyCost: formValues.propertyCost,
      builtup: formValues.builtup,
      propImgUrl: formValues.propImgUrl,
      cityName: this.selectcity,
      deposit: formValues.deposit,
      downpayment: formValues.downpayment,
      furnished: formValues.furnished,
      houseOwnerName: formValues.houseOwnerName,
      propertyType: formValues.propertyType,
      ownerContact: formValues.ownerContact,
      preferredCustomer: formValues.preferredCustomer,
      houseType: ''
    };
   
    //console.log("registerPropertyForm-->" + JSON.stringify(this.registerPropertyForm.value));
    console.log("property-->" + JSON.stringify(property));
     this.selectpropertyType=<PropertyRegistrationDto><unknown>this.registerPropertyForm.value.preferredCustomer;     
     console.log("selectpropertyType-->" + JSON.stringify(this.selectpropertyType));
     this.propService.registerProperty("api/property/CreateProperty", property)
    .subscribe({
      next: (_: any) => this.showMsg= true,
    //  next: (_) => this.router.navigate(["/home"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
   // this.registerPropertyForm.reset();
  }
 


  getCititesList() {
    this.propService.GetAllCities("api/property/GetCity").subscribe({
      next: (result: any) => (this.cities = result),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
