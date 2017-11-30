import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email:string;
password: string;
users: user;
//userCount: number;

form: FormGroup;

  constructor(private firebaseservice : FirebaseService, private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    //this.userCount = null;
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
              console.log(user.uid);
              //Use the uid in the login and get the userProfile info from '/user'
              this.firebaseservice.getUser(user.uid).subscribe(
                  users => { this.users = users;
                  console.log(users, this.users, this.users.role, this.users.email);
                 
                  //Check if the role is ADMIN, then navigate to dashbord
                  //Else, error
                  if(this.users.email != undefined) 
                  {
                    if(this.users.role != undefined) 
                    {
                      if (this.users.role.toUpperCase() == 'ADMIN') 
                      {
                        this.router.navigateByUrl('/dashboard/ListCompanies');
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

    /*
    //Get userProfile Information
    this.firebaseservice.getUser(this.form.value.email).subscribe(
      user => {
      this.user = user;
      this.userCount = Object.keys(this.user).length;
      //console.log("C1", this.user, this.userCount);

    //Based on user's role, login happens only if he/she is an "ADMIN"
    //1. User Profile doesn't exist in '/user'
    //2. User Email has more than one user Profile in '/user'
    //3. If user role is admin, it will login only when email and password is correct
    //4. Else, set the role as adminstrator.

      if (this.userCount == 0){
        alert("No existing userProfile for this email id");
        return '';
      }
      else if(this.userCount > 1){
        alert("More users with same email id");
        return '';
      } 
      else if(this.user[0].role != undefined) {
        if (this.user[0].role.toUpperCase() == 'ADMIN') 
        {
          this.firebaseservice.loginUser(this.form.value.email,this.form.value.password)
            .then(success =>{
              this.router.navigate(['/dashboard/ListCompanies']);
            })
            .catch( error => {
              alert("Incorrect username/ password");
              //console.log(error);
            });
        }
        else {
          alert("Login as adminstrator");
          return '';
        }  
      } 
    });*/
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

