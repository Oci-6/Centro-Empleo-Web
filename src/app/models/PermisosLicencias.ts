import { Postulante } from "./Postulante";

export class PermisosLicencias {
    id?: number | undefined;
    tipoDocumento?: string | undefined;
    vigencia?: Date | undefined;
    especificacion?: string | undefined;

    postulante: Postulante[] | undefined;
    
    constructor() {}
}


