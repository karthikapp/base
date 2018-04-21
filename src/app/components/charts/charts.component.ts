import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  yflag: number = 1;
  rflag: number = 2;

  constructor() { }

  ngOnInit() {

  }

    ngAfterViewInit() 
  {
    jQuery('.menu .item').tab();

    //jQuery('.ui.rating').rating();
  }

}
