import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Oferta } from 'src/app/models/Oferta';
import { Postulante } from 'src/app/models/Postulante';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-mis-ofertas',
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.css']
})
export class MisOfertasComponent implements OnInit {

  constructor(
    private empresarioService: EmpresarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ofertasService: OfertasService,
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

  convertirFecha(fecha: Date) {
    return moment(fecha).format("DD-MM-YYYY");
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
