import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudServiceProv } from 'src/app/servicioprov/crud.service';
import { CrudServiceClasi } from 'src/app/servicioclasi/crud.service';
import { CrudServiceMar } from 'src/app/serviciomar/crud.service';
import { CrudServiceIng } from 'src/app/servicioing/crud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';

//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  modalRef?: BsModalRef;
  Ingresos:any;
  IngresosFiltro:any;
  IngresosBak:any;
  Proveedores: any;
  Clasificaciones: any;
  Marcas: any;
  formularioDeIngresos:FormGroup;
  formularioDeClasificacion:FormGroup;
  formularioDeMarca:FormGroup;
  elID:any;
  idMarca:any;
  idProveedor:any;

  //@ViewChild('tabla') tabla!: ElementRef<HTMLDivElement>;

    // paginacion
    public page: number = 1;
    count: number = 0;
    tableSize: number = 7;
    tableSizes: any = [3, 6, 9, 12];

  constructor(private modalService: BsModalService,private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudServiceIng:CrudServiceIng,private crudServiceProv:CrudServiceProv, private crudServiceClasi:CrudServiceClasi, private crudServiceMar:CrudServiceMar, private ruteador:Router) 
  {

    this.elID=this.activateroute.snapshot.paramMap.get('id');
    console.log(this.elID);
    if (this.elID)
    {
        //recibiendo el id del ingreso
        this.crudServiceIng.ObtenerIngreso(this.elID).subscribe(respuesta=>{
          console.log("editando"+respuesta); 
          this.formularioDeIngresos.setValue({
            idingreso:respuesta[0]['idingreso'],
            idproveedor:respuesta[0]['idproveedor'],
            idclasificacion:respuesta[0]['idclasificacion'],
            idmarca:respuesta[0]['idmarca'],
            codigo:respuesta[0]['codigo'],
            cantidad:respuesta[0]['cantidad'],
            costo:respuesta[0]['costo'],
            pordescuento:respuesta[0]['pordescuento'],
            costopublico:respuesta[0]['costopublico'],
            comentario:respuesta[0]['comentario'],
            pesotalla:respuesta[0]['pesotalla'],
          });
        });
      }

    this.formularioDeIngresos=this.formulario.group({
      idingreso:[''],
      idproveedor:['',Validators.required],
      idclasificacion:[''],
      idmarca:[''],
      codigo:[''],
      cantidad:[''],
      costo:[''],
      pordescuento:[''],
      costopublico:[''],
      comentario:[''],
      pesotalla:[''],
    });

    this.formularioDeClasificacion=this.formulario.group({
      idclasificacion:[''],
      nombreclasificacion:[''],
      idtipo:[''],
    });

    this.formularioDeMarca=this.formulario.group({
      idmarca:[''],
      nombremarca:[''],
    });

   }

  ngOnInit(): void {
    this.crudServiceProv.ObtenerProveedores().subscribe(respuesta=>{console.log(respuesta); this.Proveedores=respuesta;});
    this.crudServiceClasi.ObtenerClasificaciones().subscribe(respuesta=>{console.log(respuesta); this.Clasificaciones=respuesta;});
    this.crudServiceMar.ObtenerMarcas().subscribe(respuesta=>{console.log(respuesta); this.Marcas=respuesta;});
    if (this.elID) 
    {
      
    }
    else{
      this.crudServiceIng.ObtenerIngresos().subscribe(respuesta=>{console.log(respuesta); this.Ingresos=respuesta;});
    }
    
  }

    //metodos para la paginacion
    fetchIngresos(): void {
      this.crudServiceIng.ObtenerIngresos().subscribe(respuesta=>{console.log(respuesta); this.Ingresos=respuesta;});
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.fetchIngresos();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchIngresos();
    }  


    //metodo para recalcular los totales al incrementar/disminuir los campos de cantidad, precio, %de descuento
    RecalcularCostoPublico(event:any)
    {          
      this.formularioDeIngresos.controls['costopublico'].setValue((this.formularioDeIngresos.controls['costo'].value*(1+(this.formularioDeIngresos.controls['pordescuento'].value/100))).toFixed(2));
    }

    FiltrarDatos(evento:any):void
    {
     console.log(evento.value);
     if (evento.value=='')
     {
       this.Ingresos.filter='';
       this.crudServiceIng.ObtenerIngresos().subscribe(respuesta=>{console.log(respuesta); this.Ingresos=respuesta;});  
     }
     else{
     //const filterValue = (evento.target as HTMLInputElement).value;
     this.IngresosFiltro = this.Ingresos.filter((d:any)=>d.codigo.toLocaleLowerCase().includes(evento.value));
     //this.Clientes.filter = filterValue.trim().toLocaleLowerCase();
     console.log('filtered data ', this.IngresosFiltro);
     this.Ingresos = this.IngresosFiltro;
     }
    }

    DescargarAExcel():void {
      //let elemento = document.getElementById("tablita");
      //const ws: XLSX.WorkSheet =  XLSX.utils.table_to_sheet(elemento);
      const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Ingresos);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'ingresos.xlsx');
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

    //metodo para agregar nueva clasificación a través del modal
    enviarDatos3(value: any):any {    

        this.crudServiceClasi.AgregarClasificacion(this.formularioDeClasificacion.value).subscribe(respuesta=>{        
            //console.log(respuesta);
             window.location.reload();
        });
 
      }

    //metodo para agregar nueva marca a través del modal
    enviarDatos4(value: any):any {    

        this.crudServiceMar.AgregarMarca(this.formularioDeMarca.value).subscribe(respuesta=>{        
             window.location.reload();
        });
 
      }

  //metodo para editar ingreso y agregar ingreso
  enviarDatos(value: any):any {    
    console.log("me presionaste");
    console.log(this.formularioDeIngresos.value);
    console.log(this.elID);
    //suscribe es para que se ejecute la instruccion
    if (this.elID)
    {
      this.crudServiceIng.EditarIngreso(this.elID,this.formularioDeIngresos.value).subscribe(()=>{
        this.ruteador.navigateByUrl('/ingresos');
      });
    }
    else
    {
      this.crudServiceIng.AgregarIngreso(this.formularioDeIngresos.value).subscribe(respuesta=>{        
           window.location.reload();
      });
    }
    }

}
