import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterreviews'
})
export class FilterreviewsPipe implements PipeTransform {

  transform(value: any, edc1: any, edc2: any,  args?: any): any {
    if(edc1 == undefined || edc1 == ''){
		edc1 = null
	}

	if(edc2 == undefined || edc2 == ''){
		edc2 = null
	}

	// if(val == undefined || val == ''){
	// 	val = 0
	// }

  if (value && value.length){
 		console.log("pp",value,value.length, edc1,edc2)
    	return value.filter(values =>{
               
                if (edc1 && edc1 != null && edc2 == null && !(values.edc >= edc1)){
                	console.log("filter for dates",edc1, edc2, values.edc, values.edc >= edc1,  values.edc <= edc2)
                	console.log("hello")
                	return false;	
                }
                if(edc2 && edc2 != null && edc1 == null && !(values.edc <= edc2)){
                	console.log("krishna")
                	return false;
                }
                if(edc1  && edc2 && edc1!= null && edc2 !=null && !(values.edc >= edc1 && values.edc <= edc2)){
	                console.log("bharadwaj")
	                return false;
	            }
	            // if (val && values.value.toString().indexOf(val.toString()) === -1){
             //    	console.log("pp", val, values.value == val)
             //        return false;
             //    }
                return true;
           })
        }
        else{
            return value;
        }
    }
}
