import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { OppoFilterAllTeamService } from "../../services/oppo-filter-all-team.service";

@Component({
  selector: 'app-viewqualifiedleads',
  templateUrl: './viewqualifiedleads.component.html',
  styleUrls: ['./viewqualifiedleads.component.css']
})
export class ViewqualifiedleadsComponent implements OnInit, OnDestroy {

	qleads: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  leadlabel: string;
  followupno: any;

  leadid: string;
  
  isActivOpen : boolean = false;

  rflag: string;

  userid: string;
  region: string;
  startEDCDate: any;
  endEDCDate: any;

  role:any;

  createdat: any;
  submitModal_flag: boolean;
  modalOptions: any;
  stages: any;
  oppokey: any;
  stage: any;
  deleteModal_flag: boolean;
  deloppokey: any; 

  old_assignedto: any;
  new_assignedto: any;
  oppoassgnkey: any;
  assignedToModal_flag: boolean;
  assignedto : any;

/*  assignedToPreModal_flag: boolean;
  oppoassgnprekey: any;
  old_assignedpreto: any;
  new_assignedpreto: any;*/

  constructor(private firebaseservice : FirebaseService,  private oppoService : OppoFilterAllTeamService,
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {
    this.role = '';
    this.deloppokey = '';
    this.stage = '';
  	this.qleads = [];
    this.createdat = this.firebaseservice.created_at;
    this.stages = '';
    this.oppokey = '';
    this.old_assignedto = '';
    this.new_assignedto = '';
    this.assignedto = '';
    this.oppoassgnkey = '';
    /*this.oppoassgnprekey = '';
    this.old_assignedpreto = '';
    this.new_assignedpreto = '';*/

     this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
    }

    this.rflag = this.router.snapshot.params['rflag'];
    this.region = this.router.snapshot.params['regions'];
    this.userid = this.router.snapshot.params['userid'];
    this.startEDCDate = this.router.snapshot.params['sdate'];
    this.endEDCDate = this.router.snapshot.params['edate'];

    if(this.startEDCDate == '1900-01-01')
    {
      this.startEDCDate = null;
    }

    if(this.endEDCDate == '1900-01-01'){
      this.endEDCDate = null
    }
    console.log("oppo123",this.rflag, this.region, this.userid, this.startEDCDate, this.endEDCDate);

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

            if (v.title == undefined)
            {
              v.title = '';
            }

            this.role = v.role.toUpperCase();

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.role.toUpperCase() == "MASTER" 
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "ADMIN")
            {
              if(this.rflag == 'me'){  
                this.firebaseservice.getOpportunitiesByID(this.uid)
                    .takeWhile(() => this.alive)
                    .subscribe(qlead => {
                    this.qleads = qlead;
                    this.qleads = this.qleads.filter(v => {
                    return v.opportunity_state == 'Qualified_lead'
                	})    
      		      })
              }
              else if(this.rflag == 'team') {
                this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
                    .takeWhile(() => this.alive)
                    .subscribe(qlead => {
                    this.qleads = qlead;
                    this.qleads = this.qleads.filter(v => {
                    return v.opportunity_state == 'Qualified_lead'
                  })
                  console.log("nego",this.qleads) 
                  this.qleads = this.oppoService.onChangeofRegion(this.qleads, this.userid, this.startEDCDate, this.endEDCDate)
                })
              }
              else if(this.rflag == 'all'){
                this.firebaseservice.getopportunities()
                  .takeWhile(() => this.alive)
                  .subscribe(qlead => {
                  this.qleads = qlead;
                  this.qleads = this.qleads.filter(v => {
                  return v.opportunity_state == 'Qualified_lead'
                })
                console.log("nego",this.qleads) 
                this.qleads = this.oppoService.onChangeofRegionUser(this.qleads, this.region, this.userid, this.startEDCDate, this.endEDCDate) 
              })
             this.firebaseservice.getUsers().subscribe(u=> this.assignedto = u);
            }
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
      else
      {
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

   onMoveTo(stage, oppokey){

  //console.log("dropdown",stage,oppokey)
    if(stage != ''){
      this.addModal();

      this.stages = stage;
      this.oppokey = oppokey;
    }
    //  this.submitModal_flag = true;
    
    /*let opportunity_state = stage;
    let movetolist = {
      moved_time: this.createdat,
      moved_to_stage: stage,
      moved_by: this.uid
    }

    this.firebaseservice.updateOppoMoveTo(opportunity_state, movetolist, oppokey)
    .then(success => alert ("Stage moved successfully to " + stage));*/
  }

  submit_stages(){
   //console.log("submit1",stage,oppokey) 
    let movetolist = {
      moved_time: this.createdat,
      moved_to_stage: this.stages,
      moved_by: this.uid
    }

    this.firebaseservice.updateOppoMoveTo(this.stages, movetolist, this.oppokey)
    .then(success => alert ("Stage moved successfully"));
    this.cancelModal();
  }

  showContentActivOppo(lead) {
    if (!lead.isActivOpen) {
        this.closeallActivOppo();
      }
    lead.isActivOpen = !lead.isActivOpen;
    //console.log("leadshow", lead, lead.isActivOpen);
  }

  closeallActivOppo(): void {
    this.qleads.forEach((lead) => {
        lead.isActivOpen = false;
    });
  }

  getactivitytypetext(activitytype){
    if (activitytype == 'phonecall')
    {
      return "Phone Call"
    }
    else if (activitytype == 'onsitevisit') {
      return "On Site Visit"
    }
    else if (activitytype == 'presentation')
    {
      return "Presentation"
    }
    else if (activitytype == 'solutiondocumenting')
    {
      return "Solution Documenting"
    }
    else if (activitytype == 'poc')
    {
      return "POC"
    }
    else if (activitytype == 'demo')
    {
      return "Demo"
    }
  }

  returnopportunitystate(text)
  {
    if(text == 'Qualified_lead')
    {
      return 'Qualified Lead'
    }
    else if (text == 'Presales_Presentation')
    {
      return 'Presales Presentation'
    }
    else if (text == 'Budgetary_Price_Shared')
    {
      return 'Budgetary Price Shared'
    }
    else if (text == 'Finalising_BOM')
    {
      return 'Finalising BOM'
    }
    else if (text == 'POC/Demo')
    {
      return 'POC / Demo'
    }
    else if (text == 'Final_Proposal')
    {
      return 'Final Proposal'
    }
    else if (text == 'Final_Negotiation')
    {
      return 'Final Negotiation'
    }
    else if (text == 'Case_won')
    {
      return 'Case Won'
    }
    else if (text == 'Case_lost')
    {
      return 'Case Lost'
    }

  }

  getupcomingtext(value)
  {
    if (value == 'phone_call') 
    {
      return "Phone Call"
    }

    else if (value == 'online_meeting')
    {
      return "Online Meeting"
    }

    else if (value == 'on_site_visit')
    {
      return "On Site Visit"
    }
  }

  deleteOppo(oppodelkey){
    this.deloppokey = oppodelkey;
    this.deleteModal();
  }

  deleteOpportunity(){
    this.firebaseservice.delete_Oppo(this.deloppokey);
    this.cancelModal();
  }

  changeAssignedTo(oppoassignedto, oppoassgnkey){
    this.old_assignedto = oppoassignedto; 
    this.oppoassgnkey = oppoassgnkey;
    this.new_assignedto = '';
    console.log("oldassgn", this.old_assignedto, oppoassignedto, oppoassgnkey)
    this.changeAssignedToModal();
  }

  chngAssignedToName(new_assignedto){
    console.log("assgnedto", new_assignedto)
    if(new_assignedto != '' && (new_assignedto != this.old_assignedto)){
      this.firebaseservice.change_assignedto(new_assignedto, this.oppoassgnkey).then(success => {
      alert("Changed Successfully");
      });
    }
    this.old_assignedto = '';
    this.cancelModal();
  }

  /*changeAssignedPreTo(oppoassignedto , oppoassgnkey){
    this.old_assignedpreto = oppoassignedto; 
    this.oppoassgnprekey = oppoassgnkey;
    this.new_assignedpreto = '';
    this.changeAssignedPreToModal();
  }

  chngAssignedPreToName(new_assignedpreto){
  console.log("assgnedto", new_assignedpreto)
  if(new_assignedpreto != '' && this.old_assignedpreto != new_assignedpreto){
  this.firebaseservice.change_assignedpreto(new_assignedpreto, this.oppoassgnprekey);
  }
  this.cancelModal();
  }*/

  //START MODALS
  //Add Modal
  addModal(): void {
   // console.log("MFlag", this.submitModal_flag)
    this.submitModal_flag = true;

  }

  deleteModal():void{
    this.deleteModal_flag = true;
  }

  changeAssignedToModal(): void{
  //console.log("krishna", this.old_assignedto)
    this.assignedToModal_flag = true;
  }

/*changeAssignedPreToModal(): void{
    this.assignedToPreModal_flag = true;
  }*/
  //Cancel Modal
  cancelModal(): void {
    this.submitModal_flag = false;
    this.deleteModal_flag = false;
   this.assignedToModal_flag = false;
  /*  this.assignedToPreModal_flag = false;*/
    this.stage = '';
    this.stages = '';

  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addModal();
    this.deleteModal();
    this.changeAssignedToModal();
/*    this.changeAssignedPreToModal();*/
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addModal();
    this.deleteModal();
   this.changeAssignedToModal();
 /*   this.changeAssignedPreToModal();*/
  }
//END MODALS


}
