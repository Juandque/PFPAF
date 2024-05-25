import { Horario } from "../models/horario";
import { Ubicacion } from "../models/ubicacion";

export class ObtenerNegocioDTO {
    constructor(
        public codigoNegocio: string='',
        public nombre: string='',
        public descripcion: string='',
        public direccion: string='',
        public tipoNegocio: string='',
        public ubicacion: Ubicacion= new Ubicacion(),
        public telefonos: string[]=[],
        public horarios: Horario[]=[],
        public imagenes: string[]=[]
    ){}
}
