import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterrecords'
})
export class FilterrecordsPipe implements PipeTransform {

  transform(value: any, input:any, ip1: string, args?: any): any {
  	//console.log('hi',input,value);
    //console.log('hi2',ip1)

    if(input == null) {return value}

    if (ip1 == 'accounts'){
      return value.filter( values => {
       return values.companyname.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if (ip1 == 'oems'){
      return value.filter( values => {
       return values.oem_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if (ip1 == 'events'){
      return value.filter( values => {
       return values.event_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if (ip1 == 'products'){
      return value.filter( values => {
       return values.Product_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if (ip1 == 'distributors'){
      return value.filter( values => {
       return values.distributor_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    }

  } 
}
