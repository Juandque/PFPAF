import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { InformacionNegocioComponent } from '../informacion-negocio/informacion-negocio.component';
import { ComentariosNegocioComponent } from '../comentarios-negocio/comentarios-negocio.component';
import { PublicoService } from '../../servicios/publico.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { Ubicacion } from '../../models/ubicacion';
import { MapaService } from '../../servicios/mapa.service';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { AgregarNegocioFavoritoDTO } from '../../dto/agregar-negocio-favorito-dto';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, InformacionNegocioComponent, ComentariosNegocioComponent, AlertaComponent],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {
  negocio: DetalleNegocioDTO;
  codigoNegocio: string='';
  mostrarComponente: string='descripcion';
  alerta!: Alerta;

  constructor(private route: ActivatedRoute,private publicoService: PublicoService, private mapaService: MapaService, private clienteService: ClienteService, private tokenService: TokenService){
    this.route.params.subscribe((params) => {
      this.codigoNegocio=params['codigo'];
      this.obtenerNegocio();
    });
    this.negocio=new DetalleNegocioDTO();
  }

  public obtenerNegocio(){
    this.publicoService.obtenerDetalleNegocio(this.codigoNegocio).subscribe({
      next: (data) => {
        this.negocio=data.respuesta;
      },
      error: (error) => {
        this.alerta= new Alerta("Error al cargar el negocio", "danger");
      }
    });
  }

  mostrarDescripcion(){
    this.mostrarComponente='descripcion';
  }

  mostrarComentarios(){
    this.mostrarComponente='comentarios';
  }

  mostrarRuta(ubicacion: Ubicacion){
    this.mapaService.showRoute([ubicacion.longitud, ubicacion.latitud]);
  }

  public accionFavorito(){
    const codigoUsuario=this.tokenService.getCodigo();
    if(this.codigoNegocio!= null && this.codigoNegocio!= ""){
      this.clienteService.agregarFavorito(new AgregarNegocioFavoritoDTO(codigoUsuario, this.codigoNegocio)).subscribe({
        next: (data) => {
          this.alerta= new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Ocurrio un error interno, intenta mas tarde", "warning");
    }
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }
}
