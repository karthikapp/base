import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-chart-masters',
  templateUrl: './chart-masters.component.html',
  styleUrls: ['./chart-masters.component.css']
})
export class ChartMastersComponent implements OnInit {
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
