import { Postulante } from "./Postulante";

export class ConocimientoInfo {

    id?: number | undefined;
    nombreApp?: string | undefined;
    categoria?: string | undefined;
    nivelConocimiento?: string | undefined;
    
    postulante?: Postulante | undefined;

    constructor() {}
}