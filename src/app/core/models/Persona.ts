import { IModelo } from './IModelo';

export interface Persona extends IModelo {
    id?: string;
    idJuego?: string;
    nombre?: string;
    grupoFamiliar?: string;
    idPersonaRestringida?: string;
    idPersonaAsignada?: string;
}
