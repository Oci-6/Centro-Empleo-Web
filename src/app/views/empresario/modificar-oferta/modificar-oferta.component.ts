import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Empresario } from 'src/app/models/Empresario';
import { Oferta } from 'src/app/models/Oferta';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-modificar-oferta',
  templateUrl: './modificar-oferta.component.html',
  styleUrls: ['./modificar-oferta.component.css']
})
export class ModificarOfertaComponent implements OnInit {

  areaTrabajo: string[] = ['Administración - Secretariado', 'AgroIndustria', 'Alimentos', 'Arquitectura - Paisajismo',
    'Arte - Cultura', 'Atención al Cliente', 'Automotriz', 'Banca - Servicios Financieros', 'Cadetería - Cobranzas', 'Comercio - Maercado - Ventas',
    'Comunicación', 'Construcción', 'Contabilidad - Auditoría - Finanzas', 'Deporte - Recreación', 'Directivos - Ejecutivos', 'Diseño - Decoración',
    'Distribución - Logística - Almacenamiento', 'Eduación - Docencia', 'Estética', 'Eventos', 'Especializaciones', 'Gastronomía', 'Industria - Producción',
    'Ingeniería', 'Inmobiliario', 'Importación - Exportación', 'Mantenimiento general', 'Mecánica', 'Comunicación - Marketing - Publicidad', 'Oficios - Servicios Varios',
    'Pasantías', 'Recursos Humanos', 'Salud', 'Sector Legal/Jurídico', 'Seguridad / Vigilancia', 'Supermercados - Autoservices', 'Tecnologías de la Información',
    'Trabajo telefónico - Call Center', 'Transporte', 'Turismo - Hotelería', 'Otro']

  public ofertaForm: FormGroup = new FormGroup({});
  today: Date = new Date();
  submitted: boolean | undefined = false;

  idEmpresa: number | undefined;
  ofertaId: number | undefined;
  user: any;
  oferta: Oferta = {};

  constructor(
    private ofertasService: OfertasService,
    private messageService: MessageService,
    private empresarioService: EmpresarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
  ) { }

  async ngOnInit() {
    this.ofertaForm = new FormGroup({
      vacante: new FormControl(''),
      areaTrabajo: new FormControl(''),
      funcionesTareas: new FormControl(''),
      requisitosExcluyentes: new FormControl(''),
      requisitosValorar: new FormControl(''),
      horario: new FormControl(''),
      salarioDesde: new FormControl(undefined),
      salarioHasta: new FormControl(undefined),
      lugar: new FormControl(''),
      fechaCierre: new FormControl(''),
    });

    const routeParams = this.activatedRoute.snapshot;
    this.ofertaId = Number(routeParams.paramMap.get('id'));
    console.log(this.ofertaId);

    await this.getDatosOferta();
    console.log(this.oferta);

    this.user = this.auth.getAuth(); 
    if(this.user.usuario.id!=this.oferta.empresa?.id&&this.user.tipo!='Admin'){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La oferta con ese id no le pertenece a su empresa' });
      this.router.navigate(['/misOfertas']);
    }
    
  }

  async getDatosOferta(){
   if(this.ofertaId)
     try{
      this.oferta = await this.ofertasService.infoOferta(this.ofertaId).toPromise();
      console.log(this.oferta);
      //  this.ofertaForm.patchValue(result);
      this.ofertaForm.controls["vacante"].setValue(this.oferta.vacante);
      this.ofertaForm.controls["areaTrabajo"].setValue(this.oferta.areaTrabajo);
      this.ofertaForm.controls["funcionesTareas"].setValue(this.oferta.funcionesTareas);
      this.ofertaForm.controls["requisitosExcluyentes"].setValue(this.oferta.requisitosExcluyentes);
      this.ofertaForm.controls["requisitosValorar"].setValue(this.oferta.requisitosValorar);
      this.ofertaForm.controls["horario"].setValue(this.oferta.horario);
      this.ofertaForm.controls["salarioDesde"].setValue(this.oferta.salarioDesde);
      this.ofertaForm.controls["salarioHasta"].setValue(this.oferta.salarioHasta);
      this.ofertaForm.controls["lugar"].setValue(this.oferta.lugar);
      this.ofertaForm.controls["fechaCierre"].setValue(moment(this.oferta.fechaCierre).toDate());
    }
    catch{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontró esa oferta' });
    } 
  }

  get f() { return this.ofertaForm.controls; }

  async ngOnSubmit() : Promise<boolean> {
    let oferta = new Oferta();

    oferta.id = this.ofertaId;
    oferta.vacante = this.ofertaForm.controls.vacante.value;
    oferta.areaTrabajo = this.ofertaForm.controls.areaTrabajo.value;
    oferta.funcionesTareas = this.ofertaForm.controls.funcionesTareas.value;
    oferta.requisitosExcluyentes = this.ofertaForm.controls.requisitosExcluyentes.value;
    oferta.requisitosValorar = this.ofertaForm.controls.requisitosValorar.value;
    oferta.horario = this.ofertaForm.controls.horario.value;
    oferta.salarioDesde = this.ofertaForm.controls.salarioDesde.value;
    oferta.salarioHasta = this.ofertaForm.controls.salarioHasta.value;
    oferta.lugar = this.ofertaForm.controls.lugar.value;
    oferta.fechaCierre = moment(this.ofertaForm.controls.fechaCierre.value, 'MM-DD-YYYY').toDate()

    if(this.idEmpresa){
      oferta.empresa =  await this.empresarioService.infoEmpresario(this.idEmpresa).toPromise();
    }
    try {
      await this.ofertasService.modificarOferta(oferta).toPromise();
      this.ofertaForm.reset;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;
    } catch (error) {
      console.log();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
      return false;
    }
  }

  async enviar() {
    this.submitted = true;
    if(this.ofertaForm.valid){
      if (await this.ngOnSubmit()) {
        if(this.user.tipo=='Admin'){
          this.router.navigate(['/ofertasAdmin']);
        }
        else{
          this.router.navigate(['/misOfertas']);
        }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
    }
    
    return;
  }

}
}