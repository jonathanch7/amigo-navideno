import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Juego } from '../core/models/Juego';
import { JuegoService } from '../core/services/juego/juego.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Persona } from '../core/models/Persona';
import { PersonaService } from '../core/services/persona/persona.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-nuevo-juego',
  templateUrl: './nuevo-juego.component.html',
  styleUrls: ['./nuevo-juego.component.scss'],
})
export class NuevoJuegoComponent implements OnInit, AfterViewInit {
  @ViewChild('fechaJuego') fechaJuego: ElementRef;
  @ViewChild('horaJuego') horaJuego: ElementRef;
  @ViewChild('listado') listado: ElementRef;

  idJuego: string;
  juegoForm: FormGroup;
  juegoPersonasForm: FormGroup;
  personas: Persona[] = [];
  gruposFamiliares: string[] = [];

  nombreNuevaPersona: Persona = {};

  constructor(
    private juegoService: JuegoService,
    private personaService: PersonaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.construirForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.inicializarHora();
    this.inicializarSelects();
  }

  crearJuego(event: Event): void {
    event.preventDefault();
    if (this.juegoForm.valid) {
      this.crearJuegoPersonas();
    }
  }

  public addPersona(event: Event): void {
    event.preventDefault();
    if (this.nombreNuevaPersona.nombre) {
      this.nombreNuevaPersona.nombre = this.nombreNuevaPersona.nombre.trim();
      if (!this.nombreNuevaPersona.grupoFamiliar) {
        this.nombreNuevaPersona.grupoFamiliar = ' ';
      }
      this.nombreNuevaPersona.grupoFamiliar = this.nombreNuevaPersona.grupoFamiliar.trim();
      if (
        !this.personas.find(
          (persona) =>
            persona.nombre.toLowerCase() ===
            this.nombreNuevaPersona.nombre.toLowerCase()
        )
      ) {
        if (this.nombreNuevaPersona.grupoFamiliar.length > 0) {
          if (
            !this.gruposFamiliares.includes(
              this.nombreNuevaPersona.grupoFamiliar
            )
          ) {
            this.gruposFamiliares.push(this.nombreNuevaPersona.grupoFamiliar);
          }
        } else {
          this.nombreNuevaPersona.grupoFamiliar = null;
        }
        // Necesario re asignar para que se refresque el filtro
        this.personas = [...this.personas, { ...this.nombreNuevaPersona }];
        this.nombreNuevaPersona.nombre = null;
        this.nombreNuevaPersona.grupoFamiliar = null;
        this.inicializarSelects();
      }
    }
  }

  public eliminarPersona(nombre: string): void {
    this.personas = this.personas
      .filter((persona) => persona.nombre !== nombre)
      .map((persona) => {
        if (persona.idPersonaRestringida === nombre) {
          persona.idPersonaRestringida = null;
        }
        return persona;
      });
    this.inicializarSelects();
  }

  public restringirPersona(
    nombreBase: string,
    nombreRestringido: string
  ): void {
    this.personas = this.personas.map((persona) => {
      if (persona.nombre === nombreBase) {
        persona.idPersonaRestringida = nombreRestringido;
      }
      return persona;
    });
    this.inicializarSelects();
  }

  public campoJuego(nombreCampo: string): AbstractControl {
    return this.juegoForm.get(nombreCampo);
  }

  public campoCondicion(nombreCampo: string): AbstractControl {
    return this.juegoForm.get('condiciones').get(nombreCampo);
  }

  public campoRequerido(nombreCampo: string, esJuego?: boolean): boolean {
    const campo: AbstractControl = esJuego
      ? this.campoJuego(nombreCampo)
      : this.campoCondicion(nombreCampo);
    return campo.hasError('required');
  }

  public campoError(
    nombreCampo: string,
    error: string,
    esJuego?: boolean
  ): boolean {
    const campo: AbstractControl = esJuego
      ? this.campoJuego(nombreCampo)
      : this.campoCondicion(nombreCampo);
    return (
      campo.errors &&
      campo.dirty &&
      this.campoCondicion(nombreCampo).hasError(error)
    );
  }

  public campoCondicionError(nombreCampo: string, error: string): boolean {
    const campo: AbstractControl = this.campoCondicion(nombreCampo);
    return (
      campo.errors &&
      campo.dirty &&
      this.campoCondicion(nombreCampo).hasError(error)
    );
  }

  public cambioCampoCondicion(nombre: string, target: HTMLInputElement): void {
    this.campoCondicion(nombre).setValue(target.value);
  }

  private async crearJuegoPersonas(): Promise<void> {
    this.juegoForm.disable();
    const juego: Juego = {
      descripcion: this.campoJuego('descripcion').value,
      condiciones: {
        valorRegalo: this.campoCondicion('valorRegalo').value,
        fechaHoraJuego: new Date(
          this.campoCondicion('fechaJuego').value +
            ' ' +
            this.campoCondicion('horaJuego').value
        ),
        lugar: this.campoCondicion('lugar').value,
        observacion: this.campoCondicion('observacion').value,
      },
    };

    const dataJuego = await this.juegoService.create(juego);
    if (dataJuego) {
      this.idJuego = dataJuego.id;
      // Crea la personas asociandolas al Juego
      const personasCreadas: Persona[] = [];
      for (const per of this.personas) {
        const data = await this.personaService.create({
          ...per,
          idJuego: this.idJuego,
          idPersonaRestringida: null,
        });
        personasCreadas.push(data);
      }

      // Se actualiza el id de la persona restringida
      for (const per of this.personas) {
        if (per.id) {
          const personaRestringida: Persona = personasCreadas.find(
            (perc) => perc.nombre === per.idPersonaRestringida
          );
          if (personaRestringida) {
            this.personaService.update(per.id, {
              idPersonaRestringida: personaRestringida.id,
            });
          }
        }
      }
      this.personas = null;
      this.juegoForm.reset();
      this.router.navigate(['/juego', this.idJuego]);
    }
  }

  private construirForm(): void {
    this.juegoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      condiciones: this.formBuilder.group({
        valorRegalo: ['', [Validators.required]],
        fechaJuego: ['', [Validators.required]],
        horaJuego: ['', [Validators.required]],
        lugar: ['', [Validators.required]],
        observacion: ['', [Validators.required]],
      }),
    });
  }

  private inicializarSelects(): void {
    setTimeout(() => {
      const el: HTMLElement = this.listado.nativeElement;
      Array.from(el.getElementsByTagName('select')).forEach((element) => {
        M.FormSelect.init(element);
      });
    }, 200);
  }

  private inicializarHora(): void {
    setTimeout(() => {
      M.Datepicker.init(this.fechaJuego.nativeElement);
      M.Timepicker.init(this.horaJuego.nativeElement);
    }, 200);
  }
}
