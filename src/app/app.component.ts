import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from './services/firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 /* title = 'app';

  uid: any;
  role: any;


constructor(private fbservice: FirebaseService, 
    private afAuth: AngularFireAuth){

   this.afAuth.authState.map((authState) => {
    	if (authState) {
         //console.log(data);
         this.uid = authState.uid;

         this.fbservice.getUser(this.uid).subscribe(val =>{
          	if (val.report == undefined)
          	{
           	 	val.report = '';
          	}


          	if (val.role == undefined)
          	{
            	val.role = '';
          	}

			if(val.role == "ADMIN"){
				this.role = val.role
			}
			else if (val.report.toUpperCase() == "REPORTER" 
             || val.report.toUpperCase() == "RECIPIENT" 
             || val.report.toUpperCase() == "OTHER"){
						  this.role = val.report
			}
			else {
				this.role = '';
			}
		})
    
	}
     })

}*/
}
