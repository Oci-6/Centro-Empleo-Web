import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private confirmationService: ConfirmationService,
    
  ) { }

  cols: any[] = [];

  postulantes: Postulante[] = [];
  ofertas: Oferta[] = [];
  ofertaC: Oferta = {};

  displayPostulantesDialog: boolean = false;
  selectedOferta: Oferta | undefined
  ngOnInit(): void {
    this.cols = [
      { field: 'vacante', header: 'Vacante' },
      { field: 'fechaCierre', header: 'Fecha Cierre' },
    ];

    this.getOfertas();
  }
  
  getOfertas(){
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

  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      message: 'Seguro que quieres eliminar la novedad?',
      accept: () => {
        this.ofertasService.deleteOferta(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Oferta eliminada exitosamente' });
            this.getOfertas();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error en el servidor' })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la oferta cancelada' })
    });
  }

  cerrarOferta(oferta: Oferta){
    this.ofertaC = new Oferta();
    this.ofertaC.id = oferta.id;
    this.ofertaC.fechaCierre = moment().toDate();
    this.ofertasService.modificarOferta(this.ofertaC).subscribe(
      result=>{
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Oferta cerrada exitosamente' })
        this.getOfertas();
      },
      error=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
      }
      
    );
  }

}
