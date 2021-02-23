import { TileComponent } from './../tile/tile.component';
import { DashboardTileComponent } from './../dashboard-tile/dashboard-tile.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public text: string = "Money Saved"


  constructor() { }

  ngOnInit() {

  }




}



