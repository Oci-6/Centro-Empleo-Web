import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  page: number = 1;

  items: MenuItem[] = [];

  postulante: Postulante = {};

  constructor(public messageService: MessageService, public postulanteService: PostulanteService) { }

  ngOnInit(): void {
    this.items = [{
      label: 'Datos Personales',
      routerLink: 'formulario/datosPersonales'
    },
    {
      label: 'Educacion & Formación',
      routerLink: 'formulario/educacionFormacion'
    },
    {
      label: 'Experiencia Laboral',
      routerLink: 'payment'
    },
    {
      label: 'Permisos & Licencias',
      routerLink: 'confirmation'
    },
    {
      label: 'Intereses & Preferencias',
      routerLink: 'confirmation'
    },
    {
      label: 'CV & Permisos Legales',
      routerLink: 'confirmation'
    }
    ];
  }

}
