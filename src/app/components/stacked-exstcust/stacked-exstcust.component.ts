import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-stacked-exstcust',
  templateUrl: './stacked-exstcust.component.html',
  styleUrls: ['./stacked-exstcust.component.css']
})
export class StackedExstcustComponent implements OnInit, OnDestroy {


       @Input()
   yflag: any;

	options: Object;

  	uid: string;
   	ev: boolean = false;
   	alive: boolean = true;

   opportunities_stkexc: any;
   opportunities_stkexcL: any;
   rv_last_updt_dt: any;
   opportunities_exc: any;
   datastckexc: any;
   dataexc: any;
   dataFinalList: any;

   datamonth: any;
   dataexcust: any;

   excustList: any;
   noexcustList: any;

   dataexcustvalue: any;
   datanoexcustvalue: any;



   yearSelect: any;

    fyearSelect: any;
   
  currentYear: any;
  previousYear: any;

  year_list:any;
  fyear_list: any;



      yrflag: boolean = false;
  fyflag: boolean = false;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_stkexc = [];

         if(this.yflag == 1){
      this.fyflag = true;
    }
    else if( this.yflag == 2)
    {
      this.yrflag = true;
    }

    
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
               this.previousYear = this.currentYear - 1;
              this.fyearSelect = this.previousYear + '-' + this.currentYear;

            	this.analyticsservice.getOpportunitiesforrv()
            	.takeWhile(() => this.alive)
            	.subscribe( 
            		u => {
                  this.opportunities_stkexc = [];
                  this.opportunities_stkexc = u;

                   if(this.yrflag == false){
                this.yearList();
                  this.onSelectYear();
                
              } else if (this.fyflag == false){
                this.fyearList();
        
              this.onSelectFY();
            }

                  	

            	})
              return this.ev = true;
            }
            
            else
            {
              // console.log('No access to this page choco');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            // console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  ngOnDestroy(){
  	this.alive = false;
  }

  yearList(){
    this.year_list = this.opportunities_stkexc
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

      fyearList(){
    this.fyear_list = this.opportunities_stkexc
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      // console.log("fyear", this.fyear_list)

  }

  onSelectFY(){
    this.opportunities_stkexcL = [];
    this.dataexc = [];
    this.opportunities_exc = [];
    this.datastckexc = [];
    this.dataFinalList = [];

    this.opportunities_stkexcL = this.opportunities_stkexc.filter( i => {
      return i.financial_year == this.fyearSelect;
    })

    this.opportunities_stkexcL.forEach( i=> {
      var lsmonth = i.existing_customer + ""+ i.month;
      this.opportunities_exc.push({pkey:lsmonth, existing_customer: i.existing_customer, 
        month: i.month,valueofdeal: i.valueofdeal})  
      // console.log("up", this.opportunities_exc);  
    })
    
    const groupedObj = this.opportunities_exc.reduce((prev, cur)=> {
      if(!prev[cur['pkey']]) {
        prev[cur['pkey']] = [cur];
      } else {
        prev[cur['pkey']].push(cur);
      }
      // console.log("prev", prev);
      return prev;
    }, {});

    this.datastckexc = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key]}});

    // console.log("up", this.datastckexc);

    this.datastckexc.forEach ( i => {
      this.datamonth = null;
      this.dataexcust = '';
      this.dataexc = [];

      i.value.forEach( j =>
      {
        this.dataexc.push(j.valueofdeal);
        this.datamonth = j.month;
        this.dataexcust = j.existing_customer;
      })

      var dataValues = this.dataexc.reduce((a,b) => a+b ,0);

      this.dataFinalList.push({ymr: i.key, existing_customer: this.dataexcust,
        month: this.datamonth, monthlyRev: dataValues })
      // console.log("up", this.dataFinalList);
    })

    this.excustList = this.dataFinalList.filter(i => {return i.existing_customer == true})

    // console.log("chnList", this.excustList);
    this.dataexcustvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.excustList.length; i++){
      this.dataexcustvalue.splice(this.excustList[i].month,1,this.excustList[i].monthlyRev);
    }

    this.noexcustList = this.dataFinalList.filter(i => {return i.existing_customer == false})

    this.datanoexcustvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.noexcustList.length; i++){
      this.datanoexcustvalue.splice(this.noexcustList[i].month,1,this.noexcustList[i].monthlyRev);
    }

    this.dostackedExCustcharts();

  }


  onSelectYear(){
    this.opportunities_stkexcL = [];
    this.dataexc = [];
    this.opportunities_exc = [];
    this.datastckexc = [];
    this.dataFinalList = [];

    this.opportunities_stkexcL = this.opportunities_stkexc.filter( i => {
      return i.year == this.yearSelect;
    })

    this.opportunities_stkexcL.forEach( i=> {
      var lsmonth = i.existing_customer + ""+ i.month;
      this.opportunities_exc.push({pkey:lsmonth, existing_customer: i.existing_customer, 
      	month: i.month,valueofdeal: i.valueofdeal})  
      // console.log("up", this.opportunities_exc);  
    })
    
    const groupedObj = this.opportunities_exc.reduce((prev, cur)=> {
      if(!prev[cur['pkey']]) {
        prev[cur['pkey']] = [cur];
      } else {
        prev[cur['pkey']].push(cur);
      }
      // console.log("prev", prev);
      return prev;
    }, {});

    this.datastckexc = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key]}});

    // console.log("up", this.datastckexc);

    this.datastckexc.forEach ( i => {
      this.datamonth = null;
      this.dataexcust = '';
      this.dataexc = [];

      i.value.forEach( j =>
      {
        this.dataexc.push(j.valueofdeal);
        this.datamonth = j.month;
        this.dataexcust = j.existing_customer;
      })

      var dataValues = this.dataexc.reduce((a,b) => a+b ,0);

      this.dataFinalList.push({ymr: i.key, existing_customer: this.dataexcust,
        month: this.datamonth, monthlyRev: dataValues })
      // console.log("up", this.dataFinalList);
    })

    this.excustList = this.dataFinalList.filter(i => {return i.existing_customer == true})

    // console.log("chnList", this.excustList);
    this.dataexcustvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.excustList.length; i++){
      this.dataexcustvalue.splice(this.excustList[i].month,1,this.excustList[i].monthlyRev);
    }

    this.noexcustList = this.dataFinalList.filter(i => {return i.existing_customer == false})

    this.datanoexcustvalue = ['','','','','','','','','','','','']

    for(let i=0; i< this.noexcustList.length; i++){
      this.datanoexcustvalue.splice(this.noexcustList[i].month,1,this.noexcustList[i].monthlyRev);
    }

    this.dostackedExCustcharts();

  }

  onYearChange(value){
    this.yearSelect = value;
    this.onSelectYear();
  }

        onFYearChange(fyear){
    this.fyearSelect = fyear;

    this.onSelectFY();
  }

  dostackedExCustcharts(){

	var series =  [{
		'name': 'EXISTING CUSTOMER',
		'data': []
	},
	{
		'name': 'NEW CUSTOMER',
		'data': []
	}], excust = this.dataexcustvalue,
	noexcust = this.datanoexcustvalue;

	for( let i =1 ; i <= 12; i++)
	{
		series[0].data.push(excust[i]);
		series[1].data.push(noexcust[i]);
	}
  	


  	this.options = {
  		chart: {
        type: 'column'
    },
    title: {
        text: 'REVENUE BY EXISTING/NEW CUSTOMER'
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
        backgroundColor: 'white',
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
