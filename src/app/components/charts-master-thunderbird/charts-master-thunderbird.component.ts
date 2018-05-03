import { Component, OnInit, OnDestroy } from '@angular/core';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from "../../services/firebase.service";
declare var jQuery: any;

@Component({
  selector: 'app-charts-master-thunderbird',
  templateUrl: './charts-master-thunderbird.component.html',
  styleUrls: ['./charts-master-thunderbird.component.css']
})
export class ChartsMasterThunderbirdComponent implements OnInit, OnDestroy {
 yflag: number = 1;
  rflag: number = 2;
catgeory: string = 'ThunderBird';

//Variables
  //Common for All for accessing Users
  uid: string;
  ev: boolean = false;
  alive: boolean = true;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,private afAuth: AngularFireAuth) {
   }


  ngOnInit() {
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

          if(v.title == undefined)
          {
            v.title = '';
          }

          if ( v.role.toUpperCase() == "MASTER")
          {
            return this.ev = true;
          }
          else
          {
            alert('No access to this page');
            return this.ev=false;
          }
        })
      }
      else
      {
        this.router.navigate(['login']);
        return this.ev=false;
      }
    });
  }


    ngAfterViewInit() 
  {
    jQuery('.menu .item').tab();

    //jQuery('.ui.rating').rating();


     
  }

  ngOnDestroy(){
    this.alive = false;
  }


}
