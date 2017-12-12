import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from "../../services/firebase.service";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

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
  company_address_area: string;
  company_address_state: string;
  company_address_pincode: string;
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
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;

  constructor(private firebaseservice : FirebaseService, private route: Router,
    private afAuth: AngularFireAuth) { 
  }

  ngOnInit() {
    
    this.company_id = '';
    this.company_name = '';
    this.company_type = '';
    this.industry_type = '';
    this.company_address_line1 = '';
    this.company_address_line2 = '';
    this.company_address_state = '';
    this.company_address_area = '';
    this.company_address_pincode = '';
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

    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
      if (data) {
        this.uid = data.uid
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
            return this.ev=true;
          }
          else
          {
            console.log('No access to this page');
            alert('No access to this page');
            return this.ev=false;
          }
        })
      }
      else {
        console.log('No access to this page');
        this.route.navigate(['login']);
        return this.ev=false;
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
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
          company_address_area: this.company_address_area,
          company_address_state: this.company_address_state,
          company_address_pincode: this.company_address_pincode,
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

    return this.firebaseservice.addAccounts(addcustomer,contact_persons).then(success => 
      {
        alert("Added successfully");
        this.route.navigate(['/dashboard/ListCompanies']);
      })
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

  //if there is no update and Cancel button is pressed, redirect to List companies page
  cancel_contact_persons(){
    this.route.navigate(['/dashboard/ListCompanies']);
  }
}

