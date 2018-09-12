import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-typeofcontact',
  templateUrl: './typeofcontact.component.html',
  styleUrls: ['./typeofcontact.component.css']
})
export class TypeofcontactComponent implements OnInit , OnDestroy{

  typeofcontacts: any;
  contact_type: string;
  contact_key: string;

  typeofcontact: object;
  contacttype: any;
  contactkey: string;

  modalOptions: any;
  addContactTypeModal_flag: boolean;
  editContactTypeModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  //initializing p to one for pagination pipe
  p: number = 1;

  csvOptions: any;
  contact_length: any;
  contacttypeCSV: any [];

  csvtypeofcontact: any [];
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.contact_key = '';
    this.contact_type = '';

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['Contact Key','Contact Type'] 
    };
  }

  ngOnInit() 
  {
  	//List of Contact type
  	this.typeofcontacts = []
    this.typeofcontact = []
    this.csvtypeofcontact = []

    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         //console.log("email",this.uid)
         
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
               this.firebaseservice.getContactTypes()
               .takeWhile(() => this.alive)
               .subscribe(contacttypes => {  
                  if(contacttypes.exists())
               		{
                    this.typeofcontacts = contacttypes.val();
                    this.csvtypeofcontact = Object.entries(this.typeofcontacts)
                  }
                  //console.log("ty", this.csvtypeofcontact, this.typeofcontacts)
                  return this.ev = true;
              })
            }
            else
            {
              console.log('No access to this page');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }

  download(){

    this.contacttypeCSV = [];

    this.csvtypeofcontact.map(item => {
        return {
             contact_key: Object.values(item)
        }
    }).forEach(item => this.contacttypeCSV.push(item));

    // this.csvtypeofcontact.forEach(item => {
    //   console.log("item", item)
    //   this.contacttypeCSV.push(Object.keys(item),Object.values(item))
    // });

    new Angular2Csv(this.contacttypeCSV, 'Contact_Type_Report',this.csvOptions);
  }

  //Add a new Contact Type
  on_add_ContactType(){
  	//console.log("add");
    let contacttype = this.contact_type
    this.firebaseservice.addContactType(contacttype);
    this.cancelcontacttypeModal();
  }

  //Update an Contact Type
  on_edit_ContactType(){
    let contacttypeData = this.contacttype
    //console.log("log", contacttypeData)
    this.firebaseservice.saveContactType(this.contactkey, contacttypeData)
    this.cancelcontacttypeModal();
  }

  //Delete an Contact Type
  on_delete_ContactType(contactkey:string){
  	//console.log("delete");
  	this.firebaseservice.deleteContactType(contactkey);
  }

//START Contact Type
  //Add Contact Type Modal
  addContactTypeModal(): void {
    this.contact_type = '';
    this.addContactTypeModal_flag = true;
  }

  //Edit Contact Type Modal
  editContactTypesModal():void {
    this.editContactTypeModal_flag = true;
  }

  editContactTypeModal(contactkey: string){
    //console.log(contactkey);
    this.typeofcontact = [];
    this.contacttype = [];
    this.contactkey = ''

    this.firebaseservice.getContactType(contactkey)
    .takeWhile(() => this.alivepage)
    .subscribe(contacttype => {
    this.typeofcontact = contacttype;
    this.contacttype = Object.values(contacttype);
    this.contactkey = contacttype.$key
	})

    this.editContactTypesModal();
  }

  //Cancel Contact Type Modal
  cancelcontacttypeModal(): void {
    this.addContactTypeModal_flag = false;
    this.editContactTypeModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addContactTypeModal();
    this.editContactTypesModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addContactTypeModal();
    this.editContactTypesModal(); 
  }
//END MODALS

}
