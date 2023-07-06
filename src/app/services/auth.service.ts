import { Injectable, Optional } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Optional()
    private auth: Auth
  ) { }

  login(email: string | null | undefined, password: string | null | undefined) {
    return from(signInWithEmailAndPassword(this.auth, <string>email, <string>password));
  }
  logout() {
    return from(this.auth.signOut());
  }
}
