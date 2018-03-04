import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-leadoppo',
  templateUrl: './leadoppo.component.html',
  styleUrls: ['./leadoppo.component.css']
})
export class LeadoppoComponent implements OnInit, OnDestroy {
  leads: any;
  oppo: any;
  activities:any;
  company_id: string;
  company_name: string;
  acct: any;
  cp: any[];

  uid: string;
  ev: boolean = false;

  isOpen : boolean = false;
  oppoOpen : boolean = false;

  alive: boolean = true;

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, 
    private route: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  	//Router parameters
  	this.company_id = this.router.snapshot.params['companyid'];
  	this.company_name = this.router.snapshot.params['companyname'];
  	this.leads = ''; 
    this.oppo = '';

    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         //console.log("email",this.uid)
         
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

            if (v.role.toUpperCase() == 'ADMIN')
            {
              this.firebaseservice.getAccount(this.company_id)
              .takeWhile(() => this.alive)
              .subscribe(acct => {
              this.acct = acct;
              this.cp = acct[0].contact_persons;
              return this.ev=true;
              })
    
              this.showLeadActivities();
              this.showOppoActivities();
              
            }
            else
            {
              console.log('No access to this page');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page');
            this.route.navigate(['login']);
            return this.ev=false;
       }
     });

  }

  ngOnDestroy(){
    this.alive = false;
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
    console.log("p2",lead);
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
