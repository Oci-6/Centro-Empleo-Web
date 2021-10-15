import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, UrlHandlingStrategy } from '@angular/router';
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
  extensionTo: Date = new Date();
  today: Date = new Date();
  cols: any[] = [];

  novedades: Novedad[] = [];
  idAdmin: number | undefined;


  displayVerDetalleDialog: boolean = false;
  displayCompartirDialog: boolean = false;
  displayFormularioNovedadDialog: boolean = false;
  public novedadForm: FormGroup = new FormGroup({});
  submitted = false;

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


  async ngOnSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.novedadForm.invalid) {
      if(this.novedadForm.controls.titulo.value == ""){
        this.messageService.add({ severity: 'error', summary: 'Faltan campos', detail: 'Ingrese un título' });
      }
      if(this.novedadForm.controls.contenido.value == ""){
        this.messageService.add({ severity: 'error', summary: 'Faltan campos', detail: 'Ingrese un contenido' });
      }
      if(this.novedadForm.controls.imagen.value == ""){
        this.messageService.add({ severity: 'error', summary: 'Faltan campos', detail: 'Ingrese una imágen' });
      }


      return;
    }
    var hoy = new Date();
    let novedad = new Novedad();
    novedad.titulo = this.novedadForm.controls.titulo.value;
    novedad.contenido = this.novedadForm.controls.contenido.value;
    novedad.imagen = this.novedadForm.controls.imagen.value;
    novedad.fechaPublicacion = hoy;
    
    this.novedadForm.controls.titulo.setValue("");
    this.novedadForm.controls.contenido.setValue("");
    this.novedadForm.controls.imagen.setValue("");
    
    
    if(this.idAdmin){
      novedad.admin = await this.adminService.infoAdmin(this.idAdmin).toPromise();
    }
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
      { field: 'fechaPublicacion', header: 'Fecha de Publicación' },

    ];

    this.novedadForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),

    });
    const routeParams = this.activatedRoute.snapshot.queryParamMap;
    this.idAdmin = Number(routeParams.get('idAdmin'));

    
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
