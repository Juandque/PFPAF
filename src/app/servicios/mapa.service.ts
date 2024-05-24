import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { ItemListarNegociosDTO } from '../dto/item-listar-negocios-dto';
import { Ubicacion } from '../models/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapa: any;
  marcadores: any[];
  start: [number, number] = [-75.658370, 4.556329]
  constructor() {
    this.marcadores = [];
  }

  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoianVhbmRxdWUiLCJhIjoiY2x3OGsxM2VoMXMzeTJxcWV2dGZzZXVtdyJ9.hX3-W4JavRlPIMFYckoqxQ',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: this.start,
      zoom: 12
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions:
          { enableHighAccuracy: true }, trackUserLocation: true
      })
    );
  }

  showRoute(destination: [number, number]): void{
    this.mapa.directions.setOrigin(this.start);
    this.mapa.directions.setDestination(destination);
  }

  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;

    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());

        const marcador = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(mapaGlobal);

        marcadores.push(marcador);
        observer.next(marcador.getLngLat());
      });
    });
  }

  public pintarMarcadores(negocios: ItemListarNegociosDTO[]) {
    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.nombre))
        .addTo(this.mapa);
    });
  }

  public pintarMarcador(ubicacion: Ubicacion) {
    new mapboxgl.Marker().setLngLat([ubicacion.longitud, ubicacion.latitud]).addTo(this.mapa);
  }
}
