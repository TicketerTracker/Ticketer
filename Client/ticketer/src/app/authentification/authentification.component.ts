import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent implements OnInit {

  public username: string;
  public mailadress: string;
  public password: string;
  public passwordConfirm: string;


  constructor() { }

  ngOnInit() { }

  public register() {
    if (this.password != this.passwordConfirm) {
      return alert("wrong password");
    }
    if (this.password === "" || this.passwordConfirm === "" || this.mailadress === "" || this.username === "") {
      return alert("type in every value");
    }
    if (this.mailadress && this.mailadress.indexOf("@") === -1) {
      return alert("please enter valid mail adress");
    }

  }
}
