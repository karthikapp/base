import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

     @Input()
   yflag: any;

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
    name: any;

   yearSelect: any;
  monthSelect: any;
  quarterSelect: any;
  fyearSelect: any;
   
  currentYear: any;
  previousYear: any;

  year_list:any;
  month_list: any;
  fyear_list: any;
  quarter_list: any;

   oppocustlist:any;
   oppocustfylist: any;

   opportunities_custL: any;
   monthName: any;

     yrflag: boolean = false;
  fyflag: boolean = false;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_cust = [];
  	this.monthName = '';

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
               this.currentYear = (new Date()).getFullYear();
             this.previousYear = this.currentYear - 1;
              this.yearSelect = this.currentYear;
              this.monthSelect = '';
              this.quarterSelect = '';
              this.fyearSelect = this.previousYear + '-' + this.currentYear;
              // console.log("fyear", this.fyearSelect)

              this.analyticsservice.getOpportunitiesforrv()
            	.takeWhile(() => this.alive)
            	.subscribe( 
            		u => {
                  this.opportunities_cust = [];
                
            			this.opportunities_cust = u;

                     if(this.yrflag == false){
                this.yearCustList();
                  this.monthCustList();
                  this.selectCustYList();
              } else if (this.fyflag == false){
                this.fyearCustList();
              this.quarterCustList();
              this.selectCustFYList();
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

  ngOnDestroy() {
  	this.alive = false
  }

  getMonth(val){
     if (val == 1){
        this.monthName = "January"
    }

    else if (val == 2){
      this.monthName = "February"
    }
    else if (val == 3){
      this.monthName = "March"
    }

    else if (val == 4){
      this.monthName = "April"
    }
    else if (val == 5){
      this.monthName = "May"
    }
    else if (val == 6){
      this.monthName = "June"
    }
    else if (val == 7){
      this.monthName = "July"
    }

    else if (val == 8){
      this.monthName = "August"
    }
    else if (val == 9){
      this.monthName = "September"
    }
    else if (val == 10){
      this.monthName = "October"
    }

    else if (val == 11){
      this.monthName = "November"
    }
    else if (val == 12){
      this.monthName = "December"
    }
    
    return this.monthName

  }

  yearCustList(){
    this.year_list = this.opportunities_cust
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthCustList(){
    this.oppocustlist = [];
    this.oppocustlist = this.opportunities_cust.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppocustlist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  fyearCustList(){
    this.fyear_list = this.opportunities_cust
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      // console.log("fyear", this.fyear_list)

  }

  quarterCustList(){
    this.oppocustfylist = [];
    this.oppocustfylist = this.opportunities_cust.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.oppocustfylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      // console.log("fyear", this.quarter_list);
  }

  selectCustYList(){

    this.dataCust = [];
    this.pieCustRevenue = [];
    this.opportunities_custL = [];
    this.oppoCustTotalValues = [];
    this.oppoCustValues = [];
    this.dataCust = [];
    this.pieCustRevenue = [];
    this.oppoTCV = 0;
    this.oppoCV = 0;

    //console.log("up", this.monthSelect, this.yearSelect);

    if(this.monthSelect != ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
        return i.year == this.yearSelect &&
            i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
        return i.year == this.yearSelect
      })
    }

    //console.log("up", this.opportunities_custL);

    this.opportunities_custL.forEach( i => {
      if(i.valueofdeal != undefined){
        this.oppoCustTotalValues.push(i.valueofdeal)
      }
    })

    this.oppoTCV = this.oppoCustTotalValues.reduce((a, b) => a + b, 0);

    const groupedObj = this.opportunities_custL.reduce((prev, cur)=> {
      if(!prev[cur['company_id']]) {
        prev[cur['company_id']] = [cur];
      } else {
        prev[cur['company_id']].push(cur);
      }
      //console.log("prev", prev);
      return prev;
    }, {});

    this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
    this.dataCust.forEach( i => {
      this.oppoCustValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoCustValues.push(j.valueofdeal)
        this.name = j.companyname;
        //console.log("j", this.oppoCustValues);
      })
      this.oppoCV = 0;
      this.valuePercent = null
      this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
      this.valuePercent = (this.oppoCV/ this.oppoTCV)*100;
      //console.log("PVTV", this.oppoCV, this.oppoTCV, this.valuePercent )
      this.pieCustRevenue.push({name: this.name, y:this.valuePercent});
    })

    this.dopieCustomerCharts();
  }

selectCustFYList(){

    this.dataCust = [];
    this.pieCustRevenue = [];
    this.opportunities_custL = [];
    this.oppoCustTotalValues = [];
    this.oppoCustValues = [];
    this.dataCust = [];
    this.pieCustRevenue = [];
    this.oppoTCV = 0;
    this.oppoCV = 0;

    //console.log("up", this.monthSelect, this.yearSelect);

    if(this.quarterSelect != ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
        return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.quarterSelect == ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
        return i.financial_year == this.fyearSelect 
      })
    }

    //console.log("up", this.opportunities_custL);

    this.opportunities_custL.forEach( i => {
      if(i.valueofdeal != undefined){
        this.oppoCustTotalValues.push(i.valueofdeal)
      }
    })

    this.oppoTCV = this.oppoCustTotalValues.reduce((a, b) => a + b, 0);

    const groupedObj = this.opportunities_custL.reduce((prev, cur)=> {
      if(!prev[cur['company_id']]) {
        prev[cur['company_id']] = [cur];
      } else {
        prev[cur['company_id']].push(cur);
      }
      //console.log("prev", prev);
      return prev;
    }, {});

    this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
    this.dataCust.forEach( i => {
      this.oppoCustValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoCustValues.push(j.valueofdeal)
        this.name = j.companyname;
        //console.log("j", this.oppoCustValues);
      })
      this.oppoCV = 0;
      this.valuePercent = null
      this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
      this.valuePercent = (this.oppoCV/ this.oppoTCV)*100;
      //console.log("PVTV", this.oppoCV, this.oppoTCV, this.valuePercent )
      this.pieCustRevenue.push({name: this.name, y:this.valuePercent});
    })

    this.dopieCustomerCharts();
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthCustList();
    this.selectCustYList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectCustYList();
  }

    onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterCustList();
    this.selectCustFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectCustFYList();
  }

  dopieCustomerCharts(){

  var series =  [{
		'name': 'Customer',
		'colorByPoint': true,
		'data': []
	}], cur = this.pieCustRevenue;

	// console.log("srpcur", cur);

		cur.forEach( i => {
			series[0].data.push(i);
		})
		
  	this.options = {
  	chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'REVENUE BY CUSTOMER'
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
      
}

  }

}
