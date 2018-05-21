import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';

@Component({
  selector: 'app-bar-forecastbrand',
  templateUrl: './bar-forecastbrand.component.html',
  styleUrls: ['./bar-forecastbrand.component.css']
})
export class BarForecastbrandComponent implements OnInit {

  @Input()
  category: any;

   options: Object;

    uid: string;
     ev: boolean = false;

     alive: boolean = true;

     opportunities_barfbrand: any;
     barFBrand: any;

     brandList: any;
     brandSelect: string;
     
  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.opportunities_barfbrand = [];
    this.brandList = '';


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
              
                            
              if(this.category == 'All'){
             this.firebaseservice.retreiveforecastbybrand()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_barfbrand = [];
                    this.opportunities_barfbrand = u;

                    this.selectBrandList();
                    this.doBrandList();
                    
               })
            }
            else if (this.category == 'ThunderBird'){
              //console.log("Need to push values in analytics")
            }
            else if(this.category == 'Classic'){
              //console.log("Need to push values in analytics")
            }

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

  onChangeBrand(brand){
    this.brandSelect = brand;
    this.doBrandList();
  }

  selectBrandList(){
    this.brandList = [];
    this.brandList = this.opportunities_barfbrand
      .map(item => item.brand)
      .filter((value, index, self) => { return self.indexOf(value) === index })
    this.brandSelect = this.brandList[0];
    
  }

  doBrandList(){
     this.barFBrand = [];

      this.barFBrand = this.opportunities_barfbrand.filter( i=> {
        return i.brand == this.brandSelect
      })

   //console.log("bar", this.barFReg);
   if(this.barFBrand.length > 0)
   {
     this.dobarforecastBrand();
   }
  }

 

   dobarforecastBrand(){

      var series =  [{
    'name': 'Value',
    'data': []
  }], cur = this.barFBrand;

  for(let i=0; i< 13; i++)
  {
    series[0].data.push(cur[0].value_brand[i])
  }

  var xAxis = {
    'categories' : ['Week1','Week2','Week3','Week4', 'Week5', 'Week6', 'Week7', 'Week8', 'Week9', 'Week10', 'Week11', 'Week12', 'Week13'],
    'title': {
      'text': 'Week'
    }
  }


      this.options = {
         chart: {
        type: 'column'
    },
    title: {
        text: 'FORECAST (Brand)'
    },

    xAxis: xAxis,
    yAxis: {
        title: {
            text: 'Value',
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
     series: {
            pointWidth: 4,
            
        },
        column: {
          dataLabels: {
            enabled: true
        }
      }
    },
    series:series
      }
      
    }
}
