import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit, OnDestroy {

  distributors: any;
  distributor_name: string;
  distributor_id: string;

  distributor: object;
  distributorname: string;
  distributorid: string;

  created_at: Date;

  modalOptions: any;
  addDistributorModal_flag: boolean;
  editDistributorModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  csvOptions: any;
  distributorsCSV: any[];

  //initializing p to one for pagination pipe
  p: number = 1;
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.distributor_name = '';
    this.distributor_id = '';
    this.created_at = firebaseservice.created_at;

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['Distributor ID','Distributor Name'] 
    };
  }

  ngOnInit() 
  {
  	//List of Distributors

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
               this.firebaseservice.getDistributors()
               .takeWhile(() => this.alive)
               .subscribe(distributors => {  
                      this.distributors = distributors;
                      return this.ev=true;
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

  download(){
    this.distributorsCSV = [];

    this.distributors.map(item => {
        return {
            distributor_id: item.distributor_id,
            distributor_name: item.distributor_name
        }
    }).forEach(item => this.distributorsCSV.push(item));

    new Angular2Csv(this.distributorsCSV, 'Distributor_Report',this.csvOptions);
  }


  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }
  
  //Add a new Distributor
  on_add_distributor(){
  	//console.log("add");
    let distributor = { distributor_name: this.distributor_name,
                		distributor_id: this.distributor_id,
                		created_at: this.created_at
            		  }
    this.firebaseservice.addDistributor(distributor);
    this.cancelDistributorModal();
  }

  //Update an Distributor
  on_edit_distributor(){
    let distributorData = { distributor_name: this.distributorname,
                      		created_at: this.created_at
                    	  }
    this.firebaseservice.saveDistributor(this.distributorid, distributorData)
    this.cancelDistributorModal();
  }

  //Delete an Distributor
  on_delete_distributor(distributor_id:string){
  	//console.log("delete");
  	this.firebaseservice.deleteDistributor(distributor_id);
  }

//START MODALS
  //Add Distributor Modal
  addDistributorModal(): void {
    this.distributor_name = '';
    this.addDistributorModal_flag = true;
  }

  //Edit Distributor Modal
  editDistributorsModal():void {
    this.editDistributorModal_flag = true;
  }

  editDistributorModal(distributorid: string){
    //console.log(distributorid);
    this.firebaseservice.getDistributor(distributorid)
    .takeWhile(() => this.alivepage)
    .subscribe(distributor => {
    this.distributorname = distributor.distributor_name;
    this.distributorid = distributor.distributor_id})

    this.editDistributorsModal();
  }

  //Cancel Distributor Modal
  cancelDistributorModal(): void {
    this.addDistributorModal_flag = false;
    this.editDistributorModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addDistributorModal();
    this.editDistributorsModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addDistributorModal();
    this.editDistributorsModal();
  }
//END MODALS
}
