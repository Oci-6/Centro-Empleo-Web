import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/api/auth';

  login(data: User) {
    return this.http.post(this.URL + '/login', data);
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
  }

  getUser():number | undefined{
    let aux = localStorage.getItem("auth");
    if(aux){
      return JSON.parse(aux).usuario; 
    }
    return undefined;
  }


}
