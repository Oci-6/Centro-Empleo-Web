import { Postulante } from "./Postulante";

export class PreferenciaLaboral {
    id?: number | undefined;
    puestoPreferido?: string | undefined;
    areaInteres?: string | undefined;
    aspiracionSalarial?: number | undefined;

    postulante: Postulante[] | undefined;
    
    constructor() {}
}
