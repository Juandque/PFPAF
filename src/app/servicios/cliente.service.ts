import { Injectable } from '@angular/core';
import { MostrarPerfilDTO } from '../dto/mostrar-perfil-dto';
import { HttpClient } from '@angular/common/http';
import { ActualizarClienteDto } from '../dto/actualizar-cliente-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { AgregarNegocioFavoritoDTO } from '../dto/agregar-negocio-favorito-dto';
import { CambioPasswordDto } from '../dto/cambio-password-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesURL = "http://localhost:8282/api/clientes";

  constructor(private http: HttpClient) { 
  }

  public actualizarCliente(clienteActualizado: ActualizarClienteDto): Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.clientesURL}/editar-perfil`, clienteActualizado);
  }

  public cambiarPassword(passwordNueva: CambioPasswordDto):Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.clientesURL}/editar-password`, passwordNueva);
  }

  public eliminarCuenta(codigoUsuario: string):Observable<MensajeDTO>{
    return this.http.delete<MensajeDTO>(`${this.clientesURL}/eliminar/${codigoUsuario}`);
  }

  public obtenerCliente(codigoUsuario: string):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.clientesURL}/obtener/${codigoUsuario}`);
  }

  public agregarFavorito(agregarFavorito: AgregarNegocioFavoritoDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.clientesURL}/agregar-favorito`, agregarFavorito);
  }
}
