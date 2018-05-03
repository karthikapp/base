import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';


@Component({
  selector: 'app-barcharts-region',
  templateUrl: './barcharts-region.component.html',
  styleUrls: ['./barcharts-region.component.css']
})
export class BarchartsRegionComponent implements OnInit {
     @Input()
   yflag: any;

   @Input()
   category: any;

	options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;
   	//opportunities_toppro: any;

     barProdRevenue: any;
     opportunities_pro: any;

     oppoProTotalValues: any;
     oppoProValues: any;
     
     dataPro: any;

     oppoTPV: any;
     oppoPRV: any;
     colValue: any;
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

   oppobreglist:any;
   oppobregfylist: any;

   opportunities_proL: any;
   monthName: any;

     yrflag: boolean = false;
  fyflag: boolean = false;
   	

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {

    this.opportunities_pro = [];
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
              
              if(this.category == 'All'){
             this.analyticsservice.getOpportunitiesforrv()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_pro = [];
                    this.opportunities_pro = u;

                     if(this.yrflag == false){
              this.yearProList();
                    this.monthProList();
                    this.selectProYList();
              } else if (this.fyflag == false){
                this.fyearProList();
              this.quarterProList();
              this.selectProFYList();
            }    
             })
            }
            else if (this.category == 'ThunderBird'){
              this.analyticsservice.getOpportunitiesforBird()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_pro = [];
                    this.opportunities_pro = u;

                     if(this.yrflag == false){
              this.yearProList();
                    this.monthProList();
                    this.selectProYList();
              } else if (this.fyflag == false){
                this.fyearProList();
              this.quarterProList();
              this.selectProFYList();
            }    
             })
            }
            else if(this.category == 'Classic'){
              this.analyticsservice.getOpportunitiesforClassic()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_pro = [];
                    this.opportunities_pro = u;

                     if(this.yrflag == false){
              this.yearProList();
                    this.monthProList();
                    this.selectProYList();
              } else if (this.fyflag == false){
                this.fyearProList();
              this.quarterProList();
              this.selectProFYList();
            }    
             })
            }


 				
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
  yearProList(){
    this.year_list = this.opportunities_pro
      .map(item => item.year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  monthProList(){
    this.oppobreglist = [];
    this.oppobreglist = this.opportunities_pro.filter(i => { return i.year == this.yearSelect})
    this.month_list = this.oppobreglist
                      .map(item => item.month)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
  }

  fyearProList(){
    this.fyear_list = this.opportunities_pro
      .map(item => item.financial_year)
      .filter((value, index, self) => { return self.indexOf(value) === index })
      // console.log("fyear", this.fyear_list)

  }

  quarterProList(){
    this.oppobregfylist = [];
    this.oppobregfylist = this.opportunities_pro.filter(i => { return i.financial_year == this.fyearSelect})
    this.quarter_list = this.oppobregfylist
                      .map(item => item.quarter)
                      .filter((value, index, self) => { return self.indexOf(value) === index })
                      // console.log("fyear", this.quarter_list);
  }



  onYearChange(year){
    this.yearSelect = year;
    this.monthSelect = '';
    this.monthProList();
    this.selectProYList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectProYList();
  }

   onFYearChange(fyear){
    this.fyearSelect = fyear;
    this.quarterSelect = '';
    this.quarterProList();
    this.selectProFYList();
  }

  onQuarterChange(quarter){
    this.quarterSelect = quarter;
    this.selectProFYList();
  }

  selectProFYList(){
    this.oppoProTotalValues = [];
    this.oppoProValues = [];
    this.dataPro = [];
    this.barProdRevenue = [];
    this.oppoTPV = 0;
    this.oppoPRV = 0;
    this.opportunities_proL = [];

    if(this.monthSelect != ''){
      this.opportunities_proL = this.opportunities_pro.filter( i => {
        return i.financial_year == this.fyearSelect && 
              i.quarter == this.quarterSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_proL = this.opportunities_pro.filter( i => {
        return i.financial_year == this.fyearSelect 
      })
    }

    this.opportunities_proL.forEach( i => {
      if(i.valueofdeal != undefined){
        this.oppoProTotalValues.push(i.valueofdeal)
      }
    })
    this.oppoTPV = this.oppoProTotalValues.reduce((a, b) => a + b, 0);

    const groupedObj = this.opportunities_proL.reduce((prev, cur)=> {
      if(!prev[cur['product']]) {
        prev[cur['product']] = [cur];
      } else {
        prev[cur['product']].push(cur);
      }
      // console.log("prev", prev);
      return prev;
    }, {});



    this.dataPro = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
    this.dataPro.forEach( i => {
      this.oppoProValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoProValues.push(j.valueofdeal)
        this.name = j.productname
        // console.log("j", this.oppoProValues);
      })
      this.oppoPRV = 0;
      this.oppoPRV = this.oppoProValues.reduce((a,b) => a+b, 0);
      this.barProdRevenue.push({name: this.name, y:this.oppoPRV});
    })

    // console.log("barPro", this.barProdRevenue);
    this.barProdRevenue.sort((a,b) => b.y - a.y);

    this.barProdRevenue.splice(10);

    // console.log("barPro", this.barProdRevenue);



    this.dobarProductCharts();
  }

  selectProYList(){
    this.oppoProTotalValues = [];
    this.oppoProValues = [];
    this.dataPro = [];
    this.barProdRevenue = [];
    this.oppoTPV = 0;
    this.oppoPRV = 0;
    this.opportunities_proL = [];

    if(this.monthSelect != ''){
      this.opportunities_proL = this.opportunities_pro.filter( i => {
        return i.year == this.yearSelect &&
        i.month == this.monthSelect
      })
    }
    else if(this.monthSelect == ''){
      this.opportunities_proL = this.opportunities_pro.filter( i => {
        return i.year == this.yearSelect
      })
    }

    this.opportunities_proL.forEach( i => {
      if(i.valueofdeal != undefined){
        this.oppoProTotalValues.push(i.valueofdeal)
      }
    })
    this.oppoTPV = this.oppoProTotalValues.reduce((a, b) => a + b, 0);

    const groupedObj = this.opportunities_proL.reduce((prev, cur)=> {
      if(!prev[cur['product']]) {
        prev[cur['product']] = [cur];
      } else {
        prev[cur['product']].push(cur);
      }
      // console.log("prev", prev);
      return prev;
    }, {});



    this.dataPro = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
    this.dataPro.forEach( i => {
      this.oppoProValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoProValues.push(j.valueofdeal)
        this.name = j.productname
        // console.log("j", this.oppoProValues);
      })
      this.oppoPRV = 0;
      this.oppoPRV = this.oppoProValues.reduce((a,b) => a+b, 0);
      this.barProdRevenue.push({name: this.name, y:this.oppoPRV});
    })

    // console.log("barPro", this.barProdRevenue);
    this.barProdRevenue.sort((a,b) => b.y - a.y);

    this.barProdRevenue.splice(10);

    // console.log("barPro", this.barProdRevenue);



    this.dobarProductCharts();
  }

   dobarProductCharts(){

      var series =  [{
    'name': 'Products',
    'data': []
  }], cur = this.barProdRevenue;

  cur.forEach( i => {
    series[0].data.push(i.y);
  })

  var xAxis = {
    'categories' : [],
    'title': {
      'text': 'Products'
    }
  }, pre = this.barProdRevenue;

  pre.forEach( i => {
    xAxis.categories.push(i.name);
  })


      this.options = {
         chart: {
        type: 'bar'
    },
    title: {
        text: 'TOP 10 PRODUCTS BY REVENUE'
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
