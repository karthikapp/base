import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-barchartscust-region',
  templateUrl: './barchartscust-region.component.html',
  styleUrls: ['./barchartscust-region.component.css']
})
export class BarchartscustRegionComponent implements OnInit, OnDestroy {

options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	opportunities_cust: any;

   	oppoCustTotalValues: any;
   	oppoCustValues: any;
   	barCustRevenue: any;
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
    this.barCustRevenue = [];
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
              this.barCustRevenue.push({name: i.key, y:this.oppoCV});
            })
                  this.barCustRevenue.sort((a,b) => b.y - a.y);

                 this.barCustRevenue.splice(10);

              console.log("barPro", this.barCustRevenue);
                
                this.dobarCustomerCharts();
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

  ngOnDestroy(){
    this.alive = false;
  }

  dobarCustomerCharts(){
    var series =  [{
    'name': 'Customer',
    'data': []
  }], cur = this.barCustRevenue;

  cur.forEach( i => {
    series[0].data.push(i.y);
  })

  var xAxis = {
    'categories' : [],
    'title': {
      'text': 'Customer'
    }
  }, pre = this.barCustRevenue;

  pre.forEach( i => {
    xAxis.categories.push(i.name);
  })


      this.options = {
         chart: {
        type: 'bar'
    },
    title: {
        text: 'Top 10 Customers by Revenue'
    },

    xAxis: xAxis,
    yAxis: {
        title: {
            text: 'Revenue',
            align: 'high'
        },
        labels:
        {
          format: '{value} Rs',
          overflow: 'justify'
        },
        min: 0
    },
    tooltip: {
        valuePrefix: 'Rs. '
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series:series
      }
      
    }

  }



