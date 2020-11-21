import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from 'src/app/core/models/Persona';

@Pipe({
  name: 'filtroPersonaRestringida',
})
export class FiltroPersonaRestringidaPipe implements PipeTransform {
  transform(personas: Persona[], persona: Persona): Persona[] {
    /**
     * Se elimina la persona actual del select
     * Se elimina las personas que ya esten asignada a otra persona
     */
    return personas
      .filter((per) => per.nombre !== persona.nombre)
      .filter((per) => {
        return (
          !personas.find((pers) => pers.idPersonaRestringida === per.nombre) &&
          (persona.grupoFamiliar === null ||
          persona.grupoFamiliar !== per.grupoFamiliar)
        );
      });
  }
}
