import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-lista-novedades',
  templateUrl: './lista-novedades.component.html',
  styleUrls: ['./lista-novedades.component.css']
})
export class ListaNovedadesComponent implements OnInit {

  message: Message | undefined;

  selectedNovedad: Novedad = {};
  extensionTo: Date = new Date();
  today: Date = new Date();
  cols: any[] = [];

  novedades: Novedad[] = [];

  PublicarComoNovedadForm: FormGroup = new FormGroup({});

  displayVerDetalleDialog: boolean = false;
  displayCompartirDialog: boolean = false;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private ofertaService: OfertasService
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
      { field: 'contenido', header: 'Contenido' },

    ];
/*
    this.PublicarComoNovedadForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    })
*/
  }
/*
  ngOnSubmitPublicar(): void {
    let newOferta: Oferta = {
      titulo: this.PublicarComoEmpresaForm.controls.titulo.value,
      descripcion: this.PublicarComoEmpresaForm.controls.descripcion.value,
    }

    this.ofertaService.agregarOferta(newOferta).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Oferta creada exitosamente' })
        this.getEmpresas();
        this.PublicarComoEmpresaForm.reset();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
      
  }
*/
  verDetalle(novedad:Novedad) {
    this.selectedNovedad = novedad;
    this.displayVerDetalleDialog = true;
  }

  compartir(novedad:Novedad) {
    this.selectedNovedad = novedad;
    this.displayCompartirDialog = true;
  }

  publicarNovedad() {
    // this.selectedNovedad = novedad;
    // this.displayHabilitarEmpresaDialog = true;
   }


}
