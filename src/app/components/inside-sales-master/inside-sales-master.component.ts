import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-inside-sales-master',
  templateUrl: './inside-sales-master.component.html',
  styleUrls: ['./inside-sales-master.component.css']
})
export class InsideSalesMasterComponent implements OnInit, OnDestroy {

	inside_sales: any;
	uid: string;
	ev: boolean = false;
	alive: boolean = true;

	quoteInfo : boolean = false;
	cpoInfo: boolean = false;
	spInfo: boolean = false;
	supInfo: boolean = false;
	licInfo: boolean = false;
	invInfo: boolean = false;
	regInfo: boolean = false;

	constructor(private firebaseservice : FirebaseService, 
		private router: Router, private afAuth: AngularFireAuth) { }

	ngOnInit() {
		this.inside_sales = [];

  	//Inside Sales list
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

  				if (v.title == undefined)
  				{
  					v.title = '';
  				}

  				if ( v.title.toUpperCase() == "PRE-SALES HEAD"
  					|| v.role.toUpperCase() == "MASTER")
  				{
  					this.firebaseservice.getInsideSales()
  					.takeWhile(() => this.alive)
  					.subscribe(insales => {console.log(insales);
  						this.inside_sales = insales}); 

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
  			this.router.navigate(['login']);
  			return this.ev=false;
  		}
  	});
  }
  
  ngOnDestroy(){
  	this.alive = false;
  }

  //Accordion - show and hide for inside sales
  closeAllOppo(): void {
  	this.inside_sales.forEach((insales) => {
  		insales.quoteInfo = false;
  		insales.cpoInfo = false;
  		insales.spInfo = false;
  		insales.supInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;
  	});

  }

  showContent(p, insales) {
  	if(!(insales.quoteInfo || insales.cpoInfo || insales.spInfo || insales.supInfo
  		|| insales.licInfo || insales.invInfo || insales.regInfo)){
  		this.closeAllOppo();
  	}
  	console.log('p',p)
  	if(p == "quote"){
  		insales.quoteInfo = !insales.quoteInfo;
  		insales.cpoInfo = false;
  		insales.spInfo = false;
  		insales.supInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;
  		console.log("p1", insales.quoteInfo)
  	}
  	else if(p == "CPO"){
  		insales.cpoInfo = !insales.cpoInfo;
  		insales.quoteInfo = false;
  		insales.spInfo = false;
  		insales.supInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;

  		console.log("p2", insales.cpoInfo)
  	}
  	else if(p == "SP"){
  		insales.spInfo = !insales.spInfo;
  		insales.cpoInfo = false;
  		insales.quoteInfo = false;
  		insales.supInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;
  		console.log("p3", insales.spInfo)
  	}
  	else if(p == "SUP"){
  		insales.supInfo = !insales.supInfo;
  		insales.cpoInfo = false;
  		insales.quoteInfo = false;
  		insales.spInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;
  		console.log("p4", insales.supInfo)        
  	}
  	else if(p == "LIC"){
  		insales.licInfo = !insales.licInfo;
  		insales.cpoInfo = false;
  		insales.quoteInfo = false;
  		insales.spInfo = false;
  		insales.supInfo = false;
  		insales.invInfo = false;
  		insales.regInfo = false;
  		console.log("p5", insales.licInfo)        
  	}
  	else if(p == "INV"){
  		insales.invInfo = !insales.invInfo;
  		insales.cpoInfo = false;
  		insales.quoteInfo = false;
  		insales.spInfo = false;
  		insales.licInfo = false;
  		insales.supInfo = false;
  		insales.regInfo = false;
  		console.log("p6", insales.invInfo)        
  	}
  	else if(p == "REG"){
  		insales.regInfo = !insales.regInfo;
  		insales.cpoInfo = false;
  		insales.quoteInfo = false;
  		insales.spInfo = false;
  		insales.licInfo = false;
  		insales.invInfo = false;
  		insales.supInfo = false;
  		console.log("p7", insales.regInfo)        
  	}
  }

}
