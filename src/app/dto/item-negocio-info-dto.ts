import { Horario } from "../models/horario";

export class ItemNegocioInfoDTO {
    constructor(
        public codigoNegocio: string='',
        public descripcion: string='',
        public direccion: string='',
        public telefonos: string[]=[],
        public horarios: Horario[]=[]
    ){}
}
