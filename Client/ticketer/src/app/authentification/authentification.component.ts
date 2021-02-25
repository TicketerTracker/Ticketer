import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationServicesService } from 'src/services/authentication-services.service';
import { FirestoreService } from 'src/services/firestore.service';
import { Route } from 'src/models/route';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent implements OnInit {

  private connectionService: ConnectionService;
  public username: string;
  public mailadress: string;
  public password: string;
  public passwordConfirm: string;

  constructor(private authService: AuthenticationServicesService, private fireStore: FirestoreService, connectionService: ConnectionService) {
    this.fireStore.storeTicket({
      start: "Wien",
      end: "Linz",
      price: "16"
    });
    this.connectionService = connectionService;

    //Proof of Concept Firestore Service
    /*
        this.authService.signInWithEmailAndPassword("admin@gmx.at", "admin0306").then(res => {
          let route = new Route(16);
          this.fireStore.storeTicket(route);
          let response = this.fireStore.getAllTicketsOfCurrentUser().subscribe(res => console.log(res))
        }).catch(console.error)
        */
  }

  ngOnInit() {
    //this.getRailway();
  }

  public register() {
    if (this.password != this.passwordConfirm) {
      return alert("Passwords do not match");
    } else if (this.password === "" || this.username === "") {
      return alert("Missing Username or Password");
    } else if (!this.mailadress || this.mailadress.indexOf("@") === -1) {
      return alert("Mssing Mail Adress");
    }

    this.authService.createUserWithEmailAndPassword(this.mailadress, this.password);
  }

  /*getRailway(){
    this.connectionService.getJourneyBetweenTwoStations("8100013","1291501", 5).subscribe(station => console.log(station));
  }*/
}
