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
          label: 'Cerrar Sesión',
          icon: 'pi pi-sign-out',
          styleClass: 'mr-5',
          command: this.authService.logout

        }        
      ]
      console.log(auth.usuario);
      
      //Si es empresa y no tiene acceso
      if(auth.tipo=='Empresa' && moment(auth.usuario.fechaExpiracion).isBefore(new Date())){
        this.items.push(
        {
        label: 'Solicitar Acceso',
        icon: 'pi pi-exclamation-triangle',
        styleClass: 'mr-5',
        command: () => {
          this.confirmationService.confirm({
            message: 'Se enviará un correo al administrador solicitando acceso. ¿Desea continuar?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.empresarioService.enviarCorreo().subscribe(
                  response => {
                    this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Correo enviado exitosamente' })
                  },
                  error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error al enviar el correo' })
                  }
                );
            },
            reject: (type: any) => {
                switch(type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({severity:'error', summary:'Rechazado', detail:'No se envió el correo'});
                    break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({severity:'warn', summary:'Cancelado', detail:'No se envió el correo'});
                    break;
                }
            }
        });
        }
        })
      }
      

    }
  }

}
