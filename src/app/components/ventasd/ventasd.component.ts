import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var require: any;

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudServiceCli } from 'src/app/serviciocli/crud.service';
import { CrudServiceVen } from 'src/app/servicioven/crud.service';
import { CrudServiceIng } from 'src/app/servicioing/crud.service';
import { CrudServiceVend } from 'src/app/serviciovend/crud.service';
import { NgxNumberFormatModule } from 'ngx-number-format';
import { DecimalPipe,formatNumber } from '@angular/common';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventasd',
  templateUrl: './ventasd.component.html',
  styleUrls: ['./ventasd.component.css']
})
export class VentasdComponent implements OnInit {
  Ventas: any;
  Ventasd: any;
  Clientes: any;
  Ingresos:any;
  formularioDeVentas: FormGroup;
  formularioDeDVentas: FormGroup;
  elID:any;

  total:number =0 ;    
  private valor:any;
  marca:string ="";
  clasificacion:string ="";
  existencia:number =0;
  comentario:string ="";

  // paginacion
  public page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  dt:any;

  constructor(private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudServiceIng:CrudServiceIng,private crudServiceCli:CrudServiceCli,private crudServiceVen:CrudServiceVen,private crudServiceVend:CrudServiceVend, private ruteador:Router) {

    this.elID=this.activateroute.snapshot.paramMap.get('id');
    console.log(this.elID);
    if (this.elID)
    {
        //recibiendo el id del ingreso
        this.crudServiceVen.ObtenerVenta(this.elID).subscribe(respuesta=>{
          console.log("editando"+respuesta); 
          this.formularioDeVentas.setValue({
            idventa:respuesta[0]['idventa'],
            fechaventa:respuesta[0]['fechaventa'],
            idcliente:respuesta[0]['idcliente'],
            totalventa:respuesta[0]['totalventa'],
            totalabono:respuesta[0]['totalabono'],
            totalpendiente:respuesta[0]['totalpendiente'],
            formadepago:respuesta[0]['formadepago'],
            comentario:respuesta[0]['comentario'],
            proximacita:respuesta[0]['proximacita'],
          });
        });
      }

      this.formularioDeVentas=this.formulario.group({
        idventa:[''],
        fechaventa:[''],        
        idcliente:[''],
        totalventa:[''],
        totalabono:[''],
        totalpendiente:[''],
        formadepago:['EF', [Validators.required]],
        comentario:[''],
        proximacita:['']
      });

      this.formularioDeDVentas=this.formulario.group({
        idventa:[this.elID],
        idingreso:[''],         
        comentario:[''],        
        cantidad:[''],
        costopublico:[''],
        pordescuento:[''],
        montodescuento:[''],
        total:['']
      });

   }



