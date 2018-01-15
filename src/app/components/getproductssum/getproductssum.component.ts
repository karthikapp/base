import { Component, OnInit, Input  } from '@angular/core';
import { Productlists } from '../../models/productlists';

@Component({
  selector: 'app-getproductssum',
  templateUrl: './getproductssum.component.html',
  styleUrls: ['./getproductssum.component.css']
})
export class GetproductssumComponent implements OnInit {
  @Input() products: Productlists[];

  text: string;
  productspricelist: any[];
  leadsum: any;

  constructor() {     
  	
  }

  ngOnInit() {
    console.log('Hello GetproductvaluesumComponent Component',this.products);
    this.text = 'Hello World';

    this.leadsum = 0;
    this.productspricelist = []
    let productslist = this.products;
    if (productslist == undefined) {
      this.leadsum = 0
    }
    else 
    {
      productslist.forEach(v => {
      this.productspricelist.push(v.value)
    })

      this.leadsum = this.productspricelist.reduce((a, b) => a + b, 0)
     if(this.leadsum == undefined || isNaN(this.leadsum)) {
        this.leadsum = 0;
      }
      this.leadsum = this.leadsum.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    }
    console.log("ppi",this.leadsum, this.productspricelist, productslist, this.products)
  }

}
