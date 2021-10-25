import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresario } from 'src/app/models/Empresario';
import { Admin } from 'src/app/models/Admin';
import { Novedad } from 'src/app/models/Novedad';
import { Oferta } from 'src/app/models/Oferta';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL: string = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }

  habilitarEmpresa(empresa: Empresario) {
    return this.http.put(this.URL + '/habilitar', empresa);
  }
  
  getEstadisticas() {
    return this.http.get<any>(this.URL + '/datos')
  }

  registrarAdmin(user: User) {
    return this.http.post(this.URL + '/', user);
  }
  getAllAdmin() {
    return this.http.get<Admin[]>(this.URL + '/');
  }
  infoAdmin(id: number) {
    return this.http.get<Admin>(this.URL + '/' + id);
  }
  modificarAdmin(admin: Admin) {
    return this.http.put(this.URL + '/', admin);
  }

  //Novedades
  infoNovedad(id: number) {
    return this.http.get<Novedad>(this.URL + '/novedad/' + id);
  }

  postNovedad(idAdmin: number, novedad: Novedad) {
    return this.http.post<Novedad>(this.URL + '/novedad/' + idAdmin, novedad);
  }

  putNovedad(novedad: Novedad) {
    return this.http.put<Novedad>(this.URL + '/novedad/', novedad);
  }



}

