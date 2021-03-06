import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'app-teamopportunities',
  templateUrl: './teamopportunities.component.html',
  styleUrls: ['./teamopportunities.component.css']
})
export class TeamopportunitiesComponent implements OnInit , OnDestroy{

   uid: string;
   ev: boolean = false;

   alive: boolean = true;
   opportunities: any;

   totalValue: any;
   totalCount: any;

   arraylist: any;
   sumlist: any;
   qualifiedleadsum: any;
   qualifiedleadsum1: any;
   qualifiedleadlist: any;
   presalesopportunitylist: any;
   presalesopportunitysum: any;
   presalesopportunitysum1: any;
   presalesarraylist: any;
   budgetaryopportunitylist: any;
   budgetaryarraylist: any;
   budgetaryopportunitysum: any;
   budgetaryopportunitysum1: any;
   bomopportunitylist: any;
   bomarraylist: any;
   bomopportunitysum: any;
   bomopportunitysum1: any;
   pocopportunitylist: any;
   pocarraylist: any;
   pocopportunitysum: any;
   pocopportunitysum1: any;
   finalproposalopportunitylist: any;
   finalproposalarraylist: any;
   finalproposalopportunitysum: any;
   finalproposalopportunitysum1: any;
   finalnegoarraylist: any;
   finalnegoopportunitylist: any;
   finalnegoopportunitysum: any;
   finalnegoopportunitysum1: any;
   casewonopportunitylist: any;
   casewonarraylist: any;
   casewonopportunitysum: any;
   casewonopportunitysum1: any;
   caselostarraylist: any;
   caselostopportunitylist: any;
   caselostopportunitylist1: any;
   caselostopportunitysum: any;
   caselostopportunitysum1: any;
   arrayvalue: any;
   presalsesarrayvalue: any;
   budgetaryarrayvalue: any;
   bomarrayvalue: any;
   pocarrayvalue: any;
   finalproposalarrayvalue: any;
   finalnegoarrayvalue: any;
   casewonarrayvalue: any;
   caselostarrayvalue: any;

   rflag: string = 'team';

   person_list: Object[];

   user: string = 'All';

   itflag: boolean = true;
   rtflag: boolean = true;

   oppo_list: any[];
   oppo_list_dates: any[];

   role: string;
   report: string;
   startDate: any;
   endDate: any;

   regions: string;
   userid: any;
   sdate: any;
   edate: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  	this.opportunities = [];
    this.oppo_list = [];
    this.oppo_list_dates = [];
    this.startDate = null;
    this.endDate = null;
    this.totalCount = '';
    this.totalValue = '';
    this.role = '';
    this.report = '';

    this.regions = '';
    this.userid = '';
    this.edate = null;
    this.sdate = null;

  	//Opportunities list
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

            this.role = v.role.toUpperCase();
            this.report = v.report.toUpperCase();

