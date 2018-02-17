import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-getcompanycontacts',
  templateUrl: './getcompanycontacts.component.html',
  styleUrls: ['./getcompanycontacts.component.css']
})
export class GetcompanycontactsComponent implements OnInit {

 @Input() companyid: any;

  text: any;
  contactlist: any;
  contactslength: any;
  contacts: any;

  constructor(public afDB: FirebaseService ) {
   
  }

  ngOnInit() {
    console.log('Hello from getcompany component ', this.companyid) ; 
    this.text = this.companyid;
    console.log(this.text)
    let contactslist = []
    this.afDB.getContactbyAccount(String(this.companyid)).subscribe( (v) => 
    {
        if (v == null){
          console.log("null detected")
          this.contactslength = 0
        }
        else {
          console.log("non null value",v)
          this.contacts = v;
          this.contactslength = Object.keys(this.contacts).length
        }
    })
  }

}
