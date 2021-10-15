import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresario } from 'src/app/models/Empresario';
import { Oferta } from 'src/app/models/Oferta';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class EmpresarioService {


  private URL: string = 'http://localhost:3000/api/empresa';

  constructor(private http: HttpClient) { }
  
  registrarEmpresario(user: User){
    return this.http.post(this.URL + '/', user);
  }

  getEmpresarios(){
    return this.http.get<Empresario[]>(this.URL + '/');
  }
  
  infoEmpresario(id: number) {
    return this.http.get<Empresario>(this.URL + '/' + id);
  }
  
  modificarEmpresario(empresario: Empresario) {
    return this.http.put(this.URL + '/', empresario);
  }

  getOfertas(){
    return this.http.get<Oferta[]>(this.URL + '/ofertas');
  }

  enviarCorreo(){
    return this.http.post(this.URL+'/send-email', {});
  }
}
