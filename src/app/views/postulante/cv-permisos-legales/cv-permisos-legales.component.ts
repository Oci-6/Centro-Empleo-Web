import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-cv-permisos-legales',
  templateUrl: './cv-permisos-legales.component.html',
  styleUrls: ['./cv-permisos-legales.component.css']
})
export class CvPermisosLegalesComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private postulanteService: PostulanteService,
    private router: Router) { }


  uploadedFiles: any[] = [];

  user: any;
  cvPermisosForm: FormGroup = new FormGroup({});
  submitted: boolean | undefined = false;

  postulante: Postulante = {};

  terminosCondiciones: boolean = false;

  ngOnInit(): void {
    this.user = this.authService.getAuth();

    this.cvPermisosForm = new FormGroup({
      visibilidad: new FormControl(''),
      terminosCondiciones: new FormControl('', [Validators.required])
    });

    this.postulanteService.infoPostulante(this.user.usuario).subscribe(
      (result) => {
        this.postulante = result;
        if (result.documentos)
          this.uploadedFiles = result.documentos;
        console.log(this.uploadedFiles);
        
      }
    )
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  async ngOnSubmit() {
    try{
    let postulante: Postulante = new Postulante();
    postulante.id = this.postulante.id;
    postulante.visibilidad = this.cvPermisosForm.controls.visibilidad.value;

   await this.postulanteService.modificarPostulante(postulante).toPromise();

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Datos guardados correctamente' });
    this.submitted = true;
  } catch (error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
    this.submitted = false;
  }  
  }

  //Cambiar página del steper
  
  async nextPage() {
    if(this.cvPermisosForm.valid){
      await this.ngOnSubmit();
      if (this.submitted) {
      this.router.navigate(['/perfil']);
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }
    
    return;
  }

  prevPage() {
    this.router.navigate(['formulario/preferenciasLaborales']);
  }

  deleteDocumento(documento: any){
    console.log(this.uploadedFiles);
    let index = this.uploadedFiles.indexOf(documento);
    console.log(index);
    this.uploadedFiles.splice(index, 1);

  }
}
