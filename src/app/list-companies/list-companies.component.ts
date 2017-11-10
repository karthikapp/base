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

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() {
    //List of companies
  	return this.firebaseservice.getAccounts().subscribe(accounts => {	
  		      this.accounts = accounts;
            //console.log(accounts);
    })
  }
  
  countContactPerson(contct){
    if(contct == undefined)
    {
      return "None";
    } else {
      return Object.keys(contct).length;
    }
    
  }

  on_add_account(){
    this.router.navigate(['/dashboard/AddCompanies']);
  }

  on_edit_account(companyid){
     //console.log('companyid',companyid);
      this.router.navigate(['/dashboard/EditCompanies/:companyid',{'companyid': companyid}]);
  }

  on_delete_account(companyid){
    this.firebaseservice.deleteAccount(companyid);
  }

}
