import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-getproductquantity',
  templateUrl: './getproductquantity.component.html',
  styleUrls: ['./getproductquantity.component.css']
})
export class GetproductquantityComponent implements OnInit {
	@Input() productlist: any;
	productname: any;
	quantity: any;

  constructor() { }

  ngOnInit() {

  }

}
