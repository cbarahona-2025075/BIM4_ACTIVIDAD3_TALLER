import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule ,ReactiveFormsModule],
  selector: 'app-formulario-producto',
  styleUrl: './formulario-producto.component.css',
  templateUrl: './formulario-producto.component.html',
})
export class FormularioProductoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productoService = inject(ProductoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly productoForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]]
  });

  editingProductId: number | null = null;
  isLoading = false;
  isSubmiting = false;
  errorMessage = '';
  formMessage = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.editingProductId = Number(idParam);
      this.cargarProductoParaEditar(this.editingProductId);
    }
  }

  cargarProductoParaEditar(id: number): void {
    this.isLoading = true;

    this.productoService.getProducto(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.productoForm.setValue({
            nombre: response.producto.nombre,
            precio: response.producto.precio,
            stock: response.producto.stock
          });
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error, 'No se pudo cargar el producto');
        }
      });
  }

  submit(): void {
    this.formMessage = '';

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto = this.productoForm.getRawValue();
    const request = this.editingProductId === null
      ? this.productoService.postProducto(producto)
      : this.productoService.putProducto(this.editingProductId, producto);

    const successMessage = this.editingProductId === null
      ? 'Producto creado correctamente'
      : 'Producto actualizado correctamente';

    this.isSubmiting = true;
    request.pipe(finalize(() => (this.isSubmiting = false)))
      .subscribe({
        next: () => {
          this.formMessage = successMessage;
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          this.formMessage = this.getErrorMessage(error, 'No se pudo guardar el producto');
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }

  private getErrorMessage(error: any, fallback: string): string {
    if (error.status === 0) {
      return 'No se pudo conectar con el backend';
    }
    return error.error?.message ?? fallback;
  }
}