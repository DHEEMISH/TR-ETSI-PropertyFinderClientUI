import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeText!: string;
  isUserAuthenticated: boolean = false;

  constructor(private authService: AuthenticationService) { 
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  ngOnInit(): void {
    //this.homeText = "WELCOME TO Property Search CLIENT APP"
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
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
}
