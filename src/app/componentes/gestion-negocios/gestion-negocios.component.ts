import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ItemListarNegociosDTO } from '../../dto/item-listar-negocios-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, AlertaComponent],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
  negocios: ItemListarNegociosDTO[];
  alerta!: Alerta;

  constructor(private negocioService: NegociosService, private mapaService: MapaService, private tokenService: TokenService, private router: Router){
    this.negocios=[];
    this.listarNegocios();
  }

  public listarNegocios(){
    const codigoCliente = this.tokenService.getCodigo();
    if(codigoCliente!="" && codigoCliente!=null){
      this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
        next: (data) => {
          this.negocios = data.respuesta;
        },
        error: (error) => {
          this.alerta= new Alerta("Hubo un error al buscar sus negocios", "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Por favor inicie sesion para poder listar sus negocios", "warning");
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }

}
