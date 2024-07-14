import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo empleado
import { Clasificacion } from './Clasificacion';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceClasi {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/clasificaciones/'

  constructor(private clienteHttp:HttpClient) { }
    AgregarClasificacion(datosClasificacion:Clasificacion):Observable<any>{
      return this.clienteHttp.post(this.API+"?insertar=1",datosClasificacion);
    }
    
    ObtenerClasificaciones(){
      return this.clienteHttp.get(this.API);
    }
  
    ObtenerClasificacion(id:any):Observable<any>{
      return this.clienteHttp.get(this.API+"?consultar="+id);
    }
  
    EditarClasificacion(id:any,datosClasificacion:any):Observable<any>{
      return this.clienteHttp.post(this.API+"?actualizar="+id,datosClasificacion);
    }
  
}
