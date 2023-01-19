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
  @Input() searchText!: string;
  @Input() onlyShowRented!: boolean;
  @Input() onlyShowForSale!: boolean;
  @Input() furnished!: boolean;
  @Input() semiFurnished!: boolean;
  @Input() unFurnished!: boolean;
  constructor(private configService: ConfigService){
    
  }
  public propertyList!: any;

  ngOnInit(){
    this.configService.getPropertiesBySelectedCities(this.selectedCities).subscribe((res: any) =>{
      //console.log(res);
    })
  }

  ngOnChanges(){
    this.callAPI();
    //console.log('search text ', this.searchText);
  }

  callAPI(){
    //console.log("onlyShowRented", this.onlyShowRented);
    this.configService.getPropertiesBySelectedCities(this.selectedCities).subscribe((res: any[]) => {
      //console.log(res);
      //this.propertyList = res;
      let arr : any[] = [];
      if(this.onlyShowRented && !this.furnished && !this.semiFurnished && !this.unFurnished){
        //console.log('onlyShowRented ', this.onlyShowRented);
      arr = [ ...arr, ...res.filter((obj: any)=> {
        return obj.propertyType == 'Rental';
      })];
      }

      if(this.onlyShowForSale && !this.furnished && !this.semiFurnished && !this.unFurnished){
        //console.log('onlyShowForSale ', this.onlyShowForSale);
        arr = [ ...arr, ...res.filter((obj: any)=> {
          return obj.propertyType == 'For Sale';
        })];
      }

      if(this.furnished){
        //console.log('furnished ', this.furnished);
        if(!this.onlyShowRented && !this.onlyShowForSale){
          arr = [ ...arr, ...res.filter((obj: any)=> {
            return obj.furnished == 'Fully-furnished';
          })];
        } else if(this.onlyShowRented && !this.onlyShowForSale){
          arr = [ ...arr, ...res.filter((obj: any)=> {
            return obj.furnished == 'Fully-furnished' && obj.propertyType == 'Rental';
          })];
        } else if(!this.onlyShowRented && this.onlyShowForSale){
          arr = [ ...arr, ...res.filter((obj: any)=> {
            return obj.furnished == 'Fully-furnished' && obj.propertyType == 'For Sale';
          })];
        } else if(this.onlyShowRented && this.onlyShowForSale){
          arr = [ ...arr, ...res.filter((obj: any)=> {
            return obj.furnished == 'Fully-furnished' && obj.propertyType == 'For Sale' && obj.propertyType == 'For Sale';
          })];
        }
        
      }

      if(this.semiFurnished){
        //console.log('semiFurnished ', this.semiFurnished);
        arr = [ ...arr, ...res.filter((obj: any)=> {
          return obj.furnished == 'Semi-furnished';
        })];
      }

      if(this.unFurnished){
        //console.log('unFurnished ', this.unFurnished);
        arr = [ ...arr, ...res.filter((obj: any)=> {
          return obj.furnished == 'Unfurnished';
        })];
      }
      this.propertyList = arr.length > 0 ? arr : res;
    })
  }
}
