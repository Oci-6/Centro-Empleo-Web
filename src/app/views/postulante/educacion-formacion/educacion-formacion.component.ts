import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  tipoDocumento: tipoD[] = [];

  sexo: string[] = ['Masculino','Femenino','Otro'];

  selectedSexo: string | undefined;

  postulante: Postulante = {};

  selectedTipoD: tipoD = {nombre: ''}; 

  message: Message | undefined;

  fechaN = '';

  fecha: Date | undefined | string;

  postulanteId: number | undefined;

  public datosPersonalesForm: FormGroup = new FormGroup({});

  value: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
  ) {
    
    this.tipoDocumento = [
      {nombre: 'Cedula de Identidad'},
      {nombre: 'Pasaporte'},
    ]; 

    this.tipoDocumento = [
      {nombre: 'Cedula de Identidad'},
      {nombre: 'Pasaporte'},
    ]; 

  }

  ngOnInit(): void {

      // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.postulanteId = Number(routeParams.get('postulanteId'));

    this.datosPersonalesForm = new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      primerApellido: new FormControl('', [Validators.required]),
      segundoApellido: new FormControl(''),
      primerNombre: new FormControl('', [Validators.required]),
      segundoNombre: new FormControl(''),
      sexo: new FormControl('', [Validators.required]),
      fechaN: new FormControl('', [Validators.required]),

      pais: new FormControl('', [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      barrio: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),

      primerTelefono: new FormControl('', [Validators.required]),
      segundoTelefono: new FormControl(''),
      
      noticias: new FormControl('', [Validators.required]),
    });

    this.getInfoPostulante(this.postulanteId);

  }

  getInfoPostulante(postulanteId: number) {

    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;
      }
    );
  }

  ngOnSubmit() {
    let postulante = new Postulante();
    postulante.tipoDocumento = this.datosPersonalesForm.controls.tipoDocumento.value;
    postulante.documento = this.datosPersonalesForm.controls.documento.value;
    postulante.primerNombre = this.datosPersonalesForm.controls.primerApellido.value;
    postulante.segundoNombre = this.datosPersonalesForm.controls.segundoApellido.value;
    postulante.primerApellido = this.datosPersonalesForm.controls.primerNombre.value;
    postulante.segundoApellido = this.datosPersonalesForm.controls.segundoNombre.value;
    postulante.sexo = this.datosPersonalesForm.controls.sexo.value;
    postulante.fechaNacimiento = this.datosPersonalesForm.controls.fechaN.value;

    console.log(postulante);

    this.postulanteService.modificarPostulante(postulante).subscribe(
      response => {

        this.datosPersonalesForm.reset;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la clase' });
      }
    );

  }

  nextPage() {
        this.router.navigate(['formulario/educacionFormacion']);

      return;
    }

    prevPage() {
      this.router.navigate(['formulario/datosPersonales']);
  }

}


