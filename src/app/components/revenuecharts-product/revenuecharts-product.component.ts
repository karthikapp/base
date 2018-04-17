import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';


@Component({
  selector: 'app-revenuecharts-product',
  templateUrl: './revenuecharts-product.component.html',
  styleUrls: ['./revenuecharts-product.component.css']
})
export class RevenuechartsProductComponent implements OnInit, OnDestroy {
	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;

   	opportunities: any;
   	oppoTotalValues: any;
   	oppoProdValues: any;
   	pieProdRevenue: any;
   	dataProd: any;

   	oppoTV: any;
   	oppoPV: any;

     valuePercent:any;
    colValue: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities = [];
  	this.oppoTotalValues = [];
  	this.oppoProdValues = [];
  	this.dataProd = [];
  	this.pieProdRevenue = [];
  	this.oppoTV = 0;
  	this.oppoPV = 0;
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
                  this.opportunities = [];
                  this.dataProd = [];
                  this.pieProdRevenue = [];
                  
            				this.opportunities = u;
            				this.opportunities.forEach( i => {
            					if(i.valueofdeal != undefined){
            						this.oppoTotalValues.push(i.valueofdeal)
            					}
            				})
            				this.oppoTV = this.oppoTotalValues.reduce((a, b) => a + b, 0);

            				const groupedObj = this.opportunities.reduce((prev, cur)=> {
            					if(!prev[cur['brand']]) {
            						prev[cur['brand']] = [cur];
            					} else {
            						prev[cur['brand']].push(cur);
            					}
            				console.log("prev", prev);
            				return prev;
            			}, {});



            			this.dataProd = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
            			this.dataProd.forEach( i => {
            				this.oppoProdValues = [];
							i.value.forEach( j => {
							this.oppoProdValues.push(j.valueofdeal)
							console.log("j", this.oppoProdValues);
							})
							this.oppoPV = 0;
              this.valuePercent = null;
							this.oppoPV = this.oppoProdValues.reduce((a,b) => a+b, 0);
							this.valuePercent = (this.oppoPV/ this.oppoTV)*100;
							console.log("PVTV", this.oppoPV, this.oppoTV, this.valuePercent )
							this.pieProdRevenue.push({name: i.key, y:this.valuePercent});
						})
						console.log("dp", this.pieProdRevenue);
            			this.dopieBrandCharts();
            		})

   				      // this.colValue = 'brand'
             //  this.analyticsservice.getOppoforProd(this.colValue).subscribe( u => {this.pieProdRevenue = u;
             //    //console.log("PiePro", this.pieProRevenue);
             //    this.dopieBrandCharts();})

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

  dopieBrandCharts(){



  	  	var series =  [{
		'name': 'Brands',
		'colorByPoint': true,
		'data': []
	}], cur = this.pieProdRevenue;

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
        text: 'Revenue By Brand'
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
