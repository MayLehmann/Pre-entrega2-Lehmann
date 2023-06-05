let producto1 = { nombre: "Tire Table Standart", precio: 19500 }
let producto2 = { nombre: "Tire Table Pro", precio: 21400 }
let producto3 = { nombre: "Tire Table Pro X-trail", precio: 25500 }
let producto4 = { nombre: "Tire Table Pro Aluminium", precio: 26500 }

function mostrarProductos() {
  console.log("Productos disponibles:")
  console.log(`1. ${producto1.nombre} - $${producto1.precio}`)
  console.log(`2. ${producto2.nombre} - $${producto2.precio}`)
  console.log(`3. ${producto3.nombre} - $${producto3.precio}`)
  console.log(`4. ${producto4.nombre} - $${producto4.precio}`)
}

function simularCompra() {
  mostrarProductos()
  let seleccion = parseInt(prompt("Ingresá el número del producto que deseas comprar:"))

  let productoSeleccionado, cantidad, total

  if (seleccion === 1) {
    productoSeleccionado = producto1
  } else if (seleccion === 2) {
    productoSeleccionado = producto2
  } else if (seleccion === 3) {
    productoSeleccionado = producto3
  } else if (seleccion === 4) {
    productoSeleccionado = producto4
  } else {
    console.log("Selección inválida. Por favor, intentá nuevamente.")
    alert ('La selección es inválida')
    return
  }

  cantidad = parseInt(prompt(`Ingresá la cantidad deseada de ${productoSeleccionado.nombre}:`))

  if (cantidad > 0) {
    total = productoSeleccionado.precio * cantidad
    console.log(`Compraste ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}.`)
    alert(`Compraste ${cantidad} ${productoSeleccionado.nombre}(s) por un total de $${total}.`)
    
  } 
  else {
    console.log("La cantidad ingresada es inválida. Por favor, intentá nuevamente.")
    alert("La cantidad ingresada es inválida. Por favor, intentá nuevamente.")
  }
}

simularCompra();