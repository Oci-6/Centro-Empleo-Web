import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Centro Empleo';
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
        {
            label:'Ingresar',
            icon:'pi pi-sign-in',
        },
        {
            label:'Ofertas de trabajo',
            icon:'pi pi-briefcase',

        },
        {
            label:'Novedades',
            icon:'pi pi-exclamation-circle',

        },
    ];
}

}
