import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AnalyticsService {
	created_at: any;
	fireAuth: any;
	rvcharts: FirebaseListObservable<any[]>;
	rv_last_updt_dt: any;

		opportunities_pro: any;

   	oppoProTotalValues: any;
   	oppoProValues: any;
   	pieProRevenue: any;
   	dataPro: any;

   	oppoTPV: any;
   	oppoPRV: any;

   	valuePPercent: any;

   	opportunities_cust: any;

   	oppoCustTotalValues: any;
   	oppoCustValues: any;
   	pieCustRevenue: any;
   	dataCust: any;

   	oppoTCV: any;
   	oppoCV: any;
     valueCPercent: any;
  	
  constructor(private ap: AngularFireDatabase) { 
  this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();
  	this.rv_last_updt_dt = this.ap.object('/analytics/casewon/last_updated');
  }

  getOpportunitiesforrv(){
  	this.rvcharts =  this.ap.list('/analytics/casewon/deals',
			{query:
				{
				orderByChild: 'casewontime'
				}
			});
  	// console.log("up",this.rvcharts)
		return this.rvcharts;
  }

  getOppoforProd(colValue){

  	this.oppoProTotalValues = [];
  	this.oppoProValues = [];
  	this.dataPro = [];
  	this.pieProRevenue = [];
  	this.oppoTPV = 0;
  	this.oppoPRV = 0;

  	return this.getOpportunitiesforrv().map( 
  		u => {
  			this.opportunities_pro = [];
  			this.opportunities_pro = u;
  			console.log("dp", this.opportunities_pro);
  			this.opportunities_pro.forEach( i => {
  				if(i.valueofdeal != undefined){
  					this.oppoProTotalValues.push(i.valueofdeal)
  				}
  			})
  			this.oppoTPV = this.oppoProTotalValues.reduce((a, b) => a + b, 0);

  			const groupedObj = this.opportunities_pro.reduce((prev, cur)=> {
  				if(!prev[cur[colValue]]) {
  					prev[cur[colValue]] = [cur];
  				} else {
  					prev[cur[colValue]].push(cur);
  				}
  				// console.log("prev", prev);
  				return prev;
  			}, {});



  			this.dataPro = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
  			// console.log("dp", this.dataPro);
  			this.dataPro.forEach( i => {
  				this.oppoProValues = [];
  				i.value.forEach( j => {
  					this.oppoProValues.push(j.valueofdeal)
  					// console.log("j", this.oppoProValues);
  				})
  				this.oppoPRV = 0;
  				this.valuePPercent = null;
  				this.oppoPRV = this.oppoProValues.reduce((a,b) => a+b, 0);
  				this.valuePPercent = (this.oppoPRV/ this.oppoTPV)*100;
  				// console.log("PVTV", this.oppoPRV, this.oppoTPV, this.valuePPercent )
  				this.pieProRevenue.push({name: i.key, y:this.valuePPercent});
  			})
  			// console.log("dp", this.pieProRevenue);
  			return this.pieProRevenue;
  		}
  	)

  }

  getOppoforCust(colValue){

  	this.opportunities_cust = [];
  	this.oppoCustTotalValues = [];
  	this.oppoCustValues = [];
  	this.dataCust = [];
  	this.pieCustRevenue = [];
   	this.oppoTCV = 0;
  	this.oppoCV = 0;

  	return  this.getOpportunitiesforrv()
            	.map( 
            		u => {
                  this.opportunities_cust = [];
            				this.opportunities_cust = u;
            				this.opportunities_cust.forEach( i => {
            					if(i.valueofdeal != undefined){
            						this.oppoCustTotalValues.push(i.valueofdeal)
            					}
            				})
            				this.oppoTCV = this.oppoCustTotalValues.reduce((a, b) => a + b, 0);

            				const groupedObj = this.opportunities_cust.reduce((prev, cur)=> {
            					if(!prev[cur[colValue]]) {
            						prev[cur[colValue]] = [cur];
            					} else {
            						prev[cur[colValue]].push(cur);
            					}
            				// console.log("prev", prev);
            				return prev;
            			}, {});



            			this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
            			this.dataCust.forEach( i => {
            				this.oppoCustValues = [];
							i.value.forEach( j => {
							this.oppoCustValues.push(j.valueofdeal)
							// console.log("j", this.oppoCustValues);
							})
							this.oppoCV = 0;
              				this.valueCPercent = null;
							this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
							this.valueCPercent = (this.oppoCV/ this.oppoTCV)*100;
							// console.log("PVTV", this.oppoCV, this.oppoTCV, this.valueCPercent )
							this.pieCustRevenue.push({name: i.key, y:this.valueCPercent});
						})
						// console.log("dp", this.pieCustRevenue);
            			return this.pieCustRevenue;
            		})

  }

}
