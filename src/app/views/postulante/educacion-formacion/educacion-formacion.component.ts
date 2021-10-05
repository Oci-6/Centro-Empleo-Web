import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CapacitacionFormacion } from 'src/app/models/CapacitacionFormacion';
import { ConocimientoInfo } from 'src/app/models/ConocimientoInfo';
import { Idioma } from 'src/app/models/Idioma';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { tipoD } from 'src/app/models/tipoD';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-educacion-formacion',
  templateUrl: './educacion-formacion.component.html',
  styleUrls: ['./educacion-formacion.component.css']
})
export class EducacionFormacionComponent implements OnInit {

  nivelEducativo: string[] = ['Primaria', 'Ciclo Básico Liceo', 'Ciclo Básico UTU', 'Bachillerato Liceo', 'Bachillerato UTU', 'Técnico Profesional UTU', 'Magisterio - Profesorado', 'Terciario no universitario', 'Universitario', 'Posgrado - Master - Doctorado'];
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
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.postulanteId = this.authService.getUser().id;
    if (this.postulanteId) {

      this.educacionFormacionForm = new FormGroup({
        nivelEducativo: new FormControl('', [Validators.required]),
        estadoNE: new FormControl('', [Validators.required]),
        orientacionNE: new FormControl(''),
      });

      this.getInfoPostulante(this.postulanteId);

    }
  }
    async ngOnSubmit(): Promise<boolean> {
      try {
      let postulante = new Postulante();
      postulante.id = this.postulanteId;
      postulante.nivelEducativo = this.educacionFormacionForm.controls.nivelEducativo.value;
      postulante.estadoNE = this.educacionFormacionForm.controls.estadoNE.value;
      postulante.orientacionNE = this.educacionFormacionForm.controls.orientacionNE.value;

      await this.postulanteService.modificarPostulante(postulante).toPromise();
      

      // a

      this.capacitaciones.controls.forEach(async(element: any, index: number) => {

        let cF: CapacitacionFormacion = new CapacitacionFormacion();

        if (element.controls[index + "id"]) {
          cF.id = element.controls[index + "id"].value;
        }
        cF.nombre = element.controls[index + "nombreCurso"].value;
        cF.areaTematica = element.controls[index + "areaT"].value;
        cF.institucion = element.controls[index + "institucion"].value;
        cF.fechaInicio = element.controls[index + "fechaInicio"].value;
        cF.estado = element.controls[index + "estadoCurso"].value;
        cF.tipoDuracion = element.controls[index + "tipoDuracion"].value;
        cF.duracion = element.controls[index + "duracion"].value;

        if (this.postulanteId)
        await  this.postulanteService.postCapacitacion(this.postulanteId, cF).toPromise();
          
      });

      this.conocimientosI.controls.forEach(async(element: any, index: number) => {

        let cI: ConocimientoInfo = new ConocimientoInfo();

        if (element.controls[index + "id"]) {
          cI.id = element.controls[index + "id"].value;
        }
        cI.nombreApp = element.controls[index + "nombreApp"].value;
        cI.categoria = element.controls[index + "categoriaCI"].value;
        cI.nivelConocimiento = element.controls[index + "nivelC"].value;
        

        if (this.postulanteId)
         await this.postulanteService.postCI(this.postulanteId, cI).toPromise();
      });

      this.IdiomasArreglo.controls.forEach(async(element: any, index: number) => {

        let Idiomas: Idioma = new Idioma();

        if (element.controls[index + "id"]) {
          Idiomas.id = element.controls[index + "id"].value;
        }
        Idiomas.nombre = element.controls[index + "idioma"].value;
        Idiomas.especificacion = element.controls[index + "especificacion"].value;
        Idiomas.hablaConv = element.controls[index + "hablaConv"].value;
        Idiomas.compAud = element.controls[index + "compAud"].value;
        Idiomas.compLec = element.controls[index + "compLec"].value;
        Idiomas.escritura = element.controls[index + "escritura"].value;
        

        if (this.postulanteId)
        await  this.postulanteService.postIdioma(this.postulanteId, Idiomas).toPromise();
            
      });

      
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
        return true;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
        return false;
      }

    }
  

    getInfoPostulante(postulanteId: number) {

      this.postulanteService.infoPostulante(postulanteId).subscribe(
        result => {
          this.postulante = result;
          this.selectedNE = result.nivelEducativo;
          this.selectedEstadoNE = result.estadoNE;

          this.educacionFormacionForm.controls["nivelEducativo"].setValue(this.postulante.nivelEducativo);
          this.educacionFormacionForm.controls["estadoNE"].setValue(this.postulante.estadoNE);
          this.educacionFormacionForm.controls["orientacionNE"].setValue(this.postulante.orientacionNE);

          this.postulante.capacitacionFormacion?.forEach((capacitacion: CapacitacionFormacion) => {
            const CapForForm = this.fb.group({
            });
            CapForForm.addControl(this.capacitaciones.length + 'id', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'nombreCurso', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'areaT', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'institucion', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'fechaInicio', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'duracion', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'tipoDuracion', new FormControl('', Validators.required));
            CapForForm.addControl(this.capacitaciones.length + 'estadoCurso', new FormControl('', Validators.required));

            CapForForm.controls[this.capacitaciones.length + "id"].setValue(capacitacion.id);
            CapForForm.controls[this.capacitaciones.length + "nombreCurso"].setValue(capacitacion.nombre);
            CapForForm.controls[this.capacitaciones.length + "areaT"].setValue(capacitacion.areaTematica);
            CapForForm.controls[this.capacitaciones.length + "institucion"].setValue(capacitacion.institucion);
            CapForForm.controls[this.capacitaciones.length + "fechaInicio"].setValue((moment(capacitacion.fechaInicio, 'YYYY-MM-DD').toDate()));
            CapForForm.controls[this.capacitaciones.length + "estadoCurso"].setValue(capacitacion.estado);
            CapForForm.controls[this.capacitaciones.length + "tipoDuracion"].setValue(capacitacion.tipoDuracion);
            CapForForm.controls[this.capacitaciones.length + "duracion"].setValue(capacitacion.duracion);
            // console.log(this.capacitaciones);
            // console.log(this.capacitaciones.length+'nombreCurso');
            this.capacitaciones.push(CapForForm);
          })


          this.postulante.conocimientoInfo?.forEach((conocimientoI: ConocimientoInfo) => {

            const ConIForm = this.fb.group({
            });
            ConIForm.addControl(this.conocimientosI.length + 'id', new FormControl('', Validators.required));
            ConIForm.addControl(this.conocimientosI.length + 'nombreApp', new FormControl('', Validators.required)),
            ConIForm.addControl(this.conocimientosI.length + 'categoriaCI', new FormControl('', Validators.required)),
            ConIForm.addControl(this.conocimientosI.length + 'nivelC', new FormControl('', Validators.required));

            ConIForm.controls[this.conocimientosI.length + "id"].setValue(conocimientoI.id);
            ConIForm.controls[this.conocimientosI.length + "nombreApp"].setValue(conocimientoI.nombreApp);
            ConIForm.controls[this.conocimientosI.length + "categoriaCI"].setValue(conocimientoI.categoria);
            ConIForm.controls[this.conocimientosI.length + "nivelC"].setValue(conocimientoI.nivelConocimiento);
            // console.log(this.conocimientosI);
            // console.log(this.conocimientosI.length + 'nombreCurso');
            this.conocimientosI.push(ConIForm);
          });

          this.postulante.idioma?.forEach((idioma:Idioma)=>{

            const IdiomaForm = this.fb.group({
            });
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'id', new FormControl('', Validators.required)),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'idioma', new FormControl('', Validators.required)),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'especificacion', new FormControl('')),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'hablaConv', new FormControl('', Validators.required)),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'compAud', new FormControl('', Validators.required)),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'compLec', new FormControl('', Validators.required)),
            IdiomaForm.addControl(this.IdiomasArreglo.length + 'escritura', new FormControl('', Validators.required));

            IdiomaForm.controls[this.IdiomasArreglo.length + "id"].setValue(idioma.id);
            IdiomaForm.controls[this.IdiomasArreglo.length + "idioma"].setValue(idioma.nombre);
            IdiomaForm.controls[this.IdiomasArreglo.length + "especificacion"].setValue(idioma.especificacion);
            IdiomaForm.controls[this.IdiomasArreglo.length + "hablaConv"].setValue(idioma.hablaConv);
            IdiomaForm.controls[this.IdiomasArreglo.length + "compAud"].setValue(idioma.compAud);
            IdiomaForm.controls[this.IdiomasArreglo.length + "compLec"].setValue(idioma.compLec);
            IdiomaForm.controls[this.IdiomasArreglo.length + "escritura"].setValue(idioma.escritura);
            // console.log(this.IdiomasArreglo);
            // console.log(this.IdiomasArreglo.length + 'nombreCurso');
            this.IdiomasArreglo.push(IdiomaForm);

          });
          
        }

      );
    }
  

  //Get de arreglos
  get capacitaciones() {
    return this.capacitacionFormacionForm.get('capacitaciones') as FormArray;
  }

  get conocimientosI() {
    return this.conocimientosInformaticosForm.get('conocimientosI') as FormArray;
  }

  get IdiomasArreglo() {
    return this.agregarIdiomaForm.get('IdiomasArreglo') as FormArray;
  }

  get f() { return this.educacionFormacionForm.controls; }

  //Add FormGroups a los arreglos
  addCapFor() {
    const CapForForm = this.fb.group({
    });
    CapForForm.addControl(this.capacitaciones.length + 'nombreCurso', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'areaT', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'institucion', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'fechaInicio', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'duracion', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'tipoDuracion', new FormControl('', Validators.required)),
    CapForForm.addControl(this.capacitaciones.length + 'estadoCurso', new FormControl('', Validators.required)),
    // console.log(this.capacitaciones);
    // console.log(this.capacitaciones.length+'nombreCurso');
    this.capacitaciones.push(CapForForm);
  }

  addConocimientosI() {
    const ConIForm = this.fb.group({
    });
    ConIForm.addControl(this.conocimientosI.length + 'nombreApp', new FormControl('', Validators.required)),
    ConIForm.addControl(this.conocimientosI.length + 'categoriaCI', new FormControl('', Validators.required)),
    ConIForm.addControl(this.conocimientosI.length + 'nivelC', new FormControl('', Validators.required));
    // console.log(this.conocimientosI);
    // console.log(this.conocimientosI.length + 'nombreCurso');
    this.conocimientosI.push(ConIForm);
  }

  addIdioma() {
    const IdiomaForm = this.fb.group({
    });
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'idioma', new FormControl('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'especificacion', new FormControl('')),
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'hablaConv', new FormControl('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'compAud', new FormControl('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'compLec', new FormControl('', Validators.required)),
    IdiomaForm.addControl(this.IdiomasArreglo.length + 'escritura', new FormControl('', Validators.required));
    console.log(this.IdiomasArreglo);
    // console.log(this.IdiomasArreglo.length + 'nombreCurso');
    this.IdiomasArreglo.push(IdiomaForm);
  }

  onChangeNivelE(){
    this.selectedNE = this.educacionFormacionForm.controls.nivelEducativo.value
  }

  idiomaEspecificacion(index:number, i:any):boolean{
  return i.controls[index+'idioma'].value == 'Otro';
  }

  //Borrar FormGroups de los arreglos
  deleteCapFor(capForIndex: number) {
    this.capacitaciones.removeAt(capForIndex);
  }

  deleteConI(conIIndex: number) {
    this.conocimientosI.removeAt(conIIndex);
  }

  deleteIdioma(idiomaIndex: number) {
    this.IdiomasArreglo.removeAt(idiomaIndex);
  }

  //Cambiar página del steper
  
  async nextPage() {
    this.submitted = true;
    if(this.educacionFormacionForm.valid&&this.agregarIdiomaForm.valid&&this.capacitacionFormacionForm.valid&&this.conocimientosInformaticosForm.valid){
      if (await this.ngOnSubmit()) {
      this.router.navigate(['formulario/experienciaLaboral']);
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }
    
    return;
  }

  prevPage() {
    this.router.navigate(['formulario/datosPersonales']);
  }

  

  // submit() {
  //   console.log(this.capacitaciones.controls);
  // }

  // submit2() {
  //   console.log(this.conocimientosI.controls);
  // }
  // submit3() {
  //   console.log(this.IdiomasArreglo.controls);
  // }

  

}


