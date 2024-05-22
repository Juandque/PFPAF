import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { DetalleNegocioPropioDTO } from '../../dto/detalle-negocio-propio-dto';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-detalle-negocio-propietario',
  standalone: true,
  imports: [CommonModule, AlertaComponent, SidebarComponent],
  templateUrl: './detalle-negocio-propietario.component.html',
  styleUrl: './detalle-negocio-propietario.component.css'
})
export class DetalleNegocioPropietarioComponent {
  codigoNegocio: string = '';
  negocio: DetalleNegocioPropioDTO;
  alerta!: Alerta;
  constructor(private route: ActivatedRoute, private negociosService: NegociosService) {
    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
      this.obtenerNegocio();
    });
    this.negocio= new DetalleNegocioPropioDTO();
  }
  public obtenerNegocio() {
    this.negociosService.obtenerDetalleNegocioPropio(this.codigoNegocio).subscribe({
      next: (data) => {
        this.negocio= data.respuesta;
      },
      error: (error) => {
        this.alerta= new Alerta("Ocurrio un error al cargar tu negocio", "danger");
      }
    });
  }
}
