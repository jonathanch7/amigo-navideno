import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICondition } from '../../models/ICondition';
import { Persona } from '../../models/Persona';
import { AbstractService } from '../commons/AbstractService';

@Injectable({
  providedIn: 'root',
})
export class PersonaService extends AbstractService<Persona> {
  public getPath(): string {
    return 'personas';
  }

  public getPersonasByIdJuegoNoAsignada(
    idJuego: string
  ): Observable<Persona[]> {
    const condicion: ICondition = { campo: idJuego, op: '==', val: idJuego };
    this.getByConditions([condicion]).pipe(
      switchMap((ac) => {
        console.log(ac);
        return null;
      })
    );
    return null;
  }
}
