import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
//import { DataServiceService } from "../../services/data-service.service";
//import { Accounts } from "../../classes/accounts";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit, OnDestroy {
  leads: any;
  activities:any;
  company_id: string;
  company_name: string;
  acct: any[];
  cp: any[];

  //account: Accounts[];

  isOpen : boolean = false;

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, 
    private route: Router
    //,public dataservice: DataServiceService
    ) { }

  ngOnInit() {
  	//Router parameters
  	this.company_id = this.router.snapshot.params['companyid'];
  	this.company_name = this.router.snapshot.params['companyname'];
  	this.leads = ''; 

    //this.account = this.dataservice.account;
    this.firebaseservice.getAccount(this.company_id).subscribe(acct => {
      this.acct = acct;
      this.cp = acct[0].contact_persons;
      console.log(this.acct,this.cp);
    })
    
  	this.showLeadActivities();
  }

  ngOnDestroy(){

  }

  showLeadActivities(){
  	 //List of Leads
  	 this.firebaseservice.getLeads(this.company_id).subscribe(leads => {
  	 		this.leads = leads;
        //console.log(leads);
        })
  }

  showOppoActivities(){
  }

  closeAllLeads(): void {
    this.leads.forEach((lead) => {
      lead.isOpen = false;
    });
  }

  showContent(lead) {
    if (!lead.isOpen) {
      this.closeAllLeads();
    }
    lead.isOpen = !lead.isOpen;
  }

}

