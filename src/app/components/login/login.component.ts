import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email: string;
password: string;
user: any;
users: user[];

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() 
  {

 
  }

  doLogin(email, password){
    //console.log(email,password);

    this.user = this.firebaseservice.getUser(email);

    this.users = Object.values(this.user);
    console.log (this.users);


	  this.firebaseservice.loginUser(email,password)
    .then(success =>{
      this.router.navigate(['/dashboard/ListCompanies']);
    })
    .catch( error => {
      console.log(error);
    });
	  
  }

}

export interface user {
  role: string;
  email: string;
  name: string;
  report: string;
  reports_to: string;
  title: string;
  userid: string;
}
