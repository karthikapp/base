import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactpersons'
})
export class ContactpersonsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let list = Object.values(value);
    //console.log('cppipe',list);
    return list;
}

}

