import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-sunburst-emp-y',
  templateUrl: './sunburst-emp-y.component.html',
  styleUrls: ['./sunburst-emp-y.component.css']
})
export class SunburstEmpYComponent implements OnInit, OnDestroy {

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
     
     dataqSB: any;
     datarSB: any;
     dataeSB: any;

     opportunities_SBLV: any;

     oppoTSBV: any;
     oppoSBV: any;
    valuePercent: any;
    name: any;

    yearSelect: any;

    currentYear: any;
   year_list:any;

   opposblist:any;
   oppo_sbL: any;

   p: any;

   brand: any;
   parent: any;
   rparent: any;
   assigned_to: any;
   product: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
    this.opportunities_sunburst = []; 

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
             
               this.yearSelect = this.currentYear

              this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                  this.opportunities_sunburst = [];
                
                this.opportunities_sunburst = u;
                  this.yearSBList();
                  this.selectSBYList();

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



  yearSBList(){
    this.year_list = this.opportunities_sunburst
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }


 onYearChange(year){
    this.yearSelect = year;

    this.selectSBYList();
  }


  selectSBYList(){

    this.opportunities_SBL = [];
    this.opportunities_SBLV = [];
    this.dataeSB = [];
    this.dataqSB = [];
    this.datarSB = [];
    this.pieSBQRevenue = [];
    this.pieSBERevenue = [];
    this.pieSBRRevenue = [];
    this.p = '1.0';
    this.oppoSBTotalValues = [];
    this.oppoTSBV = 0;
    this.oppoSBV = 0;

    this.opportunities_SBL = this.opportunities_sunburst.filter( i => {
        return i.year == this.yearSelect 
      })

    this.opportunities_SBL.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoSBTotalValues.push(i.valueofdeal)
                }

                var prmkey = i.assigned_to + i.brand 

                var prmkeyl1 = i.assigned_to + i.brand + i.product
               
                this.opportunities_SBLV.push({prmkey: prmkey, prmkeyl1: prmkeyl1, assigned_to: i.assigned_to, assignedto_name: i.assignedto_name,
                 brand: i.brand, product: i.product, productname: i.productname, valueofdeal: i.valueofdeal})

                //console.log("opplsv", this.opportunities_SBLV)
              })
              this.oppoTSBV = this.oppoSBTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Assigned To
              const groupedqObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['assigned_to']]) {
                  prev[cur['assigned_to']] = [cur];
                } else {
                  prev[cur['assigned_to']].push(cur);
                }
                return prev;
              }, {});
              this.dataqSB = Object.keys(groupedqObj).map(key => { return { key, value: groupedqObj[key] }});

              //Looping thro' and finding percentage for each Assigned To
              this.dataqSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.assigned_to = '';
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.assigned_to = j.assigned_to;
                  this.name = j.assignedto_name;
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
                
                this.pieSBQRevenue.push({id: this.p, parent: '0.0' , assigned_to: this.assigned_to, name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBQRevenue);
                 this.p++;
                 this.p = this.p + '.0';
              })

              //Grouping by Brand
              const groupedrObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkey']]) {
                  prev[cur['prmkey']] = [cur];
                } else {
                  prev[cur['prmkey']].push(cur);
                }
                return prev;
              }, {});
              this.datarSB = Object.keys(groupedrObj).map(key => { return { key, value: groupedrObj[key] }});

              //Looping thro' and finding percentage for each Brand
              this.datarSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.assigned_to = '';     
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.brand;
                  this.assigned_to = j.assigned_to;
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;

                this.pieSBRRevenue.push({id: this.p, assigned_to: this.assigned_to,  name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBRRevenue);
                 this.p++;
                 this.p = this.p + '.0'
              })

              //Grouping by Product
              const groupedeObj = this.opportunities_SBLV.reduce((prev, cur)=> {
                if(!prev[cur['prmkeyl1']]) {
                  prev[cur['prmkeyl1']] = [cur];
                } else {
                  prev[cur['prmkeyl1']].push(cur);
                }
                return prev;
              }, {});
              this.dataeSB = Object.keys(groupedeObj).map(key => { return { key, value: groupedeObj[key] }});

              //Looping thro' and finding percentage for each Product
              this.dataeSB.forEach( i => {
                this.oppoSBValues = [];
                this.name = '';
                this.assigned_to = '';
                this.product = '';
                this.brand = '';
                i.value.forEach( j => {
                  this.oppoSBValues.push(j.valueofdeal)
                  this.name = j.productname
                  this.product = j.product;
                  this.assigned_to = j.assigned_to;
                  this.brand = j.brand
                })
                this.oppoSBV = 0;
                this.valuePercent = null;
                this.oppoSBV = this.oppoSBValues.reduce((a,b) => a+b, 0)
                this.valuePercent = (this.oppoSBV/ this.oppoTSBV)*100;
               
                this.pieSBERevenue.push({brand: this.brand, assigned_to:this.assigned_to, product: this.product,  name: this.name, value:this.valuePercent});
                //console.log("psReg", this.pieSBERevenue);
              })

              this.dosunburstRegChart();
  }

  dosunburstRegChart(){
    var data = [], 
    q1 = this.pieSBQRevenue,
    r1 = this.pieSBRRevenue,
    e1 = this.pieSBERevenue;

    data.push({id: '0.0', parent: '', name: 'Year', value: 100})

    q1.forEach( i=> {
      data.push({id:i.id, parent: i.parent, name: i.name, value: i.value});
      this.assigned_to = '';
      this.parent = '';

      this.assigned_to = i.assigned_to;
      this.parent = i.id;
      r1.forEach( j => {
        if(this.assigned_to == j.assigned_to )
        {
          data.push({id: j.id , parent: this.parent , name: j.name, value: j.value})  
          this.brand = '';
          this.rparent = '';

          this.brand = j.name;
          this.rparent = j.id;
          this.assigned_to = j.assigned_to;
          e1.forEach( k => {
            if(this.assigned_to == k.assigned_to && this.brand == k.brand)
            {
              data.push({ parent: this.rparent , name: k.name, value: k.value})
            }
          })
        }
      })
    })    

    this.options = {
    chart: {
        height: '100%'
    },

    title: {
        text: 'SALES INFORMATION BASED ON YEAR'
    },
    series: [{
        type: "sunburst",
        data: data,
        allowDrillToNode: true,
        cursor: 'pointer',
        dataLabels: {
            format: '{point.name}: {point.value:.2f}%',
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
                to: 0.5
            }
        }]

    }],
    tooltip: {
        headerFormat: "",
        pointFormat: '<b>{point.name}</b> is <b>{point.value:.2f}%</b>'
    }
}
  }
}
