import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, OnDestroy {

  suppliers: any;
  supplier_name: string;
  supplier_id: string;

  supplier: object;
  suppliername: string;
  supplierid: string;

  created_at: Date;

  modalOptions: any;
  addSupplierModal_flag: boolean;
  editSupplierModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  //initializing p to one for pagination pipe
  p: number = 1;

  csvOptions: any;
  suppliersCSV: any [];
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.supplier_name = '';
    this.supplier_id = '';
    this.created_at = firebaseservice.created_at;

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['Supplier_Id','Supplier_Name'] 
    };
  }

  ngOnInit() 
  {
  	//List of Suppliers
  	
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
               this.firebaseservice.getSuppliers()
               .takeWhile(() => this.alive)
               .subscribe(suppliers => {  
                      this.suppliers = suppliers;
                      //console.log(this.suppliers);
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

  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }

  download(){
    this.suppliersCSV = [];

    this.suppliers.map(item => {
        return {
            supplier_id: item.supplier_id,
            supplier_name: item.supplier_name
        }
    }).forEach(item => this.suppliersCSV.push(item));
    new Angular2Csv(this.suppliersCSV, 'Suppliers_Report',this.csvOptions);
  }

  //Add a new Supplier
  on_add_Supplier(){
  	//console.log("add");
    let supplier = {supplier_name: this.supplier_name,
                supplier_id: this.supplier_id,
                created_at: this.created_at
            	}
    this.firebaseservice.addSupplier(supplier);
    this.cancelSupplierModal();
  }

  //Update a Supplier
  on_edit_Supplier(){
    let supplierData = { supplier_name: this.suppliername,
                      created_at: this.created_at
                    }
    this.firebaseservice.saveSupplier(this.supplierid, supplierData)
    this.cancelSupplierModal();
  }

  //Delete a Supplier
  on_delete_Supplier(supplier_id:string){
  	//console.log("delete");
  	this.firebaseservice.deleteSupplier(supplier_id);
  }

//START Supplier
  //Add Supplier Modal
  addSupplierModal(): void {
    this.supplier_name = '';
    this.addSupplierModal_flag = true;
  }

  //Edit NeedList Modal
  editSuppliersModal():void {
    this.editSupplierModal_flag = true;
  }

  editSupplierModal(supplierid: string){
    //console.log(supplierid);
    this.firebaseservice.getSupplier(supplierid)
    .takeWhile(() => this.alivepage)
    .subscribe(supplier => {
    this.suppliername = supplier.supplier_name;
    this.supplierid = supplier.supplier_id})

    this.editSuppliersModal();
  }

  //Cancel Supplier Modal
  cancelSupplierModal(): void {
    this.addSupplierModal_flag = false;
    this.editSupplierModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addSupplierModal();
    this.editSuppliersModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addSupplierModal();
    this.editSuppliersModal(); 
  }
//END MODALS
}
