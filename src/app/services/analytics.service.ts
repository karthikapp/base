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

  
}
