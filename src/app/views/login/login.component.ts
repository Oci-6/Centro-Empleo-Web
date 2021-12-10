import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { User } from 'src/app/models/User';
// import { User } from '../../model/User';
// import { AuthService } from '../../services/Auth/auth.service';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup = new FormGroup({});

    user: SocialUser = new SocialUser;
    loggedIn: boolean = false;
    submitted = false;
    
    constructor(
        private socialAuthService: SocialAuthService,
        private auth: AuthService,
        private messageService: MessageService, private router: Router) { }

    ngOnSubmit() {
        
        this.submitted = true;

        let user = new User();
        user.email = this.loginForm.controls.email.value;
        user.contraseña = this.loginForm.controls.contraseña.value;

        this.auth.login(user).subscribe(
            response => {
                localStorage.setItem('auth', JSON.stringify(response));

                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sesión iniciada' });

                window.location.href = window.location.href.slice(0,window.location.href.lastIndexOf('/'));
            },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo o contraseña incorrectos' });
            }
        );

    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            contraseña: new FormControl('', [Validators.required]),
        });

        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            let usuario: any = {
                email: user.email,
                tipo: "Postulante",
                foto: user.photoUrl
            }
            this.auth.signInWithSocial(usuario).subscribe(
                response => {
                    console.log(response);
                    localStorage.setItem('auth', JSON.stringify(response));
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Sesión iniciada' });

                    window.location.href = window.location.href.slice(0,window.location.href.lastIndexOf('/'));
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algo salio mal' });
                }
            );
        });
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

}
