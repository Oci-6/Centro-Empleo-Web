import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, UrlHandlingStrategy } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Novedad } from 'src/app/models/Novedad';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';
import { ListaEmpresasComponent } from '../../lista-empresas/lista-empresas.component';

@Component({
  selector: 'app-lista-novedades',
  templateUrl: './lista-novedades.component.html',
  styleUrls: ['./lista-novedades.component.css']
})
export class ListaNovedadesComponent implements OnInit {

  message: Message | undefined;

  selectedNovedad: Novedad = {};
  cols: any[] = [];

  novedades: Novedad[] = [];
  idAdmin: number | undefined;

  displayCompartirDialog: boolean = false;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,

  ) { }

  
  getNovedades() {
    this.novedadService.getAll().subscribe( 
      response => this.novedades = response,
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  ngOnInit(): void {

    this.getNovedades();

    this.cols = [
      { field: 'titulo', header: 'Titulo' },
      // { field: 'contenido', header: 'Contenido' },
      { field: 'fechaPublicacion', header: 'Fecha de Publicación' },

    ];
  }

  compartir(novedad:Novedad) {
    this.selectedNovedad = novedad;
    this.displayCompartirDialog = true;
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
