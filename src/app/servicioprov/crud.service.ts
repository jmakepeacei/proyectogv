import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo empleado
import { Proveedor } from './Proveedor';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceProv {
  //variable API para conectarse al servicio
  API:string = 'http://localhost/apis/proveedores/'
    constructor(private clienteHttp:HttpClient) { }
  
    AgregarProveedor(datosProveedor:Proveedor):Observable<any>{
      return this.clienteHttp.post(this.API+"?insertar=1",datosProveedor);
    }
    
    ObtenerProveedores(){
      return this.clienteHttp.get(this.API);
    }
  
    ObtenerProveedor(id:any):Observable<any>{
      return this.clienteHttp.get(this.API+"?consultar="+id);
    }
  
    EditarProveedor(id:any,datosProveedor:any):Observable<any>{
      return this.clienteHttp.post(this.API+"?actualizar="+id,datosProveedor);
    }
  
  }
  