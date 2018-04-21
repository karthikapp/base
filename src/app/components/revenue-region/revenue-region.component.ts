import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-region',
  templateUrl: './revenue-region.component.html',
  styleUrls: ['./revenue-region.component.css']
})
export class RevenueRegionComponent implements OnInit, OnDestroy {

     @Input()
   yflag: any;

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	opportunities_region: any;

   	oppoRegionTotalValues: any;
   	oppoRegionValues: any;
   	pieRegionRevenue: any;
   	dataRegion: any;

   	oppoTRV: any;
   	oppoRV: any;
     valuePercent: any;

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

   opporeglist:any;
   opporegfylist: any;

   opportunities_regL: any;
   monthName: any;

   yrflag: boolean = false;
  fyflag: boolean = false;


  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	this.opportunities_region = [];
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
              
              this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  console.log("hi Region")
                 this.opportunities_region = [];
                 

                 this.opportunities_region = u;

                  if(this.yrflag == false){
                this.yearRegList();
                 this.monthRegList();
                 this.selectRegYList();
                
              } else if (this.fyflag == false){
                this.fyearRegList();
              this.quarterRegList();
              this.selectRegFYList();
            }
                 
            })


              
            return this.ev = true;
          }
          else
          {
            //console.log('No access to this page choco');
            alert('No access to this page');
            return this.ev=false;
          }
        })
      }
      else
      {
        //console.log('No access to this page m&m');
        this.router.navigate(['login']);
        return this.ev=false;
      }
    });
  }

  ngOnDestroy()
  {
  	this.alive =false;
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

  yearRegList(){
    this.year_list = this.opportunities_region
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthRegList(){
    this.opporeglist = [];
    this.opporeglist = this.opportunities_region.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.opporeglist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

    fyearRegList(){
    this.fyear_list = this.opportunities_region
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      console.log("fyear", this.fyear_list)

  }

  quarterRegList(){
    this.opporegfylist = [];
    this.opporegfylist = this.opportunities_region.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.opporegfylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      console.log("fyear", this.quarter_list);
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthRegList();
    this.selectRegYList();
  }

  onMonthChange(month){
    this.monthSelect = month;

    this.selectRegYList();
  }

    onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterRegList();
    this.selectRegFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectRegFYList();
  }

   selectRegFYList(){
    this.oppoRegionTotalValues = [];
    this.oppoRegionValues = [];
    this.dataRegion = [];
    this.pieRegionRevenue = [];
    this.oppoTRV = 0;
    this.oppoRV = 0;
    this.pieRegionRevenue = [];
    this.dataRegion = [];
    this.opportunities_regL = [];

    if(this.quarterSelect != ''){
      this.opportunities_regL = this.opportunities_region.filter( i => {
        return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.quarterSelect == ''){
      this.opportunities_regL = this.opportunities_region.filter( i => {
        return i.financial_year == this.fyearSelect 
      })
    }

    this.opportunities_regL.forEach( i => {
                  console.log("hi Region1")
                  if(i.valueofdeal != undefined)
                  {
                    this.oppoRegionTotalValues.push(i.valueofdeal)
                  }
                })
                
                this.oppoTRV = this.oppoRegionTotalValues.reduce((a, b) => a + b, 0);

                const groupedObj = this.opportunities_regL.reduce((prev, cur)=> {
                  if(!prev[cur['region']]) 
                  {
                    prev[cur['region']] = [cur];
                  } 
                  else 
                  {
                    prev[cur['region']].push(cur);
                  }
                  console.log("prev", prev);
                  return prev;
                }, {});

                this.dataRegion = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
                  
                console.log("hi Region4", this.dataRegion)
                this.dataRegion.forEach( i => {
                  this.oppoRegionValues = [];
                  console.log("hi Region2", this.pieRegionRevenue)
                  i.value.forEach( j => {
                    this.oppoRegionValues.push(j.valueofdeal)
                    //console.log("hi Region", this.oppoRegionValues);
                  })
                this.oppoRV = 0;
                this.valuePercent = null;
                this.oppoRV = this.oppoRegionValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoRV/ this.oppoTRV)*100;
                //console.log("hi PVTV", this.oppoRV, this.oppoTRV, this.valuePercent )
                this.pieRegionRevenue.push({name: i.key, y:this.valuePercent});
                console.log("hi Region3", this.pieRegionRevenue)
              })
              this.dopieRegionCharts();


  }


  selectRegYList(){
    this.oppoRegionTotalValues = [];
    this.oppoRegionValues = [];
    this.dataRegion = [];
    this.pieRegionRevenue = [];
    this.oppoTRV = 0;
    this.oppoRV = 0;
    this.pieRegionRevenue = [];
    this.dataRegion = [];
    this.opportunities_regL = [];

    if(this.monthSelect != ''){
      this.opportunities_regL = this.opportunities_region.filter( i => {
        return i.year == this.yearSelect &&
            i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_regL = this.opportunities_region.filter( i => {
        return i.year == this.yearSelect
      })
    }

    this.opportunities_regL.forEach( i => {
                  console.log("hi Region1")
                  if(i.valueofdeal != undefined)
                  {
                    this.oppoRegionTotalValues.push(i.valueofdeal)
                  }
                })
                
                this.oppoTRV = this.oppoRegionTotalValues.reduce((a, b) => a + b, 0);

                const groupedObj = this.opportunities_regL.reduce((prev, cur)=> {
                  if(!prev[cur['region']]) 
                  {
                    prev[cur['region']] = [cur];
                  } 
                  else 
                  {
                    prev[cur['region']].push(cur);
                  }
                  console.log("prev", prev);
                  return prev;
                }, {});

                this.dataRegion = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
                  
                console.log("hi Region4", this.dataRegion)
                this.dataRegion.forEach( i => {
                  this.oppoRegionValues = [];
                  console.log("hi Region2", this.pieRegionRevenue)
                  i.value.forEach( j => {
                    this.oppoRegionValues.push(j.valueofdeal)
                    //console.log("hi Region", this.oppoRegionValues);
                  })
                this.oppoRV = 0;
                this.valuePercent = null;
                this.oppoRV = this.oppoRegionValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoRV/ this.oppoTRV)*100;
                //console.log("hi PVTV", this.oppoRV, this.oppoTRV, this.valuePercent )
                this.pieRegionRevenue.push({name: i.key, y:this.valuePercent});
                console.log("hi Region3", this.pieRegionRevenue)
              })
              this.dopieRegionCharts();


  }

  dopieRegionCharts(){

    var series =  [{
      'name': 'Region',
      'colorByPoint': true,
      'data': []
    }], cur = this.pieRegionRevenue;

    console.log("srpcur", cur);

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
        text: 'REVENUE BY REGION'
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
