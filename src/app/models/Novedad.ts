import { Admin } from "./Admin";

export class Novedad {
    id?: number | undefined;
    titulo?: string | undefined;
    imagen?: string | undefined;
    contenido?: string | undefined;
    admin?: Admin | undefined;
    constructor() {}
}