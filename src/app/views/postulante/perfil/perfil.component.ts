import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private postulanteService: PostulanteService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  postulante: Postulante | undefined;

  ngOnInit(): void {
    this.postulanteService.infoPostulante(this.authService.getAuth().usuario).subscribe(
      (response) => {
        this.postulante = response;
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error interno del sistema'});
      }
    )
  }

  onUpload(){
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    let url = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([url]));
  }

}
