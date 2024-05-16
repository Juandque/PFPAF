import { Ubicacion } from "../models/ubicacion";

export class ItemMarcadorNegocioDTO {
    constructor(
        public codigoNegocio: string='',
        public nombre: string='',
        public estadoActual: string='',
        public tipoNegocio: string='',
        public imagen: string='',
        public ubicacion: Ubicacion= new Ubicacion
    ){}
}
