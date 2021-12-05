import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Empresario } from 'src/app/models/Empresario';
import { Oferta } from 'src/app/models/Oferta';
import { EmpresarioService } from 'src/app/services/EmpresarioService/empresario.service';
import { OfertasService } from 'src/app/services/OfertaService/ofertas.service';

@Component({
  selector: 'app-agregar-oferta',
  templateUrl: './agregar-oferta.component.html',
  styleUrls: ['./agregar-oferta.component.css']
})
export class AgregarOfertaComponent implements OnInit {

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

  constructor(
    private ofertasService: OfertasService,
    private messageService: MessageService,
    private empresarioService: EmpresarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ofertaForm = new FormGroup({
      vacante: new FormControl('', [Validators.required]),
      areaTrabajo: new FormControl('', [Validators.required]),
      funcionesTareas: new FormControl('', [Validators.required]),
      requisitosExcluyentes: new FormControl('', [Validators.required]),
      requisitosValorar: new FormControl(''),
      horario: new FormControl('', [Validators.required]),
      salarioDesde: new FormControl(''),
      salarioHasta: new FormControl(''),
      lugar: new FormControl('', [Validators.required]),
      fechaCierre: new FormControl('', [Validators.required]),
    });

    const routeParams = this.activatedRoute.snapshot.queryParamMap;
    this.idEmpresa = Number(routeParams.get('idEmpresa'));
    
  }

  get f() { return this.ofertaForm.controls; }

  async ngOnSubmit() : Promise<boolean> {
    let oferta = new Oferta();

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
      await this.ofertasService.agregarOferta(oferta).toPromise();
      this.ofertaForm.reset;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos guardados correctamente' });
      return true;
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor revise los campos' });
      return false;
    }
  }

  async enviar() {
    this.submitted = true;
    if(this.ofertaForm.valid){
      if (await this.ngOnSubmit()) {
        if(this.idEmpresa){
          this.router.navigate(['/empresas']);
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