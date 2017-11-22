import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
//import { Accounts } from "../../classes/accounts";
//import { DataServiceService } from "../../services/data-service.service";

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {

  accounts: any[];
  //account : Accounts[];
  querystring: string;

  totalCounts: number;

  //initializing p to one for pagination pipe
  p: number = 1;

  constructor(private firebaseservice : FirebaseService, private router: Router 
    //,public dataservice: DataServiceService
    ) { 
  }

  ngOnInit() 
  {
    //List of companies/accounts
  	this.firebaseservice.getAccounts().subscribe(
      accounts => {	
  		      this.accounts = accounts;
            this.totalCounts = Object.keys(this.accounts).length;
            //this.callAccounts();
      }) 
  }

  /*callAccounts(){
      this.account = this.accounts;
      console.log("Accounts",this.account);
  }*/

  ngOnDestroy() {
    //this.dataservice.account = this.account; 
  }

  //Display the count of Contact Persons 
  countContactPerson(contct){
    if(contct == undefined)
    {
      return "None";
    } else {
      return Object.keys(contct).length;
    }   
  }

  //To add an Account, navigate to AddCompanies Page
  on_add_account(){
    this.router.navigate(['/dashboard/AddCompanies']);
  }

  //To edit an Account, navigate to EditCompanies Page with companyid
  on_edit_account(companyid){
    //console.log('companyid',companyid);
    this.router.navigate(['/dashboard/EditCompanies/:companyid',{'companyid': companyid}]);
  }

  //Delete a particular account by sending companyid
  on_delete_account(companyid){
    this.firebaseservice.deleteAccount(companyid);
  }


}

