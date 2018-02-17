import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-oppodetail',
  templateUrl: './oppodetail.component.html',
  styleUrls: ['./oppodetail.component.css']
})
export class OppodetailComponent implements OnInit, OnDestroy {

	lead_title : any;
	oppo: any;
	oppoid: any;
  
  	uid: string;
  	ev: boolean = false;

  	alive: boolean = true;

  constructor(private firebaseservice : FirebaseService, 
    private route: Router, private afAuth: AngularFireAuth, private router: ActivatedRoute) { }

  ngOnInit() {
  	this.lead_title= '';

  	//Display the leads detail based on lead key on respective fields
  	this.oppoid = this.router.snapshot.params['oppoid'];

  //Leads list
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

            if (v.title == undefined){
              v.title = '';
            }

            if (v.report.toUpperCase() == 'REPORTER'
              || v.report.toUpperCase() == 'RECIPIENT'
              || v.title.toUpperCase() == 'PRE-SALES HEAD'
              || v.role.toUpperCase() == "PRESALES"
              || v.role.toUpperCase() == "MASTER"
              || v.role.toUpperCase() == "INSIDE SALES")
            {
              this.firebaseservice.getOpportunitiesByKey(this.oppoid)
              .takeWhile(() => this.alive)
              .subscribe(oppo => {
              
              this.lead_title = oppo.lead_title;
              this.oppo = oppo;
              console.log("oppo",this.oppo)
              

            }) 
              return this.ev = true;
            }
            else
            {
              console.log('No access to this page choco');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page m&m');
            this.route.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
