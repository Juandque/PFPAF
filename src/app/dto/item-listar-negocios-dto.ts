import { TipoNegocio } from "../models/tipo-negocio";
import { Ubicacion } from "../models/ubicacion";

export class ItemListarNegociosDTO {
    constructor(
        public codigo: string='',
        public nombre: string='',
        public calificacionPromedio: number=0,
        public numeroCalificaciones: number=0,
        public tipoNegocio: string='',
        public horaCierre: string='',
        public estadoActual: string='',
        public direccion: string='',
        public imagenes: string[]= [],
        public ubicacion: Ubicacion= new Ubicacion()
    ){}
}
