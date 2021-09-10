import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postulante } from 'src/app/models/Postulante';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {

  private URL: string = 'http://localhost:3000/api/postulante';

  constructor(private http: HttpClient) { }
  

  registrarPostulante(user: User){
    return this.http.post(this.URL + '/', user);
  }

  infoPostulante(id: number) {
    return this.http.get<Postulante>(this.URL + '/' + id);
  }

  modificarPostulante(postulante: Postulante) {
    return this.http.put(this.URL + '/' + postulante.id, postulante);
  }
}

