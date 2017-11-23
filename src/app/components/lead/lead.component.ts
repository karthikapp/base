import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit, OnDestroy {
  leads: any;
  oppo: any;
  activities:any;
  company_id: string;
  company_name: string;
  acct: any[];
  cp: any[];

  isOpen : boolean = false;
  oppoOpen : boolean = false;

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, 
    private route: Router) { }

  ngOnInit() {
  	//Router parameters
  	this.company_id = this.router.snapshot.params['companyid'];
  	this.company_name = this.router.snapshot.params['companyname'];
  	this.leads = ''; 
    this.oppo = '';

    this.firebaseservice.getAccount(this.company_id).subscribe(acct => {
      this.acct = acct;
      this.cp = acct[0].contact_persons;
      //console.log(this.acct,this.cp);
    })
    
  	this.showLeadActivities();
    this.showOppoActivities();
  }

  ngOnDestroy(){

  }

  //Leads list
  showLeadActivities(){
  	 //List of Leads
  	 this.firebaseservice.getLeads(this.company_id).subscribe(leads => {
  	 		this.leads = leads;
        //console.log(this.leads);
        })
  }

  //Accordion - show and hide for leads
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

  //Opportunities List
  showOppoActivities(){
         //List of Opportunities
     this.firebaseservice.getOpportunities(this.company_id).subscribe(oppo => {
         this.oppo = oppo;
        //console.log(this.oppo);
        })
  }

  //Accordion - show and hide for opportunities
  closeAlloppo(): void {
    this.oppo.forEach((oppo) => {
      oppo.oppoOpen = false;
    });
  }

  showContentOppo(oppo) {
    if (!oppo.oppoOpen) {
      this.closeAlloppo();
    }
    oppo.oppoOpen = !oppo.oppoOpen;
  }

}

