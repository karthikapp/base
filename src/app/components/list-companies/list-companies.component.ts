import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router'; 
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {

  accounts: any[];
  querystring: string;

  totalCounts: number;
  val: any;

  uid: string;
  ev: boolean = false;

  //initializing p to one for pagination pipe
  p: number = 1;

  alive: boolean = true;

  constructor(private firebaseservice : FirebaseService, private router: Router, private afAuth: AngularFireAuth) { 
  }

  ngOnInit() 
  {
    //Get current user details
    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         console.log("email",this.uid)
         
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
              //List of companies/accounts
              this.firebaseservice.getAccounts()
              .takeWhile(() => this.alive)
              .subscribe(
                accounts => {  
                  this.accounts = accounts;
                  this.totalCounts = Object.keys(this.accounts).length;
                  return this.ev=true;
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
  }

  //Display the count of Contact Persons 
  countContactPerson(contct){
    if(contct == undefined)
    {
      return "None";
    } else {
      return Object.keys(contct).length;
    }   
  }

  //To add an Account, navigate to AddCompanies Page
  on_add_account(){
    this.router.navigate(['/dashboard/AddCompanies']);
  }

  //To edit an Account, navigate to EditCompanies Page with companyid
  on_edit_account(companyid){
    //console.log('companyid',companyid);
    this.router.navigate(['/dashboard/EditCompanies/:companyid',{'companyid': companyid, skipLocationChange: true}]);
  }

  //Delete a particular account by sending companyid
  on_delete_account(companyid){
    this.firebaseservice.deleteAccount(companyid);
  }


}

