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
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PaisService } from 'src/app/services/PaisService/pais.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  tipoDocumento: tipoD[] = [];
  submitted: boolean | undefined = false;

  public paises: Pais[] = [];
  public departamentos: Departamento[] = [];
  public localidades: Localidad[] = [];

  sexo: string[] = ['Masculino', 'Femenino', 'Otro'];

  selectedSexo: string | undefined;

  postulante: Postulante = {};

  selectedTipoD: tipoD = { nombre: '' };
  selectedPais: Pais | undefined;
  selectedDepartamento: Departamento | undefined;
  selectedLocalidad: Localidad | undefined;
  selectedFechaN: Date | undefined;

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
    private authService: AuthService,
  ) {

    this.tipoDocumento = [
      { nombre: 'Cedula de Identidad' },
      { nombre: 'Pasaporte' },
    ];

  }

  ngOnInit(): void {

    // Route params
    this.postulanteId = this.authService.getUser();
    if (this.postulanteId) {
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

      

      this.paisService.getPaises().subscribe(
        result => {
          this.paises = result;
        }
      );


      this.getInfoPostulante(this.postulanteId);
      
    
    }
  }

  getInfoPostulante(postulanteId: number) {

    this.postulanteService.infoPostulante(postulanteId).subscribe(
      result => {
        this.postulante = result;
        // console.log(this.postulante);
        this.selectedPais = result.pais;
        if (result.pais?.departamentos) this.departamentos = result.pais?.departamentos;
        if (result.localidad?.departamento?.nombre) this.selectedDepartamento = result.localidad?.departamento;
        this.selectedLocalidad = result.localidad;
        this.selectedFechaN = this.convertirFecha(result.fechaNacimiento);
        // console.log(this.postulante.fechaNacimiento);
        // console.log(result.localidad);
        // console.log(this.selectedDepartamento);
        this.getLocalidades(this.selectedDepartamento?.id);
        this.datosPersonalesForm.controls["fechaN"].setValue((moment(this.postulante.fechaNacimiento, 'YYYY-MM-DD').toDate()));
        this.datosPersonalesForm.controls["pais"].setValue(this.selectedPais?.id);
        console.log(this.postulante);
        console.log(this.selectedLocalidad);
        console.log(this.selectedPais);
        

        //  if(result.pais?.nombre=='Uruguay'){
        //    if(result.localidad) this.selectedLocalidad = result.localidad;
        //    this.selectedDepartamento = this.selectedLocalidad?.departamento;
        //  }
        //  console.log(result.pais?.departamentos);
        // this.selectedDepartamento = result.pais?.

        // this.selectedTipoD = result.tipoDocumento;
      }

    );
  }

  getLocalidades(departamento: number | undefined) {
    this.paisService.getLocalidades(departamento).subscribe(
      result => {
        this.localidades = result;

      },
    );

  }

  convertirFecha(fecha: Date | undefined): Date {

    return moment(fecha, "DD-MM-YYYY").toDate();


  }

  onChangePais() {
    if (this.selectedPais?.departamentos) this.departamentos = this.selectedPais?.departamentos;
    console.log(this.selectedPais);
    console.log(this.selectedPais?.departamentos);
  }

  onChangeDepartamento() {
    if (this.selectedDepartamento?.localidades) this.localidades = this.selectedDepartamento?.localidades;
    console.log(this.selectedDepartamento);
    
    // console.log(this.selectedPais?.departamentos);
  }

  async ngOnSubmit() {
    let postulante = new Postulante();
    postulante.id = this.postulanteId;
    postulante.tipoDocumento = this.datosPersonalesForm.controls.tipoDocumento.value;
    postulante.documento = this.datosPersonalesForm.controls.documento.value;
    postulante.primerNombre = this.datosPersonalesForm.controls.primerNombre.value;
    postulante.segundoNombre = this.datosPersonalesForm.controls.segundoNombre.value;
    postulante.primerApellido = this.datosPersonalesForm.controls.primerApellido.value;
    postulante.segundoApellido = this.datosPersonalesForm.controls.segundoApellido.value;
    postulante.sexo = this.datosPersonalesForm.controls.sexo.value;
    postulante.fechaNacimiento = this.datosPersonalesForm.controls.fechaN.value;
    // postulante.pais = this.datosPersonalesForm.controls.pais.value;
    postulante.paisId = this.datosPersonalesForm.controls.pais.value.id;
    // console.log(this.selectedLocalidad);
    
    if (this.selectedPais?.nombre == "Uruguay") {
      let localidad: Localidad | undefined = this.selectedLocalidad;
      if(localidad)console.log(localidad.id);
      if(localidad) postulante.localidadId = localidad.id;
      // console.log(localidad)
    }
    postulante.barrio = this.datosPersonalesForm.controls.barrio.value;
    postulante.direccion = this.datosPersonalesForm.controls.direccion.value;
    postulante.primerTelefono = this.datosPersonalesForm.controls.primerTelefono.value;
    postulante.segundoTelefono = this.datosPersonalesForm.controls.segundoTelefono.value;
    postulante.recibirOfertas = this.datosPersonalesForm.controls.noticias.value;


    // console.log(postulante);

    this.postulanteService.modificarPostulante(postulante).subscribe(
      response => {

        this.datosPersonalesForm.reset;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
        this.submitted = true;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la clase' });
        this.submitted = false;
      }
    );

  }

  async nextPage() {
    await this.ngOnSubmit();
    if (this.submitted) {
      this.router.navigate(['formulario/educacionFormacion']);
    }

    return;
  }


}

