import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPersonaRestringidaPipe } from './pipes/filtro-persona-restringida.pipe';
import { ClipboardService } from './services/clipboard.service';

@NgModule({
  declarations: [FiltroPersonaRestringidaPipe],
  exports: [FiltroPersonaRestringidaPipe],
  imports: [CommonModule],
  providers: [ClipboardService],
})
export class SharedModule {}
