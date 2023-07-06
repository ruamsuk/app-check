import { Injectable, Optional } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc, query,
  doc, orderBy,
  setDoc, updateDoc, Firestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    @Optional()
    private firestore: Firestore,
    ) { }

  addUser(user: { uid: string; displayName: string | null | undefined; email: string | null | undefined }) {
    const ref = doc(this.firestore, 'users', `${user.uid}`);
    return from(setDoc(ref, user));
  }

  updateUser(user: any) {
    const ref = doc(this.firestore, 'users', `${user.uid}`);
    return from(updateDoc(ref, {...user}));
  }

  loadUsers() {
    const dbInstance = collection(this.firestore, 'users');
    const userQuery = query(dbInstance, orderBy('firstName'));
    return collectionData(userQuery, {idField: 'id'});
  }

  deleteUser(id: string | undefined) {
    const docInstance = doc(this.firestore, 'members', `${id}`);
    return from(deleteDoc(docInstance));
  }
}
