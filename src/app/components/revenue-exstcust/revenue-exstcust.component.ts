import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-exstcust',
  templateUrl: './revenue-exstcust.component.html',
  styleUrls: ['./revenue-exstcust.component.css']
})
export class RevenueExstcustComponent implements OnInit, OnDestroy {

//Variables
  //Common for All for accessing Users
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  //Charts - Rev for assigned To
  options: Object;
  opportunities_EC: any;
  oppoECTotalValues: any;
  oppoECValues: any;
  pieECRevenue: any;
  dataEC: any;
  oppoTECV: any;
  oppoECV: any;
  valuePercent: any;
  name: any;

  yearSelect: any;
    monthSelect: any;
    currentYear: any;
   year_list:any;
   month_list: any;
   oppoEClist:any;
   opportunities_ECL: any;
   monthName: any;
   opportunities_ECLV: any;
   dataRegEC: any;
   pieECRegRevenue: any;
   dataECL: any;
   pieECLRevenue: any;

   p: any;
   q: any;
   pvalue: any;
   qvalue: any;
   region: any;
   existing_customer: any;
   rdata: any;
   ename: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
  	//Initializing the objects
  	this.opportunities_EC = [];
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
              this.opportunities_EC = [];
             
              this.opportunities_EC = u;
              this.yearECList();
              this.monthECList();

              this.selectECList();

              
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

