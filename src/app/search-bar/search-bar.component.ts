import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() emitter:EventEmitter<string[]>
       = new EventEmitter<string[]>();
  constructor(
    private configService: ConfigService){
  }
  toppings = new FormControl('');
  selected: string[] = [];
  public cityList: any = [];

  ngOnInit(){
    this.configService.getCities().subscribe(
      res => {
        this.cityList = res;
        console.log(res);
      }
    )
  }
  emit(selectedCities: string[]){
    this.emitter.emit(selectedCities);
  }
}
