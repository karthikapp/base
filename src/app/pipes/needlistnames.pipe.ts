import { Pipe, PipeTransform } from '@angular/core';
import  { FirebaseService } from '../services/firebase.service';
import "rxjs/add/operator/map";

@Pipe({
  name: 'needlistnames'
})
export class NeedlistnamesPipe implements PipeTransform {

need_name: string;
needlists: Object[];

constructor(public firebaseservice: FirebaseService){}

  transform(value: any, args?: any): any {
  	//console.log(value);
  	//this.anothermethod(value).subscribe();

    if(value == undefined){
      return [];
    }
  	
  	let value_count = Object.keys(value).length;
  	let values = Object.values(value);
  	//console.log(value_count, values);

  	let needlists = [];

  	for(let i=0; i<= value_count; i++){
  		if(values[i]!= undefined){
  		this.firebaseservice.getNeedList(values[i]).forEach(needlist => {
  			needlists.push(needlist)
  		})
  		}
  	}
  	//console.log(needlists);

  	return needlists

  	}
}
