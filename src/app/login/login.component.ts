import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email: string;
password: string;

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() {
 
  }

  doLogin(email, password){

  	console.log(email,password);
	this.firebaseservice.loginUser(this.email,this.password);

	this.router.navigateByUrl('/dashboard');
  }

}
