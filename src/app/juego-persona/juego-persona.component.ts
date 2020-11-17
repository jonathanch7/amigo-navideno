import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ICondition } from '../core/models/ICondition';
import { Juego } from '../core/models/Juego';
import { Persona } from '../core/models/Persona';
import { JuegoService } from '../core/services/juego/juego.service';
import { PersonaService } from '../core/services/persona/persona.service';

@Component({
  selector: 'app-juego-persona',
  templateUrl: './juego-persona.component.html',
  styleUrls: ['./juego-persona.component.scss'],
})
export class JuegoPersonaComponent implements OnInit {
  private idJuego: string;
  private idJugador: string;
  public jugador: Persona;
  public jugadorAsignado: Persona;
  public juego: Juego;
  public noEcontrado = false;
  public noEcontradoJugadorAsignable = false;
  public descripcionBotonEscoger: string = 'Escoger';

  constructor(
    private router: ActivatedRoute,
    private juegoService: JuegoService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.leerInformacion();
  }

  private leerInformacion(): void {
    this.idJuego = this.router.snapshot.paramMap.get('juego');
    this.idJugador = this.router.snapshot.paramMap.get('jugador');

    if (this.idJuego && this.idJugador) {
      this.personaService
        .getById(this.idJugador)
        .pipe(take(1))
        .subscribe((per) => {
          if (per) {
            this.jugador = per;
            this.cargarJuego();
            if (this.jugador.idPersonaAsignada) {
              this.personaService
                .getById(this.jugador.idPersonaAsignada)
                .pipe(take(1))
                .subscribe((per) => {
                  this.jugadorAsignado = per;
                });
            }
          } else {
            this.noEcontrado = true;
          }
        });
    } else {
      this.noEcontrado = true;
    }
  }

  private cargarJuego(): void {
    this.juegoService
      .getById(this.idJuego)
      .pipe(take(1))
      .subscribe((dataJuego) => {
        if (dataJuego) {
          this.juego = dataJuego;
          this.juego.id = this.idJuego;
          const f: any = dataJuego.condiciones.fechaHoraJuego;
          this.juego.condiciones.fechaHoraJuego = new Date(f.seconds);
        } else {
          this.noEcontrado = true;
        }
      });
  }
  /**
   * Escoge una persona al azar tenidendo en cuenta que:
   * 1.No sea del mismo grupo familiar si tiene asociado uno.
   * 2.No sea una persona que esta restringida.
   * 3.La persona escogida no este ya asignada a otra persona.
   */
  public escogerPersona(event: Event, btn: HTMLButtonElement): void {
    event.preventDefault();
    btn.disabled = true;
    btn.innerText = 'Escogiendo...';
    const condiciones: ICondition[] = [];
    condiciones.push({
      campo: 'idJuego',
      op: '==',
      val: this.idJuego,
    });

    this.getPersonas(condiciones).subscribe((personas) => {
      this.jugadorAsignado = this.getRamdomPersona(personas);
      if (this.jugadorAsignado) {
        this.personaService.update(this.jugador.id, {
          idPersonaAsignada: this.jugadorAsignado.id,
        });
      } else {
        this.noEcontradoJugadorAsignable = true;
      }
    });
  }

  private getPersonas(condiciones: ICondition[]): Observable<Persona[]> {
    return this.personaService.getByConditions(condiciones).pipe(
      take(1),
      map((personas) => {
        const disponibles = personas.filter((per) => {
          return (
            per.id !== this.jugador.id &&
            // No sea la persona restringida
            per.id !== this.jugador.idPersonaRestringida &&
            // No sea del mismo grupo familiar (si tiene)
            (per.grupoFamiliar == null ||
              per.grupoFamiliar !== this.jugador.grupoFamiliar) &&
            // No este asignado ya a una persona
            !personas.find((p) => p.idPersonaAsignada === per.id)
          );
        });
        // Filtra las que tengan grupo para dar prioridad a estas
        const persConGrupo = disponibles.filter(
          (per) => per.grupoFamiliar != null
        );
        return persConGrupo.length > 0 ? persConGrupo : disponibles;
      })
    );
  }

  private getRamdomPersona(personas: Persona[]): Persona {
    if (personas && personas.length > 0) {
      return personas[Math.floor(Math.random() * personas.length)];
    }
    return null;
  }
}
