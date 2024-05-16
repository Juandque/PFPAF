import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  negocios: ItemListarNegociosDTO[];

  constructor(private negocioService: NegociosService, private mapaService: MapaService){
    this.negocios=[];
    this.listarNegocios();
  }

  public listarNegocios(){
    this.negocios=this.negocioService.listar();
  }

  public agregarFavorito(){
    console.log("Agregar a favorito")
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }
}
