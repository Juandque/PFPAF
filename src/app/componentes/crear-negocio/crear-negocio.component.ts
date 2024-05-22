import { Component } from '@angular/core';
import { CrearNegocioDTO } from '../../dto/crear-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../models/horario';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MapaService } from '../../servicios/mapa.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../servicios/imagen.service';
import { AlertaComponent } from '../alerta/alerta.component';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, AlertaComponent],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {
  crearNegocioDTO: CrearNegocioDTO;
  horarios: Horario[];
  telefonos: string[];
  archivos!: FileList;
  tiposNegocio: string[];
  alerta!: Alerta;

  constructor(private negocioService: NegociosService, private mapaService: MapaService, private tokenService: TokenService, private imagenService: ImagenService) {
    this.crearNegocioDTO = new CrearNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [""]
    this.tiposNegocio = [];
    this.cargarTiposNegocio();
  }

  public crearNegocio() {
    this.crearNegocioDTO.horarios = this.horarios;
    this.crearNegocioDTO.telefonos= this.telefonos;
    this.crearNegocioDTO.codigoUsuario=this.tokenService.getCodigo();
    if(this.crearNegocioDTO.codigoUsuario!=null && this.crearNegocioDTO.codigoUsuario!=""){
      if(this.crearNegocioDTO.imagenes!=null){
        this.negocioService.crear(this.crearNegocioDTO).subscribe({
          next: (data) => {
            this.alerta= new Alerta(data.respuesta, "succes");
          },
          error: (error) => {
            this.alerta= new Alerta(error.error.respuesta, "danger");
          }
        });
      }else{
        this.alerta= new Alerta("Debe agregar imagenes", "warning");
      }
    }
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
    }
  }

  private cargarTiposNegocio() {
    this.tiposNegocio = ["PANADERIA", "RESTAURANTE", "LIBRERIA", "GIMNASIO", "CAFETERIA", "BAR", "DISCOTECA", "PELUQUERIA", "SUPERMERCADO", "TIENDA", "OTRO"];
  }

  public subirImagen(){
    if(this.archivos != null && this.archivos.length>0){
      for(let i=0; i<this.archivos.length; i++){
        const formData= new FormData();
        formData.append('file', this.archivos[i]);
        this.imagenService.subir(formData).subscribe({
          next: data => {
            this.crearNegocioDTO.imagenes.push(data.respuesta.url);
            this.alerta= new Alerta("Imagen subida correctamente", "success");
          },
          error: error => {
            this.alerta= new Alerta(error.error, "danger");
          }
        });
      }
    }
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) =>{
      this.crearNegocioDTO.ubicacion.latitud= marcador.lat;
      this.crearNegocioDTO.ubicacion.longitud= marcador.lng;
    });
  }
}
