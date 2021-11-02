import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  

  constructor(
    private authService: AuthService,
    private empresarioService: EmpresarioService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
    ){}
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
            label: 'Listar Ofertas Laborales',
            icon: 'pi pi-pw pi-users',
            routerLink: 'ofertasAdmin'
          },
          {
            label: 'Listar Novedades',
            icon: 'pi pi-pw pi-users',
            routerLink: 'novedadesAdmin'
          },
          {
            label: 'Panel de Seguimiento',
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
        //Si es empresa y no tiene acceso
      if(user.tipo=='Empresa' && moment(user.usuario.fechaExpiracion).isBefore(new Date())){
        this.items.push(
        {
        label: 'Solicitar Acceso',
        icon: 'pi pi-exclamation-triangle',
        style: '',
        styleClass: 'rojo',
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
            label: 'Buscar Candidatos',
            icon: 'pi pi-pw pi-users',
            routerLink: 'postulantes'
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

