import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {

registroClienteDTO: RegistroClienteDTO;
apellido!: string ;
ciudades: string[];
archivos!:FileList;

constructor(){
  this.ciudades=[];
  this.cargarCiudades();
  this.registroClienteDTO= new RegistroClienteDTO();
}

public registrar() {
  this.registroClienteDTO.nombre=this.registroClienteDTO.nombre+ ' ' + this.apellido;
  if(this.registroClienteDTO.fotoPerfil!=""){
    console.log(this.registroClienteDTO);
  }else{
    console.log("Debe cargar una foto")
  }
}

public sonIguales(): boolean {
  return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
}

private cargarCiudades() {
  this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
}

public onFileChange(event: any) {
  if (event.target.files.length > 0) {
    this.archivos = event.target.files;
    this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
  }
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

}
