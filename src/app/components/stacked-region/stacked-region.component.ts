import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-stacked-region',
  templateUrl: './stacked-region.component.html',
  styleUrls: ['./stacked-region.component.css']
})
export class StackedRegionComponent implements OnInit, OnDestroy {

	options: Object;

  uid: string;
   ev: boolean = false;

   alive: boolean = true;
   opportunities_stkreg: any;
   opportunities_stkregL: any;
   rv_last_updt_dt: any;
   opportunities_reg: any;
   datastckReg: any;
   dataSP: any;
   dataFinalList: any;


   datamonth: any;
   datayear: any;
   dataregion: any;

   chnList: any;
   hydList: any;
   bglrList: any;
   cmbtList: any;
   mumList:any;

   datachnvalue: any;
   databglrvalue: any;
   datahydvalue: any;
   datacmbtvalue : any;
   datamumvalue: any;

   yearSelect: any;
   currentYear: any;
   year_list:any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_stkreg = [];
    this.opportunities_stkregL = [];
  	this.datastckReg = [];
  	this.opportunities_reg = [];
  	this.dataSP = [];
  	this.dataFinalList = [];

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
                  this.opportunities_stkreg = u;

                  this.opportunities_stkreg.forEach( i=> {
                    var moved_time = new Date(i.casewontime);
                    var month = moved_time.getMonth();
                    var year = moved_time.getFullYear();
                    var date = moved_time.getDate();
                    var monthyear = i.region + ""+ month + "" + year;
                    console.log("time", moved_time,month,year, monthyear, date);
                    this.opportunities_reg.push({pkey:monthyear, region: i.region, month: month, year: year,valueofdeal: i.valueofdeal})    
                  })

                  this.yearList();

              		this.onSelectYear();
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

  yearList(){
    this.year_list = this.opportunities_reg
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  onSelectYear(){
    // this.opportunities_stkregL = this.opportunities_stkreg.filter( i => {
    //   return i.year == this.yearSelect;
    // })

    const groupedObj = this.opportunities_reg.reduce((prev, cur)=> {
      if(!prev[cur['pkey']]) {
        prev[cur['pkey']] = [cur];
      } else {
        prev[cur['pkey']].push(cur);
      }
      console.log("prev", prev);
      return prev;
    }, {});

    this.datastckReg = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key]}});

    console.log("up", this.datastckReg);

    this.datastckReg.forEach ( i => {
      this.datamonth = null;
      this.datayear = null;
      this.dataregion = '';
      this.dataSP = [];

      i.value.forEach( j =>
      {
        this.dataSP.push(j.valueofdeal);
        this.datamonth = j.month;
        this.datayear = j.year;
        this.dataregion = j.region;
      })

      var dataValues = this.dataSP.reduce((a,b) => a+b ,0);

      this.dataFinalList.push({ymr: i.key, region: this.dataregion, year: this.datayear,
        month: this.datamonth, monthlyRev: dataValues })
      console.log("up", this.dataFinalList);
    })

    this.chnList = this.dataFinalList.filter(i => {return i.region == 'chennai' && i.year == this.yearSelect})

    console.log("chnList", this.chnList);
    this.datachnvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.chnList.length; i++){
      this.datachnvalue.splice(this.chnList[i].month,1,this.chnList[i].monthlyRev);
    }

    this.bglrList = this.dataFinalList.filter(i => {return i.region == 'bangalore' && i.year == this.yearSelect})

    this.databglrvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.bglrList.length; i++){
      this.databglrvalue.splice(this.bglrList[i].month,1,this.bglrList[i].monthlyRev);
    }

    this.cmbtList = this.dataFinalList.filter(i => {return i.region == 'coimbatore' && i.year == this.yearSelect})

    console.log("chnList", this.cmbtList);
    this.datacmbtvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.cmbtList.length; i++){
      this.datacmbtvalue.splice(this.cmbtList[i].month,1,this.cmbtList[i].monthlyRev);
    }

    console.log ("chnList", this.datacmbtvalue);

    this.hydList = this.dataFinalList.filter(i => {return i.region == 'hyderabad' && i.year == this.yearSelect})

    console.log("chnList", this.hydList);
    this.datahydvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.hydList.length; i++){
      this.datahydvalue.splice(this.hydList[i].month,1,this.hydList[i].monthlyRev);
    }

    console.log ("chnList", this.datahydvalue);

    this.mumList = this.dataFinalList.filter(i => {return i.region == 'mumbai' && i.year == this.yearSelect})

    console.log("chnList", this.mumList);
    this.datamumvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.mumList.length; i++){
      this.datamumvalue.splice(this.mumList[i].month,1,this.mumList[i].monthlyRev);
    }

    console.log ("chnList", this.datamumvalue);

    this.dostackedRegioncharts();

  }

  onYearChange(value){
    this.yearSelect = value;
    this.onSelectYear();
  }

  dostackedRegioncharts(){

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
	}], chn = this.datachnvalue,
	bglr = this.databglrvalue,
	cmbt = this.datacmbtvalue,
	mumb = this.datamumvalue,
	hyd = this.datahydvalue;

	for( let i =0 ; i < 12; i++)
	{
		series[0].data.push(chn[i]);
		series[1].data.push(bglr[i]);
		series[2].data.push(cmbt[i]);
		series[3].data.push(mumb[i]);
		series[4].data.push(hyd[i]);
	}
  	


  	this.options = {
  		chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
       	title: {
            text: 'Month'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Revenue'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold'
            }
        },
        labels:
        {
          format: '{value} Rs'
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: series
  	}
  }

}
