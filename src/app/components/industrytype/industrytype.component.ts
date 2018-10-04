import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-industrytype',
  templateUrl: './industrytype.component.html',
  styleUrls: ['./industrytype.component.css']
})
export class IndustrytypeComponent implements OnInit, OnDestroy {

 industrytypes: any;
  industry_type: string;
  industry_key: string;

  industrytypess: object;
  industrytype: any;
  industrykey: string;

  modalOptions: any;
  addIndustryTypeModal_flag: boolean;
  editIndustryTypeModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  //initializing p to one for pagination pipe
  p: number = 1;

  csvOptions: any;
  industry_length: any;
  industrytypeCSV: any [];

  csvindustrytype: any [];
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.industry_key = '';
    this.industry_type = '';

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['Industry Key','Industry Type'] 
    };
  }

  ngOnInit() 
  {
  	//List of Industry type
  	this.industrytypes = []
    this.industrytypess = []
    this.csvindustrytype = []

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

            if (v.role.toUpperCase() == 'ADMIN')
            {
               this.firebaseservice.getIndustryTypes()
               .takeWhile(() => this.alive)
               .subscribe(industrytypes => {  
                  if(industrytypes.exists())
               		{
                    this.industrytypes = industrytypes.val();
                    this.csvindustrytype = Object.entries(this.industrytypes)
                  }
                  //console.log("ty", this.csvindustrytype, this.industrytypes)
                  return this.ev = true;
              })
            }
            else
            {
              console.log('No access to this page');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }

  download(){

    this.industrytypeCSV = [];

    this.csvindustrytype.map(item => {
        return {
             industry_key: Object.values(item)
        }
    }).forEach(item => this.industrytypeCSV.push(item));

    new Angular2Csv(this.industrytypeCSV, 'Industry_Type_Report',this.csvOptions);
  }

  //Add a new Industry Type
  on_add_IndustryType(){
  	//console.log("add");
    let industrytype = this.industry_type
    this.firebaseservice.addIndustryType(industrytype);
    this.cancelindustrytypeModal();
  }

  //Update an Industry Type
  on_edit_IndustryType(){
    let industrytypeData = this.industrytype
    //console.log("log", industrytypeData)
    this.firebaseservice.saveIndustryType(this.industrykey, industrytypeData)
    this.cancelindustrytypeModal();
  }

  //Delete an Industry Type
  on_delete_IndustryType(industrykey:string){
  	//console.log("delete");
  	this.firebaseservice.deleteIndustryType(industrykey);
  }

//START Industry Type
  //Add Industry Type Modal
  addIndustryTypeModal(): void {
    this.industry_type = '';
    this.addIndustryTypeModal_flag = true;
  }

  //Edit Industry Type Modal
  editIndustryTypesModal():void {
    this.editIndustryTypeModal_flag = true;
  }

  editIndustryTypeModal(industrykey: string){
    //console.log(industrykey);
    this.industrytypess = [];
    this.industrytype = [];
    this.industrykey = ''

    this.firebaseservice.getIndustryType(industrykey)
    .takeWhile(() => this.alivepage)
    .subscribe(industrytype => {
    this.industrytypess = industrytype;
    this.industrytype = Object.values(industrytype);
    this.industrykey = industrytype.$key
	})

    this.editIndustryTypesModal();
  }

  //Cancel Industry Type Modal
  cancelindustrytypeModal(): void {
    this.addIndustryTypeModal_flag = false;
    this.editIndustryTypeModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addIndustryTypeModal();
    this.editIndustryTypesModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addIndustryTypeModal();
    this.editIndustryTypesModal(); 
  }
//END MODALS

}
