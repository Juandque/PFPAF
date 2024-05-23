import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemComentarioDTO } from '../../dto/item-comentario-dto';
import { ComentariosService } from '../../servicios/comentarios.service';
import { CrearComentarioDTO } from '../../dto/crear-comentario-dto';
import { PublicoService } from '../../servicios/publico.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-comentarios-negocio',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,AlertaComponent],
  templateUrl: './comentarios-negocio.component.html',
  styleUrl: './comentarios-negocio.component.css'
})
export class ComentariosNegocioComponent {
  comentarios: ItemComentarioDTO[];
  crearComentarioDTO: CrearComentarioDTO;
  estadoCamposCrearComentario: string='ocultar';
  codigoNegocio!: string ;
  alerta!: Alerta;
  
  constructor(private route: ActivatedRoute, private publicosService: PublicoService, private comentariosService: ComentariosService, private tokenService: TokenService){
    this.comentarios=[];
    this.route.params.subscribe((params) =>{
      this.codigoNegocio=params['codigo'];
      this.listar();
    })
    this.crearComentarioDTO= new CrearComentarioDTO();
  }

  public listar(){
    if(this.codigoNegocio!=null && this.codigoNegocio!=""){
      this.publicosService.listarComentariosNegocios(this.codigoNegocio).subscribe({
        next: (data) =>{
          this.comentarios= data.respuesta;
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Error interno, intente mas tarde", "warning");
    }
  }

  comentar(){
    this.estadoCamposCrearComentario='mostrar';
  }

  cancelar(){
    this.estadoCamposCrearComentario='ocultar';
  }

  public publicarComentario(){
    this.crearComentarioDTO.codigoUsuario=this.tokenService.getCodigo();
    this.crearComentarioDTO.codigoNegocio=this.route.snapshot.paramMap.get('codigo') as string;
    this.comentariosService.crearComentario(this.crearComentarioDTO)
    if(this.crearComentarioDTO.codigoNegocio!=null && this.crearComentarioDTO.codigoUsuario!=null){
      if(this.crearComentarioDTO.mensaje!=null){
        this.comentariosService.crearComentario(this.crearComentarioDTO).subscribe({
          next: (data) => {
            this.alerta= new Alerta(data.respuesta, "success");
          },
          error: (error) => {
            this.alerta= new Alerta(error.error.respuesta, "danger");
          }
        })
      }else{
        this.alerta= new Alerta("Debe escribir un comentario para poder publicar", "danger");
      }
    }else{
      this.alerta= new Alerta("Ocurrio un error al publicar su comentario, Intente de nuevo", "danger");
    }
  }
}
