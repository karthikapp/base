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
    name: any;

    yearSelect: any;
    monthSelect: any;
    currentYear: any;
   year_list:any;
   month_list: any;
   oppobcustlist:any;
   opportunities_custL: any;
   monthName:any;

    
  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
    this.opportunities_cust = [];
    
    this.monthName = '';

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
              this.yearSelect = this.currentYear;
              this.monthSelect = '';

               this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_cust = [];
                    this.opportunities_cust = u;

                    this.yearbCustList();
                    this.monthbCustList();
                    this.selectbCustList();

                    
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
    this.monthbCustList();
    this.selectbCustList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectbCustList();
  }

  selectbCustList(){
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
                    console.log("prev", prev);
                    return prev;
                  }, {});



                  this.dataCust = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
                  this.dataCust.forEach( i => {
                    this.oppoCustValues = [];
                    this.name = '';
              i.value.forEach( j => {

                  this.oppoCustValues.push(j.valueofdeal);
                  this.name = j.companyname;
                
              console.log("j", this.oppoCustValues);
              })
              this.oppoCV = 0;
              this.valuePercent = null
              this.oppoCV = this.oppoCustValues.reduce((a,b) => a+b, 0);
              this.barCustRevenue.push({name: this.name, y:this.oppoCV});
            })
                  this.barCustRevenue.sort((a,b) => b.y - a.y);

                 this.barCustRevenue.splice(10);

              console.log("barPro", this.barCustRevenue);
                
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



