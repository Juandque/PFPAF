import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SesionDTO } from '../../dto/sesion-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  sesionDTO: SesionDTO;

  constructor(){
    this.sesionDTO= new SesionDTO();
  }

  public iniciarSesion(){
    console.log(this.sesionDTO);
  }

}
