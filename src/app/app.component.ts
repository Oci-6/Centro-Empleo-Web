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

  auth: any;

  ngOnInit() {
    let usuario = localStorage.getItem('auth');

    if (typeof usuario === 'string') {
      this.auth = JSON.parse(usuario);
    }
  }

}
