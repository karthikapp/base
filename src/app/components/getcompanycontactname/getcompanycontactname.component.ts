import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-getcompanycontactname',
  templateUrl: './getcompanycontactname.component.html',
  styleUrls: ['./getcompanycontactname.component.css']
})
export class GetcompanycontactnameComponent implements OnInit {
@Input() companyid: any;


  text: any;
  contactlist: any;
  contactslength: any;
  contact: any
  contacts: any;

  constructor(public afDB: FirebaseService) {
   
  }

 ngOnInit() {      
    console.log('Hello from getcompany component 123', this.companyid) ; 
    this.text = this.companyid;
    console.log(this.text)
    let contactslist = []
    this.contacts = []
    this.afDB.getAccount(String(this.companyid)).subscribe(v => {

       console.log("companyid", this.companyid)
       
       v.forEach(el => {
         this.contacts.push(el)
       })
       console.log("hello 123",this.contacts)

    })
    
   }
}
