import { Injectable } from '@angular/core';
import { ItemComentarioDTO } from '../dto/item-comentario-dto';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  comentarios: ItemComentarioDTO[];
  constructor() { 
    this.comentarios=[];
    this.comentarios.push(new ItemComentarioDTO('https://picsum.photos/100','Kimmi','1','Buen lugar, me gusto', '',5, new Date()));
    this.comentarios.push(new ItemComentarioDTO('https://picsum.photos/101','Jorge Luis', '2','Bueno, pero no tanto', '', 4, new Date()));
    this.comentarios.push(new ItemComentarioDTO('https://picsum.photos/102','Dayro Moreno', '3','Una chimba', '', 4, new Date()));
    this.comentarios.push(new ItemComentarioDTO('https://picsum.photos/103','Luis Padrique', '4','Regular, hay lugares mejores', '', 3.5, new Date()));
    this.comentarios.push(new ItemComentarioDTO('https://picsum.photos/104','Lorenzo', '5','Bueno, pero hay cosas por mejorar', '', 4.5, new Date()));    
  }

  public listar(): ItemComentarioDTO[]{
    return this.comentarios;
  }
}
