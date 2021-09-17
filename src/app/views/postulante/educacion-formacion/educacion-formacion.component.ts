import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  submitted: boolean | undefined = false;

  selectedNE: string | undefined;
  selectedEstadoNE: string | undefined;
  

  arreglo: FormGroup[] = [];

  postulante: Postulante = {};
  capFor: CapacitacionFormacion = {};
  conInfo: ConocimientoInfo = {};
  idioma: Idioma = {};


  capacitacionFormacionForm = this.fb.group({
    capacitaciones: this.fb.array([])
  });

  conocimientosInformaticosForm = this.fb.group({
    conocimientosI: this.fb.array([])
  });

  agregarIdiomaForm = this.fb.group({
    IdiomasArreglo: this.fb.array([])
  });
  

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private postulanteService: PostulanteService,
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

    this.getInfoPostulante(this.postulanteId);

  }

  ngOnSubmit() {
    let postulante = new Postulante();
    postulante.id = this.postulanteId;
    postulante.nivelEducativo = this.educacionFormacionForm.controls.nivelEducativo.value;
    postulante.estadoNE = this.educacionFormacionForm.controls.estadoNE.value;
    postulante.orientacionNE = this.educacionFormacionForm.controls.orientacionNE.value;

    this.postulanteService.modificarPostulante(postulante).subscribe(
      response => {

        this.educacionFormacionForm.reset;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
        this.submitted = true;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        this.submitted = false;
      }
    );

    // a


  }

  getInfoPostulante(postulanteId: number) {

    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;
        this.selectedNE = result.nivelEducativo;
        this.selectedEstadoNE = result.estadoNE;
    
      }
      
    );
  }
  
  //Get de arreglos
  get capacitaciones(){
    return this.capacitacionFormacionForm.get('capacitaciones') as FormArray;
  }

  get conocimientosI(){
    return this.conocimientosInformaticosForm.get('conocimientosI') as FormArray;
  }

  get IdiomasArreglo(){
    return this.agregarIdiomaForm.get('IdiomasArreglo') as FormArray;
  }

  //Add FormGroups a los arreglos
  addCapFor(){
    const CapForForm = this.fb.group({
    });
    CapForForm.addControl(this.capacitaciones.length+'nombreCurso', new FormControl ('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length+'areaT', new FormControl ('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length+'institucion', new FormControl ('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length+'fechaInicio', new FormControl ('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length+'tipoDuracion', new FormControl ('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length+'estadoCurso', new FormControl ('', Validators.required)),
    // console.log(this.capacitaciones);
    // console.log(this.capacitaciones.length+'nombreCurso');
    this.capacitaciones.push(CapForForm);
  }

  addConocimientosI(){
    const ConIForm = this.fb.group({
    });
    ConIForm.addControl(this.conocimientosI.length+'nombreApp', new FormControl ('', Validators.required)),
    ConIForm.addControl(this.conocimientosI.length+'categoriaCI', new FormControl ('', Validators.required)),
    ConIForm.addControl(this.conocimientosI.length+'nivelC', new FormControl ('', Validators.required));
    console.log(this.conocimientosI);
    console.log(this.conocimientosI.length+'nombreCurso');
    this.conocimientosI.push(ConIForm);
  }

  addIdioma(){
    const IdiomaForm = this.fb.group({
    });
    IdiomaForm.addControl(this.IdiomasArreglo.length+'idioma', new FormControl ('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length+'especificacion', new FormControl ('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length+'hablaConv', new FormControl ('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length+'compAud', new FormControl ('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length+'compLec', new FormControl ('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length+'escritura', new FormControl ('', Validators.required));
    console.log(this.IdiomasArreglo);
    console.log(this.IdiomasArreglo.length+'nombreCurso');
    this.IdiomasArreglo.push(IdiomaForm);
  }
  
  
  //Borrar FormGroups de los arreglos
  deleteCapFor(capForIndex:number){
    this.capacitaciones.removeAt(capForIndex);
  }

  deleteConI(conIIndex:number){
    this.conocimientosI.removeAt(conIIndex);
  }

  deleteIdioma(idiomaIndex:number){
    this.IdiomasArreglo.removeAt(idiomaIndex);
  }

  //Cambiar página del steper
  nextPage() {
    this.router.navigate(['formulario/educacionFormacion']);

    return;
  }

  prevPage() {
    this.router.navigate(['formulario/datosPersonales']);
  }

  submit(){
    console.log(this.capacitaciones.controls);
  }

  submit2(){
    console.log(this.conocimientosI.controls);
  }
  submit3(){
    console.log(this.IdiomasArreglo.controls);
  }

}


