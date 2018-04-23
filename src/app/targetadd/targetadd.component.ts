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
    console.log("trying new value")
    for (var i = 0; i < this.targetlist.length; i++) {
      
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



  ngOnInit() 
  {
  	var d = new Date();
  	this.month =  d.getMonth() + 1
  	this.fullyear = d.getFullYear()
  	this.financialyear = this.getfinancialyear(this.month,this.fullyear)

  	this.targetlist = []
  	this.runningvalue = 0;
  	this.firebaseservice.gettargets(this.financialyear).subscribe(val => {
  		// console.log(val)
       if (val.length == 0)
       {
       	this.targetlist = []
       	this.firebaseservice.getUsers().subscribe(employees => 
       	{
       		employees.forEach(element => {
       			// console.log(element)
       			this.targetlist.push
       				(
       				{
       					'userid': element.userid,
       					'name':element.name,
       					'region': this.removeundefined(element.region),
       					'Q1': 0,
       					'Q2': 0,
       					'Q3': 0,
       					'Q4': 0

       				}
       				)
       			// console.log(element)
       		})
       	})
       }
       else 
       {
       		this.targetlist = []
       		console.log("found targets")
       		this.firebaseservice.gettargets(this.financialyear).subscribe(employees => 
       			
       			this.targetlist = employees
       	// {
       	// 	employees.forEach(element => {
       	// 		// console.log(element)
       	// 		this.targetlist.push
       	// 			(
       	// 			{
       	// 				'userid': element.userid,
       	// 				'name':element.name,
       	// 				'region': element.region,
       	// 				'Q1': element.Q1,
       	// 				'Q2': element.Q2,
       	// 				'Q3': element.Q3,
       	// 				'Q4': element.Q4

       	// 			}
       	// 			)
       	// 		// console.log(element)
       	// 	})
       	// }
       	)
       }
       // console.log(this.targetlist)
  	})
  }

}