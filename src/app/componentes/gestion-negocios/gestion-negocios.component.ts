import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
  negocios: ItemListarNegociosDTO[];

  constructor(private negocioService: NegociosService, private mapaService: MapaService, private tokenService: TokenService){
    this.negocios=[];
    this.listarNegocios();
  }

  public listarNegocios(){
    const codigoCliente = this.tokenService.getCodigo();
    this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }

}
