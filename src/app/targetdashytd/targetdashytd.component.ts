import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
declare var jQuery: any;
import {ReversepipePipe} from '../reversepipe.pipe';
import { AnalyticsService } from '../services/analytics.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-targetdashytd',
  templateUrl: './targetdashytd.component.html',
  styleUrls: ['./targetdashytd.component.css']
})
export class TargetdashytdComponent implements OnInit, OnDestroy {

  @Input()
  category: any;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;

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

  dataRegion: any;
  rtotal: number;
  data: any;
  dataTargetRegList: any;
  dataEmp : any;
  dataTargetEmpList: any;
  empname: string;
  revenueList: any;
  dataRevRegList: any;
  dataRevEmpList: any;

  dataFinalRegList: any;
  dataFinalEmpList: any;
  name: any;
  value: any;
  RevPercent : number =0;
  EmpPercent: number = 0;
  regionList: any;
  executiveList: any;
  count: number = 0;

  dataTRegList: any;
  dataTEmpList: any;
  dataRRegList: any;
  dataREmpList: any;
  tvalue: any;

  employees: any;
  forecast: any;
  forecast_total: any;
  forecast_byregion: any;
  forecast_bybrand: any;



  constructor(private firebaseservice : FirebaseService, private afAuth: AngularFireAuth, 
    private analyticservice: AnalyticsService,private router: Router) 
  {
    this.percentcompleted = (this.dealvalue_total/this.total)*100
  }

