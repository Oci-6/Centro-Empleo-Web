import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LazyLoadEvent, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { PaisService } from 'src/app/services/PaisService/pais.service';
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

  // //Filtros
  sexo: string[] = ['Masculino', 'Femenino', 'Otro'];
  selectedSexo: string = "";

  nivelEducativo: string[] = ['Primaria', 'Ciclo Básico Liceo', 'Ciclo Básico UTU', 'Bachillerato Liceo', 'Bachillerato UTU', 'Técnico Profesional UTU', 'Magisterio - Profesorado', 'Terciario no universitario', 'Universitario', 'Posgrado - Master - Doctorado'];
  selectedNE: string = "";

  areaTOp: string[] = ['Administración - Secretariado', 'Arte - Cultura', 'Atención al Cliente', 'Automotriz - Mecánica', 'Banca - Servicios Financieros', 'Comercio - Maercado - Ventas', 'Comunicación', 'Oficios - Construcción - Servicios Varios', 'Contabilidad - Auditoría - Finanzas', 'Diseño - Marketing - Publicidad', 'Estética', 'Gastronomía', 'Idiomas', 'Informática', 'Recursos Humanos', 'Salud', 'Seguridad / Vigilancia', 'Tecnologías de la Información', 'Turismo - Hotelería', 'Otro'];
  selectedArea: string = "";

  idiomas: string[] = ['Alemán', 'Chino ', 'Coreano', 'Español', 'Francés', 'Inglés', 'Italiano', 'Japonés', 'Portugués', 'Lenguaje de Señas', 'Otro'];
  selectedIdioma: string = "";

  areaRubro: string[] = ['Administración - Secretariado', 'AgroIndustria', 'Alimentos', 'Arquitectura - Paisajismo', 'Arte - Cultura', 'Atención al Cliente', 'Automotriz', 'Banca - Servicios Financieros', 'Cadetería - Cobranzas', 'Comercio - Maercado - Ventas', 'Comunicación', 'Construcción', 'Contabilidad - Auditoría - Finanzas', 'Deporte - Recreación', 'Directivos - Ejecutivos', 'Diseño - Decoración', 'Distribución - Logística - Almacenamiento', 'Eduación - Docencia', 'Estética', 'Eventos', 'Especializaciones', 'Gastronomía', 'Industria - Producción', 'Ingeniería', 'Inmobiliario', 'Importación - Exportación', 'Mantenimiento general', 'Mecánica', 'Comunicación - Marketing - Publicidad', 'Oficios - Servicios Varios', 'Pasantías', 'Recursos Humanos', 'Salud', 'Sector Legal/Jurídico', 'Seguridad / Vigilancia', 'Supermercados - Autoservices', 'Tecnologías de la Información', 'Trabajo telefónico - Call Center', 'Transporte', 'Turismo - Hotelería', 'Otro']
  selectedRubro: string = "";

  selectedInteres: string = "";

  tipoDocumento: string[] = ['Ninguno', 'Carné de salud', 'Carné Cuida Coches', 'Carné de Aplicación de productos fitosanitarios', 'Carné de clasificador', 'Carné de Foguista', 'Carné de Manipulación de alimentos', 'Libreta de conducir Cat. A', 'Libreta de conducir Cat. B', 'Libreta de conducir Cat. C', 'Libreta de conducir Cat. D', 'Libreta de conducir Cat. E', 'Libreta de conducir Cat. F', 'Libreta de conducir Cat. G1', 'Libreta de conducir Cat. G2', 'Libreta de conducir Cat. G3', 'Libreta de conducir Cat. H', 'Porte de armas', 'Otro'];
  selectedDocumento: string = "";

  public departamentos: Departamento[] = [];
  public localidades: Localidad[] | undefined;

  selectedDepartamento: string | undefined;
  selectedLocalidad: string | undefined;

  filtros: any = {};

  totalRows: number = 0;
  //Columnas ocultas
  areaT: boolean = false;
  idiomasColumn: boolean = false;
  experiencias: boolean = false;
  permisos: boolean = false;
  intereses: boolean = false;
  edad: number = 0;
  items: any[] = [];
  refresh: boolean = false;

  constructor(
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
    private paisService: PaisService,
  ) { }

  postulantes: Postulante[] = [];


  async ngOnInit(): Promise<void> {

    this.postulanteService.buscarPostulantes(this.filtros, 0).subscribe(
      response => {
        this.postulantes = response.postulantes;
        this.totalRows = response.total;
        console.log(this.postulantes);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });

      }
    )

    this.paisService.getDepartamentos(186).subscribe(
      result => {
        this.departamentos = result;
      }
    );
  }

  showInfoPostulante(postulante: Postulante): void {
    this.selectedPostulante = postulante;
    this.displayInfoPostulanteDialog = true;
  }


  calcularEdad(fechaNac: Date): number {

    return moment().diff(fechaNac, 'years', false);
  }


  filtrar(filtro: string, valor: any, header: string) {
    this.filtros[filtro] = valor;

    this.items = this.items.filter((value) => value.filtro !== filtro);
    this.items.push({ filtro: filtro, header: header, valor: filtro == "fechaNacimiento" ? "Edad: " + this.edad : valor });

    this.postulanteService.buscarPostulantes(this.filtros, 0).subscribe(
      response => {
        this.postulantes = response.postulantes;
        this.totalRows = response.total;
      }
    )

  }

  borrarFiltro(filtro: string) {
    if (filtro == '') {
      this.filtros = {};
      this.items = [];
    }
    else {
      this.filtros[filtro] = undefined;
      this.items = this.items.filter((value) => value.filtro !== filtro);
    }


    this.postulanteService.buscarPostulantes(this.filtros, 0).subscribe(
      response => {
        this.postulantes = response.postulantes;
        this.totalRows = response.total;
      }
    )


  }


  calcularEdadInverso(): Date {
    return moment(new Date()).subtract(this.edad, 'years').toDate();

  }

  onChangeDepartamento() {
    if (this.selectedDepartamento && this.departamentos) {

      let departamento = this.departamentos.find(element => element.nombre == this.selectedDepartamento);
      if (departamento) this.localidades = departamento.localidades;

    }
    this.localidades?.sort((a: any, b: any) => a.id - b.id);
    this.filtrar('departamento', this.selectedDepartamento, 'Departamento')
  }

  onPaginacion(e: any) {

    this.postulanteService.buscarPostulantes(this.filtros, e.page).subscribe(
      response => {
        this.postulantes = response.postulantes;
        this.totalRows = response.total;

      }
    )
  }

  async customSort(event: LazyLoadEvent) {
    let sortBy = event.sortField;
    let sortOrderBy = event.sortOrder == -1 ? 'ASC' : 'DESC';
    if (sortBy)
      this.filtros[sortBy] = sortOrderBy;


    let result = await this.postulanteService.buscarPostulantes(this.filtros, 0).toPromise();


    this.postulantes = result.postulantes;
    this.totalRows = result.total;

  }
}
