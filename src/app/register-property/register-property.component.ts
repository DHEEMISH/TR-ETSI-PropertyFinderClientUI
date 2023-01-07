import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { PasswordConfirmationValidatorService } from '../shared/custom-validators/password-confirmation-validator.service';
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

  constructor(private propService: PropertyService,private router: Router) { }

  ngOnInit(): void {
    this.registerPropertyForm = new FormGroup({
      description: new FormControl(''),
      title: new FormControl(''),
      propertyType: new FormControl(''),
      postedOn: new FormControl('', [Validators.required]),
      propertyCost: new FormControl(''),
      costTobeDisplayed:new FormControl(''),
      propImgUrl: new FormControl(''),
      FkCityName: new FormControl(''),
      propertyConfig: new FormControl(''),
      isActiveProperties : new FormControl(''),
      availableFrom:new FormControl('')

    });
  }


  public registerProperty = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const property: PropertyRegistrationDto = {
      description: formValues.description,
      title: formValues.title,
      propertyType: formValues.propertyType,
      postedOn: formValues.postedOn,
      propertyCost: formValues.propertyCost,
      costTobeDisplayed: formValues.costTobeDisplayed,
      propImgUrl:formValues.propImgUrl,
      FkCityName: formValues.FkCityName,
      propertyConfig: formValues.propertyConfig,
      isActiveProperties: formValues.isActiveProperties,
      availableFrom:formValues.availableFrom

    };

    this.propService.registerProperty("api/property/CreateProperty", property)
    .subscribe({
     // next: (_: any) => console.log("Successful registration"),
      next: (_) => this.router.navigate(["/authentication/home"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
