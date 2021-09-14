import { Pais } from "./Pais";
import { Localidad } from "./Localidad";

export class Departamento {
    id?: number | undefined;
    nombre?: string | undefined;
    localidades?: Localidad[];
    pais: Pais | undefined;
    
    constructor() {}
}