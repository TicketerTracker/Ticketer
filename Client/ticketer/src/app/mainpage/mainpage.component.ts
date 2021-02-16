import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, FormBuilder],
  declarations: [MainpageComponent]
})


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],


})



export class MainpageComponent implements OnInit {



  public stations = ["Wien", "Linz", "Graz", "Hamburg", "Steyregg", "Dschibutti"];


  public stationOne: string;
  public stationTwo: string;
  public customPrize: DoubleRange;
  public checkBoxPrize: boolean = false;
  public showDropDown: boolean = false;



  constructor() { }

  ngOnInit() { }

  public toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  public selectStation(value) {

  }

  public tracking(e: any) {

  }
}


