export class CrearComentarioDTO {
    constructor(
        public mensaje: string='',
        public codigoUsuario: string='',
        public codigoNegocio: string='',
        public calificacion: number=0
    ){}
}