  yearECList(){
    this.year_list = this.opportunities_EC
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthECList(){
    this.oppoEClist = [];
    this.oppoEClist = this.opportunities_EC.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppoEClist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  onYearChange(year){
    this.yearSelect = year;
    this.monthECList();
    this.selectECList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectECList();
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


  selectECList(){
    this.oppoECTotalValues = [];
    this.oppoECValues = [];
    this.dataEC = [];
    this.dataECL = [];
    this.pieECRevenue = [];
    this.oppoTECV = 0;
    this.oppoECV = 0;
    this.opportunities_ECL = [];
    this.opportunities_ECLV = [];
    this.dataRegEC = [];
    this.pieECRegRevenue = [];
    this.pieECLRevenue = [];

    this.p = 1;
    this.q = 1;

    if(this.monthSelect != ''){
      this.opportunities_ECL = this.opportunities_EC.filter( i => {
        return i.year == this.yearSelect &&
            i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_ECL = this.opportunities_EC.filter( i => {
        return i.year == this.yearSelect
      })
    }

    //Total Values of All Opportunities
              this.opportunities_ECL.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoECTotalValues.push(i.valueofdeal)
                }

                var prmkey = i.region + i.existing_customer
                var prmkeyl1 = i.region + i.existing_customer + i.company_id

               
                this.opportunities_ECLV.push({prmkey: prmkey, prmkeyl1: prmkeyl1, region: i.region, 
                 existing_customer: i.existing_customer, company_id: i.company_id, companyname: i.companyname, 
                 valueofdeal: i.valueofdeal})

                console.log("opplsv", this.opportunities_ECLV)
              })
              this.oppoTECV = this.oppoECTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Region
              const groupedRegObj = this.opportunities_ECLV.reduce((prev, cur)=> {
                if(!prev[cur['region']]) {
                  prev[cur['region']] = [cur];
                } else {
                  prev[cur['region']].push(cur);
                }
                return prev;
              }, {});
              this.dataRegEC = Object.keys(groupedRegObj).map(key => { return { key, value: groupedRegObj[key] }});

              //Looping thro' and finding percentage for each Region
              this.dataRegEC.forEach( i => {
                this.oppoECValues = [];
                this.name = '';
                i.value.forEach( j => {
                  this.oppoECValues.push(j.valueofdeal)
                  this.name = j.region
                })
                this.oppoECV = 0;
                this.valuePercent = null;
                this.oppoECV = this.oppoECValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoECV/ this.oppoTECV)*100;
                this.pvalue = '';
                this.pvalue = 'level'+ '' + this.p ;
                this.pieECRegRevenue.push({name: this.name, y:this.valuePercent, drilldown: this.pvalue});
                console.log("psReg", this.pieECRegRevenue);
                this.p++;

              })


              //Grouping by Existing Customer
              const groupedObj = this.opportunities_ECLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkey']]) {
                  prev[cur['prmkey']] = [cur];
                } else {
                  prev[cur['prmkey']].push(cur);
                }
                return prev;
              }, {});
              this.dataEC = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

              //Looping thro' and finding percentage for each Existing Customer
              this.dataEC.forEach( i => {
                this.oppoECValues = [];
                this.name = '';
                this.region = '';
                i.value.forEach( j => {
                  this.oppoECValues.push(j.valueofdeal)
                  this.name = j.existing_customer
                  this.region = j.region
                })
                this.oppoECV = 0;
                this.valuePercent = null;
                this.oppoECV = this.oppoECValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoECV/ this.oppoTECV)*100;
                this.qvalue = '';
                this.qvalue = 'rlevel' + '' + this.q;


                  this.pieECRevenue.push({region: this.region, name: this.name, y:this.valuePercent, drilldown: this.qvalue});
                  this.q++;


                 console.log("psReg", this.pieECRevenue)
              })


              //Grouping by companyid
              const groupedLSLObj = this.opportunities_ECLV.reduce((prev, cur)=> {
                if(cur.prmkeyl1 != null || prev.prmkeyl1 != null) {
                  if(!prev[cur['prmkeyl1']]) {
                    prev[cur['prmkeyl1']] = [cur];
                  } else {
                    prev[cur['prmkeyl1']].push(cur);
                  }
                }
                return prev;
              }, {});
              this.dataECL = Object.keys(groupedLSLObj).map(key => { return { key, value: groupedLSLObj[key] }});
              console.log("psReg", this.dataECL);

              //Looping thro' and finding percentage for each Leadsource
              this.dataECL.forEach( i => {
                this.oppoECValues = [];
                this.name = '';
                this.region = '';
                this.existing_customer = '';
                i.value.forEach( j => {
                  this.oppoECValues.push(j.valueofdeal)
                  this.name = j.companyname
                  this.region = j.region;
                  this.existing_customer = j.existing_customer;
                })
                this.oppoECV = 0;
                this.valuePercent = null;
                this.oppoECV = this.oppoECValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoECV/ this.oppoTECV)*100;
                //this.rvalue = '';
                //this.rvalue = 'rqlevel' + '' + this.r
                this.pieECLRevenue.push({region: this.region, existing_customer: this.existing_customer, name: this.name, y:this.valuePercent});
                console.log("psReg", this.pieECLRevenue)
                //this.r++;
              })
              //Paasing the value to Pie Chart - Rev by Employees
              this.dopieECCharts();



  }

  dopieECCharts(){
  

  var series = [{
      'id': 'regions',
      'name': 'Region',
      'data': []
    }],  
    prev = this.pieECRegRevenue
    
    var drilldown = {
    'series': []
    }, cur = this.pieECRevenue,
    fut = this.pieECLRevenue;


   prev.forEach( i => {
     this.rdata = [];
     series[0].data.push(i);
     this.region = '';
     this.region = i.name;
     cur.forEach(j => {
      if(this.region == j.region){
        if(j.name == true){
          this.ename = 'EXISTING'
        }
        else if( j.name == false){
          this.ename = 'NON-EXISTING'
        }

        this.rdata.push({name: this.ename, y:j.y, drilldown: j.drilldown})

      }
    })
     console.log("psReg", this.rdata);
     drilldown.series.push({id: i.drilldown, name: i.name, data: this.rdata})
   })

   cur.forEach( k => {
     this.rdata = [];
     this.region = '';
     this.existing_customer = '';
     this.region = k.region;
     this.existing_customer = k.name;
     fut.forEach(l => {
       if(this.region == l.region && this.existing_customer == l.existing_customer){
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
      text: 'REVENUE BY EXISTING CUSTOMER OR NOT'
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
