import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private URL = environment.apiURL+ 'api/'+'auth';

  login(data: User) {
    return this.http.post(this.URL + '/login', data);
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
  }

  cambiarContrasenia(data: {token: string, email:string, contraseña: string}){
    return this.http.post(this.URL + '/cambiarContrasenia', data);
  }

  recuperarContrasenia(data: {email: string}){
    return this.http.post(this.URL + '/recuperarContrasenia', data);
  }

  getUser(): any | undefined {
    let aux = localStorage.getItem("auth");
    if (aux) {
      return JSON.parse(aux).usuario;
    }
    return undefined;
  }

  getAuth(): any | undefined {
    let aux = localStorage.getItem("auth");
    if (aux) {
      return JSON.parse(aux);
    }
    return undefined;
  }

  signInWithSocial(user: User) {
    return this.http.post(this.URL + '/signInSocial', user);
  }

}
