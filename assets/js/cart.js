document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    window.removeFromCart = function (index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    };

    renderCartItems();
});

//Funcion para vaciar el carrito de compras o eliminar los productos guardados
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const totalItemsElement = document.getElementById('total-items');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        let totalItems = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} - ${item.price}</span>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += parseFloat(item.price.replace('$', ''));
            totalItems += 1;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        totalItemsElement.textContent = totalItems;
    }

    window.removeFromCart = function (index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    };

    clearCartBtn.addEventListener('click', function () {
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    });

    renderCartItems();
});

// Función para renderizar los productos en el carrito
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    if (cartItemsContainer) {
        const cart = loadCart();
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price}</p>
                    <button class="remove-item-btn" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += parseFloat(item.price.replace('$', ''));
        });

        if (totalItemsElement) {
            totalItemsElement.textContent = cart.length;
        }
        if (totalPriceElement) {
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }
}

// Función para eliminar un producto del carrito
window.removeFromCart = function (index) {
    const cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
    renderCartItems();
};

// Función para vaciar el carrito
function clearCart() {
    saveCart([]);
    updateCartCount();
    renderCartItems();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    renderCartItems();

    // Botón para vaciar el carrito
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});