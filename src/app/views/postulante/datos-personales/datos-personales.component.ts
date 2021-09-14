import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';
import { Message } from 'src/app/models/Message';
import { Pais } from 'src/app/models/Pais';
import { Postulante } from 'src/app/models/Postulante';
import { tipoD } from 'src/app/models/tipoD';
import { PaisService } from 'src/app/services/PaisService/pais.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  tipoDocumento: tipoD[] = [];

  public paises: Pais[] = [];
  public departamentos: Departamento[] = [];
  public localidades: Localidad[] = [];

  sexo: string[] = ['Masculino','Femenino','Otro'];

  selectedSexo: string | undefined;

  postulante: Postulante = {};

  selectedTipoD: tipoD = {nombre: ''}; 
  selectedPais: Pais | undefined;
  selectedDepartamento: Departamento | undefined;
  selectedLocalidad: number | undefined;

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
    private paisService: PaisService,
  ) {
    
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

    this.paisService.getPaises().subscribe(
      result =>{
        this.paises = result;
      }
    );

    console.log(this.postulante);

  }

  getInfoPostulante(postulanteId: number) {

    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;
        console.log(this.postulante);
      }
      
    );
  }

  convertirFecha(fecha: Date | undefined) {

    return moment(fecha).format("DD-MM-YYYY");

  }

  // getDepartamentos(selectedPais: Pais){
    
  // }

  onChangePais(){
    if(this.selectedPais?.departamentos) this.departamentos = this.selectedPais?.departamentos;
    console.log(this.selectedPais?.departamentos);
  }

  onChangeDepartamento(){
    if(this.selectedDepartamento?.localidades) this.localidades = this.selectedDepartamento?.localidades;
    console.log(this.selectedPais?.departamentos);
  }

  ngOnSubmit() {
    let postulante = new Postulante();
    postulante.id = this.postulanteId;
    postulante.tipoDocumento = this.datosPersonalesForm.controls.tipoDocumento.value.nombre;
    postulante.documento = this.datosPersonalesForm.controls.documento.value;
    postulante.primerNombre = this.datosPersonalesForm.controls.primerApellido.value;
    postulante.segundoNombre = this.datosPersonalesForm.controls.segundoApellido.value;
    postulante.primerApellido = this.datosPersonalesForm.controls.primerNombre.value;
    postulante.segundoApellido = this.datosPersonalesForm.controls.segundoNombre.value;
    postulante.sexo = this.datosPersonalesForm.controls.sexo.value;
    postulante.fechaNacimiento = this.datosPersonalesForm.controls.fechaN.value;
    postulante.pais = this.datosPersonalesForm.controls.pais.value;
    postulante.paisId = this.datosPersonalesForm.controls.pais.value.id;
    if(postulante.pais?.nombre=="Uruguay"){
      postulante.localidadId = this.datosPersonalesForm.controls.localidad.value;
      console.log(postulante.localidadId)
    }
    postulante.barrio = this.datosPersonalesForm.controls.barrio.value;
    postulante.direccion = this.datosPersonalesForm.controls.direccion.value;
    postulante.primerTelefono = this.datosPersonalesForm.controls.primerTelefono.value;
    postulante.segundoTelefono = this.datosPersonalesForm.controls.segundoTelefono.value;
    postulante.recibirOfertas = this.datosPersonalesForm.controls.noticias.value;


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

   
}

