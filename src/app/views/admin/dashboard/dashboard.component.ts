import { Component, OnInit } from '@angular/core';
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
  datos: any;

  async ngOnInit() {

    this.datos = await this.adminService.getEstadisticas().toPromise();

    this.cols = [
      { field: this.datos.ofertas, header: 'Ofertas en la plataforma' },
      { field: this.datos.empresasTotal, header: 'Empresas registradas en la plataforma' },
      { field: this.datos.empresasActivas, header: 'Empresas activas en la plataforma' },
      { field: this.datos.empresasTotal-this.datos.empresasActivas, header: 'Empresas inactivas en la plataforma' },
      { field: this.datos.promedioPostulaciones, header: 'Promedio de postulados' },
      { field: this.datos.novedades, header: 'Total novedades' },
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
  }

}
