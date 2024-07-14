import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo sat
import { Ventad } from './Ventad';
import { Fechas } from './Fechas';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceVend {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/ventasd/'

  constructor(private clienteHttp:HttpClient) { }

  AgregarVentad(datosVentad:Ventad):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosVentad);
  }
  
  ObtenerVentasdIntervalo(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarfechas=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentasdPorDia(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarfechasdia=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentasdPorClasi(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarfechasclasi=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentasdPorMarca(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarfechasmar=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentasdPorCliente(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarfechasclientes=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentad(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  EditarVentad(id:any,datosVentad:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosVentad);
  }

  BorrarVentad(id:any,idingreso:any,cantidad:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+id+"&idingreso="+idingreso+"&cantidad="+cantidad);
  }

}
