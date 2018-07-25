import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCountReview'
})
export class TotalCountReviewPipe implements PipeTransform {

oppoRegionList: any;
  transform(value: any,  args?: any): any {

  	

  	console.log("totalCount", value )

  	// for(let i=0; i< Object.keys(regionlist).length; i++){
   //    this.oppoRegionList = opportunities.filter(u=> 
   //      {return u.region == regionlist[i]})
   //    this.totalCountValueReg(this.oppoRegionList,regionlist[i]);
   //    //this.showRegReview(this.oppoRegionList);
   //  }




   return null;
  }



}
