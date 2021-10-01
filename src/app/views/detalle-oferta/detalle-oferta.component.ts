import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/Oferta';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.component.html',
  styleUrls: ['./detalle-oferta.component.css']
})
export class DetalleOfertaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private postulanteService: PostulanteService
  ) { }

  oferta: Oferta = {};
  postulante: any | undefined;
  postulado: boolean = false;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let ofertaId = Number(routeParams.get('id'));

    this.postulante = this.authService.getAuth();

    this.ofertasService.infoOferta(ofertaId).subscribe(
      result => {
        this.oferta = result;
        if(!result){
          this.router.navigate(['ofertas']);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No existe oferta con tal id' });
        }
        if (result&&this.postulante.tipo === "Postulante") {
          this.postulado = this.oferta.postulantes?.find(element => element.id === this.postulante.usuario) != undefined;
        }
        
        

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar oferta' });
      }
    )
  }

  ofertaAbierta(): boolean {

    return moment(this.oferta.fechaCierre).isBefore(new Date());
  }

  postularse() {
    if (!this.postulante) this.router.navigate(['login']);

    if (this.oferta.id&&this.postulante)
      this.postulanteService.postularse(this.oferta.id).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Postulado correctamente' });
          this.postulado = true;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al postularse' });
        }
      )
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }
  
}
