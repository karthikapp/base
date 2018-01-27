import { Component , Input, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-reversegeocoder',
  templateUrl: './reversegeocoder.component.html',
  styleUrls: ['./reversegeocoder.component.css']
})
export class ReversegeocoderComponent implements OnInit {
@Input() lat: string;
 @Input() long: string;
  text: string;
  result : any;
  address: any;

  constructor(private http:Http) {
    console.log('Hello ReversegeocoderComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() 
  { 
    let geostring = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + String(this.lat) + ',' + String(this.long) + '&key=AIzaSyB71eSGZMC1LlcsmMwzXShJ-hnxSsgMzV0'
    console.log(geostring)
  	this.http.get(geostring).map((res: Response) =>
    	res.json()).subscribe(res => 
    	{this.result =  res
    	 this.address = this.result.results[0].formatted_address
    	 console.log(this.result.results[0].formatted_address)
    })
  }

}
