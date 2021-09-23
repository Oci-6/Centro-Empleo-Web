import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/Oferta';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private messageService: MessageService,
    ) { }

  oferta: Oferta = {};

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let ofertaId = Number(routeParams.get('id'));


    this.ofertasService.infoOferta(ofertaId).subscribe(
      result => {
        this.oferta = result;
        console.log(this.oferta);
        
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar oferta' });
      }
    )
  }

  ofertaAbierta(): boolean{
    
    return this.oferta.fechaCierre!= undefined &&this.oferta.fechaCierre> new Date();
  }
}
