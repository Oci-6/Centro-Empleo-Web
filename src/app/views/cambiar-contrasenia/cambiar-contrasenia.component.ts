import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { mustMatch } from 'src/Validators/mustMatch';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});

  token: string | undefined;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParams;
    this.token = routeParams['token'];
    console.log(this.token);

    if(!this.token) this.router.navigate([''])
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });

  }

  ngOnSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let datos: any = {};
    datos.contraseña = this.registerForm.controls.password.value;
    datos.email = this.registerForm.controls.email.value;
    datos.token = this.token;

    this.authService.cambiarContrasenia(datos).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contraseña cambiada correctamente' });

        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.mensaje || 'Algo salio mal' });
      }
    );
  }
}
