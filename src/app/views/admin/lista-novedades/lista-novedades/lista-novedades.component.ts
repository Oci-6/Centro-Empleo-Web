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


  displayVerDetalleDialog: boolean = false;
  displayCompartirDialog: boolean = false;
  displayFormularioNovedadDialog: boolean = false;
  public novedadForm: FormGroup = new FormGroup({});
  submitted = false;

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


  ngOnSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.novedadForm.invalid) {
      return;
    }
    let novedad = new Novedad();
    novedad.titulo = this.novedadForm.controls.titulo.value;
    novedad.contenido = this.novedadForm.controls.contenido.value;

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'JAJAJA' });
    this.novedadService.crearNovedad(novedad).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Novedad publicada correctamente' });

        //this.router.navigate(['/login']);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al publicar la novedad' });
      }
    );
  }
  

  ngOnInit(): void {

    this.getNovedades();

    this.cols = [
      { field: 'titulo', header: 'Titulo' },
      { field: 'contenido', header: 'Contenido' },
      { field: 'imagen', header: 'Imagen' },


    ];

    /*

    this.PublicarComoNovedadForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    })
*/
  }

  get f() { return this.novedadForm.controls; }

  ngOnSubmitPublicar(): void {
    let newNovedad: Novedad = {
      titulo: this.novedadForm.controls.titulo.value,
      contenido: this.novedadForm.controls.contenido.value,
    }

    this.novedadService.crearNovedad(newNovedad).subscribe(
      result => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Novedad creada exitosamente' })
        this.novedadForm.reset();
      },
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );


    
      
  }
  verDetalle(novedad:Novedad) {
    this.selectedNovedad = novedad;
    this.displayVerDetalleDialog = true;
  }

  compartir(novedad:Novedad) {
    this.selectedNovedad = novedad;
    this.displayCompartirDialog = true;
  }

  publicarNovedad() {
     this.selectedNovedad;
     this.displayFormularioNovedadDialog = true;
   }


}
