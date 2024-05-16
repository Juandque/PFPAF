import { Component } from '@angular/core';
import { CrearNegocioDTO } from '../../dto/crear-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../models/horario';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {
  crearNegocioDTO: CrearNegocioDTO;
  horarios: Horario[];
  telefonos: string[];
  archivos!: FileList;
  tiposNegocio: string[];


  constructor(private negocioService: NegociosService, private mapaService: MapaService) {
    this.crearNegocioDTO = new CrearNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [""]
    this.tiposNegocio = [];
    this.cargarTiposNegocio();
  }

  public crearNegocio() {
    this.crearNegocioDTO.horarios = this.horarios;
    this.crearNegocioDTO.telefonos= this.telefonos;
    this.negocioService.crear(this.crearNegocioDTO);
    console.log(this.crearNegocioDTO);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
    console.log(this.horarios.length);
  }

  public agregarTelefono() {
    this.telefonos.push("");
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.crearNegocioDTO.imagenes.push(this.archivos[0].name);
    }
  }

  private cargarTiposNegocio() {
    this.tiposNegocio = ["PANADERIA", "RESTAURANTE", "LIBRERIA", "GIMNASIO", "CAFETERIA", "BAR", "DISCOTECA", "PELUQUERIA", "SUPERMERCADO", "TIENDA", "OTRO"];
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) =>{
      this.crearNegocioDTO.ubicacion.latitud= marcador.lat;
      this.crearNegocioDTO.ubicacion.longitud= marcador.lng;
    });
  }
}
