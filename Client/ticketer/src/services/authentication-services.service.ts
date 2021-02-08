import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {
  private authState: User = null;
  constructor(private firebaseAuthenticator: AngularFireAuth) {
    this.firebaseAuthenticator.authState.subscribe(authState => {
      this.authState = authState;
    })
  }

  get isAuthenticated(): boolean {
    return this.authState != null;
  }

  get isEmailVerified(): boolean {
    return this.isAuthenticated ? this.authState.emailVerified : false;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  get userData(): any {
    if (!this.isAuthenticated) {
      return []
    }
    return [
      {
        id: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoUrl: this.authState.photoURL
      }
    ]
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
