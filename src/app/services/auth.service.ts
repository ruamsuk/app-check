import { Injectable, Optional } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // currentUser$ = authState(this.auth);
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  constructor(
    @Optional()
    private auth: Auth,
    private afAuth: AngularFireAuth
  ) {
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.loggedIn.next(true);
    //   } else {
    //     this.loggedIn.next(false);
    //   }
    // })
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    return from(signInWithEmailAndPassword(this.auth, <string>email, <string>password));
  }

  async sendEmail() {
    return await this.afAuth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    });
  }
  logout() {
    return from(this.auth.signOut());
  }
}
