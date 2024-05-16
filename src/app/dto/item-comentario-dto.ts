export class ItemComentarioDTO {
    constructor(
        public fotoPerfilUsuario: string='',
        public nombreUsuario: string='',
        public codigoComentario: string='',
        public mensaje: string='',
        public respuesta: string='',
        public calificacion: number=0,
        public fecha: Date= new Date()
    ){}
}
