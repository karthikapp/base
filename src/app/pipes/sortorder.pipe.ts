import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortorder'
})
export class SortorderPipe implements PipeTransform {

  transform(value: any, ...args): any {
    //return null;
    if (!value)
    	{ return }
    else {
    	return value.slice().reverse();
    }
  }

}
