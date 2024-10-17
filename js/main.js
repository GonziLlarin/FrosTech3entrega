let total = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar el carrito desde localStorage o iniciar vacío


document.querySelector('.carrito').addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        let index = e.target.getAttribute('data-index');
        eliminarDelCarrito(index);
    }
});


document.querySelector('.pagar').addEventListener('click', () => {
    if (carrito.length === 0) {
        Toastify({
            text: "El carrito está vacío. No puedes pagar.",
            style: {
                background: "#e40c0c",
            },
            duration: 2000
        }).showToast();
        return;
    }

    Toastify({
        text: `¡Gracias por tu compra! Total: $${total}`,
        style: {
            background: "#96c93d",
        },
        duration: 3000
    }).showToast();

    // Vaciar el carrito y actualizar localStorage
    vaciarCarrito();
});

// Cargar el carrito del localStorage al cargar la página
window.onload = function () {
    total = carrito.reduce((acc, item) => acc + item.precio, 0); // Calcular el total desde el carrito
    mostrarCarrito(); // Mostrar el carrito al cargar la página
};

sabores.forEach((sabor) => {
    let clon = document.querySelector('template').content.cloneNode(true);

    clon.querySelector('h5').innerText = `${sabor.tipo}`;
    clon.querySelectorAll('p')[0].innerText = `Helado sabor: ${sabor.sabor}`;
    clon.querySelectorAll('p')[1].innerText = `Precio: $${sabor.precio}`;

    // Asignar la imagen del helado
    if (sabor.img) {
        clon.querySelector('img').setAttribute('src', sabor.img);
        clon.querySelector('img').setAttribute('alt', `Imagen del helado ${sabor.sabor}`);
    }

    // Agregar el evento de "comprar" a cada botón
    clon.querySelector('button').addEventListener('click', () => {
        if (sabor.stock > 0) {
            // Agregar el producto al carrito
            carrito.push({
                tipo: sabor.tipo,
                sabor: sabor.sabor,
                precio: sabor.precio
            });

            // Mostrar mensaje de éxito
            Toastify({
                text: `¡Felicitaciones! Compraste un ${sabor.tipo} de sabor ${sabor.sabor}`,
                style: {
                    background: "#96c93d",
                },
                duration: 2000
            }).showToast();

            // Calcular el total
            calcularTotal(sabor.precio);

            // Actualizar la vista del carrito
            mostrarCarrito();

            // Reducir stock
            sabor.stock--;

            // Guardar el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
        } else {
            // Si no hay stock
            Toastify({
                text: `No se pudo comprar ${sabor.tipo}. No hay stock.`,
                style: {
                    background: "#e40c0c",
                },
                close: true,
                duration: -1
            }).showToast();
        }
    });
    document.querySelector('.aca').appendChild(clon);
});
