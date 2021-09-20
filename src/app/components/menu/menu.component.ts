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
            url: 'empresas'
          },
          {
            label: 'Listar Postulantes',
            icon: 'pi pi-pw pi-users',
            url: 'postulantes'
          },
          {
            label: 'Ofertas Laborales',
            icon: 'pi pi-pw pi-users',
            url: 'ofertas'
          },
          {
            label: 'Novedades',
            icon: 'pi pi-pw pi-users',
            url: 'novedades'
          },
          {
            label: 'Dashboard de Seguimiento',
            icon: 'pi pi-pw pi-users',
            url: 'dashboard'
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
      //       url: 'usuarios',
      //     },
      //     { separator: true },
      //     ]
      //   });
      // }

      if (user.tipo === "Empresa") {
        this.items.push(
          {
            label: 'Mis Ofertas Laborales',
            icon: 'pi pi-pw pi-book',
            url: 'misOfertas'
          },
          {
            label: 'Listar Postulantes',
            icon: 'pi pi-pw pi-users',
            url: 'novedades'
          },
          {
            label: 'Novedades',
            icon: 'pi pi-pw pi-users',
            url: 'novedades'
          },
        );
      }

      if (user.tipo === "Postulante") {
        this.items.push(
          {
            label: 'Mi Perfil',
            icon: 'pi pi-pw pi-book',
            url: 'perfil'
          },
          {
            label: 'Ofertas Laborales',
            icon: 'pi pi-pw pi-users',
            url: 'ofertas'
          },
          {
            label: 'Mis postulaciones',
            icon: 'pi pi-pw pi-users',
            url: 'postulaciones'
          },
          {
            label: 'Formulario',
            icon: 'pi pi-pw pi-file',
            url: 'formulario/datosPersonales'
          }
        );
      }

    }
  }
}

