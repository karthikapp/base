import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-need-list',
  templateUrl: './need-list.component.html',
  styleUrls: ['./need-list.component.css']
})
export class NeedListComponent implements OnInit, OnDestroy{

  needlists: any;
  need_name: string;
  need_id: string;

  needlist: object;
  needname: string;
  needid: string;

  created_at: Date;

  modalOptions: any;
  addNeedlistModal_flag: boolean;
  editNeedlistModal_flag: boolean;

  querystring: string;

  uid: string;
  ev: boolean = false;

  alive: boolean = true;
  alivepage: boolean = true;

  //initializing p to one for pagination pipe
  p: number = 1;

  csvOptions: any;
  need_length: any;
  needlistsCSV: any [];
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.need_name = '';
    this.need_id = '';
    this.created_at = firebaseservice.created_at;

    this.csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    headers: ['NeedList_Id','NeedList_Name'] 
    };
  }

  ngOnInit() 
  {
  	//List of NeedLists
  	

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
               this.firebaseservice.getNeedLists()
               .takeWhile(() => this.alive)
               .subscribe(needlists => {  
                      this.needlists = needlists;
                      //console.log(needlists);
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

    this.needlistsCSV = [];

    this.needlists.map(item => {
        return {
            need_id: item.need_id,
            need_name: item.need_name
        }
    }).forEach(item => this.needlistsCSV.push(item));

    new Angular2Csv(this.needlistsCSV, 'NeedList_Report',this.csvOptions);
  }

  //Add a new NeedList
  on_add_Needlist(){
  	//console.log("add");
    let needlist = {need_name: this.need_name,
                need_id: this.need_id,
                created_at: this.created_at
            	}
    this.firebaseservice.addNeedList(needlist);
    this.cancelneedlistModal();
  }

  //Update an NeedList
  on_edit_Needlist(){
    let needlistData = { need_name: this.needname,
                      created_at: this.created_at
                    }
    this.firebaseservice.saveNeedList(this.needid, needlistData)
    this.cancelneedlistModal();
  }

  //Delete an NeedList
  on_delete_Needlist(need_id:string){
  	//console.log("delete");
  	this.firebaseservice.deleteNeedList(need_id);
  }

//START NeedList
  //Add NeedList Modal
  addNeedlistModal(): void {
    this.need_name = '';
    this.addNeedlistModal_flag = true;
  }

  //Edit NeedList Modal
  editNeedListsModal():void {
    this.editNeedlistModal_flag = true;
  }

  editNeedListModal(needid: string){
    //console.log(needid);
    this.firebaseservice.getNeedList(needid)
    .takeWhile(() => this.alivepage)
    .subscribe(need => {
    this.needname = need.need_name;
    this.needid = need.need_id})

    this.editNeedListsModal();
  }

  //Cancel Need List Modal
  cancelneedlistModal(): void {
    this.addNeedlistModal_flag = false;
    this.editNeedlistModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addNeedlistModal();
    this.editNeedListsModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addNeedlistModal();
    this.editNeedListsModal(); 
  }
//END MODALS
}

