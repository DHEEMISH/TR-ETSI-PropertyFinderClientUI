import { Pipe, PipeTransform } from '@angular/core';
import { House } from './model/house';

@Pipe({
  name: 'searchProperty'
})
export class SearchPropertyPipe implements PipeTransform {

  transform(list: House[], filterText: string): any {
    console.log(list, filterText);
    return filterText
      ? list.filter(
        (item) => item.title.search(new RegExp(filterText, 'i')) > -1 || item.description.search(new RegExp(filterText, 'i')) > -1
      )
      : list;
  }
}
