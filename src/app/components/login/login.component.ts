import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email:string;
  password: string;
  users: user;

  form: FormGroup;

  uid: any;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  constructor(private firebaseservice : FirebaseService, private router: Router, 
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth) { }

  ngOnInit() 
  {
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
            this.router.navigate(['/dashboard/ListCompanies']);
            return this.ev = true;
          } else if (v.report.toUpperCase() == "REPORTER" 
            || v.report.toUpperCase() == "RECIPIENT" 
            || v.report.toUpperCase() == "OTHER") {
            this.router.navigate(['/dashboard/MyLeads']);
            return this.ev = true;
          } else {
            this.router.navigate(['login']);
            return this.ev=false;
          }
        }) 
      }
      else
      {
        this.router.navigate(['login']);
        return this.ev=false;
      } 
    })

    this.email = '';
    this.password = '';

    this.form = this.formBuilder.group({
      email: new FormControl(this.email, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

  doLogin(){
   this.firebaseservice.loginUser(this.form.value.email,this.form.value.password)
      .then(user =>{
        //Use the uid in the login and get the userProfile info from '/user'
        this.firebaseservice.getUser(user.uid)
        .takeWhile(() => this.alivepage)
        .subscribe(
          users => {this.users = users;
                 
          //Check if 
          //1.role is ADMIN, then navigate to dashboard/ListCompanies
          //2.report is reporter/recipient/others, then navigate to leads page
          //Else, error
          if(this.users.role == undefined)
          {
            this.users.role = '';
          }
          if (this.users.report == undefined)
          {
            this.users.report = '';
          }

          if(this.users.email != undefined) 
          {
            if(this.users.role != '' || this.users.report != '') 
            {
              if (this.users.role.toUpperCase() == 'ADMIN') 
              {
                this.router.navigate(['/dashboard/ListCompanies']);
              }
              else if (this.users.report.toUpperCase() == "REPORTER" 
                      || this.users.report.toUpperCase() == "RECIPIENT" 
                      || this.users.report.toUpperCase() == "OTHER")
              {
                this.router.navigate(['/dashboard/MyLeads']);
              }
              else 
              {
                alert ("Check your access rights!!!!");
              }
            }
            else{
              alert ("Check your access rights!!!!");
            }
          }
          else {
            alert ("UserProfile doesn't exist :-(");
          }
        });
      })
      .catch( error => {
        alert("Incorrect username/ password");
    });
  }


  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }
}


export interface user {
  role?: string;
  email?: string;
  name?: string;
  report?: string;
  reports_to?: string;
  title?: string;
  userid?: string;
}

