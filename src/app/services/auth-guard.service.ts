import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from './firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService {

  constructor(private fbservice: FirebaseService, private afAuth: AngularFireAuth, private router: Router) {  }

  logged_in : boolean = false;

  canActivate(route: ActivatedRouteSnapshot, 
  	state: RouterStateSnapshot) {

    return this.afAuth.authState.map((authState) => {
      if(authState) {
        // user logged in
        this.logged_in = true;
        return this.logged_in;

      } else {
      	this.router.navigateByUrl('login');
      	this.logged_in = false;
      	return this.logged_in;
      }
      
    }).take(1);
  }

}




