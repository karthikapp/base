import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    ngAfterViewInit() 
  {
    jQuery('.menu .item').tab();

    //jQuery('.ui.rating').rating();
  }

}
