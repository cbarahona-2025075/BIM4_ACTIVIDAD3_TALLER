# Documentación Actividad 3 - Carrito de Ventas con Observables y Pipes en Angular

## 1. Descripción General
Es una aplicación básica que funciona con Angular y Typescript, desarrollada para practicar el funcionamiento de los Observables, Pipes y BehaviorSubject. En la aplicación hay un menú general con una barra de navegación que nos permite ir al listado de productos disponibles que son extraídos de una DB de PostgreSQL llamada `carrito_productos`. Hasta abajo nos aparece un apartado que dice "Productos añadidos al carrito", ya que en nuestro listado nos salen nombre, precio y stock de cada producto y acciones que podemos realizar como agregar al carrito, editar producto o eliminar. En el apartado del carrito podemos aumentar la cantidad de productos que queremos o eliminarlos del carrito, y tenemos una vista Agregar Producto donde podemos llenar un formulario para poder agregar nuevos productos según necesitemos. 

Vistas Disponibles: 
- Inicio
- Productos
- Nuevo Producto
- Página 404 (vista extra en caso de que el usuario intente dirigirse a una ruta no existente)

---

## 2. Modelo de Datos

Se definió una interfaz llamada `Producto` con los siguientes campos:
- `id`
- `nombre`
- `precio`
- `stock`

Esta sirve como modelo de la entidad de nuestra base de datos y nos permite comunicarnos entre backend y frontend para almacenar o listar los productos.

Se definió otra interfaz llamada `CarritoItem` que extiende de `Producto` con el campo:
- `cantidad`

Esta sirve para llevar un control de la cantidad de productos que llevamos en el carrito o la cantidad por cada producto.

Estos modelos se encuentran en la carpeta `src/app/models`.

---

## 3. Flujo de Datos

Se definió un service llamado `ProductoService` y nos sirve para poder hacer peticiones HTTP a nuestro backend con la URL específica de este, así podemos utilizar métodos para realizar peticiones GET, GET ID, POST, PUT y DELETE. Este service nos permite relacionarnos con nuestra DB para almacenar, actualizar, listar o eliminar los productos que necesitemos.

Se definió otro service llamado `CarritoService` y nos sirve para poder trabajar con `BehaviorSubject`, que nos permitirá mantener el último valor emitido (es decir, el último estado del carrito). Gracias a este BehaviorSubject, se le entregará el listado de todos los productos agregados a cualquier componente que se suscriba. También este service cuenta con métodos para agregar al carrito y llevar el conteo de cuántos llevamos, actualizar cantidad (que sirve para llevar una actualización de la cantidad de productos que llevamos), eliminar producto (que sirve por si agregamos a nuestro carrito un producto que no queríamos) y al final un método para vaciar todo nuestro carrito.

---

## 4. Pipes Personalizados
La aplicación cuenta con 2 pipes los cuales son:

- `subtotal.pipe`: Sirve para llevar el conteo del precio según la cantidad que llevemos de un producto; es decir, multiplica precio por cantidad que llevamos. Esto lo realiza por cada producto de manera individual: si agregamos 2 cantidades del mismo producto, multiplica 2 veces el mismo precio.
- `total.pipe`: Sirve para contar el total que tendríamos que pagar; es decir, este se encarga de sumar todos los subtotales que llevemos y así obtiene el valor final de la compra que nosotros vamos a realizar.

---

## 5. Pruebas y Verificación del Funcionamiento
Para comprobar el correcto funcionamiento de nuestro carrito de ventas reactivo, se realizaron las siguientes pruebas en la interfaz comprobando que el estado y los cálculos se actualicen al instante:

- **Agregar productos al carrito:** Se probó seleccionar un producto desde la vista de Productos haciendo clic en el botón de agregar. Se verificó que si el producto no existía en el carrito, se añade con una cantidad inicial de 1, y si el producto ya estaba agregado, no se duplica la fila sino que únicamente aumenta su cantidad en +1.
- **Actualización de cantidades:** Dentro de la vista del resumen del carrito, se probó modificar la cantidad de un producto hacia arriba y hacia abajo. Se confirmó que el `subtotal.pipe` recalcula de forma inmediata el total de ese producto multiplicando su precio por la nueva cantidad.
- **Recálculo reactivo del total:** Al cambiar cantidades o agregar nuevos ítems, se verificó que el `total.pipe` escuche estos cambios y sume todos los subtotales automáticamente, mostrando la cifra exacta del valor final a pagar sin necesidad de recargar la página.
- **Eliminación de productos:** Se probó eliminar un producto específico usando su botón de acción y también reduciendo su cantidad a menos de 1. En ambos casos, el producto se remueve correctamente de la lista y el total general se recalcula al instante.
- **Persistencia del estado entre rutas:** Se probó navegar hacia las distintas vistas (como Inicio o Nuevo Producto) teniendo ítems en el carrito. Al regresar a la vista de Productos, los ítems seleccionados se mantuvieron guardados gracias a que el `BehaviorSubject` conserva el último estado en memoria.

---

## 6. Funcionamiento del Backend

El backend fue desarrollado con Node.js y Express para actuar como una API REST que conecta nuestra aplicación frontend con la base de datos PostgreSQL mediante una variable de conexión `pool`.

Endpoints principales:
- `GET /api/productos`: Consulta la base de datos y retorna la lista completa de productos disponibles ordenados por su ID.
- `GET /api/productos/:id`: Busca y devuelve los detalles de un producto específico utilizando su ID.
- `POST /api/productos`: Recibe los datos enviados desde el formulario del frontend (`nombre`, `precio`, `stock`), valida que no falten campos y registra un nuevo producto en la base de datos.
- `PUT /api/productos/:id`: Permite actualizar la información de un producto ya existente buscando por su ID.
- `DELETE /api/productos/:id`: Elimina un producto de la base de datos según el ID seleccionado.

---

## 7. Instalación de Dependencias y Ejecución del Proyecto

## 1. Instalar dependencias
### Backend
Abre una terminal en la carpeta del backend y ejecuta:

```bash
pnpm install
```

### Frontend
Abre otra terminal en la carpeta del frontend y ejecuta:
```bash
pnpm install
```

---

## 2. Ejecutar el proyecto

Para que la aplicación funcione completamente, necesitas mantener **2 terminales** (o ventanas de PowerShell) abiertas en paralelo:

### Terminal 1: Backend
Navega a la carpeta de tu servidor y ejecuta el comando para levantar la API:

```bash
pnpm dev
```

### Terminal 2: Frontend
Navega a la carpeta de la aplicación en Angular y ejecuta:

```bash
ng serve
```
---
## 3. Acceder a la aplicación
Una vez que ambos servidores estén en ejecución, abre tu navegador e ingresa a la siguiente dirección:
[http://localhost:4200](http://localhost:4200)


