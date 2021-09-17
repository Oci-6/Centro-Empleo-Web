import { Postulante } from "./Postulante";

export class CapacitacionFormacion {

    id?: number | undefined;
    nombre?: string | undefined;
    areaTematica?: string | undefined;
    institucion?: string | undefined;
    fechaInicio?: Date | undefined;
    duracion?: number | undefined;
    estado?: string | undefined;

    postulante?: Postulante | undefined;
    tipoDuracion?: string | undefined;

    constructor() {}
}