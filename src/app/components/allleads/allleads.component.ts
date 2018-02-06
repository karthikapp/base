import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-allleads',
  templateUrl: './allleads.component.html',
  styleUrls: ['./allleads.component.css']
})
export class AllleadsComponent implements OnInit, OnDestroy {
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  leads: any;
  leadlabel: string;
  followupno: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {  	
  	this.leads = ''; 

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

          if (v.role.toUpperCase() == "MASTER" || v.title.toUpperCase() == "PRE-SALES HEAD" )
          {
            this.firebaseservice.getAllLeads()
            .takeWhile(() => this.alive)
            .subscribe(lead => {
              this.leads = lead;
              this.leads = this.leads.filter(v => {
                return v.leadstatus != 'Qualified'})
              console.log(this.leads);
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

  //lead source label 
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
      this.leadlabel = "ONSITE VISIT"
    }
    return this.leadlabel
  }

  //Lead Activities
  getnooffollowups(leadactivities) {
    if (leadactivities == undefined){
      this.followupno = "None"
      return this.followupno
    }
    else {
      this.followupno = Object.keys(leadactivities).length
      return  this.followupno
    }
  }

  //Lead Approval Status
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

  ngOnDestroy() {
    this.alive = false;
  }

}
