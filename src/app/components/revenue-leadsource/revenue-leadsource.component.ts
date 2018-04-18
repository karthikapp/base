import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-leadsource',
  templateUrl: './revenue-leadsource.component.html',
  styleUrls: ['./revenue-leadsource.component.css']
})
export class RevenueLeadsourceComponent implements OnInit, OnDestroy {
	//Variables
  //Common for All for accessing Users
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  //Charts - Rev for assigned To
  options: Object;
  opportunities_LS: any;
  oppoLSTotalValues: any;
  oppoLSValues: any;
  pieLSRevenue: any;
  dataLS: any;
  oppoTLSV: any;
  oppoLSV: any;
  valuePercent: any;
  name: any;

  yearSelect: any;
    monthSelect: any;
    currentYear: any;
   year_list:any;
   month_list: any;
   oppoLSlist:any;
   opportunities_LSL: any;
   monthName: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	//Initializing the objects
  	this.opportunities_LS = [];
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
              
            //Fetching Values from Analytics
            this.analyticsservice.getOpportunitiesforrv()
            .takeWhile(() => this.alive)
            .subscribe( 
            u => {
              this.opportunities_LS = [];
             
              this.opportunities_LS = u;
              this.yearLSList();
              this.monthLSList();

              this.selectLSList();

              
            })
            return this.ev = true;
          }
          else
          {
            alert('No access to this page');
            return this.ev=false;
          }
        })
      }
      else
      {
        this.router.navigate(['login']);
        return this.ev=false;
      }
    });
  }

  ngOnDestroy(){
  	this.alive = false
  }

  yearLSList(){
    this.year_list = this.opportunities_LS
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthLSList(){
    this.oppoLSlist = [];
    this.oppoLSlist = this.opportunities_LS.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppoLSlist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthLSList();
    this.selectLSList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectLSList();
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


  selectLSList(){
    this.oppoLSTotalValues = [];
    this.oppoLSValues = [];
    this.dataLS = [];
    this.pieLSRevenue = [];
    this.oppoTLSV = 0;
    this.oppoLSV = 0;
    this.opportunities_LSL = [];

    if(this.monthSelect != ''){
      this.opportunities_LSL = this.opportunities_LS.filter( i => {
        return i.year == this.yearSelect &&
            i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_LSL = this.opportunities_LS.filter( i => {
        return i.year == this.yearSelect
      })
    }

    //Total Values of All Opportunities
              this.opportunities_LSL.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoLSTotalValues.push(i.valueofdeal)
                }
              })
              this.oppoTLSV = this.oppoLSTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Assigned To
              const groupedObj = this.opportunities_LSL.reduce((prev, cur)=> {
                if(!prev[cur['leadsource']]) {
                  prev[cur['leadsource']] = [cur];
                } else {
                  prev[cur['leadsource']].push(cur);
                }
                return prev;
              }, {});
              this.dataLS = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

              //Looping thro' and finding percentage for each Employees
              this.dataLS.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  this.name = j.leadsource
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                this.pieLSRevenue.push({name: this.name, y:this.valuePercent});
              })

              //Paasing the value to Pie Chart - Rev by Employees
              this.dopieLSCharts();



  }

  dopieLSCharts(){
    //Series is separately defined to loop thro' the data
    var series =  [{
  		'name': 'LeadSource',
  		'colorByPoint': true,
  		'data': []
  	}], cur = this.pieLSRevenue;

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
        text: 'Revenue By LeadSource'
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
