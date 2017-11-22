//Pipe is used to Sort the records in descending order 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortorder'
})
export class SortorderPipe implements PipeTransform {

  transform(value: any, ...args): any {
    if (!value)
    	{ return }
    else {
    	return value.slice().reverse();
    }
  }

}
