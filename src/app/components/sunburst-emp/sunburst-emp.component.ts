import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-sunburst-emp',
  templateUrl: './sunburst-emp.component.html',
  styleUrls: ['./sunburst-emp.component.css']
})
export class SunburstEmpComponent implements OnInit, OnDestroy {

  options: Object;
    uid: string;
     ev: boolean = false;

     alive: boolean = true;
     opportunities_sunburst: any;
     opportunities_SBL: any;

     oppoSBTotalValues: any;
     oppoSBValues: any;

     pieSBQRevenue: any;
     pieSBRRevenue: any;
     pieSBERevenue: any;
     pieSBCRevenue: any;
     pieSBPRevenue: any;
     
     dataqSB: any;
     datarSB: any;
     dataeSB: any;
     datacSB: any;
     datapSB: any;

     opportunities_SBLV: any;

     oppoTSBV: any;
     oppoSBV: any;
    valuePercent: any;
    name: any;

    fyearSelect: any;
    previousYear: any;
    currentYear: any;
   fyear_list:any;

   opposblist:any;
   oppo_sbL: any;
   monthName: any;
   p: any;

   region: any;
   parent: any;
   rparent: any;
   eparent: any;
   cparent: any;
   pparent: any;
   quarter: any;
   assigned_to: any;
   customer: any;
   product: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
    this.opportunities_sunburst = [];
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
             
               this.previousYear = this.currentYear - 1;
              this.fyearSelect = this.previousYear + '-' + this.currentYear;

              this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_sunburst = [];
                
                this.opportunities_sunburst = u;
                  this.fyearSBList();
                  this.selectSBFYList();

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
       else{
            //console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  ngOnDestroy(){
    this.alive = false;
  }



  fyearSBList(){
    this.fyear_list = this.opportunities_sunburst
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }


 onFYearChange(fyear){
    this.fyearSelect = fyear;

    this.selectSBFYList();
  }



  selectSBFYList(){

    this.opportunities_SBL = [];
    this.opportunities_SBLV = [];
    this.datacSB = [];
    this.dataeSB = [];
    this.datapSB = [];
    this.dataqSB = [];
    this.datarSB = [];
    this.pieSBQRevenue = [];
    this.pieSBCRevenue = [];
    this.pieSBERevenue = [];
    this.pieSBRRevenue = [];
    this.pieSBPRevenue = [];
    this.p = '1.0';
    this.oppoSBTotalValues = [];
    this.oppoTSBV = 0;
    this.oppoSBV = 0;

    this.opportunities_SBL = this.opportunities_sunburst.filter( i => {
        return i.financial_year == this.fyearSelect 
      })

    this.opportunities_SBL.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoSBTotalValues.push(i.valueofdeal)
                }

                var prmkey = i.quarter + i.region

                var prmkeyl1 = i.quarter + i.region + i.assigned_to

                var prmkeyl2 = i.quarter + i.region + i.assigned_to + i.company_id

                var prmkeyl3 = i.quarter + i.region + i.assigned_to + i.company_id + i.product
                
               
                this.opportunities_SBLV.push({prmkey: prmkey, prmkeyl1: prmkeyl1, prmkeyl2: prmkeyl2, prmkeyl3: prmkeyl3,
                 quarter: i.quarter, region: i.region, assigned_to: i.assigned_to, assignedto_name: i.assignedto_name,
                 company_id: i.company_id, companyname: i.companyname, product: i.product, productname: i.productname,
                 valueofdeal: i.valueofdeal})

