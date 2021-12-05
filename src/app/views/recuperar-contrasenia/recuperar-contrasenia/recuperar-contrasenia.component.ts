import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';
import { mustMatch } from 'src/Validators/mustMatch';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {

  public recuperarForm: FormGroup = new FormGroup({});

  token: string | undefined;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  get f() { return this.recuperarForm.controls; }

  ngOnInit(): void {

    this.recuperarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  ngOnSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.recuperarForm.invalid) {
      return;
    }
    let datos: any = {};
    datos.email = this.recuperarForm.controls.email.value;

    this.authService.recuperarContrasenia(datos).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Correo enviado, revise su casilla de entrada' });

        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.mensaje || 'Algo salio mal' });
      }
    );
  }
}
