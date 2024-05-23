import { Component, OnInit } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { MapaService } from '../../servicios/mapa.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [RouterModule, CommonModule, SidebarComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit{
  textoBusqueda: string;
  resultados: ItemListarNegociosDTO[];

  constructor(private route: ActivatedRoute, private publicoService: PublicoService, private mapaService: MapaService){
    this.resultados=[];
    this.textoBusqueda="";

    this.route.params.subscribe( params => {
      this.textoBusqueda=params['texto'];
      this.buscar();
    })
  }
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcadores(this.resultados);
  }

  public buscar(){
    this.publicoService.buscarNegociosPorNombre(this.textoBusqueda).subscribe({
      next: (data) => {
        this.resultados=data.respuesta;
        this.mapaService.pintarMarcadores(this.resultados);
      },
      error: (error) => {
        console.log(error.error.respuesta);
      }
    })
  }

}
