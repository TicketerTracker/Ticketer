import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from 'src/models/route';
import { AuthenticationServicesService } from './authentication-services.service';
import { map } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private authService: AuthenticationServicesService) { }

  public storeTicket(object: Route) {
    let uid = this.authService.currentUserId;
    this.firestore.collection<any>('Ticket').add(Object.assign({}, { uid }, object));
  }

  public getAllTicketsOfCurrentUser() {
    let uid = this.authService.currentUserId;
    let tickets = this.firestore
      .collection<any>('Ticket', (ref) => ref.where("uid", '==', uid))
      .get()
      .pipe(map(item => {
        return item.docs.map(data => data.data())
      }))

    return tickets
  }
}
