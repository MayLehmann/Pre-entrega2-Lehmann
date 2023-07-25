
let productos = [
  { nombre: "Tire Table Standard", precio: 18500 },
  { nombre: "Tire Table PRO", precio: 21500 },
  { nombre: "Tire Table PRO XTR", precio: 24500 },
  { nombre: "Tire Table PRO ALUM", precio: 26500 }
];



let carrito = [];

function mostrarProductos() {
  let cards = document.getElementsByClassName('card');

  Array.from(cards).forEach((card, index) => {
    let producto = productos[index];

    let productText = card.querySelector('.product-text');
    if (productText) {
      let nombreElement = productText.querySelector('h4');
      let precioElement = productText.querySelector('p span');

      if (nombreElement && precioElement) {
        nombreElement.textContent = producto.nombre;
        precioElement.textContent = `$${producto.precio}`;
      }
    }
  });
}

function ordenarPorPrecio() {
  productos.sort((a, b) => a.precio - b.precio);
}

function simularCompra() {
  ordenarPorPrecio();
  mostrarProductos();

  let botonesComprar = document.querySelectorAll('.product-price-btn button');

  botonesComprar.forEach((boton, index) => {
    boton.addEventListener('click', function() {
      let productoSeleccionado = productos[index];

      Swal.fire({
        title: `Ingresá la cantidad deseada de ${productoSeleccionado.nombre}:`,
        input: 'number',
        inputAttributes: {
          min: 1,
          step: 1
        },
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (cantidad) => {
          cantidad = parseInt(cantidad);
          if (cantidad > 0) {
            let total = productoSeleccionado.precio * cantidad;
            return { cantidad, total };
          } else {
            throw new Error('La cantidad ingresada es inválida. Por favor, ingresá una cantidad válida.');
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let { cantidad, total } = result.value;
          Swal.fire(`Compraste ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}.`);

          let compra = {
            producto: productoSeleccionado.nombre,
            cantidad: cantidad,
            total: total
          };

          carrito.push(compra);
          actualizarCarrito();


          localStorage.setItem('carrito', JSON.stringify(carrito));
        }
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      });
    });
  });
}

function actualizarCarrito() {
  let cartCount = document.getElementById('cartCount');
  cartCount.textContent = carrito.length;
}

let carritoGuardado = localStorage.getItem('carrito');

if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
  actualizarCarrito();
}

function restablecerContador() {
  carrito = [];
  actualizarCarrito();
  localStorage.removeItem('carrito');
}

restablecerContador();

simularCompra();
