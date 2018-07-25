import { Pipe, PipeTransform } from '@angular/core';
import { ReviewComponent } from '../components/review/review.component'

@Pipe({
  name: 'totalCountExec'
})
export class TotalCountExecPipe implements PipeTransform {

	newexec: any;
	oldexec: any;

    id: any;
    region: any;

    constructor(public review: ReviewComponent) {}


  transform(value: any, exec_wiseopportunity: any, oppostatus: any, oppovalue: any, 
  	edc1: any, edc2: any, args?: any): any {


    var a = [];

  	// for (var key in value) {
   //    if (value.hasOwnProperty(key)) {
   //      a.push({key: key, val: value[key]});
   //    }
   //  }

   a = [value];

      	if((oppostatus == '' || oppostatus == undefined || oppostatus == 'All') 
  		&& (oppovalue == '' || oppovalue == undefined || oppovalue == 'All')
  		&& (edc1 == undefined || edc1 == '' || edc1 == null)
  		&& (edc2 == undefined || edc2 == '' || edc1 == null))
  	{
  		//this.a = value
  		//console.log("a", this.a)
  		return a
  	}

    if (exec_wiseopportunity && exec_wiseopportunity.length){
 		//console.log("pp",value,value.length, edc1,edc2, oppostatus)
 		this.newexec = []
 		this.oldexec = []
    	 exec_wiseopportunity.filter(values => {
              
                if (edc1 && edc1 != null && edc2 == null && !(values.edc >= edc1))
                {
                	return false	
                }
                if(edc2 && edc2 != null && edc1 == null && !(values.edc <= edc2))
                {
                	return false
                }
                if(edc1  && edc2 && edc1!= null && edc2 !=null && !(values.edc >= edc1 && values.edc <= edc2))
                {
	                return false
	            }
                if(oppostatus && oppostatus != 'All' &&  values.opportunity_state.toLowerCase().indexOf(oppostatus.toLowerCase()) === -1)
                {	
                  return false
                }
                if(oppovalue && oppovalue != 'All' && oppovalue == '> 200000' && !(values.value > 200000))
                {
                  return false
                }
                if(oppovalue && oppovalue != 'All' && oppovalue == '<= 200000' && !(values.value <= 200000)){
                  return false
                }
                this.oldexec.push(values)  

                this.id = values.opportunity_assignedto   
                this.region = values.region       
           })


    	 	var k = {};
    	 	var l = [];
   	 		k = this.review.totalCountValueExec(this.oldexec, this.id, this.region)
   	 		l.push(k);

   	 		//console.log("l", l)
   	 		return l;

    
    	 //return k;


        }
        else{
            return a;
        }

        //console.log("exec", this.oldexec)

         return null;
  }


  



}
