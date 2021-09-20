import { Admin } from "./Admin";


export class Oferta {
    id?: number | undefined;
    titulo?: string | undefined;
    descripcion?: string | undefined;
    fechaCreacion?: Date | undefined;
    fechaCierre?: Date | undefined;
    admin?: Admin | undefined;
    
    constructor() {}
}