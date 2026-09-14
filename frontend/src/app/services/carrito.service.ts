import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CarritoItem } from "../models/carrito-item";
import { Producto } from "../models/producto.model";


@Injectable({
    providedIn: 'root'
})
export class CarritoService {
    private itemsCarrito = new BehaviorSubject<CarritoItem[]>([]);
    itemsCarrito$: Observable<CarritoItem[]> = this.itemsCarrito.asObservable();

    agregarProducto(producto: Producto): void {
        const actuales = this.itemsCarrito.getValue();
        const existente = actuales.find(item => item.id === producto.id);

        if (existente) {
            const actualizados = actuales.map(item =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            )
            this.itemsCarrito.next(actualizados);
        } else {
            const nuevoItem: CarritoItem = { ...producto, cantidad: 1 };
            this.itemsCarrito.next([...actuales, nuevoItem]);
        }
    }

    actualizarCantidad(id: number, cantidad: number): void {
        const actuales = this.itemsCarrito.getValue();
        const actualizados = actuales.map(item =>
            item.id === id ? { ...item, cantidad } : item
        );

        this.itemsCarrito.next(actualizados);
    }

    eliminarProducto(id: number): void {
        const actuales = this.itemsCarrito.getValue();
        const filtrados = actuales.filter(item => item.id !== id);
        this.itemsCarrito.next(filtrados);
    }

    vaciarCarrito(): void {
        this.itemsCarrito.next([]);
    }
}