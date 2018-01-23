import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daterange'
})
export class DaterangePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
