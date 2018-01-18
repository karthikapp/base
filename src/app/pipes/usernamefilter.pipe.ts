import { Pipe, PipeTransform } from '@angular/core';
import { Opportunities } from "../models/opportunities";

@Pipe({
  name: 'usernamefilter'
})
export class UsernamefilterPipe implements PipeTransform {

	oppolist: Opportunities[];

  transform(value: any, args?: any): any {
  	console.log("usernamefilter", value);
  	this.oppolist = [];
	
	let filteredData = value
	.map(item => item.opportunity_assignedto)
	.filter((value, index, self) => {self.indexOf(value) === index})

  	console.log("unamefilter", filteredData);

	let oppocountvalue = Object.keys(filteredData).length;

	for(let i=0; i<oppocountvalue; i++){
  	this.oppolist[i].opportunity_assignedto = filteredData[i];
  }
console.log("uname",this.oppolist);

    //return filteredData;
  }

}
