export class ActualizarClienteDto {
    constructor(
        public id: string='',
        public nombre: string='',
        public fotoPerfil: string='',
        public email: string='',
        public ciudadResidencia: string=''
    ){}
}
