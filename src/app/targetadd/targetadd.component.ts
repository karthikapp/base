import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-targetadd',
  templateUrl: './targetadd.component.html',
  styleUrls: ['./targetadd.component.css']
})
export class TargetaddComponent implements OnInit, AfterContentChecked, OnDestroy {
 
  targetlist: any;
  total: number;
  runningvalue: number;
  month : number;
  fullyear : number;
  financialyear : string;
  dsgn: any;
  dsgnList: any;
  userList: any;
  useridList: any;
  val: any;
  gettargetList: any;

  alive: boolean = true;

  uid: string;
  ev: boolean = false;

  constructor(private firebaseservice : FirebaseService,  private router: Router, private afAuth: AngularFireAuth) 
  { 

  }

  rupee(value)
  {
  	var ans= value.toLocaleString('en-IN',{ style: 'currency', currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
  	return ans
  }

 ngAfterContentChecked() 
  {
   
   let total = 0;
    //console.log("trying new value")
    for (var i = 0; i < this.targetlist.length; i++) {
      if(this.targetlist[i].Q1 == '' || this.targetlist[i].Q1 == undefined)
      {
        this.targetlist[i].Q1 = 0;
      }
      if(this.targetlist[i].Q2 == '' || this.targetlist[i].Q2 == undefined)
      {
        this.targetlist[i].Q2 = 0;
      }
      if(this.targetlist[i].Q3 == '' || this.targetlist[i].Q3 == undefined)
      {
        this.targetlist[i].Q3 = 0;
      }
      if(this.targetlist[i].Q4 == '' || this.targetlist[i].Q4 == undefined)
      {
        this.targetlist[i].Q4 = 0;
      }

            total += (this.targetlist[i].Q1 + this.targetlist[i].Q2 + this.targetlist[i].Q3 + this.targetlist[i].Q4) ;
            this.total = total;
     
    }

    this.total = total

  }

  getfinancialyear(month,year)
  {
  	if (month <= 3)
  	{
  		var lastyear = year - 1
  		var fystring = String(lastyear) + "-" + String(year)
  	}
  	else 
  	{
  		lastyear = year 
  		var nextyear = year + 1 
  		fystring = String(lastyear) + "-" + String(nextyear)
  	}
  	return fystring
  }


  addtarget(financialyear,targetlist)
  { 
    this.targetListChange(targetlist)
    //console.log("targetlist", targetlist)
    //console.log("final", this.val)
    this.firebaseservice.addtargets(financialyear,this.val).then(success => {
      alert("Success, Targets updated");
     this.discardTarget();
    })
     
  }

  removeundefined(value)
  {
  	if (value == undefined)
  	{
  		var stringret = " "

  	}
  	else 
  	{
  		stringret = value 
  	}
  	return stringret
  }

  onDesgnChange(dsgn: string, targetList)
  {
    this.dsgn = dsgn;
    //console.log("targetlistdsgn", targetList)

    this.targetListChange(targetList);
    
    this.initial_checks();
  }

  targetListChange(targetList)
  {
    for(let k=0; k < targetList.length; k++)
    {
      let i = 0;
      let j = 0;

      i = this.val.length;

      this.val.forEach( (element,index) => {
        
        if(element.userid == targetList[k].userid)
        {
          this.val.splice(index, 1)
          this.val.push(targetList[k])
        }
        else
        {
          j++;
        }                                        
      }) 

      //console.log("gettargetlist", j, i)

      if(j == i){
        this.val.push(targetList[k])
      } 
      //console.log("gettargetlist", this.val)
    }

  }

  selectDesgnList()
  {
    this.dsgnList = ['sales engineer','presales','Inside Sales','master','Sales Manager','Marketing','presaleshead']
    this.dsgn = this.dsgnList[0];
  }

  initial_checks()
  {
    this.targetlist = []
    this.userList = []
    this.runningvalue = 0;
    this.useridList = [];

    //console.log("valic", this.val)

    this.firebaseservice.getUsers().subscribe( e => {
      this.userList = []
      this.userList = e.filter( o => {
        return o.role == this.dsgn
      })

      this.useridList = this.userList.map(item => item.userid)
        .filter((value, index, self) => { return self.indexOf(value) === index })
        //console.log("userini", this.userList, this.useridList)

        

        for(let i=0; i<=this.useridList.length; i++)
        {
          this.val.forEach(ele => {
            if(this.useridList[i] == ele.userid){
             this.targetlist.push(ele)
             //console.log("targetlist in targets", this.targetlist, this.targetlist.length, i) 
            }
          })

          if(this.targetlist.length <= i){
            this.userList.forEach( el => {
              if(this.useridList[i] == el.userid){
                this.targetlist.push
                ({
                 'userid': el.userid,
                 'name':el.name,
                 'region': this.removeundefined(el.region),
                 'Q1': 0,
                 'Q2': 0,
                 'Q3': 0,
                 'Q4': 0
               })
                //console.log("targetlist not in targets", this.targetlist, this.targetlist.length, i)
              }
            })
          }
        }
      
    })

      // this.firebaseservice.gettargets(this.financialyear).subscribe(val => {
      //   this.val = val;
      //   console.log("val", this.val, val.length, this.financialyear)
      //    if (val.length == 0)
      //    {
      //     console.log("val", val.length)
      //      this.targetlist = [];

      //      this.firebaseservice.getUsers().subscribe(employees => 
      //      {
      //        for(let i=0; i<this.useridList.length; i++)
      //        {
      //        employees.forEach(element => {
      //          // console.log(element)
      //          if(this.useridList[i] == element.userid){
      //            this.targetlist.push
      //              ({
      //                'userid': element.userid,
      //                'name':element.name,
      //                'region': this.removeundefined(element.region),
      //                'Q1': 0,
      //                'Q2': 0,
      //                'Q3': 0,
      //                'Q4': 0
      //             })
      //             console.log("tl",this.targetlist)
      //          }
      //          else{
      //            console.log("no push");
      //          }
      //          // console.log(element)
      //        })
      //      }
      //      })
      //    }
      //    else 
      //    {
      //        this.targetlist = []
      //        console.log("found targets")
      //        this.firebaseservice.gettargets(this.financialyear).subscribe(employees => 
      //        {
      //         console.log("userid", this.useridList.length)
      //          for(let i =0 ;i < this.useridList.length; i++)
      //          {
      //            employees.forEach(element => {
      //               console.log("element", this.useridList[i], element.userid)
      //              if(this.useridList[i] == element.userid)
      //              {
      //                this.targetlist.push(element)
      //                console.log("tl",this.targetlist)
      //              } 
      //            })
      //          }
               
      //          //this.targetlist = employees
      //        }
      //      )
      //    }

      // })
     
  }

  ngOnInit() 
  {
    this.targetlist = [];

    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         //console.log("email",this.uid)
         
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

            if (v.role.toUpperCase() == 'MASTER')
            {
            	var d = new Date();
            	this.month =  d.getMonth() + 1
            	this.fullyear = d.getFullYear();
            	this.financialyear = this.getfinancialyear(this.month,this.fullyear)

              this.dsgnList = []
              this.userList = []
              this.useridList = []
              this.dsgn = '';
              this.targetlist = []
              
               this.firebaseservice.gettargets(this.financialyear).subscribe( val => {
                  
                  this.val = [];
                  this.val = val;

                  this.selectDesgnList();
                  this.initial_checks();

                  //console.log("valuemain", this.val)
                })
              return this.ev=true;
            }
            else
            {
              //console.log('No access to this page choc');
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

   ngOnDestroy() {
    this.alive = false;
  }

  discardTarget(){
    var d = new Date();
    this.month =  d.getMonth() + 1
    this.fullyear = d.getFullYear();
    this.financialyear = this.getfinancialyear(this.month,this.fullyear)

    this.dsgnList = []
    this.userList = []
    this.useridList = []
    this.dsgn = '';
    this.targetlist = []

    this.firebaseservice.gettargets(this.financialyear).subscribe( val => {
      this.val = [];
      this.val = val;
      this.selectDesgnList();
      this.initial_checks();
    })

  }

}
