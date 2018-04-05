import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { ReviewquestionService } from "../../services/reviewquestion.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { revQuestion } from '../../models/revQuestion';
import "rxjs/add/operator/takeWhile";
import * as moment from 'moment';
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
  oppo_status: any;
  edc: any;
  oppo_values: any;
  oppo_assignedto : any;

  reviews_display: any;
  opportunity_activities: any;
  upcoming: any;
  product_name: any;
  quantity: any;
  leadlabel: any;
  lead_presales_approved_to: any;
  oppo_key: any;
  leadsource: any;

  isRegLoading: boolean = true;

  rate: any;
  role: any;
  title: any;
  report: any;
  startDate: any;
  endDate: any;
  question_reviews_ql: any;
  answer_reviews_ql: any;

  rquestionnarie: revQuestion; 
  ranswers: any;
  roanswers: any;
  roquestions: any;

  avgReviewslist: any;
  avgReviewsvalue: any;
  totalavgRevValue: any;
  isOpen : boolean = false;
  answers: any;
  ansindex: any;
  ansfilter: any;
 
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth,
    private rqservice: ReviewquestionService ) {
        this.modalOptions = 
    {
      "size": "large",
      "type": "default",
      "closeable": true
    }     
    }

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
    this.ratings = 0;
    this.nxt_rvw_reg_date = null;
    this.nxt_rvw_date = null;
    this.todays_date = new Date();
    this.opportunity_display = [];
    this.answer_reviews_ql = [];
    this.startDate = null;
    this.endDate = null;
    this.ranswers = '';
    this.roanswers = '';
    this.roquestions = '';
    this.rquestionnarie = new revQuestion();
    this.rquestionnarie.question = '';
    this.rquestionnarie.stage = '';
    this.rquestionnarie.questionid = '';
    this.answers = [];

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

          this.report = v.report.toUpperCase();
          this.title = v.title.toUpperCase();
          this.role = v.role.toUpperCase();

          if(v.role.toUpperCase() == "MASTER" 
            || v.title.toUpperCase() == "PRE-SALES HEAD"){
           this.initial_app();
          }
          else if(v.report.toUpperCase() == 'RECIPIENT'){
            this.initial_app_recip();
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

  initial_app(){
    this.question_reviews_ql = [];
    this.answer_reviews_ql = [];

     this.firebaseservice.getopportunities().subscribe(v =>{
              this.opportunities = v;
              this.totalCountValueAll(this.opportunities);
              //this.showReview(this.opportunities);
              
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

  initial_app_recip(){
    this.question_reviews_ql = [];
    this.answer_reviews_ql = [];

    this.firebaseservice.getopportunitiesbyreporttoid(this.uid)
            .subscribe(v => {
            this.opportunities = v;
            this.totalCountValueAll(this.opportunities);

            console.log("oppo",this.opportunities)
            var regionlistall = []
            this.opportunities.forEach(el => {
              regionlistall.push(el.region)
            })
            this.regionList = this.unique(regionlistall);
            this.showtotalCountReview(this.regionList, this.opportunities);
          })
          return this.ev = true;

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

  // getAnswersforRev(qr){
  //   console.log("pp12",this.rquestionnarie, this.rquestionnarie.questionid, this.rquestionnarie.question);
    
  //   this.rquestionnarie = qr;

  //   console.log("pp123", this.rquestionnarie, this.rquestionnarie.questionid, this.rquestionnarie.question)

  //   this.answer_reviews_ql = [];
  //   this.answer_reviews_ql = this.rqservice.getAnswers().filter(i => { return i.questionid == this.rquestionnarie.questionid;
  //   });

  //   // if(this.answer_reviews_ql == ''){
  //   //   this.answer_reviews_ql = '#';
  //   //   console.log("pp123",this.answer_reviews_ql)
  //   // }
  //   // else if (this.answer_reviews_ql != '#'){
      
  //   //   //this.showContentReview(this.rquestionnarie);
  //   // }
  //   console.log("pp12", this.answer_reviews_ql);
  //   //this.rquestionnarie = question;

  // }



  // selectAnswerforRev(question, qid, answers, answer,  answerid , checked){
  //   console.log("pp1234", question, answer, answers, qid, answerid);
  //   // this.answer_reviews_ql.forEach( x => {
  //   //   if(x.answerid != answerid){
  //   //     x.checked = false;
  //   //   }
  //   //   else
  //   //   {
  //   //     x.checked = true;
  //   //   }
  //   //   console.log("check", x.checked);
  //   // })

  //   //Single select for multi question
  //     // answers.forEach( x => {
  //     //   if(x.answerid != answerid){
  //     //     x.checked = false;
  //     //   }  
  //     // })

  //   //   this.ansindex = null;

  //   //   let element: any = { question: question,
  //   //       answer: answer, qid: qid, ansid: answerid};
    
  //   //   if (this.answers.length > 0)
  //   //   {
  //   //     this.ansindex = this.answers.findIndex(p => p.qid === qid);

  //   //     if(this.ansindex != -1){
  //   //       this.answer_reviews_ql.splice(this.ansindex, 1)
  //   //     }
  //   //     //console.log("asn", this.answers, this.answer_reviews_ql, this.ansindex);
  //   //   }

  //   //   if(checked == false){
  //   //     this.answer_reviews_ql.push(element);
  //   //     this.answers = this.answer_reviews_ql;
  //   //   }
    
  //   // console.log("final", this.answer_reviews_ql);

  //   //Multi Select 
  //   // this.ansindex = null;

  //   //   let element: any = { question: question,
  //   //       answer: answer, qid: qid, ansid: answerid};
    
  //   //   if(checked == false){
  //   //     this.answer_reviews_ql.push(element);
  //   //     this.answers = this.answer_reviews_ql;
  //   //   }
  //   //   else if(checked == true){
  //   //     this.ansindex = this.answers.findIndex(p => p.ansid === answerid);
  //   //     this.answer_reviews_ql.splice(this.ansindex,1)
  //   //     this.answers = this.answer_reviews_ql
  //   //   }
    
  //   // console.log("final", this.answer_reviews_ql);




  //   this.ansindex = null;
  //   this.ansfilter = [];

  //   let element: any = { question: question, qid:qid, 
  //     answers: [{ answer: answer, ansid: answerid }]};
  //     console.log("qi", element);

  //   let qanswers: any = { answer: answer, ansid: answerid}

  //   console.log("qi",qanswers);

  //   if(this.answers.length > 0)
  //   {
  //     this.ansindex = this.answers.findIndex(p => p.qid === qid);
  //     this.ansfilter = this.answers.filter(p => p.qid === qid)
  //                 .map(a => a.answers);

  //   //   var flattened = this.ansfilter.reduce(
  //   // ( accumulator, currentValue ) => accumulator.concat([currentValue]),[]);

  //     //let ansfilters = Object.values(this.ansfilter);
  //     console.log("qiiiiiiippppp", this.ansindex, this.ansfilter);

  //     if(this.ansindex != -1){
  //     // var ansind = this.ansindex
  //       if(checked ==false){
  //         //this.ansfilters.push({answers: this.ansfilter});
  //         //let ansfilters : any = this.ansfilter
  //         this.ansfilter.push([qanswers]);
  //         //this.ansfilter = Object.values(this.ansfilter);
  //         console.log("pq", this.ansfilter);
  //       }
  //       else if (checked == true){
  //         //this.ansindex = this.answers.findIndex(p => p.qid === rqid);
  //       }
  //       element = { question: question, qid: qid, answers: this.ansfilter};
  //       console.log("pqqq", element);
  //       this.answer_reviews_ql.splice(this.ansindex,1);
  //     }
  //   }

  //   if(checked == false)
  //   {
  //     this.answer_reviews_ql.push(element);
  //     this.answers = this.answer_reviews_ql;
  //   }

  //   console.log("qiiiiiii", this.answers, this.answer_reviews_ql)
  // }

  selectAnswerforRev(question, qid, answers, answer,  answerid , checked)
  {
    this.ansindex = null;
    if (this.answer_reviews_ql.length == 0 )
    {
      var answerslist = []
      let answertopush: any = {answer: answer, ansid: answerid}
      answerslist.push(answertopush)
      let element: any = {question: question, qid:qid, answers: answerslist};
      this.answer_reviews_ql.push(element)
      console.log("no answers till now")
      console.log("review",this.answer_reviews_ql)
    }

    else
    {
      console.log("found answers")
      // this.answer_reviews_ql = this.answer_reviews_ql.filter(function(el)
      // {
      //   return el.qid == qid;
      // })

      // console.log("after filtering ", this.answer_reviews_ql)

      this.ansindex = this.answer_reviews_ql.findIndex(p => p.qid === qid);

      console.log("kri", this.ansindex);
      
      if(this.ansindex != -1){
      this.answer_reviews_ql.forEach(element => 
      {
        if (element.qid == qid)
        {
          console.log("question already answered")
          var answerspresent = element.answers
          console.log("answerspresent", answerspresent, element.answers);
          answerspresent.forEach(loopanswer => 
          {
            console.log("answerspresent", loopanswer);
            if (loopanswer.ansid == answerid && checked == true)
            {
             console.log(answerid, "already selected")
             answerspresent = answerspresent.filter(function(el) {
                   return el.ansid !== answerid;
             });
             
             this.answer_reviews_ql = this.answer_reviews_ql.filter(function(el) {
                   return el.qid !== qid;
             });

             console.log("ap", answerspresent, this.answer_reviews_ql);


             if(answerspresent.length > 0){

               let element: any = {question: question, qid:qid, answers: answerspresent};
               this.answer_reviews_ql.push(element)
               console.log("review",this.answer_reviews_ql)
             }

             else if(answerspresent == 0){
               this.answer_reviews_ql.splice(this.ansindex,1);
               console.log("review", this.answer_reviews_ql);
             }
            }

            // else if (loopanswer.ansid != answerid && checked == false)
            // {
            //   let answertopush: any = {answer: answer, ansid: answerid}
            //   console.log("answertopush", answertopush, checked, loopanswer.ansid, answerid)
            //   answerspresent.push(answertopush)
            //   console.log("new answer pushed",answerspresent)
            //   console.log("review",this.answer_reviews_ql)
            // }

          })

          if(checked == false)
          {
            let answertopush: any = {answer: answer, ansid: answerid}
            answerspresent.push(answertopush)
            console.log("new answer pushed",answerspresent)
            console.log("review",this.answer_reviews_ql)
          }
        }

        // else
        // {
        //   console.log("question not answered previously")
        //   var answerslist = []
        //   let answertopush: any = {answer: answer, ansid: answerid}
        //   answerslist.push(answertopush)
        //   let element: any = {question: question, qid:qid, answers: answerslist};
        //   this.answer_reviews_ql.push(element)
        //   console.log("review",this.answer_reviews_ql)
        // }

   })
    }

      else if(checked == false &&  this.ansindex == -1)
      {
        console.log("question not answered previously")
        var answerslist = []
        let answertopush: any = {answer: answer, ansid: answerid}
        answerslist.push(answertopush)
        let element: any = {question: question, qid:qid, answers: answerslist};
        this.answer_reviews_ql.push(element)
        console.log("review",this.answer_reviews_ql)
      }

  }
}

  onkey(value, rquestion, rqid, ranswerid, rchecked){
    console.log("keytup", value, rquestion, rqid, ranswerid, rchecked);

    this.ansindex = null;

    // console.log("this", this.answer_reviews_ql, this.answers)

    // let data: any = {question: rquestion,
    //       answer: value, qid: rqid, ansid: ranswerid }

    // if(this.answers.length > 0){
    //   this.ansindex = this.answers.findIndex(p => p.qid === rqid);

    //   if(this.ansindex != -1){
    //       this.answer_reviews_ql.splice(this.ansindex, 1)
    //       console.log("krishna", this.answer_reviews_ql);
    //     }

    // }

    // if(rchecked == true){
    //     this.answer_reviews_ql.push(data);
    //     this.answers = this.answer_reviews_ql;
    //   }

    //   console.log("final", this.answer_reviews_ql, this.answers);

    if (this.answer_reviews_ql.length == 0 )
    {
      var answerslist = []
      let answertopush: any = {answer: value, ansid: ranswerid}
      answerslist.push(answertopush)
      let element: any = {question: rquestion, qid:rqid, answers: answerslist};
      this.answer_reviews_ql.push(element)
      console.log("no answers till now")
      console.log("review",this.answer_reviews_ql)
    }

    else
    {
      console.log("found answers")
      // this.answer_reviews_ql = this.answer_reviews_ql.filter(function(el)
      // {
      //   return el.qid == qid;
      // })

      // console.log("after filtering ", this.answer_reviews_ql)

      this.ansindex = this.answer_reviews_ql.findIndex(p => p.qid === rqid);

      console.log("kri onkey", this.ansindex);
      
      if(this.ansindex != -1){
      this.answer_reviews_ql.forEach(element => 
      {
        if (element.qid == rqid)
        {
          console.log("question already answered")
          var answerspresent = element.answers
          // console.log("answerspresent", answerspresent, element.answers);
          answerspresent.forEach(loopanswer => 
          {
            console.log("answerspresent", loopanswer);
            if ((loopanswer.ansid == ranswerid && rchecked == false) || (loopanswer.ansid == ranswerid && value != ''))
            {
             console.log(ranswerid, "already selected")
             answerspresent = answerspresent.filter(function(el) {
                   return el.ansid !== ranswerid;
             });
             
             this.answer_reviews_ql = this.answer_reviews_ql.filter(function(el) {
                   return el.qid !== rqid;
             });

             let element: any = {question: rquestion, qid:rqid, answers: answerspresent};
             this.answer_reviews_ql.push(element)
             console.log("review",this.answer_reviews_ql)
            }

            // else if (loopanswer.ansid != answerid && checked == false)
            // {
            //   let answertopush: any = {answer: answer, ansid: answerid}
            //   console.log("answertopush", answertopush, checked, loopanswer.ansid, answerid)
            //   answerspresent.push(answertopush)
            //   console.log("new answer pushed",answerspresent)
            //   console.log("review",this.answer_reviews_ql)
            // }

          })

          if(rchecked == true)
          {
            let answertopush: any = {answer: value, ansid: ranswerid}
            answerspresent.push(answertopush)
            console.log("new answer pushed",answerspresent)
            console.log("review",this.answer_reviews_ql)
          }
        }

        // else
        // {
        //   console.log("question not answered previously")
        //   var answerslist = []
        //   let answertopush: any = {answer: answer, ansid: answerid}
        //   answerslist.push(answertopush)
        //   let element: any = {question: question, qid:qid, answers: answerslist};
        //   this.answer_reviews_ql.push(element)
        //   console.log("review",this.answer_reviews_ql)
        // }

   })
    }

      else if(rchecked == true &&  this.ansindex == -1)
      {
        console.log("question not answered previously")
        var answerslist = []
        let answertopush: any = {answer: value, ansid: ranswerid}
        answerslist.push(answertopush)
        let element: any = {question: rquestion, qid: rqid, answers: answerslist};
        this.answer_reviews_ql.push(element)
        console.log("review",this.answer_reviews_ql)
      }

    }

  }

  submit_reviews( oppoid: any){
    console.log("pp12", oppoid, this.ranswers, this.rquestionnarie.question)
      console.log("hello", this.ratings);

      if(this.question_reviews_ql == '' && this.roquestions != ''){
        console.log("krishna")

        let value: any = {question: this.roquestions,
          answer: '', qid: '', ansid:''} 

          this.answer_reviews_ql = value;        
      }

      if( this.ratings > 0)
      {
      let reviewsObject ={
        reviews_id : '',
        reviewsdscr : this.answer_reviews_ql,
        next_review_date: this.next_review_date,
        ratings: this.ratings,
        stage: this.oppo_status,
        created_by: this.uid,
        created_at: this.created_at
      }

      console.log("pp12", reviewsObject);

        this.firebaseservice.addReviews(reviewsObject, oppoid).then(success => {
          this.rquestionnarie.question = '';
          this.rquestionnarie.questionid = '';
          this.rquestionnarie.stage = '';
          this.ranswers = '';
          this.roanswers = '';
          this.roquestions = '';
          this.ratings = 0;
          this.next_review_date = null;
          alert("Review submitted successfully");
          this.cancelReviewModal();  
        }); 

      if(this.role == "MASTER" 
            || this.title == "PRE-SALES HEAD"){
           this.isRegLoading = true;
           this.initial_app();
          }
          else if(this.report == 'RECIPIENT'){
            this.isRegLoading = true;
            this.initial_app_recip();
          }

         }
      else{
        alert("Review is not inserted since ratings is NULL");
      } 
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

    this.showtotalCountRExec(item, this.executivelist, this.opportunities);

  }

  showtotalCountRExec(region, execList, opporegion){
    this.oppoExecList = [];
    this.execList = [];

    let oppokeys = Object.keys(execList).length


    for(let i=0; i< oppokeys; i++){
      this.oppoExecList = opporegion.filter(u=> 
        {return u.opportunity_assignedto == execList[i] &&
          u.region == region})
      console.log("oppo", this.oppoExecList , execList[i] )

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
      this.oppoEValues.push(element);
    })
                  
    //console.log("opporeviewpp",  this.execarraylist) 

    this.execarraylist = this.execarrayvalue
    this.totalValueExec = this.execarraylist.reduce((a, b) => a + b, 0);
    if(this.totalValueExec == undefined || isNaN(this.totalValueExec)) {
      this.totalValueExec = 0;
    }

    this.totalValueExec = this.totalValueExec.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

    //this.showReview(arr);

    //this.oppoEValues = Object.values(arr);
    //console.log("opporeview", this.oppoEValues, this.execarraylist, this.oppoEValues )


    for(let i= 0; i< this.totalCountExec; i++)
    {
      //console.log("opporeview", this.oppoEValues[i].reviews)
      if(this.oppoEValues[i].reviews == undefined )
      {
        this.unReviewE = this.unReviewE + 1;
        this.unReviewEV = this.unReviewEV + this.oppoEValues[i].value;
        this.unReviewEV1 = this.unReviewEV.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      }
      else if(this.oppoEValues[i].reviews != undefined)
      { 
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
    console.log("flag", this.isRegLoading)
   
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

    this.totalCount = Object.keys(arr).length;

    arr.forEach(element => {
      this.arrayvalue.push(element.value);
      this.oppoValues.push(element);
    })
                  
    this.arraylist = this.arrayvalue
    this.totalValue = this.arraylist.reduce((a, b) => a + b, 0);
    if(this.totalValue == undefined || isNaN(this.totalValue)) {
      this.totalValue = 0;
    }

    this.totalValue = this.totalValue.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    console.log("total",arr, this.totalValue)

    //this.oppoValues = Object.values(oppo);
    //console.log("opporeview", this.oppoValues, oppo)

    for(let i= 0; i< this.totalCount; i++)
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
      this.isRegLoading = false;
  }

  returnruppeamount(value)
  {
    if(value == undefined){
      return 0;
    }
    else {
      return value.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    }
  }


  getReview(reviews, rflag){
    this.avgReviewslist = [];
    this.avgReviewsvalue = [];
    this.totalavgRevValue = 0;

      if (reviews == undefined)
      {
        //this.rate = 0;
        if(rflag == 's'){
          return 'UNREVIEWED'
        }
        else if (rflag == 'd'){
          return ''
        }
        else if(rflag == 'r'){
          return this.rate = 0;
        }
      } 
      else if (reviews != undefined)
      {

        this.review = Object.values(reviews);
        this.reviewCount = Object.keys(reviews).length;

        //this.rate = this.review[this.reviewCount - 1].ratings;

        if (rflag == 's'){
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
            return 'COMPLETED'
          }
        }
        else if(rflag == 'd'){
          if(this.review[this.reviewCount - 1].next_review_date != undefined){
            return this.review[this.reviewCount -1].next_review_date
          }else if(this.review[this.reviewCount -1].next_review_date == undefined)
          {
            return ''

          }
        }
        else if(rflag == 'r'){
          Object.keys(reviews).forEach(key => {
            if(reviews[key].ratings != undefined){
              this.avgReviewsvalue.push(reviews[key].ratings);
              this.avgReviewslist.push(reviews[key]);
            }
          })

          this.avgReviewslist = this.avgReviewsvalue;
          this.totalavgRevValue = this.avgReviewslist.reduce((a, b) => a + b, 0);
          
          if(this.totalavgRevValue == undefined || isNaN(this.totalavgRevValue)) 
          {
            this.totalavgRevValue = 0;
          }

          this.rate = this.totalavgRevValue/this.reviewCount;   

          //console.log("rate", this.rate, this.totalavgRevValue,this.reviewCount);

          return this.rate;
        }
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



  displayReview(opportunity){
    this.lead_title = '';
    this.company_name = '';
    this.oppo_created_at = null;
    this.oppo_assignedto = '';
    this.oppo_values = '';
    this.edc = null;
    this.oppo_status = '';
    this.reviews_display = [];
    this.opportunity_activities = [];
    this.upcoming = [];
    this.product_name  = '';
    this.quantity = '';
    this.lead_presales_approved_to = '';
    this.oppo_key = '';
    this.leadsource = '';
    this.question_reviews_ql = [];
    this.answer_reviews_ql = [];

    this.addReviewModal();

    this.oppo_key = opportunity.$key;
    this.reviews_display = opportunity.reviews
    this.lead_title = opportunity.lead_title;
    this.company_name = opportunity.company_name;
    this.oppo_created_at = opportunity.opportunity_created_at; 
    this.oppo_values = opportunity.value;
    this.oppo_status = opportunity.opportunity_state;
    this.edc = opportunity.edc;
    this.oppo_assignedto = opportunity.opportunity_assignedto;
    this.opportunity_activities = opportunity.opportunity_activities;
    this.upcoming = opportunity.upcoming;
    this.product_name = opportunity.product_name;
    this.quantity = opportunity.quantity;
    this.lead_presales_approved_to = opportunity.lead_presales_approved_to;
    this.leadsource = opportunity.leadsource;

    //console.log("ql", this.oppo_status);
    this.question_reviews_ql = this.rqservice.getQuestions().filter(i=> i.stage == this.oppo_status);

    if(this.question_reviews_ql == undefined){
      this.question_reviews_ql = '';
    }
    console.log("ql",this.question_reviews_ql);
  }

  gettimeDiff(dateto , datefrom){
    if(dateto == undefined || dateto == ''){
      return 'NA'
    }
    if(datefrom == undefined || datefrom == ''){
      return 'NA'
    }

    var startTime=moment(datefrom, "HH:mm:ss a");
    var endTime=moment(dateto, "HH:mm:ss a");
    var duration = moment.duration(endTime.diff(startTime));
    var hours = Math.trunc(duration.asHours());
    var minutes = Math.trunc(duration.asMinutes())- hours * 60;
    var result = hours + 'hrs' + '' + minutes + 'min' 

    // console.log("datediff", dateto, datefrom, startTime, endTime, hours,duration.asHours(), duration.asMinutes(),
    //  minutes );

    return result;
  }

  getactivitytypetext(activitytype){
    if (activitytype == 'phonecall')
    {
      return "Ph Call"
    }
    else if (activitytype == 'onsitevisit') {
      return "OnSite"
    }
    else if (activitytype == 'presentation')
    {
      return "PPT"
    }
    else if (activitytype == 'solutiondocumenting')
    {
      return "Soln Docu"
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
      return 'QL'
    }
    else if (text == 'Presales_Presentation')
    {
      return 'PP'
    }
    else if (text == 'Budgetary_Price_Shared')
    {
      return 'BPS'
    }
    else if (text == 'Finalising_BOM')
    {
      return 'BOM'
    }
    else if (text == 'POC/Demo')
    {
      return 'POC'
    }
    else if (text == 'Final_Proposal')
    {
      return 'Prop'
    }
    else if (text == 'Final_Negotiation')
    {
      return 'Nego'
    }
    else if (text == 'Case_won')
    {
      return 'CW'
    }
    else if (text == 'Case_lost')
    {
      return 'CL'
    }

  }

  getupcomingtext(value)
  {
    if (value == 'phone_call') 
    {
      return "Ph Call"
    }

    else if (value == 'online_meeting')
    {
      return "Onlne Mtng"
    }

    else if (value == 'on_site_visit')
    {
      return "OnSite"
    }
  }

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


  //START MODALS
  //Add Product Modal
  addReviewModal(): void {
    console.log("MFlag", this.addReviewModal_flag)
    this.addReviewModal_flag = true;

  }

  //Cancel Product Modal
  cancelReviewModal(): void {
    this.addReviewModal_flag = false;
    this.rquestionnarie.question = '';
    this.rquestionnarie.questionid = '';
    this.rquestionnarie.stage = '';
    this.roquestions = '';
    this.roanswers = '';
    this.ranswers = '';
    this.answers = [];
    this.answer_reviews_ql = [];
    this.ratings = 0;
    this.next_review_date = null;
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

//Accordion - show and hide for opportunities
  closeAlloppo(): void {
    this.question_reviews_ql.forEach((qr) => {
      qr.isOpen = false;
    });
  }

  showContentReview(qr) {
    if (!qr.isOpen) {
      this.closeAlloppo();
    }
    qr.isOpen = true;
  }



  ngOnDestroy()
  {
    this.alive = false;
  }

}
