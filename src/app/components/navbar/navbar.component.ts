import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let auth = localStorage.getItem('auth');

    if (auth == null) {
      this.items = [
        {
          label: 'Ingresar',
          icon: 'pi pi-sign-in',
          styleClass: 'mr-5',
          routerLink: ['/login']


        },

        {
          label: 'Ofertas de trabajo',
          icon: 'pi pi-briefcase',
          styleClass: 'mr-2',
          routerLink: ['/ofertas']

        },
        {
          label: 'Novedades',
          icon: 'pi pi-exclamation-circle',

        },
      ];
    } else {
      this.items = [
        {
          label: 'LogOut',
          icon: 'pi pi-sign-out',
          styleClass: 'mr-5',
          command: this.authService.logout


        },

        {
          label: 'Ofertas de trabajo',
          icon: 'pi pi-briefcase',
          styleClass: 'mr-2',
          routerLink: ['/ofertas']

        },
        {
          label: 'Novedades',
          icon: 'pi pi-exclamation-circle',

        },
      ];
      switch (JSON.parse(auth).tipo) {
        case "Postulante":
          
          this.items.push(
            {
              label: 'Mi perfil',
              icon: 'pi pi-user',
              styleClass: 'mr-5',
              routerLink: ['/']


            })
          this.items.push(
            {
              label: 'Formulario',
              icon: 'pi pi-id-card',
              styleClass: 'mr-5',
              routerLink: ['/formulario/datosPersonales']


            })


          break;
        case "Admin":
          break;
        case "Empresa":
          break;

      }


    }
  }

}
