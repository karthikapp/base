import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-prod',
  templateUrl: './revenue-prod.component.html',
  styleUrls: ['./revenue-prod.component.css']
})
export class RevenueProdComponent implements OnInit, OnDestroy {

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	opportunities_pro: any;

   	oppoProTotalValues: any;
   	oppoProValues: any;
   	pieProRevenue: any;
   	dataPro: any;

   	oppoTPV: any;
   	oppoPRV: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_pro = [];
  	this.oppoProTotalValues = [];
  	this.oppoProValues = [];
  	this.dataPro = [];
  	this.pieProRevenue = [];
  	this.oppoTPV = 0;
  	this.oppoPRV = 0;

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
            				this.opportunities_pro = u;
            				this.opportunities_pro.forEach( i => {
            					if(i.valueofdeal != undefined){
            						this.oppoProTotalValues.push(i.valueofdeal)
            					}
            				})
            				this.oppoTPV = this.oppoProTotalValues.reduce((a, b) => a + b, 0);

            				const groupedObj = this.opportunities_pro.reduce((prev, cur)=> {
            					if(!prev[cur['product']]) {
            						prev[cur['product']] = [cur];
            					} else {
            						prev[cur['product']].push(cur);
            					}
            				console.log("prev", prev);
            				return prev;
            			}, {});



            			this.dataPro = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
            			this.dataPro.forEach( i => {
            				this.oppoProValues = [];
							i.value.forEach( j => {
							this.oppoProValues.push(j.valueofdeal)
							console.log("j", this.oppoProValues);
							})
							this.oppoPRV = 0;
							this.oppoPRV = this.oppoProValues.reduce((a,b) => a+b, 0);
							var valuePercent = (this.oppoPRV/ this.oppoTPV)*100;
							console.log("PVTV", this.oppoPRV, this.oppoTPV, valuePercent )
							this.pieProRevenue.push({name: i.key, y:valuePercent});
						})
						console.log("dp", this.pieProRevenue);
            			this.dopieProductsCharts();
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

  dopieProductsCharts(){



  	  	var series =  [{
		'name': 'Products',
		'colorByPoint': true,
		'data': []
	}], cur = this.pieProRevenue;

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
        text: 'Revenue By Product'
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
