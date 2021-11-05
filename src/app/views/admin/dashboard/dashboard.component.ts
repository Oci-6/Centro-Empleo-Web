import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/AdminService/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  cols: any[]  = [];

  data: any;
  ofertasMes: any;
  datos: any;
  desde: Date = new Date();

  hasta: Date = new Date();

  loading: boolean = false;
  async ngOnInit() {
    this.desde.setFullYear((new Date().getFullYear())-1);
    this.desde.setDate(1);
    this.hasta.setDate(1);
    this.getEstadisticas();
  }

  async getEstadisticas(){
    this.loading = !this.loading;
    this.datos = await this.adminService.getEstadisticas("?fechaInicio="+this.desde.toDateString()+"&fechaFin="+ this.hasta.toDateString()).toPromise();
    this.loading = !this.loading;
    this.setData()
  }

  setData(){
    this.cols = [
        { field: this.datos.ofertas, header: 'Ofertas', color: 'blue-300' },
        { field: this.datos.promedioPostulaciones, header: 'Promedio postulaciones', color: 'blue-300' },
        { field: this.datos.empresasTotal, header: 'Empresas' , color: 'green-300'},
        { field: this.datos.empresasActivas, header: 'Empresas activas' , color: 'green-300'},
        { field: this.datos.empresasTotal-this.datos.empresasActivas, header: 'Empresas inactivas', color: 'green-300' },
        { field: this.datos.novedades, header: 'Total novedades', color: 'yellow-300' },
      ];
    this.data = {
      labels: ['Invisibles','Visibles'],
      datasets: [
          {
              data: [this.datos.postulantesTotal-this.datos.postulantesVisibles, this.datos.postulantesVisibles],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  // "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  // "#FFB74D"
              ]
          }
      ]
  };
  moment.locale('es-es');

  this.ofertasMes = {
    labels: this.datos.ofertasPorMes.map((a: { fecha: Date; }) => moment(a.fecha).format("MMMM YY")),
    datasets: [
        {
            label: 'Ofertas',
            backgroundColor: '#75bef8',
            data: this.datos.ofertasPorMes.map((a: { historico: Date; }) => a.historico),
        },
        {
            label: 'Postulantes',
            backgroundColor: '#f9ae61',
            data: this.datos.postulantesPorMes.map((a: { historico: Date; }) => a.historico),
        },
        {
            label: 'Empresas',
            backgroundColor: '#90cd93',
            data: this.datos.empresasPorMes.map((a: { historico: Date; }) => a.historico),
        },
    ]
};
  }

}
