import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-funnelcharts',
  templateUrl: './funnelcharts.component.html',
  styleUrls: ['./funnelcharts.component.css']
})
export class FunnelchartsComponent implements  OnInit, OnDestroy{

  options: Object;

  uid: string;
   ev: boolean = false;

   alive: boolean = true;
   opportunities: any[];

   items: any;
   products:any;
   leadsarrayvalue: any;
   leadsarraylist: any;
   leadsum: any;

   arraylist: any;
   sumlist: any;
   qualifiedleadsum: any;
   qualifiedleadlist: any;
   presalesopportunitylist: any;
   presalesopportunitysum: any;
   presalesarraylist: any;
   budgetaryopportunitylist: any;
   budgetaryarraylist: any;
   budgetaryopportunitysum: any;
   bomopportunitylist: any;
   bomarraylist: any;
   bomopportunitysum: any;
   pocopportunitylist: any;
   pocarraylist: any;
   pocopportunitysum: any;
   finalproposalopportunitylist: any;
   finalproposalarraylist: any;
   finalproposalopportunitysum: any;
   finalnegoarraylist: any;
   finalnegoopportunitylist: any;
   finalnegoopportunitysum: any;
   casewonopportunitylist: any;
   casewonarraylist: any;
   casewonopportunitysum: any;
   caselostarraylist: any;
   caselostopportunitylist: any;
   caselostopportunitysum: any;
   arrayvalue: any;
   presalsesarrayvalue: any;
   budgetaryarrayvalue: any;
   bomarrayvalue: any;
   pocarrayvalue: any;
   finalproposalarrayvalue: any;
   finalnegoarrayvalue: any;
   casewonarrayvalue: any;
   caselostarrayvalue: any;

