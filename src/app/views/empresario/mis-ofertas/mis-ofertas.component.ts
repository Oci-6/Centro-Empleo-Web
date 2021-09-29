import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Oferta } from 'src/app/models/Oferta';
import { Postulante } from 'src/app/models/Postulante';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';

@Component({
  selector: 'app-mis-ofertas',
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.css']
})
export class MisOfertasComponent implements OnInit {

  constructor(
    private empresarioService: EmpresarioService,
    private messageService: MessageService,
  ) { }

  cols: any[] = [];

  postulantes: Postulante[] = [];
  ofertas: Oferta[] = [];

  displayPostulantesDialog: boolean = false;
  selectedOferta: Oferta | undefined
  ngOnInit(): void {
    this.cols = [
      { field: 'titulo', header: 'Título' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'fechaCreacion', header: 'Fecha Creación' },
      { field: 'fechaCierre', header: 'Fecha Cierre' },
    ];

    this.empresarioService.getOfertas().subscribe(
      (result) => {
        this.ofertas = result;
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
  
  estado(fechaCierre: Date): string{

    if(moment(fechaCierre).isBefore(new Date())) return "Cerrada"
    else return "Abierta"
  }

  showPostulantes(oferta: Oferta){
    if(oferta.postulantes) this.postulantes = oferta.postulantes;
    this.selectedOferta = oferta;
    this.displayPostulantesDialog = true;
  }

}
