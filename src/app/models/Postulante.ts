import { CapacitacionFormacion } from "./CapacitacionFormacion";
import { ConocimientoInfo } from "./ConocimientoInfo";
import { ExpLaboral } from "./ExpLaboral";
import { Idioma } from "./Idioma";
import { Localidad } from "./Localidad";
import { Oferta } from "./Oferta";
import { Pais } from "./Pais";
import { PermisosLicencias } from "./PermisosLicencias";
import { PreferenciaLaboral } from "./PreferenciaLaboral";

export class Postulante {

    //Datos Básicos
    id?: number | undefined;
    documento?: string | undefined;
    tipoDocumento?: string | undefined;
    primerNombre?: string | undefined;
    segundoNombre?: string | undefined;
    primerApellido?: string | undefined;
    segundoApellido?: string | undefined;
    sexo?: string | undefined;
    fechaNacimiento?: Date | undefined;
    foto?: string | undefined;
    curriculum?: string | undefined;

    //Dirección
    barrio?: string | undefined;
    direccion?: string | undefined;

    //Contacto
    primerTelefono?: string | undefined;
    segundoTelefono?: string | undefined;
    
    //Nivel educativo
    nivelEducativo?: string | undefined;
    estadoNE?: string | undefined;
    orientacionNE?: string | undefined;

    //Jornada preferida
    jIndiferente?: boolean | undefined;
    jCompleta?: boolean | undefined;
    jMtManiana?: boolean | undefined;
    jMtTarde?: boolean | undefined;
    jMtNoche?: boolean | undefined;

    //Trabajo
    puestoPreferido?: string | undefined;
    areaInteres?: string | undefined;
    aspiracionSalarial?: number | undefined;

    //Flags de control
    visibilidad?: boolean | undefined;
    estado?: boolean | undefined;
    recibirOfertas?: boolean | undefined;

    //Relaciones con otros datos
    pais?: Pais | undefined;
    localidad?: Localidad | undefined;
    paisId?: number | undefined;
    localidadId?: number | undefined;

    capacitacionFormacion?: CapacitacionFormacion[] | undefined;
    conocimientoInfo?: ConocimientoInfo[] | undefined;
    idioma?: Idioma[] | undefined;
    expLaboral?: ExpLaboral[] | undefined;
    permisosLicencias?: PermisosLicencias[] | undefined;
    preferenciaLaboral?: PreferenciaLaboral[] | undefined;

    ofertas?: Oferta[] | undefined
    constructor() {}
}