import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-stacked-leadsource',
  templateUrl: './stacked-leadsource.component.html',
  styleUrls: ['./stacked-leadsource.component.css']
})
export class StackedLeadsourceComponent implements OnInit, OnDestroy {

  options: Object;

  uid: string;
   ev: boolean = false;

   alive: boolean = true;
   opportunities_stkls: any;
   opportunities_stklsL: any;
   rv_last_updt_dt: any;
   opportunities_ls: any;
   datastckLS: any;
   dataLS: any;
   dataFinalList: any;


   datamonth: any;
   dataleadsrce: any;

   inbdList: any;
   eventList: any;
   distList: any;
   oemList: any;
   outbndList: any;
   onsiteList: any;

   datainbdvalue: any;
   dataeventvalue: any;
   datadistvalue: any;
   dataoemvalue : any;
   dataoutbndvalue: any;
   dataonsitevalue: any;

   yearSelect: any;
   currentYear: any;
   year_list:any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_stkls = [];
    

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
                  this.opportunities_stkls = [];
                  this.opportunities_stkls = u;

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
    this.year_list = this.opportunities_stkls
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  onSelectYear(){
    this.opportunities_stklsL = [];
    this.dataLS = [];
    this.opportunities_ls = [];
    this.datastckLS = [];
    this.dataFinalList = [];

    this.opportunities_stklsL = this.opportunities_stkls.filter( i => {
      return i.year == this.yearSelect;
    })

    this.opportunities_stklsL.forEach( i=> {
      // var moved_time = new Date(i.casewontime);
      // var month = moved_time.getMonth();
      // var year = moved_time.getFullYear();
      // var date = moved_time.getDate();
      var lsmonth = i.leadsource + ""+ i.month;
      this.opportunities_ls.push({pkey:lsmonth, leadsource: i.leadsource, month: i.month,valueofdeal: i.valueofdeal})  
      console.log("up", this.opportunities_ls);  
    })
    
    const groupedObj = this.opportunities_ls.reduce((prev, cur)=> {
      if(!prev[cur['pkey']]) {
        prev[cur['pkey']] = [cur];
      } else {
        prev[cur['pkey']].push(cur);
      }
      console.log("prev", prev);
      return prev;
    }, {});

    this.datastckLS = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key]}});

    console.log("up", this.datastckLS);

    this.datastckLS.forEach ( i => {
      this.datamonth = null;
      this.dataleadsrce = '';
      this.dataLS = [];

      i.value.forEach( j =>
      {
        this.dataLS.push(j.valueofdeal);
        this.datamonth = j.month;
        this.dataleadsrce = j.leadsource;
      })

      var dataValues = this.dataLS.reduce((a,b) => a+b ,0);

      this.dataFinalList.push({ymr: i.key, leadsource: this.dataleadsrce,
        month: this.datamonth, monthlyRev: dataValues })
      console.log("up", this.dataFinalList);
    })

    this.inbdList = this.dataFinalList.filter(i => {return i.leadsource == 'inbound-landline'})

    console.log("chnList", this.inbdList);
    this.datainbdvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.inbdList.length; i++){
      this.datainbdvalue.splice(this.inbdList[i].month,1,this.inbdList[i].monthlyRev);
    }

    this.eventList = this.dataFinalList.filter(i => {return i.leadsource == 'event'})

    this.dataeventvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.eventList.length; i++){
      this.dataeventvalue.splice(this.eventList[i].month,1,this.eventList[i].monthlyRev);
    }

    this.distList = this.dataFinalList.filter(i => {return i.leadsource == 'distributor'})

    console.log("chnList", this.distList);
    this.datadistvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.distList.length; i++){
      this.datadistvalue.splice(this.distList[i].month,1,this.distList[i].monthlyRev);
    }

    console.log ("chnList", this.datadistvalue);

    this.oemList = this.dataFinalList.filter(i => {return i.leadsource == 'oem'})

    console.log("chnList", this.oemList);
    this.dataoemvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.oemList.length; i++){
      this.dataoemvalue.splice(this.oemList[i].month,1,this.oemList[i].monthlyRev);
    }

    console.log ("chnList", this.dataoemvalue);

    this.outbndList = this.dataFinalList.filter(i => {return i.leadsource == 'outboundcall'})

    console.log("chnList", this.outbndList);
    this.dataoutbndvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.outbndList.length; i++){
      this.dataoutbndvalue.splice(this.outbndList[i].month,1,this.outbndList[i].monthlyRev);
    }

    console.log ("chnList", this.dataoutbndvalue);

    this.onsiteList = this.dataFinalList.filter(i => {return i.leadsource == 'onsite'})

    console.log("chnList", this.onsiteList);
    this.dataonsitevalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.onsiteList.length; i++){
      this.dataonsitevalue.splice(this.onsiteList[i].month,1,this.onsiteList[i].monthlyRev);
    }

    console.log ("chnList", this.dataonsitevalue);


    this.dostackedRegioncharts();

  }

  onYearChange(value){
    this.yearSelect = value;
    this.onSelectYear();
  }

  dostackedRegioncharts(){

	var series =  [{
		'name': 'INBOUND LANDLINE',
		'data': []
	},
	{
		'name': 'EVENT',
		'data': []
	},
	{
		'name': 'DISTRIBUTOR',
		'data': []
	},
	{
		'name': 'OEM',
		'data': []
	},
	{
		'name': 'OUTBOUND CALL',
		'data': []
	},
	{
		'name': 'ON SITE VISIT',
		'data': []
	}], inbd = this.datainbdvalue,
	evnt = this.dataeventvalue,
	dist = this.datadistvalue,
	oem = this.dataoemvalue,
	outbnd = this.dataoutbndvalue,
	onsite = this.dataonsitevalue;

	for( let i =1 ; i <= 12; i++)
	{
		series[0].data.push(inbd[i]);
		series[1].data.push(evnt[i]);
		series[2].data.push(dist[i]);
		series[3].data.push(oem[i]);
		series[4].data.push(outbnd[i]);
		series[5].data.push(onsite[i]);
	}
  	


  	this.options = {
  		chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked Column LeadSource Chart'
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
