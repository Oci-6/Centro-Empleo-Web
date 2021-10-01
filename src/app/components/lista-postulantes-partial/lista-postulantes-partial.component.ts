import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Message } from 'src/app/models/Message';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';
import { Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-postulantes-partial',
  templateUrl: './lista-postulantes-partial.component.html',
  styleUrls: ['./lista-postulantes-partial.component.css']
})
export class ListaPostulantesPartialComponent implements OnChanges {

  message: Message | undefined;

  selectedPostulante: any = {};

  displayInfoPostulanteDialog: boolean = false;

  cols: any[] = [];

    //Filtros

    sexo: string[] = ['Masculino', 'Femenino', 'Otro'];
    selectedSexo: string = "";

    @Output() newItemEvent = new EventEmitter<{
      filtro: string,
      valor: string
    }>();

  constructor(
    private postulanteService: PostulanteService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  @Input()
  postulantes: Postulante[] = [];

  ngOnChanges(): void {
    this.cols = [
    ];
    
  }

  calcularEdad(fechaNac: Date): number{
    
    return moment().diff(fechaNac, 'years',false);
  }

  showInfoPostulante(postulante: Postulante): void {
    this.selectedPostulante = postulante;
    this.displayInfoPostulanteDialog = true;
  }


  filtrar(filtro: string){
    filtro;
    this.selectedSexo;
    this.newItemEvent.emit({
      filtro: filtro,
      valor: this.selectedSexo
    });

    

  }

}
