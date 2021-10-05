import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Oferta } from 'src/app/models/Oferta';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-mis-postulaciones',
  templateUrl: './mis-postulaciones.component.html',
  styleUrls: ['./mis-postulaciones.component.css']
})
export class MisPostulacionesComponent implements OnInit {

  constructor(
    private postulanteService: PostulanteService,
    private authService: AuthService,
  ) { }

  cols: any[] = []

  ofertas: Oferta[] = [];

  ngOnInit(): void {
    // this.cols = [
    //   { field: 'titulo', header: 'Título' },
    //   { field: 'fechaCierre', header: 'Fecha de cierre' },
    // ];

    this.postulanteService.infoPostulante(this.authService.getAuth().usuario.id).subscribe(
      response => {
        if (response.ofertas)
          this.ofertas = response.ofertas
      }
    )

  }

  estado(fechaCierre: Date): string {  
    if (moment(fechaCierre).isBefore(new Date())) { 
      return "Cerrada" 
    }
    return "Abierta"

  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
