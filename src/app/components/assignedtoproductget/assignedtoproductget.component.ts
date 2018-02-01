import { Component, OnInit , Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-assignedtoproductget',
  templateUrl: './assignedtoproductget.component.html',
  styleUrls: ['./assignedtoproductget.component.css']
})
export class AssignedtoproductgetComponent implements OnInit {
  @Input() name: string;

  text: string;
  result: any;

  constructor(public afDB: FirebaseService) {}

  ngOnInit() {      
    //console.log('Hello AssignedtoproductgetComponent Component', this.name); 
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
