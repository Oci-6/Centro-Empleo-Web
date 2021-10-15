import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Oferta } from 'src/app/models/Oferta';
import { Postulante } from 'src/app/models/Postulante';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-lista-ofertas',
  templateUrl: './lista-ofertas.component.html',
  styleUrls: ['./lista-ofertas.component.css']
})
export class ListaOfertasComponent implements OnInit {

  constructor(
    private ofertasService: OfertasService,
    private messageService: MessageService,
  ) { }

  cols: any[] = [];

  postulantes: Postulante[] = [];
  ofertas: Oferta[] = [];

  displayPostulantesDialog: boolean = false;
  selectedOferta: Oferta | undefined
  ngOnInit(): void {
    this.cols = [
      { field: 'vacante', header: 'Vacante' },
      { field: 'funcionesTareas', header: 'Funciones y Tareas' },
      { field: 'fechaCierre', header: 'Fecha Cierre' },
    ];

    this.ofertasService.getOfertas().subscribe(
      (result) => {
        this.ofertas = result;
        console.log(result);
        
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

  convertirFecha(fecha: Date) {
    return moment(fecha).format("DD-MM-YYYY");
  }

}
