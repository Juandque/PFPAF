import { Ubicacion } from "../models/ubicacion";
import { Horario } from "../models/horario";

export class CrearNegocioDTO {
    constructor(
        public nombre: string='',
        public descripcion: string='',
        public codigoUsuario: string='',
        public direccion: string='',
        public tipoNegocio: string='',
        public ubicacion: Ubicacion= new Ubicacion(),
        public telefonos: string[]=[],
        public horarios: Horario[]=[],
        public imagenes: string[]=[]
    ){ }
}
