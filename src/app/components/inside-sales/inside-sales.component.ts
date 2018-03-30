import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-inside-sales',
  templateUrl: './inside-sales.component.html',
  styleUrls: ['./inside-sales.component.css']
})
export class InsideSalesComponent implements OnInit, OnDestroy {

  @ViewChild('myInput')
myInputVariable: any;

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

  //EDIT
  equote_id: string;
  equote_ref_no: string;
  equote_date: Date;
  ecpo_no: string;
  ecpo_date: Date;
  ecpo_det_id: string;
  eindent_date: Date;
  ecompanyname: string;
  eProduct_name: string;
  euom: string;
  equantity: number;
  esales_rate: number;
  esales_amt: number;
  epurchase_rate: number;
  epurchase_amt: number;
  esupplier_po_no: string;
  esupplier_name: string;
  esupplier_rate: number;
  esupplier_invoice_date : Date;
  esupplier_purchase_date: Date;
  esupplier_invoice_no: string;
  elicense_key: string;
  elic_upload_file_loc: string;
  elicense_from: Date;
  elicense_to: Date;
  einvoice_no: string;
  einvoice_date: Date;
  einvoice_amt: number;
  estatus: string;
  ecreated_by: string;
  eassigned_to: string;
  eremarks: string;
  eregion: string;
  ecreated_at: Date;
  einsalesid: any;
  
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

  editFlag: boolean = false;
  oppoFlag: boolean = true;

  csv: any
  csvData: any;  

  dataCount: any;

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

