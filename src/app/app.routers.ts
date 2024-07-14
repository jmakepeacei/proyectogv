import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

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

const APP_ROUTES: Routes=[
  { path: 'home', component:HomeComponent },
  { path: 'about', component:AboutComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'egresos', component:EgresosComponent },
  { path: 'ingresos', component:IngresosComponent },
  { path: 'ventas', component:VentasComponent },
  { path: 'sat', component:SatComponent },
  { path: 'clientes', component:ClientesComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'about' },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: 'egresos' },
  { path: '**', pathMatch: 'full', redirectTo: 'ingresos' },
  { path: '**', pathMatch: 'full', redirectTo: 'ventas' },
  { path: '**', pathMatch: 'full', redirectTo: 'sat' },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' },
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
