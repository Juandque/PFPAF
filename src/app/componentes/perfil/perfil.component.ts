import { CommonModule } from '@angular/common';
import { ActualizarClienteDto } from '../../dto/actualizar-cliente-dto';
import { MostrarPerfilDTO } from '../../dto/mostrar-perfil-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  actualizarClienteDto: ActualizarClienteDto;
  mostrarPerfilDTO: MostrarPerfilDTO;
  ciudades: string[];
  archivos!:FileList;
  constructor(private clienteService: ClienteService){
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
    console.log(this.actualizarClienteDto)
  }

  public eliminar(){
    console.log("Eliminar Cliente");
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
    this.mostrarPerfilDTO=this.clienteService.getCliente();
  }
}
