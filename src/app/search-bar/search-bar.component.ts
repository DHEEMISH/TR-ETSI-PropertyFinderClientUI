import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() emitter:EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private configService: ConfigService, private router: Router){
  }
  toppings = new FormControl('');
  selected: string[] = [];
  searchModel: string = '';
  public cityList: any = [];

  ngOnInit(){
    this.configService.getCities().subscribe(
      res => {
        this.cityList = res;
        //console.log(res);
      }
    )
  }
  emit(selectedCities: string[]){
    this.emitter.emit(selectedCities);
  }

  search(searchText: string){
    //console.log('Search bar Text ', searchText);
    this.searchEmitter.emit(searchText);
  }

  addProperty(){
    this.router.navigate(["/registerproperty"]);
  }
}
