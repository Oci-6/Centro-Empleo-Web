import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.css']
})
export class ListaPostulantesComponent implements OnInit {

  message: Message | undefined;

  selectedPostulante: any = {};

  displayInfoPostulanteDialog: boolean = false;

  cols: any[] = [];

  constructor(
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  postulantes: Postulante[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'documento', header: 'Documento' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
      { field: 'visibilidad', header: 'Visibilidad' },
    ];

    this.postulanteService.getPostulantes().subscribe(
      (response) => {
        this.postulantes = response;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message ? error.message : 'Error interno del sistema',
        });
      }
    )
  }

  showInfoPostulante(postulante: Postulante): void {
    this.selectedPostulante = postulante;
    this.displayInfoPostulanteDialog = true;
  }

}
