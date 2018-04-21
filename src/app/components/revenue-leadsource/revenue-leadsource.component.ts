import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
     @Input()
   yflag: any;

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
  quarterSelect: any;
  fyearSelect: any;

  currentYear: any;
  previousYear: any;

  year_list:any;
  month_list: any;
  fyear_list: any;
  quarter_list: any;

   oppoLSlist:any;
   oppoLSfylist:any;

   opportunities_LSL: any;
   monthName: any;
   opportunities_LSLV: any;
   dataRegLS: any;
   pieLSRegRevenue: any;
   dataLSL: any;
   pieLSLRevenue: any;

   p: any;
   q: any;
   pvalue: any;
   qvalue: any;
   region: any;
   leadsource: any;
   rdata: any;

     yrflag: boolean = false;
  fyflag: boolean = false;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	//Initializing the objects
  	this.opportunities_LS = [];
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

            //Fetching Values from Analytics
            this.analyticsservice.getOpportunitiesforrv()
            .takeWhile(() => this.alive)
            .subscribe( 
            u => {
              this.opportunities_LS = [];
             
              this.opportunities_LS = u;

               if(this.yrflag == false){
                this.yearLSList();
              this.monthLSList();
              this.selectLSYList();
              } else if (this.fyflag == false){
                this.fyearLSList();
              this.quarterLSList();
              this.selectLSFYList();
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

   fyearLSList(){
    this.fyear_list = this.opportunities_LS
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      console.log("fyear", this.fyear_list)

  }

  quarterLSList(){
    this.oppoLSfylist = [];
    this.oppoLSfylist = this.opportunities_LS.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.oppoLSfylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      console.log("fyear", this.quarter_list);
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthLSList();
    this.selectLSYList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectLSYList();
  }

  onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterLSList();
    this.selectLSFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectLSFYList();
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

   selectLSFYList(){
    this.oppoLSTotalValues = [];
    this.oppoLSValues = [];
    this.dataLS = [];
    this.dataLSL = [];
    this.pieLSRevenue = [];
    this.oppoTLSV = 0;
    this.oppoLSV = 0;
    this.opportunities_LSL = [];
    this.opportunities_LSLV = [];
    this.dataRegLS = [];
    this.pieLSRegRevenue = [];
    this.pieLSLRevenue = [];

    this.p = 1;
    this.q = 1;

    if(this.quarterSelect != ''){
      this.opportunities_LSL = this.opportunities_LS.filter( i => {
        return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.quarterSelect == ''){
      this.opportunities_LSL = this.opportunities_LS.filter( i => {
         return i.financial_year == this.fyearSelect
      })
    }

    //Total Values of All Opportunities
              this.opportunities_LSL.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoLSTotalValues.push(i.valueofdeal)
                }

                var prmkey = i.region + i.leadsource

                if(i.leadsource == 'oem' )
                {
                  var prmkeyl1 = i.region + i.leadsource + i.oemid
                } 
                else if( i.leadsource == 'distributor' )
                {
                  var prmkeyl1 = i.region + i.leadsource + i.distributorid
                }
                else if(i.leadsource == 'event')
                {
                  var prmkeyl1 = i.region + i.leadsource + i.eventid
                }
                else
                {
                  var prmkeyl1 = null
                }

                this.opportunities_LSLV.push({prmkey: prmkey, prmkeyl1: prmkeyl1, region: i.region, leadsource: i.leadsource,
                 oemid: i.oemid, oemname: i.oemname, eventid: i.eventid, eventname: i.eventname, distributorid: i.distributorid,
                 distributorname: i.distributorname, valueofdeal: i.valueofdeal})

                console.log("opplsv", this.opportunities_LSLV)
              })
              this.oppoTLSV = this.oppoLSTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Region
              const groupedRegObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(!prev[cur['region']]) {
                  prev[cur['region']] = [cur];
                } else {
                  prev[cur['region']].push(cur);
                }
                return prev;
              }, {});
              this.dataRegLS = Object.keys(groupedRegObj).map(key => { return { key, value: groupedRegObj[key] }});

              //Looping thro' and finding percentage for each Region
              this.dataRegLS.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  this.name = j.region
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                this.pvalue = '';
                this.pvalue = 'level'+ '' + this.p ;
                this.pieLSRegRevenue.push({name: this.name, y:this.valuePercent, drilldown: this.pvalue});
                console.log("psReg", this.pieLSRegRevenue);
                this.p++;

              })


              //Grouping by Lead Source
              const groupedObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkey']]) {
                  prev[cur['prmkey']] = [cur];
                } else {
                  prev[cur['prmkey']].push(cur);
                }
                return prev;
              }, {});
              this.dataLS = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

              //Looping thro' and finding percentage for each Leadsource
              this.dataLS.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                this.region = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  this.name = j.leadsource
                  this.region = j.region
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                this.qvalue = '';
                this.qvalue = 'rlevel' + '' + this.q;

                if(this.name == 'oem' || this.name == 'distributor' || this.name == 'event'){
                  this.pieLSRevenue.push({region: this.region, name: this.name, y:this.valuePercent, drilldown: this.qvalue});
                  this.q++;
                }
                else{
                  this.pieLSRevenue.push({region: this.region, name: this.name, y:this.valuePercent});
                }

                 console.log("psReg", this.pieLSRevenue)
              })


              //Grouping by OEM/ Distributor/ Event
              const groupedLSLObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(cur.prmkeyl1 != null || prev.prmkeyl1 != null) {
                  if(!prev[cur['prmkeyl1']]) {
                    prev[cur['prmkeyl1']] = [cur];
                  } else {
                    prev[cur['prmkeyl1']].push(cur);
                  }
                }
                return prev;
              }, {});
              this.dataLSL = Object.keys(groupedLSLObj).map(key => { return { key, value: groupedLSLObj[key] }});
              console.log("psReg", this.dataLSL);

              //Looping thro' and finding percentage for each Leadsource
              this.dataLSL.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                this.region = '';
                this.leadsource = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  if(j.oemid != ''){
                    this.name = j.oemname
                  } else if(j.distributorid != ''){
                    this.name = j.distributorname
                  } else if(j.eventid != ''){
                    this.name = j.eventname
                  }
                  this.region = j.region;
                  this.leadsource = j.leadsource;
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                //this.rvalue = '';
                //this.rvalue = 'rqlevel' + '' + this.r
                this.pieLSLRevenue.push({region: this.region, leadsource: this.leadsource, name: this.name, y:this.valuePercent});
                console.log("psReg", this.pieLSLRevenue)
                //this.r++;
              })
              //Paasing the value to Pie Chart - Rev by Employees
              this.dopieLSCharts();



  }


  selectLSYList(){
    this.oppoLSTotalValues = [];
    this.oppoLSValues = [];
    this.dataLS = [];
    this.dataLSL = [];
    this.pieLSRevenue = [];
    this.oppoTLSV = 0;
    this.oppoLSV = 0;
    this.opportunities_LSL = [];
    this.opportunities_LSLV = [];
    this.dataRegLS = [];
    this.pieLSRegRevenue = [];
    this.pieLSLRevenue = [];

    this.p = 1;
    this.q = 1;

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

                var prmkey = i.region + i.leadsource

                if(i.leadsource == 'oem' )
                {
                  var prmkeyl1 = i.region + i.leadsource + i.oemid
                } 
                else if( i.leadsource == 'distributor' )
                {
                  var prmkeyl1 = i.region + i.leadsource + i.distributorid
                }
                else if(i.leadsource == 'event')
                {
                  var prmkeyl1 = i.region + i.leadsource + i.eventid
                }
                else
                {
                  var prmkeyl1 = null
                }

                this.opportunities_LSLV.push({prmkey: prmkey, prmkeyl1: prmkeyl1, region: i.region, leadsource: i.leadsource,
                 oemid: i.oemid, oemname: i.oemname, eventid: i.eventid, eventname: i.eventname, distributorid: i.distributorid,
                 distributorname: i.distributorname, valueofdeal: i.valueofdeal})

                console.log("opplsv", this.opportunities_LSLV)
              })
              this.oppoTLSV = this.oppoLSTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Region
              const groupedRegObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(!prev[cur['region']]) {
                  prev[cur['region']] = [cur];
                } else {
                  prev[cur['region']].push(cur);
                }
                return prev;
              }, {});
              this.dataRegLS = Object.keys(groupedRegObj).map(key => { return { key, value: groupedRegObj[key] }});

              //Looping thro' and finding percentage for each Region
              this.dataRegLS.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  this.name = j.region
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                this.pvalue = '';
                this.pvalue = 'level'+ '' + this.p ;
                this.pieLSRegRevenue.push({name: this.name, y:this.valuePercent, drilldown: this.pvalue});
                console.log("psReg", this.pieLSRegRevenue);
                this.p++;

              })


              //Grouping by Lead Source
              const groupedObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkey']]) {
                  prev[cur['prmkey']] = [cur];
                } else {
                  prev[cur['prmkey']].push(cur);
                }
                return prev;
              }, {});
              this.dataLS = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

              //Looping thro' and finding percentage for each Leadsource
              this.dataLS.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                this.region = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  this.name = j.leadsource
                  this.region = j.region
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                this.qvalue = '';
                this.qvalue = 'rlevel' + '' + this.q;

                if(this.name == 'oem' || this.name == 'distributor' || this.name == 'event'){
                  this.pieLSRevenue.push({region: this.region, name: this.name, y:this.valuePercent, drilldown: this.qvalue});
                  this.q++;
                }
                else{
                  this.pieLSRevenue.push({region: this.region, name: this.name, y:this.valuePercent});
                }

                 console.log("psReg", this.pieLSRevenue)
              })


              //Grouping by OEM/ Distributor/ Event
              const groupedLSLObj = this.opportunities_LSLV.reduce((prev, cur)=> {
                if(cur.prmkeyl1 != null || prev.prmkeyl1 != null) {
                  if(!prev[cur['prmkeyl1']]) {
                    prev[cur['prmkeyl1']] = [cur];
                  } else {
                    prev[cur['prmkeyl1']].push(cur);
                  }
                }
                return prev;
              }, {});
              this.dataLSL = Object.keys(groupedLSLObj).map(key => { return { key, value: groupedLSLObj[key] }});
              console.log("psReg", this.dataLSL);

              //Looping thro' and finding percentage for each Leadsource
              this.dataLSL.forEach( i => {
                this.oppoLSValues = [];
                this.name = '';
                this.region = '';
                this.leadsource = '';
                i.value.forEach( j => {
                  this.oppoLSValues.push(j.valueofdeal)
                  if(j.oemid != ''){
                    this.name = j.oemname
                  } else if(j.distributorid != ''){
                    this.name = j.distributorname
                  } else if(j.eventid != ''){
                    this.name = j.eventname
                  }
                  this.region = j.region;
                  this.leadsource = j.leadsource;
                })
                this.oppoLSV = 0;
                this.valuePercent = null;
                this.oppoLSV = this.oppoLSValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoLSV/ this.oppoTLSV)*100;
                //this.rvalue = '';
                //this.rvalue = 'rqlevel' + '' + this.r
                this.pieLSLRevenue.push({region: this.region, leadsource: this.leadsource, name: this.name, y:this.valuePercent});
                console.log("psReg", this.pieLSLRevenue)
                //this.r++;
              })
              //Paasing the value to Pie Chart - Rev by Employees
              this.dopieLSCharts();



  }

  dopieLSCharts(){
    //Series is separately defined to loop thro' the data
  //   var series =  [{
  // 		'name': 'LeadSource',
  // 		'colorByPoint': true,
  // 		'data': []
  // 	}], cur = this.pieLSRevenue;

  // 	cur.forEach( i => {
  // 		series[0].data.push(i);
  // 	})

  // 	this.options = {
  //     chart: {
  //       plotBackgroundColor: null,
  //       plotBorderWidth: null,
  //       plotShadow: false,
  //       type: 'pie'
  //     },
  //     title: {
  //       text: 'Revenue By LeadSource'
  //     },
  //     tooltip: {
  //       pointFormat: '<b>{point.percentage:.1f}%</b>'
  //     },
  //     plotOptions: {
  //       pie: {
  //         allowPointSelect: true,
  //         cursor: 'pointer',
  //         dataLabels: {
  //           enabled: true,
  //           format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //         }
  //       }
  //     },
  //     series: series
  //   }
  

  var series = [{
      'id': 'regions',
      'name': 'Region',
      'data': []
    }],  
    prev = this.pieLSRegRevenue
    
    var drilldown = {
    'series': []
    }, cur = this.pieLSRevenue,
    fut = this.pieLSLRevenue;


   prev.forEach( i => {
     this.rdata = [];
     series[0].data.push(i);
     this.region = '';
     this.region = i.name;
     cur.forEach(j => {
      if(this.region == j.region){
        if(j.drilldown != ''){
        this.rdata.push({name: j.name, y:j.y, drilldown: j.drilldown})
      }
      else
      {
       this.rdata.push({name: j.name, y:j.y}) 
      }
      }
    })
     console.log("psReg", this.rdata);
     drilldown.series.push({id: i.drilldown, name: i.name, data: this.rdata})
   })

   cur.forEach( k => {
     this.rdata = [];
     this.region = '';
     this.leadsource = '';
     this.region = k.region;
     this.leadsource = k.name;
     fut.forEach(l => {
       if(this.region == l.region && this.leadsource == l.leadsource){
         this.rdata.push({name: l.name, y: l.y})
       }
     })
     if(k.drilldown != ''){
     drilldown.series.push({ id: k.drilldown, name: k.name, data: this.rdata})
     }
   })

   console.log("psReg", series, drilldown);

    
  
  this.options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'REVENUE BY LEAD SOURCE'
    },
    xAxis: {
      type: 'category'
    },
    
    plotOptions: {
        series: {
          borderWidth: 1,
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.2f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: series,
    drilldown: drilldown
    }
  }


  


}
