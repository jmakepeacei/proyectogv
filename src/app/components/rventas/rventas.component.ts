import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder,FormsModule  } from '@angular/forms';
import { CrudServiceVen } from 'src/app/servicioven/crud.service';
import { formatDate } from '@angular/common' 

import * as XLSX from 'xlsx';

//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rventas',
  templateUrl: './rventas.component.html',
  styleUrls: ['./rventas.component.css']
})
export class RventasComponent implements OnInit {
  Ventas: any;
  formularioFiltroVentas: FormGroup;

        // paginacion
        public page: number = 1;
        count: number = 0;
        tableSize: number = 7;
        tableSizes: any = [3, 6, 9, 12];
        dt:any;

        constructor(private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudServiceVen:CrudServiceVen, private ruteador:Router) { 
          this.formularioFiltroVentas=this.formulario.group({
      
            fechainicial:[''],
            fechafinal:[''],
          });

   }

  ngOnInit(): void {

    const hoy = new Date();
    const iniciodemes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    console.log(iniciodemes);

    this.formularioFiltroVentas.controls['fechainicial'].setValue(formatDate(iniciodemes,'yyyy-MM-dd','en'));
    this.formularioFiltroVentas.controls['fechafinal'].setValue(formatDate(hoy,'yyyy-MM-dd','en'));

    this.enviarDatos();
  }

    //metodos para la paginacion
    fetchVentas(): void {
      this.crudServiceVen.ObtenerVentasFiltro(this.formularioFiltroVentas.controls['fechainicial'].value,this.formularioFiltroVentas.controls['fechafinal'].value).subscribe(respuesta=>{console.log(respuesta); this.Ventas=respuesta;});
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


  //metodo para descargar el detalle ventas
  DescargarAExcel():void {
    //let elemento = document.getElementById("tablita");
    const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Ventas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ventasfiltro.xlsx');

   }  

  enviarDatos(){
    this.crudServiceVen.ObtenerVentasFiltro(this.formularioFiltroVentas.controls['fechainicial'].value,this.formularioFiltroVentas.controls['fechafinal'].value).subscribe(respuesta=>{     
      console.log(respuesta);      
      this.Ventas=respuesta;

    });
  }

}
