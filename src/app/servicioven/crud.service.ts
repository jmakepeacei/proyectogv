import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo sat
import { Venta } from './Venta';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceVen {

//variable API para conectarse al servicio
API:string = 'http://localhost/apis/ventas/'
  constructor(private clienteHttp:HttpClient) { }

  AgregarVenta(datosVenta:Venta):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosVenta);
  }
  
  ObtenerVentasFiltro(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarventasfiltro=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerCitas(fechainicial:any,fechafinal:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarcitas=1&fechainicial="+fechainicial+"&fechafinal="+fechafinal);
  }

  ObtenerVentas(){
    return this.clienteHttp.get(this.API);
  }

  ObtenerVenta(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  EditarVenta(id:any,datosVenta:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosVenta);
  }

}
