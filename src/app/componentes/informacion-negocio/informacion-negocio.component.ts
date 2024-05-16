import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemNegocioInfoDTO } from '../../dto/item-negocio-info-dto';
import { NegociosService } from '../../servicios/negocios.service';

@Component({
  selector: 'app-informacion-negocio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './informacion-negocio.component.html',
  styleUrl: './informacion-negocio.component.css'
})
export class InformacionNegocioComponent {
  negocio: ItemNegocioInfoDTO;
  constructor(private negociosService: NegociosService){
    this.negocio= new ItemNegocioInfoDTO();
    this.listar();
  }

  public listar(){
    this.negocio= this.negociosService.listarInfo();
  }
}
