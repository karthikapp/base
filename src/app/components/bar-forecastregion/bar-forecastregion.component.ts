import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';

@Component({
  selector: 'app-bar-forecastregion',
  templateUrl: './bar-forecastregion.component.html',
  styleUrls: ['./bar-forecastregion.component.css']
})
export class BarForecastregionComponent implements OnInit {

  @Input()
  category: any;

   options: Object;

    uid: string;
     ev: boolean = false;

     alive: boolean = true;

     opportunities_barfreg: any;
     barFReg: any;

     regList: any;
     regSelect: string;
     
  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.opportunities_barfreg = [];
    this.regList = '';


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
             this.firebaseservice.retreiveforecastbyregion()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_barfreg = [];
                    this.opportunities_barfreg = u;

                    this.selectRegList();
                    this.doRegList();
                    
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

  onChangeReg(region){
    this.regSelect = region;
    this.doRegList();
  }

  selectRegList(){
    this.regList = [];
    this.regList = this.opportunities_barfreg
      .map(item => item.region)
      .filter((value, index, self) => { return self.indexOf(value) === index })
    this.regSelect = this.regList[0];
    
  }

  doRegList(){
     this.barFReg = [];

      this.barFReg = this.opportunities_barfreg.filter( i=> {
        return i.region == this.regSelect
      })

   console.log("bar", this.barFReg);
   if(this.barFReg.length > 0)
   {
     this.dobarforecastReg();
   }
  }

 

   dobarforecastReg(){

      var series =  [{
    'name': 'Value',
    'data': []
  }], cur = this.barFReg;

  for(let i=0; i< 13; i++)
  {
    series[0].data.push(cur[0].value_region[i])
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
        text: 'FORECAST (Region)'
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
