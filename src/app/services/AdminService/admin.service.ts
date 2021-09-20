import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  
  //Datos Personales
  registrarAdmin(user: User){
    return this.http.post(this.URL + '/', user);
  }
  getAllAdmin(){
    return this.http.get<Admin[]>(this.URL + '/');
  }
  infoAdmin(id: number) {
    return this.http.get<Admin>(this.URL + '/' + id);
  }
  modificarAdmin(admin: Admin) {
    return this.http.put(this.URL + '/', admin);
  }

  //Novedades
  infoNovedad(id: number){
    return this.http.get<Novedad>(this.URL + '/novedad/' + id);
  }
  
  postNovedad(idAdmin: number, novedad: Novedad){
    return this.http.post<Novedad>(this.URL + '/novedad/' + idAdmin, novedad);
  }

  putNovedad(novedad: Novedad){
    return this.http.put<Novedad>(this.URL + '/novedad/' , novedad);
  }

  //Ofertas
  infoOferta(id: number){
    return this.http.get<Oferta>(this.URL + '/oferta/' + id);
  }
  
  postOferta(idAdmin: number, oferta: Oferta){
    return this.http.post<Oferta>(this.URL + '/oferta/' + idAdmin, oferta);
  }

  putOferta(oferta: Oferta){
    return this.http.put<Oferta>(this.URL + '/oferta/' , oferta);
  }


}

