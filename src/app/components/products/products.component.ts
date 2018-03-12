import { Component, OnInit, OnDestroy} from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any;
  Product_name: string;
  Brand: string;
  product_key: string;

  product: object;
  productname: string;
  brands: string
  productkey: string;

  created_at: Date;

  modalOptions: any;
  addProductModal_flag: boolean;
  editProductModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;
  alive: boolean = true;
  alivepage: boolean = true;

  //initializing p to one for pagination pipe
  p: number = 1;

  csvOptions: any;
  productsCSV: any[];
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.Product_name = '';
    this.Brand = '';
    this.product_key = '';
    this.created_at = firebaseservice.created_at;

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['Product ID', 'Product_Name','Brand'] 
    };
  }

  ngOnInit() 
  {
  	//List of Products
  	

    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid
         console.log("email",this.uid)
         
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

            if (v.role.toUpperCase() == 'ADMIN')
            {
              this.firebaseservice.getProducts()
              .takeWhile(() => this.alive)
              .subscribe(products => {  
              this.products = products;
              //console.log(products);
              return this.ev = true;
            })

            }
            else
            {
              console.log('No access to this page');
              alert('No access to this page');
              return this.ev=false;
            }
         })
       }
       else{
            console.log('No access to this page');
            this.router.navigate(['login']);
            return this.ev=false;
       }
     });
  }

  download(){
    this.productsCSV = [];

    this.products.map(item => {
        return {
            productkey: item.productkey,
            Product_name: item.Product_name,
            Brand: item.Brand
        }
    }).forEach(item => this.productsCSV.push(item));
    new Angular2Csv(this.productsCSV, 'Products_Report',this.csvOptions);
  }

  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }
  //Add a new Product
  on_add_product(){
  	//console.log("add");

    let product = { Product_name: this.Product_name,
                	Brand: this.Brand,
                	productkey: this.product_key,
                	created_at: this.created_at
            	}
    this.firebaseservice.addProduct(product);
    this.cancelProductModal();
  }

  //Update an Product
  on_edit_product(){
    let productData = { Product_name: this.productname,
                		Brand: this.brands,
                		created_at: this.created_at
                    }
    this.firebaseservice.saveProduct(this.productkey, productData)
    this.cancelProductModal();
  }

  //Delete an Product
  on_delete_product(productkey:string){
  	//console.log("delete");
  	this.firebaseservice.deleteProduct(productkey);
  }

//START MODALS
  //Add Product Modal
  addProductModal(): void {
    this.Product_name = '';
    this.Brand = '';
    this.addProductModal_flag = true;
  }

  //Edit Product Modal
  editProductsModal():void {
    this.editProductModal_flag = true;
  }

  editProductModal(productkey: string){
    //console.log(productkey);
    this.firebaseservice.getProduct(productkey)
    .takeWhile(() => this.alivepage)
    .subscribe(product => {
    this.productname = product.Product_name;
    this.brands = product.Brand;
    this.productkey = product.productkey})

    this.editProductsModal();
  }

  //Cancel Product Modal
  cancelProductModal(): void {
    this.addProductModal_flag = false;
    this.editProductModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addProductModal();
    this.editProductsModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addProductModal();
    this.editProductsModal();
  }
//END MODALS


}
