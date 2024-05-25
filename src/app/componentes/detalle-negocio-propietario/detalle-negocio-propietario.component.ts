import { Component } from '@angular/core';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { DetalleNegocioPropioDTO } from '../../dto/detalle-negocio-propio-dto';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ComentariosNegocioPropioComponent } from '../comentarios-negocio-propio/comentarios-negocio-propio.component';

@Component({
  selector: 'app-detalle-negocio-propietario',
  standalone: true,
  imports: [CommonModule, AlertaComponent, SidebarComponent, ComentariosNegocioPropioComponent],
  templateUrl: './detalle-negocio-propietario.component.html',
  styleUrl: './detalle-negocio-propietario.component.css'
})
export class DetalleNegocioPropietarioComponent {
  codigoNegocio: string = '';
  negocio: DetalleNegocioPropioDTO;
  alerta!: Alerta;
  constructor(private route: ActivatedRoute, private negociosService: NegociosService, private router: Router) {
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

  public regresar(){
    this.router.navigate(["/gestion-negocios"]);
  }

  public editar(){
    this.router.navigate(["/actualizar-negocio-propio/", this.codigoNegocio]);
  }

  public eliminar(){
    if(this.codigoNegocio!=null && this.codigoNegocio!=""){
      this.negociosService.eliminarNegocio(this.codigoNegocio).subscribe({
        next: (data) => {
          this.alerta = new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta=new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta=new Alerta("Ocurrio un error, vuelve a intentarlo mas tarde", "warning");
    }
  }
}
