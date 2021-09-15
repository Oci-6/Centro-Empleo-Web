import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CapacitacionFormacion } from 'src/app/models/CapacitacionFormacion';
import { ConocimientoInfo } from 'src/app/models/ConocimientoInfo';
import { Idioma } from 'src/app/models/Idioma';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { tipoD } from 'src/app/models/tipoD';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-educacion-formacion',
  templateUrl: './educacion-formacion.component.html',
  styleUrls: ['./educacion-formacion.component.css']
})
export class EducacionFormacionComponent implements OnInit {

  nivelEducativo: string[] = ['Primaria', 'Ciclo Básico Liceo', 'Ciclo Básico UTU', 'Bachillerato Liceo', 'Bachillerato Liceo o UTU', 'Técnico Profesional UTU', 'Magisterio - Profesorado', 'Terciario no universitario', 'Universitario', 'Posgrado - Master - Doctorado'];
  estadoNE: string[] = ['Completo', 'Incompleto', 'Cursando']
  areaT: string[] = ['Administración - Secretariado', 'Arte - Cultura', 'Atención al Cliente', 'Automotriz - Mecánica', 'Banca - Servicios Financieros', 'Comercio - Maercado - Ventas', 'Comunicación', 'Oficios - Construcción - Servicios Varios', 'Contabilidad - Auditoría - Finanzas', 'Diseño - Marketing - Publicidad', 'Estética', 'Gastronomía', 'Idiomas', 'Informática', 'Recursos Humanos', 'Salud', 'Seguridad / Vigilancia', 'Tecnologías de la Información', 'Turismo - Hotelería', 'Otro'];
  tipoDuracion: string[] = ['Años', 'Meses', 'Días', 'Horas'];
  estadoCurso: string[] = ['En curso', 'Finalizado', 'No finalizado'];
  categoriaCI: string[] = ['Ofimática', 'Base de Datos', 'Comunicación', 'Diseño', 'Herramientas de Gestión', 'Herramientas de Contabilidad', 'Lenguaje de Programación', 'Paquetes integrados', 'Sistemas Operativos', 'Otro']
  nivelC: string[] = ['Nivel Usuario', 'Nivel Profesional', 'Nivel Experto'];
  idiomas: string[] = ['Alemán', 'Chino ', 'Coreano', 'Español', 'Francés', 'Inglés', 'Italiano', 'Japonés', 'Portugués', 'Lenguaje de Señas', 'Otro']
  hablaConv: string[] = ['No', 'Básico', 'Regular', 'Fluido']
  compAud: string[] = ['No', 'Básico', 'Regular', 'Fluido']
  compLec: string[] = ['No', 'Básico', 'Regular', 'Fluido']
  escritura: string[] = ['No', 'Básico', 'Regular', 'Fluido']

  postulanteId: number | undefined;
  public educacionFormacionForm: FormGroup = new FormGroup({});
  public capacitacionFormacionForm: FormGroup = new FormGroup({});
  public conocimientosInformaticosForm: FormGroup = new FormGroup({});
  public agregarIdiomaForm: FormGroup = new FormGroup({});

  arreglo: FormGroup[] = [];

  postulante: Postulante = {};
  capFor: CapacitacionFormacion = {};
  conInfo: ConocimientoInfo = {};
  idioma: Idioma = {};


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
    ) { }

  ngOnInit(): void {

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.postulanteId = Number(routeParams.get('postulanteId'));

    this.educacionFormacionForm = new FormGroup({
      nivelEducativo: new FormControl('', [Validators.required]),
      estadoNE: new FormControl('', [Validators.required]),
      orientacionNE: new FormControl('', [Validators.required]),
    });
    this.capacitacionFormacionForm = new FormGroup({
      nombreCurso: new FormControl('', [Validators.required]),
      areaT: new FormControl('', [Validators.required]),
      institucion: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      tipoDuracion: new FormControl('', [Validators.required]),
      estadoCurso: new FormControl('', [Validators.required]),
    });
    this.conocimientosInformaticosForm = new FormGroup({
      nombreApp: new FormControl('', [Validators.required]),
      categoriaCI: new FormControl('', [Validators.required]),
      nivelC: new FormControl('', [Validators.required]),
    });
    this.agregarIdiomaForm = new FormGroup({
      idioma: new FormControl('', [Validators.required]),
      especificacion: new FormControl('', [Validators.required]),
      hablaConv: new FormControl('', [Validators.required]),
      compAud: new FormControl('', [Validators.required]),
      compLec: new FormControl('', [Validators.required]),
      escritura: new FormControl('', [Validators.required]),
    });

    // this.getInfoPostulante(this.postulanteId);

  }

  // getInfoPostulante(postulanteId: number) {

  //   this.postulanteService.infoPostulante(postulanteId).subscribe(
  //     result => {
  //       this.postulante = result;
  //     }
  //   );
  // }

  ngOnSubmit() {
    
  }

  nextPage() {
    this.router.navigate(['formulario/educacionFormacion']);

    return;
  }

  prevPage() {
    this.router.navigate(['formulario/datosPersonales']);
  }

}


