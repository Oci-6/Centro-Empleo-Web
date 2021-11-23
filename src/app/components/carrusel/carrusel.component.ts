import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Novedad } from 'src/app/models/Novedad';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  
  images: string[] | undefined;
  novedades: Novedad[] = [];
  total: number = 0;

  apiURL = environment.apiURL;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.images = [];

    this.novedadService.ultimasNovedades().subscribe(
      response => {
        this.novedades = response;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      })

    
  }

}
