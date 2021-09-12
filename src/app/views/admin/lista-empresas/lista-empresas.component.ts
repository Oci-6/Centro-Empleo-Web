import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

//   message: Message | undefined;

//   selectedEmpresa: Empresa = {};

  
//   cols: any[] = [];

//   // empresas: Empresa[] = [];

//   PublicarComoEmpresaForm: FormGroup = new FormGroup({});

//   constructor(
//     // private messageService: MessageService,
//     // private confirmationService: ConfirmationService,

//   ) { }

//   // getEmpresas(){
//     //   this.personsService.getEmpresas().subscribe(
//     //     response => this.empresas = response,
//     //     error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
//     //   );
//     // }

ngOnInit(): void {
}
//     // this.getEmpresas();

//     this.cols = [
//       { field: 'razon_social', header: 'Razon Social' },
//       { field: 'nombre_fantasia', header: 'Nombre Fantasia' },
//       { field: 'rut', header: 'RUT' },
//     ];

//     this.PublicarComoEmpresaForm = new FormGroup({
//       titulo: new FormControl('', [Validators.required]),
//       descripcion: new FormControl('', [Validators.required]),
//     })

//   }

//   ngOnSubmitPublicar(): void{
//     //   let newOferta: Oferta = {
//     //     titulo: this.PublicarComoEmpresaForm.controls.titulo.value,
//     //     descripcion: this.PublicarComoEmpresaForm.controls.descripcion.value,
//     //   }

//     //   this.ofertaService.postOferta(newOferta).suscribe(
//     //     result => {
//     //       this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Oferta creada exitosamente' })
//     //       this.getEmpresas();
//     //       this.PublicarComoEmpresaForm.reset();
//     //     },
//     //     error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
//     //   );
//     //   )
//   }

//   displayPublicarComoEmpresaDialog: boolean = false;

//     showPublicarComoEmpresa() {
//       this.displayPublicarComoEmpresaDialog = true;
//     }

//     showExtenderDuracion(){
//       this.displayPublicarComoEmpresaDialog = true;
//     }


}
