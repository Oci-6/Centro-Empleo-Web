import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  items: MenuItem[] = [];
    
  postulante: Postulante = {};
  
  constructor(public messageService: MessageService, public postulanteService: PostulanteService) { }

  ngOnInit(): void {
  }

}
