import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SesionDTO } from '../../dto/sesion-dto';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  sesionDTO: SesionDTO;
  alerta!: Alerta;

  constructor(private authService: AuthService, private tokenService: TokenService){
    this.sesionDTO= new SesionDTO();
  }

  public iniciarSesion(){
    this.authService.logInCliente(this.sesionDTO).subscribe({
      next: data => {
        this.tokenService.logIn(data.respuesta.token);
      },
      error: error => {
        this.alerta= new Alerta(error.error.respuesta, "danger");
      }
    });
  }

}
