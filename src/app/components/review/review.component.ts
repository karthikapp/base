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

  regionList: any;
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
  execreview_wiseopportunity: any;
  followupno: any;
  reviews: any;
  next_review_date: any;
  ratings: any;

  reviewComplete: any;
  liveReview: any;
  lapsedReview: any;
  unReview: any;

  reviewCompleteValue: any;
  liveReviewValue: any;
  lapsedReviewValue: any;
  unReviewValue: any;

  reviewCompleteValue1: any;
  liveReviewValue1: any;
  lapsedReviewValue1: any;
  unReviewValue1: any;

  reviewCompleteList: any;
  oppoValues: any;

  reviewCompleteR: any;
  liveReviewR: any;
  lapsedReviewR: any;
  unReviewR: any;

  reviewCompleteRV: any;
  liveReviewRV: any;
  lapsedReviewRV: any;
  unReviewRV: any;

  reviewCompleteRV1: any;
  liveReviewRV1: any;
  lapsedReviewRV1: any;
  unReviewRV1: any;

  reviewCompleteRList: any;
  oppoRValues: any;
  oppoRegValues: any;
  oppoRegionList: any;

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

  regarrayvalue:any;
  regarraylist: any;
  nxt_rvw_date: any;
  todays_date: any;

  nxt_rvw_reg_date: any;
  regList: any;
  

  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {

  	this.reviews =''; 
    this.selected = '';
    this.executivelist = '';
    this.created_at = this.firebaseservice.created_at;
    this.totalCountExec = 0;
    this.totalValueExec = 0;
    this.totalCount = 0;
    this.totalValue = 0;
    this.totalCountReg = 0;
    this.totalValueReg = 0;
    this.next_review_date = null;
    this.ratings = null;
    this.nxt_rvw_reg_date = null;
    this.nxt_rvw_date = null;
    this.todays_date = new Date();
    

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
              this.totalCountValueAll(this.opportunities);
              this.showReview(this.opportunities);
              
              var regionlistall = [];
              this.opportunities.forEach(el => {
                regionlistall.push(el.region)
              })
              this.regionList = this.unique(regionlistall);
              this.showtotalCountReview(this.regionList, this.opportunities);

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
            this.regionList = this.unique(regionlistall);
            this.totalCountValueAll(this.opportunities); 
            this.showReview(this.opportunities);


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



  showReview(oppo){
    this.unReview = 0;
    this.liveReview = 0;
    this.reviewComplete = 0;
    this.lapsedReview = 0;
    this.reviewCompleteList =[];
    this.unReviewValue = 0;
    this.liveReviewValue = 0;
    this.reviewCompleteValue = 0;
    this.lapsedReviewValue = 0;
    this.oppoValues = [];

    this.unReviewValue1 = '';
    this.liveReviewValue1 = '';
    this.reviewCompleteValue1 = '';
    this.lapsedReviewValue1 = '';

    this.oppoValues = Object.values(oppo);
    console.log("opporeview", this.oppoValues, oppo)


    for(let i= 0; i< Object.keys(oppo).length; i++)
    {
      console.log("opporeview", this.oppoValues[i].reviews, i)
      if(this.oppoValues[i].reviews == undefined )
      {
        this.unReview = this.unReview + 1;
        this.unReviewValue = this.unReviewValue + this.oppoValues[i].value;
        this.unReviewValue1 = this.unReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      }
      else if(this.oppoValues[i].reviews != undefined)
      { 
        //console.log("oppo678",this.oppoValues[i].reviews,this.oppoValues[i].$key, i )

        this.firebaseservice.viewReview(this.oppoValues[i].$key)
        .subscribe(u => 
        {
          //console.log("oppo678",this.oppoValues[i].reviews,this.oppoValues[i].$key, i )
          this.reviewCompleteList = u;
          //this.reviewComplete = Object.values(this.reviewCompleteList);
          console.log("oppo123", this.reviewCompleteList);

          this.reviewCompleteList = this.reviewCompleteList.slice().reverse();

          //console.log("oppo1234",new Date(this.reviewCompleteList[0].next_review_date), Date())

          if(this.reviewCompleteList[0].next_review_date != undefined)
          {
            this.nxt_rvw_date = new Date(this.reviewCompleteList[0].next_review_date)
          }
          else
          {
            this.nxt_rvw_date = this.reviewCompleteList[0].next_review_date
          }

          console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          if (this.nxt_rvw_date > this.todays_date)
          {
            this.lapsedReview = this.lapsedReview + 1;
            this.lapsedReviewValue = this.lapsedReviewValue + this.oppoValues[i].value;
            this.lapsedReviewValue1 = this.lapsedReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if (this.nxt_rvw_date <= this.todays_date)
          {
            this.liveReview = this.liveReview + 1;
            this.liveReviewValue = this.liveReviewValue + this.oppoValues[i].value;
            this.liveReviewValue1 = this.liveReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if(this.nxt_rvw_date == undefined )
          {
            this.reviewComplete = this.reviewComplete + 1;
            this.reviewCompleteValue = this.reviewCompleteValue + this.oppoValues[i].value;
            this.reviewCompleteValue1 = this.reviewCompleteValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
        })
      }
    }
  }

  // showRegReview(oppo){
  //   this.unReviewReg = 0;
  //   this.liveReviewReg = 0;
  //   this.reviewCompleteReg = 0;
  //   this.lapsedReviewReg = 0;
  //   this.reviewCompleteRegList =[];
  //   this.unReviewRegValue = 0;
  //   this.liveReviewRegValue = 0;
  //   this.reviewCompleteRegValue = 0;
  //   this.lapsedReviewRegValue = 0;

  //   this.unReviewRegValue1 = '';
  //   this.liveReviewRegValue1 = '';
  //   this.reviewCompleteRegValue1 = '';
  //   this.lapsedReviewRegValue1 = '';

  //   this.oppoRegValues = Object.values(oppo);
  //   console.log("opporeview", this.oppoRegValues)


  //   for(let i= 0; i< Object.keys(oppo).length; i++)
  //   {
  //     console.log("opporeview", this.oppoRegValues[i].reviews)
  //     if(this.oppoRegValues[i].reviews == undefined )
  //     {
  //       this.unReviewReg = this.unReviewReg + 1;
  //       this.unReviewRegValue = this.unReviewRegValue + this.oppoRegValues[i].value;
  //       this.unReviewRegValue1 = this.unReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //     }
  //     else if(this.oppoRegValues[i].reviews != undefined)
  //     { 
  //       this.firebaseservice.viewReview(this.oppoRegValues[i].$key)
  //       .subscribe(u => {this.reviewCompleteRegList = u;
  //         //this.reviewComplete = Object.values(this.reviewCompleteList);
  //         console.log("oppo123", this.reviewCompleteRegList);

  //         this.reviewCompleteRegList = this.reviewCompleteRegList.slice().reverse();

  //         //console.log("oppo1234",new Date(this.reviewCompleteList[0].next_review_date), Date())

  //         if(this.reviewCompleteRegList[0].next_review_date != undefined){
  //           this.nxt_rvw_reg_date = new Date(this.reviewCompleteRegList[0].next_review_date)
  //         }
  //         else{
  //           this.nxt_rvw_reg_date = this.reviewCompleteRegList[0].next_review_date
  //         }

  //         this.todays_date = new Date();

  //         console.log("oppo1234",this.nxt_rvw_reg_date, this.nxt_rvw_reg_date > this.todays_date,this.nxt_rvw_reg_date <= this.todays_date );
  //         if (this.nxt_rvw_reg_date > this.todays_date){
  //           this.lapsedReviewReg = this.lapsedReviewReg + 1;
  //           this.lapsedReviewRegValue = this.lapsedReviewRegValue + this.oppoRegValues[i].value;
  //           this.lapsedReviewRegValue1 = this.lapsedReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //         }
  //         else if (this.nxt_rvw_reg_date <= this.todays_date){
  //           this.liveReviewReg = this.liveReviewReg + 1;
  //           this.liveReviewRegValue = this.liveReviewRegValue + this.oppoRegValues[i].value;
  //           this.liveReviewRegValue1 = this.liveReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //         }
  //         else if(this.nxt_rvw_reg_date == undefined ){
  //           this.reviewCompleteReg = this.reviewCompleteReg + 1;
  //           this.reviewCompleteRegValue = this.reviewCompleteRegValue + this.oppoRegValues[i].value;
  //           this.reviewCompleteRegValue1 = this.reviewCompleteRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //         }
  //       })
  //     }
  //   }
  // }


  unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(!u.hasOwnProperty(arr[i])) {
        a.push(arr[i]);
        u[arr[i]] = 1;
      }
    }
    return a;
  }

  submit_reviews(reviews: string, oppoid: any){
    console.log("reviews",reviews, oppoid)
      console.log("hello");
      let reviewsObject ={
        reviews_id : '',
        reviewsdtl : reviews,
        next_review_date: this.next_review_date,
        ratings: this.ratings,
        created_by: this.uid,
        created_at: this.created_at
      }
      this.firebaseservice.addReviews(reviewsObject, oppoid);

      this.reviews = '';
  }

  ngAfterViewInit() 
  {
    jQuery('.ui.rating').rating();
    jQuery('.ui.accordion').accordion();

    //jQuery('.ui.rating').rating();
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

    // this.totalCountValueReg(this.region_wiseopportunity);
    // this.showRegReview(this.region_wiseopportunity);

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

  selectedexecReview( oppoid){
    //console.log("exec", source_leadid)
    this.execreview_wiseopportunity = []
   
    var reviews = [];

    this.firebaseservice.viewReview(oppoid)
    .subscribe(p => this.execreview_wiseopportunity = p)
  }

  totalCountValueAll(arr){
    this.arraylist = [];
    this.arrayvalue = [];

    this.totalCount = Object.keys(arr).length;

    arr.forEach(element => {
      this.arrayvalue.push(element.value);
      this.arraylist.push(element);
    })
                  
    this.arraylist = this.arrayvalue
    this.totalValue = this.arraylist.reduce((a, b) => a + b, 0);
    if(this.totalValue == undefined || isNaN(this.totalValue)) {
      this.totalValue = 0;
    }

    this.totalValue = this.totalValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    console.log("total",arr, this.totalValue)
  }

  showtotalCountReview(regionList, oppo){
    this.oppoRegionList = [];
    this.regList = [];

    for(let i=0; i< Object.keys(regionList).length; i++){
      this.oppoRegionList = oppo.filter(u=> 
        {return u.region == regionList[i]})
      this.totalCountValueReg(this.oppoRegionList,regionList[i]);
      //this.showRegReview(this.oppoRegionList);
    }
  }

  totalCountValueReg(arr, region){
    console.log("oppo123456", arr, region)
    this.regarraylist = [];
    this.regarrayvalue = [];
    this.oppoRValues = [];
    this.oppoRegValues =[];
    
    this.unReviewR = 0;
    this.liveReviewR = 0;
    this.reviewCompleteR = 0;
    this.lapsedReviewR = 0;
    this.reviewCompleteRList =[];
    this.unReviewRV = 0;
    this.liveReviewRV = 0;
    this.reviewCompleteRV = 0;
    this.lapsedReviewRV = 0;

    this.unReviewRV1 = '';
    this.liveReviewRV1 = '';
    this.reviewCompleteRV1 = '';
    this.lapsedReviewRV1 = '';
    
    console.log("oppo12345", this.oppoRegionList);

    this.totalCountReg = Object.keys(arr).length;

    arr.forEach(element => {
      this.regarrayvalue.push(element.value);
      this.regarraylist.push(element);
    })
                  
    this.regarraylist = this.regarrayvalue
    this.totalValueReg = this.regarraylist.reduce((a, b) => a + b, 0);
    if(this.totalValueReg == undefined || isNaN(this.totalValueReg)) {
      this.totalValueReg = 0;
    }

    this.totalValueReg = this.totalValueReg.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    //this.showReview(arr);

    this.oppoRValues = Object.values(arr);
    console.log("opporeview", this.oppoRValues)


    for(let i= 0; i< this.totalCountReg; i++)
    {
      console.log("opporeview", this.oppoRValues[i].reviews)
      if(this.oppoRValues[i].reviews == undefined )
      {
        this.unReviewR = this.unReviewR + 1;
        this.unReviewRV = this.unReviewRV + this.oppoRValues[i].value;
        this.unReviewRV1 = this.unReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      }
      else if(this.oppoRValues[i].reviews != undefined)
      { 
        console.log("oppo678",this.oppoRValues[i].reviews,this.oppoRValues[i].$key, i )

        this.oppoRegValues = this.oppoRValues[i];

        this.firebaseservice.viewReview(this.oppoRValues[i].$key)
        .subscribe(u => 
        {
          console.log("oppo678",this.oppoRValues[i].reviews,this.oppoRValues[i].$key,this.oppoRegValues, i )
          this.reviewCompleteRList = u;
          //this.reviewComplete = Object.values(this.reviewCompleteList);
          console.log("oppo123", this.reviewCompleteRList);
          this.reviewCompleteRList = this.reviewCompleteRList.slice().reverse();

          //console.log("oppo1234",new Date(this.reviewCompleteList[0].next_review_date), Date())

          if(this.reviewCompleteRList[0].next_review_date != undefined)
          {
            this.nxt_rvw_date = new Date(this.reviewCompleteRList[0].next_review_date)
          }
          else
          {
            this.nxt_rvw_date = this.reviewCompleteRList[0].next_review_date
          }

          //console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          if (this.nxt_rvw_date > this.todays_date)
          {
            this.lapsedReviewR = this.lapsedReviewR + 1;
            this.lapsedReviewRV = this.lapsedReviewRV + this.oppoRValues[i].value;
            this.lapsedReviewRV1 = this.lapsedReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if (this.nxt_rvw_date <= this.todays_date)
          {
            this.liveReviewR = this.liveReviewR + 1;
            this.liveReviewRV = this.liveReviewRV + this.oppoRValues[i].value;
            this.liveReviewRV1 = this.liveReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if(this.nxt_rvw_date == undefined )
          {
            this.reviewCompleteR = this.reviewCompleteR + 1;
            this.reviewCompleteRV = this.reviewCompleteRV + this.oppoRValues[i].value;
            this.reviewCompleteRV1 = this.reviewCompleteRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
        })
      }
    }

          // if(this.reviewCompleteRegList[0].next_review_date != undefined)
          // {
          //   this.nxt_rvw_date = new Date(this.reviewCompleteRegList[0].next_review_date)
          // }
          // else
          // {
          //   this.nxt_rvw_date = this.reviewCompleteRegList[0].next_review_date
          // }

          // console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          // if (this.nxt_rvw_date > this.todays_date)
          // {
          //   this.lapsedReviewReg = this.lapsedReviewReg + 1;
          //   this.lapsedReviewRegValue = this.lapsedReviewRegValue + this.oppoRegValues[i].value;
          //   this.lapsedReviewRegValue1 = this.lapsedReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          // }
          // else if (this.nxt_rvw_date <= this.todays_date)
          // {
          //   this.liveReviewReg = this.liveReviewReg + 1;
          //   this.liveReviewRegValue = this.liveReviewRegValue + this.oppoRegValues[i].value;
          //   this.liveReviewRegValue1 = this.liveReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          // }
          // else if(this.nxt_rvw_date == undefined )
          // {
          //   console.log("opporeview3", this.oppoRegValues[i].reviews, i)
          //   this.reviewCompleteReg = this.reviewCompleteReg + 1;
          //   this.reviewCompleteRegValue = this.reviewCompleteRegValue + this.oppoRegValues[i].value;
          //   this.reviewCompleteRegValue1 = this.reviewCompleteRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          // }
      


    let item = {
      region: region,
      totalCountReg: this.totalCountReg,
      totalValueReg: this.totalValueReg,
      reviewCompleteR: this.reviewCompleteR,
      reviewCompleteRV1: this.reviewCompleteRV1,
      lapsedReviewR: this.lapsedReviewR,
      lapsedReviewRV1: this.lapsedReviewRV1,
      liveReviewR: this.liveReviewR,
      liveReviewRV1: this.liveReviewRV1,
      unReviewR: this.unReviewR,
      unReviewRV1: this.unReviewRV1
    }

    this.regList.push(item);


    // this.regList.push(region, this.totalCountReg, this.totalValueReg);
    // this.regList1.push(this.regList);
    console.log("oppo12345",this.regList)
  }

  // showthreeReviewReg(oppo, value){
  //   console.log("oppo123456",oppo, value)
  //   if(oppo[0].next_review_date != undefined)
  //   {
  //     this.nxt_rvw_date = new Date(oppo[0].next_review_date)
  //   }
  //   else
  //   {
  //     this.nxt_rvw_date = oppo[0].next_review_date
  //   }

  //   console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
  //   if (this.nxt_rvw_date > this.todays_date)
  //   {
  //     this.lapsedReviewReg = this.lapsedReviewReg + 1;
  //     this.lapsedReviewRegValue = this.lapsedReviewRegValue + value;
  //     this.lapsedReviewRegValue1 = this.lapsedReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //   }
  //   else if (this.nxt_rvw_date <= this.todays_date)
  //   {
  //     this.liveReviewReg = this.liveReviewReg + 1;
  //     this.liveReviewRegValue = this.liveReviewRegValue + value;
  //     this.liveReviewRegValue1 = this.liveReviewRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //   }
  //   else if(this.nxt_rvw_date == undefined )
  //   {
  //           //console.log("opporeview3", this.oppoRegValues[i].reviews, i)
  //           this.reviewCompleteReg = this.reviewCompleteReg + 1;
  //           this.reviewCompleteRegValue = this.reviewCompleteRegValue + value;
  //           this.reviewCompleteRegValue1 = this.reviewCompleteRegValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  //         }
  // }

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

    this.totalValueExec = this.totalValueExec.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    console.log("TVE",this.totalValueExec, this.exec_wiseopportunity);

  }

  ngOnDestroy()
  {
    this.alive = false;
  }

}
