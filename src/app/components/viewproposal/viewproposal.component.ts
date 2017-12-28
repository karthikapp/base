import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-viewproposal',
  templateUrl: './viewproposal.component.html',
  styleUrls: ['./viewproposal.component.css']
})
export class ViewproposalComponent implements OnInit, OnDestroy{

	proposallist: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  proposallabel: string;

  isActivOpen : boolean = false;

  rflag: string;
  
  constructor(private firebaseservice : FirebaseService, 
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {
  	this.proposallist = [];

        this.rflag = this.router.snapshot.params['rflag'];
    console.log(this.rflag);

  	//Qualified leads list
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

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.role.toUpperCase() == "MASTER" )
            {
           if(this.rflag == 'me'){ 
            this.firebaseservice.getOpportunitiesByID(this.uid)
              .takeWhile(() => this.alive)
              .subscribe(proposal => {
              this.proposallist = proposal.filter(v => {
              return v.opportunity_state == 'Final_Proposal'
          	})
              
    		})
              }
           else if(this.rflag == 'team') {

            this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
              .takeWhile(() => this.alive)
              .subscribe(proposal => {
              this.proposallist = proposal.filter(v => {
              return v.opportunity_state == 'Final_Proposal'
            })
             console.log("nego",this.proposallist) 
           })
         }
           
           else if(this.rflag == 'all'){
            this.firebaseservice.getopportunities()
              .takeWhile(() => this.alive)
              .subscribe(proposal => {
              this.proposallist = proposal.filter(v => {
              return v.opportunity_state == 'Final_Proposal'
            })
             console.log("nego",this.proposallist) 
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
            this.route.navigate(['login']);
            return this.ev=false;
       }
     });
  }

   returnruppeamount(value)
  {
  	return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

  // lead source label 
leadsourcelabel(leadsource: String){
  if (String(leadsource) == "inbound-landline"){
      this.proposallabel = "INBOUND LANDLINE"
  }

  else if (String(leadsource) == "event"){
    this.proposallabel = "EVENT"
  }
  else if (String(leadsource) == "distributor"){
    this.proposallabel = "DISTRIBUTOR"
  }

  else if (String(leadsource) == "oem")
  {
    this.proposallabel = "OEM"
  }

   else if (String(leadsource) == "outboundcall")
  {
    this.proposallabel = "OUTBOUND CALL"
  }

   else if (String(leadsource) == "onsite")
  {
    this.proposallabel = "ON SITE VISIT"
  }

  return this.proposallabel

}

ngOnDestroy() {
    this.alive = false;
  }

showContentActivOppo() {

      this.isActivOpen = !this.isActivOpen;
      console.log (this.isActivOpen)

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
   }
   
}
