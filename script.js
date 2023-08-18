let productos = [
  { nombre: "Tire Table Standard", precio: 18500 },
  { nombre: "Tire Table PRO", precio: 21500 },
  { nombre: "Tire Table PRO XTR", precio: 24500 },
  { nombre: "Tire Table PRO ALUM", precio: 26500 }
];

let carrito = [];

function generarCards() {
  let cardsContainer = document.querySelector('.Card-container');

  productos.forEach((producto) => {
    let card = document.createElement('div');
    card.classList.add('card');

    let productImg = document.createElement('div');
    productImg.classList.add('product-img');
    let img = document.createElement('img');
    img.src = `./multimedia/${producto.nombre.replace(/ /g, '-').toLowerCase()}.jpg`;
    img.alt = producto.nombre;
    img.height = 420;
    img.width = 327;
    productImg.appendChild(img);

    let productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    let productText = document.createElement('div');
    productText.classList.add('product-text');

    let nombreElement = document.createElement('h4');
    nombreElement.textContent = producto.nombre;

    let precioElement = document.createElement('p');
    let precioSpan = document.createElement('span');
    precioSpan.textContent = `$${producto.precio}`;
    precioElement.appendChild(precioSpan);

    let comprarBtn = document.createElement('button');
    comprarBtn.textContent = 'Comprar';

    productText.appendChild(nombreElement);
    productText.appendChild(precioElement);

    productInfo.appendChild(productText);
    productInfo.appendChild(comprarBtn);

    card.appendChild(productImg);
    card.appendChild(productInfo);

    cardsContainer.appendChild(card);
  });
}

function mostrarProductos() {
  let cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {
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

function mostrarCarrito() {
  let cartContainer = document.getElementById('cartContainer');
  cartContainer.innerHTML = '';

  carrito.forEach((compra) => {
    let carritoItem = document.createElement('div');
    carritoItem.classList.add('carrito-item');

    

    cartContainer.appendChild(carritoItem);
  });

  Swal.fire({
    title: 'Carrito de Compras',
    html: cartContainer,
    showCancelButton: true,
    confirmButtonText: 'Finalizar Compra',
    cancelButtonText: 'Seguir Comprando'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      actualizarCarrito();
      localStorage.removeItem('carrito');
      mostrarCarrito();
    }
  });
}

async function obtenerProductosDesdeJSON() {
  try {
    let response = await fetch('ruta/al/archivo.json');
    let data = await response.json();
    productos = data;
    generarCards();
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

function ordenarPorPrecio() {
  productos.sort((a, b) => a.precio - b.precio);
}

function simularCompra() {
  ordenarPorPrecio();
  mostrarProductos();

  let botonesComprar = document.querySelectorAll('.product-text button');

  botonesComprar.forEach((boton, index) => {
    boton.addEventListener('click', function () {
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

obtenerProductosDesdeJSON();
simularCompra();