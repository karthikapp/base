import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrls: ['./add-companies.component.css']
})
export class AddCompaniesComponent implements OnInit {

  //Company details
  company_id: string;
  company_name: string;
  company_type: string;
  industry_type: string;
  company_address_line1: string;
  company_address_line2: string;
  employee_count: number;

  //Contact Person details
  contact_person_id: string;
  contact_person_name: string;
  contact_person_title: string;
  decision_maker: string;
  primary_contact: string;
  contact_person_category: string;
  contact_person_mobile: string;
  contact_person_phone: string;
  contact_person_email: string;

  created_at: Date;
  

  constructor(private firebaseservice : FirebaseService, private route: Router) { 
  }

  ngOnInit() {
    this.company_id = '';
    this.company_name = '';
    this.company_type = '';
    this.industry_type = '';
    this.company_address_line1 = '';
    this.company_address_line2 = '';
    this.employee_count = null;

    this.contact_person_id = '';
    this.contact_person_name = '';
    this.contact_person_title = '';
    this.decision_maker = '';
    this.primary_contact = '';
    this.contact_person_category = '';
    this.contact_person_mobile = '';
    this.contact_person_phone = '';
    this.contact_person_email = '';

    this.created_at = this.firebaseservice.created_at;
  }

  //Add customer and contact person. If success, navigate to List Companies
  add_contact_persons()
  {

    let addcustomer = {
          companyid: this.company_id,
          companyname: this.company_name,
          companytype:this.company_type,
          industrytype: this.industry_type,
          company_address_line1: this.company_address_line1,
          company_address_line2:this.company_address_line2,
          employee_count: this.employee_count,
          created_at: this.created_at
        };


    let contact_persons  = {
       contact_person_id: this.contact_person_id,
       contact_person_name: this.contact_person_name,
       contact_person_title: this.contact_person_title,
       Decision_maker: this.decision_maker,
       Primary_contact: this.primary_contact,
       contact_person_category: this.contact_person_category,
       contact_person_mobile: this.contact_person_mobile,
       contact_person_phone: this.contact_person_phone,
       contact_person_email: this.contact_person_email,
       created_at: this.created_at
     };

    //console.log(addcustomer, contact_persons)

    if (addcustomer.companyname == '')
    {
      console.log("Fields are empty and customer is not added", addcustomer);
      this.route.navigate(['/dashboard/ListCompanies']);
    }
    else if((contact_persons.contact_person_name == '' && addcustomer.companyname != '') || 
            (contact_persons.contact_person_name != null && addcustomer.companyname != ''))
    {
      //console.log("contact_persons", contact_persons, addcustomer)
      contact_persons = null;
      return this.firebaseservice.addAccounts(addcustomer,contact_persons).then(success => 
      {
        this.route.navigate(['/dashboard/ListCompanies']);
        //console.log("added")
      })
    }
  }

  //Set industry type based on employee count
  onKey(event: KeyboardEvent): void{
    if(this.employee_count >=1 && this.employee_count <= 500){
      this.industry_type = "SM";
    } else if (this.employee_count >= 501 && this.employee_count <= 1000)
    {
      this.industry_type = "MB";
    } else if (this.employee_count >= 1001 && this.employee_count <= 2000){
      this.industry_type = "Mid Enterprise";
    } else if (this.employee_count >= 2001){
      this.industry_type = "Enterprise";
    } else
    {
      this.industry_type = "";
    }
  }

  remove_contact_persons(){
  }

  //if there is no update and Cancel button is pressed, redirect to List companies page
  cancel_contact_persons(){
    this.route.navigate(['/dashboard/ListCompanies']);
  }
}