  ngOnInit(): void {
    this.crudServiceCli.ObtenerClientes().subscribe(respuesta=>{console.log(respuesta); this.Clientes=respuesta;});
    this.crudServiceIng.ObtenerIngresos().subscribe(respuesta=>{console.log(respuesta); this.Ingresos=respuesta;});
    this.crudServiceVend.ObtenerVentad(this.elID).subscribe((respuesta:any)=>{     
      console.log(respuesta);      
      this.Ventasd=respuesta;
      this.Sumar(this.Ventasd);         
      console.log(this.total);
      (this.total).toFixed(2);    
      this.formularioDeVentas.controls['totalventa'].setValue((this.total).toFixed(2));
      this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
    });
  }

/*
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }*/

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 170;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'letter');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 24, position, fileWidth, fileHeight);
      PDF.save('recibo.pdf');
    });
  }


    //metodos para la paginacion
    fetchVentasd(): void {
      this.crudServiceVend.ObtenerVentad(this.elID).subscribe(respuesta=>{console.log(respuesta); this.Ventasd=respuesta;});
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.fetchVentasd();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchVentasd();
    }  

    ObtenerDatos(event:any)
    {
      //console.log(event.target.value);
      console.log(event);
      this.crudServiceIng.ObtenerIngresox(event).subscribe(respuesta=>{
        console.log(respuesta); 

      this.formularioDeDVentas.controls['comentario'].setValue(respuesta[0].comentario);
      this.formularioDeDVentas.controls['cantidad'].setValue(1);
      this.formularioDeDVentas.controls['costopublico'].setValue(respuesta[0].costopublico);
      this.formularioDeDVentas.controls['pordescuento'].setValue(respuesta[0].pordescuento);
      this.formularioDeDVentas.controls['montodescuento'].setValue((respuesta[0].costopublico*((respuesta[0].pordescuento/100))).toFixed(2));
      this.formularioDeDVentas.controls['total'].setValue((respuesta[0].costopublico*(1-(respuesta[0].pordescuento/100))).toFixed(2));
      
      //this.comentario=respuesta[0].comentario;
      this.existencia=respuesta[0].cantidad;
      this.marca=respuesta[0].idmarca;
      this.clasificacion=respuesta[0].idclasificacion;
      //this.clasificacion=respuesta[0].idclasificacion;
      
      });
       
    }

    //metodo para recalcular los totales al incrementar/disminuir los campos de cantidad, precio, %de descuento
    RecalcularTotales(event:any)
    {    
      this.formularioDeDVentas.controls['montodescuento'].setValue((this.formularioDeDVentas.controls['cantidad'].value*this.formularioDeDVentas.controls['costopublico'].value*((this.formularioDeDVentas.controls['pordescuento'].value/100))).toFixed(2));
      this.formularioDeDVentas.controls['total'].setValue((this.formularioDeDVentas.controls['cantidad'].value*this.formularioDeDVentas.controls['costopublico'].value*(1-(this.formularioDeDVentas.controls['pordescuento'].value/100))).toFixed(2));
    }

    //metodo para recalcular los totales cuando se modifica solamente el monto de descuento
    RecalcularTotales2(event:any)
    {    
      //this.formularioDeDVentas.controls['montodescuento'].setValue((this.formularioDeDVentas.controls['cantidad'].value*this.formularioDeDVentas.controls['costopublico'].value*((this.formularioDeDVentas.controls['pordescuento'].value/100))).toFixed(2));
      this.formularioDeDVentas.controls['total'].setValue((this.formularioDeDVentas.controls['cantidad'].value*this.formularioDeDVentas.controls['costopublico'].value-this.formularioDeDVentas.controls['montodescuento'].value).toFixed(2));
    }

    RecalcularPendienteDePago(event:any){
      this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
    }

    //metodo para editar Venta
    enviarDatos(value: any):any {    
      //console.log("me presionaste");
      //console.log(this.formularioDeVentas.value);
      //console.log(this.elID);
      this.formularioDeVentas.controls['totalventa'].setValue((this.total).toFixed(2));
      this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
      //suscribe es para que se ejecute la in struccion
        this.crudServiceVen.EditarVenta(this.elID,this.formularioDeVentas.value).subscribe(()=>{
          //this.ruteador.navigateByUrl('/ventasd');
          window.location.reload();
        });
      }

    //metodo para agregar/insertar DVenta
    enviarDatos2(value: any):any {    
      //suscribe es para que se ejecute la instruccion      
      //console.log(this.formularioDeDVentas.value);
      //Ejecutar en el modelo la actualización de la existencia luego de insertar el producto en dventa
      this.crudServiceVend.AgregarVentad(this.formularioDeDVentas.value).subscribe(respuesta=>{        
        //this.enviarDatos(1);
        //window.location.reload();
        //this.fetchVentasd();
        //console.log(respuesta);
      });

      this.crudServiceVend.ObtenerVentad(this.elID).subscribe((respuesta:any)=>{     
        //console.log(respuesta);      
        this.total = 0;
        this.Ventasd=respuesta;
        this.Sumar(this.Ventasd);          
        this.formularioDeVentas.controls['totalventa'].setValue((this.total).toFixed(2));    
        //this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
      });

      
      //console.log(this.formularioDeVentas.value);
      //this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
      this.crudServiceVen.EditarVenta(this.elID,this.formularioDeVentas.value).subscribe(respuesta=>{
        //this.ruteador.navigateByUrl('/ventasd');
        window.location.reload();
        //console.log(respuesta);
      });



      
      }

//eliminar registro
      EliminarRegistro(id:any,iControl:any,idingreso:any,cantidad:any){
        console.log(id);
        console.log(iControl);
        if (window.confirm("Desea borrar el registro?")){
          this.formularioDeVentas.controls['totalventa'].setValue(this.total);

          this.crudServiceVend.BorrarVentad(id,idingreso,cantidad).subscribe((respuesta)=>{
            this.Ventasd.splice(iControl,1);
            //this.Ventasd;
            //this.Sumar(this.Ventasd);
            window.location.reload();
          });
       }
      }
    
      Sumar(data:any){    
        //debugger  
        this.valor=data    
        console.log(this.valor);  
        for(let j=0;j<data.length;j++){   
             this.total+= Number(this.valor[j].total)
             //this.total.toFixed(2)
             //formatNumber(this.total,this.locale,'1.2-2')
             //console.log(this.total)  
        }  
      }

}
