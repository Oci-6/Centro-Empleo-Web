import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ExpLaboral } from 'src/app/models/ExpLaboral';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-experiencias-laborales',
  templateUrl: './experiencias-laborales.component.html',
  styleUrls: ['./experiencias-laborales.component.css']
})
export class ExperienciasLaboralesComponent implements OnInit {

  nivelJerarquico: string[] = ['Independiente', 'Empleado', 'Supervisor', 'Encargado', 'Gerente', 'Director']
  areaRubro: string[] = ['Administración - Secretariado', 'AgroIndustria', 'Alimentos', 'Arquitectura - Paisajismo',
    'Arte - Cultura', 'Atención al Cliente', 'Automotriz', 'Banca - Servicios Financieros', 'Cadetería - Cobranzas', 'Comercio - Maercado - Ventas',
    'Comunicación', 'Construcción', 'Contabilidad - Auditoría - Finanzas', 'Deporte - Recreación', 'Directivos - Ejecutivos', 'Diseño - Decoración',
    'Distribución - Logística - Almacenamiento', 'Eduación - Docencia', 'Estética', 'Eventos', 'Especializaciones', 'Gastronomía', 'Industria - Producción',
    'Ingeniería', 'Inmobiliario', 'Importación - Exportación', 'Mantenimiento general', 'Mecánica', 'Comunicación - Marketing - Publicidad', 'Oficios - Servicios Varios',
    'Pasantías', 'Recursos Humanos', 'Salud', 'Sector Legal/Jurídico', 'Seguridad / Vigilancia', 'Supermercados - Autoservices', 'Tecnologías de la Información',
    'Trabajo telefónico - Call Center', 'Transporte', 'Turismo - Hotelería', 'Otro']

  postulanteId: number | undefined;
  postulante: Postulante = {};

  expLaboralForm = this.fb.group({
    experienciasL: this.fb.array([])
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
    this.postulanteId = this.authService.getUser();
    if (this.postulanteId) {
      this.getInfoPostulante(this.postulanteId);
    }
  }

  ngOnSubmit() {
    this.experienciasL.controls.forEach((element: any, index: number) => {

      let eL: ExpLaboral = new ExpLaboral();

      if (element.controls[index + "id"]) {
        eL.id = element.controls[index + "id"].value;
        console.log('dasda');
      }
      eL.nombreEmp = element.controls[index + "nombreEmpresa"].value;
      eL.cargo = element.controls[index + "cargo"].value;
      eL.area = element.controls[index + "areaRubro"].value;
      eL.nivelJer = element.controls[index + "nivelJerarquico"].value;
      eL.tareas = element.controls[index + "tareas"].value;
      eL.fechaInicio = moment(element.controls[index + "fechaInicio"].value,'MM-DD-YYYY').toDate();
      eL.fechaFin = moment(element.controls[index + "fechaFin"].value,'MM-DD-YYYY').toDate();
      eL.trabajando = element.controls[index + "trabajando"].value;

      eL.nombreRef = element.controls[index + "nombreRef"].value;
      eL.apellidoRef = element.controls[index + "apellidoRef"].value;
      eL.cargoRef = element.controls[index + "cargoRef"].value;
      eL.telefonoRef = element.controls[index + "telefonoRef"].value;
      eL.emailRef = element.controls[index + "emailRef"].value;
      
      console.log(eL);

      if (this.postulanteId)
        this.postulanteService.postExpLaboral(this.postulanteId, eL).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });

          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
          }
        )
    });

  }

  getInfoPostulante(postulanteId: number) {
    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;

        this.postulante.expLaboral?.forEach((experienciaL: ExpLaboral) => {
          const ExpLabForm = this.fb.group({
          });
          ExpLabForm.addControl(this.experienciasL.length + 'id', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'nombreEmpresa', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'cargo', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'areaRubro', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'nivelJerarquico', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'tareas', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'fechaInicio', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'fechaFin', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'trabajando', new FormControl('', Validators.required));

          ExpLabForm.addControl(this.experienciasL.length + 'nombreRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'apellidoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'cargoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'telefonoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'emailRef', new FormControl('', Validators.required));

          ExpLabForm.controls[this.experienciasL.length + "id"].setValue(experienciaL.id);
          ExpLabForm.controls[this.experienciasL.length + "nombreEmpresa"].setValue(experienciaL.nombreEmp);
          ExpLabForm.controls[this.experienciasL.length + "cargo"].setValue(experienciaL.cargo);
          ExpLabForm.controls[this.experienciasL.length + "areaRubro"].setValue(experienciaL.area);
          ExpLabForm.controls[this.experienciasL.length + "nivelJerarquico"].setValue(experienciaL.nivelJer);
          ExpLabForm.controls[this.experienciasL.length + "tareas"].setValue(experienciaL.tareas);
          ExpLabForm.controls[this.experienciasL.length + "fechaInicio"].setValue((moment(experienciaL.fechaInicio,'YYYY-MM-DD').toDate()));
          ExpLabForm.controls[this.experienciasL.length + "fechaFin"].setValue((moment(experienciaL.fechaFin,'YYYY-MM-DD').toDate()));
          ExpLabForm.controls[this.experienciasL.length + "trabajando"].setValue(experienciaL.trabajando);

          ExpLabForm.controls[this.experienciasL.length + "nombreRef"].setValue(experienciaL.nombreRef);
          ExpLabForm.controls[this.experienciasL.length + "apellidoRef"].setValue(experienciaL.apellidoRef);
          ExpLabForm.controls[this.experienciasL.length + "cargoRef"].setValue(experienciaL.cargoRef);
          ExpLabForm.controls[this.experienciasL.length + "telefonoRef"].setValue(experienciaL.telefonoRef);
          ExpLabForm.controls[this.experienciasL.length + "emailRef"].setValue(experienciaL.emailRef);
          // console.log(this.experienciasL);
          // console.log(this.experienciasL.length+'nombreCurso');
          this.experienciasL.push(ExpLabForm);
        })


      }
      );
    }
  

  get experienciasL() {
      return this.expLaboralForm.get('experienciasL') as FormArray;
    }

  addExpLaboral() {
      const ExpLabForm = this.fb.group({
      });
      ExpLabForm.addControl(this.experienciasL.length + 'nombreEmpresa', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'cargo', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'areaRubro', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'nivelJerarquico', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'tareas', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'fechaInicio', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'fechaFin', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'trabajando', new FormControl('', Validators.required));

      ExpLabForm.addControl(this.experienciasL.length + 'nombreRef', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'apellidoRef', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'cargoRef', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'telefonoRef', new FormControl('', Validators.required));
      ExpLabForm.addControl(this.experienciasL.length + 'emailRef', new FormControl('', Validators.required));
      // console.log(this.experienciasL);
      // console.log(this.experienciasL.length+'nombreCurso');
      this.experienciasL.push(ExpLabForm);
    }

    deleteExpLab(expLabIndex: number) {
      this.experienciasL.removeAt(expLabIndex);
    }
  
    //Cambiar página del steper
    nextPage() {
      this.router.navigate(['/formulario/experienciaLaboral']);
    }
  
    prevPage() {
      this.router.navigate(['formulario/educacionFormacion']);
    }

    toDate(a: string):Date{
      return new Date(a);
    }



}
