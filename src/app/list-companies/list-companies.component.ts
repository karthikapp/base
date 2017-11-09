import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {

accounts: accounts[];

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() {
  	this.firebaseservice.getAccounts().subscribe(accounts => {	
  		this.accounts = accounts;
  })
}
  
  somefunction(contct){
    if(contct == undefined)
    {
      return "None";
    } else {
      return Object.keys(contct).length;
    }
    
  }

  somefn(cntct){
    let list = Object.values(cntct);
    console.log(list);
    return list;
  }

  on_edit(company_name){
     
      this.router.navigate(['/dashboard/EditCompanies',{'company_name': company_name}]);
  }

}

interface accounts {
$key?: string;
company_name?: string;
industry_type?: string;
company_type?: string;
employee_count?: string;
contact_persons?: contact_persons[];
}


interface contact_persons {
	Decision_maker?: String;
	primary_contact?: String;
	contact_person_name?: String;
	contact_person_id?: String;
	$key?: String;
}