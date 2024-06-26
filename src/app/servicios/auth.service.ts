import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { SesionDTO } from '../dto/sesion-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "http://localhost:8282/api/auth";
  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  }

  public logInCliente(sesionDto: SesionDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, sesionDto);
  }
}
