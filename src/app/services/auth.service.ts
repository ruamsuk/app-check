import { Injectable, Optional } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  constructor(
    @Optional()
    private auth: Auth
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
  logout() {
    return from(this.auth.signOut());
  }
}
