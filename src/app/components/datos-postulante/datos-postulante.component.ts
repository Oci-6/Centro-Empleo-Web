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

  postulante: Postulante = {};
  fotoPerfil: string = "";
  cv: string = "";
  pdf: string = "";
  visibilidad: boolean = false;
  file: File | undefined;

  ngOnChanges() {
    this.perfilPropio = (this.authService.getAuth().tipo == "Postulante" && this.authService.getAuth().usuario.id == this.id);
    if (this.id)
      this.postulanteService.infoPostulante(this.id).subscribe(
        (response) => {
          this.postulante = response;
          if(this.postulante.visibilidad)
            this.visibilidad = this.postulante.visibilidad
          this.getImagen();
          this.getCV();
          if(this.postulante.id) (this.getPDF(this.postulante.id))
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
        }
      )
  }

  async getImagen() {
    if (this.postulante?.foto) {
      if (this.postulante?.foto.includes("uploads")) {
        let blob = await this.postulanteService.getBlobDatos(this.postulante.foto).toPromise();

        this.fotoPerfil = URL.createObjectURL(blob);

      } else {
        this.fotoPerfil = this.postulante?.foto
      }
    }
  }

  async getCV() {
    if (this.postulante?.curriculum) {
      let blob = await this.postulanteService.getBlobDatos(this.postulante.curriculum).toPromise();

      this.cv = URL.createObjectURL(blob);

    }
  }


  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      this.postulanteService.postFoto(formData).subscribe(
        response => {
          this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
          let url = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([url]));
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
        }
      );
    }
  }

  onVisibilidad(){
    let post: Postulante = new Postulante();
    post.id = this.postulante.id;
    post.visibilidad = this.visibilidad
    this.postulanteService.modificarPostulante(post).subscribe(
      (response) => {

      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error interno del sistema' });
      }
    )
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

  async getPDF(id: number) {
    
    let blob = await this.postulanteService.getCV(id).toPromise();

    this.pdf = URL.createObjectURL(blob);
  }
}
