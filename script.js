let productos = [
  { nombre: "Tire Table Standart", precio: 19500 },
  { nombre: "Tire Table Pro", precio: 21400 },
  { nombre: "Tire Table Pro X-trail", precio: 25500 },
  { nombre: "Tire Table Pro Aluminium", precio: 26500 }
];

function mostrarProductos() {
  console.log("Productos disponibles:")
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
  });
}

function ordenarPorPrecio() {
  productos.sort((a, b) => a.precio - b.precio);
}

function simularCompra() {
  ordenarPorPrecio();

  while (true) {
    mostrarProductos();

    let seleccion = parseInt(prompt("Ingresá el código del producto que deseas comprar:"));
    if (seleccion >= 1 && seleccion <= productos.length) {
      let productoSeleccionado = productos[seleccion - 1];

      let cantidad;
      while (true) {
        cantidad = parseInt(prompt(`Ingresá la cantidad deseada de ${productoSeleccionado.nombre}:`));
        if (cantidad > 0) {
          break;
        } else {
          console.log("La cantidad ingresada es inválida. Por favor, ingresá una cantidad válida.");
          alert("La cantidad ingresada es inválida. Por favor, ingresá una cantidad válida.");
          let opcion = prompt("¿Querés ingresar nuevamente la cantidad deseada? (Sí/No)").toLowerCase();
          if (opcion === "no") {
            return;
          }
        }
      }

      let total = productoSeleccionado.precio * cantidad;
      console.log(`Compraste ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}.`);
      alert(`Compraste ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}.`);
      break;
    } else {
      console.log("Selección inválida. Por favor, intentá nuevamente.");
      alert("La selección es inválida. Por favor, intentá nuevamente.");
      let opcion = prompt("¿Deseas ingresar nuevamente la selección de producto? (Sí/No)").toLowerCase();
      if (opcion === "no") {
        return;
      }
    }
  }
}

simularCompra();

