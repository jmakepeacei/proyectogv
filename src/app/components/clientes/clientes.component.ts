import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServiceCli } from 'src/app/serviciocli/crud.service';
//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  Clientes: any;
  ClientesBak:any;
  ClientesFiltro:any;
  formularioDeClientes:FormGroup;
  elID:any;

    // paginacion
    public page: number = 1;
    count: number = 0;
    tableSize: number = 7;
    tableSizes: any = [3, 6, 9, 12];
   
  constructor(private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudService:CrudServiceCli, private ruteador:Router) { 

    this.elID=this.activateroute.snapshot.paramMap.get('id');
    console.log(this.elID);
    if (this.elID)
    {
        //recibiendo el id del empleado
        this.crudService.ObtenerCliente(this.elID).subscribe(respuesta=>{
          console.log(respuesta); 
          this.formularioDeClientes.setValue({
            idcliente:respuesta[0]['idcliente'],
            nombrecliente:respuesta[0]['nombrecliente'],
            nit:respuesta[0]['nit'],
            telefono:respuesta[0]['telefono'],
            direccion:respuesta[0]['direccion'],
            correo:respuesta[0]['correo'],
            fechacumpleanios:respuesta[0]['fechacumpleanios'],
          });
        });
      }

    this.formularioDeClientes=this.formulario.group({
      idcliente:[''],
      nombrecliente:[''],
      nit:[''],
      telefono:[''],
      direccion:[''],
      correo:[''],
      fechacumpleanios:['']
    });

  }

  ngOnInit(): void {
    if (this.elID) 
    {
      
    }
    else{
      this.crudService.ObtenerClientes().subscribe(respuesta=>{console.log(respuesta); this.Clientes=respuesta;});
      this.ClientesBak=this.Clientes;
    }
  }

  
  //metodos para la paginacion
  fetchClientes(): void {
    this.crudService.ObtenerClientes().subscribe(respuesta=>{console.log(respuesta); this.Clientes=respuesta;});
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchClientes();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchClientes();
  }   

  //metodo para descargar los clientes
  DescargarAExcel():void {
    //let elemento = document.getElementById("tablita");
    //const ws: XLSX.WorkSheet =  XLSX.utils.table_to_sheet(elemento);
    const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Clientes);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'clientes.xlsx');
   }

   FiltrarDatos(evento:any):void
   {
    console.log(evento.value);
    if (evento.value=='')
    {
      this.Clientes.filter='';
      this.crudService.ObtenerClientes().subscribe(respuesta=>{console.log(respuesta); this.Clientes=respuesta;});      
    }
    else{
    //const filterValue = (evento.target as HTMLInputElement).value;
    this.ClientesFiltro = this.Clientes.filter((d:any)=>d.nombrecliente.toLocaleLowerCase().includes(evento.value));
    //this.Clientes.filter = filterValue.trim().toLocaleLowerCase();
    console.log('filtered data ', this.ClientesFiltro);
    this.Clientes = this.ClientesFiltro;
    }
   }

  //metodo para editar cliente y agregar cliente
  enviarDatos(value: any):any {    
    console.log("me presionaste");
    console.log(this.formularioDeClientes.value);
    console.log(this.elID);
    //suscribe es para que se ejecute la in struccion
    if (this.elID)
    {
      this.crudService.EditarCliente(this.elID,this.formularioDeClientes.value).subscribe(()=>{
        this.ruteador.navigateByUrl('/clientes');
      });
    }
    else
    {
      this.crudService.AgregarCliente(this.formularioDeClientes.value).subscribe(respuesta=>{
        window.location.reload();
      });
    }
    }

    enviarDatos2():any{
      console.log(this.elID);
      console.log(this.formularioDeClientes.value);
      this.crudService.EditarCliente(this.elID,this.formularioDeClientes.value).subscribe(()=>{
        window.location.reload();
      });
    }
    

}
