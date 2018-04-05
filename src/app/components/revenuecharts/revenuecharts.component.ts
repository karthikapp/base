import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';

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

   opportunities: any;

   chnregionlist: any;
   chnregionvalue: any;
   bglrregionlist: any;
   bglrregionvalue: any;
   cmbtregionlist: any;
   cmbtregionvalue: any;
   mumbregionlist: any;
   mumbregionvalue: any;
   hydregionlist: any;
   hydregionvalue: any;

   movetolist: any;
   value: any;
   final_revenue: any;
   lead_title: any;
   final_revenueval: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

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
              
              this.chnregionlist = [];
              this.bglrregionlist = [];
              this.cmbtregionlist = [];
              this.mumbregionlist = [];
              this.hydregionlist = [];
              this.movetolist = [];

              this.final_revenue = [];
              this.final_revenueval = [];

            	this.firebaseservice.getopportunitiesbycw().subscribe(
            		v => { this.opportunities = v;
            			console.log ("v",this.opportunities)

            			this.opportunities.forEach( item =>
            			{
            				if (item.region == 'chennai')
            				{
            					this.chnregionlist.push(item);
            				}
            				else
            				{
            					console.log("no chennai region")
            				}

            				if(item.region =='hyderabad')
            				{
            					//this.hydregionvalue.push(item.value);
            					this.hydregionlist.push(item);
            				}
            				else
            				{
            					console.log("no hyderabad region")
            				}

            				if(item.region == 'mumbai')
            				{
            					//this.mumbregionvalue.push(item.value);
            					this.mumbregionlist.push(item);
            				}
            				else
            				{
            					console.log("no mumbai region")
            				}

            				if(item.region == 'bangalore')
            				{
            					//this.bglrregionvalue.push(item.value);
            					this.bglrregionlist.push(item);
            				}
            				else
            				{
            					console.log("no bangalore region")
            				}

            				if(item.region == 'coimbatore')
            				{
            					//this.cmbtregionvalue.push(item.value);
            					this.cmbtregionlist.push(item);
            				}
            				else
            				{
            					console.log("no coimbatore region");
            				}


            			})

            			console.log("valuechn",this.chnregionlist)

            			this.chnregionlist.forEach( i => {
            				
            				this.movetolist = Object.values(i.movetolist);
            				console.log("mv", i.movetolist, this.movetolist);
            				this.value = i.value;
            				this.lead_title = i.lead_title;
            				
            				this.movetolist.forEach(j => {
            					if(j.moved_to_stage == 'Case_won')
            					{
            						var moved_time = new Date(j.moved_time)
                                	var month = moved_time.getMonth();
                                	var year = moved_time.getFullYear();
                                	var date = moved_time.getDate();
            						console.log("kp", j.moved_time, month, year, date, typeof month, typeof year, typeof date);

            						// let element: any = {
            						// lead_title: this.lead_title, 
            						// value: this.value, 
            						// date_month: month, 
            						// date_year: year,
            						// date: date,
            						// fulldate: moved_time,
            						// dateUTC: j.moved_time
            						// }

            						let element: any = {
            							dateUTC: j.moved_time,
            							value: this.value
            						}

            						this.final_revenue.push([element.dateUTC, element.value])
            						console.log("fr", this.final_revenue, 
            							Date.UTC(this.final_revenue.date_year, this.final_revenue.date_month, this.final_revenue.date), 
            							this.final_revenue.value, typeof this.final_revenue.value);
            					}
            					else
            					{
            						console.log("no case won");
            					}

            					
            				})

            				//this.final_revenueval = Object.values(this.final_revenue)
            			})


            		})
            
         		 console.log("pv", this.final_revenue, this.final_revenueval);
   				this.dolineCharts();
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

  }

  dolineCharts(){

  	var data = this.final_revenue

  	console.log("pspr", data)

  	this.options = {
  	chart: {
        type: 'spline'
    },
    title: {
        text: 'Revenue trend over Time'
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
        }
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },

    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
    },

    series: 
     [{
        name: 'Winter 2012-2013',
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        data: data	
        
    }]
}


  

   } 

    

}
