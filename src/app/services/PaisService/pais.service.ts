import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';
import { Pais } from 'src/app/models/Pais';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private URL = environment.apiURL+'pais';
  
  constructor(private http: HttpClient) { }

  getPaises(){
    return this.http.get<Pais[]>(this.URL + '/');
  }

  getPais(paisId: number){
    return this.http.get<Pais>(this.URL + '/' + paisId);
  }

  getDepartamentos(paisId: number){
    return this.http.get<Departamento[]>(this.URL + '/departamentos/' + paisId);
  }

  getLocalidades(departamentoId:number | undefined){
    return this.http.get<Localidad[]>(this.URL + '/departamento/localidades/' + departamentoId);
  }
}
