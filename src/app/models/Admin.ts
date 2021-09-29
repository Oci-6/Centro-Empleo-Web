import { User } from "./User";
import { Oferta } from "./Oferta";
import { Novedad } from "./Novedad";


export class Admin extends User{
    
    ofertas?: Oferta[] | undefined;
    novedades?: Novedad[] | undefined;
    constructor(){
        super();
    }
}