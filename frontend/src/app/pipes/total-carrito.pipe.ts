import { Pipe, PipeTransform } from '@angular/core';
import { CarritoItem } from '../models/carrito-item';

@Pipe({
  name: 'totalCarrito'
})
export class TotalCarritoPipe implements PipeTransform {
  transform(items: CarritoItem[]): number {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
}