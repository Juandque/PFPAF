import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  constructor(private mapaService: MapaService, private negociosService: NegociosService, private router: Router){
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
  }

  public iraBusqueda(valor: string){
    if(valor){
      this.router.navigate(["/busqueda",valor]);
    }
  }
}
