import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPostulanteComponent } from './components/datos-postulante/datos-postulante.component';
import { EmpresaActivaGuard } from './guards/empresa-activa.guard';
import { LoginGuard } from './guards/login.guard';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { ListaEmpresasComponent } from './views/admin/lista-empresas/lista-empresas.component';
import { ListaNovedadesComponent } from './views/admin/lista-novedades/lista-novedades/lista-novedades.component';
import { ListaPostulantesComponent } from './views/admin/lista-postulantes/lista-postulantes.component';
import { CambiarContraseniaComponent } from './views/cambiar-contrasenia/cambiar-contrasenia.component';
import { DetalleOfertaComponent } from './views/detalle-oferta/detalle-oferta.component';
import { AgregarOfertaComponent } from './views/empresario/agregar-oferta/agregar-oferta.component';
import { DatosAdicionalesComponent } from './views/empresario/datos-adicionales/datos-adicionales.component';
import { MisOfertasComponent } from './views/empresario/mis-ofertas/mis-ofertas.component';
import { SolicitarAccesoComponent } from './views/empresario/solicitar-acceso/solicitar-acceso.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { CvPermisosLegalesComponent } from './views/postulante/cv-permisos-legales/cv-permisos-legales.component';
import { DatosPersonalesComponent } from './views/postulante/datos-personales/datos-personales.component';
import { EducacionFormacionComponent } from './views/postulante/educacion-formacion/educacion-formacion.component';
import { ExperienciasLaboralesComponent } from './views/postulante/experiencias-laborales/experiencias-laborales.component';
import { FormularioComponent } from './views/postulante/formulario/formulario.component';
import { InteresesPreferenciasComponent } from './views/postulante/intereses-preferencias/intereses-preferencias.component';
import { MisPostulacionesComponent } from './views/postulante/mis-postulaciones/mis-postulaciones.component';
import { PerfilComponent } from './views/postulante/perfil/perfil.component';
import { PermisosLicenciasComponent } from './views/postulante/permisos-licencias/permisos-licencias.component';
import { RecuperarContraseniaComponent } from './views/recuperar-contrasenia/recuperar-contrasenia/recuperar-contrasenia.component';
import { RegistrarComponent } from './views/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'postulantes',canActivate: [LoginGuard, EmpresaActivaGuard],  component: ListaPostulantesComponent },
  { path: 'ofertas/:id', component: DetalleOfertaComponent },
  { path: 'cambiarContrasenia', component: CambiarContraseniaComponent },
  { path: 'recuperarContrasenia', component: RecuperarContraseniaComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'novedades/:id', component: DetalleNovedadComponent },
  
{path: 'formulario',canActivate: [LoginGuard], component: FormularioComponent , children: [
  
  { path: 'datosPersonales',canActivate: [LoginGuard], component: DatosPersonalesComponent },
  { path: 'educacionFormacion',canActivate: [LoginGuard], component: EducacionFormacionComponent },
  { path: 'experienciaLaboral',canActivate: [LoginGuard], component: ExperienciasLaboralesComponent },
  { path: 'permisosLicencias',canActivate: [LoginGuard], component: PermisosLicenciasComponent },
  { path: 'preferenciasLaborales',canActivate: [LoginGuard], component: InteresesPreferenciasComponent },
  { path: 'cv',canActivate: [LoginGuard], component: CvPermisosLegalesComponent },
]},
  { path: 'perfil',canActivate: [LoginGuard,PerfilCompletoGuard],  component: PerfilComponent },
  { path: 'postulaciones',canActivate: [LoginGuard],  component: MisPostulacionesComponent },

  //Rutas Empresa
  { path: 'solicitar_acceso', component: SolicitarAccesoComponent },
  { path: 'datosAdicionales',canActivate: [LoginGuard], component: DatosAdicionalesComponent },
  { path: 'misOfertas',canActivate: [LoginGuard],  component: MisOfertasComponent },
  { path: 'agregarOferta',canActivate: [LoginGuard, EmpresaActivaGuard],  component: AgregarOfertaComponent },
  
  //Rutas Admin
  { path: 'dashboard',canActivate: [LoginGuard],  component: DashboardComponent },
  { path: 'empresas',canActivate: [LoginGuard],  component: ListaEmpresasComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
