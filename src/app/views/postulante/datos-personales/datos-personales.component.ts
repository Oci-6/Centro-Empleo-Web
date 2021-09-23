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

        //Setear pais y departamentos del mismo en options
        this.datosPersonalesForm.controls["pais"].setValue(result.pais?.id);
        if (result.pais?.departamentos) this.departamentos = result.pais?.departamentos;

        //Setear departamento desde localidad
        if (result.localidad?.departamento?.nombre) {
          this.datosPersonalesForm.controls["departamento"].setValue(result.localidad?.departamento.id);

          //Setear localidad y obtenerlas desde departamento
          if (result.localidad?.nombre) this.datosPersonalesForm.controls["localidad"].setValue(result.localidad?.id);
          this.getLocalidades(result.localidad?.departamento?.id);
        }

        this.selectedFechaN = this.convertirFecha(result.fechaNacimiento);

        this.datosPersonalesForm.controls["fechaN"].setValue((moment(this.postulante.fechaNacimiento, 'YYYY-MM-DD').toDate()));



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

  uruguay(): boolean {
    return this.datosPersonalesForm.controls.pais.value == this.paises.find(element => element.nombre === "Uruguay")?.id;
  }

  onChangePais() {
    let pais = this.paises.find(element => element.id == this.datosPersonalesForm.controls.pais.value)
    if (pais?.departamentos) this.departamentos = pais.departamentos;
  }

  onChangeDepartamento() {
    let departamento = this.departamentos.find(element => element.id === this.datosPersonalesForm.controls.departamento.value)
    if (departamento?.localidades) this.localidades = departamento.localidades;
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
    postulante.paisId = this.datosPersonalesForm.controls.pais.value;
    // console.log(this.selectedLocalidad);

    if (this.datosPersonalesForm.controls.pais.value == this.paises.find(element => element.nombre === "Uruguay")?.id) {

      postulante.localidadId = this.datosPersonalesForm.controls.localidad.value;
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

