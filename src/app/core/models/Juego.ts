import {Condicion} from './Condicion';
import { IModelo } from './IModelo';
import { Persona } from './Persona';

export interface Juego extends IModelo {
    id?: string;
    ano?: number;
    descripcion: string;
    condiciones: Condicion;
    personas?: Persona[];
}