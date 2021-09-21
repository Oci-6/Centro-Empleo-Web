import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { PreferenciaLaboral } from 'src/app/models/PreferenciaLaboral';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-intereses-preferencias',
  templateUrl: './intereses-preferencias.component.html',
  styleUrls: ['./intereses-preferencias.component.css']
})
export class InteresesPreferenciasComponent implements OnInit {

  areaInteresL: string[] = ['Administración - Secretariado', 'Agroindustria', 'Alimentos', 'Arquitectura - Paisajismo', 'Arte - Cultura',
    'Atención al Cliente', 'Automotriz', 'Banca - Servicios Financieros', 'Cadetería - Cobranzas', 'Comercio - Maercado - Ventas', 'Comunicación',
    'Construcción', 'Contabilidad - Auditoría - Finanzas', 'Deporte - Recreación', 'Directivos - Ejecutivos', 'Diseño - Decoración', 'Distribución - Logística - Almacenamiento',
    'Eduación - Docencia', 'Estética', 'Eventos', 'Especializaciones', 'Gastronomía', 'Industria - Producción', 'Ingeniería', 'Inmobiliario',
    'Importación - Exportación', 'Mantenimiento general', 'Mecánica ', 'Comunicación - Marketing - Publicidad', 'Oficios - Servicios Varios', 'Pasantías',
    'Recursos Humanos', 'Salud', 'Sector Legal/Jurídico', 'Seguridad / Vigilancia', 'Supermercados - Autoservices', 'Tecnologías de la Información', 'Trabajo telefónico - Call Center',
    'Transporte', 'Turismo - Hotelería', 'Otro'];

  postulanteId: number | undefined;
  postulante: Postulante = {};

  preferenciaLaboralForm = this.fb.group({
    preferenciasLaborales: this.fb.array([])
  });

  public JornadaPreferidaForm: FormGroup = new FormGroup({});

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

      this.JornadaPreferidaForm = new FormGroup({
        jIndiferente: new FormControl(''),
        jCompleta: new FormControl(''),
        jMtManiana: new FormControl(''),
        jMtTarde: new FormControl(''),
        jMtNoche: new FormControl(''),
      });

      this.getInfoPostulante(this.postulanteId);

    }

  }

  ngOnSubmit() {
    //Formulario normal
    let postulante = new Postulante();
    postulante.id = this.postulanteId;
    postulante.jIndiferente = this.JornadaPreferidaForm.controls.jIndiferente.value;
    postulante.jCompleta = this.JornadaPreferidaForm.controls.jCompleta.value;
    postulante.jMtManiana = this.JornadaPreferidaForm.controls.jMtManiana.value;
    postulante.jMtTarde = this.JornadaPreferidaForm.controls.jMtTarde.value;
    postulante.jMtNoche = this.JornadaPreferidaForm.controls.jMtNoche.value;


    this.postulanteService.modificarPostulante(postulante).subscribe(
      response => {

        this.JornadaPreferidaForm.reset;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      }
    );

    //Formulario con arreglo
    this.preferenciasLaborales.controls.forEach((element: any, index: number) => {

      let PrefLab: PreferenciaLaboral = new PreferenciaLaboral();

      if (element.controls[index + "id"]) {
        PrefLab.id = element.controls[index + "id"].value;
        console.log('dasda');
      }
      PrefLab.puestoPreferido = element.controls[index + "puestoPref"].value;
      PrefLab.areaInteres = element.controls[index + "areaInteresL"].value;
      PrefLab.aspiracionSalarial = element.controls[index + "aspSalarial"].value;

      console.log(PrefLab);

      if (this.postulanteId)
        this.postulanteService.postPrefLab(this.postulanteId, PrefLab).subscribe(
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
        console.log(result);
        

        this.postulante.preferenciaLaboral?.forEach((prefLab: PreferenciaLaboral) => {
          const PrefLabForm = this.fb.group({
          });
          PrefLabForm.addControl(this.preferenciasLaborales.length + 'id', new FormControl('', Validators.required));
          PrefLabForm.addControl(this.preferenciasLaborales.length + 'puestoPref', new FormControl('', Validators.required));
          PrefLabForm.addControl(this.preferenciasLaborales.length + 'areaInteresL', new FormControl('', Validators.required));
          PrefLabForm.addControl(this.preferenciasLaborales.length + 'aspSalarial', new FormControl('', Validators.required));

          PrefLabForm.controls[this.preferenciasLaborales.length + "id"].setValue(prefLab.id);
          PrefLabForm.controls[this.preferenciasLaborales.length + "puestoPref"].setValue(prefLab.puestoPreferido);
          PrefLabForm.controls[this.preferenciasLaborales.length + "areaInteresL"].setValue(prefLab.areaInteres);
          PrefLabForm.controls[this.preferenciasLaborales.length + "aspSalarial"].setValue(prefLab.aspiracionSalarial);
          // console.log(this.preferenciasLaborales);
          // console.log(this.preferenciasLaborales.length+'nombreCurso');
          this.preferenciasLaborales.push(PrefLabForm);
        })


      }
    );
  }

  //Get de arreglos
  get preferenciasLaborales() {
    return this.preferenciaLaboralForm.get('preferenciasLaborales') as FormArray;
  }

  addPrefLab() {
    const PermLicForm = this.fb.group({
    });
    PermLicForm.addControl(this.preferenciasLaborales.length + 'puestoPref', new FormControl('', Validators.required));
    PermLicForm.addControl(this.preferenciasLaborales.length + 'areaInteresL', new FormControl('', Validators.required));
    PermLicForm.addControl(this.preferenciasLaborales.length + 'aspSalarial', new FormControl('', Validators.required));
    // console.log(this.preferenciasLaborales);
    this.preferenciasLaborales.push(PermLicForm);
  }

  deletePrefLab(prefLabIndex: number) {
    this.preferenciasLaborales.removeAt(prefLabIndex);
  }

  //Cambiar página del steper
  nextPage() {
    this.router.navigate(['/']);
  }

  prevPage() {
    this.router.navigate(['formulario/permisosLicencias']);
  }

  toDate(a: string): Date {
    return new Date(a);
  }



}
