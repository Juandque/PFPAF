import { Injectable } from '@angular/core';
import { ItemListarNegociosDTO } from '../dto/item-listar-negocios-dto';
import { CrearNegocioDTO } from '../dto/crear-negocio-dto';
import { Ubicacion } from '../models/ubicacion';
import { DetalleNegocioDTO } from '../dto/detalle-negocio-dto';
import { ItemNegocioInfoDTO } from '../dto/item-negocio-info-dto';
import { Horario } from '../models/horario';
import { ItemMarcadorNegocioDTO } from '../dto/item-marcador-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  negocios: ItemListarNegociosDTO[];
  negociosDetalle: DetalleNegocioDTO[];
  negociosInfo: ItemNegocioInfoDTO[];
  marcadoresNegocios: ItemMarcadorNegocioDTO[];
  constructor() {
    this.negocios = [];
    this.negocios.push( 
      new ItemListarNegociosDTO(
        '1', 
        'Bar Armenia', 
        4, 
        30,
        'BAR', 
        '10:00', 
        'Cerrado', 
        'Calle N#20', 
        ['https://picsum.photos/100', 'https://picsum.photos/101', 'https://picsum.photos/102', 'https://picsum.photos/103'] ) );

    this.negocios.push( 
      new ItemListarNegociosDTO(
        '2', 
        'Restaurante Italiano', 
        4, 
        30,
        'RESTAURANTE', 
        '10:00', 
        'Cerrado', 
        'Calle N#20', 
        ['https://picsum.photos/100', 'https://picsum.photos/101', 'https://picsum.photos/102', 'https://picsum.photos/103'] ) );

    this.negocios.push( 
      new ItemListarNegociosDTO(
        '3', 
        'Peluqueria Peluche', 
        4, 
        30,
        'PELUQUERIA', 
        '10:00', 
        'Cerrado', 
        'Calle N#20', 
        ['https://picsum.photos/100', 'https://picsum.photos/101', 'https://picsum.photos/102', 'https://picsum.photos/103'] ) );

    this.negocios.push( 
      new ItemListarNegociosDTO(
        '4', 
        'Hotel Peligroso', 
        4, 
        30,
        'OTRO', 
        '10:00', 
        'Cerrado', 
        'Calle N#20', 
        ['https://picsum.photos/100', 'https://picsum.photos/101', 'https://picsum.photos/102', 'https://picsum.photos/103'] ) );
    this.negociosDetalle=[];
    this.negociosDetalle.push(new DetalleNegocioDTO('1', 'El Arriero', 4, 65, 'Restaurante', '10:00', 'Abierto', ['https://picsum.photos/101','https://picsum.photos/102']));
    this.negociosDetalle.push(new DetalleNegocioDTO('2', 'Pizzeria La Fornace', 4, 65, 'Restaurante', '10:00', 'Abierto', ['https://picsum.photos/104','https://picsum.photos/100']))
    
    this.negociosInfo=[];
    this.negociosInfo.push(new ItemNegocioInfoDTO('1', 
    'En el restarurante EL arriero ofrecemos el mejor servicio a nuestros clientes con los mejores platillosde la ciudad, nuestros cocineros con años de experiencia han desarrollado un sazon inigualable. Esperamos que puedas disfrutar de nuestra atencion Te esperamos en Calle 20 Norte Armenia',
    'Calle 20 Norte Armenia',
    ['2132132431213','12231323212321'],[new Horario('Lunes', '10:00', '21:30'), new Horario('Jueves', '11:00', '22:00')]));

    this.marcadoresNegocios=[];
    this.marcadoresNegocios.push( new ItemMarcadorNegocioDTO('1', 'El Arriero', 'Cerrado', 'Restaurante', 'https://picsum.photos/100',new Ubicacion(-75.66194875351525, 4.548507126828405)));
    this.marcadoresNegocios.push( new ItemMarcadorNegocioDTO('2', 'Pizzeria La Fornace', 'Abierto', 'Restaurante', 'https://picsum.photos/101', new Ubicacion(-75.65729559795214, 4.552809344413485)));
  }

  public listar(): ItemListarNegociosDTO[] {
    return this.negocios;
  }

  public obtener(codigo: string): ItemListarNegociosDTO | undefined {
    return this.negocios.find(negocios => negocios.codigo == codigo);
  }

  public crear(negocioNuevo: CrearNegocioDTO) {
    const codigo = (this.negocios.length + 1).toString();
    this.negocios.push( new ItemListarNegociosDTO(codigo, negocioNuevo.nombre, 0, 0, negocioNuevo.tipoNegocio, '10:00', 'Abierto', negocioNuevo.direccion, negocioNuevo.imagenes) );
  }

  public eliminar(codigo: string){
    this.negocios = this.negocios.filter(n => n.codigo !== codigo);
  }

  public listarDetalle(){
    return this.negociosDetalle[0];
  }

  public listarInfo(){
    return this.negociosInfo[0];
  }

  public listarMarcadores(): ItemMarcadorNegocioDTO[]{
    return this.marcadoresNegocios;
  }
}
