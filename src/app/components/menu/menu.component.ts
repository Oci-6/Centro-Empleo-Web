import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  roles?: string[];

  @Input()
  userName?: string;

  items: MenuItem[] = [];

  ngOnInit() {
    if (this.roles) {
      if (this.roles.includes("ADMIN")) {
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

      if (this.roles.includes("EMPRESARIO")) {
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

      if (this.roles.includes("POSTULANTE")) {
        this.items.push(
          {
            label: 'Mi Perfil',
            icon: 'pi pi-pw pi-book',
            url: 'misOfertas'
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
        );
      }

    }
  }
}

