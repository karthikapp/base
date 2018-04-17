import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenuecharts-customer',
  templateUrl: './revenuecharts-customer.component.html',
  styleUrls: ['./revenuecharts-customer.component.css']
})
export class RevenuechartsCustomerComponent implements OnInit, OnDestroy {

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	opportunities_cust: any;

   	oppoCustTotalValues: any;
   	oppoCustValues: any;
   	pieCustRevenue: any;
   	dataCust: any;

   	oppoTCV: any;
   	oppoCV: any;
     valuePercent: any;
    colValue: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_cust = [];
  	this.oppoCustTotalValues = [];
  	this.oppoCustValues = [];
  	this.dataCust = [];
  	this.pieCustRevenue = [];
  	this.oppoTCV = 0;
  	this.oppoCV = 0;
    this.colValue = '';

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
           this.analyticsservice.getOpportunitiesforrv()
            	.takeWhile(() => this.alive)
            	.subscribe( 
            		u => {
                  this.opportunities_cust = [];
                  this.dataCust = [];
                  this.pieCustRevenue = [];
                  
            				this.opportunities_cust = u;
            				this.opportunities_cust.forEach( i => {
            					if(i.valueofdeal != undefined){
            						this.oppoCustTotalValues.push(i.valueofdeal)
            					}
            				})
            				this.oppoTCV = this.oppoCustTotalValues.reduce((a, b) => a + b, 0);

            				const groupedObj = this.opportunities_cust.reduce((prev, cur)=> {
            					if(!prev[cur['company_id']]) {
            						prev[cur['company_id']] = [cur];
            					} else {
            						prev[cur['company_id']].push(cur);
            					}
            				console.log("prev", prev);
            				return prev;
            			}, {});



            			this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
            			this.dataCust.forEach( i => {
            				this.oppoCustValues = [];
							i.value.forEach( j => {
							this.oppoCustValues.push(j.valueofdeal)
							console.log("j", this.oppoCustValues);
							})
							this.oppoCV = 0;
              this.valuePercent = null
							this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
							this.valuePercent = (this.oppoCV/ this.oppoTCV)*100;
							console.log("PVTV", this.oppoCV, this.oppoTCV, this.valuePercent )
							this.pieCustRevenue.push({name: i.key, y:this.valuePercent});
						})
						console.log("dp", this.pieCustRevenue);
            			this.dopieCustomerCharts();
            		})

   				// this.colValue = 'company_id'
       //        this.analyticsservice.getOppoforCust(this.colValue).subscribe( u => {this.pieCustRevenue = u;
       //          console.log("PiePro", this.pieCustRevenue);
       //          this.dopieCustomerCharts();})

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

  ngOnDestroy() {
  	this.alive = false
  }

  dopieCustomerCharts(){



  	  	var series =  [{
		'name': 'Customer',
		'colorByPoint': true,
		'data': []
	}], cur = this.pieCustRevenue;

	console.log("srpcur", cur);

		cur.forEach( i => {
			series[0].data.push(i);
		})
		
	

// console.log("srp",series);

  	this.options = {
  	chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Revenue By Customer'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                 enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },

    series: series
    //  [{
    //     name: 'Brands',
    //     colorByPoint: true,
    //     data: [{
    //         name: this.pieProdRevenue.name,
    //         y: this.pieProdRevenue.y
    //     }]
    // }]
   
}

  }

}
