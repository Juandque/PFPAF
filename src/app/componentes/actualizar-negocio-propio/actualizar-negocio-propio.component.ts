import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AlertaComponent } from '../alerta/alerta.component';
import { ActualizarNegocioDTO } from '../../dto/actualizar-negocio-dto';
import { Alerta } from '../../dto/alerta';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ImagenService } from '../../servicios/imagen.service';
import { Horario } from '../../models/horario';
import { ActivatedRoute } from '@angular/router';
import { ObtenerNegocioDTO } from '../../dto/obtener-negocio-dto';
import { ImagenDTO } from '../../dto/imagen-dto';

@Component({
  selector: 'app-actualizar-negocio-propio',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, AlertaComponent],
  templateUrl: './actualizar-negocio-propio.component.html',
  styleUrl: './actualizar-negocio-propio.component.css'
})
export class ActualizarNegocioPropioComponent {
  actualizarNegocioDTO: ActualizarNegocioDTO;
  obtenerNegocioDTO: ObtenerNegocioDTO;
  horarios: Horario[];
  telefonos: string[];
  imagenesExistentes: {url: string, seleccionada:boolean}[]=[];
  archivos!: FileList;
  tiposNegocio: string[];
  codigoNegocio: string='';
  alerta!: Alerta;
  
  constructor(private negociosService: NegociosService, private mapaService: MapaService, private imagenService: ImagenService, private route: ActivatedRoute){
    this.actualizarNegocioDTO= new ActualizarNegocioDTO();
    this.obtenerNegocioDTO= new ObtenerNegocioDTO();
    this.route.params.subscribe((params) => {
      this.codigoNegocio=params['codigo'];
      this.obtenerNegocio();
    });
    this.settearImagenes();
    this.horarios = this.obtenerNegocioDTO.horarios;
    this.telefonos = this.obtenerNegocioDTO.telefonos
    this.tiposNegocio = [];
    this.cargarTiposNegocio();
  }

  private cargarTiposNegocio() {
    this.tiposNegocio = ["PANADERIA", "RESTAURANTE", "LIBRERIA", "GIMNASIO", "CAFETERIA", "BAR", "DISCOTECA", "PELUQUERIA", "SUPERMERCADO", "TIENDA", "OTRO"];
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
    console.log(this.horarios.length);
  }

  public agregarTelefono() {
    this.telefonos.push("");
  }

  public settearImagenes(){
    const urlsRecibidas: string[]= this.obtenerNegocioDTO.imagenes;
    this.imagenesExistentes= urlsRecibidas.map(url => ({url, seleccionada:false}))
  }

  public marcarParaEliminar(indice: number) {
    this.imagenesExistentes[indice].seleccionada = !this.imagenesExistentes[indice].seleccionada;
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

  public obtenerNegocio(){
    if(this.codigoNegocio!=null && this.codigoNegocio!=""){
      this.negociosService.obtenerNegocio(this.codigoNegocio).subscribe({
        next: (data) => {
          this.obtenerNegocioDTO=data.respuesta;
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("No ha iniciado sesion, por favor hagalo", "warning");
    }
  }

  public actualizarNegocio(){
    this.actualizarNegocioDTO={
      codigo: this.obtenerNegocioDTO.codigoNegocio, 
      nombre: this.obtenerNegocioDTO.nombre,
      descripcion: this.obtenerNegocioDTO.descripcion,
      direccion:this.obtenerNegocioDTO.direccion, 
      telefonos: this.obtenerNegocioDTO.telefonos, 
      imagenes:this.obtenerNegocioDTO.imagenes, 
      horarios: this.obtenerNegocioDTO.horarios, 
      ubicacion: this.obtenerNegocioDTO.ubicacion
    }
    if(this.actualizarNegocioDTO.codigo!=null && this.actualizarNegocioDTO.codigo!=""){
      this.negociosService.actualizarNegocio(this.actualizarNegocioDTO).subscribe({
        next: (data) => {
          this.alerta= new Alerta(data.respuesta, "success");
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("No se puede actualizar el negocio, codigo no enconttrado", "danger");
    }
  }

  public subirImagen(){
    if(this.archivos != null && this.archivos.length>0){
      const cantidaFotosAlmacenadas= this.archivos.length;
      const cantidadFotosSubidas=0;
      for(let i=0; i<this.archivos.length; i++){
        const formData= new FormData();
        formData.append('file', this.archivos[i]);
        this.imagenService.subir(formData).subscribe({
          next: data => {
            this.obtenerNegocioDTO.imagenes.push(data.respuesta.url);
            cantidadFotosSubidas+1;
          },
          error: error => {
            this.alerta= new Alerta(error.error, "danger");
          }
        });
      }
      if(cantidaFotosAlmacenadas==cantidadFotosSubidas){
        this.alerta= new Alerta("Sus imagenes han sido guardadas", "success");
      }
    }
  }

  public eliminarImagenes(){
    const imagenesEliminar = this.imagenesExistentes.filter(img => img.seleccionada);
    if(imagenesEliminar.length>0){
      const cantidaFotosEliminar= imagenesEliminar.length;
      const cantidadFotosEliminadas=0;
      for(let i=0; i<imagenesEliminar.length; i++){
        this.imagenService.eliminar(new ImagenDTO(i+"", imagenesEliminar[i].url)).subscribe({
          next: (data) => {
            this.imagenesExistentes = this.imagenesExistentes.filter(img => img.url !== this.imagenesExistentes[i].url);
            cantidadFotosEliminadas+1;
          },
          error: (error) => {
            this.alerta= new Alerta(error.error.respuesta, "danger");
          }
        });
      }
      if(cantidaFotosEliminar==cantidadFotosEliminadas){
        this.alerta= new Alerta("Las imagenes fueron eliminadas", "success");
      }
    }else{
      this.alerta= new Alerta("Debe seleccionar imagenes para eliminar", "warning");
    }
    this.obtenerNegocioDTO.imagenes= this.imagenesExistentes.map(img => img.url);
  }
}
