export class DetalleNegocioDTO {
    constructor(
        public codigo: string='',
        public nombre: string='',
        public calificacionPromedio: number=0,
        public numeroCalificaciones: number=0,
        public tipoNegocio: string='',
        public horaCierre: string='',
        public estadoActual: string='',
        public imagenes: string[]=[]
    ){}
}
