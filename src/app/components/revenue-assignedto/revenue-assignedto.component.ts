import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-assignedto',
  templateUrl: './revenue-assignedto.component.html',
  styleUrls: ['./revenue-assignedto.component.css']
})
export class RevenueAssignedtoComponent implements OnInit, OnDestroy {
 
   @Input()
   yflag: any;
  //Variables
  //Common for All for accessing Users
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  //Charts - Rev for assigned To
  options: Object;
  opportunities_assgnto: any;
  oppoAssgnToTotalValues: any;
  oppoAssgnToValues: any;
  pieAssgnToRevenue: any;
  dataAssgnTo: any;
  oppoTAV: any;
  oppoAV: any;
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

  oppoasgnTolist:any;
  oppoasgnTofylist:any;

  opportunities_assgntoL: any;

  yrflag: boolean = false;
  fyflag: boolean = false;

  monthName: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
    //Initializing the objects
  	this.opportunities_assgnto = [];
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
              
            //Fetching Values from Analytics
            this.analyticsservice.getOpportunitiesforrv()
            .takeWhile(() => this.alive)
            .subscribe( 
            u => {
              this.opportunities_assgnto = [];
             
              this.opportunities_assgnto = u;


              if(this.yrflag == false){
                this.yearAssgntoList();
              this.monthAssgntoList();
              this.selectAssgnToYList();
              } else if (this.fyflag == false){
                this.fyearAssgntoList();
              this.quarterAssgntoList();
              this.selectAssgnToFYList();
            }
              
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

  yearAssgntoList(){
    this.year_list = this.opportunities_assgnto
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthAssgntoList(){
    this.oppoasgnTolist = [];
    this.oppoasgnTolist = this.opportunities_assgnto.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppoasgnTolist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  fyearAssgntoList(){
    this.fyear_list = this.opportunities_assgnto
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      console.log("fyear", this.fyear_list)

  }

  quarterAssgntoList(){
    this.oppoasgnTofylist = [];
    this.oppoasgnTofylist = this.opportunities_assgnto.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.oppoasgnTofylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      // console.log("fyear", this.quarter_list);
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthAssgntoList();
    this.selectAssgnToYList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    // console.log("month", month);
    this.selectAssgnToYList();
  }

  onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterAssgntoList();
    this.selectAssgnToFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectAssgnToFYList();
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

  selectAssgnToFYList(){
    this.oppoAssgnToTotalValues = [];
    this.oppoAssgnToValues = [];
    this.dataAssgnTo = [];
    this.pieAssgnToRevenue = [];
    this.oppoTAV = 0;
    this.oppoAV = 0;
    this.opportunities_assgntoL = [];

    // console.log("ssss", this.monthSelect, this.opportunities_assgntoL)

    if(this.quarterSelect != ''){
      this.opportunities_assgntoL = this.opportunities_assgnto.filter( i => {
        return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.quarterSelect == ''){
      this.opportunities_assgntoL = this.opportunities_assgnto.filter( i => {
        return i.financial_year == this.fyearSelect
      })
    }

    // console.log("sssss", this.opportunities_assgntoL);
    //Total Values of All Opportunities
    this.opportunities_assgntoL.forEach( 
      i => {
        if(i.valueofdeal != undefined)
        {
          this.oppoAssgnToTotalValues.push(i.valueofdeal)
        }
      })
    this.oppoTAV = this.oppoAssgnToTotalValues.reduce((a, b) => a + b, 0);

    //Grouping by Assigned To
    const groupedObj = this.opportunities_assgntoL.reduce((prev, cur)=> {
      if(!prev[cur['assigned_to']]) {
        prev[cur['assigned_to']] = [cur];
      } else {
        prev[cur['assigned_to']].push(cur);
      }
      return prev;
    }, {});
    this.dataAssgnTo = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

    //Looping thro' and finding percentage for each Employees
    this.dataAssgnTo.forEach( i => {
      this.oppoAssgnToValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoAssgnToValues.push(j.valueofdeal)
        this.name = j.assignedto_name
      })
      this.oppoAV = 0;
      this.valuePercent = null;
      this.oppoAV = this.oppoAssgnToValues.reduce((a,b) => a+b, 0);
      this.valuePercent = (this.oppoAV/ this.oppoTAV)*100;
      this.pieAssgnToRevenue.push({name: this.name, y:this.valuePercent});
    })

    //Paasing the value to Pie Chart - Rev by Employees
    this.dopieAssgnToCharts();
  }

  selectAssgnToYList(){
    this.oppoAssgnToTotalValues = [];
    this.oppoAssgnToValues = [];
    this.dataAssgnTo = [];
    this.pieAssgnToRevenue = [];
    this.oppoTAV = 0;
    this.oppoAV = 0;
    this.opportunities_assgntoL = [];

    
    if(this.monthSelect != ''){
      this.opportunities_assgntoL = this.opportunities_assgnto.filter( i => {
        return i.year == this.yearSelect &&
            i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_assgntoL = this.opportunities_assgnto.filter( i => {
        return i.year == this.yearSelect
      })
    }

    // console.log("ssss", this.monthSelect, this.opportunities_assgntoL)

   


    //Total Values of All Opportunities
    this.opportunities_assgntoL.forEach( 
      i => {
        if(i.valueofdeal != undefined)
        {
          this.oppoAssgnToTotalValues.push(i.valueofdeal)
        }
      })
    this.oppoTAV = this.oppoAssgnToTotalValues.reduce((a, b) => a + b, 0);

    //Grouping by Assigned To
    const groupedObj = this.opportunities_assgntoL.reduce((prev, cur)=> {
      if(!prev[cur['assigned_to']]) {
        prev[cur['assigned_to']] = [cur];
      } else {
        prev[cur['assigned_to']].push(cur);
      }
      return prev;
    }, {});
    this.dataAssgnTo = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

    //Looping thro' and finding percentage for each Employees
    this.dataAssgnTo.forEach( i => {
      this.oppoAssgnToValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoAssgnToValues.push(j.valueofdeal)
        this.name = j.assignedto_name
      })
      this.oppoAV = 0;
      this.valuePercent = null;
      this.oppoAV = this.oppoAssgnToValues.reduce((a,b) => a+b, 0);
      this.valuePercent = (this.oppoAV/ this.oppoTAV)*100;
      this.pieAssgnToRevenue.push({name: this.name, y:this.valuePercent});
    })

    //Paasing the value to Pie Chart - Rev by Employees
    this.dopieAssgnToCharts();
  }

  dopieAssgnToCharts(){
    //Series is separately defined to loop thro' the data
    var series =  [{
  		'name': 'Products',
  		'colorByPoint': true,
  		'data': []
  	}], cur = this.pieAssgnToRevenue;

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
        text: 'REVENUE BY EMPLOYEES'
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
