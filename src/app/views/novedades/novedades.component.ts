import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  novedades: Novedad[] = [];
  total: number = 0;
  query: string = "";
  displayCompartirDialog: boolean = false;
  selectedNovedad: Novedad = {};
  url: string = "";

  faCoffee = faCoffee;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private novedadService: NovedadService
  ) { }

  ngOnInit(): void {
    this.novedadService.buscarNovedad("", 0).subscribe(
      response => {
        this.novedades = response.novedades;
        this.total = response.total;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  onKeyUp() {
    console.log(this.query);
    this.novedadService.buscarNovedad("&query=" + this.query, 0).subscribe(
      response => {
        this.novedades = response.novedades;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  onSearch() {
    console.log(this.query);
  }

  onPaginacion(e: any) {
    console.log(e.page);
    let query = "&query=" + this.query;
    this.novedadService.buscarNovedad(query, e.page).subscribe(
      response => {
        this.novedades = response.novedades;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

  compartir(novedad:Novedad) {
    this.url= window.location.hostname+window.location.pathname + '/'+ novedad.id;
    this.selectedNovedad = novedad;
    this.displayCompartirDialog = true;
    console.log(window.location.href);
    
  }

  


}





