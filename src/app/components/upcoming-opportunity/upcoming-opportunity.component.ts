import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-upcoming-opportunity',
  templateUrl: './upcoming-opportunity.component.html',
  styleUrls: ['./upcoming-opportunity.component.css']
})
export class UpcomingOpportunityComponent {

  csv: any
  csvData: any

  // needlist: {
  // 	needname: any;
  // 	needvalue: any;
  // } [] = [];

  needname: any;
  needvalue: any;

  constructor(private firebaseservice : FirebaseService) { }

  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         console.log(files.item(0));
         console.log(files);
         let reader: FileReader = new FileReader();
         console.log(reader);
         reader.readAsText(file);
         reader.onload = (e) => {
         		//console.log(e);
            let csv = reader.result;
            console.log("csv",csv, reader.result, reader.result.split(/\n/), reader.result.split(/\r/), reader.result.split(/\r\n/));
            this.csvSplit(csv);
         }
      }
  }

  csvSplit(csv){
  	console.log(csv);
  	//this.needlist = [];
    var re=/\r\n|\n\r|\n|\r/g;
    let allTextLines = csv.replace(re,"\n").split("\n");
      
    //let allTextLines = csv.split(/\n/ || /\r\n/ || /\r/);
    console.log(allTextLines);
    let headers = allTextLines[0].split(',');
    console.log("hd",headers,headers[0], headers[1], headers.length);
    let lines = [];

    for ( let i = 1; i < allTextLines.length; i++) 
    {
      // split content based on comma
      let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
        console.log("data",data.length, data, data[0], data[1]);
        //let tarr = [];

   		  //this.needlist = data;

   			this.needname = data[0];
   			this.needvalue = data[1];

   			let needlist = {
   				needname: this.needname,
   				needvalue: this.needvalue
   			}

   			console.log("nd1", needlist);
        //tarr.push(this.needlist);

        lines.push(needlist);
      }
    }
    this.csvData = lines;
    this.firebaseservice.addneedList(this.csvData);
    console.log("1",this.csvData)
  }

}
