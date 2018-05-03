import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

     @Input()
   yflag: any;

   @Input()
   category: any;

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

   oppobcustlist:any;
   oppobcustfylist: any;

   opportunities_custL: any;
   monthName:any;

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

            if ( v.role.toUpperCase() == "MASTER")
            {

               this.currentYear = (new Date()).getFullYear();
             this.previousYear = this.currentYear - 1;
              this.yearSelect = this.currentYear;
              this.monthSelect = '';
              this.quarterSelect = '';
              this.fyearSelect = this.previousYear + '-' + this.currentYear;
              // console.log("fyear", this.fyearSelect)

              if(this.category == 'All')
              {
               this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_cust = [];
                    this.opportunities_cust = u;

                     if(this.yrflag == false){
                this.yearbCustList();
                    this.monthbCustList();
                    this.selectbCustYList();
              } else if (this.fyflag == false){
                this.fyearCustList();
              this.quarterCustList();
              this.selectbCustFYList();
            }   
                })
            }
            else if (this.category == 'ThunderBird')
            {
              this.analyticsservice.getOpportunitiesforBird()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_cust = [];
                    this.opportunities_cust = u;

                     if(this.yrflag == false){
                this.yearbCustList();
                    this.monthbCustList();
                    this.selectbCustYList();
              } else if (this.fyflag == false){
                this.fyearCustList();
              this.quarterCustList();
              this.selectbCustFYList();
            }   
                })
            }
            else if(this.category == 'Classic')
            {
              this.analyticsservice.getOpportunitiesforClassic()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_cust = [];
                    this.opportunities_cust = u;

                     if(this.yrflag == false){
                this.yearbCustList();
                    this.monthbCustList();
                    this.selectbCustYList();
              } else if (this.fyflag == false){
                this.fyearCustList();
              this.quarterCustList();
              this.selectbCustFYList();
            }   
                })
            }

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

  yearbCustList(){
    this.year_list = this.opportunities_cust
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthbCustList(){
    this.oppobcustlist = [];
    this.oppobcustlist = this.opportunities_cust.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppobcustlist
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
    this.oppobcustfylist = [];
    this.oppobcustfylist = this.opportunities_cust.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.oppobcustfylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      // console.log("fyear", this.quarter_list);
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

  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthbCustList();
    this.selectbCustYList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectbCustYList();
  }

   onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterCustList();
    this.selectbCustFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectbCustFYList();
  }

  selectbCustFYList(){
    this.oppoCustTotalValues = [];
    this.oppoCustValues = [];
    this.dataCust = [];
    this.barCustRevenue = [];
    this.oppoTCV = 0;
    this.oppoCV = 0;
    this.opportunities_custL = [];

    if(this.monthSelect != ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
       return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_custL = this.opportunities_cust.filter( i => {
       return i.financial_year == this.fyearSelect 
      })
    }


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
                    // console.log("prev", prev);
                    return prev;
                  }, {});



                  this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
                  this.dataCust.forEach( i => {
                    this.oppoCustValues = [];
                    this.name = '';
              i.value.forEach( j => {

                  this.oppoCustValues.push(j.valueofdeal);
                  this.name = j.companyname;
                
              // console.log("j", this.oppoCustValues);
              })
              this.oppoCV = 0;
              this.valuePercent = null
              this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
              this.barCustRevenue.push({name: this.name, y:this.oppoCV});
            })
                  this.barCustRevenue.sort((a,b) => b.y - a.y);

                 this.barCustRevenue.splice(10);

              // console.log("barPro", this.barCustRevenue);
                
                this.dobarCustomerCharts();
  }

  selectbCustYList(){
    this.oppoCustTotalValues = [];
    this.oppoCustValues = [];
    this.dataCust = [];
    this.barCustRevenue = [];
    this.oppoTCV = 0;
    this.oppoCV = 0;
    this.opportunities_custL = [];

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
                    // console.log("prev", prev);
                    return prev;
                  }, {});



                  this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
                  this.dataCust.forEach( i => {
                    this.oppoCustValues = [];
                    this.name = '';
              i.value.forEach( j => {

                  this.oppoCustValues.push(j.valueofdeal);
                  this.name = j.companyname;
                
              // console.log("j", this.oppoCustValues);
              })
              this.oppoCV = 0;
              this.valuePercent = null
              this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
              this.barCustRevenue.push({name: this.name, y:this.oppoCV});
            })
                  this.barCustRevenue.sort((a,b) => b.y - a.y);

                 this.barCustRevenue.splice(10);

              // console.log("barPro", this.barCustRevenue);
                
                this.dobarCustomerCharts();
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
        text: 'TOP 10 CUSTOMERS BY REVENUE'
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



