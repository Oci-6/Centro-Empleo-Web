import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authService: AuthService){}
  ngOnInit() {
    let user = this.authService.getAuth();
    if (user) {
      if (user.tipo === "Admin") {
        this.items.push(
          {
            label: 'Listar Empresas',
            icon: 'pi pi-pw pi-book',
            routerLink: 'empresas'
          },
          {
            label: 'Listar Postulantes',
            icon: 'pi pi-pw pi-users',
            routerLink: 'postulantes'
          },
          {
            label: 'Ofertas Laborales',
            icon: 'pi pi-pw pi-users',
            routerLink: 'ofertasAdmin'
          },
          {
            label: 'Novedades',
            icon: 'pi pi-pw pi-users',
            routerLink: 'novedades'
          },
          {
            label: 'Dashboard de Seguimiento',
            icon: 'pi pi-pw pi-users',
            routerLink: 'dashboard'
          },
        );
      }
      // console.log(this.userName);

      // if (this.userName === 'admin') {
      //   this.items.push({
      //     label: 'Usuarios',
      //     icon: 'pi pi-pw pi-users',
      //     items: [{
      //       label: 'Lista',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: 'usuarios',
      //     },
      //     { separator: true },
      //     ]
      //   });
      // }

      if (user.tipo === "Empresa") {
        this.items.push(
          {
            label: 'Modificar información',
            icon: 'pi pi-pw pi-pencil',
            routerLink: 'datosAdicionales'
          },
          {
            label: 'Mis Ofertas Laborales',
            icon: 'pi pi-pw pi-book',
            routerLink: 'misOfertas'
          },
          {
            label: 'Listar Postulantes',
            icon: 'pi pi-pw pi-users',
            routerLink: 'postulantes'
          },
          {
            label: 'Novedades',
            icon: 'pi pi-pw pi-users',
            routerLink: 'novedades'
          },
        );
      }

      if (user.tipo === "Postulante") {
        this.items.push(
          {
            label: 'Mi Perfil',
            icon: 'pi pi-pw pi-book',
            routerLink: 'perfil'
          },
          {
            label: 'Ofertas Laborales',
            icon: 'pi pi-pw pi-users',
            routerLink: 'ofertas'
          },
          {
            label: 'Mis postulaciones',
            icon: 'pi pi-pw pi-users',
            routerLink: 'postulaciones'
          },
          {
            label: 'Formulario',
            icon: 'pi pi-pw pi-file',
            routerLink: 'formulario/datosPersonales'
          }
        );
      }

    }
  }
}

