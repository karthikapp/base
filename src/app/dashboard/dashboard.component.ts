import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	edited: boolean = false;

  	constructor() { 
  		
  	}

  	ngOnInit()
  	{
  		
  	}

	activateEl(){
		this.edited = !this.edited;
		console.log(this.edited);
	}

  hideEl()
  {
	  this.edited = false;
  }
}
