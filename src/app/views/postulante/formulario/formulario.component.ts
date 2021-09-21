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
      label: 'Datos',
      routerLink: 'formulario/datosPersonales'
    },
    {
      label: 'Educacion',
      routerLink: 'formulario/educacionFormacion'
    },
    {
      label: 'Experiencia',
      routerLink: 'formulario/experienciaLaboral'
    },
    {
      label: 'Permisos',
      routerLink: 'formulario/permisosLicencias'
    },
    {
      label: 'Intereses ',
      routerLink: 'formulario/preferenciasLaborales'
    },
    {
      label: 'CV',
      routerLink: 'confirmation'
    }
    ];
  }

}
