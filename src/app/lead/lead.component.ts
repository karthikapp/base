import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  leads: any;
  activities:any;
  company_id: string;
  company_name: string;

  activity_type_flag

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
  	//Router parameters
  	this.company_id = this.router.snapshot.params['companyid'];
  	this.company_name = this.router.snapshot.params['companyname'];
  	this.leads = '';

    console.log(this.company_name,this.company_id)
  	this.showLeadActivities();
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

}
