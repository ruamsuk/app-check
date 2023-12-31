import { Injectable, Optional } from '@angular/core';
import {
  collection,
  collectionData,
  query,
  orderBy,
  Firestore,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    @Optional()
    private firestore: Firestore,
    // private authService: AuthService
    ) { }

  // addUser(user: { uid: string; displayName: string | null | undefined; email: string | null | undefined }) {
  //   const ref = doc(this.firestore, 'users', `${user.uid}`);
  //   return from(setDoc(ref, user));
  // }
  addUser(user: User) {
    const docRef = collection(this.firestore, 'users');
    return from(addDoc(docRef, user));
  }

  updateUser(user: User) {
    const ref = doc(this.firestore, 'users', `${user.id}`);
    return from(updateDoc(ref, {...user}));
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'users');
    const userQuery = query(dbInstance, orderBy('firstName'));
    return collectionData(userQuery, {idField: 'id'});
  }

  deleteUser(id: string | undefined) {
    const docInstance = doc(this.firestore, 'users', `${id}`);
    return from(deleteDoc(docInstance));
  }
}
