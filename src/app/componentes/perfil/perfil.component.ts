import { CommonModule } from '@angular/common';
import { ActualizarClienteDto } from '../../dto/actualizar-cliente-dto';
import { MostrarPerfilDTO } from '../../dto/mostrar-perfil-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImagenService } from '../../servicios/imagen.service';
import { Alerta } from '../../dto/alerta';
import { TokenService } from '../../servicios/token.service';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, AlertaComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  actualizarClienteDto: ActualizarClienteDto;
  mostrarPerfilDTO: MostrarPerfilDTO;
  ciudades: string[];
  archivos!:FileList;
  alerta!: Alerta;
  codigoCliente!: string;
  constructor(private route: ActivatedRoute,private clienteService: ClienteService, private imagenService: ImagenService, private router: Router, private tokenService: TokenService){
    this.ciudades=[];
    this.cargarCiudades();
    this.actualizarClienteDto= new ActualizarClienteDto();
    this.mostrarPerfilDTO=new MostrarPerfilDTO();
    this.getCliente();
  }

  public actualizar(){
    this.actualizarClienteDto={
      id: this.mostrarPerfilDTO.id,
      nombre: this.mostrarPerfilDTO.nombre,
      fotoPerfil: this.mostrarPerfilDTO.fotoPerfil,
      email: this.mostrarPerfilDTO.email,
      ciudadResidencia: this.mostrarPerfilDTO.ciudad
    }
    if(this.actualizarClienteDto.fotoPerfil!=null && this.actualizarClienteDto.fotoPerfil!=""){
      if(this.actualizarClienteDto.fotoPerfil != this.mostrarPerfilDTO.fotoPerfil){
        console.log("son diferentes");
      }else{
        this.clienteService.actualizarCliente(this.actualizarClienteDto).subscribe({
          next: data => {
            this.alerta= new Alerta(data.respuesta, "success");
          },
          error: error => {
            this.alerta = new Alerta(error.error.respuesta, "danger");
          }
        });
      }
    }else{
      this.alerta= new Alerta("Debe tener una foto de perfil, suba una imagen", "warning");
    }
  }

  public eliminar() {
    this.codigoCliente = this.route.snapshot.paramMap.get('codigo') as string;
    this.clienteService.eliminarCuenta(this.codigoCliente).subscribe({
      next: (data) => {
        this.tokenService.logOut();
      },
      error: (error) => {
        this.alerta= new Alerta("Ha ocurrido un error al intentar eliminar tu cuenta", "danger");
      }
    });
  }

  private cargarCiudades() {
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.actualizarClienteDto.fotoPerfil = this.archivos[0].name;
    }
  }

  limpiar() {
    this.actualizarClienteDto = {
      id: '',
      nombre: '',
      fotoPerfil: '',
      email: '',
      ciudadResidencia: ''
    };
  }

  public getCliente(){
    this.codigoCliente= this.route.snapshot.paramMap.get('codigo') as string;
    this.clienteService.obtenerCliente(this.codigoCliente).subscribe({
      next: (data) => {
        this.mostrarPerfilDTO=data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar perfil");
        this.alerta= new Alerta("Ocurrio un error al cargar tu perfil", "danger");
      }
    });
  }

  public subirImagen(){
    if(this.archivos!=null && this.archivos.length>0){
      const formData= new FormData();
      formData.append('file',this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.mostrarPerfilDTO.fotoPerfil=data.respuesta.url;
          this.alerta= new Alerta("Se ha subido la foto", "success");
        },
        error: error => {
          this.alerta= new Alerta(error.error, "danger");
        }
      });
    }else{
      this.alerta= new Alerta("Debe subir una foto", "danger");
    }
  }
}
