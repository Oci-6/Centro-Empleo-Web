import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlHandlingStrategy } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Novedad } from 'src/app/models/Novedad';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';
import { environment } from 'src/environments/environment';
import { ListaEmpresasComponent } from '../../lista-empresas/lista-empresas.component';

@Component({
  selector: 'app-lista-novedades',
  templateUrl: './lista-novedades.component.html',
  styleUrls: ['./lista-novedades.component.css']
})
export class ListaNovedadesComponent implements OnInit {

  public editarNovedadForm: FormGroup = new FormGroup({});
  displayEditarNovedadDialog: boolean = false;

  message: Message | undefined;

  selectedNovedad: Novedad = {};
  cols: any[] = [];
  submitted: boolean | undefined = false;
  url: string = "";

  apiURL: string = environment.apiURL;

  novedades: Novedad[] = [];
  idAdmin: number | undefined;

  displayCompartirDialog: boolean = false;

  novedad: Novedad = {};
  imgenNovedad: string = "";
  file: File | undefined;
  novedadId: number | undefined;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
    private router: Router,

  ) { }

  get f() { return this.editarNovedadForm.controls; }
  
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

    this.editarNovedadForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      contenido: new FormControl('', [Validators.required])
    });

  }
  
  ngOnDelete(id: number): void {
    this.confirmationService.confirm({
      header: 'Eliminar novedad',
      message: 'Seguro que quieres eliminar la novedad?',
      accept: () => {
        this.novedadService.deleteNovedad(id).subscribe(
          result => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Novedad eliminada exitosamente' });
            this.getNovedades();
          },
          error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error en el servidor' })
        );
      },
      reject: () => this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Eliminación de la novedad cancelada' })
    });
  }

  async ngOnEdit(): Promise<boolean>{

    const formData = new FormData();

    if(this.selectedNovedad.id) formData.append("id", this.selectedNovedad.id.toString());
    formData.append("titulo", this.editarNovedadForm.controls.titulo.value);
    formData.append("contenido", this.editarNovedadForm.controls.contenido.value);
    console.log(formData.get('id'));
    

    if (this.file) {
      formData.append("file", this.file);
    }
    

    try {
      await this.novedadService.modificarNovedad(formData).toPromise();
      this.editarNovedadForm.reset;
      this.displayEditarNovedadDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;

    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
      return false;
    }

  }

  showEditarNovedadDialog(novedad: Novedad): void {

    this.selectedNovedad = novedad;
    this.editarNovedadForm.patchValue(this.selectedNovedad);
    if(novedad.id)this.getNovedad(novedad.id);

    this.displayEditarNovedadDialog = true;

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


  async enviarEdit() {
    this.submitted = true;
    if(this.editarNovedadForm.valid){
      if (await this.ngOnEdit()) 
        this.displayEditarNovedadDialog = false;

    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }
    
    return;
    
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.file = file;
      this.novedad.imagen = URL.createObjectURL(file);

    }
  }

  getNovedad(novedadId: number){
    this.novedadService.getNovedad(novedadId).subscribe(
      response => {
        this.novedad = response;
        console.log(this.novedad);
        
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
      }
    )
  }


  enviarCorreo(){
    if(this.selectedNovedad.id) this.adminService.enviarNovedad(this.selectedNovedad.id).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Novedad compartida exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ?? 'Error interno del sistema' })

      }
    )
  }

}
