import { Departamento } from "./Departamento";

export class Pais {
    id?: number | undefined;
    nombre?: string | undefined;
    departamentos: Departamento[] | undefined;
    
    constructor() {}
}