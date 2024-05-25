import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../servicios/imagen.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { EnumService } from '../../servicios/enum.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

  registroClienteDTO: RegistroClienteDTO;
  apellido!: string;
  ciudades: string[];
  archivos!: FileList;
  alerta!: Alerta;

  constructor(private imagenService: ImagenService, private authService: AuthService, private router: Router, private enumService: EnumService) {
    this.ciudades = [];
    this.cargarCiudades();
    this.registroClienteDTO = new RegistroClienteDTO();
  }

  public registrar() {
    this.registroClienteDTO.nombre = this.registroClienteDTO.nombre + ' ' + this.apellido;
    if (this.registroClienteDTO.fotoPerfil != "") {
      this.authService.registrarCliente(this.registroClienteDTO).subscribe({
        next: (data) => {
          this.alerta= new Alerta(data.respuesta, "success");
          this.enviarALogin();
        },
        error: (error) => {
          this.alerta= new Alerta(error.error.respuesta, "danger");
        }
      });
    } else {
      this.alerta= new Alerta("Debe subir una imagen", "danger");
    }
  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  private cargarCiudades() {
    this.enumService.obtenerCiudades().subscribe({
      next: (data) => {
        this.ciudades=data.respuesta;
      },
      error: (error) =>{
        this.alerta= new Alerta("Error al cargar las ciudades", "danger");
      }
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }

  public enviarALogin(){
    this.router.navigate(["/login"]);
  }

  limpiar() {
    this.registroClienteDTO = {
      nombre: '',
      fotoPerfil: '',
      nombreUsuario: '',
      email: '',
      password: '',
      confirmaPassword: '',
      ciudadResidencia: ''
    };
    this.apellido = '';
  }

  public subirImagen(){
    if(this.archivos != null && this.archivos.length>0){
      const formData=new FormData();
      formData.append('file', this.archivos[0]);
      console.log( this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroClienteDTO.fotoPerfil = data.respuesta.url;
          this.alerta= new Alerta("Se ha subido la foto", "succes");
        },
        error: error => {
          this.alerta= new Alerta(error.error, "danger");
        }
      });
    }else{
      this.alerta=new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
  }
}
