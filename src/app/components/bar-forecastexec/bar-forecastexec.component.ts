import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';

@Component({
  selector: 'app-bar-forecastexec',
  templateUrl: './bar-forecastexec.component.html',
  styleUrls: ['./bar-forecastexec.component.css']
})
export class BarForecastexecComponent implements OnInit {
	@Input()
	category: any;

   options: Object;

  	uid: string;
   	ev: boolean = false;

   	alive: boolean = true;

     opportunities_barfexec: any;
     barFExec: any;

     execList: any;
     execSelect: string;
     
  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.opportunities_barfexec = [];


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
             this.firebaseservice.retreiveforecast()
              .takeWhile(() => this.alive)
              .subscribe( 
                u => {
                    this.opportunities_barfexec = [];
                    this.opportunities_barfexec = u;

                    this.selectExecList();
                    this.doExecList();
                    
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
             // console.log('No access to this page choco');
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

  onChangeExec(exec){
    this.execSelect = exec;
    this.doExecList();
  }

  selectExecList(){
    this.execList = [];
    this.execList = this.opportunities_barfexec
      .map(item => item.execname)
      .filter((value, index, self) => { return self.indexOf(value) === index })
    this.execSelect = this.execList[0];
    
  }

  doExecList(){
     this.barFExec = [];
     //console.log("12", this.execList, this.execSelect)
      this.barFExec = this.opportunities_barfexec.filter( i=> {
        return i.execname == this.execSelect
      })

      //console.log("13", this.barFExec)
    if(this.barFExec.length> 0)
    {
    this.dobarforecastExec();
    }
  }

 

   dobarforecastExec(){

  //    var series =  [{
  //   'name': 'Wk1',
  //   'data': []
  // },
  // {
  //   'name': 'Wk2',
  //   'data': []
  // },
  // {
  //   'name': 'Wk3',
  //   'data': []
  // },
  // {
  //   'name': 'Wk4',
  //   'data': []
  // },
  // {
  //   'name': 'Wk5',
  //   'data': []
  // },
  // {
  //   'name': 'Wk6',
  //   'data': []
  // },
  // {
  //   'name': 'Wk7',
  //   'data': []
  // },
  // {
  //   'name': 'Wk8',
  //   'data': []
  // },
  // {
  //   'name': 'Wk9',
  //   'data': []
  // },
  // {
  //   'name': 'Wk10',
  //   'data': []
  // },
  // {
  //   'name': 'Wk11',
  //   'data': []
  // },
  // {
  //   'name': 'Wk12',
  //   'data': []
  // },
  // {
  //   'name': 'Wk13',
  //   'data': []
  // }], val = this.opportunities_barfexec

  // for(let i=0; i < 13; i++){
  //   for(let j=0; j < this.opportunities_barfexec.length; j ++)
  //   {
  //     series[i].data.push(val[j].value_exec[i]);
  //   }
  //  }

  //   var xAxis = {
  //   'categories' : [],
  //   'title': {
  //     'text': 'Executive'
  //   }
  // }, pre = this.opportunities_barfexec;

  // pre.forEach( i => {
  //   xAxis.categories.push(i.execname);
  // })
    
  //   this.options = {
  //     chart: {
  //       type: 'column'
  //   },
  //   title: {
  //       text: 'FORECAST(Executive)'
  //   },
  //   xAxis: xAxis,
  //   yAxis: {
  //       min: 0,
  //       title: {
  //           text: 'Value'
  //       },
  //       stackLabels: {
  //           enabled: true,
  //           style: {
  //               fontWeight: 'bold'
  //           }
  //       },
  //       labels:
  //       {
  //         format: '{value} Rs'
  //       }
  //   },
  //   legend: {
  //       align: 'right',
  //       x: -30,
  //       verticalAlign: 'top',
  //       y: 25,
  //       floating: true,
  //       backgroundColor: 'white',
  //       borderColor: '#CCC',
  //       borderWidth: 1,
  //       shadow: false
  //   },
  //   tooltip: {
  //       headerFormat: '<b>{point.x}</b><br/>',
  //       pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  //   },
  //   plotOptions: {
  //       column: {
  //           stacking: 'normal',
  //           dataLabels: {
  //               enabled: true
  //           }
  //       }
  //   },
  //   series: series
  //   }
  // }

      var series =  [{
    'name': 'Value',
    'data': []
  }], cur = this.barFExec;

  for(let i=0; i< 13; i++)
  {
    series[0].data.push(cur[0].value_exec[i])
    //console.log("cur", cur[0].value_exec[i]);
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
        text: 'FORECAST (Executive)'
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
