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
import { ActivatedRoute, Router } from '@angular/router';
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
  imagenesExistentes!:string[];
  archivos!: FileList;
  tiposNegocio: string[];
  codigoNegocio: string='';
  alerta!: Alerta;
  
  constructor(private negociosService: NegociosService, private mapaService: MapaService, private imagenService: ImagenService, private route: ActivatedRoute, private router:Router){
    this.actualizarNegocioDTO= new ActualizarNegocioDTO();
    this.obtenerNegocioDTO= new ObtenerNegocioDTO();
    this.route.params.subscribe((params) => {
      this.codigoNegocio=params['codigo'];
      this.obtenerNegocio();
    });
    this.horarios = [new Horario()];
    this.telefonos = [""];
    this.tiposNegocio = [];
    this.cargarTiposNegocio();
    this.setHorarios();
    this.setTelefonos();
    this.settearImagenes();
  }

  private cargarTiposNegocio() {
    this.tiposNegocio = ["PANADERIA", "RESTAURANTE", "LIBRERIA", "GIMNASIO", "CAFETERIA", "BAR", "DISCOTECA", "PELUQUERIA", "SUPERMERCADO", "TIENDA", "OTRO"];
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
    console.log(this.horarios.length);
  }

  public setHorarios(){
    this.horarios=this.obtenerNegocioDTO.horarios;
  }

  public agregarTelefono() {
    this.telefonos.push("");
  }

  public setTelefonos(){
    this.telefonos=this.obtenerNegocioDTO.telefonos;
  }

  public settearImagenes(){
    this.imagenesExistentes=this.obtenerNegocioDTO.imagenes;
  }

  public marcarParaEliminar(indice: number) {
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
          console.log(this.obtenerNegocioDTO);
          this.setHorarios();
          this.setTelefonos();
          this.settearImagenes();
          this.ngOnInit();
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
    console.log(this.actualizarNegocioDTO);
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
      for(let i=0; i<this.archivos.length; i++){
        const formData= new FormData();
        formData.append('file', this.archivos[i]);
        this.imagenService.subir(formData).subscribe({
          next: data => {
            this.obtenerNegocioDTO.imagenes.push(data.respuesta.url);
            this.alerta= new Alerta("Imagen cargada con exito", "success");
          },
          error: error => {
            this.alerta= new Alerta(error.error, "danger");
          }
        });
      }
    }
  }

  public eliminarImagen(urlImagen: string){
    if(urlImagen!=null && urlImagen!=""){
        this.imagenService.eliminar(new ImagenDTO('1', urlImagen)).subscribe({
          next: (data) => {
            this.imagenesExistentes = this.imagenesExistentes.filter(img => img !== urlImagen);
            this.alerta= new Alerta("Imagen Eliminada", "success");
            this.obtenerNegocioDTO.imagenes= this.imagenesExistentes;
          },
          error: (error) => {
            this.alerta= new Alerta(error.error.respuesta, "danger");
          }
        });
    }else{
      this.alerta= new Alerta("Debe seleccionar imagenes para eliminar", "warning");
    }    
  }

  ngOnInit():void{
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcador(this.obtenerNegocioDTO.ubicacion);
    this.mapaService.agregarMarcador().subscribe((marcador) =>{
      this.obtenerNegocioDTO.ubicacion.latitud= marcador.lat;
      this.obtenerNegocioDTO.ubicacion.longitud= marcador.lng;
    });
  }

  public cancerlar(){
    this.router.navigate(["/inicio"]);
  }
}
