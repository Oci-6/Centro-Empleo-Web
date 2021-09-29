import { Postulante } from "./Postulante";

export class Documento{
    id?: number | undefined;
    postulante?: Postulante | undefined;
    tipo?: string | undefined;
    ubicacion?: string | undefined;

    constructor() {}
}