    this.equote_id = '';
    this.equote_ref_no ='';
    this.equote_date = null;
    this.ecpo_no = '';
    this.ecpo_date = null;
    this.ecpo_det_id = '';
    this.eindent_date = null;
    this.ecompanyname = '';
    this.eProduct_name = '';
    this.euom = '';
    this.equantity = null;
    this.esales_rate = null;
    this.esales_amt = null;
    this.epurchase_rate = null;
    this.epurchase_amt = null;
    this.esupplier_po_no = null;
    this.esupplier_purchase_date = null;
    this.esupplier_invoice_date = null;
    this.esupplier_name = '';
    this.esupplier_rate = null;
    this.esupplier_invoice_no = '';
    this.elicense_key = '';
    this.elic_upload_file_loc = '';
    this.elicense_from = null;
    this.elicense_to = null;
    this.einvoice_no = '';
    this.einvoice_date = null;
    this.einvoice_amt = null;
    this.estatus = '';
    this.ecreated_by = '';
    this.eassigned_to = '';
    this.eremarks = '';
    this.eregion = '';
    this.einsalesid = '';
    this.ecreated_at = this.firebaseservice.created_at;
  }

  ngOnInit() {
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
    this.in_sales.forEach((insales) => {
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

  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         // console.log(file.name);
         // console.log(file.size);
         // console.log(file.type);
         // console.log(files.item(0));
         // console.log(files);
         let reader: FileReader = new FileReader();
         console.log(reader);
         reader.readAsText(file);
         reader.onload = (e) => {
             //console.log(e);
            let csv = reader.result;
            console.log("csv",csv, reader.result, reader.result.split(/\n/), reader.result.split(/\r/), reader.result.split(/\r\n/));
            this.csvSplit(csv);
         }
      }
  }

  csvSplit(csv){
    console.log(csv);
    this.csvData = [];
    //this.needlist = [];
    var re=/\r\n|\n\r|\n|\r/g;
    let allTextLines = csv.replace(re,"\n").split("\n");
      
    //let allTextLines = csv.split(/\n/ || /\r\n/ || /\r/);
    console.log(allTextLines);
    let headers = allTextLines[0].split(',');
    console.log("hd",headers,headers[0], headers[1], headers.length);
    let lines = [];

    if (headers.length == 1){
      alert("no records in csv file");
    }
    else {
      this.dataCount = 0
    for ( let i = 1; i < allTextLines.length; i++) 
    {
      // split content based on comma
      let data = [];
      data = allTextLines[i].split(',');
      
      console.log("data",data.length, data, data[0], data[1]);
        if (data.length == headers.length) {
          this.dataCount = this.dataCount + 1;

        console.log("data",data.length, data, data[0], data[1]);
        //let tarr = [];

         //this.needlist = data;

         // this.needname = data[0];
         // this.needvalue = data[1];

         // let needlist = {
         //   needname: this.needname,
         //   needvalue: this.needvalue
         // }

         let insidesaleslist : any = {
      quote_id: data[0],
      quote_ref_no: data[1],
      quote_date: data[2],
      cpo_no: data[3],
      cpo_date: data[4],
      cpo_det_id: data[5],
      indent_date: data[6],
      customer_name: data[7],
      product: data[8],
      uom: data[9],
      quantity: data[10],
      sales_rate: data[11],
      sales_amt: data[12],
      purchase_rate: data[13],
      purchase_amt: data[14],
      supplier_po_no: data[15],
      supplier_purchase_date: data[16],
      supplier_invoice_date: data[17],
      supplier: data[18],
      supplier_rate: data[19],
      supplier_invoice_no: data[20],
      license_key: data[21],
      license_upload_file_location: data[22],
      license_from: data[23],
      license_to: data[24],
      invoice_no: data[25],
      invoice_date: data[26],
      invoice_amt: data[27],
      status: data[28],
      created_by: data[29],
      assigned_to: data[30],
      remarks: data[31],
      region: data[32],
      created_at: this.created_at
    }

         console.log("nd1", insidesaleslist);
        //tarr.push(this.needlist);

        lines.push(insidesaleslist);
      }
    }

    this.csvData = lines;
    console.log("1",this.csvData.length, this.csvData, lines)

    if(this.csvData.length > 0){
      console.log("ERRORRRR")
    this.firebaseservice.addinsideSalesinoneShot(this.csvData).then((success) => {
      alert("Loaded successfully!!! " + this.dataCount + " Records");
    })
    .catch((error) => {
      console.log("Error:" + error);
    });

  }
  else 
  {
    alert("Check the CSV File!!!");


  }   
  }

}

on_edit_inssales(insalesid){
  console.log(insalesid);

  this.editFlag = true;
  this.oppoFlag = false;

  this.firebaseservice.getInsideSaleID(insalesid).subscribe(insedit => {
    this.equote_id = insedit.quote_id;
    this.equote_ref_no = insedit.quote_ref_no;
    this.equote_date = insedit.quote_date;
    this.ecpo_no = insedit.cpo_no;
    this.ecpo_date = insedit.cpo_date;
    this.ecpo_det_id = insedit.cpo_det_id;
    this.eindent_date = insedit.indent_date;
    this.ecompanyname = insedit.companyname;
    this.eProduct_name = insedit.Product_name;
    this.euom = insedit.uom;
    this.equantity = insedit.quantity;
    this.esales_rate = insedit.sales_rate;
    this.esales_amt = insedit.sales_amt;
    this.epurchase_rate = insedit.purchase_rate;
    this.epurchase_amt = insedit.purchase_amt;
    this.esupplier_po_no = insedit.supplier_po_no;
    this.esupplier_purchase_date = insedit.supplier_purchase_date;
    this.esupplier_invoice_date = insedit.supplier_invoice_date;
    this.esupplier_name = insedit.supplier_name;
    this.esupplier_rate = insedit.supplier_rate;
    this.esupplier_invoice_no = insedit.supplier_invoice_no;
    this.elicense_key = insedit.license_key;
    this.elic_upload_file_loc = insedit.lic_upload_file_loc;
    this.elicense_from = insedit.license_from;
    this.elicense_to = insedit.license_to;
    this.einvoice_no = insedit.invoice_no;
    this.einvoice_date = insedit.invoice_date;
    this.einvoice_amt = insedit.invoice_amt;
    this.estatus = insedit.status;
    this.ecreated_by = insedit.created_by
    this.eassigned_to = insedit.assigned_to;
    this.eremarks = insedit.remarks;
    this.eregion = insedit.region;
    this.einsalesid = insedit.insideSalesid;
    this.ecreated_at = this.firebaseservice.created_at;
    
   });


}

edit_insales_oppo(){
  console.log("hi");
  if(this.equote_id == undefined){
    this.equote_id = '';
  }

  if(this.equote_ref_no == undefined){
    this.equote_ref_no ='';
  }
  
  if(this.equote_date == undefined){  
    this.equote_date = null;
  }

  if(this.ecpo_no == undefined){
    this.ecpo_no = '';
  }

  if(this.ecpo_date == undefined){
    this.ecpo_date = null;
  }

  if(this.ecpo_det_id == undefined){
    this.ecpo_det_id = '';
  }

  if(this.eindent_date == undefined){
    this.eindent_date = null;
  }

  if(this.ecompanyname == undefined){
    this.ecompanyname = '';
  }

  if(this.eProduct_name == undefined){
    this.eProduct_name = '';
  }

  if(this.euom == undefined){
    this.euom = '';
  }

  if(this.equantity == undefined){
    this.equantity = null;
  }

  if(this.esales_rate == undefined){
    this.esales_rate = null;
  }

  if(this.esales_amt == undefined){
    this.esales_amt = null;
  }

  if(this.epurchase_rate == undefined){
    this.epurchase_rate = null;
  }

  if(this.epurchase_amt == undefined){
    this.epurchase_amt = null;
  }

  if(this.esupplier_po_no == undefined){
    this.esupplier_po_no = null;
  }

  if(this.esupplier_purchase_date == undefined){
    this.esupplier_purchase_date = null;
  }

  if(this.esupplier_invoice_date == undefined){
    this.esupplier_invoice_date = null;
  }

  if(this.esupplier_name == undefined){
    this.esupplier_name = '';
  }

  if(this.esupplier_rate ==undefined){
    this.esupplier_rate = null;
  }

  if(this.esupplier_invoice_no == undefined){
    this.esupplier_invoice_no = '';
  }

  if(this.elicense_key == undefined){
    this.elicense_key = '';
  }

  if(this.elic_upload_file_loc == undefined){
    this.elic_upload_file_loc = '';
  }

  if(this.elicense_from == undefined){
    this.elicense_from = null;
  }

  if(this.elicense_to == undefined){
    this.elicense_to = null;
  }

  if(this.einvoice_no == undefined){
    this.einvoice_no = '';
  }

  if(this.einvoice_date == undefined){
    this.einvoice_date = null;
  }

  if(this.einvoice_amt == undefined){
    this.einvoice_amt = null;
  }

  if(this.estatus == undefined){
    this.estatus = '';
  }

  if(this.ecreated_by == undefined){
    this.ecreated_by = '';
  }

  if(this.eassigned_to == undefined){
    this.eassigned_to = '';
  }

  if(this.eremarks == undefined){
    this.eremarks = '';
  }

  if(this.eregion == undefined){
    this.eregion = '';
  }

  if(this.einsalesid == undefined){
    this.einsalesid = '';
  }

   let einsidesaleslist : any = {
      quote_id: this.equote_id,
      quote_ref_no: this.equote_ref_no,
      quote_date: this.equote_date,
      cpo_no: this.ecpo_no,
      cpo_date: this.ecpo_date,
      cpo_det_id: this.ecpo_det_id,
      indent_date: this.eindent_date,
      customer_name: this.ecompanyname,
      product: this.eProduct_name,
      uom: this.euom,
      quantity: this.equantity,
      sales_rate: this.esales_rate,
      sales_amt: this.esales_amt,
      purchase_rate: this.epurchase_rate,
      purchase_amt: this.epurchase_amt,
      supplier_po_no: this.esupplier_po_no,
      supplier_purchase_date: this.esupplier_purchase_date,
      supplier_invoice_date: this.esupplier_invoice_date,
      supplier: this.esupplier_name,
      supplier_rate: this.esupplier_rate,
      supplier_invoice_no: this.esupplier_invoice_no,
      license_key: this.elicense_key,
      license_upload_file_location: this.elic_upload_file_loc,
      license_from: this.elicense_from,
      license_to: this.elicense_to,
      invoice_no: this.einvoice_no,
      invoice_date: this.einvoice_date,
      invoice_amt: this.einvoice_amt,
      status: this.estatus,
      created_by: this.uid,
      assigned_to: this.eassigned_to,
      remarks: this.eremarks,
      region: this.eregion,
      created_at: this.ecreated_at
    }

    console.log("eins", einsidesaleslist, this.einsalesid)

    this.firebaseservice.saveInsideSales(this.einsalesid, einsidesaleslist );

    alert("Updated!!!");
    this.oppoFlag = true;
    this.editFlag = false;
}

cancel_insales_oppo(){
  this.oppoFlag = true;
  this.editFlag = false;
}

reset() {
    this.myInputVariable.nativeElement.value = '';
}

}
