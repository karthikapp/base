import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-leadsdetail',
  templateUrl: './leadsdetail.component.html',
  styleUrls: ['./leadsdetail.component.css']
})
export class LeadsdetailComponent implements OnInit {

  leads: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  leadlabel: string;
  followupno: any;

  leadid: string;

  lead_title: string;
  approval_authority: string;
  assigned_to?: string;
  budget: any;
  company_contact_person_id: string;
  company_contact_person_name: string;
  company_id: string;
  company_name:string;
  competitorslist: object[];
  created_at: any;
  distributor_id: string;
  distributor_name: string;
  edc: any;
  event_id: string;
  event_name: string;
  leadsource: string;
  leadstatus: string;
  needlist: object[];
  products_list: object[];
  reports_to: any;
  region: any;
  oem_id: string;
  oem_name: string;
  person_designation: any;
  activities: object[];
  upcoming: object[];

  needname: any;

  competitor_name: string;

  meetingremark: string;
  presales_approved_date: Date;
  presales_approved_by: string;
  presales_approved_to: string;

  constructor(private firebaseservice : FirebaseService, 
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {  	
  	this.leads = ''; 
  	this.lead_title= '';
  	this.approval_authority= '';
  	this.assigned_to= '';
  	this.budget= null;
  	this.company_contact_person_id= '';
  	this.company_id= '';
  	this.company_name= '';
  	this.competitorslist=[];
  	this.created_at=null;
    this.distributor_id= '';
    this.edc= '';
    this.event_id= '';
    this.leadsource= '';
    this.leadstatus= '';
    this.needlist=[];
    this.products_list=[];
    this.reports_to= '';
    this.region= '';
    this.oem_id= '';
    this.person_designation= '';
    this.activities = [];
    this.upcoming = [];

    this.oem_name = '';
    this.distributor_name = '';
    this.event_name = '';
    this.meetingremark = '';
    this.presales_approved_date = null;
    this.presales_approved_by = '';
    this.presales_approved_to = '';

    //Display the leads detail based on lead key on respective fields
  	this.leadid = this.router.snapshot.params['leadid'];

  //Leads list
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

            if (v.title == undefined){
              v.title = '';
            }

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == 'PRE-SALES HEAD'
              || v.role.toUpperCase() == 'MASTER')
            {
              this.firebaseservice.getLeadsByKey(this.leadid)
              .takeWhile(() => this.alive)
              .subscribe(lead => {
              this.activities = lead.activities;
              this.needlist = lead.needlist;
              this.products_list = lead.products_list;
              this.competitorslist = lead.competitorslist;
              this.lead_title = lead.lead_title;

              this.approval_authority= lead.approval_authority;
            	this.assigned_to= lead.assigned_to;
            	this.budget= lead.budget;
            	this.company_contact_person_id= lead.company_contact_person_id;
            	this.company_id= lead.company_id;
            	this.company_name= lead.company_name;

            	this.created_at= lead.created_at;
              this.distributor_id= lead.distributor_id;
              this.distributor_name = lead.distributor_name;
              this.edc= lead.edc;
              this.event_id= lead.event_id;
              this.event_name = lead.event_name;
              this.leadsource= lead.leadsource;
              this.leadstatus= lead.leadstatus;
              this.meetingremark = lead.meetingremark;

              this.reports_to= lead.reports_to;
              this.region= lead.region;
              this.oem_id= lead.oem_id;
              this.oem_name = lead.oem_name;
              this.person_designation= lead.person_designation

              this.presales_approved_date = lead.presales_approved_date;
              this.presales_approved_to = lead.presales_approved_to;
              this.presales_approved_by = lead.presales_approved_by;

              this.leads = lead;

              console.log("hello",this.leads, this.activities, this.reports_to,this.assigned_to);

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
            this.route.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  // lead source label 
  leadsourcelabel(leadsource: String){
    if (String(leadsource) == "inbound-landline"){
        this.leadlabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.leadlabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.leadlabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.leadlabel = "OEM"
    }

     else if (String(leadsource) == "outboundcall")
    {
      this.leadlabel = "OUTBOUND CALL"
    }

     else if (String(leadsource) == "onsite")
    {
      this.leadlabel = "ON SITE VISIT"
    }

    return this.leadlabel

  }

  getnooffollowups(leadactivities) {
     if (leadactivities == undefined){
       this.followupno = "None"
       return this.followupno
     }
     else {
       this.followupno = Object.keys(leadactivities).length
       // console.log(this.followupno)
      return  this.followupno
     }
   }

  getleadapprovalstatus(state) {

     if (state == "Qualified-awaiting-presales")
     {
       return "AWAITING PRESALES"
     }
     else if (state == "Qualified-awaiting-manager")
      {
        return "AWAITING MANAGER APPROVAL"
      }
      else if (state == "Rejected")
      {
        return "Rejected"
      }

   }

   getneedlistdetails(needid){
    return this.firebaseservice.getNeedList(needid).subscribe(
       needlist => {console.log(needlist.need_name);
          this.needname = needlist.need_name; 
          return this.needname;
         })

   }

   getcompetitorslist(competitorid){
          return this.firebaseservice.getCompetitorList(competitorid).subscribe(
       competitorlist => {console.log(competitorlist.competitor_name);
          this.competitor_name = competitorlist.competitor_name; 
          return this.competitor_name;
         })
   }

  ngOnDestroy() {
    this.alive = false;
  }


}
