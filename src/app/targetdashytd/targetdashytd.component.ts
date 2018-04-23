import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
declare var jQuery: any;

@Component({
  selector: 'app-targetdashytd',
  templateUrl: './targetdashytd.component.html',
  styleUrls: ['./targetdashytd.component.css']
})
export class TargetdashytdComponent implements OnInit {

  targetlist: any;
  total: number;
  runningvalue: number;
  month : number;
  fullyear : number;
  financialyear : string;
  dealvalue_total: any;
  percentcompleted: any;
  quarter: string;
  qtd_total: number;
  dealvaluequarter_total:number;

  constructor(private firebaseservice : FirebaseService) 
  {
    this.percentcompleted = (this.dealvalue_total/this.total)*100
  }

  ngAfterViewInit() 
  {
    jQuery('#example1').progress();


    //jQuery('.ui.rating').rating();
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



   ngAfterContentChecked() 
  {
   
   let total = 0;
   let qtd_total = 0;
    // console.log("trying new value")
    for (var i = 0; i < this.targetlist.length; i++) {
      
            total += (this.targetlist[i].Q1 + this.targetlist[i].Q2 + this.targetlist[i].Q3 + this.targetlist[i].Q4) ;
            this.total = total;

            if (this.quarter == "Q1")
            {
              qtd_total +=  (this.targetlist[i].Q1)
            }
            else if (this.quarter == "Q2")
            {
              qtd_total +=  (this.targetlist[i].Q2)
            }
             else if (this.quarter == "Q3")
            {
              qtd_total +=  (this.targetlist[i].Q3)
            }
              else if (this.quarter == "Q4")
            {
              qtd_total +=  (this.targetlist[i].Q4)
            }
     
    }

    this.total = total
    this.qtd_total = qtd_total




  }



  rupee(value)
  {
  	var ans= value.toLocaleString('en-IN',{ style: 'currency', currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
  	return ans
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

  getValue(val){
    return Math.round(val);
  }

  ngOnInit() 
  {
  	var d = new Date();
  	this.month =  d.getMonth() + 1
  	this.fullyear = d.getFullYear()
  	this.financialyear = this.getfinancialyear(this.month,this.fullyear)
    this.dealvalue_total = 0;
    this.dealvaluequarter_total = 0;

    
    console.log([4,5,6].indexOf(this.month))

    if ([4,5,6].indexOf(this.month) >= 0)
    {
      this.quarter = "Q1"
    }
    else if ([7,8,9].indexOf(this.month) >= 0)
     {
       this.quarter = "Q2"
     }
    else if ([10,11,12].indexOf(this.month) >= 0)
    {
      this.quarter = "Q3"
    }
    else if ([1,2,3].indexOf(this.month) >= 0)
    {
      this.quarter = "Q3"
    }

    console.log(this.quarter);





  	this.firebaseservice.getcasewon().subscribe(val => {
      // console.log(val)
  		val.forEach(el => 
      { 
        if (String(el.financial_year) == String(this.financialyear))
        {
          // console.log("found", el.valueofdeal)
          this.dealvalue_total = this.dealvalue_total + el.valueofdeal

          if (String(el.quarter) == String(this.quarter))
          {
            this.dealvaluequarter_total = this.dealvaluequarter_total + el.valueofdeal
          }

        }
        else 
        {
          // console.log("not found")
        }
      })
  	})

    // console.log("result", this.dealvalue_total)

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
       	)
       }
       
  	})
  
}

}
