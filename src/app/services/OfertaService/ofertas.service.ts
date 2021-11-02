import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oferta } from 'src/app/models/Oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  private URL: string = 'http://localhost:3000/api/ofertas';

  constructor(private http: HttpClient) { }
  
  //Datos Personales
  agregarOferta(oferta: Oferta){
    return this.http.post(this.URL + '/', oferta);
  }

  getOfertas(){
    return this.http.get<Oferta[]>(this.URL + '/');
  }
  
  infoOferta(id: number) {
    return this.http.get<Oferta>(this.URL + '/' + id);
  }
  
  modificarOferta(oferta: Oferta) {
    return this.http.put(this.URL + '/', oferta);
  }

  buscarOferta(query: string, page: number){
    return this.http.get<{
      ofertas: Oferta[],
      total: number
    }>(this.URL+"/buscar/?page="+page+query);
  }
  
  deleteOferta(OfertaId: number) {
    return this.http.delete(this.URL + '/' + OfertaId);
  }

}
