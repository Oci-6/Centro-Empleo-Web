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
          label: 'Bienvenido',
          icon: 'pi pi-user',
          styleClass: 'mr-5',

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
        {
          label: 'LogOut',
          icon: 'pi pi-sign-out',
          styleClass: 'mr-5',
          command: this.authService.logout


        }]
      

    }
  }

}
