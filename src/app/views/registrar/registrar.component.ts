import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';
import { mustMatch } from 'src/Validators/mustMatch';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  submitted = false;


  constructor(private postulanteService: PostulanteService, private messageService: MessageService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let postulante = new User();
    postulante.contraseña = this.registerForm.controls.password.value;
    postulante.email = this.registerForm.controls.email.value;

    this.postulanteService.registrarPostulante(postulante).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario creado correctamente' });

        this.router.navigate(['/login']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el usuario' });
      }
    );
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

}
