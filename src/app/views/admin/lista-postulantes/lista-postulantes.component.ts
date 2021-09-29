import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MenuItem, MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.css']
})
export class ListaPostulantesComponent implements OnInit {

  message: Message | undefined;

  selectedPostulante: any = {};

  displayInfoPostulanteDialog: boolean = false;

  cols: any[] = [];

  // //Filtros
  sexo: string[] = ['Masculino', 'Femenino', 'Otro'];
  selectedSexo: string = "";

  nivelEducativo: string[] = ['Primaria', 'Ciclo Básico Liceo', 'Ciclo Básico UTU', 'Bachillerato Liceo', 'Bachillerato UTU', 'Técnico Profesional UTU', 'Magisterio - Profesorado', 'Terciario no universitario', 'Universitario', 'Posgrado - Master - Doctorado'];
  selectedNE: string = "";

  areaTOp: string[] = ['Administración - Secretariado', 'Arte - Cultura', 'Atención al Cliente', 'Automotriz - Mecánica', 'Banca - Servicios Financieros', 'Comercio - Maercado - Ventas', 'Comunicación', 'Oficios - Construcción - Servicios Varios', 'Contabilidad - Auditoría - Finanzas', 'Diseño - Marketing - Publicidad', 'Estética', 'Gastronomía', 'Idiomas', 'Informática', 'Recursos Humanos', 'Salud', 'Seguridad / Vigilancia', 'Tecnologías de la Información', 'Turismo - Hotelería', 'Otro'];
  selectedArea: string = "";

  items: MenuItem[] = [];


  filtros: any = {};


  //Columnas ocultas
  areaT: boolean = false;
  idiomas: boolean = false;
  experiencias: boolean = false;
  permisos: boolean = false;
  intereses: boolean = false;

  constructor(
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  postulantes: Postulante[] = [];

  ngOnInit(): void {
    this.items = [
      { label: 'New', icon: 'pi pi-fw pi-plus', escape: false },
      { label: 'Open', icon: 'pi pi-fw pi-download' },
      { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
    ];
    this.cols = [
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'documento', header: 'Documento' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
      { field: 'visibilidad', header: 'Visibilidad' },
    ];

    this.postulanteService.getPostulantes().subscribe(
      (response) => {
        this.postulantes = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });
      }
    )
  }

  showInfoPostulante(postulante: Postulante): void {
    this.selectedPostulante = postulante;
    this.displayInfoPostulanteDialog = true;
  }


  calcularEdad(fechaNac: Date): number {

    return moment().diff(fechaNac, 'years', false);
  }


  filtrar(filtro: string, valor: any) {
    this.filtros[filtro] = valor;
    console.log(this.filtros);
    
    this.postulanteService.buscarPostulantes(this.filtros).subscribe(
      response => {
        this.postulantes = response;
      }
    )


  }
}
