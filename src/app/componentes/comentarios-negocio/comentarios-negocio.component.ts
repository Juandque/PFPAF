import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemComentarioDTO } from '../../dto/item-comentario-dto';
import { ComentariosService } from '../../servicios/comentarios.service';
import { CrearComentarioDTO } from '../../dto/crear-comentario-dto';
import { PublicoService } from '../../servicios/publico.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';

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
  codigoNegocio!: string ;
  alerta!: Alerta;
  constructor(private route: ActivatedRoute, private publicosService: PublicoService, private comentariosService: ComentariosService, private tokenService: TokenService){
    this.crearComentarioDTO= new CrearComentarioDTO();
    this.comentarios=[];
    this.listar();
  }

  public listar(){
    this.codigoNegocio= this.route.snapshot.paramMap.get('codigo') as string;
    this.publicosService.listarComentariosNegocios(this.codigoNegocio).subscribe({
      next: (data) =>{
        this.comentarios= data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
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
        this.alerta= new Alerta("Debe escribir un comentario para poder punlicar", "danger");
      }
    }else{
      this.alerta= new Alerta("Ocurrio un error al publicar su comentario, Intente de nuevo", "danger");
    }
  }
}
