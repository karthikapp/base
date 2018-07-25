import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from "../services/firebase.service"

@Pipe({
  name: 'totalCountRegion'
})
export class TotalCountRegionPipe implements PipeTransform {

	users: any[];
	newValue: any;
	oldValue: any;

	oldexec: any;
	newexec: any;

	lapsedReviewE: any = 0;
	lapsedReviewEV1: any = 0;
	liveReviewE: any = 0;
	liveReviewEV1: any = 0;
	reviewCompleteEV1: any = 0;
	reviewCompleteE: any = 0;
	totalValueExec: any = 0;
	totalCountExec: any = 0;
	unReviewE: any = 0;
	unReviewEV1: any = 0;
	region:any;

	constructor(public fb: FirebaseService)
	{
		this.fb.getUsers().subscribe( p => {
			this.users = p
		})

	}

  transform(value: any, execList: any,  oppocategory: any,  args?: any): any {

  	var a = [];

  	// for (var key in value) {
   //    if (value.hasOwnProperty(key)) {
   //      a.push({key: key, val: value[key]});
   //    }
   //  }

   a = [value];

  	if( (oppocategory == '' || oppocategory == undefined || oppocategory == 'All') )
  	{
  		return a
  	}

  	if(execList && execList.length)
		{
			this.newValue = []

			 execList.filter(values => {
				
					this.oldValue = this.users.filter( q => {
						return (q.category === oppocategory)
					})
					
					this.oldValue.forEach( k => {
						if(k.userid == values.id)
						{
						  	this.newValue.push(values)
						}
					})

					
				})

			 this.lapsedReviewE = 0;
			 this.lapsedReviewEV1 = 0;
			 this.liveReviewE = 0;
			 this.liveReviewEV1 = 0;
			 this.reviewCompleteE = 0;
			 this.reviewCompleteEV1 = 0;
			 this.totalValueExec = 0;
			 this.totalCountExec = 0;
			 this.unReviewEV1 = 0;
			 this.unReviewE = 0;
			 this.region = '';

			 this.newValue.forEach( m => {
			 	console.log("lapsedReview", m.lapsedReviewEV1, m.liveReviewEV1)
			 	this.lapsedReviewE += m.lapsedReviewE
			 	this.lapsedReviewEV1 += +(m.lapsedReviewEV1.toString().replace(/,/g, ""))
			 	this.liveReviewE += m.liveReviewE
			 	this.liveReviewEV1 += +(m.liveReviewEV1.toString().replace(/,/g, ""))
			 	this.reviewCompleteE += m.reviewCompleteE
			 	this.reviewCompleteEV1 += +(m.reviewCompleteEV1.toString().replace(/,/g, ""))
			 	this.totalCountExec += m.totalCountExec
			 	this.totalValueExec += +(m.totalValueExec.toString().replace(/,/g, ""))
			 	this.unReviewE += m.unReviewE
			 	this.unReviewEV1 += +(m.unReviewEV1.toString().replace(/,/g, ""))
			 	this.region = m.regionexec

			 	console.log("lapsedReviewEV1", this.lapsedReviewEV1, this.liveReviewEV1)
			 })

// let filtervalue = value.filter( j=> {
// 	return j.region === this.region
// })

// const index = value.findIndex(v => v.region === this.region);

// value.splice(index,1,item)

// console.log("value", index)


		
			 let item = {
			      region: this.region,
			      totalCountReg: this.totalCountExec,
			      totalValueReg: this.totalValueExec,
			      reviewCompleteR: this.reviewCompleteE,
			      reviewCompleteRV1: this.reviewCompleteEV1,
			      lapsedReviewR: this.lapsedReviewE,
			      lapsedReviewRV1: this.lapsedReviewEV1,
			      liveReviewR: this.liveReviewE,
			      liveReviewRV1: this.liveReviewEV1,
			      unReviewR: this.unReviewE,
			      unReviewRV1: this.unReviewEV1
			    }

			 a = [];

		  	// for (var key in item) {
		   //    if (value.hasOwnProperty(key)) {
		   //      a.push({key: key, val: item[key]});
		   //    }
		   //  }

		   a.push(item)

		   console.log("a", a)

			 return a
				
		}
	 	else
		{
			return a;
		}

  return null;


}

}
