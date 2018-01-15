import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-upcoming-lead',
  templateUrl: './upcoming-lead.component.html',
  styleUrls: ['./upcoming-lead.component.css']
})
export class UpcomingLeadComponent implements OnInit {

v: any;
u: any;
p: any;
name: any;


  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {

  	this.firebaseservice.getopportunities().subscribe(v=> this.v = v);

  	this.firebaseservice.getAllLeads().subscribe(u => this.u = u);

  //this.firebaseservice.roughcheck().subscribe(p => this.p = p);

  }


}
