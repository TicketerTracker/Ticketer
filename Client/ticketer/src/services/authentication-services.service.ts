import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {
  constructor(private firebaseAuthenticator: AngularFireAuth) {
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuthenticator.createUserWithEmailAndPassword(email, password)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err))
    })
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuthenticator.signInWithEmailAndPassword(email, password)
        .then((res: any) => resolve(res))
        .catch((err: any) => reject(err))
    })
  }

  public logout(): void {
    this.firebaseAuthenticator.signOut();
  }
}
