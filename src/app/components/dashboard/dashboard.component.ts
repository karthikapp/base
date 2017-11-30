import { Component } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {


  	constructor(private firebaseservice : FirebaseService,private router: Router) {
      
    }
  
  	doLogout(){
  		this.firebaseservice.logoutUser()
  		.then(success => {
            this.router.navigate(['/login']);
         })
        .catch( error => {
          console.log(error);
        });

  	}
   
}
