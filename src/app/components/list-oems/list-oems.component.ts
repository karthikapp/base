import { Component, OnInit} from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-oems',
  templateUrl: './list-oems.component.html',
  styleUrls: ['./list-oems.component.css']
})
export class ListOemsComponent implements OnInit {

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

  //initializing p to one for pagination pipe
  p: number = 1;

  constructor(private firebaseservice : FirebaseService, 
    private router: Router) 
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
  	return this.firebaseservice.getOEMs().subscribe(oems => {	
  		      this.oems = oems;
            //console.log(oems);
    })
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
    this.firebaseservice.getOEM(oemid).subscribe(oem => {
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
