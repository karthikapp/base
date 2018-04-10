import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenuecharts',
  templateUrl: './revenuecharts.component.html',
  styleUrls: ['./revenuecharts.component.css']
})
export class RevenuechartsComponent implements OnInit, OnDestroy {

	options: Object;

  uid: string;
   ev: boolean = false;

   alive: boolean = true;
   rv_last_updt_dt: any;

   opportunities: any;

 constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities = [];

  	this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         
         this.firebaseservice.getUser(this.uid)
          .takeWhile(() => this.alive)
          .subscribe((v) => {
            if (v.report == undefined)
            {
                v.report = '';
            }

            if (v.role == undefined)
            {
              v.role = '';
            }

            if(v.title == undefined)
            {
              v.title = '';
            }

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "PRESALES"
              || v.role.toUpperCase() == "MASTER")
            {
              


            	// this.firebaseservice.getopportunitiesbycw().subscribe(
            	// 	v => { this.opportunities = v;
            	// 		console.log ("v",this.opportunities)

            			// this.opportunities.forEach( item =>
            			// {
            			// 	if (item.region == 'chennai')
            			// 	{
            			// 		this.chnregionlist.push(item);
            			// 	}
            			// 	else
            			// 	{
            			// 		console.log("no chennai region")
            			// 	}

            			// 	if(item.region =='hyderabad')
            			// 	{
            			// 		//this.hydregionvalue.push(item.value);
            			// 		this.hydregionlist.push(item);
            			// 	}
            			// 	else
            			// 	{
            			// 		console.log("no hyderabad region")
            			// 	}

            			// 	if(item.region == 'mumbai')
            			// 	{
            			// 		//this.mumbregionvalue.push(item.value);
            			// 		this.mumbregionlist.push(item);
            			// 	}
            			// 	else
            			// 	{
            			// 		console.log("no mumbai region")
            			// 	}

            			// 	if(item.region == 'bangalore')
            			// 	{
            			// 		//this.bglrregionvalue.push(item.value);
            			// 		this.bglrregionlist.push(item);
            			// 	}
            			// 	else
            			// 	{
            			// 		console.log("no bangalore region")
            			// 	}

            			// 	if(item.region == 'coimbatore')
            			// 	{
            			// 		//this.cmbtregionvalue.push(item.value);
            			// 		this.cmbtregionlist.push(item);
            			// 	}
            			// 	else
            			// 	{
            			// 		console.log("no coimbatore region");
            			// 	}


            			// })

            	// 		console.log("valuechn",this.chnregionlist)

            	// 		this.chnregionlist.forEach( i => {
            				
            	// 			this.movetolist = Object.values(i.movetolist);
            	// 			console.log("mv", i.movetolist, this.movetolist);
            	// 			this.value = i.value;
            	// 			this.lead_title = i.lead_title;
            				
            	// 			this.movetolist.forEach(j => {
            	// 				if(j.moved_to_stage == 'Case_won')
            	// 				{
            	// 					var moved_time = new Date(j.moved_time)
             //                    	var month = moved_time.getMonth();
             //                    	var year = moved_time.getFullYear();
             //                    	var date = moved_time.getDate();
            	// 					console.log("kp", j.moved_time, month, year, date, typeof month, typeof year, typeof date);


            	// 					this.final_revenue.push([j.moved_time, this.value]);
            						
            	// 				}
            	// 				else
            	// 				{
            	// 					console.log("no case won");
            	// 				}

            					
            	// 			})

            	// 		})

            	// 		this.dolineCharts();
            	// 	})

              this.rv_last_updt_dt = this.analyticsservice.rv_last_updt_dt;

            	this.analyticsservice.getOpportunitiesforrv()
            	.takeWhile(() => this.alive)
            	.subscribe( 
            		u => {this.opportunities = u;
            			console.log("up", this.opportunities, u)
            		this.dolineCharts();
            	})

   				
              	return this.ev = true;
            }
            
            else
            {
              console.log('No access to this page choco');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  	
  }

  ngOnDestroy(){
  	this.alive = false;
  }

  dolineCharts(){


  	var series =  [{
		'name': 'Chennai',
		'data': []
	},
	{
		'name': 'Bangalore',
		'data': []
	},
	{
		'name': 'Coimbatore',
		'data': []
	},
	{
		'name': 'Mumbai',
		'data': []
	},
	{
		'name': 'Hyderabad',
		'data': []
	}], cur = this.opportunities;

	console.log("srpcur", cur);

	// cur.forEach( i =>
	// 	{
	// 	console.log("srpi",i);
	// 	series[0].data.push(i);
	// 	console.log("srpcur", series[0].data.push(i));
	// });


	cur.forEach( item => {
		if (item.region == 'chennai')
		{
			//this.chnregionlist.push([item.casewontime, item.valueofdeal]);
			series[0].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no chennai region")
		}

		if(item.region =='hyderabad')
		{
			//this.hydregionlist.push([item.casewontime, item.valueofdeal]);
			series[1].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no hyderabad region")
		}

		if(item.region == 'mumbai')
		{

			//this.mumbregionlist.push([item.casewontime, item.valueofdeal]);
			series[2].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no mumbai region")
		}

		if(item.region == 'bangalore')
		{

			//this.bglrregionlist.push([item.casewontime, item.valueofdeal]);
			series[3].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no bangalore region")
		}

		if(item.region == 'coimbatore')
		{

			//this.cmbtregionlist.push([item.casewontime, item.valueofdeal]);
			series[4].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no coimbatore region");
		}

	})

console.log("srp",series);




  	this.options = {
  	chart: {
        type: 'column'
    },
    title: {
        text: 'Revenue Trend Over Time'
    },
    xAxis: {
        type: 'datetime',
       title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'Revenue'
        },
        labels:
        {
          format: '{value} Rs'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: Rs. {point.y:.2f} '
    },

    plotOptions: {
     series: {
            pointWidth: 4
        }
    },

    series: series
    //  [{
    //     name: 'Chennai',
    //     data: [ this.chnregionlist ]
    // }]
}


  

   } 

    

}
