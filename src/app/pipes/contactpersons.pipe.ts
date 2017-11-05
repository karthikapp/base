import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactpersons'
})
export class ContactpersonsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null){
    return null;
	} else {
    let list = Object.values(value);
    console.log(list);
    return list;
  }
}

}

