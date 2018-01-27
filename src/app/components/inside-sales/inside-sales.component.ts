import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-inside-sales',
  templateUrl: './inside-sales.component.html',
  styleUrls: ['./inside-sales.component.css']
})
export class InsideSalesComponent implements OnInit, OnDestroy {

	in_sales: any;
	companies: any;
  
  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  this.in_sales = ''; 

  //Leads list
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

            if (v.title == undefined)
            {
              v.title = '';
            }

            if ( v.role.toUpperCase() == "INSIDE SALES" || v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == "PRE-SALES HEAD"
              || v.role.toUpperCase() == "PRESALES"
              || v.role.toUpperCase() == "MASTER")
            {
              this.firebaseservice.getAccounts()
              .takeWhile(() => this.alive)
              .subscribe(companies => {
              this.companies = companies
              console.log(this.companies);
            }) 
              return this.ev = true;
            }
            else
            {
              console.log('No access to this page choco');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page m&m');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }


  ngOnDestroy(){
  	this.alive = false;
  }

}
