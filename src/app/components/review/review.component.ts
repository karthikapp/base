import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
// import * as $ from 'jquery';
declare var jQuery: any;


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit,  AfterViewInit,  OnDestroy  {

  regionList: string [];
  selected: any;
  selectedAct : any;
  alive: boolean = true;
  opportunities : any;
  oppo_person: any;
  oppo_personList: any;
  oppo_personActiv: any;
  selectActFlag: any;
  selectFlag: any;
  options: any;
  nodes: any;
  region_wiseopportunity: any;
  executivelist: any;
  exec_wiseopportunity: any;
  followupno: any;
  remarks: any;

  uid: any;
  ev: boolean = false;
  rflag: string;
  created_at: any;

  totalCountExec: any;
  totalValueExec: any;

  totalCountReg: any;
  totalValueReg: any;

  totalCount: any;
  totalValue: any;

  arrayvalue: any;
  arraylist: any;

  execarrayvalue: any;
  execarraylist: any;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {

  	this.remarks =''; 
    this.selected = '';
    this.executivelist = '';
    this.created_at = this.firebaseservice.created_at;
    this.totalCountExec = 0;
    this.totalValueExec = 0;
    this.totalCount = 0;
    this.totalValue = 0;
    this.totalCountReg = 0;
    this.totalValueReg = 0;

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

          if(v.role.toUpperCase() == "MASTER" 
            || v.title.toUpperCase() == "PRE-SALES HEAD"){
            this.firebaseservice.getopportunities().subscribe(v =>{
              this.opportunities = v;
              var regionlistall = []
              this.opportunities.forEach(el => {
                regionlistall.push(el.region)
              })
              this.regionList = this.unique(regionlistall)

              console.log("oppo",this.opportunities)
              
            })
          return this.ev = true;
          }
          else if(v.report.toUpperCase() == 'RECIPIENT'){
            this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
            .subscribe(v => {
            this.opportunities = v;
            console.log("oppo",this.opportunities)
            var regionlistall = []
            this.opportunities.forEach(el => {
              regionlistall.push(el.region)
            })
            this.regionList = this.unique(regionlistall)
            
          })
          return this.ev = true;
        }
        else
        {
          console.log('No access to this page choco');
          alert('No access to this page');
          return this.ev=false
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

  unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(!u.hasOwnProperty(arr[i])) {
        a.push(arr[i]);
        u[arr[i]] = 1;
      }
    }
    console.log("uniq",a);
    console.log("uni",arr);
    return a;
  }

  submit_remarks(remarks: string, oppoid: any){
    console.log("remarks",remarks, oppoid)

    if(remarks != '')
    {
      console.log("hello");
      let remarksObject ={
        remarks_id : '',
        remarksdtl : remarks,
        created_by: this.uid,
        created_at: this.created_at
      }
      this.firebaseservice.addRemarks(remarksObject, oppoid);

      this.remarks = '';
    }
  }

  ngAfterViewInit() 
  {
    jQuery('.ui.accordion').accordion();
  }

  selectRegion(item)
  {
    console.log("reg",item)
    this.region_wiseopportunity = []
    var execlistall = []

    for (var i = 0; i < this.opportunities.length; i++) 
    {
      if (this.opportunities[i].region == item)
      {
        this.region_wiseopportunity.push(this.opportunities[i])
        execlistall.push(this.opportunities[i].opportunity_assignedto)
      }
    }
    this.executivelist = this.unique(execlistall)

    this.totalCountValueReg(this.region_wiseopportunity);

  }

  getnooffollowups(leadactivities) {
    if (leadactivities == undefined){
      this.followupno = "None"
      return this.followupno
    }
    else {
      this.followupno = Object.keys(leadactivities).length
      // console.log(this.followupno)
      return  this.followupno
    }
  }

  getstatus(item)
  {
    if(item == 'Qualified_lead')
    {
      return "Qualified Lead"
    }
    else if (item == 'POC')
    {
          return " POC "
    }
    else if (item == 'Presales_Presentation')
    {
          return " Presales Presentation "
    }
    else if (item == 'Budgetary_Price_Shared')
    {
          return " Budgetary Price Shared "
    }
      else if (item == 'POC/Demo')
    {
          return " POC/Demo "
    }
      else if (item == 'Final_Proposal')
    {
          return " Final Proposal "
    }

       else if (item == 'Final_Negotiation')
    {
          return " Final Negotiation "
    }
        else if (item == 'Finalising_BOM')
    {
          return " Finalising BOM"
    }
         else if (item == 'Case_won')
    {
          return " Case Won "
    }
          else if (item == 'Case_lost')
    {
          return " Case Lost "
    }
  }

  selectedexec(exec, item){
    console.log("exec",exec,item)
    this.exec_wiseopportunity = []
    console.log(item)
    // var opportunitylistall = []
 
    for (var i = 0; i < this.opportunities.length; i++) 
    {
      if (this.opportunities[i].opportunity_assignedto == exec && this.opportunities[i].region == item 
        && this.opportunities[i].opportunity_state != 'Case_lost' && this.opportunities[i].opportunity_state != 'Case_won')
      {
        this.exec_wiseopportunity.push(this.opportunities[i])
        //execlistall.push(this.opportunities[i].opportunity_assignedto)
      }
    }
    //this.executivelist = this.unique(execlistall)
    console.log("exec",this.exec_wiseopportunity)

    this.totalCountValue(this.exec_wiseopportunity);
    
  }

  totalCountValueReg(arr){
    this.arraylist = [];
    this.arrayvalue = [];

    this.totalCountReg = Object.keys(arr).length;

    arr.forEach(element => {
      this.arrayvalue.push(element.value);
      this.arraylist.push(element);
    })
                  
    this.arraylist = this.arrayvalue
    this.totalValueReg = this.arraylist.reduce((a, b) => a + b, 0);
    if(this.totalValueReg == undefined || isNaN(this.totalValueReg)) {
      this.totalValueReg = 0;
    }

    this.totalValueReg = parseFloat(this.totalValueReg);

    console.log("reg",this.executivelist, this.totalValueReg)
  }

  totalCountValue(arr){
    this.execarraylist = [];
    this.execarrayvalue = [];

    this.totalCountExec = Object.keys(arr).length;
    
    arr.forEach(element => {
      this.execarrayvalue.push(element.value);
      this.execarraylist.push(element);
    })
                  
    this.execarraylist = this.execarrayvalue
    this.totalValueExec = this.execarraylist.reduce((a, b) => a + b, 0);
    if(this.totalValueExec == undefined || isNaN(this.totalValueExec)) {
      this.totalValueExec = 0;
    }

    this.totalValueExec = parseFloat(this.totalValueExec);

    console.log("TVE",this.totalValueExec, this.exec_wiseopportunity);

  }

  ngOnDestroy() {
    this.alive = false;
  }

  // isActivePerson(item){
  //   console.log("Review22")
  // 	//console.log("review2",item, this.selected === item)	
  //    this.selectFlag = this.selected === item;
  //   return this.selectFlag
  // }

  // selectActivities(item, oppo_person){
  //   console.log("Review3")
  // 	console.log("review6", item, oppo_person)
  // 	this.selectedAct = (this.selectedAct === item ? null : item);

  // 	this.oppo_personActiv = oppo_person
  // 	.filter(o => {return o.opportunity_assignedto == this.selectedAct})

  // 	console.log("review8", this.oppo_personActiv);
  // }

  // isActiveActivities(item){
  //   console.log("Review33")
  // 	console.log("review2", item,this.selectedAct, this.selectedAct === item )
  // 	this.selectActFlag = this.selectedAct === item;
  // 	//console.log("review9", this.selectActFlag)
  // 	return this.selectActFlag;
  // }

  // isActive(item, v){
  //   console.log("review10", item, v)
  //   this.selectFlag = this.selected === item;
  //   if(v!=''){
  //     //this.isActiveActivities(v);
  //     console.log("review11", v, item,this.selectedAct,this.selectedAct === v )
  //     this.selectFlag = this.selectedAct === v;
  //   }
  //   //this.selectActFlag = this.selectActFlag === v; 
  //   console.log("r11", this.selectFlag);
  //   return this.selectFlag
  // }

  // select(item, v){
  //   console.log("review15", item, v);
  //   this.selected = (this.selected === item ? null : item);

  //   this.oppo_person = this.opportunities.filter(o => {
  //      return o.region == this.selected;
  //    })

  //    this.oppo_personList = this.oppo_person
  //    .map(item => item.opportunity_assignedto)
  //    .filter((value, index, self) => { return self.indexOf(value) === index })


  //   if(v!=''){
  //     console.log("review14",v, this.oppo_person);
  //     this.selectActivities(v, this.oppo_person);
  //   }
  // }

}
