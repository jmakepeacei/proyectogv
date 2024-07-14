import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder,FormsModule  } from '@angular/forms';
import { CrudServiceCli } from 'src/app/serviciocli/crud.service';
import { CrudServiceVen } from 'src/app/servicioven/crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';

//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  modalRef?: BsModalRef;
  Clientes:any;
  Ventas: any;
  VentasFiltro:any;
  formularioDeVentas: FormGroup;
  elID:any;
  formularioDeClientes:FormGroup;

      // paginacion
      public page: number = 1;
      count: number = 0;
      tableSize: number = 7;
      tableSizes: any = [3, 6, 9, 12];
      dt:any;


  constructor(private modalService: BsModalService,private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudServiceCli:CrudServiceCli,private crudServiceVen:CrudServiceVen, private ruteador:Router) { 

    this.formularioDeVentas=this.formulario.group({
      fechaventa:[new Date()],
      idcliente:[''],
    });

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
    this.crudServiceCli.ObtenerClientes().subscribe(respuesta=>{console.log(respuesta); this.Clientes=respuesta;});
    this.crudServiceVen.ObtenerVentas().subscribe(respuesta=>{console.log(respuesta); this.Ventas=respuesta;});
    let hoy: number = Date.now();
    this.dt = hoy;
    
  }

  //metodos para la paginacion
  fetchVentas(): void {
    this.crudServiceVen.ObtenerVentas().subscribe(respuesta=>{console.log(respuesta); this.Ventas=respuesta;});
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchVentas();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchVentas();
  }  
  
  //metodo para filtrar clientes
  FiltrarDatos(evento:any):void
  {
   console.log(evento.value);
   if (evento.value=='')
   {
     this.Ventas.filter='';
     this.crudServiceVen.ObtenerVentas().subscribe(respuesta=>{console.log(respuesta); this.Ventas=respuesta;});  
   }
   else{
   //const filterValue = (evento.target as HTMLInputElement).value;
   this.VentasFiltro = this.Ventas.filter((d:any)=>d.nombrecliente.toLocaleLowerCase().includes(evento.value));
   //this.Clientes.filter = filterValue.trim().toLocaleLowerCase();
   console.log('filtered data ', this.VentasFiltro);
   this.Ventas = this.VentasFiltro;
   }
  }

  //Abrirl Modal
  abrirModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
  }

  //metodo para descargar las ventas
  DescargarAExcel():void {
    //let elemento = document.getElementById("tablita");
    //const ws: XLSX.WorkSheet =  XLSX.utils.table_to_sheet(elemento);
    const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Ventas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ventas.xlsx');
   }  

//metodo para el modal
  enviarDatos2(value: any):any {    
    console.log("me presionaste");
    console.log(this.formularioDeClientes.value);
    console.log(this.elID);
    //suscribe es para que se ejecute la in struccion
      this.crudServiceCli.AgregarCliente(this.formularioDeClientes.value).subscribe(respuesta=>{
        window.location.reload();
      });

    }

//metodo para editar ingreso y agregar ingreso
enviarDatos(value: any):any {    
  console.log("me presionaste");
  console.log(this.formularioDeVentas.value);
  console.log(this.elID);
  //suscribe es para que se ejecute la instruccion
  if (this.elID)
  {
    this.crudServiceVen.EditarVenta(this.elID,this.formularioDeVentas.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/ventasd');
    });
  }
  else
  {
    this.crudServiceVen.AgregarVenta(this.formularioDeVentas.value).subscribe(respuesta=>{      
      console.log(respuesta.ultimoregistro);
      this.elID = respuesta.ultimoregistro;
      this.ruteador.navigateByUrl('/ventasd/'+respuesta.ultimoregistro);
         //window.location.reload();
    });
  }
  }

}
