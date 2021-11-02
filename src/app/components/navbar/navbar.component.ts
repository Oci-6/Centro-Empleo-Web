import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private empresarioService: EmpresarioService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    let auth = this.authService.getAuth();

    if (!auth) {
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
          routerLink: ['/novedades']

        },
      ];
    } else {
      this.items = [
        
        {
          label: 'Bienvenido '+ auth.usuario.email,
          icon: 'pi pi-user',
          styleClass: 'mr-5',

        },
        {
          label: 'Ofertas laborales',
          icon: 'pi pi-briefcase',
          styleClass: 'mr-2',
          routerLink: ['/ofertas']

        },
        {
          label: 'Novedades',
          icon: 'pi pi-exclamation-circle',
          routerLink: ['/novedades']

        },
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-sign-out',
          styleClass: 'mr-5',
          command: this.authService.logout

        }        
      ]
      console.log(auth.usuario);
      
      
      

    }
  }

}
