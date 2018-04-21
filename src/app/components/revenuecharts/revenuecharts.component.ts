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
   oppolist: any;

yearSelect: any;

    currentYear: any;
   year_list:any;

   opportunities_L: any;


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
              

              this.rv_last_updt_dt = this.analyticsservice.rv_last_updt_dt;
              this.currentYear = (new Date()).getFullYear();
              this.yearSelect = this.currentYear;

            	this.analyticsservice.getOpportunitiesforrv()
            	.takeWhile(() => this.alive)
            	.subscribe( 
            		u => {
                  this.opportunities = [];
                  this.opportunities = u;
                  this.yearList();
                 
                 this.selectChartList();

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

    onYearChange(year){
    this.yearSelect = year;
    this.selectChartList();
  }

  selectChartList(){
    this.opportunities_L = this.opportunities.filter( i => {
        return i.year == this.yearSelect 
      })
  }

   yearList(){
    this.year_list = this.opportunities
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
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
	}], cur = this.opportunities_L;

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

		if(item.region =='bangalore')
		{
			//this.hydregionlist.push([item.casewontime, item.valueofdeal]);
			series[1].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no bangalore region")
		}

		if(item.region == 'coimbatore')
		{

			//this.mumbregionlist.push([item.casewontime, item.valueofdeal]);
			series[2].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no coimbatore region")
		}

		if(item.region == 'mumbai')
		{

			//this.bglrregionlist.push([item.casewontime, item.valueofdeal]);
			series[3].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no mumbai region")
		}

		if(item.region == 'hyderabad')
		{
      //console.log("uppp", typeof(item.casewontime))
			//this.cmbtregionlist.push([item.casewontime, item.valueofdeal]);
			series[4].data.push([item.casewontime, item.valueofdeal]);
		}
		else
		{
			console.log("no hyderabad region");
		}

	})

console.log("srp",series);




  	this.options = {
  	chart: {
        type: 'column'
    },
    title: {
        text: 'REVENUE TREND OVER TIME'
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
            pointWidth: 2,
            
        },
        column: {
          dataLabels: {
            enabled: true
        }
      }
    },

    series: series
}


  

   } 

    

}
