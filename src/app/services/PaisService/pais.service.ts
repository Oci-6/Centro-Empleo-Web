import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'src/app/models/Pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private URL = 'http://localhost:3000/api/pais';
  
  constructor(private http: HttpClient) { }

  getPaises(){
    return this.http.get<Pais[]>(this.URL + '/');
  }

  getPais(paisId: number){
    return this.http.get<Pais>(this.URL + '/' + paisId);
  }
}
