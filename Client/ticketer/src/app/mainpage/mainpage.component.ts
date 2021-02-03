import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {

  public stationOne: string;
  public stationTwo: string;
  public customPrize: DoubleRange;
  public checkBoxPrize: boolean = false;

  constructor() { }

  ngOnInit() { }

  public tracking(e: any) {

  }
}


