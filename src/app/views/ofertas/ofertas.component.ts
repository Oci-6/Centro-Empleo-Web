import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Oferta } from 'src/app/models/Oferta';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
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
  url: string = "";
  selectedOferta: Oferta = {};
  displayCompartirDialog: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private messageService: MessageService,
    private router: Router,
    public authService: AuthService,
    private adminService: AdminService
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

  compartir(oferta:Oferta) {
    this.url= window.location.hostname+window.location.pathname + '/'+ oferta.id;
    this.selectedOferta = oferta;
    this.displayCompartirDialog = true;
    console.log(window.location.href);
    
  }

  enviarCorreo(){
    if(this.selectedOferta.id) this.adminService.enviarOferta(this.selectedOferta.id).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Oferta compartida exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ?? 'Error interno del sistema' })

      }
    )
  }
}
