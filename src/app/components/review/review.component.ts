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
export class ReviewComponent implements OnInit {

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

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  	 
  	 this.selected = '';
  	 this.firebaseservice.getopportunities().subscribe(v =>{
       this.opportunities = v;
       console.log(this.opportunities)
       var regionlistall = []
       v.forEach(el => {
         regionlistall.push(el.region)
       })
       this.regionList = this.unique(regionlistall)
     })


    
  }


  public unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}




   ngAfterViewInit() 
   {
    jQuery('.ui.accordion').accordion();
   }



  selectRegion(item)
  {

   // console.log(item)
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
   // console.log(this.executivelist)
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
      // console.log(item)
   this.exec_wiseopportunity = []
   console.log(item)
   // var opportunitylistall = []
 
   for (var i = 0; i < this.opportunities.length; i++) 
   {
     if (this.opportunities[i].opportunity_assignedto == exec && this.opportunities[i].region == item && this.opportunities[i].opportunity_state != 'Case_lost' && this.opportunities[i].opportunity_state != 'Case_won')
     {
       this.exec_wiseopportunity.push(this.opportunities[i])
       // execlistall.push(this.opportunities[i].opportunity_assignedto)
     }
   }
   // this.executivelist = this.unique(execlistall)
  
     console.log(this.exec_wiseopportunity)
  }

  isActivePerson(item){
    console.log("Review22")
  	//console.log("review2",item, this.selected === item)	
     this.selectFlag = this.selected === item;
    return this.selectFlag
  }

  selectActivities(item, oppo_person){
    console.log("Review3")
  	console.log("review6", item, oppo_person)
  	this.selectedAct = (this.selectedAct === item ? null : item);

  	this.oppo_personActiv = oppo_person
  	.filter(o => {return o.opportunity_assignedto == this.selectedAct})

  	console.log("review8", this.oppo_personActiv);
  }

  isActiveActivities(item){
    console.log("Review33")
  	console.log("review2", item,this.selectedAct, this.selectedAct === item )
  	this.selectActFlag = this.selectedAct === item;
  	//console.log("review9", this.selectActFlag)
  	return this.selectActFlag;
  }

  isActive(item, v){
    console.log("review10", item, v)
    this.selectFlag = this.selected === item;
    if(v!=''){
      //this.isActiveActivities(v);
      console.log("review11", v, item,this.selectedAct,this.selectedAct === v )
      this.selectFlag = this.selectedAct === v;
    }
    //this.selectActFlag = this.selectActFlag === v; 
    console.log("r11", this.selectFlag);
    return this.selectFlag
  }

  select(item, v){
    console.log("review15", item, v);
    this.selected = (this.selected === item ? null : item);

    this.oppo_person = this.opportunities.filter(o => {
       return o.region == this.selected;
     })

     this.oppo_personList = this.oppo_person
     .map(item => item.opportunity_assignedto)
     .filter((value, index, self) => { return self.indexOf(value) === index })


    if(v!=''){
      console.log("review14",v, this.oppo_person);
      this.selectActivities(v, this.oppo_person);
    }
  }

}
