import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { User } from 'src/app/models/User';
// import { User } from '../../model/User';
// import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  constructor(private auth: AuthService, private messageService: MessageService, private router: Router) { }

  ngOnSubmit() {
    let user = new User();
    user.email = this.loginForm.controls.email.value;
    user.contraseña = this.loginForm.controls.contraseña.value;

    this.auth.login(user).subscribe(
        response => {
            localStorage.setItem('auth', JSON.stringify(response));

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logeado correctamente' });

            // this.auth.getUserInfo().subscribe(
            //     response => {
            //         console.log(response);
            //         localStorage.setItem('user', JSON.stringify(response));

            //         window.location.href = '/';
            //     },
            //     error => {
            //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el servidor' });
            //     }
            // );
            
        },
        error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect username or password' });
        }
    );

}

ngOnInit(): void {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        contraseña: new FormControl('', [Validators.required]),
    });
}

}
