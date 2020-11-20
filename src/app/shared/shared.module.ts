import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPersonaRestringidaPipe } from './pipes/filtro-persona-restringida.pipe';
import { ClipboardService } from './services/clipboard.service';
import { HeaderTrineoComponent } from './components/header-trineo/header-trineo.component';

@NgModule({
  declarations: [FiltroPersonaRestringidaPipe, HeaderTrineoComponent],
  exports: [FiltroPersonaRestringidaPipe, HeaderTrineoComponent],
  imports: [CommonModule],
  providers: [ClipboardService],
})
export class SharedModule {}
