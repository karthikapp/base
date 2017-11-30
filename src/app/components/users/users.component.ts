import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[];
  name: string;
  role: string;
  title: string;
  report: string;
  reports_to: any;
  email: string;
  userid: string;
  default_pwd: string;

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
  	
    this.addUserModal_flag = true;
  }

  //Edit User Modal
  editUsersModal():void {
    this.editUserModal_flag = true;
  }

  editUserModal(userid: string){
    //console.log(userid);
    this.firebaseservice.getUser(userid).subscribe(user => {
    this.uname = user.name;
    this.utitle = user.title;
    this.urole = user.role;
    this.ureports_to = user.reports_to;
    this.ureport = user.report;
    this.uemail = user.email;
    this.uuserid = user.userid})

    this.editUsersModal();
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

