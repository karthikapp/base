import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {

  v: any;
  u: any;

  reportlabel: any;
  followupno: any;

  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  role: any;
  report:any;
  title: any;

  filteredLead: any;
  filteredOppo: any;
  isLoading: boolean = true;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    //Opportunities list
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

            this.role = v.role.toUpperCase();
            this.report = v.report.toUpperCase();
            this.title = v.title.toUpperCase();

            if (v.role.toUpperCase() == 'MASTER' || v.title.toUpperCase() == "PRE-SALES HEAD")
            {
  	          this.firebaseservice.getopportunities().subscribe(v=> {
                this.v = v;
                this.u = this.v;
                this.filteredOppo = this.u
                  .map(item => item.opportunity_assignedto)
                  .filter((value, index, self) => { return self.indexOf(value) === index });
                this.filteredLead = this.u
                  .map(item => item.lead_assigned_to)
                  .filter((value, index, self) => { return self.indexOf(value) === index });
                this.isLoading = false;
                });
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
       else
       {
            console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }
  
  // lead source label 
  leadsourcelabel(leadsource: String){
    if (String(leadsource) == "inbound-landline"){
        this.reportlabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.reportlabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.reportlabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.reportlabel = "OEM"
    }

     else if (String(leadsource) == "outboundcall")
    {
      this.reportlabel = "OUTBOUND CALL"
    }

     else if (String(leadsource) == "onsite")
    {
      this.reportlabel = "ON SITE VISIT"
    }
    else if (leadsource == undefined){
      this.reportlabel = ''
    }

    return this.reportlabel

  }

  returnruppeamount(value)
  {
  	return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

    getactivitytypetext(activitytype){
    if (activitytype == 'phonecall')
    {
      return "Phone Call"
    }
    else if (activitytype == 'onsitevisit') {
      return "On Site Visit"
    }
    else if (activitytype == 'presentation')
    {
      return "Presentation"
    }
    else if (activitytype == 'solutiondocumenting')
    {
      return "Solution Documenting"
    }
    else if (activitytype == 'poc')
    {
      return "POC"
    }
    else if (activitytype == 'demo')
    {
      return "Demo"
    }
    else if (activitytype == undefined) 
    {
      return ''
    }
  }

  returnopportunitystate(text)
  {
    if(text == 'Qualified_lead')
    {
      return 'Qualified Lead'
    }
    else if (text == 'Presales_Presentation')
    {
      return 'Presales Presentation'
    }
    else if (text == 'Budgetary_Price_Shared')
    {
      return 'Budgetary Price Shared'
    }
    else if (text == 'Finalising_BOM')
    {
      return 'Finalising BOM'
    }
    else if (text == 'POC/Demo')
    {
      return 'POC / Demo'
    }
    else if (text == 'Final_Proposal')
    {
      return 'Final Proposal'
    }
    else if (text == 'Final_Negotiation')
    {
      return 'Final Negotiation'
    }
    else if (text == 'Case_won')
    {
      return 'Case Won'
    }
    else if (text == 'Case_lost')
    {
      return 'Case Lost'
    }
    else if (text == undefined)
    {
      return ''
    }

  }

  getupcomingtext(value)
  {
    if (value == 'phone_call') 
    {
      return "Phone Call"
    }

    else if (value == 'online_meeting')
    {
      return "Online Meeting"
    }

    else if (value == 'on_site_visit')
    {
      return "On Site Visit"
    }
    else if (value ==undefined)
    {
      return ''
    }
  }

  getnooffollowups(activities) {
     if (activities == undefined){
       this.followupno = "None"
       return this.followupno
     }
     else {
       this.followupno = Object.keys(activities).length
       // console.log(this.followupno)
      return  this.followupno
     }
   }

ngOnDestroy() {
    this.alive = false;
  }

}
