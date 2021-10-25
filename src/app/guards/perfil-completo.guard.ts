import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';
import { PostulanteService } from '../services/PostulanteService/postulante.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilCompletoGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private postulanteService: PostulanteService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async (resolve, reject) => {

      let postulante = await this.postulanteService.infoPostulante(this.authService.getAuth().usuario.id).toPromise();
  
      if (postulante&&!postulante.terminosCondiciones) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete sus datos' })
        this.router.navigate(['/formulario/datosPersonales'])
        resolve(false)
      }
    
  
      resolve( true);
  
    })
  }
}