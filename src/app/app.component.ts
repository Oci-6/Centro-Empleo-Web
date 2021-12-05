import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { EmpresarioService } from './services/EmpresarioService/empresario.service';
import { PostulanteService } from './services/PostulanteService/postulante.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Centro Empleo';

  auth: any;
  constructor(
    private empresarioService: EmpresarioService,
    private postulanteService: PostulanteService
  ) { }
  async ngOnInit() {
    let usuario = localStorage.getItem('auth');

    if (typeof usuario === 'string') {
      this.auth = JSON.parse(usuario);

      switch (this.auth.tipo) {
        case 'Postulante':
          this.auth.usuario = await this.postulanteService.infoPostulante(this.auth.usuario.id).toPromise();
          localStorage.setItem('auth', JSON.stringify(this.auth));
          break;
        case 'Empresa':
          this.auth.usuario = await this.empresarioService.infoEmpresario(this.auth.usuario.id).toPromise();
          localStorage.setItem('auth', JSON.stringify(this.auth));
          break;
      }
    }
  }

}
