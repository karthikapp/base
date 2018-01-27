import { Component, OnInit , Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-assignedtonameget',
  templateUrl: './assignedtonameget.component.html',
  styleUrls: ['./assignedtonameget.component.css']
})
export class AssignedtonamegetComponent implements OnInit {
@Input() name: string;

  text: string;
  result: any;

  constructor(public afDB: FirebaseService) {}

  ngOnInit() {      
    //console.log('Hello AssignedtonamegetComponent Component', this.name); 
    this.afDB.getUser(this.name).subscribe(value => 
    {
      this.result = value;
      this.text = this.result.name;
      if(this.text == undefined){
        this.text = "NO USER";
      }
      //console.log("Hello",this.text);
    })
  } 
}
