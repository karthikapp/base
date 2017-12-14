import { Pipe, PipeTransform } from '@angular/core';
import  { FirebaseService } from '../services/firebase.service';
import "rxjs/add/operator/map";

@Pipe({
  name: 'competitornames'
})
export class CompetitornamesPipe implements PipeTransform {

	competitorlists: Object[];

constructor(public firebaseservice: FirebaseService){}

  transform(value: any, args?: any): any {
    //console.log(value);
  	//this.anothermethod(value).subscribe();
  	
  	let value_count = Object.keys(value).length;
  	let values = Object.values(value);
  	//console.log(value_count, values);

  	let competitorlists = [];

  	for(let i=0; i<= value_count; i++){
  		if(values[i]!= undefined){
  		this.firebaseservice.getCompetitorList(values[i]).forEach(competitorlist => {
  			competitorlists.push(competitorlist)
  		})
  		}
  	}
  	//console.log(competitorlists);

  	return competitorlists

  	
  }

}
