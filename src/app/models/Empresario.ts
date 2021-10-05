import { Localidad } from "./Localidad";
import { Oferta } from "./Oferta"
import { User } from "./User";

export class Empresario extends User{

    rut?: number | undefined;

    razonSocial?: string | undefined;

    estado?: boolean | undefined;

    fechaExpiracion?: Date | undefined;

    ofertas?: Oferta[] | undefined;

    email?: string | undefined;

    telefono?: string | undefined;

    nombreFantasia?: string | undefined;

    visibilidad?: boolean | undefined;

    localidad?: Localidad | undefined;


constructor(){
    super();
}
}

