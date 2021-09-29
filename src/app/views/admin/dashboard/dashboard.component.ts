import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  cols = [
    { field: 200, header: 'Postulantes en la plataforma' },
    { field: 60, header: 'Empresarios en la plataforma' },
    { field: 80, header: 'Novedades' },
    { field: 230, header: 'Ofertas laborales' }
  ];

  data: any;

  ngOnInit(): void {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
  }

}
