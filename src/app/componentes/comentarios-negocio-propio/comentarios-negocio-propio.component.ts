import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemComentarioDTO } from '../../dto/item-comentario-dto';
import { ResponderComentarioDTO } from '../../dto/responder-comentario-dto';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { PublicoService } from '../../servicios/publico.service';
import { ComentariosService } from '../../servicios/comentarios.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-comentarios-negocio-propio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AlertaComponent],
  templateUrl: './comentarios-negocio-propio.component.html',
  styleUrl: './comentarios-negocio-propio.component.css'
})
export class ComentariosNegocioPropioComponent {
  comentarios: ItemComentarioDTO[];
  responderComentarioDTO: ResponderComentarioDTO;
  codigoNegocio: string='';
  alerta!: Alerta;

  constructor(private route: ActivatedRoute, private publicoService: PublicoService, private comentarioService: ComentariosService, private tokenService: TokenService){
    this.comentarios=[];
    this.route.params.subscribe((params) => {
      this.codigoNegocio=params['codigo'];
      this.obtenerComentarios();
    });
    this.responderComentarioDTO= new ResponderComentarioDTO();
  }

  public obtenerComentarios(){
    if(this.codigoNegocio!=null && this.codigoNegocio!=""){
      this.publicoService.listarComentariosNegocios(this.codigoNegocio).subscribe({
        next: (data) => {
          this.comentarios=data.respuesta;
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Ocurrio un problema interno, intente mas tarde", "warning");
    }
  }

  public responderComentario(codigo: string){
    this.responderComentarioDTO.codigo=codigo;
    if(codigo!=null && codigo!=""){
      if(this.responderComentarioDTO.respuesta!=null && this.responderComentarioDTO.respuesta!=""){
        this.comentarioService.responderComentario(this.responderComentarioDTO).subscribe({
          next: (data) => {
            this.alerta= new Alerta(data.respuesta, "success");
            this.obtenerComentarios();
          },
          error: (error) => {
            this.alerta= new Alerta(error.error.respuesta, "danger");
          }
        });
      }else{
        this.alerta= new Alerta("Su respuesta no puede estar vacia, escriba una respuesta", "warning");
      }
    }else{
      this.alerta= new Alerta("Ocurrio un problema interno, intente mas tarde", "warning");
    }
  }
}
