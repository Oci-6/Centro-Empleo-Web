import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { PermisosLicencias } from 'src/app/models/PermisosLicencias';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-permisos-licencias',
  templateUrl: './permisos-licencias.component.html',
  styleUrls: ['./permisos-licencias.component.css']
})
export class PermisosLicenciasComponent implements OnInit {

  tipoDocumento: string[] = ['Ninguno', 'Carné de salud', 'Carné Cuida Coches', 'Carné de Aplicación de productos fitosanitarios', 'Carné de clasificador', 
  'Carné de Foguista', 'Carné de Manipulación de alimentos', 'Libreta de conducir Cat. A', 'Libreta de conducir Cat. B', 'Libreta de conducir Cat. C',
  'Libreta de conducir Cat. D', 'Libreta de conducir Cat. E', 'Libreta de conducir Cat. F', 'Libreta de conducir Cat. G1', 'Libreta de conducir Cat. G2', 
  'Libreta de conducir Cat. G3', 'Libreta de conducir Cat. H', 'Porte de armas', 'Otro']

  postulanteId: number | undefined;
  postulante: Postulante = {};
  
  selectedTipoD: string | undefined;

  permisosLicenciasForm = this.fb.group({
    permisosLicencias: this.fb.array([])
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
    this.permisosLicencias.controls.forEach((element: any, index: number) => {

      let PL: PermisosLicencias = new PermisosLicencias();

      if (element.controls[index + "id"]) {
        PL.id = element.controls[index + "id"].value;
        console.log('dasda');
      }
      PL.tipoDocumento = element.controls[index + "tipoDocumento"].value;
      PL.especificacion = element.controls[index + "especificacion"].value;     
      PL.vigencia = moment(element.controls[index + "vigencia"].value,'MM-DD-YYYY').toDate();
            
      console.log(PL);

      if (this.postulanteId)
        this.postulanteService.postPermisosLicencias(this.postulanteId, PL).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });

          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
          }
        )
    });

  }

  // onChangeTipoD() {
  //   if (this.selectedPais?.departamentos) this.departamentos = this.selectedPais?.departamentos;
  //   console.log(this.selectedPais);
  //   console.log(this.selectedPais?.departamentos);
  // }

  getInfoPostulante(postulanteId: number) {
    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;

        this.postulante.permisosLicencias?.forEach((permisoLicencia: PermisosLicencias) => {
          const PermLicForm = this.fb.group({
          });
          PermLicForm.addControl(this.permisosLicencias.length + 'id', new FormControl('', Validators.required));
          PermLicForm.addControl(this.permisosLicencias.length + 'tipoDocumento', new FormControl('', Validators.required));
          PermLicForm.addControl(this.permisosLicencias.length + 'vigencia', new FormControl('', Validators.required));
          PermLicForm.addControl(this.permisosLicencias.length + 'especificacion', new FormControl(''));

          PermLicForm.controls[this.permisosLicencias.length + "id"].setValue(permisoLicencia.id);
          PermLicForm.controls[this.permisosLicencias.length + "tipoDocumento"].setValue(permisoLicencia.tipoDocumento);
          PermLicForm.controls[this.permisosLicencias.length + "vigencia"].setValue((moment(permisoLicencia.vigencia, 'YYYY-MM-DD').toDate()));
          PermLicForm.controls[this.permisosLicencias.length + "especificacion"].setValue(permisoLicencia.especificacion);
          // console.log(this.permisosLicencias);
          // console.log(this.permisosLicencias.length+'nombreCurso');
          this.permisosLicencias.push(PermLicForm);
        })


      }
    );
  }

  get permisosLicencias() {
    return this.permisosLicenciasForm.get('permisosLicencias') as FormArray;
  }

  addPermLic() {
    const PermLicForm = this.fb.group({
    });
    PermLicForm.addControl(this.permisosLicencias.length + 'tipoDocumento', new FormControl('', Validators.required));
    PermLicForm.addControl(this.permisosLicencias.length + 'vigencia', new FormControl('', Validators.required));
    PermLicForm.addControl(this.permisosLicencias.length + 'especificacion', new FormControl('', Validators.required));
    // console.log(this.permisosLicencias);
    // console.log(this.permisosLicencias.length+'nombreCurso');
    this.permisosLicencias.push(PermLicForm);
  }

  deletePermLic(permLicIndex: number) {
    this.permisosLicencias.removeAt(permLicIndex);
  }

  //Cambiar página del steper
  nextPage() {
    this.router.navigate(['/formulario/preferenciasLaborales']);
  }

  prevPage() {
    this.router.navigate(['formulario/experienciaLaboral']);
  }

  toDate(a: string): Date {
    return new Date(a);
  }


}
