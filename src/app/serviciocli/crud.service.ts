import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo empleado
import { Cliente } from './Cliente';
import { EventManager } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class CrudServiceCli {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/clientes/'
  constructor(private clienteHttp:HttpClient) { }


  AgregarCliente(datosCliente:Cliente):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosCliente);
  }
  
  ObtenerClientes(){
    return this.clienteHttp.get(this.API);
  }

  ObtenerCliente(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  EditarCliente(id:any,datosCliente:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosCliente);
  }

}
