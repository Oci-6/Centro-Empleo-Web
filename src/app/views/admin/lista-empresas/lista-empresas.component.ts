import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Empresario } from 'src/app/models/Empresario';
import { Message } from 'src/app/models/Message';
import { Oferta } from 'src/app/models/Oferta';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  message: Message | undefined;

  selectedEmpresa: Empresario = {};
  extensionTo: Date = new Date();
  today: Date = new Date();
  cols: any[] = [];

  empresas: Empresario[] = [];

  PublicarComoEmpresaForm: FormGroup = new FormGroup({});

  displayPublicarComoEmpresaDialog: boolean = false;
  displayHabilitarEmpresaDialog: boolean = false;

  constructor(
    private messageService: MessageService,
    private empresarioService: EmpresarioService,
    private ofertaService: OfertasService
  ) { }

  getEmpresas() {
    this.empresarioService.getEmpresarios().subscribe(
      response => this.empresas = response,
      error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
    );
  }

  ngOnInit(): void {

    this.getEmpresas();

    this.cols = [
      { field: 'razonSocial', header: 'Razon Social' },
      { field: 'rut', header: 'RUT' },
    ];

    this.PublicarComoEmpresaForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    })

  }

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

  showPublicarComoEmpresa() {
    this.displayPublicarComoEmpresaDialog = true;
  }

  showExtenderDuracion(empresa: Empresario) {
    this.selectedEmpresa = empresa;
    this.displayHabilitarEmpresaDialog = true;
  }


}
