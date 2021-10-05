import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresario } from 'src/app/models/Empresario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL: string = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }
  
  habilitarEmpresa(empresa: Empresario){
    return this.http.put(this.URL + '/habilitar', empresa);
  }


}
