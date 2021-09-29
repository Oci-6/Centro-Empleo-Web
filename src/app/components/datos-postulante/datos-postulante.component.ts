import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-datos-postulante',
  templateUrl: './datos-postulante.component.html',
  styleUrls: ['./datos-postulante.component.css']
})
export class DatosPostulanteComponent implements OnChanges {

  @Input()
  id?: number;

  constructor(
    private postulanteService: PostulanteService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  perfilPropio: boolean = false;

  postulante: Postulante | undefined;

  ngOnChanges() {
    this.perfilPropio = (this.authService.getAuth().tipo == "Postulante" && this.authService.getAuth().usuario == this.id);
    if (this.id)
      this.postulanteService.infoPostulante(this.id).subscribe(
        (response) => {
          this.postulante = response;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
        }
      )
  }

  onUpload() {
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    let url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
