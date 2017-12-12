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

  constructor(public afDB: FirebaseService ) {
   console.log('Hello from getcompany component ', this.companyid) ; 
    this.text = this.companyid;
    console.log(this.text)
    let contactslist = []
    this.afDB.getAccount(String(this.companyid)).subscribe( (v) => 
    {
        if (v == null){
          console.log("null detected")
          this.contactslength = 0
        }
        else {
          console.log("non null value",v)
          this.contactslength = Object.keys(v).length
        }
    })
  }

  ngOnInit() {
  }

}
