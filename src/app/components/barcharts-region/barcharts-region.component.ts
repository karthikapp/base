import { Component, OnInit, OnDestroy } from '@angular/core';
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
    currentYear: any;
   year_list:any;
   month_list: any;
   oppobreglist:any;
   opportunities_proL: any;
   monthName: any;
   	

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {

    this.opportunities_pro = [];
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
                    this.opportunities_pro = [];
                    this.opportunities_pro = u;
                    this.yearProList();
                    this.monthProList();
                    this.selectProList();
                    
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

  onYearChange(year){
    this.yearSelect = year;
    this.monthProList();
    this.selectProList();
  }

  onMonthChange(month){
    this.monthSelect = month;
    this.selectProList();
  }

  selectProList(){
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
      console.log("prev", prev);
      return prev;
    }, {});



    this.dataPro = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});
    this.dataPro.forEach( i => {
      this.oppoProValues = [];
      this.name = '';
      i.value.forEach( j => {
        this.oppoProValues.push(j.valueofdeal)
        this.name = j.productname
        console.log("j", this.oppoProValues);
      })
      this.oppoPRV = 0;
      this.oppoPRV = this.oppoProValues.reduce((a,b) => a+b, 0);
      this.barProdRevenue.push({name: this.name, y:this.oppoPRV});
    })

    console.log("barPro", this.barProdRevenue);
    this.barProdRevenue.sort((a,b) => b.y - a.y);

    this.barProdRevenue.splice(10);

    console.log("barPro", this.barProdRevenue);



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
        text: 'Top 10 Products by Revenue'
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
