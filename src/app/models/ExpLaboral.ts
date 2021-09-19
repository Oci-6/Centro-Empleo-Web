import { Postulante } from "./Postulante";

export class ExpLaboral {
    id?: number | undefined;
    nombreEmp?: string | undefined;
    cargo?: string | undefined;
    area?: string | undefined;
    nivelJer?: string | undefined;
    tareas?: string | undefined;
    fechaInicio?: Date | undefined;
    fechaFin?: Date | undefined;
    trabajando?: boolean | undefined;

    nombreRef?: string | undefined;
    apellidoRef?: string | undefined;
    cargoRef?: string | undefined;
    telefonoRef?: string | undefined;
    emailRef?: string | undefined;

    postulante?: Postulante | undefined;

    constructor() {}
}