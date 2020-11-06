import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICondition } from '../../models/ICondition';
import { IModelo } from '../../models/IModelo';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<T extends IModelo> {
  constructor(protected afs: AngularFirestore) {}

  abstract getPath(): string;

  public create(t: Partial<T>): Promise<T> {
    t.id = this.afs.createId();
    return this.afs
      .collection(this.getPath())
      .doc(t.id)
      .set(t)
      .then((res) => t as T)
      .catch((err) => null);
  }

  public getById(id: string): Observable<T> {
    return this.afs.doc<T>(`${this.getPath()}/${id}`).valueChanges();
  }

  public getByConditions(conditions: ICondition[]): Observable<T[]> {
    return this.afs
      .collection<T>(this.getPath(), (refQuery: any) => {
        conditions.forEach((cond) => {
          refQuery = refQuery.where(cond.campo, cond.op, cond.val);
        });
        return refQuery;
      })
      .valueChanges();
  }

  public update(id: string, t: Partial<T>): Promise<T> {
    return this.afs
      .doc<T>(`${this.getPath()}/${id}`)
      .update(t)
      .then((res) => t as T)
      .catch((err) => null);
  }

  public delete(id: string): Promise<boolean> {
    return this.afs
      .doc<T>(`${this.getPath()}/${id}`)
      .delete()
      .then((res) => true)
      .catch((err) => false);
  }
}
