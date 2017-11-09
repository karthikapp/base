import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editcompanies',
  templateUrl: './editcompanies.component.html',
  styleUrls: ['./editcompanies.component.css']
})
export class EditcompaniesComponent implements OnInit {

	account: any;
	company_name: string;
  company_name1: string;
  company_type: string;
  industry_type: string;
  address1: string;
  address2: string;
  employeecount: number;
  company_id: string;
  
  contact_persons: any[];
  contact_person_name: string;
  contact_person_title: string;
  Decision_maker: string;
  primary_contact: string;
  category: string;
  contact_person_id: string;
	

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute) { 
  }

  ngOnInit() {

  	this.company_name = this.router.snapshot.params['company_name'];
    
  	this.firebaseservice.getAccount(this.company_name).subscribe(account => {    
      this.account = account;
      this.company_name1 = account[0].company_name;
      this.company_type = account[0].company_type;
      this.industry_type = account[0].Industry_type;
      this.address1 = account[0].company_address_line1;
      this.address2 = account[0].company_address_line2;
      this.employeecount = account[0].employee_count;
      this.company_id = account[0].company_id;
      this.contact_persons = account[0].contact_persons;

  });
  }

  save_contact_persons(){
     //console.log (this.company_name,this.company_type,this.industry_type,this.contact_persons);

     let account = {
          company_name: this.company_name1,
          company_type:this.company_type,
          Industry_type: this.industry_type,
          company_address_line1: this.address1,
          company_address_line2:this.address2,
          employee_count: this.employeecount
        };


     let contact_persons = this.contact_persons;


     console.log(account,contact_persons)

     this.firebaseservice.saveAccount(this.company_id,account,contact_persons)


    }


}
