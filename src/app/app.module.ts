import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import localeColombia from '@angular/common/locales/es-CO';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NuevoJuegoComponent } from './nuevo-juego/nuevo-juego.component';
import { JuegoPersonaComponent } from './juego-persona/juego-persona.component';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeColombia, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NuevoJuegoComponent,
    JuegoPersonaComponent,
    JuegoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [CoreModule, { provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
