import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTING } from './app.routers';

import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { VentasComponent } from './components/ventas/ventas.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { EgresosComponent } from './components/egresos/egresos.component';
import { SatComponent } from './components/sat/sat.component';
import { ClientesComponent } from './components/clientes/clientes.component';

//informacion recolectada se procesa
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule}  from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraficobarrasComponent } from './components/graficobarras/graficobarras.component';
import { GraficopieComponent } from './components/graficopie/graficopie.component';
import { VentasdComponent } from './components/ventasd/ventasd.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientesmodalComponent } from './components/clientesmodal/clientesmodal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RventasComponent } from './components/rventas/rventas.component';
import { SatdComponent } from './components/satd/satd.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    MenuComponent,

    HomeComponent,
    AboutComponent,
    DashboardComponent,

    VentasComponent,
    IngresosComponent,
    EgresosComponent,
    SatComponent,
    ClientesComponent,
    GraficobarrasComponent,
    GraficopieComponent,
    VentasdComponent,
    ClientesmodalComponent,
    RventasComponent,
    SatdComponent,
  ],

  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    APP_ROUTING, 
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
