import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ListaEmpresasComponent } from './views/admin/lista-empresas/lista-empresas.component';
import { ListaPostulantesComponent } from './views/admin/lista-postulantes/lista-postulantes.component';
import { SolicitarAccesoComponent } from './views/empresario/solicitar-acceso/solicitar-acceso.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { DatosPersonalesComponent } from './views/postulante/datos-personales/datos-personales.component';
import { EducacionFormacionComponent } from './views/postulante/educacion-formacion/educacion-formacion.component';
import { ExperienciasLaboralesComponent } from './views/postulante/experiencias-laborales/experiencias-laborales.component';
import { FormularioComponent } from './views/postulante/formulario/formulario.component';
import { MisPostulacionesComponent } from './views/postulante/mis-postulaciones/mis-postulaciones.component';
import { PerfilComponent } from './views/postulante/perfil/perfil.component';
import { PermisosLicenciasComponent } from './views/postulante/permisos-licencias/permisos-licencias.component';
import { RegistrarComponent } from './views/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'solicitar_acceso', component: SolicitarAccesoComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'empresas', component: ListaEmpresasComponent },
  { path: 'postulantes', component: ListaPostulantesComponent },
  { path: 'formulario/datosPersonales',canActivate: [LoginGuard], component: DatosPersonalesComponent },
  { path: 'formulario/educacionFormacion',canActivate: [LoginGuard], component: EducacionFormacionComponent },
  { path: 'formulario/experienciaLaboral',canActivate: [LoginGuard], component: ExperienciasLaboralesComponent },
  { path: 'formulario/permisosLicencias',canActivate: [LoginGuard], component: PermisosLicenciasComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'postulaciones', component: MisPostulacionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
