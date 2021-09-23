import { Oferta } from "./Oferta"

export class Empresario {

    rut?: number | undefined;


    razonSocial?: string | undefined;

    estado?: boolean | undefined;


    fechaExpiracion?: Date | undefined;

    ofertas?: Oferta[] | undefined;


constructor(){ }
}