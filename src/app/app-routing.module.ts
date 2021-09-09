import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarAccesoComponent } from './views/empresario/solicitar-acceso/solicitar-acceso.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { RegistrarComponent } from './views/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'solicitar_acceso', component: SolicitarAccesoComponent },
  { path: 'ofertas', component: OfertasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
