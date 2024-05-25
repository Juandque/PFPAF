import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ObtenerDistanciaDTO } from '../../dto/obtener-distancia-dto';
import { FormsModule } from '@angular/forms';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-explorar-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FormsModule, AlertaComponent],
  templateUrl: './explorar-negocios.component.html',
  styleUrl: './explorar-negocios.component.css'
})
export class ExplorarNegociosComponent {
  negocios: ItemListarNegociosDTO[];
  obtenerDistanciaDTO: ObtenerDistanciaDTO;
  alerta!: Alerta;
  constructor(private publicoService: PublicoService, private mapaService: MapaService){
    this.obtenerDistanciaDTO= new ObtenerDistanciaDTO();
    this.negocios=[];
  }

  public obtenerDistancia(){
    this.obtenerDistanciaDTO.latitud=213212;
    this.obtenerDistanciaDTO.longitud=321223;  
    if(this.obtenerDistanciaDTO.rango>0 && this.obtenerDistancia!=null){
      this.publicoService.buscarNegociosDistancia(this.obtenerDistanciaDTO).subscribe({
        next: (data) => {
          this.negocios=data.respuesta;
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Elija un rango valido", "warning");
    }
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }
}
