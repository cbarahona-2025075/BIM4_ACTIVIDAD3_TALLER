import { Producto } from './producto.model';

export interface CarritoItem extends Producto {
  cantidad: number;
}