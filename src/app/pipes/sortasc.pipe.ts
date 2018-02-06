import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortasc'
})
export class SortascPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	console.log("sortasc", value, args)
        return value.sort(function(a, b){
        	console.log("sortasc11",a[args.property], b[args.property] )
        	if(a[args.property] == undefined){
        		a[args.property] = null;
        	}
        	if(b[args.property] == undefined){
        		b[args.property] = null;
        	}
        	console.log("sortasc21",a[args.property], b[args.property] )
            if(a[args.property] < b[args.property]){
            	console.log("sortasc12",a[args.property], b[args.property] )
                return -1 * args.direction;
            }
            else if( a[args.property] > b[args.property]){
            	console.log("sortasc13",a[args.property], b[args.property] )
                return 1 * args.direction;
            }
            else{
                return 0;
            }
        });
    };
}
