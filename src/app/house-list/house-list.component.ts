import { Component, Input } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { House } from '../model/house';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent {
  @Input() selectedCities: any;
  constructor(private configService: ConfigService){
    
  }
  @Input() houseDetails!: House;
  public propertyList!: any;

  ngOnInit(){
    console.log("Selected Cities", this.selectedCities);
    this.configService.getPropertiesBySelectedCities(this.selectedCities).subscribe(res =>{
      console.log(res);
    })
  }

  ngOnChanges(){
    this.callAPI();
  }

  callAPI(){
    console.log("Selected Cities", this.selectedCities);
    this.configService.getPropertiesBySelectedCities(this.selectedCities).subscribe(res =>{
      console.log(res);
      this.propertyList = res;
    })
  }
}
