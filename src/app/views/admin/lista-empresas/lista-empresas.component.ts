import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Empresario } from 'src/app/models/Empresario';
import { Message } from 'src/app/models/Message';
import { Oferta } from 'src/app/models/Oferta';
import { AdminService } from 'src/app/services/AdminService/admin.service';
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
  query: string = "";
  empresas: Empresario[] = [];
  empresaC: Empresario = {};

  PublicarComoEmpresaForm: FormGroup = new FormGroup({});

  displayHabilitarEmpresaDialog: boolean = false;
  total: number = 0;

  constructor(
    private messageService: MessageService,
    private empresarioService: EmpresarioService,
    private ofertaService: OfertasService,
    private adminService: AdminService
  ) { }


  ngOnInit(): void {

    this.getEmpresas();
  

    this.cols = [
      { field: 'razonSocial', header: 'Razon Social' },
      { field: 'rut', header: 'RUT' },
    ];
  }

  getEmpresas(){
    this.empresarioService.buscarEmpresario("", 0).subscribe(
      response => {
        this.empresas = response.empresas;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  estado(fechaExpiracion: Date): string {
    if (moment(fechaExpiracion).isBefore(new Date())||!fechaExpiracion) return "Inactiva"
    return "Activa"
  }


  showExtenderDuracion(empresa: Empresario) {
    this.selectedEmpresa = empresa;

    if (empresa.fechaExpiracion)
      this.extensionTo = moment(empresa.fechaExpiracion).toDate();

    this.displayHabilitarEmpresaDialog = true;
  }

  habilitarEmpresa() {
    this.selectedEmpresa.fechaExpiracion = this.extensionTo;
    this.adminService.habilitarEmpresa(this.selectedEmpresa).subscribe(
      response => {
        this.displayHabilitarEmpresaDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresa habilitada exitosamente' })
      },
      error => {
        this.displayHabilitarEmpresaDialog = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ? error.message : 'Error interno del sistema' })
      }
    )
  }

  buscarEmpresas(){
    this.empresarioService.buscarEmpresario("&query="+this.query, 0).subscribe(
      response => {
        this.empresas = response.empresas;
        this.total = response.total;

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })
  }

  inhabilitarEmpresa(empresa:Empresario){
    this.empresaC = new Empresario();
    this.empresaC.id = empresa.id;
    this.empresaC.fechaExpiracion = moment().subtract(1,'days').toDate();
    console.log(this.empresaC);
    this.adminService.inhabilitarEmpresa(this.empresaC).subscribe(
      result=>{
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresa inhabilitada exitosamente' })
        this.getEmpresas();
      },
      error=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
      }
      
    );
  }

}
