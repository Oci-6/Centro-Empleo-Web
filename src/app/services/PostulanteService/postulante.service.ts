import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitacionFormacion } from 'src/app/models/CapacitacionFormacion';
import { ConocimientoInfo } from 'src/app/models/ConocimientoInfo';
import { ExpLaboral } from 'src/app/models/ExpLaboral';
import { Idioma } from 'src/app/models/Idioma';
import { PermisosLicencias } from 'src/app/models/PermisosLicencias';
import { Postulante } from 'src/app/models/Postulante';
import { PreferenciaLaboral } from 'src/app/models/PreferenciaLaboral';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  private URL: string = 'http://localhost:3000/api/postulante';

  constructor(private http: HttpClient) { }
  
  //Datos Personales
  registrarPostulante(user: User){
    return this.http.post(this.URL + '/', user);
  }
  getPostulantes(){
    return this.http.get<Postulante[]>(this.URL + '/');
  }
  infoPostulante(id: number) {
    return this.http.get<Postulante>(this.URL + '/' + id);
  }
  modificarPostulante(postulante: Postulante) {
    return this.http.put(this.URL + '/', postulante);
  }

  //Capacitaciones y Cursos
  infoCapacitacion(id: number){
    return this.http.get<CapacitacionFormacion>(this.URL + '/capacitacion/' + id);
  }
  capacitacionesPostulante(idPostulante: number){
    return this.http.get<CapacitacionFormacion[]>(this.URL + '/capacitaciones/' + idPostulante);
  }
  postCapacitacion(idPostulante: number, capacitacion: CapacitacionFormacion){
    return this.http.post<CapacitacionFormacion>(this.URL + '/capacitacion/' + idPostulante, capacitacion);
  }
  putCapacitacion(capacitacion: CapacitacionFormacion){
    return this.http.put<CapacitacionFormacion>(this.URL + '/capacitacion/' , capacitacion);
  }

  //Conocimientos Informáticos
  infoCI(id: number){
    return this.http.get<ConocimientoInfo>(this.URL + '/conocimientoInfo/' + id);
  }
  conocimientosIPostulante(idPostulante: number){
    return this.http.get<ConocimientoInfo[]>(this.URL + '/conocimientoInfos/' + idPostulante);
  }
  postCI(idPostulante: number, CI: ConocimientoInfo){
    return this.http.post<CapacitacionFormacion>(this.URL + '/conocimientoInfo/' + idPostulante, CI);
  }
  putConocimientoI(CI: ConocimientoInfo){
    return this.http.put<ConocimientoInfo>(this.URL + '/conocimientoInfo/' , CI);
  }

  //Idiomas
  infoIdioma(id: number){
    return this.http.get<Idioma>(this.URL + '/idioma/' + id);
  }
  idiomasPostulante(idPostulante: number){
    return this.http.get<Idioma[]>(this.URL + '/idiomas/' + idPostulante);
  }
  postIdioma(idPostulante: number, idioma: Idioma){
    return this.http.post<Idioma>(this.URL + '/idioma/' + idPostulante, idioma);
  }
  putIdioma(idioma: Idioma){
    return this.http.put<Idioma>(this.URL + '/idioma/' , idioma);
  }

  //Experiencias Laborales
  infoExpLaboral(id: number){
    return this.http.get<ExpLaboral>(this.URL + '/expLaboral/' + id);
  }
  expLaboralesPostulante(idPostulante: number){
    return this.http.get<ExpLaboral[]>(this.URL + '/expLaboral/' + idPostulante);
  }
  postExpLaboral(idPostulante: number, expLaboral: ExpLaboral){
    return this.http.post<ExpLaboral>(this.URL + '/expLaboral/' + idPostulante, expLaboral);
  }
  putExpLaboral(expLaboral: ExpLaboral){
    return this.http.put<ExpLaboral>(this.URL + '/expLaboral/' , expLaboral);
  }

  //Permisos y Licencias
  infoPermisosLicencias(id: number){
    return this.http.get<PermisosLicencias>(this.URL + '/permisosLicencia/' + id);
  }
  PermisosLicenciasPostulante(idPostulante: number){
    return this.http.get<PermisosLicencias[]>(this.URL + '/permisosLicencias/' + idPostulante);
  }
  postPermisosLicencias(idPostulante: number, expLaboral: PermisosLicencias){
    return this.http.post<PermisosLicencias>(this.URL + '/permisosLicencia/' + idPostulante, expLaboral);
  }
  putPermisosLicencias(PL: PermisosLicencias){
    return this.http.put<PermisosLicencias>(this.URL + '/permisosLicencia/' , PL);
  }

  //Intereses y Preferencias
  infoPrefLab(id: number){
    return this.http.get<PreferenciaLaboral>(this.URL + '/preferenciaLaboral/' + id);
  }
  PrefLabPostulante(idPostulante: number){
    return this.http.get<PreferenciaLaboral[]>(this.URL + '/preferenciaLaborales/' + idPostulante);
  }
  postPrefLab(idPostulante: number, prefLab: PreferenciaLaboral){
    return this.http.post<PreferenciaLaboral>(this.URL + '/preferenciaLaboral/' + idPostulante, prefLab);
  }
  putPrefLab(PL: PreferenciaLaboral){
    return this.http.put<PreferenciaLaboral>(this.URL + '/preferenciaLaboral/' , PL);
  }

}

