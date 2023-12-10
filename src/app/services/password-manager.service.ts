import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  // adding the site
  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  // get the data
  loadSite() {
    const dbInstance = collection(this.firestore, 'sites');
    if (collectionData(dbInstance)) {
      // console.log('Collection Data',dbInstance);
      return collectionData(dbInstance, { idField: 'id' });
    } else {
      console.log('Collection Data not found');
      throw new Error('Collection Data not found');
    }
  }

  // get the data
  async getSite(id: string): Promise<any> {
    const docRef = doc(this.firestore, 'sites', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log('Document found',docSnap.data());
      return docSnap.data();
    } else {
      console.log('Document not found');
      throw new Error('Document not found');
    }
  }

  // update the data
  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  // delete the data
  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  // password for a single site
  addPassword(data: any, id: string) {
    console.log(data);
    // const dbInstance = collection(this.firestore, `sites/${id}/passwords`);
    // return addDoc(dbInstance, data);
  }

  // get all passwords for a single site
  loadPassword(siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }

  // update password for a single site
  updatePassword(id: string, data: object, passwordId: string) {
    const docInstance = doc(
      this.firestore,
      `sites/${id}/passwords`,
      passwordId
    );
    return updateDoc(docInstance, data);
  }

  // delete password for a single site
  deletePassword(id: string, passwordId: string) {
    const docInstance = doc(
      this.firestore,
      `sites/${id}/passwords`,
      passwordId
    );
    return deleteDoc(docInstance);
  }

  // login
  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth,email,password);
  }
}
