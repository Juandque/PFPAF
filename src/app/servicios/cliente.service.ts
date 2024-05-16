import { Injectable } from '@angular/core';
import { MostrarPerfilDTO } from '../dto/mostrar-perfil-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  cliente: MostrarPerfilDTO;
  constructor() { 
    this.cliente= new MostrarPerfilDTO('1','Jose Juan', 'https://picsum.photos/101','Cali','JoseJuan@email.com');
  }

  public getCliente(){
    return this.cliente;
  }
}
