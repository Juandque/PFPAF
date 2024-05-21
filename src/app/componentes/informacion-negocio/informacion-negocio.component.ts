import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemNegocioInfoDTO } from '../../dto/item-negocio-info-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { PublicoService } from '../../servicios/publico.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-informacion-negocio',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertaComponent],
  templateUrl: './informacion-negocio.component.html',
  styleUrl: './informacion-negocio.component.css'
})
export class InformacionNegocioComponent {
  negocio: ItemNegocioInfoDTO;
  codigoNegocio: string='';
  alerta!: Alerta;
  constructor(private route: ActivatedRoute, private publicoService: PublicoService){
    this.route.params.subscribe((params) => {
      this.codigoNegocio=params['codigo'];
      this.obtenerInfoNegocio();
    });
    this.negocio= new ItemNegocioInfoDTO();
  }

  public obtenerInfoNegocio(){
    this.publicoService.obtenerInformacionNegocio(this.codigoNegocio).subscribe({
      next: (data) => {
        this.negocio= data.respuesta;
      },
      error: (error) => {
        this. alerta= new Alerta("Error al cargar informacion", "danger");
      }
    })
  }
}
