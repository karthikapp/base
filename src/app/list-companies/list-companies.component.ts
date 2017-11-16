import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {

  accounts: any;
  username: any[];

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() 
  {
    this.username = ['krishna','bharath'];
    //List of companies/accounts
  	return this.firebaseservice.getAccounts().subscribe(
      accounts => {	
  		      this.accounts = accounts;
            console.log(accounts);
                  })
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
