import { Component, OnInit , Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-assignedtocompanyget',
  templateUrl: './assignedtocompanyget.component.html',
  styleUrls: ['./assignedtocompanyget.component.css']
})
export class AssignedtocompanygetComponent implements OnInit {
  @Input() name: string;

  text: string;
  result: any;

  constructor(public afDB: FirebaseService) {}

  ngOnInit() {      
    //console.log('Hello AssignedtocompanygetComponent Component', this.name); 
    this.afDB.getAccount(this.name).subscribe(value => 
      {
        this.result = value;
        this.text = this.result.name;
        if(this.text == undefined){
          this.text = "None";
      }
      //console.log("Hello",this.text);
    })
  } 

}
