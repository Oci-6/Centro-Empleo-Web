import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-lista-postulantes-partial',
  templateUrl: './lista-postulantes-partial.component.html',
  styleUrls: ['./lista-postulantes-partial.component.css']
})
export class ListaPostulantesPartialComponent implements OnChanges {

  message: Message | undefined;

  selectedPostulante: any = {};

  displayInfoPostulanteDialog: boolean = false;

  cols: any[] = [];

  constructor(
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  @Input()
  postulantes: Postulante[] = [];

  ngOnChanges(): void {
    this.cols = [
      { field: 'primerNombre', header: 'Primer Nombre' },
      { field: 'primerApellido', header: 'Primer Apellido' },
      { field: 'documento', header: 'Documento' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
      { field: 'visibilidad', header: 'Visibilidad' },
    ];
    
  }

  showInfoPostulante(postulante: Postulante): void {
    this.selectedPostulante = postulante;
    this.displayInfoPostulanteDialog = true;
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
