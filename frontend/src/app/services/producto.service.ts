import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductoData, ProductoResponse, ProductosResponse } from "../models/producto.model";

@Injectable({
    providedIn: 'root',
})
export class ProductoService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `http://localhost:3095/api/productos`;

    getProductos(): Observable<ProductosResponse> {
        return this.http.get<ProductosResponse>(`${this.apiUrl}`)
    }

    getProducto(id:number): Observable<ProductoResponse> {
        return this.http.get<ProductoResponse>(`${this.apiUrl}/${id}`)
    }

    postProducto(producto: ProductoData): Observable<ProductoResponse> {
        return this.http.post<ProductoResponse>(`${this.apiUrl}`, producto)
    }

    putProducto(id: number, producto: ProductoData): Observable<ProductoResponse> {
        return this.http.put<ProductoResponse>(`${this.apiUrl}/${id}`, producto)
    }

    deleteProducto(id: number): Observable<{ message: string}> {
        return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`)
    }
}