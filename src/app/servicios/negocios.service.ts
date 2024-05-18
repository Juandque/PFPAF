import { Injectable } from '@angular/core';
import { ItemListarNegociosDTO } from '../dto/item-listar-negocios-dto';
import { CrearNegocioDTO } from '../dto/crear-negocio-dto';
import { Ubicacion } from '../models/ubicacion';
import { DetalleNegocioDTO } from '../dto/detalle-negocio-dto';
import { ItemNegocioInfoDTO } from '../dto/item-negocio-info-dto';
import { Horario } from '../models/horario';
import { ItemMarcadorNegocioDTO } from '../dto/item-marcador-negocio-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ActualizarNegocioDTO } from '../dto/actualizar-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  private negociosURL = "http://localhost:8082/api/negocios";
  constructor(private http: HttpClient) { }

  public crear(negocioNuevo: CrearNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear-negocio`, negocioNuevo);
  }

  public actualizarNegocio(negocioActualizado: ActualizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/actualizar-negocio`, negocioActualizado);
  }

  public eliminarNegocio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar-negocio/${codigoNegocio}`);
  }

  public obtenerDetalleNegocioPropio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener-detalle-negocio-propio/${codigoNegocio}`);
  }

  public listarNegociosPropietario(codigoUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-propietario/${codigoUsuario}`);
  }

  public listarNegociosFavoritos(codigoUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-favoritos/${codigoUsuario}`);
  }

}
