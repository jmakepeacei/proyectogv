import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './components/clientes/clientes.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { SatComponent } from './components/sat/sat.component';
import { SatdComponent } from './components/satd/satd.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasdComponent } from './components/ventasd/ventasd.component';
import { ClientesmodalComponent } from './components/clientesmodal/clientesmodal.component';
import { RventasComponent } from './components/rventas/rventas.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'home'} ,
  {path: 'clientes', component:ClientesComponent},
  {path: 'clientes/:id', component:ClientesComponent},
  {path: 'ingresos', component:IngresosComponent},
  {path: 'ingresos/:id', component:IngresosComponent},
  {path: 'sat', component:SatComponent},
  {path: 'satd/:id', component:SatdComponent},  
  {path: 'ventas', component:VentasComponent},
  {path: 'ventasd/:id', component:VentasdComponent},
  {path: 'clientesmodal', component:ClientesmodalComponent},
  {path: 'rventas', component:RventasComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
