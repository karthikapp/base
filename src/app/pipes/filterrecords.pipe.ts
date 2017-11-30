//Pipe is used to filter for values for all tabs

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterrecords'
})
export class FilterrecordsPipe implements PipeTransform {

  transform(value: any, input:any, ip1: string, args?: any): any {

    //When Input == search String is NULL or UNDEFINED, 
    //return ALL the accounts / oems/ events/ products/ distributors values
    if(input == null || input == undefined) { 
      return value
    }

    //When value is NULL or UNDEFINED, make that value as '', so that filtering can be processed
    if( value == null || value == undefined) { 
      alert("A Company which is found to be EMPTY is present in the list of all accounts")  
      let value = '';
    }

    //Filtering the records based on value(ALL records) and input(search String)
    if ((value != null || value != undefined) && ip1 == 'accounts'){
      return value.filter( values => {
       return values.companyname.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'oems'){
      return value.filter( values => {
       return values.oem_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'events'){
      return value.filter( values => {
       return values.event_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'products'){
      return value.filter( values => {
       return values.Product_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'distributors'){
      return value.filter( values => {
       return values.distributor_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'needs'){
      return value.filter( values => {
       return values.need_name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    } else if ((value != null || value != undefined) && ip1 == 'users'){
      return value.filter( values => {
       return values.name.toLowerCase().indexOf(input.toLowerCase()) > -1;
      })
    }
  } 
}
