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
  oppoCount: any;

  reviewCompleteRV: any;
  liveReviewRV: any;
  lapsedReviewRV: any;
  unReviewRV: any;

  reviewCompleteRV1: any;
  liveReviewRV1: any;
  lapsedReviewRV1: any;
  unReviewRV1: any;

  reviewCompleteRList: any;
  oppoOValues: any;
  oppoRValues: any;
  oppoRegValues: any;
  oppoRegCount: any;
  oppoRegionList: any;

  reviewCompleteE: any;
  liveReviewE: any;
  lapsedReviewE: any;
  unReviewE: any;
  oppoECount: any;

  reviewCompleteEV: any;
  liveReviewEV: any;
  lapsedReviewEV: any;
  unReviewEV: any;

  reviewCompleteEV1: any;
  liveReviewEV1: any;
  lapsedReviewEV1: any;
  unReviewEV1: any;

  reviewCompleteEList: any;
  oppoEValues: any;
  oppoExecValues: any;

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
  execList: any;
  oppoExecList: any;

  review: any;
  reviewCount: any;

  review_date: any;

  modalOptions: any;
  addReviewModal_flag: boolean;
  opportunity_display: any;

  lead_title: any;
  company_name: any;
  oppo_created_at: any;
  oppo_reviews: any;
  oppo_status: any;
  edc: any;
  oppo_values: any;
  oppo_assignedto : any;

 
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) {
        this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
    } }

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
    this.opportunity_display = [];

    

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
    this.oppoOValues = [];
    this.oppoCount = 0;

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

        this.oppoOValues = Object.values(this.oppoValues[i].reviews)

         this.oppoCount = Object.keys(this.oppoOValues).length

           if(this.oppoOValues[this.oppoCount - 1].next_review_date != undefined)
          {
            this.nxt_rvw_date = new Date(this.oppoOValues[this.oppoCount - 1].next_review_date)
          }
          else if(this.oppoOValues[this.oppoCount - 1].next_review_date == undefined)
          {
            this.nxt_rvw_date = this.oppoOValues[this.oppoCount - 1].next_review_date
          }

          console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          if (this.nxt_rvw_date < this.todays_date)
          {
            this.lapsedReview = this.lapsedReview + 1;
            this.lapsedReviewValue = this.lapsedReviewValue + this.oppoValues[i].value;
            this.lapsedReviewValue1 = this.lapsedReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if (this.nxt_rvw_date >= this.todays_date)
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
        }
      }


    //     this.firebaseservice.viewReview(this.oppoValues[i].$key)
    //     .subscribe(u => 
    //     {
    //       //console.log("oppo678",this.oppoValues[i].reviews,this.oppoValues[i].$key, i )
    //       this.reviewCompleteList = u;
    //       //this.reviewComplete = Object.values(this.reviewCompleteList);
    //       console.log("oppo123", this.reviewCompleteList);

    //       this.reviewCompleteList = this.reviewCompleteList.slice().reverse();

    //       //console.log("oppo1234",new Date(this.reviewCompleteList[0].next_review_date), Date())

    //       if(this.reviewCompleteList[0].next_review_date != undefined)
    //       {
    //         this.nxt_rvw_date = new Date(this.reviewCompleteList[0].next_review_date)
    //       }
    //       else
    //       {
    //         this.nxt_rvw_date = this.reviewCompleteList[0].next_review_date
    //       }

    //       console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
    //       if (this.nxt_rvw_date > this.todays_date)
    //       {
    //         this.lapsedReview = this.lapsedReview + 1;
    //         this.lapsedReviewValue = this.lapsedReviewValue + this.oppoValues[i].value;
    //         this.lapsedReviewValue1 = this.lapsedReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    //       }
    //       else if (this.nxt_rvw_date <= this.todays_date)
    //       {
    //         this.liveReview = this.liveReview + 1;
    //         this.liveReviewValue = this.liveReviewValue + this.oppoValues[i].value;
    //         this.liveReviewValue1 = this.liveReviewValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    //       }
    //       else if(this.nxt_rvw_date == undefined )
    //       {
    //         this.reviewComplete = this.reviewComplete + 1;
    //         this.reviewCompleteValue = this.reviewCompleteValue + this.oppoValues[i].value;
    //         this.reviewCompleteValue1 = this.reviewCompleteValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    //       }
    //     })
    //   }
    // }
  }

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
      console.log("hello", this.ratings);
      let reviewsObject ={
        reviews_id : '',
        reviewsdtl : reviews,
        next_review_date: this.next_review_date,
        ratings: '',
        created_by: this.uid,
        created_at: this.created_at
      }
      //this.firebaseservice.addReviews(reviewsObject, oppoid);

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
    console.log("reg123",item)
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
    console.log("reg123", this.executivelist)

    this.showtotalCountRExec(item, this.executivelist, this.region_wiseopportunity);

    // this.totalCountValueReg(this.region_wiseopportunity);
    // this.showRegReview(this.region_wiseopportunity);

  }

  showtotalCountRExec(region, execList, opporegion){
    this.oppoExecList = [];
    this.execList = [];

    for(let i=0; i< Object.keys(execList).length; i++){
      this.oppoExecList = opporegion.filter(u=> 
        {return u.opportunity_assignedto == execList[i]})
      this.totalCountValueExec(this.oppoExecList,execList[i]);
      //this.showRegReview(this.oppoRegionList);
    }
  }

  totalCountValueExec(arr, exec){
    console.log("oppo123456", arr, exec)
    this.execarraylist = [];
    this.execarrayvalue = [];
    this.oppoEValues = [];
    this.oppoExecValues =[];
    
    
    this.unReviewE = 0;
    this.liveReviewE = 0;
    this.reviewCompleteE = 0;
    this.lapsedReviewE = 0;
    this.reviewCompleteEList =[];
    this.unReviewEV = 0;
    this.liveReviewEV = 0;
    this.reviewCompleteEV = 0;
    this.lapsedReviewEV = 0;

    this.unReviewEV1 = '';
    this.liveReviewEV1 = '';
    this.reviewCompleteEV1 = '';
    this.lapsedReviewEV1 = '';

    this.oppoECount = 0;

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

    //this.showReview(arr);

    this.oppoEValues = Object.values(arr);
    console.log("opporeview", this.oppoEValues)


    for(let i= 0; i< this.totalCountExec; i++)
    {
      console.log("opporeview", this.oppoEValues[i].reviews)
      if(this.oppoEValues[i].reviews == undefined )
      {
        this.unReviewE = this.unReviewE + 1;
        this.unReviewEV = this.unReviewEV + this.oppoEValues[i].value;
        this.unReviewEV1 = this.unReviewEV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      }
      else if(this.oppoEValues[i].reviews != undefined)
      { 
        //console.log("oppo678",region, this.oppoRValues[i].reviews,this.oppoRValues[i].$key, i , this.oppoRValues[i])
        
        //this.oppoRegValues = this.oppoRValues[i];

        //this.oppoRegValues.push(this.oppoRValues[i].reviews);

        this.oppoExecValues = Object.values(this.oppoEValues[i].reviews)

       this.oppoECount = Object.keys(this.oppoExecValues).length

       if(this.oppoExecValues[this.oppoECount - 1].next_review_date != undefined)
          {
            this.nxt_rvw_date = new Date(this.oppoExecValues[this.oppoECount - 1].next_review_date)
          }
          else if(this.oppoExecValues[this.oppoECount - 1].next_review_date == undefined)
          {
            this.nxt_rvw_date = this.oppoExecValues[this.oppoECount - 1].next_review_date
          }

          //console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          if (this.nxt_rvw_date < this.todays_date)
          {
            this.lapsedReviewE = this.lapsedReviewE + 1;
            this.lapsedReviewEV = this.lapsedReviewEV + this.oppoEValues[i].value;
            this.lapsedReviewEV1 = this.lapsedReviewEV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if (this.nxt_rvw_date >= this.todays_date)
          {
            this.liveReviewE = this.liveReviewE + 1;
            this.liveReviewEV = this.liveReviewEV + this.oppoEValues[i].value;
            this.liveReviewEV1 = this.liveReviewEV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if(this.nxt_rvw_date == undefined )
          {
            this.reviewCompleteE = this.reviewCompleteE + 1;
            this.reviewCompleteEV = this.reviewCompleteEV + this.oppoEValues[i].value;
            this.reviewCompleteEV1 = this.reviewCompleteEV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
        }
    }
      
    let item_exec = {
      id: exec,
      totalCountExec: this.totalCountExec,
      totalValueExec: this.totalValueExec,
      reviewCompleteE: this.reviewCompleteE,
      reviewCompleteEV1: this.reviewCompleteEV1,
      lapsedReviewE: this.lapsedReviewE,
      lapsedReviewEV1: this.lapsedReviewEV1,
      liveReviewE: this.liveReviewE,
      liveReviewEV1: this.liveReviewEV1,
      unReviewE: this.unReviewE,
      unReviewEV1: this.unReviewEV1
    }

    this.execList.push(item_exec);

    console.log("oppo12345",this.execList)
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
      if (this.opportunities[i].opportunity_assignedto == exec && this.opportunities[i].region == item)
      {
        this.exec_wiseopportunity.push(this.opportunities[i])
        //execlistall.push(this.opportunities[i].opportunity_assignedto)
      }
    }
    //this.executivelist = this.unique(execlistall)
    console.log("exec",this.exec_wiseopportunity)


    //this.totalCountValue(this.exec_wiseopportunity);
    
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

  returnruppeamount(value)
  {
    return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

  getReviewStatus(reviews){
 console.log("reviews", reviews)
    this.review = '';
    this.reviewCount = 0;
    this.review_date ='';
    console.log("reviews", reviews)
    if (reviews == undefined){
      return 'UNREVIEWED'
    }
    else if (reviews != undefined){
       this.review = Object.values(reviews);
      this.reviewCount = Object.keys(reviews).length;

      console.log("reviews", this.review, this.reviewCount)

      if(this.review[this.reviewCount - 1].next_review_date != undefined){
        this.review_date = new Date(this.review[this.reviewCount - 1].next_review_date);

        if(this.review_date >= this.todays_date){
          return 'LIVE'
        }
        else if(this.review_date < this.todays_date){
          return 'LAPSED'
        }
      }else if(this.review[this.reviewCount -1].next_review_date == undefined)
      {
        return 'REVIEW COMPLETE'
      }
      }

  }

  getNextReviewDate(reviews){
    this.review = '';
    this.reviewCount = 0;
    console.log("reviews", reviews)
    if (reviews == undefined){
      return ''
    }
    else if (reviews != undefined){
       this.review = Object.values(reviews);
      this.reviewCount = Object.keys(reviews).length;

      console.log("reviews", this.review, this.reviewCount)

      if(this.review[this.reviewCount - 1].next_review_date != undefined){
        return this.review[this.reviewCount -1].next_review_date
      }else if(this.review[this.reviewCount -1].next_review_date == undefined)
      {
        return ''

      }
    }
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

    this.oppoRegCount = 0;
    
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
        console.log("oppo678",region, this.oppoRValues[i].reviews,this.oppoRValues[i].$key, i , this.oppoRValues[i])
        
        //this.oppoRegValues = this.oppoRValues[i];

        //this.oppoRegValues.push(this.oppoRValues[i].reviews);

        this.oppoRegValues = Object.values(this.oppoRValues[i].reviews)

       this.oppoRegCount = Object.keys(this.oppoRegValues).length

       if(this.oppoRegValues[this.oppoRegCount - 1].next_review_date != undefined)
          {
            this.nxt_rvw_date = new Date(this.oppoRegValues[this.oppoRegCount - 1].next_review_date)
          }
          else if(this.oppoRegValues[this.oppoRegCount - 1].next_review_date == undefined)
          {
            this.nxt_rvw_date = this.oppoRegValues[this.oppoRegCount - 1].next_review_date
          }

          //console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
          if (this.nxt_rvw_date < this.todays_date)
          {
            this.lapsedReviewR = this.lapsedReviewR + 1;
            this.lapsedReviewRV = this.lapsedReviewRV + this.oppoRValues[i].value;
            this.lapsedReviewRV1 = this.lapsedReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
          }
          else if (this.nxt_rvw_date >= this.todays_date)
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
        }
    }

        // console.log("oppo6789",this.oppoRegValues)

        // this.firebaseservice.viewReview(this.oppoRValues[i].$key)
        // .subscribe(u => 
        // {
        //   console.log("oppo678",region, this.oppoRValues[i].reviews,this.oppoRValues[i], this.oppoRValues[i].$key,this.oppoRegValues, i )
        //   this.reviewCompleteRList = u;
        //   //this.reviewComplete = Object.values(this.reviewCompleteList);
        //   console.log("oppo123", this.reviewCompleteRList);
        //   this.reviewCompleteRList = this.reviewCompleteRList.slice().reverse();

        //   //console.log("oppo1234",new Date(this.reviewCompleteList[0].next_review_date), Date())

        //   if(this.reviewCompleteRList[0].next_review_date != undefined)
        //   {
        //     this.nxt_rvw_date = new Date(this.reviewCompleteRList[0].next_review_date)
        //   }
        //   else if(this.reviewCompleteRList[0].next_review_date == undefined)
        //   {
        //     this.nxt_rvw_date = this.reviewCompleteRList[0].next_review_date
        //   }

        //   //console.log("oppo1234",this.nxt_rvw_date, this.nxt_rvw_date > this.todays_date,this.nxt_rvw_date <= this.todays_date );
        //   if (this.nxt_rvw_date > this.todays_date)
        //   {
        //     this.lapsedReviewR = this.lapsedReviewR + 1;
        //     this.lapsedReviewRV = this.lapsedReviewRV + this.oppoRValues[i].value;
        //     this.lapsedReviewRV1 = this.lapsedReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
        //   }
        //   else if (this.nxt_rvw_date <= this.todays_date)
        //   {
        //     this.liveReviewR = this.liveReviewR + 1;
        //     this.liveReviewRV = this.liveReviewRV + this.oppoRValues[i].value;
        //     this.liveReviewRV1 = this.liveReviewRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
        //   }
        //   else if(this.nxt_rvw_date == undefined )
        //   {
        //     this.reviewCompleteR = this.reviewCompleteR + 1;
        //     this.reviewCompleteRV = this.reviewCompleteRV + this.oppoRValues[i].value;
        //     this.reviewCompleteRV1 = this.reviewCompleteRV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
        //   }
        // })
      

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

    console.log("oppo12345",this.regList)
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

    this.totalValueExec = this.totalValueExec.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    console.log("TVE",this.totalValueExec, this.exec_wiseopportunity);

  }

  displayReview(opportunity){
    this.lead_title = '';
    this.company_name = '';
    this.oppo_created_at = null;
    this.oppo_assignedto = '';
    this.oppo_values = '';
    this.edc = null;
    this.oppo_status = '';

    this.addReviewModal();

    // if(opportunity.company_name == undefined){
    //   this.company_name = '';
    // }

    // this.opportunity_display = opportunity;
    // this.lead_title = opportunity.lead_title;
    // this.company_name = opportunity.company_name;
    // this.oppo_created_at = opportunity.opportunity_created_at;
    // this.oppo_reviews = opportunity.reviews;
    // this.oppo_values = opportunity.value;
    // this.oppo_status = opportunity.status;
    // this.edc = opportunity.edc;
    // this.oppo_assignedto = opportunity.opportunity_assignedto;

  }
  //START MODALS
  //Add Product Modal
  addReviewModal(): void {
    console.log("MFlag", this.addReviewModal_flag)
    this.addReviewModal_flag = true;

  }

  //Cancel Product Modal
  cancelReviewModal(): void {
    this.addReviewModal_flag = false;

  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addReviewModal();
   
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addReviewModal();

  }
//END MODALS



  ngOnDestroy()
  {
    this.alive = false;
  }

}
