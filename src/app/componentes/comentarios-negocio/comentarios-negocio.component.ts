import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemComentarioDTO } from '../../dto/item-comentario-dto';
import { ComentariosService } from '../../servicios/comentarios.service';
import { CrearComentarioDTO } from '../../dto/crear-comentario-dto';

@Component({
  selector: 'app-comentarios-negocio',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './comentarios-negocio.component.html',
  styleUrl: './comentarios-negocio.component.css'
})
export class ComentariosNegocioComponent {
  comentarios: ItemComentarioDTO[];
  crearComentarioDTO: CrearComentarioDTO;
  estadoCamposCrearComentario: string='ocultar';
  constructor(private comentariosService: ComentariosService){
    this.crearComentarioDTO= new CrearComentarioDTO();
    this.comentarios=[];
    this.listar();
  }

  public listar(){
    this.comentarios=this.comentariosService.listar();
  }

  comentar(){
    this.estadoCamposCrearComentario='mostrar';
  }

  cancelar(){
    this.estadoCamposCrearComentario='ocultar';
  }

  public publicarComentario(){
    this.crearComentarioDTO.codigoUsuario='2121';
    this.crearComentarioDTO.codigoNegocio='31321';
    console.log(this.crearComentarioDTO);
  }
}
