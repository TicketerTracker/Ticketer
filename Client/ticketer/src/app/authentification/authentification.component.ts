import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/services/firestore.service';

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


  constructor(private fireStore: FirestoreService) {
    this.fireStore.storeTicket({
      start: "Wien",
      end: "Linz",
      price: "16"
    })
  }

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
