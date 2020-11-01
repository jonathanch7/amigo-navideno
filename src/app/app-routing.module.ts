import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JuegoPersonaComponent } from './juego-persona/juego-persona.component';
import { NuevoJuegoComponent } from './nuevo-juego/nuevo-juego.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'juego',
    component: NuevoJuegoComponent,
  },
  {
    path: 'juego/:juego/sorteo/:jugador',
    component: JuegoPersonaComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
