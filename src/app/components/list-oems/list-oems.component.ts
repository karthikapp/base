import { Component, OnInit, OnDestroy} from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-list-oems',
  templateUrl: './list-oems.component.html',
  styleUrls: ['./list-oems.component.css']
})
export class ListOemsComponent implements OnInit, OnDestroy {

	oems: any;
  oem_name: string;
  oem_id: string;

  oem: object;
  oemname: string;
  oemid: string;

  created_at: Date;

  modalOptions: any;
  addOEMModal_flag: boolean;
  editOEMModal_flag: boolean;

  querystring: string;

  uid: any;
  ev: boolean = false;

  //initializing p to one for pagination pipe
  p: number = 1;

  alive: boolean = true;
  alivepage: boolean = true;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router,
    private afAuth: AngularFireAuth) 
  { 
      this.modalOptions = 
      {
        "size": "small",
        "type": "default",
        "closeable": true
      }
      this.oem_name = '';
      this.oem_id = '';
      this.created_at = firebaseservice.created_at;


    }

  ngOnInit() 
  {
  	//List of OEMs


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

            if (v.role.toUpperCase() == 'ADMIN')
            {
              this.firebaseservice.getOEMs()
              .takeWhile(() => this.alive)
              .subscribe(oems => {  
              this.oems = oems;

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

  ngOnDestroy(){
    this.alive = false;
  }

  //Add a new OEM
  on_add_oem(){
  	//console.log("add");
    let oem = { oem_name: this.oem_name,
                oem_id: this.oem_id,
                created_at: this.created_at
              }
    this.firebaseservice.addOEM(oem)
    this.cancelOEMModal();
  }

  //Update an OEM
  on_edit_oem(){
    let oemData = { oem_name: this.oemname,
                    created_at: this.created_at
                  }
    this.firebaseservice.saveOEM(this.oemid, oemData)
    this.cancelOEMModal();

  }

  //Delete an OEM
  on_delete_oem(oem_id:string){
  	//console.log("delete");
  	this.firebaseservice.deleteOEM(oem_id);
  }

//START MODALS
  //Add OEM Modal
  addOEMModal(): void {
    this.oem_name = '';
    this.addOEMModal_flag = true;
  }

  //Edit Event Modal
  editOEMsModal():void {
    this.editOEMModal_flag = true;
  }

  editOEMModal(oemid: string){
    //console.log(oemid);
    this.firebaseservice.getOEM(oemid)
    .takeWhile(() => this.alivepage)
    .subscribe(oem => {
    this.oemname = oem.oem_name;
    this.oemid = oem.oem_id})

    this.editOEMsModal();
  }

  //Cancel Event Modal
  cancelOEMModal(): void {
    this.addOEMModal_flag = false;
    this.editOEMModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addOEMModal();
    this.editOEMsModal();
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addOEMModal();
    this.editOEMsModal();
  }
//END MODALS
}
