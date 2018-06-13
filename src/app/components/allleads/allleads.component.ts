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
  region: any;
  lead_source: any;
  lead_assigned_to: any;

  leads_list: any;
  filteredData: any;
  filteredSourceData: any;
  totalCount: any;
  totalValue: any;
  leadsarrayvalue: any;
  leadsarraylist: any;
  leadsum: any;


  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {  	
  	this.leads = ''; 
    this.region = 'All';
    this.lead_source = 'All';
    this.lead_assigned_to = 'All';
    this.totalCount = '';
    this.totalValue = '';
    this.leadsum = '';

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

          if (v.role.toUpperCase() == "MASTER" || v.title.toUpperCase() == "PRE-SALES HEAD" || v.role.toUpperCase() == "ADMIN")
          {
            this.firebaseservice.getAllLeads()
            .takeWhile(() => this.alive)
            .subscribe(lead => {
              this.leads = lead;
              this.leads = this.leads.filter(v => {
                return v.leadstatus != 'Qualified'})
              this.leadList('All', 'All');
              this.leadSourceList('All', 'All');
              this.onChangeof();
              //console.log(this.leads);
            }) 
            return this.ev = true;
          } 
          else
          {
            //console.log('No access to this page choco');
            alert('No access to this page');
            return this.ev=false;
          }
        })
      }
      else{
        //console.log('No access to this page m&m');
        this.router.navigate(['login']);
        return this.ev=false;
      }
    });
  }

  //Region Dropdown List
  onRegionChange(region: string){
    this.region = region;
    this.leadList(this.region, this.lead_source);
    this.leadSourceList(this.region, this.lead_assigned_to);
    //console.log("region", region);

    this.onChangeof();
  }

  onLeadAssignedChange(leadassigned: string){
    this.lead_assigned_to = leadassigned;
    this.leadSourceList(this.region, this.lead_assigned_to);
    this.onChangeof();
  }

  leadList(region: string, leadsource: string){
    if (region == 'All' && leadsource == 'All') {
      this.filteredData = this.leads
      .map(item => item.assigned_to)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.opportunities)
    } else if (region != 'All' && leadsource == 'All'){
    
      this.leads_list = this.leads.filter(i => { return i.region == region})

      this.filteredData = this.leads_list
      .map(item => item.assigned_to)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    } else if (region == 'All' && leadsource != 'All'){
    
      this.leads_list = this.leads.filter(i => { return i.leadsource == leadsource})

      this.filteredData = this.leads_list
      .map(item => item.assigned_to)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    }else if (region != 'All' && leadsource != 'All'){
    
      this.leads_list = this.leads.filter(i => { return i.region == region 
        && i.leadsource == leadsource})

      this.filteredData = this.leads_list
      .map(item => item.assigned_to)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    }
  }

  leadSourceList(region: string, leadassignedto:string){
    if (region == 'All' && leadassignedto == 'All') {
      this.filteredSourceData = this.leads
      .map(item => item.leadsource)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.opportunities)
    } else if (region != 'All' && leadassignedto == 'All'){
    
      this.leads_list = this.leads.filter(i => { return i.region == region})

      this.filteredSourceData = this.leads_list
      .map(item => item.leadsource)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    }
    else if (leadassignedto != 'All' && region == 'All'){
    
      this.leads_list = this.leads.filter(i => { return i.assigned_to == leadassignedto})

      this.filteredSourceData = this.leads_list
      .map(item => item.leadsource)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    }
    else if (leadassignedto != 'All' && region != 'All' ){
    
      this.leads_list = this.leads.filter(i => { 
        return i.assigned_to == leadassignedto && i.region == region})

      this.filteredSourceData = this.leads_list
      .map(item => item.leadsource)
      .filter((value, index, self) => { return self.indexOf(value) === index })

      //console.log("pp234oppo", this.filteredData, this.oppo_list)
    }
  }

  onLeadSourceChange(leadsource: string){
    this.lead_source = leadsource;

    this.onChangeof();
  }

  onChangeof(){

    this.leadsarraylist = [];
    this.leadsarrayvalue = [];

    if (this.region == 'All' && this.lead_assigned_to == 'All' 
      && this.lead_source == 'All'){
      this.leads_list = this.leads
    }
    else if(this.region != 'All' && this.lead_assigned_to == 'All' 
      && this.lead_source == 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.region == this.region
      })
    }
    else if(this.region != 'All' && this.lead_assigned_to != 'All' 
      && this.lead_source == 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.region == this.region
        && o.assigned_to == this.lead_assigned_to
      })
    }
    else if(this.region != 'All' && this.lead_assigned_to != 'All' 
      && this.lead_source != 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.region == this.region
        && o.assigned_to == this.lead_assigned_to
        && o.leadsource == this.lead_source
      })
    }
    else if(this.region == 'All' && this.lead_assigned_to != 'All' 
      && this.lead_source == 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.assigned_to == this.lead_assigned_to
      })
    }
    else if(this.region == 'All' && this.lead_assigned_to != 'All' 
      && this.lead_source != 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.assigned_to == this.lead_assigned_to
        && o.leadsource == this.lead_source
      })
    }
    else if(this.region == 'All' && this.lead_assigned_to == 'All' 
      && this.lead_source != 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.leadsource == this.lead_source
      })
    }
    else if(this.region != 'All' && this.lead_assigned_to == 'All' 
      && this.lead_source != 'All'){
      this.leads_list = this.leads.filter(o => {
        return o.region == this.region
        && o.leadsource == this.lead_source
      })
    }

    //console.log("leadslist",this.leads_list);
    this.totalCount = Object.keys(this.leads_list).length;

    this.leads_list.forEach(element => {
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
    //console.log("TV",this.totalValue, this.leadsum, this.leadsarrayvalue, this.leadsarraylist)

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
     else if (state == "prequal")
    {
      return "Pre - Qualification"
    }
   }

  ngOnDestroy() {
    this.alive = false;
  }

}
