import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
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
  submitted: boolean | undefined = false;

  hoy: Date = moment(new Date()).subtract(1, 'day').toDate();

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
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.postulanteId = this.authService.getUser().id;
    if (this.postulanteId) {
      this.getInfoPostulante(this.postulanteId);
    }
  }

  ngOnSubmit(): boolean {
    try {
      this.experienciasL.controls.forEach(async (element: any, index: number) => {

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
        eL.fechaInicio = moment(element.controls[index + "fechaInicio"].value, 'MM-DD-YYYY').toDate();
        eL.fechaFin = moment(element.controls[index + "fechaFin"].value, 'MM-DD-YYYY').toDate();
        eL.trabajando = element.controls[index + "trabajando"].value;

        eL.nombreRef = element.controls[index + "nombreRef"].value;
        eL.apellidoRef = element.controls[index + "apellidoRef"].value;
        eL.cargoRef = element.controls[index + "cargoRef"].value;
        eL.telefonoRef = element.controls[index + "telefonoRef"].value;
        eL.emailRef = element.controls[index + "emailRef"].value;

        console.log(eL);

        if (this.postulanteId)
          await this.postulanteService.postExpLaboral(this.postulanteId, eL).toPromise()

      });
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la clase' });
      return false;
    }

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
          ExpLabForm.addControl(this.experienciasL.length + 'trabajando', new FormControl(false, Validators.required));

          ExpLabForm.addControl(this.experienciasL.length + 'nombreRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'apellidoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'cargoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'telefonoRef', new FormControl('', Validators.required));
          ExpLabForm.addControl(this.experienciasL.length + 'emailRef', new FormControl('', [Validators.required, Validators.email]));

          ExpLabForm.controls[this.experienciasL.length + "id"].setValue(experienciaL.id);
          ExpLabForm.controls[this.experienciasL.length + "nombreEmpresa"].setValue(experienciaL.nombreEmp);
          ExpLabForm.controls[this.experienciasL.length + "cargo"].setValue(experienciaL.cargo);
          ExpLabForm.controls[this.experienciasL.length + "areaRubro"].setValue(experienciaL.area);
          ExpLabForm.controls[this.experienciasL.length + "nivelJerarquico"].setValue(experienciaL.nivelJer);
          ExpLabForm.controls[this.experienciasL.length + "tareas"].setValue(experienciaL.tareas);
          ExpLabForm.controls[this.experienciasL.length + "fechaInicio"].setValue((moment(experienciaL.fechaInicio, 'YYYY-MM-DD').toDate()));
          ExpLabForm.controls[this.experienciasL.length + "fechaFin"].setValue((moment(experienciaL.fechaFin, 'YYYY-MM-DD').toDate()));
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
    ExpLabForm.addControl(this.experienciasL.length + 'trabajando', new FormControl(false));

    ExpLabForm.addControl(this.experienciasL.length + 'nombreRef', new FormControl('', Validators.required));
    ExpLabForm.addControl(this.experienciasL.length + 'apellidoRef', new FormControl('', Validators.required));
    ExpLabForm.addControl(this.experienciasL.length + 'cargoRef', new FormControl('', Validators.required));
    ExpLabForm.addControl(this.experienciasL.length + 'telefonoRef', new FormControl('', Validators.required));
    ExpLabForm.addControl(this.experienciasL.length + 'emailRef', new FormControl('', [Validators.required, Validators.email]));
    // console.log(this.experienciasL);
    // console.log(this.experienciasL.length+'nombreCurso');
    this.experienciasL.push(ExpLabForm);
  }

  deleteExpLab(expLabIndex: number) {
    let form: any = this.experienciasL.at(expLabIndex);
    console.log(form.controls[expLabIndex + 'id']);


    this.confirmationService.confirm({
      message: '¿Seguro quiere eliminar es experiencia laboral?',
      header: 'Confirmar',
      icon: 'pi pi-info-warning',
      accept: async () => {
        if (
          form.controls[expLabIndex + 'id']) {
          this.postulanteService.deleteExpLaboral(form.controls[expLabIndex + 'id'].value).toPromise();
          this.experienciasL.removeAt(expLabIndex);
        } else {
          this.experienciasL.removeAt(expLabIndex);
        }
        this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Experiencia Laboral borrada' });
      },

    });

  }

  //Cambiar página del steper

  async nextPage() {
    this.submitted = true;
    if (this.expLaboralForm.valid) {
      if (this.ngOnSubmit()) {
        this.router.navigate(['/formulario/permisosLicencias']);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }

    return;
  }

  prevPage() {
    this.router.navigate(['formulario/educacionFormacion']);
  }

  toDate(a: string): Date {
    return new Date(a);
  }



}
