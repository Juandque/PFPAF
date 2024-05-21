import { Horario } from "../models/horario";
import { Ubicacion } from "../models/ubicacion";

export class ActualizarNegocioDTO {
    constructor(
        public codigo: string='',
        public nombre: string = '',
        public descripcion: string = '',
        public direccion: string = '',
        public telefonos: string[] = [],
        public imagenes: string[] = [],
        public horarios: Horario[] = [],
        public ubicacion: Ubicacion = new Ubicacion()) { }
}
