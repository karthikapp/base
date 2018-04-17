import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';


@Component({
  selector: 'app-barcharts-region',
  templateUrl: './barcharts-region.component.html',
  styleUrls: ['./barcharts-region.component.css']
})
export class BarchartsRegionComponent implements OnInit {

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	//opportunities_toppro: any;

     barProdRevenue: any;
     opportunities_pro: any;

     oppoProTotalValues: any;
     oppoProValues: any;
     
     dataPro: any;

     oppoTPV: any;
     oppoPRV: any;
     colValue: any;

   	

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {

  	//this.opportunities_toppro = [];

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
              this.opportunities_pro = [];
    this.oppoProTotalValues = [];
    this.oppoProValues = [];
    this.dataPro = [];
    this.barProdRevenue = [];
    this.oppoTPV = 0;
    this.oppoPRV = 0;
    this.colValue = '';

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
              this.barProdRevenue.push({name: i.key, y:this.oppoPRV});
            })

                  console.log("barPro", this.barProdRevenue);
                 this.barProdRevenue.sort((a,b) => b.y - a.y);

                 this.barProdRevenue.splice(10);

              console.log("barPro", this.barProdRevenue);



                  this.dobarProductCharts();
                })

              // this.colValue = 'product'
              // this.analyticsservice.getOppoforProd(this.colValue).subscribe( u => {this.barProdRevenue = u;
              //   console.log("PiePro", this.barProdRevenue);
              //   this.dobarProductCharts();
              // })
   				
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


    dobarProductCharts(){

      var series =  [{
    'name': 'Products',
    'data': []
  }], cur = this.barProdRevenue;

  cur.forEach( i => {
    series[0].data.push(i.y);
  })

  var xAxis = {
    'categories' : [],
    'title': {
      'text': 'Products'
    }
  }, pre = this.barProdRevenue;

  pre.forEach( i => {
    xAxis.categories.push(i.name);
  })


      this.options = {
         chart: {
        type: 'bar'
    },
    title: {
        text: 'Top 10 Products by Revenue'
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
