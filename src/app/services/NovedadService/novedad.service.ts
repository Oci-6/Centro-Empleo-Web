import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { Novedad } from 'src/app/models/Novedad';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  private URL: string = environment.apiURL+'novedad';

  constructor(private http: HttpClient) { }
  
  //Datos Personales
  crearNovedad(novedad: FormData){
    return this.http.post(this.URL + '/', novedad);
  }
  getAll(){
    return this.http.get<Novedad[]>(this.URL + '/');
  }
  getNovedad(id: number) {
    return this.http.get<Novedad>(this.URL + '/' + id);
  }
  modificarNovedad(novedad: FormData) {
    return this.http.put(this.URL + '/', novedad);
  }
  getBlobDatos(url: string){
    return this.http.get(url,{responseType: "blob"})
  }
  buscarNovedad(query: string, page: number){
    return this.http.get<{
      novedades: Novedad[],
      total: number
    }>(this.URL+"/buscar/?page="+page+query);
  }
  ultimasNovedades(){
    return this.http.get<Novedad[]>(this.URL+'/ultimasNovedades');
  }
  deleteNovedad(novedadId: number) {
    return this.http.delete(this.URL + '/' + novedadId);
  }


}

