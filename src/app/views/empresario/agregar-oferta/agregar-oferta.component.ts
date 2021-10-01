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

  public ofertaForm: FormGroup = new FormGroup({});
  today: Date = new Date();

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
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fechaCierre: new FormControl('', [Validators.required]),
    });

    const routeParams = this.activatedRoute.snapshot.queryParamMap;
    this.idEmpresa = Number(routeParams.get('idEmpresa'));
    
  }

  async ngOnSubmit() {
    let oferta = new Oferta();

    oferta.titulo = this.ofertaForm.controls.titulo.value;
    // oferta.descripcion = this.ofertaForm.controls.descripcion.value;
    oferta.fechaCierre = moment(this.ofertaForm.controls.fechaCierre.value, 'MM-DD-YYYY').toDate()

    if(this.idEmpresa){
      oferta.empresa =  await this.empresarioService.infoEmpresario(this.idEmpresa).toPromise();
    }

    this.ofertasService.agregarOferta(oferta).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Oferta creada correctamente' });

        if(this.idEmpresa){
          this.router.navigate(['/empresas']);
        }
        else{
          this.router.navigate(['/misOfertas']);
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar oferta' });
      }
    );
  }

}
