import { Postulante } from "./Postulante";

export class Idioma {

    id?: number | undefined;
    nombre?: string | undefined;
    especificacion?: string | undefined;
    hablaConv?: string | undefined;
    compAud?: string | undefined;
    compLec?: string | undefined;
    escritura?: string | undefined;
    
    postulante?: Postulante | undefined;

    constructor() {}
}