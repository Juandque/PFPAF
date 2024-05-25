import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private authURL = "http://localhost:8282/api/publico";

  constructor(private http: HttpClient) { }

  public obtenerTiposDeNegocio():Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.authURL}/tipos-de-negocio`);
  }

  public obtenerCiudades(): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.authURL}/ciudades`);
  }
}
