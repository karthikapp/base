import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-targetadd',
  templateUrl: './targetadd.component.html',
  styleUrls: ['./targetadd.component.css']
})
export class TargetaddComponent implements OnInit {
 
  targetlist: any;
  total: number;
  runningvalue: number;
  month : number;
  fullyear : number;
  financialyear : string;
  dsgn: any;
  dsgnList: any;
  userList: any;
  useridList: any

  constructor(private firebaseservice : FirebaseService) 
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
    this.firebaseservice.addtargets(financialyear,targetlist)
     alert("Success, Targets updated");
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

  onDesgnChange(dsgn: string)
  {
    this.dsgn = dsgn;
    this.initial_checks();
  }

  selectDesgnList()
  {
    this.dsgnList = ['sales engineer','presales','Inside Sales','master','Sales Manager','Marketing','presaleshead']
    this.dsgn = this.dsgnList[0];
  }

  initial_checks()
  {
    this.targetlist = []
    this.runningvalue = 0;

    this.firebaseservice.getUsers().subscribe( e => {
      this.userList = e.filter( o => {
        return o.role == this.dsgn
      })
      console.log("userList", this.userList);
      this.useridList = this.userList.map(item => item.userid)
        .filter((value, index, self) => { return self.indexOf(value) === index })
        console.log("userid",this.useridList)
   

      this.firebaseservice.gettargets(this.financialyear).subscribe(val => {
        // console.log(val)
         if (val.length == 0)
         {
           this.targetlist = [];

           this.firebaseservice.getUsers().subscribe(employees => 
           {
             for(let i=0; i<this.useridList.length; i++)
             {
             employees.forEach(element => {
               // console.log(element)
               if(this.useridList[i] == element.userid){
                 this.targetlist.push
                   ({
                     'userid': element.userid,
                     'name':element.name,
                     'region': this.removeundefined(element.region),
                     'Q1': 0,
                     'Q2': 0,
                     'Q3': 0,
                     'Q4': 0
                  })
                  console.log("tl",this.targetlist)
               }
               else{
                 console.log("no ush");
               }
               // console.log(element)
             })
           }
           })
         }
         else 
         {
             this.targetlist = []
             //console.log("found targets")
             this.firebaseservice.gettargets(this.financialyear).subscribe(employees => 
             {
               for(let i =0 ;i < this.useridList.length; i++)
               {
                 employees.forEach(element => {
                   if(this.useridList[i] == element.userid)
                   {
                     this.targetlist.push(element)
                     console.log("tl",this.targetlist)
                   }
                 })
               }
               
               //this.targetlist = employees
             }
           )
         }

      })
     })
  }


  ngOnInit() 
  {
  	var d = new Date();
  	this.month =  d.getMonth() + 1
  	this.fullyear = d.getFullYear();
  	this.financialyear = this.getfinancialyear(this.month,this.fullyear)

    this.dsgnList = []
    this.userList = []
    this.dsgn = '';
    this.selectDesgnList();
    this.initial_checks();
    
    
  	
  }

}
