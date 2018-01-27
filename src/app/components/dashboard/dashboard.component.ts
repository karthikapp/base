import { Component } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {

  uid: string;
  showAdminFlag: boolean = false;
  showReportsFlag: boolean = false;
  showOthersFlag: boolean = false;
  report: string;
  role: string;
  title: string;
  name: string;


  constructor(private firebaseservice : FirebaseService,
              private router: Router, 
              private afAuth: AngularFireAuth) {
    //Authenticating the dashboard page to check if the user is ADMIN / REPORTER / RECIPIENT / OTHERS
    this.afAuth.authState.subscribe(data => {
    if (data) {
      this.uid = data.uid;
      
      this.firebaseservice.getUser(this.uid).subscribe(val =>{
        this.name = val.name;
          if (val.report == undefined)
          {
            val.report = '';
          }

          if (val.role == undefined)
          {
            val.role = '';
          }

          if (val.title == undefined)
          {
            val.title = '';
          }

          this.report = val.report;
          this.role =val.role;
          this.title = val.title;

          //Flags to set the component based on the USERS
          if (val.role.toUpperCase() == "ADMIN"){
            this.showAdminFlag = true;
            this.showReportsFlag = false;
            this.showOthersFlag = false;
           } else if(val.report.toUpperCase() == "REPORTER" 
             || val.report.toUpperCase() == "RECIPIENT" 
             || val.report.toUpperCase() == "OTHER"
             || val.title.toUpperCase() == "PRE-SALES HEAD"
             || val.role.toUpperCase() == "PRESALES" 
             || val.role.toUpperCase() == "MASTER"){
            this.showReportsFlag = true;
            this.showAdminFlag = false;
            this.showOthersFlag = false;
           } else if (val.role == '' || val.report == ''){
            this.showOthersFlag = true;
            this.showReportsFlag = false;
            this.showAdminFlag = false;
           }  
          })
        }
      })
    }

    //Logout from any page once logged in and not return to any page
  	doLogout(){
  		this.firebaseservice.logoutUser()
  		.then(success => {  
        this.router.navigateByUrl('/login');
       
      })
      .catch( error => {
        console.log(error);
      });
  	}
   
}
