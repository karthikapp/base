import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-revenue-assignedto',
  templateUrl: './revenue-assignedto.component.html',
  styleUrls: ['./revenue-assignedto.component.css']
})
export class RevenueAssignedtoComponent implements OnInit, OnDestroy {
 
  //Variables
  //Common for All for accessing Users
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  //Charts - Rev for assigned To
  options: Object;
  opportunities_assgnto: any;
  oppoAssgnToTotalValues: any;
  oppoAssgnToValues: any;
  pieAssgnToRevenue: any;
  dataAssgnTo: any;
  oppoTAV: any;
  oppoAV: any;
  valuePercent: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth,
    private analyticsservice : AnalyticsService) { }

  ngOnInit() {
    //Initializing the objects
  	this.opportunities_assgnto = [];
  	this.oppoAssgnToTotalValues = [];
  	this.oppoAssgnToValues = [];
  	this.dataAssgnTo = [];
  	this.pieAssgnToRevenue = [];
  	this.oppoTAV = 0;
  	this.oppoAV = 0;

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
            //Fetching Values from Analytics
            this.analyticsservice.getOpportunitiesforrv()
            .takeWhile(() => this.alive)
            .subscribe( 
            u => {
              this.opportunities_assgnto = [];
              this.pieAssgnToRevenue = [];
              this.dataAssgnTo = [];
              
              this.opportunities_assgnto = u;

              //Total Values of All Opportunities
              this.opportunities_assgnto.forEach( 
              i => {
                if(i.valueofdeal != undefined)
                {
                  this.oppoAssgnToTotalValues.push(i.valueofdeal)
                }
              })
              this.oppoTAV = this.oppoAssgnToTotalValues.reduce((a, b) => a + b, 0);

              //Grouping by Assigned To
              const groupedObj = this.opportunities_assgnto.reduce((prev, cur)=> {
                if(!prev[cur['assigned_to']]) {
                  prev[cur['assigned_to']] = [cur];
                } else {
                  prev[cur['assigned_to']].push(cur);
                }
            		return prev;
            	}, {});
              this.dataAssgnTo = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] }});

              //Looping thro' and finding percentage for each Employees
              this.dataAssgnTo.forEach( i => {
                this.oppoAssgnToValues = [];
                i.value.forEach( j => {
                  this.oppoAssgnToValues.push(j.valueofdeal)
                })
                this.oppoAV = 0;
                this.valuePercent = null;
                this.oppoAV = this.oppoAssgnToValues.reduce((a,b) => a+b, 0);
                this.valuePercent = (this.oppoAV/ this.oppoTAV)*100;
                this.pieAssgnToRevenue.push({name: i.key, y:this.valuePercent});
              })

              //Paasing the value to Pie Chart - Rev by Employees
              this.dopieAssgnToCharts();
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

  dopieAssgnToCharts(){
    //Series is separately defined to loop thro' the data
    var series =  [{
  		'name': 'Products',
  		'colorByPoint': true,
  		'data': []
  	}], cur = this.pieAssgnToRevenue;

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
        text: 'Revenue By Employees'
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
