import { Injectable } from '@angular/core';
//importando el cliente para comunicar la api
import { HttpClient } from '@angular/common/http';
//importando el monitor
import {Observable} from 'rxjs';
//importar el modelo empleado
import { Ingreso } from './Ingreso';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceIng {
//variable API para conectarse al servicio
API:string = 'http://localhost/apis/ingresos/'

  constructor(private clienteHttp:HttpClient) { }

  AgregarIngreso(datosIngreso:Ingreso):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosIngreso);
  }
  
  ObtenerIngresos(){
    return this.clienteHttp.get(this.API);
  }

  ObtenerIngreso(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  ObtenerIngresox(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarx="+id);
  }

  EditarIngreso(id:any,datosIngreso:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosIngreso);
  }
}
