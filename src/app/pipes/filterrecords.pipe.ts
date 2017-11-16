import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterrecords'
})
export class FilterrecordsPipe implements PipeTransform {

  transform(value: any, input:any, args?: any): any {
  	console.log('hi',input,value);

    if(input == null) {return value}


    return value.filter( values => {
       values.companyname.toLowerCase().indexOf(input.toLowerCase()) > -1;
       console.log(values.companyname.toLowerCase().indexOf(input.toLowerCase()) > -1);

    })
}

  

}
