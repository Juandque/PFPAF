import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { InformacionNegocioComponent } from '../informacion-negocio/informacion-negocio.component';
import { ComentariosNegocioComponent } from '../comentarios-negocio/comentarios-negocio.component';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, InformacionNegocioComponent, ComentariosNegocioComponent],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {
  negocio: DetalleNegocioDTO;
  mostrarComponente: string='descripcion';
  constructor(private route: ActivatedRoute,private negociosService: NegociosService){
    this.negocio=new DetalleNegocioDTO();
    this.listar();
  }

  public listar(){
  }

  mostrarDescripcion(){
    this.mostrarComponente='descripcion';
  }

  mostrarComentarios(){
    this.mostrarComponente='comentarios';
  }
}
