import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ICondition } from '../core/models/ICondition';
import { Juego } from '../core/models/Juego';
import { JuegoService } from '../core/services/juego/juego.service';
import { PersonaService } from '../core/services/persona/persona.service';
import { ClipboardService } from '../shared/services/clipboard.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent implements OnInit {
  public idJuego: string;
  public juego: Juego;
  public noEcontrado = false;
  public urlSorteo: string;
  public urlJuego: string;

  constructor(
    private router: ActivatedRoute,
    private juegoService: JuegoService,
    private personaService: PersonaService,
    private cbService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.urlJuego = location.href;
    this.leerJuego();
  }

  public copiaValor(valor: string): void {
    this.cbService.copiar(valor);
  }

  private leerJuego(): void {
    this.idJuego = this.router.snapshot.paramMap.get('juego');
    if (this.idJuego) {
      this.juegoService
        .getById(this.idJuego)
        .pipe(take(1))
        .subscribe((dataJuego) => {
          if (dataJuego) {
            this.juego = dataJuego;
            this.juego.id = this.idJuego;
            const f: any = dataJuego.condiciones.fechaHoraJuego;
            this.juego.condiciones.fechaHoraJuego = new Date(f.seconds * 1000);
            this.cargarPersonas();
            this.urlSorteo = `${location.origin}/juego/${this.juego.id}/sorteo/`;
          } else {
            this.noEcontrado = false;
          }
        });
    } else {
      this.noEcontrado = true;
    }
  }

  private cargarPersonas(): void {
    const condicion: ICondition = {
      campo: 'idJuego',
      op: '==',
      val: this.idJuego,
    };
    this.personaService
      .getByConditions([condicion])
      .subscribe((dataPersonas) => {
        this.juego.personas = dataPersonas;
      });
  }
}
