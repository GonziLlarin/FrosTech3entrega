function calcularTotal(precio) {

    total = Number(total + precio)

    return total
}


function mostrarCarrito() {
    let carritoDiv = document.querySelector('.carrito');
    carritoDiv.innerHTML = ''; // Limpiar el carrito cada vez que se actualiza

    // Si el carrito está vacío
    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    // Mostrar cada producto en el carrito
    carrito.forEach((producto, index) => {
        carritoDiv.innerHTML += `
        <div class="producto-carrito">
        <p>${producto.tipo} - ${producto.sabor}</p>
        <p>$${producto.precio}</p>
        <button class="eliminar bg-danger text-white" data-index="${index}">Eliminar</button>
        </div>
        `;
    });

    // Mostrar el total
    carritoDiv.innerHTML += `<p class="carrito-total">Total: $${total}</p>`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el producto en el índice dado
    total = carrito.reduce((acc, item) => acc + item.precio, 0); // Recalcular el total
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    mostrarCarrito(); // Actualizar la vista del carrito
}

function vaciarCarrito() {
    carrito = []; // Vaciar el array del carrito
    total = 0; // Reiniciar el total
    localStorage.removeItem('carrito'); // Eliminar el carrito de localStorage
    mostrarCarrito(); // Actualizar la vista del carrito
}