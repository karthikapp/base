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
  company_type: string;
  industry_type: string;
  company_address_line1: string;
  company_address_line2: string;
  employee_count: number;
  company_id: string;
  
  contact_persons: any[];	

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, private route: Router) { 
  }

  ngOnInit() {

  	this.company_id = this.router.snapshot.params['companyid'];
    
  	this.firebaseservice.getAccount(this.company_id).subscribe(account => {    
      this.company_name = account[0].companyname;
      this.company_type = account[0].companytype;
      this.industry_type = account[0].industrytype;
      this.company_address_line1 = account[0].company_address_line1;
      this.company_address_line2 = account[0].company_address_line2;
      this.employee_count = account[0].employee_count;
      this.company_id = account[0].companyid;
      this.account = account;

      this.contact_persons = account[0].contact_persons;
  });
  }

  save_contact_persons(){
     //console.log (this.company_name,this.company_type,this.industry_type,
     //this.contact_persons);

     let account = {
          companyname: this.company_name,
          companytype:this.company_type,
          industrytype: this.industry_type,
          company_address_line1: this.company_address_line1,
          company_address_line2:this.company_address_line2,
          employee_count: this.employee_count
        };

     let contact_persons = this.contact_persons;

     console.log('editcompanies',account,contact_persons)

     return this.firebaseservice.saveAccount(this.company_id,account,contact_persons).then (success => {
       this.route.navigate(['/dashboard/ListCompanies'])
     })
    }

   cancel_contact_persons(){
    this.route.navigate(['/dashboard/ListCompanies']);
  }

}
