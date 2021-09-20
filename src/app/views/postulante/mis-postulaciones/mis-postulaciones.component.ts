import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-postulaciones',
  templateUrl: './mis-postulaciones.component.html',
  styleUrls: ['./mis-postulaciones.component.css']
})
export class MisPostulacionesComponent implements OnInit {

  constructor() { }

  cols: any[] = []

  oferta: any[] = [];

  ngOnInit(): void {
    this.cols = [
      { field: 'titulo', header: 'Título' },
      { field: 'empresa', header: 'Empresa' },
      { field: 'fechaCierre', header: 'Fecha de cierre' },
      { field: 'estado', header: 'Estado' }
    ];
  }

}
