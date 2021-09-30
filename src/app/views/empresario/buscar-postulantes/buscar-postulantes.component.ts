import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Postulante } from 'src/app/models/Postulante';
import { PostulanteService } from 'src/app/services/PostulanteService/postulante.service';

@Component({
  selector: 'app-buscar-postulantes',
  templateUrl: './buscar-postulantes.component.html',
  styleUrls: ['./buscar-postulantes.component.css']
})
export class BuscarPostulantesComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private postulanteService: PostulanteService) { }

  nodes: TreeNode[] = []
  selectedNodes: TreeNode[] = [];

  postulantes: Postulante[] = [];
  filtros: any = {};

  selectedFechaNacimiento: Date | undefined;
  ngOnInit(): void {
    this.nodes = [
      {
        key: '0',
        label: 'Datos Personales',
        selectable: false,
        children: [
          { key: '0-0', label: 'Sexo', selectable: false, children: [{ key: 'sexo1', label: 'Masculino', data: 'sexo' }, { key: 'sexo2', label: 'Femenino', data: 'sexo' }, { key: 'sexo3', label: 'Otro', data: 'sexo' },] },
          { key: 'fechaNacimiento', label: 'Fecha de nacimiento', type: "fechaNac", data: "fechaNacimiento" },
          { key: 'pais.nombre', label: 'Pais', type: "pais", data: "pais" },
          { key: 'departamento', label: 'Departamento', type: "departamento", data: "localidad.departamento.nombre" },

        ]
      },
      {
        key: '1',
        label: 'Educacion y Formacion',
        selectable: false,

      }
    ];
  }

  nodeSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.key });
    this.filtros[event.node.data] = event.node.label;

    switch (event.node.data) {
      case "fechaNacimiento":
        this.filtros[event.node.data] = this.selectedFechaNacimiento;
        break;
      case "pais":
        this.filtros[event.node.data] = {nombre: event.node.label};
        break;
      default:
        this.filtros[event.node.data] = event.node.label;


    }
    console.log(this.filtros);

    // this.postulanteService.buscarPostulantes(this.filtros).subscribe(
    //   response => this.postulantes = response
    // )
  }

  nodeUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.key });
  }

}
