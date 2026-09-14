export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export interface ProductoData {
  nombre: string;
  precio: number;
  stock: number;
}

export interface ProductoResponse {
  producto: Producto
}

export interface ProductosResponse {
  productos: Producto[];
}