import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Departamento } from 'src/app/models/Departamento';
import { Empresario } from 'src/app/models/Empresario';
import { Localidad } from 'src/app/models/Localidad';
import { User } from 'src/app/models/User';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { PaisService } from 'src/app/services/PaisService/pais.service';
import { mustMatch } from 'src/Validators/mustMatch';

@Component({
  selector: 'app-solicitar-acceso',
  templateUrl: './solicitar-acceso.component.html',
  styleUrls: ['./solicitar-acceso.component.css']
})
export class SolicitarAccesoComponent implements OnInit {

  public accesoForm: FormGroup = new FormGroup({});
  public datosAdicionalesForm: FormGroup = new FormGroup({});
  
  submitted = false;
  public departamentos: Departamento[] | undefined = [];
  public localidades: Localidad[] | undefined = [];
  selectedDepartamento: number | undefined;
  selectedLocalidad: number | undefined;
  paisId = 186;
  empresarioId: number | undefined;

  constructor(
    private empresarioService: EmpresarioService,
    private paisService: PaisService,
    private messageService: MessageService,
    private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.accesoForm.invalid) {
      return;
    }

    let empresario = new Empresario();
    empresario.rut = this.accesoForm.controls.rut.value;
    empresario.email = this.accesoForm.controls.email.value;
    empresario.contraseña = this.accesoForm.controls.password.value;
    empresario.razonSocial = 'dasdads';
    
    
    this.empresarioService.registrarEmpresario(empresario).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario creado correctamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario' });
      }
    );
       
  }

  ngOnSubmit2() {
    let empresario = new Empresario();
    empresario.id = 4;
    empresario.razonSocial = this.datosAdicionalesForm.controls.razonSocial.value;
    empresario.localidad = this.datosAdicionalesForm.controls.localidad.value;
    empresario.mostrarNombreE = this.datosAdicionalesForm.controls.mostrarNombreE.value;
    empresario.nombreAmostrar = this.datosAdicionalesForm.controls.nombreAmostrar.value;
    empresario.telefono = this.datosAdicionalesForm.controls.telefono.value;

    this.empresarioService.modificarEmpresario(empresario).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario creado correctamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario' });
      }
    );
  }




  ngOnInit(): void {
    this.accesoForm = this.formBuilder.group({
      rut: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });

    this.datosAdicionalesForm = this.formBuilder.group({
      razonSocial: new FormControl('', [Validators.required]),
      departamento: new FormControl(''),
      localidad: new FormControl(''),
      telefono: new FormControl('', [Validators.required]),
      mostrarNombreE: new FormControl('', [Validators.required]),
      nombreAmostrar: new FormControl('', [Validators.required]),

    })

    this.getDL(this.paisId);

  }

  getDL(paisId:number){

    this.paisService.getDepartamentos(paisId).subscribe(
      result => {
        this.departamentos = result;
        this.departamentos?.sort((a:any, b:any) => a.id - b.id)
        if (this.departamentos&&this.selectedDepartamento) this.localidades = result[this.selectedDepartamento-1].localidades;
      }
    );

  }

  onChangeDepartamento() {
    this.selectedDepartamento = this.datosAdicionalesForm.controls.departamento.value;
    if (this.selectedDepartamento&&this.departamentos) this.localidades = this.departamentos[this.selectedDepartamento-1].localidades;
    if (this.selectedDepartamento&&this.departamentos) console.log(this.departamentos[this.selectedDepartamento-1]);
    this.localidades?.sort((a:any, b:any) => a.id - b.id);
  }


  get f() { return this.accesoForm.controls; }
  get g() { return this.datosAdicionalesForm.controls; }

}
