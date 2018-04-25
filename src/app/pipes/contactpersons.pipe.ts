//Pipe is used to declare values for each child of the Object.
// List of object within objects.

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactpersons'
})
export class ContactpersonsPipe implements PipeTransform {

  transform(value: any, args?: any): any {

  	//When value is undefined or null or empty, set to empty as NULL or UNDEFINED is unacceptable in *ngFor
  	if (value == '' || value == null || value == undefined){ 
  		//console.log('cpplist',value);
  		return value=[];
  	};
    
    //When value is present
    let list = Object.values(value);
    let key = Object.keys(value).length
    //console.log('cplist',list,value, key);
    return list;
}

}

