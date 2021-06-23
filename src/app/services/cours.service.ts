import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewCours(record) {
    return this.firestore.collection('Cours').add(record);
  }
  create_NewMal(record) {
    return this.firestore.collection('Malware').add(record);
  }

  read_Cours() {
    return this.firestore.collection('Cours').snapshotChanges();
  }
  read_Mal() {
    return this.firestore.collection('Malware').snapshotChanges();
  }

  update_Cours(recordID, record) {
    this.firestore.doc('Cours/' + recordID).update(record);
    console.log('updated');
  }

  delete_Cours(record_id) {
    this.firestore.doc('Cours/' + record_id).delete();
  }
}