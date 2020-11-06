import { Injectable } from '@angular/core';

import { Juego } from '../../models/Juego';
import { AbstractService } from '../commons/AbstractService';

@Injectable({
  providedIn: 'root',
})
export class JuegoService extends AbstractService<Juego> {

  public getPath(): string{
    return 'juegos';
  }

}
