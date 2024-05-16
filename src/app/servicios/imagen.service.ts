import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ImagenDTO } from '../dto/imagen-dto';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imgUrl= "http://localhost:8081/api/imagenes";
  constructor(private http: HttpClient) { }

  public subir (imagen: FormData): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.imgUrl}/subir`, imagen);
  }

  public eliminar(imagenDTO: ImagenDTO): Observable<MensajeDTO>{
    return this.http.request<MensajeDTO>('delete',`${this.imgUrl}/eliminar`, {body: imagenDTO});
  }
}
