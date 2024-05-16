import { Horario } from "../models/horario";

export class DetalleNegocioPropioDTO {
    constructor(
        public codigoNegocio: string='',
        public nombre: string='',
        public descripcion: string='',
        public calificacionPromedio: number=0,
        public telefonos: Set<number>= new Set<number>(),
        public direccion: string='',
        public horarios: Horario[]=[],
        public imagenes: string[]=[]
    ){}
}
