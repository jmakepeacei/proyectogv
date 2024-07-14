import { Component, OnInit } from '@angular/core';
import { CrudServiceVen } from 'src/app/servicioven/crud.service';
import { CrudServiceVend } from 'src/app/serviciovend/crud.service';
import { Chart,registerables  } from 'node_modules/chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
// Register the plugin to all charts:
Chart.register(ChartDataLabels);
import { formatDate } from '@angular/common' 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formularioDashboard: FormGroup;
  Citas:any;
  Ventas: any;
  ingresos: number = 0;
  egresos: number = 0;
  diferencia: number = 0;
  myChart: any;
  myChart2: any;
  myChart3: any;
  myChart4: any;
  myChart5: any;
  myArray: [] = [];

        // paginacion
        public page: number = 1;
        count: number = 0;
        tableSize: number = 7;
        tableSizes: any = [3, 6, 9, 12];
        dt:any;

  constructor(public formulario:FormBuilder,private crudServiceVend:CrudServiceVend,private crudServiceVen:CrudServiceVen) {
    this.formularioDashboard=this.formulario.group({      
      fechainicial:[''],
      fechafinal:[''],
    });
   }

  ngOnInit(): void { 

    const hoy = new Date();
    const iniciodemes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    console.log(iniciodemes);

    this.formularioDashboard.controls['fechainicial'].setValue(formatDate(iniciodemes,'yyyy-MM-dd','en'));
    this.formularioDashboard.controls['fechafinal'].setValue(formatDate(hoy,'yyyy-MM-dd','en'));


    this.enviarDatos();
  
    this.myChart = new Chart("Grafico2", {
      type: 'doughnut',
      data: {
          labels: ['Ingresos', 'Egresos', 'Ganancia'],
          datasets: [{              
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
           locale: 'en-US',
            scales: {
                y: {
                    beginAtZero: true
                },
            
            },
            plugins: {
              datalabels: {
                formatter: function(value, context) {
                  //return context.dataIndex + 'Q. ' + (value).replace(/^(-?\d+)(\d{3})/, '$1,$2');
                  var valor = Number(value).toFixed(2);
                  valor = valor.toString();
                  valor = valor.replace(/^(-?\d+)(\d{3})/, '$1,$2');
                  return 'Q.'+valor;
                },
                color: '#FE777B',
                display: true,
                align: 'bottom',                
                borderRadius: 3,
                font: {
                  size: 14,
                }
              },
            }
        }
    });


    this.myChart2 = new Chart("Grafico1", {
      type: 'bar',
      data: {
          /*labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'viernes', 'Sabado','Domingo'],*/
          datasets: [{
              label: 'Ventas por dia',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    this.myChart3 = new Chart("Grafico3", {
      type: 'pie',
      data: {          
          datasets: [{
              label: 'Ventas por Clasificacion',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });    

    this.myChart4 = new Chart("Grafico4", {
      type: 'doughnut',
      data: {          
          datasets: [{
              label: 'Ventas por Marca',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });       

    this.myChart5 = new Chart("Grafico5", {
      type: 'line',
      data: {          
          datasets: [{
              label: 'Ventas por Cliente',
              data: [],
      datalabels: {
        align: 'end',
        anchor: 'end'
      },
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 3
          }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });        

  }

    //metodos para la paginacion
    fetchVentas(): void {
      this.crudServiceVen.ObtenerCitas(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe(respuesta=>{console.log(respuesta); this.Citas=respuesta;});
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

  //metodo para descargar las ventas
  DescargarAExcel():void {
    //let elemento = document.getElementById("tablita");
    //const ws: XLSX.WorkSheet =  XLSX.utils.table_to_sheet(elemento);
    const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(this.Citas);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'citas.xlsx');
   }  

  enviarDatos()
  {
    this.crudServiceVen.ObtenerCitas(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe(respuesta=>{     
      //this.myChart.data.datasets[0].data = [this.ingresos,this.egresos,this.diferencia];
      //this.myChart.update();
      console.log(respuesta.success);      
      if (respuesta.success=='0')
      {
        this.Citas=[];
      }
      else
      {
        this.Citas=respuesta;
      }
    });


      this.crudServiceVend.ObtenerVentasdIntervalo(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe((respuesta):any=>{     
      console.log(respuesta);   
      if (respuesta.success=='0')
      {
        this.myChart.clear();
      }
      else{
        //console.log(respuesta[0].total);
        this.ingresos = respuesta[0].total;
        this.egresos = respuesta[1].total;
        this.diferencia = this.ingresos-this.egresos;
        //console.log(this.ingresos);
        //console.log(this.egresos);
        //console.log(this.diferencia);
        this.myChart.data.datasets[0].data = [this.ingresos,this.egresos,this.diferencia];
        this.myChart.update();
      }
    });
    
    this.crudServiceVend.ObtenerVentasdPorDia(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe((respuesta:any)=>{     
      //console.log(respuesta);      
      //console.log(respuesta[0].total);   
         //console.log(this.myArray);
      if (respuesta.success=='0')
        {
        this.myChart2.clear();
        }
      else
        {
          var etiquetas = respuesta.map(function(e:any)
          {
            return e.dia;
          })

          var data = respuesta.map(function(e:any)
          {
            return e.total;
          })
          console.log(data);
          this.myChart2.data.datasets[0].data = data;
          this.myChart2.data.labels = etiquetas;
          this.myChart2.update();
          }
    });


    this.crudServiceVend.ObtenerVentasdPorClasi(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe(respuesta=>{     
      //console.log(respuesta);   
      if (respuesta.success=='0')
        {
        this.myChart3.clear();
        }
      else
        {   
          var etiquetas = respuesta.map(function(e:any)
          {
            return e.clasi;
          })

          var data = respuesta.map(function(e:any)
          {
            return e.total;
          })
          console.log(data);
          this.myChart3.data.datasets[0].data = data;
          this.myChart3.data.labels = etiquetas;
          this.myChart3.update();
        }
    });

    this.crudServiceVend.ObtenerVentasdPorMarca(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe(respuesta=>{     
      //console.log(respuesta);    
      
      if (respuesta.success=='0')
        {
        this.myChart4.clear();
        }
      else
        {  
          var etiquetas = respuesta.map(function(e:any)
          {
            return e.marca;
          })

          var data = respuesta.map(function(e:any)
          {
            return e.total;
          })
          console.log(data);
          this.myChart4.data.datasets[0].data = data;
          this.myChart4.data.labels = etiquetas;
          this.myChart4.update();
        }
    });

    this.crudServiceVend.ObtenerVentasdPorCliente(this.formularioDashboard.controls['fechainicial'].value,this.formularioDashboard.controls['fechafinal'].value).subscribe(respuesta=>{     
      //console.log(respuesta);      
      if (respuesta.success=='0')
      {
        this.myChart5.clear();
      }
    else
      {
          var etiquetas = respuesta.map(function(e:any)
          {
            return e.cliente;
          })

          var data = respuesta.map(function(e:any)
          {
            return e.total;
          })
          console.log(data);
          this.myChart5.data.datasets[0].data = data;
          this.myChart5.data.labels = etiquetas;
          this.myChart5.update();
        }
    });


  }


}