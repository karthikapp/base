import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { OppoFilterAllTeamService } from "../../services/oppo-filter-all-team.service";

@Component({
  selector: 'app-viewnego',
  templateUrl: './viewnego.component.html',
  styleUrls: ['./viewnego.component.css']
})
export class ViewnegoComponent implements OnInit, OnDestroy {
	negolist: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  negolabel: string;

  isActivOpen : boolean = false;

  rflag: string;

  userid: string;
  region: string;
  startEDCDate: any;
  endEDCDate: any;
  role:any;
  createdat: any;

  constructor(private firebaseservice : FirebaseService, private oppoService : OppoFilterAllTeamService,
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {
  	this.negolist = [];
    this.role = '';
    this.createdat = this.firebaseservice.created_at;

    this.rflag = this.router.snapshot.params['rflag'];
    this.region = this.router.snapshot.params['regions'];
    this.userid = this.router.snapshot.params['userid'];
    this.startEDCDate = this.router.snapshot.params['sdate'];
    this.endEDCDate = this.router.snapshot.params['edate'];

    if(this.startEDCDate == '1900-01-01')
    {
      this.startEDCDate = null;
    }

    if(this.endEDCDate == '1900-01-01'){
      this.endEDCDate = null
    }
    
    console.log("oppo123",this.rflag, this.region, this.userid, this.startEDCDate, this.endEDCDate);

  	//NEGO list
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

            if (v.title == undefined)
            {
              v.title ='';
            }

            this.role = v.role.toUpperCase();

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.role.toUpperCase() == "MASTER"
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "ADMIN")
            {
              if(this.rflag == 'me'){
                this.firebaseservice.getOpportunitiesByID(this.uid)
                  .takeWhile(() => this.alive)
                  .subscribe(nego => {
                  this.negolist = nego;
                  this.negolist = this.negolist.filter(v => {
                    return v.opportunity_state == 'Final_Negotiation'
          	      })
                  console.log("nego",this.negolist) 
    		        })
              }
              else if(this.rflag == 'team') {
                this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
                  .takeWhile(() => this.alive)
                  .subscribe(nego => {
                  this.negolist = nego
                  this.negolist = this.negolist.filter(v => {
                    return v.opportunity_state == 'Final_Negotiation'
                })
                console.log("nego",this.negolist)
                this.negolist = this.oppoService.onChangeofRegion(this.negolist, this.userid, this.startEDCDate, this.endEDCDate) 
                })
              }
              else if(this.rflag == 'all'){
                this.firebaseservice.getopportunities()
                  .takeWhile(() => this.alive)
                  .subscribe(nego => {
                  this.negolist = nego;
                  this.negolist = this.negolist.filter(v => {
                  return v.opportunity_state == 'Final_Negotiation'
                })
                console.log("nego",this.negolist) 
                this.negolist = this.oppoService.onChangeofRegionUser(this.negolist, this.region, this.userid, this.startEDCDate, this.endEDCDate)
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
      else {
        console.log('No access to this page m&m');
        this.route.navigate(['login']);
        return this.ev=false;
      }
    });
  }

  onMoveTo(stage, oppokey){
    let opportunity_state = stage;
    let movetolist = {
      moved_time: this.createdat,
      moved_to_stage: stage
    }

    this.firebaseservice.updateOppoMoveTo(opportunity_state, movetolist, oppokey)
    .then(success => alert ("Stage moved successfully to " + stage));
  }

  returnruppeamount(value)
  {
  	return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

  // lead source label 
  leadsourcelabel(leadsource: String){
    if (String(leadsource) == "inbound-landline"){
      this.negolabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.negolabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.negolabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.negolabel = "OEM"
    }

     else if (String(leadsource) == "outboundcall")
    {
      this.negolabel = "OUTBOUND CALL"
    }

     else if (String(leadsource) == "onsite")
    {
      this.negolabel = "ON SITE VISIT"
    }

    return this.negolabel
  }


  ngOnDestroy() {
    this.alive = false;
  }

  showContentActivOppo(nego) {
    if (!nego.isActivOpen) {
      this.closeallActivOppo();
    }
    nego.isActivOpen = !nego.isActivOpen;
    console.log("negoshow", nego, nego.isActivOpen);
  }

  closeallActivOppo(): void {
    this.negolist.forEach((nego) => {
      nego.isActivOpen = false;
    });
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
