import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from "../../models/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
  showReporterFlag: boolean = false;
  showRecipientFlag: boolean = false;
  showOtherFlag: boolean = false;

  ushowReporterFlag: boolean = false;
  ushowRecipientFlag: boolean = false;
  ushowOtherFlag: boolean = false;

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
  	return this.firebaseservice.getUsers().subscribe(users => {	
  		this.users = users;
        //console.log(users);
    })
  }

  //List Reports_To as name
  onListReportsTo(reportsTo: string){
    if (reportsTo != undefined){
      return this.users.filter(user => {
        return user.userid == reportsTo;
      //user.report == 'recipient';
      
      })
      .map(user => {
        return user.name});    
     }
     else{
       return '';
     }
  }

  //Add a new User
  on_add_user(){
  	//console.log("add");
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
    //Tweak to make reports_to as Empty when report type is either recipient or other
    if(this.ureport == 'recipient' || this.ureport == 'other'){
      this.ureports_to = '';
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

  //Set report based on Title on Add User Modal
  //1. Sales Executive == Reporter
  //2. Sales Manager == Recipient
  //3. All == Others
  onKey(event: KeyboardEvent): void{
    console.log("onkey",this.title, this.report);
    if (this.title =="sales executive"){
      this.report = "reporter"
      this.showRecipientFlag = true;
      this.showReporterFlag = false;
      this.showOtherFlag = false;
    } else if (this.title =="sales manager"){
      this.report = "recipient";
      this.showReporterFlag = true;
      this.showRecipientFlag = false;
      this.showOtherFlag = false;
    } else {
      this.report = "other"
      this.showReporterFlag = false;
      this.showRecipientFlag = false;
      this.showOtherFlag = false;
    }
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
    this.firebaseservice.getUser(userid).subscribe(user => {
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
  onKeyEdit(event: KeyboardEvent): void{
    if (this.utitle =="sales executive"){
      this.ureport = "reporter"
      this.ushowRecipientFlag = true;
      this.ushowReporterFlag = false;
      this.ushowOtherFlag = false;
    } else if (this.utitle =="sales manager"){
      this.ureport = "recipient";
      this.ushowReporterFlag = true;
      this.ushowRecipientFlag = false;
      this.ushowOtherFlag = false;
    } else {
      this.ureport = "other"
      this.ushowReporterFlag = false;
      this.ushowRecipientFlag = false;
      this.ushowOtherFlag = false;
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

