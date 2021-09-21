import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  auth: any;

  constructor(
    private authService: AuthService) { }

  postulante: Postulante | undefined;

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
  }

}
