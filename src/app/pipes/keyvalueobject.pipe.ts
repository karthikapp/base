import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalueobject'
})
export class KeyvalueobjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    //console.log("value", value)
    if(value == '' || value == undefined || value == null)
    {
    	return keys;
    }
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    //console.log("keys", keys)
    return keys;
  }

}
