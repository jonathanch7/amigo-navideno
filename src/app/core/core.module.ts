import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from './services/persona/persona.service';
import { JuegoService } from './services/juego/juego.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PersonaService, JuegoService],
})
export class CoreModule {}
