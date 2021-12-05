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
  sumi: boolean | undefined = false;

  public paises: Pais[] = [];
  public departamentos: Departamento[] | undefined = [];
  public localidades: Localidad[] | undefined = [];

  sexo: string[] = ['Masculino', 'Femenino', 'Otro'];

  selectedSexo: string | undefined;

  postulante: Postulante = {};

  selectedTipoD: tipoD = { nombre: '' };
  selectedPais: number | undefined;
  selectedDepartamento: number | undefined;
  selectedLocalidad: number | undefined;
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
    this.postulanteId = this.authService.getUser().id;
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
        departamento: new FormControl(''),
        localidad: new FormControl(''),
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
        this.selectedPais = result.pais?.id;
        if (result.pais?.departamentos) this.departamentos = result.pais?.departamentos;
        this.departamentos?.sort((a: any, b: any) => a.id - b.id)
        if (this.departamentos && this.selectedDepartamento && result.localidad?.departamento?.nombre) this.departamentos[this.selectedDepartamento - 1] = result.localidad?.departamento;
        if (result.localidad) this.selectedLocalidad = result.localidad.id;
        this.selectedFechaN = this.convertirFecha(result.fechaNacimiento);
        if (result.localidad?.departamento) this.selectedDepartamento = result.localidad.departamento.id;
        // console.log(this.postulante.fechaNacimiento);
        // console.log(result.localidad);
        // console.log(this.selectedDepartamento);
        if(this.selectedDepartamento) this.getLocalidades(this.selectedDepartamento);
        if (this.postulante.fechaNacimiento) {
          this.datosPersonalesForm.controls["fechaN"].setValue((moment(this.postulante.fechaNacimiento, 'YYYY-MM-DD').toDate()));
        }
        this.datosPersonalesForm.controls["pais"].setValue(this.selectedPais);
        this.datosPersonalesForm.controls["tipoDocumento"].setValue(this.postulante.tipoDocumento);
        this.datosPersonalesForm.controls["documento"].setValue(this.postulante.documento);
        this.datosPersonalesForm.controls["primerApellido"].setValue(this.postulante.primerApellido);
        this.datosPersonalesForm.controls["segundoApellido"].setValue(this.postulante.segundoApellido);
        this.datosPersonalesForm.controls["primerNombre"].setValue(this.postulante.primerNombre);
        this.datosPersonalesForm.controls["segundoNombre"].setValue(this.postulante.segundoNombre);
        this.datosPersonalesForm.controls["sexo"].setValue(this.postulante.sexo);
        this.datosPersonalesForm.controls["departamento"].setValue(this.selectedDepartamento);
        this.datosPersonalesForm.controls["barrio"].setValue(this.postulante.barrio);
        this.datosPersonalesForm.controls["direccion"].setValue(this.postulante.direccion);
        this.datosPersonalesForm.controls["primerTelefono"].setValue(this.postulante.primerTelefono);
        this.datosPersonalesForm.controls["segundoTelefono"].setValue(this.postulante.segundoTelefono);
        this.datosPersonalesForm.controls["noticias"].setValue(this.postulante.recibirOfertas);
        this.datosPersonalesForm.controls["localidad"].setValue(this.postulante.localidad?.id);

        console.log(this.postulante);
        // console.log(this.selectedLocalidad);
        // console.log(this.selectedPais);


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
        this.localidades?.sort((a: any, b: any) => a.id - b.id)

      },
    );

  }

  convertirFecha(fecha: Date | undefined): Date {

    return moment(fecha, "DD-MM-YYYY").toDate();


  }

  get f() { return this.datosPersonalesForm.controls; }

  uruguay(): boolean {
    return this.datosPersonalesForm.controls.pais.value == this.paises.find(element => element.nombre === "Uruguay")?.id;
  }

  onChangePais() {

    this.selectedPais = this.datosPersonalesForm.controls.pais.value;
    if (this.selectedPais && this.paises[this.selectedPais - 1].departamentos) this.departamentos = this.paises[this.selectedPais - 1].departamentos;
    this.departamentos?.sort((a: any, b: any) => a.id - b.id)
    // console.log(this.departamentos);


  }

  onChangeDepartamento() {
    this.selectedDepartamento = this.datosPersonalesForm.controls.departamento.value;
    if (this.selectedDepartamento && this.departamentos) this.localidades = this.departamentos[this.selectedDepartamento - 1].localidades;
    if (this.selectedDepartamento && this.departamentos) console.log(this.departamentos[this.selectedDepartamento - 1]);
    this.localidades?.sort((a: any, b: any) => a.id - b.id);


    // console.log(this.selectedDepartamento);


    // console.log(this.selectedPais?.departamentos);
  }

  async ngOnSubmit(): Promise<boolean> {

    this.sumi = true;

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
    this.departamentos?.sort((a: any, b: any) => a.id - b.id)
    if (this.selectedPais && this.paises[this.selectedPais - 1].nombre == "Uruguay") {
      // console.log('asdadasda');
      postulante.localidadId = this.datosPersonalesForm.controls.localidad.value;
      // console.log(postulante.localidadId);

      // let localidad: number | undefined = this.selectedLocalidad;
      // if(localidad)console.log(localidad);
      // if(localidad) postulante.localidadId = localidad;
      // console.log(localidad)
    }
    postulante.barrio = this.datosPersonalesForm.controls.barrio.value;
    postulante.direccion = this.datosPersonalesForm.controls.direccion.value;
    postulante.primerTelefono = this.datosPersonalesForm.controls.primerTelefono.value;
    postulante.segundoTelefono = this.datosPersonalesForm.controls.segundoTelefono.value;
    postulante.recibirOfertas = this.datosPersonalesForm.controls.noticias.value;


    // console.log(postulante);
    try {
      await this.postulanteService.modificarPostulante(postulante).toPromise();
      this.datosPersonalesForm.reset;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      return false;
    }

    // response => {

    //   this.datosPersonalesForm.reset;
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
    //   this.submitted = true;
    // },
    // error => {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la clase' });
    //   this.submitted = false;
    // }
    // );


  }

  async nextPage() {
    this.submitted = true;
    if (this.datosPersonalesForm.valid) {
      console.log('asdada');
      
      if (this.datosPersonalesForm.touched) {
        if (await this.ngOnSubmit()) {
          this.router.navigate(['formulario/educacionFormacion']);
        }
      }else{
        this.router.navigate(['formulario/educacionFormacion']);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }

    return;
  }


}

