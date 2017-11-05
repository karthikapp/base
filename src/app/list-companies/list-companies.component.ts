import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {

accounts: accounts[];

  constructor(private firebaseservice : FirebaseService) { }

  ngOnInit() {
  	this.firebaseservice.getAccounts().subscribe(accounts => {	
  	console.log(accounts);	
  		this.accounts = accounts;
  		console.log(this.accounts);

  })
}
  
  somefunction(contct){
    if(contct == undefined)
    {
      return "None";
    } else {
      
      //let list = Object.values(contct);
      //console.log(list);
      return Object.keys(contct).length;
    }
    
  }

  somefn(cntct){
    let list = Object.values(cntct);
    console.log(list);
    return list;
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