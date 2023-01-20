import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PropertyService } from '../services/property.service';
import { GeoLocationDto } from '../_interfaces/response/geolocationDto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeText!: string;
  isUserAuthenticated: boolean = false;
  lat!: number;
  lng!: number;

  constructor(private authService: AuthenticationService,private propService:PropertyService) { 
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
    this.getGeolocationData()
    this.getUserLocation()
  }

  
  ngOnChanges(){
  this.getGeolocationData()
    this.getUserLocation()
  }
    

  public cities : string[] = [];
  public searchText: string = '';
  public onlyShowRented: boolean = false;
  public onlyShowForSale: boolean = false;
  public furnished: boolean = false;
  public semiFurnished: boolean = false;
  public unFurnished: boolean = false;
  send(selectedCities: string[]){
    this.cities = selectedCities;
  }

  isRentalProperty(rented: boolean){
    this.onlyShowRented = rented;
  }

  isSellableProperty(sellable: boolean){
    this.onlyShowForSale = sellable;
  }

  isFurnishedProperty(furnished: boolean){
    this.furnished = furnished;
  }

  isSemiFurnishedProperty(semiFurnished: boolean){
    this.semiFurnished = semiFurnished;
  }

  isUnFurnishedProperty(unFurnished: boolean){
    this.unFurnished = unFurnished;
  }

  searchProperty(searchText: string){
    //console.log('home search ', searchText);
    this.searchText = searchText;
  }

  getUserLocation() {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;       
    
        //this.getGeolocationData()
      });
    }
    
  }
  getGeolocationData() {
    const params={latitude: this.lat, longitude: this.lng}
  
    this.propService.GetGeoLocation(params).subscribe({
      next: (result: GeoLocationDto) => {
        console.log('Geoloc city ', result.city);
        console.log("Before length", this.cities.length ,this.cities);
        console.log('Geoloc cities ', this.cities.push(result.city));
        console.log("After length", this.cities.length,this.cities);
        const geolocation: GeoLocationDto = {
          region: result.region,
          city: result.city,
        };
    // this.cities=[JSON.parse(result.city)]  ;
        console.log('result' , geolocation);
    //    this.getpropertybyCityName(geolocation);
      },
      error: (err: HttpErrorResponse) => {
        //this.errorMessage = err.message;
        
      }
      
    });
  }

}