            if (v.report.toUpperCase() == 'RECIPIENT')
            {
              this.firebaseservice.getUsersByReportsTo(this.uid).subscribe(u => {
              console.log(u);
              this.person_list = u;
            })

              this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
              .takeWhile(() => this.alive)
              .subscribe(v => {
                  this.opportunities = v;
                 this.onChangeofBoth();
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

  onItemChange(user: string){
    this.user = user;
    this.onChangeofBoth();
  }


  onStartDateChange(val){
    console.log("dates",val);
    this.startDate = val;
    this.onChangeofBoth();
  }

  onEndDateChange(val){
    console.log("dates",val);
    this.endDate = val;
    if(this.endDate < this.startDate){
      alert("Start Date is greater than the End Date");
      this.endDate = '';
    }
    this.onChangeofBoth();
  }

  onChangeofBoth(){
     
    if (this.user == 'All'){
      //console.log("pp234oppo", this.user)
      this.oppo_list = this.opportunities 
    } 
    else if (this.user != '' && this.user != undefined) {
      //console.log("pp234oppo", this.user)
      this.oppo_list = this.opportunities.filter (u =>  {
        return (u.opportunity_assignedto == this.user)
      })
    }
    this.oppo_list_dates = this.oppo_list

    if (this.startDate != null || this.endDate != null) {
      if (this.startDate != null && (this.endDate == null || this.endDate == '')){
        this.oppo_list_dates = this.oppo_list.filter( u=> 
          { return (u.edc >= this.startDate)} )
      } else if (this.startDate == null && (this.endDate != null && this.endDate != '')){
        this.oppo_list_dates = this.oppo_list.filter( u=> 
          { return (u.edc <= this.endDate)} )
      } else if (this.startDate != null && (this.endDate != null && this.endDate != '')){
        this.oppo_list_dates = this.oppo_list.filter( u=> 
          { return (u.edc >= this.startDate && u.edc <= this.endDate)} )
      }
    }

    this.sdate = this.startDate;
    this.edate = this.endDate;
    this.userid = this.user; 

    //console.log("pp234oppo", this.oppo_list_dates)

    this.arrayvalue = []
    this.qualifiedleadlist = []
    this.presalsesarrayvalue = []
    this.presalesopportunitylist = []
    this.budgetaryarrayvalue = []
    this.budgetaryopportunitylist = []
    this.bomarrayvalue = []
    this.bomopportunitylist = []
    this.pocarrayvalue = []
    this.pocopportunitylist = []
    this.finalproposalarrayvalue = []
    this.finalproposalopportunitylist = []
    this.finalnegoarrayvalue = []
    this.finalnegoopportunitylist = []
    this.casewonarrayvalue = []
    this.casewonopportunitylist = []
    this.caselostarrayvalue = []
    this.caselostopportunitylist = []

    
    this.oppo_list_dates.forEach(item => {
      // qualified lead 
      if (item.opportunity_state == 'Qualified_lead')
      {
        this.arrayvalue.push(item.value)
        this.qualifiedleadlist.push(item)
        console.log("found qualified lead")
      }
      else 
      {
        console.log("not found qualified lead")
      }
      
      // presales stage 
      if (item.opportunity_state == 'Presales_Presentation')
      {
        this.presalsesarrayvalue.push(item.value)
        this.presalesopportunitylist.push(item)
        console.log("found presales")  
      }
      else
      {
        console.log("not found presales")
      }

      // budgetary price 
      if (item.opportunity_state == 'Budgetary_Price_Shared')
      {

        this.budgetaryarrayvalue.push(item.value)
        this.budgetaryopportunitylist.push(item)
        console.log("entering")
        console.log("found budgetary")
      }
      else
      {
        console.log("not found budgetary")
      }
               
      // finalising bom
      if (item.opportunity_state == 'Finalising_BOM')
      {
        this.bomarrayvalue.push(item.value)
        this.bomopportunitylist.push(item)
        console.log("found finalising bom")
      }
      else
      {
        console.log("not found finalising bom")
      }
      if (item.opportunity_state == 'POC/Demo')
      {
        this.pocarrayvalue.push(item.value)
        this.pocopportunitylist.push(item)
        console.log("found poc")
      }
      else
      {
        console.log("not found poc")
      }
      if (item.opportunity_state == 'Final_Proposal')
      {
        this.finalproposalarrayvalue.push(item.value)
        this.finalproposalopportunitylist .push(item)
        console.log("found final proposal")
      }
      else
      {
        console.log("not found final proposal")
      }
      if (item.opportunity_state == 'Final_Negotiation')
      {
        this.finalnegoarrayvalue.push(item.value)
        this.finalnegoopportunitylist.push(item)
        console.log("found final nego")
      }
      else
      {
        console.log("not found final nego")
      }

      if (item.opportunity_state == 'Case_won')
      {
        this.casewonarrayvalue.push(item.value)
        this.casewonopportunitylist.push(item)
        console.log("found case won")
      }
      else
      {
        console.log("not found case won")
      }
      if (item.opportunity_state == 'Case_lost')
      {
        this.caselostarrayvalue.push(item.value)
        this.caselostopportunitylist.push(item)
        console.log("found case lost")
      }
      else
      {
        console.log("not found case lost")
      }
    })

    //Qualified Leads sum code
    this.arraylist = this.arrayvalue
    this.qualifiedleadsum1 = this.arraylist.reduce((a, b) => a + b, 0)
    this.qualifiedleadsum = this.qualifiedleadsum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // presales sum code
    this.presalesarraylist = this.presalsesarrayvalue
    this.presalesopportunitysum1 = this.presalesarraylist.reduce((a, b) => a + b, 0)
    this.presalesopportunitysum = this.presalesopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // budgetary sum code
    this.budgetaryarraylist = this.budgetaryarrayvalue
    this.budgetaryopportunitysum1 = this.budgetaryarraylist.reduce((a, b) => a + b, 0)
    this.budgetaryopportunitysum = this.budgetaryopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // bom stage opportunities
    this.bomarraylist = this.bomarrayvalue
    this.bomopportunitysum1 = this.bomarraylist.reduce((a, b) => a + b, 0)
    this.bomopportunitysum = this.bomopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // poc stage opportunities
    this.pocarraylist = this.pocarrayvalue
    this.pocopportunitysum1 = this.pocarraylist.reduce((a, b) => a + b, 0)
    this.pocopportunitysum = this.pocopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // poc stage opportunities
    this.finalproposalarraylist = this.finalproposalarrayvalue
    this.finalproposalopportunitysum1 = this.finalproposalarraylist.reduce((a, b) => a + b, 0)
    this.finalproposalopportunitysum = this.finalproposalopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // poc stage opportunities
    this.finalnegoarraylist = this.finalnegoarrayvalue
    this.finalnegoopportunitysum1 = this.finalnegoarraylist.reduce((a, b) => a + b, 0)
    this.finalnegoopportunitysum = this.finalnegoopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // poc stage opportunities
    this.casewonarraylist = this.casewonarrayvalue
    this.casewonopportunitysum1 = this.casewonarraylist.reduce((a, b) => a + b, 0)
    this.casewonopportunitysum = this.casewonopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    // poc stage opportunities
    this.caselostarraylist = this.caselostarrayvalue
    this.caselostopportunitysum1 = this.caselostarraylist.reduce((a, b) => a + b, 0)
    this.caselostopportunitysum = this.caselostopportunitysum1.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    this.totalCount = this.qualifiedleadlist.length + this.presalesarraylist.length + this.budgetaryarraylist.length + this.bomarraylist.length 
    + this.pocarraylist.length + this.finalproposalarraylist.length + this.finalnegoarraylist.length + this.casewonarraylist.length
    + this.caselostarraylist.length;

    var inrstr1 = '₹'
    this.totalValue =  inrstr1.concat(this.qualifiedleadsum1 + this.presalesopportunitysum1 + this.budgetaryopportunitysum1 + this.bomopportunitysum1
      + this.pocopportunitysum1 + this.finalnegoopportunitysum1 + this.finalproposalopportunitysum1+ this.caselostopportunitysum1 + this.casewonopportunitysum1).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");           
  
  }

  getsum(opitems){
    console.log(opitems)
    this.sumlist = []
    for (let opitem of opitems){
      this.sumlist.push(opitem)
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
