import { Admin } from "./Admin"

export class Novedad{

    
    id?: number | undefined;

    titulo?: string | undefined;

    imagen?: string | undefined;
  
    contenido?: string | undefined;

    fechaPublicacion?: Date | undefined;

  
    admin?: Admin | undefined;

  

    constructor(){}
}