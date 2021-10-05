import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Departamento } from 'src/app/models/Departamento';
import { Empresario } from 'src/app/models/Empresario';
import { Localidad } from 'src/app/models/Localidad';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { PaisService } from 'src/app/services/PaisService/pais.service';

@Component({
  selector: 'app-datos-adicionales',
  templateUrl: './datos-adicionales.component.html',
  styleUrls: ['./datos-adicionales.component.css']
})
export class DatosAdicionalesComponent implements OnInit {

  public datosAdicionalesForm: FormGroup = new FormGroup({});
  submitted = false;
  public departamentos: Departamento[] | undefined = [];
  public localidades: Localidad[] | undefined = [];
  selectedDepartamento: number | undefined;
  selectedLocalidad: number | undefined;
  paisId = 186;
  empresaId = this.auth.getAuth().usuario.id;
  empresa: Empresario = {};

  constructor(
    private empresarioService: EmpresarioService,
    private paisService: PaisService,
    private messageService: MessageService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.datosAdicionalesForm = this.formBuilder.group({
      razonSocial: new FormControl('', [Validators.required]),
      departamento: new FormControl(''),
      localidad: new FormControl(''),
      telefono: new FormControl('', [Validators.required]),
      mostrarNombreE: new FormControl('', [Validators.required]),
      nombreAmostrar: new FormControl('', [Validators.required]),
    });

    this.getDL(this.paisId);
    this.getEmpresa(this.empresaId);
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

  ngOnSubmit() {
    let empresario = new Empresario();
    empresario.id = this.auth.getAuth().usuario.id;
    empresario.razonSocial = this.datosAdicionalesForm.controls.razonSocial.value;
    empresario.localidad = this.datosAdicionalesForm.controls.localidad.value;
    empresario.visibilidad = this.datosAdicionalesForm.controls.mostrarNombreE.value;
    empresario.nombreFantasia = this.datosAdicionalesForm.controls.nombreAmostrar.value;
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

  get g() { return this.datosAdicionalesForm.controls; }
  

  getEmpresa(empresaId: number){

    this.empresarioService.infoEmpresario(empresaId).subscribe(
      result => {
        this.empresa = result;
        console.log(this.empresa);    
        this.datosAdicionalesForm.controls["razonSocial"].setValue(this.empresa.razonSocial);
        this.datosAdicionalesForm.controls["departamento"].setValue(this.empresa.localidad?.departamento?.nombre);
        this.datosAdicionalesForm.controls["localidad"].setValue(this.empresa.localidad?.id);
        this.datosAdicionalesForm.controls["telefono"].setValue(this.empresa.telefono);
        this.datosAdicionalesForm.controls["mostrarNombreE"].setValue(this.empresa.visibilidad);
        this.datosAdicionalesForm.controls["nombreAmostrar"].setValue(this.empresa.nombreFantasia);
      }
    );

  }
}
