import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { ClienteService } from '../../servicios/cliente.service';
import { AgregarNegocioFavoritoDTO } from '../../dto/agregar-negocio-favorito-dto';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, AlertaComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  negocios: ItemListarNegociosDTO[];
  alerta!: Alerta;

  constructor(private negocioService: NegociosService, private mapaService: MapaService, private tokenService: TokenService, private clienteService: ClienteService){
    this.negocios=[];
    this.listarNegocios();
  }

  public listarNegocios(){
    const codigoUsuario = this.tokenService.getCodigo();
    if(codigoUsuario!=null && codigoUsuario!=""){
      this.negocioService.listarNegociosFavoritos(codigoUsuario).subscribe({
        next: (data) => {
          this.negocios=data.respuesta;
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    }else{
      console.log("Error");
    }
  }

  public agregarFavorito(codigoNegocio: string){
    const codigoUsuario = this.tokenService.getCodigo();
    if(codigoUsuario!=null && codigoUsuario!=""){
      this.clienteService.agregarFavorito(new AgregarNegocioFavoritoDTO(codigoUsuario,codigoNegocio)).subscribe({
        next: (data) => {
          this.alerta= new Alerta(data.respuesta, "success");
          this.listarNegocios();
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Debe iniciar sesion para agregar un lugar a sus favoritos", "warning");
    }
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }
}
