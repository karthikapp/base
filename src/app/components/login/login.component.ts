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

  constructor(private firebaseservice : FirebaseService, private router: Router) { }

  ngOnInit() 
  {

 
  }

  doLogin(email, password){
    //console.log(email,password);
	  this.firebaseservice.loginUser(email,password)
    .then(success =>{
      this.router.navigate(['/dashboard/ListCompanies']);
    })
    .catch( error => {
      console.log(error);
    });
	  
  }

}
