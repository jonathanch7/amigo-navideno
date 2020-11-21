import { NgModule } from '@angular/core';
import { PersonaService } from './services/persona/persona.service';
import { JuegoService } from './services/juego/juego.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [PersonaService, JuegoService],
})
export class CoreModule {}
