import { Component, Input } from '@angular/core';
import { House } from '../model/house';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent {
  @Input() houseDetails!: House;

  ngOnInit(){
    //console.log("House Details", this.houseDetails);
  }
}
