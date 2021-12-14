import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Novedad } from 'src/app/models/Novedad';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-novedad',
  templateUrl: './detalle-novedad.component.html',
  styleUrls: ['./detalle-novedad.component.css']
})
export class DetalleNovedadComponent implements OnInit {

  novedad: Novedad = {};
  novedadId: number | undefined;
  imagenNovedad: string = "";
  apiURL = environment.apiURL;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.novedadId = Number(routeParams.get('id'));    
    
    if(this.novedadId) this.getNovedad(this.novedadId);

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
  
  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
