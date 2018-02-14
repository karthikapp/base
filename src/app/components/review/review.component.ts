import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

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

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  	 
  	 this.selected = '';
  	 this.firebaseservice.getopportunities()
              .takeWhile(() => this.alive)
              .subscribe(v => {
              this.opportunities = v;
            })  
  }

  selectRegion(item){
  	 // this.oppo_regionList = this.opportunities
   	//  .map(item => item.region)
    //  .filter((value, index, self) => { return self.indexOf(value) === index })
    console.log("Review1")
  	this.regionList = ['chennai', 'bangalore', 'hyderabad','mumbai', 'coimbatore']
  }



  selectPerson(item){
    console.log("Review2")
  	//console.log("review1",item)
    this.selected = (this.selected === item ? null : item);
    //console.log("review4",this.selected)
    this.oppo_person = this.opportunities.filter(o => {
     	return o.region == this.selected;
     })

     this.oppo_personList = this.oppo_person
     .map(item => item.opportunity_assignedto)
     .filter((value, index, self) => { return self.indexOf(value) === index })

     //console.log("review3", this.oppo_region, this.opportunities, this.selected)
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
