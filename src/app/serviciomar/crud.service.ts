import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo empleado
import { Marca } from './Marca';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceMar {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/marcas/'

  constructor(private clienteHttp:HttpClient) { }
    AgregarMarca(datosMarca:Marca):Observable<any>{
      return this.clienteHttp.post(this.API+"?insertar=1",datosMarca);
    }
    
    ObtenerMarcas(){
      return this.clienteHttp.get(this.API);
    }
  
    ObtenerMarca(id:any):Observable<any>{
      return this.clienteHttp.get(this.API+"?consultar="+id);
    }
  
    EditarMarca(id:any,datosMarca:any):Observable<any>{
      return this.clienteHttp.post(this.API+"?actualizar="+id,datosMarca);
    }
}
