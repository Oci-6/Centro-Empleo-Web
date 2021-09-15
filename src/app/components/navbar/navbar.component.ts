import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Ingresar',
          icon:'pi pi-sign-in',
          styleClass: 'mr-5',
          routerLink: ['/login']
        

      },
      
      {
          label:'Ofertas de trabajo',
          icon:'pi pi-briefcase',
          styleClass: 'mr-2',
          routerLink: ['/ofertas']

      },
      {
          label:'Novedades',
          icon:'pi pi-exclamation-circle',

      },
  ];
  }

}
