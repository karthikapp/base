import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-inside-sales',
  templateUrl: './inside-sales.component.html',
  styleUrls: ['./inside-sales.component.css']
})
export class InsideSalesComponent implements OnInit, OnDestroy {

	inside_sales: any;
  in_sales: any;
  accounts: any;
  products: any;
  suppliers: any;
  usersbyinsales: any;
  name: any;

  //ADD
  quote_id: string;
  quote_ref_no: string;
  quote_date: Date;
  cpo_no: string;
  cpo_date: Date;
  cpo_det_id: string;
  indent_date: Date;
  companyname: string;
  Product_name: string;
  uom: string;
  quantity: number;
  sales_rate: number;
  sales_amt: number;
  purchase_rate: number;
  purchase_amt: number;
  supplier_po_no: string;
  supplier_name: string;
  supplier_rate: number;
  supplier_invoice_date : Date;
  supplier_purchase_date: Date;
  supplier_invoice_no: string;
  license_key: string;
  lic_upload_file_loc: string;
  license_from: Date;
  license_to: Date;
  invoice_no: string;
  invoice_date: Date;
  invoice_amt: number;
  status: string;
  created_by: string;
  assigned_to: string;
  remarks: string;
  region: string;
  created_at: Date;
  
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
    private router: Router, private afAuth: AngularFireAuth) { 
    this.quote_id = '';
    this.quote_ref_no ='';
    this.quote_date = null;
    this.cpo_no = '';
    this.cpo_date = null;
    this.cpo_det_id = '';
    this.indent_date = null;
    this.companyname = '';
    this.Product_name = '';
    this.uom = '';
    this.quantity = null;
    this.sales_rate = null;
    this.sales_amt = null;
    this.purchase_rate = null;
    this.purchase_amt = null;
    this.supplier_po_no = null;
    this.supplier_purchase_date = null;
    this.supplier_invoice_date = null;
    this.supplier_name = '';
    this.supplier_rate = null;
    this.supplier_invoice_no = '';
    this.license_key = '';
    this.lic_upload_file_loc = '';
    this.license_from = null;
    this.license_to = null;
    this.invoice_no = '';
    this.invoice_date = null;
    this.invoice_amt = null;
    this.status = '';
    this.created_by = '';
    this.assigned_to = '';
    this.remarks = '';
    this.region = '';
    this.created_at = this.firebaseservice.created_at;
  }

  ngOnInit() {
    this.inside_sales = [];
    this.in_sales = []; 
    this.accounts = [];
    this.products = [];
    this.suppliers = [];
    this.usersbyinsales = [];
    this.name = '';

    //Inside Sales list
    this.afAuth.authState
    .takeWhile(() => this.alive)
    .subscribe(data => {
       if (data) {
         this.uid = data.uid

         this.firebaseservice.getUser(this.uid)
          .takeWhile(() => this.alive)
          .subscribe((v) => {

            this.name = v.name;

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

            if ( v.role.toUpperCase() == "INSIDE SALES")
            {

              this.firebaseservice.getInsideSales()
                .takeWhile(() => this.alive)
                .subscribe(insales => {console.log(insales);
                  this.inside_sales = insales}); 

              this.firebaseservice.getInsideSale(this.uid)
                .takeWhile(() => this.alive)
                .subscribe(insale => {console.log(insale);
                  this.in_sales = insale});

              this.firebaseservice.getAccounts()
                .takeWhile(() => this.alive)
                .subscribe(accounts => {console.log(accounts);
                  this.accounts = accounts});  

              this.firebaseservice.getProducts()
                .takeWhile(() => this.alive)
                .subscribe(products => {console.log(products);
                  this.products = products});

              this.firebaseservice.getSuppliers()
                .takeWhile(() => this.alive)
                .subscribe(suppliers => {console.log(suppliers);
                  this.suppliers = suppliers});

              this.firebaseservice.getUsersByInsideSales()
                .takeWhile(() => this.alive)
                .subscribe(usersbyinsales => {console.log(usersbyinsales);
                  this.usersbyinsales = usersbyinsales});

              this.created_by = this.name;
              this.status = "Created";

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

  add_insales_oppo(){
    let inside_sales_oppo : any = {
      quote_id: this.quote_id,
      quote_ref_no: this.quote_ref_no,
      quote_date: this.quote_date,
      cpo_no: this.cpo_no,
      cpo_date: this.cpo_date,
      cpo_det_id: this.cpo_det_id,
      indent_date: this.indent_date,
      customer_name: this.companyname,
      product: this.Product_name,
      uom: this.uom,
      quantity: this.quantity,
      sales_rate: this.sales_rate,
      sales_amt: this.sales_amt,
      purchase_rate: this.purchase_rate,
      purchase_amt: this.purchase_amt,
      supplier_po_no: this.supplier_po_no,
      supplier_purchase_date: this.supplier_purchase_date,
      supplier_invoice_date: this.supplier_invoice_date,
      supplier: this.supplier_name,
      supplier_rate: this.supplier_rate,
      supplier_invoice_no: this.supplier_invoice_no,
      license_key: this.license_key,
      license_upload_file_location: this.lic_upload_file_loc,
      license_from: this.license_from,
      license_to: this.license_to,
      invoice_no: this.invoice_no,
      invoice_date: this.invoice_date,
      invoice_amt: this.invoice_amt,
      status: this.status,
      created_by: this.uid,
      assigned_to: this.assigned_to,
      remarks: this.remarks,
      region: this.region,
      created_at: this.created_at
    }

    console.log("fb2", inside_sales_oppo, this.Product_name, this.cpo_date,this.quote_date)

    this.firebaseservice.addInsideSales(inside_sales_oppo).then(
      success=> {alert ("added successfully"); 
                console.log(success);
                this.clearData();})
  }

  clearData(){
    this.quote_id = '';
    this.quote_ref_no ='';
    this.quote_date = null;
    this.cpo_no = '';
    this.cpo_date = null;
    this.cpo_det_id = '';
    this.indent_date = null;
    this.companyname = '';
    this.Product_name = '';
    this.uom = '';
    this.quantity = null;
    this.sales_rate = null;
    this.sales_amt = null;
    this.purchase_rate = null;
    this.purchase_amt = null;
    this.supplier_po_no = null;
    this.supplier_purchase_date = null;
    this.supplier_invoice_date = null;
    this.supplier_name = '';
    this.supplier_rate = null;
    this.supplier_invoice_no = '';
    this.license_key = '';
    this.lic_upload_file_loc = '';
    this.license_from = null;
    this.license_to = null;
    this.invoice_no = '';
    this.invoice_date = null;
    this.invoice_amt = null;
    this.created_by = this.name;
    this.status = "Created";
    this.assigned_to = '';
    this.remarks = '';
    this.region = '';
    this.created_at = this.firebaseservice.created_at;
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
  

  ngOnDestroy(){
  	this.alive = false;
  }

}
