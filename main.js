const productos = [];
const formulario = document.querySelector("#formulario-producto");
const listaProductos = document.querySelector("#lista-productos");
const mensaje = document.querySelector("#mensaje");
const resumen = document.querySelector("#resumen");
const botonFinalizar = document.querySelector("#boton-finalizar");
const consejo = document.querySelector("#consejo");
const formatoDinero = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

setTimeout(function () {
  consejo.textContent =
    "Consejo: obtienes un 10% de descuento cuando tu subtotal llega a $100.000.";
  consejo.hidden = false;
}, 3000);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const cantidad = Number(document.querySelector("#cantidad").value);
  const precio = Number(document.querySelector("#precio").value);

  if (!nombre || !Number.isInteger(cantidad) || cantidad <= 0 || precio <= 0) {
    mensaje.textContent = "Revisa los datos e ingresa valores válidos.";
    return;
  }

  productos.push({ nombre: nombre, cantidad: cantidad, precio: precio });
  mostrarProductos();
  formulario.reset();
  mensaje.textContent = "Producto agregado al carrito.";
});

function mostrarProductos() {
  listaProductos.replaceChildren();

  for (const producto of productos) {
    const elemento = document.createElement("li");
    const subtotal = producto.cantidad * producto.precio;
    elemento.textContent =
      producto.nombre +
      " — " +
      producto.cantidad +
      " x " +
      formatoDinero.format(producto.precio) +
      " = " +
      formatoDinero.format(subtotal);
    listaProductos.append(elemento);
  }
}

botonFinalizar.addEventListener("click", function () {
  botonFinalizar.disabled = true;

  try {
    if (productos.length === 0) {
      throw new Error("Agrega al menos un producto antes de finalizar.");
    }

    let subtotal = 0;

    for (const producto of productos) {
      subtotal += producto.cantidad * producto.precio;
    }

    const descuento = subtotal >= 100000 ? subtotal * 0.1 : 0;
    const total = subtotal - descuento;

    resumen.textContent =
      "Subtotal: " +
      formatoDinero.format(subtotal) +
      " | Descuento: " +
      formatoDinero.format(descuento) +
      " | Total: " +
      formatoDinero.format(total);
    mensaje.textContent = "Compra finalizada. ¡Gracias!";
  } catch (error) {
    mensaje.textContent = error.message;
  } finally {
    botonFinalizar.disabled = false;
  }
});
