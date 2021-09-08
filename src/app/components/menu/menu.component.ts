import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items.push(
      {
        label: 'Cursos',
        icon: 'pi pi-pw pi-book',
        items: [
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-list',
            routerLink: '/cursos'
          },
          {
            label: 'Agregar',
            icon: 'pi pi-fw pi-pencil',
            routerLink: '/curso'
          },
          { separator: true },
        ]
      },
      {
        label: 'Estudiantes',
        icon: 'pi pi-pw pi-users',
        items: [{
          label: 'Lista',
          icon: 'pi pi-fw pi-list',
          url: 'estudiantes',
        },
        {
          label: 'Agregar',
          icon: 'pi pi-fw pi-user-plus',
          url: 'estudiante',
        },
        { separator: true },
        ]
      },
    );

}
}