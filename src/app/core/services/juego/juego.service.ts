import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Juego } from '../../models/Juego';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private juegosCollection: AngularFirestoreCollection<Juego>;

  constructor(private afs: AngularFirestore) {
    this.juegosCollection = this.afs.collection('juegos');
  }

  public createJuego(juego: Partial<Juego>): string {
    juego.id = this.afs.createId();
    this.juegosCollection.doc(juego.id).set(juego);
    return juego.id;
  }

  public getJuegoByID(id: string): Observable<Juego> {
    const doc = this.juegosCollection.doc<Juego>(`juegos/${id}`)
    return doc.valueChanges();
  }

}
