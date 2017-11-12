import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {

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
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router) 
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
  }

  ngOnInit() 
  {
  	//List of Distributors
  	return this.firebaseservice.getDistributors().subscribe(distributors => {	
  		      this.distributors = distributors;
            //console.log(distributors);
    })
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
    this.firebaseservice.getDistributor(distributorid).subscribe(distributor => {
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
