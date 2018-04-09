import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AnalyticsService {
	created_at: any;
	fireAuth: any;
	rvcharts: FirebaseListObservable<any[]>;

  constructor(private ap: AngularFireDatabase) { 
  this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();
  }

  getOpportunitiesforrv(){
  	this.rvcharts =  this.ap.list('/analytics/casewon/deals',
			{query:
				{
				orderByChild: 'casewontime'
				}
			});
  	console.log("up",this.rvcharts)
		return this.rvcharts;
  }

}
