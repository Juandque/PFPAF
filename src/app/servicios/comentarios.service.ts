import { Injectable } from '@angular/core';
import { ItemComentarioDTO } from '../dto/item-comentario-dto';
import { HttpClient } from '@angular/common/http';
import { CrearComentarioDTO } from '../dto/crear-comentario-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ResponderComentarioDTO } from '../dto/responder-comentario-dto';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private comentariosURL = "http://localhost:8082/api/comentarios"
  constructor(private http: HttpClient) { }

  public crearComentario(comentario: CrearComentarioDTO):Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.comentariosURL}/crear-comentario`, comentario);
  }

  public responderComentario(respuesta: ResponderComentarioDTO): Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.comentariosURL}/responder-comentario`, respuesta);
  }
}
