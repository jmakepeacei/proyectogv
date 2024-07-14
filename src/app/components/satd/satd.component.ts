import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudServiceSat } from 'src/app/serviciosat/crud.service';
import { CrudServiceSatd } from 'src/app/serviciosatd/crud.service';
//importar las rutas para redireccionar
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-satd',
  templateUrl: './satd.component.html',
  styleUrls: ['./satd.component.css']
})
export class SatdComponent implements OnInit {
  Sats: any;
  Satsd: any;
  formularioDeSats:FormGroup;
  formularioDeSatsd:FormGroup;
  elID:any;

  total:number =0 ;    
  private valor:any;

        // paginacion
        public page: number = 1;
        count: number = 0;
        tableSize: number = 7;
        tableSizes: any = [3, 6, 9, 12];

  constructor(private activateroute:ActivatedRoute, public formulario:FormBuilder,private crudService:CrudServiceSat,private crudServiced:CrudServiceSatd, private ruteador:Router) {
    this.elID=this.activateroute.snapshot.paramMap.get('id');
    console.log(this.elID);
    if (this.elID)
    {
        //recibiendo el id de la tabla Sat
        this.crudService.ObtenerSat(this.elID).subscribe(respuesta=>{
          console.log(respuesta); 
          this.formularioDeSats.setValue({
            idsat:respuesta[0]['idsat'],
            fechaingreso:respuesta[0]['fechaingreso'],
            formulario:respuesta[0]['formulario'],
            numeroacceso:respuesta[0]['numeroacceso'],
            totalformulario:respuesta[0]['totalformulario'],
            monto:respuesta[0]['monto']
          });
        });
      }

      this.formularioDeSats=this.formulario.group({
        idsat:[''],
        fechaingreso:[''],
        formulario:[''],
        numeroacceso:[''],
        totalformulario:[''],
        monto:['']
      });

      this.formularioDeSatsd=this.formulario.group({
        idsat:[this.elID],
        fechafactura:[''],
        seriefactura:[''],
        nitcliente:[''],
        nombrecliente:[''],
        montofactura:['']
      });
   }

  ngOnInit(): void {
      this.crudServiced.ObtenerSatsd(this.elID).subscribe(respuesta=>{
        console.log(respuesta); 
        this.Satsd=respuesta;
        this.Sumar(this.Satsd); 
        console.log(this.total);
        (this.total).toFixed(2); 
        this.formularioDeSats.controls['totalformulario'].setValue((this.total).toFixed(2));
        this.formularioDeSats.controls['monto'].setValue((this.total/1.12*0.12).toFixed(2));
      });

  }

  //metodos para la paginacion
  fetchClientes(): void {
    this.crudServiced.ObtenerSatsd(this.elID).subscribe(respuesta=>{ console.log(respuesta); this.Satsd=respuesta; });
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

  //metodo para editar sat y agregar sat
  enviarDatos(value: any):any {    
    //console.log("me presionaste");
    //console.log(this.formularioDeSats.value);
    //console.log(this.elID);
    //suscribe es para que se ejecute la in struccion
    this.formularioDeSats.controls['totalformulario'].setValue((this.total).toFixed(2));
    this.formularioDeSats.controls['monto'].setValue((this.total/1.12*0.12).toFixed(2));
      this.crudService.EditarSat(this.elID,this.formularioDeSats.value).subscribe(()=>{
        //this.ruteador.navigateByUrl('/sats');
        window.location.reload();
      });

    }

    enviarDatos2(value: any):any {    
      this.crudServiced.AgregarSatd(this.formularioDeSatsd.value).subscribe(respuesta=>{        
    });

      this.crudServiced.ObtenerSatd(this.elID).subscribe((respuesta:any)=>{     
        //console.log(respuesta);      
        this.total = 0;
        this.Satsd=respuesta;
        this.Sumar(this.Satsd);          
        this.formularioDeSats.controls['totalformulario'].setValue((this.total).toFixed(2));
        this.formularioDeSats.controls['monto'].setValue((this.total/1.12*0.12).toFixed(2)); 
      });

      
      //console.log(this.formularioDeVentas.value);
      //this.formularioDeVentas.controls['totalpendiente'].setValue((this.formularioDeVentas.controls['totalventa'].value-this.formularioDeVentas.controls['totalabono'].value).toFixed(2))
      this.crudService.EditarSat(this.elID,this.formularioDeSats.value).subscribe(respuesta=>{
        //this.ruteador.navigateByUrl('/ventasd');
        window.location.reload();
        //console.log(respuesta);
      });
  
    }    

    //eliminar registro
    EliminarRegistro(id:any,iControl:any){
      console.log(id);
      console.log(iControl);
      if (window.confirm("Desea borrar el registro?")){
        this.formularioDeSats.controls['totalformulario'].setValue((this.total).toFixed(2));
        this.formularioDeSats.controls['monto'].setValue((this.total/1.12*0.12).toFixed(2)); 

        this.crudServiced.BorrarSatd(id).subscribe((respuesta)=>{
          this.Satsd.splice(iControl,1);
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
           this.total+= Number(this.valor[j].montofactura)
           //this.total.toFixed(2)
           //formatNumber(this.total,this.locale,'1.2-2')
           //console.log(this.total)  
      }  
    }

}
