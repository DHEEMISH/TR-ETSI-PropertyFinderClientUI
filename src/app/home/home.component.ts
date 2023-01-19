import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeText!: string;

  constructor() { }

  ngOnInit(): void {
    this.homeText = "WELCOME TO Property Search CLIENT APP"
  }

  public cities : string[] = [];
  send(selectedCities: string[]){
    this.cities = selectedCities;
  }

}