   valuesofsum: {
     qualifiedleadsum : number,
     presalesopportunitysum: number,
             budgetaryopportunitysum: number,
             bomopportunitysum: number,
             pocopportunitysum: number,
             finalproposalopportunitysum: number,
             finalnegoopportunitysum: number,
             casewonopportunitysum: number,
             caselostopportunitysum: number
   };


  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { 

}

ngOnInit() {
    this.opportunities = [];

    this.bomopportunitysum = 0;
    this.casewonopportunitysum = 0;
    this.caselostopportunitysum = 0;
    this.presalesopportunitysum = 0;
    this.budgetaryopportunitysum = 0;
    this.qualifiedleadsum = 0;
    this.pocopportunitysum = 0;
    this.finalnegoopportunitysum = 0;
    this.finalproposalopportunitysum = 0;
    this.leadsum = 0;

    //Opportunities list
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

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "PRESALES"
              || v.role.toUpperCase() == "MASTER")
            {
              

  this.firebaseservice.getLeadsByID(this.uid).subscribe(v => {

               this.items = v;
               this.leadsarrayvalue = [];
               this.leadsarraylist = [];

             let qualifiedleads = v.filter(item => {
               return (item.leadstatus != 'Qualified' && item.leadstatus != 'Rejected')
             })

             qualifiedleads.forEach(element => {
               if (element.products_list == undefined)
               {
                   this.leadsarrayvalue.push(0);
                   this.leadsarraylist.push(element);
               }
               else 
               {
                 let somelist = element.products_list
                 somelist.forEach(value =>
                 {
                   if(value.value != undefined){
                   this.leadsarrayvalue.push(value.value);
                   this.leadsarraylist.push(value);
                 }
                 })
               }
             })
             

            this.leadsarraylist = this.leadsarrayvalue
            this.leadsum = this.leadsarraylist.reduce((a, b) => a + b, 0);

             if(this.leadsum == undefined || isNaN(this.leadsum)) {
              this.leadsum = 0;
              }

             this.leadsum = parseFloat(this.leadsum);
           })

 this.firebaseservice.getOpportunitiesByID(this.uid)       
              .subscribe(v => {
              this.opportunities = v;
             this.arrayvalue = []
             this.qualifiedleadlist = []
             this.presalsesarrayvalue = []
             this.presalesopportunitylist = []
             this.budgetaryarrayvalue = []
             this.budgetaryopportunitylist = []
             this.bomarrayvalue = []
             this.bomopportunitylist = []
             this.pocarrayvalue = []
             this.pocopportunitylist = []
             this.finalproposalarrayvalue = []
             this.finalproposalopportunitylist = []
             this.finalnegoarrayvalue = []
             this.finalnegoopportunitylist = []
             this.casewonarrayvalue = []
             this.casewonopportunitylist = []
             this.caselostarrayvalue = []
             this.caselostopportunitylist = []

             // qualified lead sum code
             v.forEach(item => {

               // qualified lead sum code
               if (item.opportunity_state == 'Qualified_lead')
               {
                 //console.log("kri2",item.value, item)
                 this.arrayvalue.push(item.value)
                 this.qualifiedleadlist.push(item)
                 //console.log("found qualified lead")
                 //console.log("kri",this.arraylist, this.arrayvalue)
               }

               else 
               {
                 // console.log("not found qualified lead")
               }
               // presales stage 
               if (item.opportunity_state == 'Presales_Presentation')
               {
                 this.presalsesarrayvalue.push(item.value)
                 this.presalesopportunitylist.push(item)
                 // console.log("found presales")
                 // budgetary price 
               }
               else
               {
                 // console.log("not found presales")
               }

               if (item.opportunity_state == 'Budgetary_Price_Shared')
               {

                 this.budgetaryarrayvalue.push(item.value)
                 this.budgetaryopportunitylist.push(item)
                 // console.log("entering")
                 // console.log("found budgetary")
               }
               else
               {
                 // console.log("not found budgetary")
               }
               // finalising bom
               if (item.opportunity_state == 'Finalising_BOM')
               {
                 this.bomarrayvalue.push(item.value)
                 this.bomopportunitylist.push(item)
                 // console.log("found finalising bom")
               }
               else
               {
                 // console.log("not found finalising bom")
               }
               if (item.opportunity_state == 'POC/Demo')
               {
                 this.pocarrayvalue.push(item.value)
                 this.pocopportunitylist.push(item)
                 // console.log("found poc")
               }
               else
               {
                 // console.log("not found poc")
               }
               if (item.opportunity_state == 'Final_Proposal')
               {
                 this.finalproposalarrayvalue.push(item.value)
                 this.finalproposalopportunitylist .push(item)
                 // console.log("found final proposal")
               }
               else
               {
                 // console.log("not found final proposal")
               }
               if (item.opportunity_state == 'Final_Negotiation')
               {
                 this.finalnegoarrayvalue.push(item.value)
                 this.finalnegoopportunitylist.push(item)
                 // console.log("found final nego")
               }
               else
               {
                 // console.log("not found final nego")
               }

               if (item.opportunity_state == 'Case_won')
               {
                 this.casewonarrayvalue.push(item.value)
                 this.casewonopportunitylist.push(item)
                 // console.log("found case won")
               }
               else
               {
                 // console.log("not found case won")
               }
               if (item.opportunity_state == 'Case_lost')
               {
                 this.caselostarrayvalue.push(item.value)
                 this.caselostopportunitylist.push(item)
                 // console.log("found case lost")
               }
               else
               {
                 // console.log("not found case lost")
               }

               })

             this.arraylist = this.arrayvalue
             this.qualifiedleadsum = this.arraylist.reduce((a, b) => a + b, 0);
             //console.log("this", this.arraylist, this.arrayvalue, this.qualifiedleadsum)
             // presales sum code
             this.presalesarraylist = this.presalsesarrayvalue
             this.presalesopportunitysum = this.presalesarraylist.reduce((a, b) => a + b, 0);
             // budgetary sum code
             this.budgetaryarraylist = this.budgetaryarrayvalue
             this.budgetaryopportunitysum = this.budgetaryarraylist.reduce((a, b) => a + b, 0);
             // bom stage opportunities
             this.bomarraylist = this.bomarrayvalue
             this.bomopportunitysum = this.bomarraylist.reduce((a, b) => a + b, 0);
             // poc stage opportunities
             this.pocarraylist = this.pocarrayvalue
             this.pocopportunitysum = this.pocarraylist.reduce((a, b) => a + b, 0);
             // poc stage opportunities
             this.finalproposalarraylist = this.finalproposalarrayvalue
             this.finalproposalopportunitysum = this.finalproposalarraylist.reduce((a, b) => a + b, 0);
             // poc stage opportunities
             this.finalnegoarraylist = this.finalnegoarrayvalue
             this.finalnegoopportunitysum = this.finalnegoarraylist.reduce((a, b) => a + b, 0);
             // poc stage opportunities
             this.casewonarraylist = this.casewonarrayvalue
             this.casewonopportunitysum = this.casewonarraylist.reduce((a, b) => a + b, 0);
             // poc stage opportunities
             this.caselostarraylist = this.caselostarrayvalue
             this.caselostopportunitysum = this.caselostarraylist.reduce((a, b) => a + b, 0);
            


        this.valuesofsum = {
             qualifiedleadsum : parseFloat(this.qualifiedleadsum),
             presalesopportunitysum: parseFloat(this.presalesopportunitysum),
             budgetaryopportunitysum: parseFloat(this.budgetaryopportunitysum),
             bomopportunitysum: parseFloat(this.bomopportunitysum),
             pocopportunitysum: parseFloat(this.pocopportunitysum),
             finalproposalopportunitysum: parseFloat(this.finalproposalopportunitysum),
             finalnegoopportunitysum: parseFloat(this.finalnegoopportunitysum),
             casewonopportunitysum: parseFloat(this.casewonopportunitysum),
             caselostopportunitysum: parseFloat(this.caselostopportunitysum)
        }

       // console.log("valuesinside",this.valuesofsum, this.qualifiedleadsum)

this.dofunnelcharts();
       

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

dofunnelcharts(){

  this.options = {
  chart: { type: 'funnel' },
  title: { text: 'MY SALES FUNNEL' },
  plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            },
            center: ['40%', '50%'],
            neckWidth: '30%',
            neckHeight: '25%',
            width: '80%'
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Amount (in Rs.)',
        data: [
            ['Leads', this.leadsum],
            ['Q Leads', this.valuesofsum.qualifiedleadsum],
            ['Presales', this.valuesofsum.presalesopportunitysum],
            ['Budgeting', this.valuesofsum.budgetaryopportunitysum],
            ['BOM', this.valuesofsum.bomopportunitysum],
            ['POC/DEMO',this.valuesofsum.pocopportunitysum ],
            ['Proposal', this.valuesofsum.finalproposalopportunitysum ],
            ['Negotiation', this.valuesofsum.finalnegoopportunitysum ],
            ['Case Won',  this.valuesofsum.casewonopportunitysum ]
            // ['Case Lost',  this.valuesofsum.caselostopportunitysum ]
        ]

    }],
        responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }


}

}


  ngOnDestroy() {
    this.alive = false;
  }

}
