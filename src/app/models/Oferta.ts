import { Admin } from "./Admin"
import { Empresario } from "./Empresario";
import { Postulante } from "./Postulante"

export class Oferta{

    
    id?: number | undefined;

    titulo?: string | undefined;

    descripcion?: string | undefined;

  
    fechaCreacion?: Date | undefined;

    
    fechaCierre?: Date | undefined;

  
    admin?: Admin | undefined;

   
    empresa?: Empresario | undefined;


    postulantes?: Postulante[] | undefined;

    constructor(){}
}