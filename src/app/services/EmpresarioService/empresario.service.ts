import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresario } from 'src/app/models/Empresario';
import { Oferta } from 'src/app/models/Oferta';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresarioService {


  private URL: string = environment.apiURL+'empresa';

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

  buscarEmpresario(query: string,page: number,){
    return this.http.get<{
      empresas: Empresario[],
      total: number
    }>(this.URL+"/buscar/?page="+page+query); 
  }

  enviarCorreo(){
    return this.http.post(this.URL+'/send-email', {});
  }
}
