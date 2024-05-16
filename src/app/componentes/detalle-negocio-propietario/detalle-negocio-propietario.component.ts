import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-negocio-propietario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-negocio-propietario.component.html',
  styleUrl: './detalle-negocio-propietario.component.css'
})
export class DetalleNegocioPropietarioComponent {
  codigoNegocio: string = '';
  negocio: ItemListarNegociosDTO | undefined;
  constructor(private route: ActivatedRoute, private negociosService: NegociosService) {
    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
      this.obtenerNegocio();
    });
  }
  public obtenerNegocio() {
    const negocioConsultado = this.negociosService.obtener(this.codigoNegocio);
    if (negocioConsultado != undefined) {
      this.negocio = negocioConsultado;
    }
  }
}
