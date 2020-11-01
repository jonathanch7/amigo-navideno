import {Condicion} from './Condicion';
import { Persona } from './Persona';

export interface Juego {
    id: string;
    ano: number;
    descripcion: string;
    condiciones: Condicion[];
    personas: Persona[];
}