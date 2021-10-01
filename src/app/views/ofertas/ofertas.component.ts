import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Oferta } from 'src/app/models/Oferta';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  ofertas: Oferta[] = [];

  total: number = 0;

  query: string = "";

  constructor(
    private ofertasService: OfertasService,
    private messageService: MessageService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.ofertasService.buscarOferta("", 0).subscribe(
      response => {
        this.ofertas = response.ofertas;
        this.total = response.total;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  onKeyUp(){
    console.log(this.query);
    this.ofertasService.buscarOferta("&query="+this.query, 0).subscribe(
      response => {
        this.ofertas = response.ofertas;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }
  onSearch(){
    console.log(this.query);
  }

  onPaginacion(e: any){
    console.log(e.page);
    let query = "&query="+this.query;
    this.ofertasService.buscarOferta(query, e.page).subscribe(
      response => {
        this.ofertas = response.ofertas;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }
}
