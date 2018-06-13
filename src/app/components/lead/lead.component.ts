import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit, OnDestroy {
  leads: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  leadlabel: string;
  followupno: any;
  totalCount: any;
  totalValue: any;

  leadsarrayvalue: any;
  leadsarraylist: any;
  leadsum: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {  	
  	this.leads = ''; 
    this.leadsarrayvalue = [];
    this.leadsarraylist = [];
    this.leadsum = '';
    this.totalValue = '';
    this.totalCount = '';

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

            if (v.title == undefined)
            {
              v.title = '';
            }

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "PRESALES"
              || v.role.toUpperCase() == "MASTER"
              || v.role.toUpperCase() == "INSIDE SALES"
              )
            {
              this.firebaseservice.getLeadsByID(this.uid)
              .takeWhile(() => this.alive)
              .subscribe(lead => {
              this.leads = lead;
              this.leads = this.leads.filter(v => {
              return v.leadstatus != 'Qualified' && v.leadstatus != 'Rejected'})
              console.log(this.leads);
              this.totalCount = Object.keys(this.leads).length;

              this.leads.forEach(element => {
                if (element.products_list == undefined)
                {
                  this.leadsarrayvalue.push(0);
                  this.leadsarraylist.push(element);
                }
                else 
                {
                  let somelist = element.products_list
                  somelist.forEach(value =>
                  {
                    if(value.value != undefined){
                    this.leadsarrayvalue.push(value.value);
                    this.leadsarraylist.push(value);
                  }
                  })
                }
              })

              this.leadsarraylist = this.leadsarrayvalue
              this.leadsum = this.leadsarraylist.reduce((a, b) => a + b, 0);
              if(this.leadsum == undefined || isNaN(this.leadsum)) {
                  this.leadsum = 0;
                }

              this.totalValue = parseFloat(this.leadsum);
              console.log("TV",this.totalValue, this.leadsum, this.leadsarrayvalue, this.leadsarraylist)
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
      this.leadlabel = "ONSITE VISIT"
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
      else if (state == "prequal")
      {
        return "PRE-QUALIFICATION"
      }
      else if (state == "Rejected")
      {
        return "Rejected"
      }
      else if (state == "prequal")
      {
        return "Pre - Qualification"
      }

   }

  ngOnDestroy() {
    this.alive = false;
  }

}

