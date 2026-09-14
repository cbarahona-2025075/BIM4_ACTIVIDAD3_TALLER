import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { ResumenCarritoComponent } from '../resumen-carrito/resumen-carrito.component';

@Component({
  imports: [CommonModule, ResumenCarritoComponent],
  selector: 'app-listado-productos',
  styleUrl: './listado-productos.component.css',
  templateUrl: './listado-productos.component.html',
})
export class ListadoProductosComponent implements OnInit {
  private readonly productoService = inject(ProductoService);
  private readonly carritoService = inject(CarritoService);
  private readonly router = inject(Router);

  productos = signal<Producto[]>([]);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (response) => {
        this.productos.set(response.productos);
      },
      error: (err) => console.log('ERROR AL CARGAR PRODUCTOS', err)
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productos/editar', id]);
  }

  eliminarProducto(producto: Producto): void {
    const confirmado = window.confirm(`¿Deseas eliminar "${producto.nombre}"?`);
    if (!confirmado) return;

    this.productoService.deleteProducto(producto.id).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al eliminar producto', err)
    });
  }
}
