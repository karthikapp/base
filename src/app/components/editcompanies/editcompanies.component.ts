import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editcompanies',
  templateUrl: './editcompanies.component.html',
  styleUrls: ['./editcompanies.component.css']
})
export class EditcompaniesComponent implements OnInit {

	account: any;
	companyname: string;
  company_type: string;
  industry_type: string;
  company_address_line1: string;
  company_address_line2: string;
  employee_count: number;
  company_id: string;
  created_at: Date;

  //contact_persons: any[];
  
  contact_persons: {
  contact_person_id: string,
  contact_person_name: string,
  contact_person_title: string,
  Decision_maker: string,
  Primary_contact: string,
  contact_person_category: string,
  contact_person_mobile: string,
  contact_person_phone: string,
  contact_person_email: string,
  created_at: Date
  }[] = [];	

  contact_person: {
  contact_person_id: string,
  contact_person_name: string,
  contact_person_title: string,
  Decision_maker: string,
  Primary_contact: string,
  contact_person_category: string,
  contact_person_mobile: string,
  contact_person_phone: string,
  contact_person_email: string,
  created_at: Date
  }[] = [];  

  constructor(private firebaseservice : FirebaseService, private router: ActivatedRoute, private route: Router) { 
  }

  ngOnInit() {
    //Current server date and timestamp
    this.created_at = this.firebaseservice.created_at;

    //Display the company detail based on company id on respective fields
  	this.company_id = this.router.snapshot.params['companyid'];
    
  	this.firebaseservice.getAccount(this.company_id).subscribe(account => {    
      this.companyname = account[0].companyname;
      this.company_type = account[0].companytype;
      this.industry_type = account[0].industrytype;
      this.company_address_line1 = account[0].company_address_line1;
      this.company_address_line2 = account[0].company_address_line2;
      this.employee_count = account[0].employee_count;
      this.company_id = account[0].companyid;

      this.contact_persons = account[0].contact_persons;
  });
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

  //Update the changes for the respective company and if the update is complete redirect to List companies page
  save_contact_persons(){
     //console.log (this.companyname,this.company_type,this.industry_type,this.contact_persons);

     if (this.companyname == undefined) {
       this.companyname = '';
     } 
     if (this.company_type == undefined) {
       this.company_type = '';
     }
     if (this.industry_type == undefined){
       this.industry_type = '';
     }
     if (this.company_address_line1 ==undefined){
       this.company_address_line1 = '';
     } 
     if (this.company_address_line2 == undefined){
       this.company_address_line2 = '';
     }

     if(this.employee_count == undefined){
      this.employee_count = null;
     }

     if (this.contact_person == undefined) {
       this.contact_person = null;
     } 

    if (this.contact_persons == undefined ) {
       this.contact_persons = null;
     } 


     let account = {
          companyname: this.companyname,
          companytype:this.company_type,
          industrytype: this.industry_type,
          company_address_line1: this.company_address_line1,
          company_address_line2:this.company_address_line2,
          employee_count: this.employee_count,
          created_at: this.created_at
        };

     let contact_persons = this.contact_persons;

     let contact_person = this.contact_person;


     console.log('keys',Object.keys(contact_person),Object.values(contact_person))
     //console.log('editcompanies',this.company_id,account,contact_persons,contact_person)

     this.firebaseservice.saveAccount(this.company_id,account,contact_persons,contact_person)
     this.route.navigate(['/dashboard/ListCompanies'])
    }

  //if there is no update and Cancel button is pressed, redirect to List companies page
  cancel_contact_persons(){
    this.route.navigate(['/dashboard/ListCompanies']);
  }

  //Add contact persons for the existing customer
  add_contact_persons(){
    //console.log("add");
    this.contact_person.push({ contact_person_id:'', contact_person_name: '', contact_person_title:'', 
      Decision_maker:'', Primary_contact:'', contact_person_category:'',   contact_person_mobile: '',
      contact_person_phone: '', contact_person_email: '',created_at:null
       });
  }

}

