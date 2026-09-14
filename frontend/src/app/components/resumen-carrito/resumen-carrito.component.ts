import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItem } from '../../models/carrito-item';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';
import { TotalCarritoPipe } from '../../pipes/total-carrito.pipe';

@Component({
  imports: [CommonModule, SubtotalPipe, TotalCarritoPipe],
  selector: 'app-resumen-carrito',
  styleUrl: './resumen-carrito.component.css',
  templateUrl: './resumen-carrito.component.html',
})
export class ResumenCarritoComponent implements OnInit {
  private readonly carritoService = inject(CarritoService);

  itemsCarrito = signal<CarritoItem[]>([]);

  ngOnInit(): void {
    this.carritoService.itemsCarrito$.subscribe(items => {
      this.itemsCarrito.set(items);
    });
  }

  actualizarCantidad(id: number, cantidad: number): void {
    if (cantidad < 1) {
      this.eliminarProducto(id);
      return;
    }
    this.carritoService.actualizarCantidad(id, cantidad);
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

}
