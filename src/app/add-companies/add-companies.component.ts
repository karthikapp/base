import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrls: ['./add-companies.component.css']
})
export class AddCompaniesComponent implements OnInit {

  companyname: string;
  companytype: string;
  industrytype: string;
  address1: string;
  address2: string;
  employeecount: number;
  
  contactpersonname: string;
  contactpersontitle: string;
  decisionmaker: string;
  primarycontact: string;
  category: string;
  

  constructor(private firebaseservice : FirebaseService) { }

  ngOnInit() {
    this.companyname = '';
    this.companytype = '';
    this.industrytype = '';
    this.address1 = '';
    this.address2 = '';
    this.employeecount = 0;

    this.contactpersonname = '';
    this.contactpersontitle = '';
    this.decisionmaker = '';
    this.primarycontact = '';
    this.category = '';
    
  }


  add_contact_persons(){
    let addcustomer = {
          companyname: this.companyname,
          companytype:this.companytype,
          industrytype: this.industrytype,
          address1: this.address1,
          address2:this.address2,
          employeecount: this.employeecount
        };

    let contact_person = {
       contactpersonname: this.contactpersonname,
       title: this.contactpersontitle,
       decisionmaker: this.decisionmaker,
       primarycontact: this.primarycontact,
       category: this.category
     };

    console.log(addcustomer, contact_person)

    return this.firebaseservice.addAccounts(addcustomer,contact_person)

  	
  }

  remove_contact_persons(){

  }
}

