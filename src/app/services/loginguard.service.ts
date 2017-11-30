import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from './firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class LoginguardService {

  constructor(private fbservice: FirebaseService, private afAuth: AngularFireAuth, private router: Router) { }

  after_log_in : boolean = false;

  canActivate(route: ActivatedRouteSnapshot, 
  	state: RouterStateSnapshot) {

    return this.afAuth.authState.map((authState) => {
      if(authState) {
        // user logged in
        this.router.navigateByUrl('dashboard/ListCompanies');
        this.after_log_in = false;
        return this.after_log_in;

      } else {
      	this.after_log_in = true;
      	return this.after_log_in;
      }
      
    }).take(1);
  }

}