  ngAfterViewInit() 
  {
    jQuery('#example1').progress();
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

  unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(arr[i] == undefined){
        arr[i] = '';
      }
      if(!u.hasOwnProperty(arr[i])) {
        a.push(arr[i]);
        u[arr[i]] = 1;
      }
    }
    return a;
  }

  returnnonullregion(regionname)
  {
    let val = ''
    // console.log("region", regionname)
    if (regionname == '')
    {
      val = "N/S"
    }
    else 
    {
      val = regionname
    }

    return val
  }


  ngAfterContentChecked() 
  {

    this.dataRegion = [];
    this.dataEmp = [];
    this.dataREmpList = [];
    this.dataTEmpList = [];
    this.dataTargetEmpList = [];
    this.dataTRegList = [];
    this.dataTargetRegList = [];
    this.dataRRegList = [];
    this.dataRevRegList = [];
    this.dataFinalRegList = [];
    this.dataFinalEmpList = [];
    this.dataRevEmpList = [];

    let total = 0;
    let qtd_total = 0;

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

    if(this.targetlist != undefined && this.revenueList != undefined){

      const groupedObj = this.targetlist.reduce((prev, cur)=> {
        if(!prev[cur['region']]) {
          prev[cur['region']] = [cur];
        } else {
          prev[cur['region']].push(cur);
        }
        // console.log("prev", prev);
        return prev;
      }, {});

      this.dataRegion = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key]}});

      this.dataRegion.forEach ( i => {
        this.data = [];
        this.rtotal = 0;

        i.value.forEach( j =>
        {
          this.data.push((j.Q1+ j.Q2 + j.Q3 + j.Q4));
        })

        this.rtotal = this.data.reduce((a,b) => a+b ,0);

        this.dataTRegList.push({region: i.key, value: this.rtotal})
      })

      

      this.regionList.forEach( i => {
        this.name = '';
        this.count = 0;
        this.name = i;
        this.value = 0;
        this.dataTRegList.forEach ( j => {
          if(this.name == j.region){
            this.count = 1;
            this.value = j.value
          }
        })
        if(this.count = 0){
          this.dataTargetRegList.push({region: this.name, value: 0})
        }
        else{
          this.dataTargetRegList.push({region: this.name, value: this.value})
        }

      })

      //console.log("trying88", this.dataTargetRegList, this.dataTRegList)



      const groupedeObj = this.targetlist.reduce((prev, cur)=> {
        if(!prev[cur['userid']]) {
          prev[cur['userid']] = [cur];
        } else {
          prev[cur['userid']].push(cur);
        }
        // console.log("prev", prev);
        return prev;
      }, {});

      this.dataEmp = Object.keys(groupedeObj).map(key => { return { key, value: groupedeObj[key]}});



      this.dataEmp.forEach ( i => {
        this.data = [];
        
        this.empname = '';
        this.rtotal = 0;

        i.value.forEach( j =>
        {
          this.data.push((j.Q1 + j.Q2 + j.Q3 + j.Q4));
          this.empname = j.name
        })

        this.rtotal = this.data.reduce((a,b) => a+b ,0);

        this.dataTEmpList.push({assigned_to: i.key, name: this.empname, value: this.rtotal})
        // console.log("up", this.dataFinalRegList);
      })



      this.executiveList.forEach( i => {
        this.name = '';
        this.count = 0;
        this.empname = '';
        this.value = '';
        this.name = i;
        this.dataTEmpList.forEach ( j => {
          if(this.name == j.assigned_to){
            this.count = 1;
            this.value = j.value;
            this.empname = j.name;
          }
        })
        if(this.count = 0){
          this.dataTargetEmpList.push({assigned_to: this.name, name: '', value: 0})
        }
        else{
          this.dataTargetEmpList.push({assigned_to: this.name, name: this.empname, value: this.value})
        }
        //console.log("trying89", this.dataTargetEmpList, this.dataTEmpList)
      })

      const groupedRObj = this.revenueList.reduce((prev, cur)=> {
        if(!prev[cur['region']]) {
          prev[cur['region']] = [cur];
        } else {
          prev[cur['region']].push(cur);
        }
      // console.log("prev", prev);
      return prev;
    }, {});

      this.dataRegion = Object.keys(groupedRObj).map(key => { return { key, value: groupedRObj[key]}});

      
      this.dataRegion.forEach ( i => {
        this.data = [];

        this.rtotal = 0;

        i.value.forEach( j =>
        {
          this.data.push(j.valueofdeal);
        })

        this.rtotal = this.data.reduce((a,b) => a+b ,0);

        this.dataRRegList.push({region: i.key, value: this.rtotal})
      // console.log("up", this.dataFinalRegList);
    })



      this.regionList.forEach( i => {
        this.name = '';
        this.count = 0;
        this.name = i;
        this.value = 0;
        this.dataRRegList.forEach ( j => {
          if(this.name == j.region){
            this.count = 1;
            this.value = j.value
          }
        })
        if(this.count = 0){
          this.dataRevRegList.push({region: this.name, value: 0})
        }
        else{
          this.dataRevRegList.push({region: this.name, value: this.value})
        }
      })



      const groupedReObj = this.revenueList.reduce((prev, cur)=> {
        if(!prev[cur['assigned_to']]) {
          prev[cur['assigned_to']] = [cur];
        } else {
          prev[cur['assigned_to']].push(cur);
        }
      // console.log("prev", prev);
      return prev;
    }, {});

      this.dataEmp = Object.keys(groupedReObj).map(key => { return { key, value: groupedReObj[key]}});




      this.dataEmp.forEach ( i => {
        this.data = [];

        this.empname = '';
        this.rtotal = 0;

        i.value.forEach( j =>
        {
          this.data.push(j.valueofdeal);
          this.empname = j.assignedto_name
        })

        this.rtotal = this.data.reduce((a,b) => a+b ,0);

        this.dataREmpList.push({assigned_to: i.key, name: this.empname, value: this.rtotal})
      //console.log("trying7", this.dataREmpList);
    })



      this.executiveList.forEach( i => {
        this.name = '';
        this.count = 0;
        this.empname = '';
        this.value = '';
        this.name = i;
        this.dataREmpList.forEach ( j => {
          if(this.name == j.assigned_to){
            this.count = 1;
            this.value = j.value;
            this.empname = j.name;
          }
        })
        if(this.count = 0){
          this.dataRevEmpList.push({assigned_to: this.name, name: '', value: 0})
        }
        else{
          this.dataRevEmpList.push({assigned_to: this.name, name: this.empname, value: this.value})
        }
      })



      this.RevPercent = 0;


    //console.log("trying12  ",this.dataTargetRegList, this.dataRevRegList)

    this.dataRevRegList.forEach( i => {
      this.name = '';

      this.value = 0;
      this.tvalue = 0;
      this.name = i.region
      this.value = i.value;

      
      this.dataTargetRegList.forEach ( j => {
        if(j.region == this.name)
        {

          this.tvalue = j.value;

        }
      })
      if(this.value == '' || this.value == undefined){
        this.value = 0;
      }
      if(this.tvalue == '' || this.tvalue == undefined){
        this.tvalue = 0;
      }
      this.dataFinalRegList.push({region: this.name, revenue: this.value, target: this.tvalue  })
    })


    this.EmpPercent = 0;
    
    
    this.dataRevEmpList.forEach( i => {
      this.empname = '';
      this.name = '';
      this.tvalue = 0;
      this.value = 0;

      this.empname = i.name;
      this.name = i.assigned_to
      this.value = i.value;
      this.dataTargetEmpList.forEach ( j => {
        if(j.assigned_to == this.name){
          this.tvalue = j.value
        }

      })
      if(this.value == '' || this.value == undefined){
        this.value = 0;
      }
      if(this.tvalue == '' || this.tvalue == undefined){
        this.tvalue = 0;
      }
      this.dataFinalEmpList.push({assigned_to: this.name, assignedto_name: this.empname,  revenue: this.value, target: this.tvalue })
    })
  }
  else 
  {
      // console.log("no targets found")
    }
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


  getValueRT(value,target){
    let val = 0;
    // console.log("trying", value, target);
    if(value == 0 || target == 0)
    {
      val =0
    }
    else{
      val = (value/target)*100;
    }
    // console.log("trying12", val)


    return Math.round(val);
  }

  ngOnInit() 
  {
    this.targetlist = []
    this.runningvalue = 0;
    this.regionList = [];
    this.executiveList = [];
    this.employees =[];
    this.total = 0;
    this.dealvalue_total = 0;
    this.dealvaluequarter_total = 0;

    this.forecast_total = 0;

    this.forecast = []
    this.forecast_byregion = []
    this.forecast_bybrand = []

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

          if(v.title == undefined)
          {
            v.title = '';
          }

          if (v.role.toUpperCase() == "MASTER")
          {



            var d = new Date();
            this.month =  d.getMonth() + 1
            this.fullyear = d.getFullYear()
            this.financialyear = this.getfinancialyear(this.month,this.fullyear)


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
              this.quarter = "Q4"
            }

            if(this.category == 'All'){
            	this.firebaseservice.getcasewon().subscribe(val => { 
                this.revenueList = [];
                this.revenueList = val.filter( i => { return i.financial_year == this.financialyear});
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



              this.firebaseservice.getUsers().subscribe(employees => 
              { 
                var regionlistall = [];
                employees.forEach(el => {
                  regionlistall.push(el.region)
                        //console.log("trying", regionlistall)
                      })

                this.regionList = this.unique(regionlistall);
                     //console.log("trying12", this.regionList)

                     var execlistall = []
                     employees.forEach(el => {
                       execlistall.push(el.userid)
                        //console.log("trying34", execlistall)
                      })
                     this.executiveList = this.unique(execlistall);
                     //console.log("trying56", this.executiveList)
                   })

               this.firebaseservice.retreiveforecast().subscribe(value => {
          //console.log('forecast',value)
                this.forecast = value
            var total = 0;
            value.forEach(el => 
            {
              for(let i=0; i<13; i++){
                 total = total + el.value_exec[i];
               }
            })
            this.forecast_total = total
          })


        // this.firebaseservice.retreiveforecastbyregion().subscribe(val => {
        //   console.log('forecast_by_region',val)
        //   this.forecast_byregion = val
        // })

        //   this.firebaseservice.retreiveforecastbybrand().subscribe(valu => {
        //   console.log('forecast_by_brand',valu)
        //   this.forecast_bybrand = valu
        // })

            }
            else if(this.category == 'ThunderBird'){
              this.analyticservice.getOpportunitiesforBird().subscribe(val => { 
                this.revenueList = [];
                this.revenueList = val.filter( i => { return i.financial_year == this.financialyear});
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


              this.firebaseservice.getUsers().subscribe(employees => 
              { 
                this.employees = employees;
                var regionlistall = [];
                this.employees.forEach(el => {
                  if(el.category == this.category.toLowerCase()){
                    regionlistall.push(el.region)
                  }
                  else{
                          //console.log("no region");
                        }
                        //console.log("trying", regionlistall)
                      })

                this.regionList = this.unique(regionlistall);
                     //console.log("trying12", this.regionList)

                     var execlistall = [];
                     this.employees.forEach(el => {
                       if(el.category == this.category.toLowerCase())
                       {
                         execlistall.push(el.userid)
                       }
                       else{

                        //console.log("no executive list");
                      }
                    })
                     this.executiveList = this.unique(execlistall);
                     //console.log("trying56", this.executiveList)
                   })

            }
            else if(this.category == 'Classic'){
              this.analyticservice.getOpportunitiesforClassic().subscribe(val => { 
                this.revenueList = [];
                this.revenueList = val.filter( i => { return i.financial_year == this.financialyear});
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



              this.firebaseservice.getUsers().subscribe(employees => 
              { 
                this.employees = employees;
                var regionlistall = [];
                this.employees.forEach(el => {
                  if(el.category == this.category.toLowerCase()){
                    regionlistall.push(el.region)
                  }
                  else{
                        //console.log("no region");
                      }
                      //console.log("trying", regionlistall)
                    })

                this.regionList = this.unique(regionlistall);
                   //console.log("trying12", this.regionList)

                   var execlistall = [];
                   this.employees.forEach(el => {
                     if(el.category == this.category.toLowerCase()){
                       execlistall.push(el.userid)
                     }
                     else{

                      //console.log("no executive list");
                    }
                  })
                   this.executiveList = this.unique(execlistall);
                   //console.log("trying56", this.executiveList)
                 })
            }



    // console.log("result", this.dealvalue_total)



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
       		//console.log("found targets")
       		this.firebaseservice.gettargets(this.financialyear).subscribe(employees => 
       			
       			this.targetlist = employees
             )
         }

       })

    return this.ev = true;
  }

  else
  {
              // console.log('No access to this page choco');
              alert('No access to this page');
              return this.ev=false;
            }
          })
}
else{
            // console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
          }
        });


}

ngOnDestroy(){
  this.alive = false;
}







}
