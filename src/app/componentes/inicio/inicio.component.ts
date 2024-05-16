import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';
import { ItemMarcadorNegocioDTO } from '../../dto/item-marcador-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  negocios: ItemMarcadorNegocioDTO[];
  constructor(private mapaService: MapaService, private negociosService: NegociosService){
    this.negocios=[];
    this.listar();
  }

  public listar(){
    this.negocios= this.negociosService.listarMarcadores();
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcadores(this.negocios);
  }
}
