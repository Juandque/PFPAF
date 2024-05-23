import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ObtenerDistanciaDTO } from '../dto/obtener-distancia-dto';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {
  private publicoURL="http://localhost:8282/api/publico";
  constructor(private http: HttpClient) { }

  public listarComentariosNegocios(codigoNegocio: string):Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-comentarios-negocio/${codigoNegocio}`);
  }

  public buscarNegociosPorNombre(busqueda: string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicoURL}/buscar-negocio-por-nombre/${busqueda}`);
  }

  public obtenerDetalleNegocio(codigoNegocio: string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener-detalle-negocio/${codigoNegocio}`);
  }

  public obtenerInformacionNegocio(codigoNegocio: string):  Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener-informacion-negocio/${codigoNegocio}`);
  }

  public buscarNegociosDistancia(negociosDistancia: ObtenerDistanciaDTO): Observable<MensajeDTO>{
    const params=this.toHttpParams(negociosDistancia);
    return this.http.get<MensajeDTO>(`${this.publicoURL}/buscar-negocios-por-distancia`, {params});
  }

  private toHttpParams(obj: any): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(obj)) {
      if (obj[key] !== null && obj[key] !== undefined) {
        params = params.set(key, obj[key].toString());
      }
    }
    return params;
  }
}
