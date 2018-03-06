import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { OppoFilterAllTeamService } from "../../services/oppo-filter-all-team.service";

@Component({
  selector: 'app-budgetaryprice',
  templateUrl: './budgetaryprice.component.html',
  styleUrls: ['./budgetaryprice.component.css']
})
export class BudgetarypriceComponent implements OnInit , OnDestroy{
	bplist: any;
  
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  bplabel: string;
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

  constructor(private firebaseservice : FirebaseService,  private oppoService : OppoFilterAllTeamService,
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {

  	this.bplist = [];
    this.role = '';
    this.createdat = this.firebaseservice.created_at;
    this.stage = '';
    this.deloppokey = '';
        this.old_assignedto = '';
    this.new_assignedto = '';
    this.assignedto = '';
    this.oppoassgnkey = '';

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

    this.stages = '';
    this.oppokey = '';

     this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
    }
    
    //console.log("oppo123",this.rflag, this.region, this.userid, this.startEDCDate, this.endEDCDate);

  	//Budgetary Price list
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
                .subscribe(bp => {
                  this.bplist = bp;
                  this.bplist = this.bplist.filter(v => {
                  return v.opportunity_state == 'Budgetary_Price_Shared'
            	  })     
    		      })
            }
            else if(this.rflag == 'team') {
              this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
                .takeWhile(() => this.alive)
                .subscribe(bp => {
                this.bplist = bp;
                this.bplist = this.bplist.filter(v => {
                  return v.opportunity_state == 'Budgetary_Price_Shared'
                })
                //console.log("nego",this.bplist) 
                this.bplist = this.oppoService.onChangeofRegion(this.bplist, this.userid, this.startEDCDate, this.endEDCDate)
              })
            }
            else if(this.rflag == 'all'){
              this.firebaseservice.getopportunities()
                .takeWhile(() => this.alive)
                .subscribe(bp => {
                this.bplist = bp;
                this.bplist = this.bplist.filter(v => {
                  return v.opportunity_state == 'Budgetary_Price_Shared'
                })
                //console.log("nego",this.bplist)
                this.bplist = this.oppoService.onChangeofRegionUser(this.bplist, this.region, this.userid, this.startEDCDate, this.endEDCDate)  
              })
              this.firebaseservice.getUsers().subscribe(u=> this.assignedto = u);
            }
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
      else {
        //console.log('No access to this page m&m');
        this.route.navigate(['login']);
        return this.ev=false;
      }
    });
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

  returnruppeamount(value)
  {
  	return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

  // lead source label 
  leadsourcelabel(leadsource: String){
    if (String(leadsource) == "inbound-landline"){
      this.bplabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.bplabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.bplabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.bplabel = "OEM"
    }

    else if (String(leadsource) == "outboundcall")
    {
      this.bplabel = "OUTBOUND CALL"
    }

    else if (String(leadsource) == "onsite")
    {
      this.bplabel = "ON SITE VISIT"
    }

    return this.bplabel
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showContentActivOppo(bp) {
    if (!bp.isActivOpen) {
      this.closeallActivOppo();
    }
    bp.isActivOpen = !bp.isActivOpen;
    //console.log("bpshow", bp, bp.isActivOpen);
  }

  closeallActivOppo(): void {
    this.bplist.forEach((bp) => {
      bp.isActivOpen = false;
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
  if(new_assignedto != '' && new_assignedto != this.old_assignedto){
    this.firebaseservice.change_assignedto(new_assignedto, this.oppoassgnkey);
    }
    this.old_assignedto = '';
    this.cancelModal();
  }

   //START MODALS
  //Add Modal
  addModal(): void {
    console.log("MFlag", this.submitModal_flag)
    this.submitModal_flag = true;

  }

  deleteModal():void{
    this.deleteModal_flag = true;
  }

  changeAssignedToModal(): void{
    console.log("krishna", this.old_assignedto)
    this.assignedToModal_flag = true;
  }

  //Cancel Modal
  cancelModal(): void {
    this.submitModal_flag = false;
    this.deleteModal_flag = false;
        this.assignedToModal_flag = false;
    this.stage = '';
    this.stages = '';

  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addModal();
    this.deleteModal();
    this.changeAssignedToModal();
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addModal();
    this.deleteModal();
    this.changeAssignedToModal();
  }
//END MODALS

}
