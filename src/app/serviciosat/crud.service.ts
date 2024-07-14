import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo sat
import { Sat } from './Sat';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceSat {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/sats/'
  constructor(private clienteHttp:HttpClient) { }

  AgregarSat(datosSat:Sat):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosSat);
  }
  
  ObtenerSats(){
    return this.clienteHttp.get(this.API);
  }

  ObtenerSat(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  EditarSat(id:any,datosSat:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosSat);
  }

}
