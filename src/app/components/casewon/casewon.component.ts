import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { OppoFilterAllTeamService } from "../../services/oppo-filter-all-team.service";

@Component({
  selector: 'app-casewon',
  templateUrl: './casewon.component.html',
  styleUrls: ['./casewon.component.css']
})
export class CasewonComponent implements OnInit, OnDestroy {

  casewon: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  cwlabel: string;
  
  isActivOpen : boolean = false;

  rflag: string;

  userid: string;
  region: string;
  startEDCDate: any;
  endEDCDate: any;

  role: any;
  values: any;
  new_value: any;

  modalOptions: any;
  changeModal_flag: boolean;
  old_value: any = '';
  oppoid: any;
    deleteModal_flag: boolean;
  deloppokey: any; 

  constructor(private firebaseservice : FirebaseService,  private oppoService : OppoFilterAllTeamService,
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {
  	this.casewon = [];
    this.values = '';
    this.role = '';
    this.oppoid = '';
    this.deloppokey = '';

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
    
    //console.log("oppo123",this.rflag, this.region, this.userid, this.startEDCDate, this.endEDCDate);

  	//Case Won list
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
                  .subscribe(cw => {
                    this.casewon = cw;
                    this.casewon = this.casewon.filter(v => {
                    return v.opportunity_state == 'Case_won'
              	  })      
    		        })
              }
              else if(this.rflag == 'team') {
                this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
                  .takeWhile(() => this.alive)
                  .subscribe(cw => {
                  this.casewon = cw;
                  this.casewon = this.casewon.filter(v => {
                  return v.opportunity_state == 'Case_won'
                })
                  console.log("nego",this.casewon) 
                  this.casewon = this.oppoService.onChangeofRegion(this.casewon, this.userid, this.startEDCDate, this.endEDCDate)
                })
              } 
              else if(this.rflag == 'all'){
                this.firebaseservice.getopportunities()
                  .takeWhile(() => this.alive)
                  .subscribe(cw => {
                  this.casewon = cw;
                  this.casewon = this.casewon.filter(v => {
                  return v.opportunity_state == 'Case_won'
                })
                  console.log("nego",this.casewon) 
                  this.casewon = this.oppoService.onChangeofRegionUser(this.casewon, this.region, this.userid, this.startEDCDate, this.endEDCDate) 
                })
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
        this.cwlabel = "INBOUND LANDLINE"
    }

    else if (String(leadsource) == "event"){
      this.cwlabel = "EVENT"
    }
    else if (String(leadsource) == "distributor"){
      this.cwlabel = "DISTRIBUTOR"
    }

    else if (String(leadsource) == "oem")
    {
      this.cwlabel = "OEM"
    }

     else if (String(leadsource) == "outboundcall")
    {
      this.cwlabel = "OUTBOUND CALL"
    }

     else if (String(leadsource) == "onsite")
    {
      this.cwlabel = "ON SITE VISIT"
    }

    return this.cwlabel

  }

  onValueChange(values){
    console.log("values12345", values);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showContentActivOppo(cw) {
    if (!cw.isActivOpen) {
        this.closeallActivOppo();
      }
      cw.isActivOpen = !cw.isActivOpen;
      console.log("cwshow", cw, cw.isActivOpen);
   }

  closeallActivOppo(): void {
    this.casewon.forEach((cw) => {
        cw.isActivOpen = false;
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

  onChangeValue(value){
  console.log("changes",value);
    if (value == ''){

    value = 0;
    }  
    this.firebaseservice.changeValuesOppo(value, this.oppoid).then(success => {
      alert("Value changed successfully");
    })
    
    this.cancelModal();
  }

  deleteOppo(oppodelkey){
    this.deloppokey = oppodelkey;
    this.deleteModal();
  }

  deleteOpportunity(){
    this.firebaseservice.delete_Oppo(this.deloppokey);
    this.cancelModal();
  }

  //START MODALS
  //Add Modal
  changeModals(value, oppokey){
    this.oppoid = oppokey;
    this.old_value = value;
    this.changeModal();
  }

  changeModal(): void {
    this.new_value = '';
    this.changeModal_flag = true;
  }

  deleteModal():void{
    this.deleteModal_flag = true;
  }

  //Cancel Product Modal
  cancelModal(): void {
  this.deleteModal_flag = false;
    this.changeModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.changeModal();   
    this.deleteModal();
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.changeModal();
    this.deleteModal();
  }
//END MODALS

}
