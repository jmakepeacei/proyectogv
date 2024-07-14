import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServiceSat } from 'src/app/serviciosat/crud.service';
//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sat',
  templateUrl: './sat.component.html',
  styleUrls: ['./sat.component.css']
})
export class SatComponent implements OnInit {
  Sats: any;
  formularioDeSats:FormGroup;
  elID:any;

      // paginacion
      public page: number = 1;
      count: number = 0;
      tableSize: number = 7;
      tableSizes: any = [3, 6, 9, 12];

  constructor(private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudService:CrudServiceSat, private ruteador:Router) { 
    //formulario para crear nuevo registro
    this.formularioDeSats=this.formulario.group({
      idsat:[''],
      fechaingreso:[''],
      formulario:[''],
      numeroacceso:[''],
      totalformulario:[''],
      monto:[''],
    });

  }

  ngOnInit(): void {
      this.crudService.ObtenerSats().subscribe(respuesta=>{console.log(respuesta); this.Sats=respuesta;});    
  }

   //metodos para la paginacion
   fetchSat(): void {
    this.crudService.ObtenerSats().subscribe(respuesta=>{console.log(respuesta); this.Sats=respuesta;});
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchSat();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchSat();
  }   


    //metodo para descargar las ventas
    DescargarAExcel():void {
      //let elemento = document.getElementById("tablita");
      //const ws: XLSX.WorkSheet =  XLSX.utils.table_to_sheet(elemento);
      const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Sats);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'sat.xlsx');
     }  

  //metodo para editar sat y agregar sat
  enviarDatos(value: any):any {    
    console.log("me presionaste");
    console.log(this.formularioDeSats.value);
    console.log(this.elID);
    //suscribe es para que se ejecute la in struccion
    if (this.elID)
    {
      this.crudService.EditarSat(this.elID,this.formularioDeSats.value).subscribe(()=>{
         this.ruteador.navigateByUrl('/satd');
      });
    }
    else
    {
      this.crudService.AgregarSat(this.formularioDeSats.value).subscribe(respuesta=>{
        console.log(respuesta.ultimoregistro);
        this.elID = respuesta.ultimoregistro;
        this.ruteador.navigateByUrl('/satd/'+respuesta.ultimoregistro);
        //window.location.reload();
      });
    }
    }

}
