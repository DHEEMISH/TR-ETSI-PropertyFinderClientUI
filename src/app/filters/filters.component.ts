import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() rentEmitter:EventEmitter<boolean>
       = new EventEmitter<boolean>();
       @Output() forSaleEmitter:EventEmitter<boolean>
       = new EventEmitter<boolean>();
       @Output() furnishedEmitter:EventEmitter<boolean>
       = new EventEmitter<boolean>();
       @Output() semiFurnishedEmitter:EventEmitter<boolean>
       = new EventEmitter<boolean>();
       @Output() unFurnishedEmitter:EventEmitter<boolean>
       = new EventEmitter<boolean>();
  public rent !: boolean;
  public forSale! : boolean;
  public furnished! : boolean;
  public semiFurnished! : boolean;
  public unFurnished! : boolean;

  ngOnInit(){
    //this.rent = false;
  }
  

  rental(rented: boolean){
    this.rentEmitter.emit(rented);
  }

  sale(forSale: boolean){
    this.forSaleEmitter.emit(forSale);
  }

  furnish(furnished: boolean){
    this.furnishedEmitter.emit(furnished);
  }

  semiFurnish(semiFurnished: boolean){
    this.semiFurnishedEmitter.emit(semiFurnished);
  }

  unFurnish(unfurnished: boolean){
    this.unFurnishedEmitter.emit(unfurnished);
  }
}
