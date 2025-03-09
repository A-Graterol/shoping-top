// Función para cargar el carrito desde localStorage
function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = loadCart();
        cartCount.textContent = cart.length;
    }
}

// Función para renderizar los productos en el carrito
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        const cart = loadCart();
        cartItemsContainer.innerHTML = '';
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
        });
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

// Función para agregar un producto al carrito
function addToCart(product) {
    const cart = loadCart();
    cart.push(product);
    saveCart(cart);
    updateCartCount();
    renderCartItems();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    renderCartItems();

    // Agregar productos al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('.product-image').src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            addToCart(product);
        });
    });

    // Botón para vaciar el carrito
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Botón para ir al carrito
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            window.location.href = 'pages/cart.html';
        });
    }

    // Mostrar/ocultar el carrito desplegable
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', function (event) {
            event.stopPropagation();
            cartDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function () {
            cartDropdown.classList.remove('show');
        });

        cartDropdown.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

    // Filtro de categorías
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Buscador de productos
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchInput.value.toLowerCase();
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        searchInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Modo oscuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (themeToggle) {
        const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
        if (savedDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('dark-mode', isDarkMode);
            themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
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