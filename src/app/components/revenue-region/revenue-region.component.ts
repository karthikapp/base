import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-region',
  templateUrl: './revenue-region.component.html',
  styleUrls: ['./revenue-region.component.css']
})
export class RevenueRegionComponent implements OnInit, OnDestroy {

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	opportunities_region: any;

   	oppoRegionTotalValues: any;
   	oppoRegionValues: any;
   	pieRegionRevenue: any;
   	dataRegion: any;

   	oppoTRV: any;
   	oppoRV: any;
  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_region = [];
  	this.oppoRegionTotalValues = [];
  	this.oppoRegionValues = [];
  	this.dataRegion = [];
  	this.pieRegionRevenue = [];
  	this.oppoTRV = 0;
  	this.oppoRV = 0;

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
            				this.opportunities_region = u;
            				this.opportunities_region.forEach( i => {
            					if(i.valueofdeal != undefined){
            						this.oppoRegionTotalValues.push(i.valueofdeal)
            					}
            				})
            				this.oppoTRV = this.oppoRegionTotalValues.reduce((a, b) => a + b, 0);

            				const groupedObj = this.opportunities_region.reduce((prev, cur)=> {
            					if(!prev[cur['region']]) {
            						prev[cur['region']] = [cur];
            					} else {
            						prev[cur['region']].push(cur);
            					}
            				console.log("prev", prev);
            				return prev;
            			}, {});



            			this.dataRegion = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
            			this.dataRegion.forEach( i => {
            				this.oppoRegionValues = [];
							i.value.forEach( j => {
							this.oppoRegionValues.push(j.valueofdeal)
							console.log("j", this.oppoRegionValues);
							})
							this.oppoRV = 0;
							this.oppoRV = this.oppoRegionValues.reduce((a,b) => a+b, 0);
							var valuePercent = (this.oppoRV/ this.oppoTRV)*100;
							console.log("PVTV", this.oppoRV, this.oppoTRV, valuePercent )
							this.pieRegionRevenue.push({name: i.key, y:valuePercent});
						})
						console.log("dp", this.pieRegionRevenue);
            			this.dopieRegionCharts();
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
  	this.alive =false;
  }

  dopieRegionCharts(){



  	  	var series =  [{
		'name': 'Region',
		'colorByPoint': true,
		'data': []
	}], cur = this.pieRegionRevenue;

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
        text: 'Revenue By Region'
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
