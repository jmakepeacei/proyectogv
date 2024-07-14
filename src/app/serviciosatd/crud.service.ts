import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo sat
import { Satd } from './Satd';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceSatd {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/satsd/'

  constructor(private clienteHttp:HttpClient) { }
  
  AgregarSatd(datosSat:Satd):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosSat);
  }
  
  ObtenerSatsd(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  ObtenerSatd(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  EditarSatd(id:any,datosSat:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosSat);
  }

  BorrarSatd(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+id);
  }
}
