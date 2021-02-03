import { Component, OnInit } from '@angular/core';
import { AuthenticationServicesService } from 'src/services/authentication-services.service';

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


  constructor(private authService: AuthenticationServicesService) { }

  ngOnInit() { }

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
}
