import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';

export const routes: Routes = [
  { 
    path: '',  redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'productos', component: ListadoProductosComponent
  },
  {
    path: 'productos/nuevo', component: FormularioProductoComponent
  },
  {
    path: 'productos/editar/:id', component: FormularioProductoComponent
  },
  {
    path: '**', component: NoEncontradoComponent
  }
];
