import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";

@Pipe({
  name: 'regionfilter'
})
export class RegionfilterPipe implements PipeTransform {
	person_list: any[];
	oppo_list: any[];
  listvalue: any[];

  transform(value: any, args?: any): any {

console.log("entering regionpipe",value, args);


if (args == 'All') {
  
  return value;
} else if (args != 'All'){
  this.listvalue = value.filter(i => { return i.region == args})

  return this.listvalue;
}

/*
let newlist =  Array.from(new Set(value));

console.log(newlist)
  	if (args == 'All') {

      for(i=0; i<= valuecount; i++){
        console.log("values", value[i].opportunity_assignedto)
        if(value[i].opportunity_assignedto != undefined){
        this.firebaseservice.getUser(value[i].opportunity_assignedto)
        .forEach(u => {
          if(u!=undefined){
              this.person_list.push(u);
              console.log("All",this.person_list,u, value[i].opportunity_assignedto);
           } else {
             this.oppo_list.push(value[i].opportunity_assignedto);
              console.log("oppo",this.oppo_list);
         }
         })
        }
      else {
        this.oppo_list.push(value[i].lead_title);
        console.log("oppo",this.oppo_list);
      }
    }

  }else if (args != 'All'){
    value = value.filter(i => { i.region == value.region })

    console.log("!All", value)
  	  this.firebaseservice.getUser(value.opportunity_assignedto).subscribe(u => {
  		{console.log("!All1",u,value.opportunity_assignedto);
         this.person_list = u}
  	})
  }
*/

  }

  constructor(private firebaseservice : FirebaseService){}

}
