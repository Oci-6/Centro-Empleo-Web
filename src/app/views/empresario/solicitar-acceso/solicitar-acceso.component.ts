import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Departamento } from 'src/app/models/Departamento';
import { Empresario } from 'src/app/models/Empresario';
import { Localidad } from 'src/app/models/Localidad';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/Auth/auth.service';
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
  
  submitted = false;
  empresarioId: number | undefined;
  empresa: Empresario | undefined;

  constructor(
    private empresarioService: EmpresarioService,
    private paisService: PaisService,
    private messageService: MessageService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private auth: AuthService
    ) { }

  ngOnSubmit() {
    this.submitted = true;

    if (this.accesoForm.invalid) {
      return;
    }

    let empresario = new Empresario();
    empresario.rut = this.accesoForm.controls.rut.value;
    empresario.email = this.accesoForm.controls.email.value;
    empresario.contraseña = this.accesoForm.controls.password.value;
    
    
    this.empresarioService.registrarEmpresario(empresario).subscribe(
      response => {
        this.empresa = response;
        console.log(this.empresa);
        localStorage.setItem('auth', JSON.stringify(response));
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente' });
        this.router.navigate(['/datosAdicionales']).then(() =>
        window.location.reload());
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

  }

  get f() { return this.accesoForm.controls; }
  

}
