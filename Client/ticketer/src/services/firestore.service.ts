import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  public storeTicket(object: any) {
    this.firestore.collection<any>('Ticket').add(object);
  }
}
