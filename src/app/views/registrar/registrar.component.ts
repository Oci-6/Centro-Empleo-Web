import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  
  constructor(private postulanteService: PostulanteService, private messageService: MessageService, private router: Router) { }

  ngOnSubmit() {
    let postulante = new User();
    postulante.contraseña = this.registerForm.controls.contraseña1.value;
    postulante.email = this.registerForm.controls.email.value;

        this.postulanteService.registrarPostulante(postulante).subscribe(
            response => {
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Usuario creado correctamente'});
                
                this.router.navigate(['/login']);
            },
            error => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el usuario'});
            }
        );
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      contraseña1: new FormControl('', [Validators.required]),
      contraseña2: new FormControl('', [Validators.required]),
    });
}

}