                //console.log("opplsv", this.opportunities_SBLV)
              })
              this.oppoTSBV = this.oppoSBTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Quarter
              const groupedqObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['quarter']]) {
                  prev[cur['quarter']] = [cur];
                } else {
                  prev[cur['quarter']].push(cur);
                }
                return prev;
              }, {});
              this.dataqSB = Object.keys(groupedqObj).map(key => { return { key, value: groupedqObj[key] }});

              //Looping thro' and finding percentage for each Quarter
              this.dataqSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.quarter
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
                
                this.pieSBQRevenue.push({id: this.p, parent: '0.0' , name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBQRevenue);
                 this.p++;
                 this.p = this.p + '.0';
              })

              //Grouping by Region
              const groupedrObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkey']]) {
                  prev[cur['prmkey']] = [cur];
                } else {
                  prev[cur['prmkey']].push(cur);
                }
                return prev;
              }, {});
              this.datarSB = Object.keys(groupedrObj).map(key => { return { key, value: groupedrObj[key] }});

              //Looping thro' and finding percentage for each Region
              this.datarSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.quarter = '';
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.region
                  this.quarter = j.quarter
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
                
                //console.log("data", this.p)
                this.pieSBRRevenue.push({id: this.p, quarter: this.quarter,  name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBRRevenue);
                 this.p++;
                 this.p = this.p + '.0'
              })

              //Grouping by Assigned To
              const groupedeObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkeyl1']]) {
                  prev[cur['prmkeyl1']] = [cur];
                } else {
                  prev[cur['prmkeyl1']].push(cur);
                }
                return prev;
              }, {});
              this.dataeSB = Object.keys(groupedeObj).map(key => { return { key, value: groupedeObj[key] }});

              //Looping thro' and finding percentage for each Assigned To
              this.dataeSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.quarter = '';
                this.region = '';
                this.assigned_to = '';
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.assignedto_name
                  this.quarter = j.quarter;
                  this.region = j.region;
                  this.assigned_to = j.assigned_to
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
               
                this.pieSBERevenue.push({id: this.p, quarter: this.quarter, region: this.region, assigned_to:this.assigned_to,  name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBERevenue);
                 this.p++;
                  this.p = this.p + '.0'
              })

              //Grouping by Customer
              const groupedcObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkeyl2']]) {
                  prev[cur['prmkeyl2']] = [cur];
                } else {
                  prev[cur['prmkeyl2']].push(cur);
                }
                return prev;
              }, {});
              this.datacSB = Object.keys(groupedcObj).map(key => { return { key, value: groupedcObj[key] }});

              //Looping thro' and finding percentage for each Customer
              this.datacSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.quarter = '';
                this.region = '';
                this.assigned_to = '';
                this.customer = '';

                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.companyname
                  this.quarter = j.quarter;
                  this.region = j.region;
                  this.assigned_to = j.assigned_to
                  this.customer = j.company_id
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
                
                this.pieSBCRevenue.push({id: this.p, quarter: this.quarter, region: this.region, assigned_to:this.assigned_to, company_id: this.customer,
                 name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBCRevenue);
                 this.p++;
                 this.p = this.p + '.0'
              })

              //Grouping by Products
              const groupedpObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkeyl3']]) {
                  prev[cur['prmkeyl3']] = [cur];
                } else {
                  prev[cur['prmkeyl3']].push(cur);
                }
                return prev;
              }, {});
              this.datapSB = Object.keys(groupedpObj).map(key => { return { key, value: groupedpObj[key] }});

              //Looping thro' and finding percentage for each Product
              this.datapSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.quarter = '';
                this.region = '';
                this.assigned_to = '';
                this.customer = '';
                this.product = '';

                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.productname;
                  this.quarter = j.quarter;
                  this.region = j.region;
                  this.assigned_to = j.assigned_to
                  this.customer = j.company_id
                  this.product = j.product
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
                
                this.pieSBPRevenue.push({quarter: this.quarter, region: this.region, assigned_to:this.assigned_to, company_id: this.customer,
                  product: this.product, name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBPRevenue);

              })



              this.dosunburstRegChart();
  }

  dosunburstRegChart(){
    var data = [], 
    q1 = this.pieSBQRevenue,
    r1 = this.pieSBRRevenue,
    e1 = this.pieSBERevenue,
    c1 = this.pieSBCRevenue,
    p1 = this.pieSBPRevenue;

    data.push({id: '0.0', parent: '', name: 'FY', value: 100})

    q1.forEach( i=> {
      data.push({id:i.id, parent: i.parent, name: i.name, value: i.value});
      this.quarter = '';
      this.parent = '';

      this.quarter = i.name;
      this.parent = i.id;
      r1.forEach( j => {
        if(this.quarter == j.quarter )
        {
          data.push({id: j.id , parent: this.parent , name: j.name, value: j.value})  
          this.region = '';
          this.rparent = '';

          this.region = j.name;
          this.rparent = j.id;
          this.quarter = j.quarter;
          e1.forEach( k => {
            //console.log("data1", this.quarter , j.quarter, this.region, j.region)
            if(this.quarter == k.quarter && this.region == k.region)
            {
              data.push({id: k.id , parent: this.rparent , name: k.name, value: k.value})
              this.eparent = '';
              this.assigned_to = '';

              this.assigned_to = k.assigned_to;
              this.eparent = k.id;
              this.quarter = k.quarter;
              this.region = k.region;

              c1.forEach(l => {
                //console.log("data2",this.eparent, this.assigned_to, l.assigned_to, this.region, l.region, this.quarter, l.quarter)
                if(this.quarter == l.quarter && this.region == l.region && this.assigned_to == l.assigned_to)
                {
                  //console.log("data",this.eparent)
                  data.push({id: l.id , parent: this.eparent , name: l.name, value: l.value})

                  this.cparent = '';
                  this.customer = '';

                  this.customer = l.company_id;
                  this.cparent = l.id;
                  this.region = l.region;
                  this.quarter = l.quarter;
                  this.assigned_to = l.assigned_to;

                  p1.forEach( m => {
                    //console.log("data3", this.cparent, this.customer, m.company_id , this.quarter, m.quarter, this.region, m.region)
                    if(this.quarter == m.quarter && this.region == m.region && this.assigned_to == m.assigned_to && this.customer == m.company_id )
                    {
                      //console.log("data", this.cparent)
                      data.push({ parent: this.cparent , name: m.name, value: m.value})
                    }
                  })
                }
              })
            }
          })
        }
      })
    })    

        
          
          
            



//console.log("data", data);

    this.options = {
    chart: {
        height: '100%'
    },

    title: {
        text: 'SALES INFORMATION BASED ON FINANCIAL YEAR'
    },
    series: [{
        type: "sunburst",
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}',
            filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
            }
        },
        levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
                rotationMode: 'parallel',
                filter: {
                    property: 'outerArcLength',
                    operator: '>',
                    value: 64
                }
            }
        }, {
            level: 2,
            colorByPoint: true,
            dataLabels: {
                rotationMode: 'parallel'
            }
        },
        {
            level: 3,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        }, {
            level: 4,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        },
        {
            level: 5,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        },
        {
            level: 6,
            colorVariation: {
                key: 'brightness',
                to: -0.5
            }
        }]

    }],
    tooltip: {
        headerFormat: "",
        pointFormat: '<b>{point.name}</b> is <b>{point.value}</b>'
    }
}
  }

}