import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Novedad } from 'src/app/models/Novedad';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {

  public novedadForm: FormGroup = new FormGroup({});
  submitted: boolean | undefined = false;
  novedad: Novedad = {};
  imgenNovedad: string = "";
  file: File | undefined;

  constructor(
    private messageService: MessageService,
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.novedadForm = new FormGroup({
        tituloNovedad: new FormControl('', [Validators.required]),
        contenidoNovedad: new FormControl('', [Validators.required]),
      });
        
    }
  
    get f() { return this.novedadForm.controls; }

  async ngOnSubmit() : Promise<boolean>{
    
    const formData = new FormData();
    formData.append("titulo", this.novedadForm.controls.tituloNovedad.value);
    formData.append("contenido", this.novedadForm.controls.contenidoNovedad.value);

    if (this.file) {
      formData.append("file", this.file);
    }

    try {
      await this.novedadService.crearNovedad(formData).toPromise();
      this.novedadForm.reset;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ?? 'Algo salio mal' });
      return false;
    }
    
  }

  async enviar() {
    this.submitted = true;
    if(this.novedadForm.valid){
      if (await this.ngOnSubmit())
        this.router.navigate(['/novedades']);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }
    
    return;
    
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.file = file;


    }
  }


}
