import { Admin } from "./Admin"
import { Empresario } from "./Empresario";
import { Postulante } from "./Postulante"

export class Oferta{

    id?: number | undefined;
    vacante?: string | undefined;
    areaTrabajo?: string | undefined;
    funcionesTareas?: string | undefined;
    requisitosExcluyentes?: string | undefined;
    requisitosValorar?: string | undefined;
    horario?: string | undefined;
    salarioDesde?: number | undefined;
    salarioHasta?: number | undefined;
    lugar?: string | undefined;
    fechaCreacion?: Date | undefined;
    fechaCierre?: Date | undefined;

    empresa?: Empresario | undefined;
    postulantes?: Postulante[] | undefined;

    constructor(){}
}
