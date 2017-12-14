import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from "../../models/users";
import { AUTH_PROVIDERS, AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: Users[];
  name: string;
  role: string;
  title: string;
  report: string;
  reports_to: any;
  email: string;
  userid: string;
  default_pwd: string;

  user_recipient_list: Users[];
  users_reports_to : Users[];
  username: string;

  user: object;
  uname: string;
  urole: string;
  utitle: string;
  ureport: string;
  ureports_to: any;
  uemail: string;
  uuserid: string;

  created_at: Date;

  modalOptions: any;
  addUserModal_flag: boolean;
  editUserModal_flag: boolean;

  querystring: string;

  selectShowFlag: boolean = false;
  usernameReport: string;
  
  alive: boolean = true;
  alivepage: boolean = true;

  uid: string;
  ev: boolean = false;

  //initializing p to one for pagination pipe
  p: number = 1;
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router, private afAuth: AngularFireAuth) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}

  	this.name = '';
  	this.role = '';
  	this.title = '';
  	this.report = '';
  	this.reports_to = '';
  	this.email = '';
  	this.userid = '';
    this.default_pwd = '';

    this.created_at = firebaseservice.created_at;
  }

  ngOnInit() 
  {
  	//List of Users
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
              this.firebaseservice.getUsers()
              .takeWhile(() => this.alive)
              .subscribe(users => {  
              this.users = users;
              //console.log(users);
              return this.ev=true;
            }) 
          }
            else
            {
              console.log('No access to this page choc');
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

  ngOnDestroy() {
    this.alive = false;
    this.alivepage = false;
  }

  //List Reports_To as name
  onListReportsTo(reportsTo: string, report: string){
    if (reportsTo != undefined && report == 'reporter'){
      return this.users.filter(user => {
        return user.userid == reportsTo;
      })
      .map(user => {
        this.usernameReport = user.name + ' - ' + user.email;
        return this.usernameReport});    
     }
     else if (report == 'recipient' || report == 'other'){
       return 'Self';
     }
     else {
       return '';
     }
  }

  //Add a new User
  on_add_user(){
  	//console.log("add");
    if(this.report == 'recipient' || this.report == 'other'){
      this.reports_to = this.userid;
    }

    let user = { name: this.name,
          			 role: this.role,
          			 title: this.title,
          			 report: this.report,
          			 reports_to: this.reports_to,
          			 email: this.email,
          			 userid: this.userid,
                 created_at: this.created_at
            	}
    this.firebaseservice.createUser(user,this.default_pwd);
    this.cancelUserModal();
  }

  //Update an User
  on_edit_user(){  
    //Tweak to make reports_to as self when report type is either recipient or other
    if(this.ureport == 'recipient' || this.ureport == 'other'){
      this.ureports_to = this.uuserid;
    }

    let userData = { name: this.uname,
              			 role: this.urole,
              			 title: this.utitle,
              			 report: this.ureport,
              			 reports_to: this.ureports_to,
              			 email: this.uemail,
                     created_at: this.created_at
            	     }
    this.firebaseservice.saveUser(this.uuserid, userData)
    this.cancelUserModal();
  }

  //Delete an User
  on_delete_user(userid:string){
  	//console.log("delete");
  	this.firebaseservice.deleteUser(userid);
  }

//START MODALS
  //Add User Modal
  addUserModal(): void {
  	this.name = '';
  	this.role = '';
  	this.title = '';
  	this.report = '';
  	this.reports_to = '';
  	this.email = '';
    this.default_pwd = '';
  	
    this.addUserModal_flag = true;
  }

  //Set reports To based on report on Add User Modal
  //1. Reporter == Show reports To of all the recipients available
  //2. Else no show off reports To
  onSelect(val: any){
    if (val == "reporter")
    {
      this.selectShowFlag = false;

      this.user_recipient_list = this.users.filter((user: Users) => {
        if(user.report != undefined)
        {
          return user.report.indexOf("recipient") !== -1;
        }
      });
    } else {
        this.selectShowFlag = true;
    }
  }


  //Edit User Modal;
  editUsersModal():void {
    this.editUserModal_flag = true;
  }

  editUserModal(userid: string){
    this.firebaseservice.getUser(userid)
    .takeWhile(() => this.alivepage)
    .subscribe(user => {
    this.uname = user.name;
    this.utitle = user.title;
    this.urole = user.role;
    this.ureports_to = user.reports_to;
    this.ureport = user.report;
    this.uemail = user.email;
    this.uuserid = user.userid;
    this.user = user})

    this.editUsersModal();

    this.reportsToChanges();
  }

  //Displays reports_to value when edit user modal is loaded
  reportsToChanges(){
    this.user_recipient_list = this.users.filter((userEdit: Users) => {
      console.log("RPTC",userEdit.report)
      if(userEdit.report != undefined)
      {     
        console.log(userEdit.report, userEdit.report.indexOf("recipient") !== -1)
        return userEdit.report.indexOf("recipient") !== -1;
      }  
    });  
    console.log(this.user_recipient_list)

    if(this.ureport == 'recipient' || this.ureport == 'other'){
      this.user_recipient_list = [];
    }
  }


  //Set report based on Title on Edit User Modal
  //1. Sales Executive == Reporter
  //2. Sales Manager == Recipient
  //3. All == Others
  onSelectEdit(val: any){
    if (val == "reporter")
    {
      this.selectShowFlag = false;

      this.user_recipient_list = this.users.filter((user: Users) => {
        if(user.report != undefined)
        {
          return user.report.indexOf("recipient") !== -1;
        }
      });
    } else {
      this.selectShowFlag = true;
      this.user_recipient_list = [];
    }
  }

  //Cancel User Modal
  cancelUserModal(): void {
    this.addUserModal_flag = false;
    this.editUserModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addUserModal();
    this.editUsersModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addUserModal();
    this.editUsersModal();
  }
//END MODALS
}

