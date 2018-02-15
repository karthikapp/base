import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { OppoFilterAllTeamService } from "../../services/oppo-filter-all-team.service";

@Component({
  selector: 'app-viewpresales',
  templateUrl: './viewpresales.component.html',
  styleUrls: ['./viewpresales.component.css']
})
export class ViewpresalesComponent implements OnInit, OnDestroy {

	presaleslist: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  prelabel: string;
  
  isActivOpen : boolean = false;

  rflag: string;

  userid: string;
  region: string;
  startEDCDate: any;
  endEDCDate: any;

  constructor(private firebaseservice : FirebaseService, private oppoService : OppoFilterAllTeamService, 
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {

  	this.presaleslist = [];

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
    
  	//PRESALES list
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
              v.title = '';
            }

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.role.toUpperCase() == "MASTER"
              || v.role.toUpperCase() == "PRESALES"
              || v.title.toUpperCase() == "PRE-SALES HEAD")
            {
              if(this.rflag == 'me'){
                this.firebaseservice.getOpportunitiesByID(this.uid)
                  .takeWhile(() => this.alive)
                  .subscribe(presales => {
                  this.presaleslist = presales;
                  this.presaleslist = this.presaleslist.filter(v => {
                  return v.opportunity_state == 'Presales_Presentation'
              	  })    
        		    })
              }
              else if(this.rflag == 'team') {

                this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
                .takeWhile(() => this.alive)
                .subscribe(presales => {
                  this.presaleslist = presales;
                  this.presaleslist = this.presaleslist.filter(v => {
                    return v.opportunity_state == 'Presales_Presentation'
                  })
                  console.log("nego",this.presaleslist) 
                  this.presaleslist = this.oppoService.onChangeofRegion(this.presaleslist, this.userid, this.startEDCDate, this.endEDCDate)
                })
              }  
              else if(this.rflag == 'all'){
                this.firebaseservice.getopportunities()
                .takeWhile(() => this.alive)
                .subscribe(presales => {
                  this.presaleslist = presales;
                  this.presaleslist = this.presaleslist.filter(v => {
                    return v.opportunity_state == 'Presales_Presentation'
                  })
                  console.log("nego",this.presaleslist) 
                  this.presaleslist = this.oppoService.onChangeofRegionUser(this.presaleslist, this.region, this.userid, this.startEDCDate, this.endEDCDate) 
                })
              }
              else if(this.rflag == 'teampre'){
                this.firebaseservice.getopportunitiesbypresalesid(this.uid)
                  .takeWhile(() => this.alive)
                  .subscribe(presales => {
                  this.presaleslist = presales
                  this.presaleslist = this.presaleslist.filter(v => {
                  return v.opportunity_state == 'Presales_Presentation'
                  })
                  console.log("nego",this.presaleslist) 
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
        this.prelabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.prelabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.prelabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.prelabel = "OEM"
    }

     else if (String(leadsource) == "outboundcall")
    {
      this.prelabel = "OUTBOUND CALL"
    }

     else if (String(leadsource) == "onsite")
    {
      this.prelabel = "ON SITE VISIT"
    }

    return this.prelabel

  }

  ngOnDestroy() {
    this.alive = false;
  }

  showContentActivOppo(presale) {

    if (!presale.isActivOpen) {
      this.closeallActivOppo();
    }
    presale.isActivOpen = !presale.isActivOpen;
    console.log("presaleshow", presale, presale.isActivOpen);
  }

  closeallActivOppo(): void {
    this.presaleslist.forEach((presale) => {
        presale.isActivOpen = false;
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
