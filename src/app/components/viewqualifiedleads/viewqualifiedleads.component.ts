import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-viewqualifiedleads',
  templateUrl: './viewqualifiedleads.component.html',
  styleUrls: ['./viewqualifiedleads.component.css']
})
export class ViewqualifiedleadsComponent implements OnInit {

	qleads: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  leadlabel: string;
  followupno: any;

  leadid: string;

  products_list: object[];

  constructor(private firebaseservice : FirebaseService, 
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {

  	this.qleads = [];

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
              || v.report.toUpperCase() == 'RECIPIENT')
            {
            
            this.firebaseservice.getOpportunitiesByID(this.uid)
              .takeWhile(() => this.alive)
              .subscribe(qlead => {
              this.qleads = qlead.filter(v => {
              return v.opportunity_state == 'Qualified_lead'
          	})
              
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

  returnruppeamount(value)
  {
  	return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
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

ngOnDestroy() {
    this.alive = false;
  }



}
