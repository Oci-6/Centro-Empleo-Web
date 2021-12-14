import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaActivaGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let auth = this.authService.getAuth();
    let res: boolean = (auth.tipo == "Admin" || (auth.usuario.fechaExpiracion && moment(auth.usuario.fechaExpiracion).isAfter(new Date())))

    if (!auth.usuario.estado&&auth.tipo!="Admin") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete sus datos' })
      this.router.navigate(['datosAdicionales'])
    }
    else
      if (!res) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Solicite acceso para utilizar esta funcionalidad' })
      }

    return res;


  }

}
