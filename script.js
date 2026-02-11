// ========== BASE DE DATOS DE PRODUCTOS ==========
const products = [
    {
        id: 1,
        name: "Combo De Navidad 1",
        price: 228.00,
        image: "assets/combo1.jpg",
        badge: "NAVIDAD",
        shipping: true,
        description: "Celebra la Navidad con este combo especial que incluye los mejores productos cubanos.",
        longDescription: "Disfruta de una cena navideña inolvidable con nuestro Combo Navideño 1. Incluye pierna de cerdo adobada, arroz congrí, yuca con mojo, ensalada rusa y turrones para el postre. Todo preparado con recetas tradicionales cubanas.",
        details: [
            "Pierna de cerdo adobada (2kg)",
            "Arroz congrí (1kg)",
            "Yuca con mojo (800g)",
            "Ensalada rusa (500g)",
            "Turrones (400g)",
            "Sirve de 4 a 6 personas"
        ],
        category: "navidad"
    },
    {
        id: 2,
        name: "Combo De Navidad 2",
        price: 171.00,
        image: "assets/combo2.jpg",
        badge: "NAVIDAD",
        shipping: true,
        description: "Combo navideño económico pero completo. Ideal para cenas íntimas.",
        longDescription: "Este combo incluye todo lo necesario para una cena navideña tradicional cubana. Lechón asado, arroz blanco, frijoles negros, plátanos maduros y flan casero.",
        details: [
            "Lechón asado (1.5kg)",
            "Arroz blanco (800g)",
            "Frijoles negros (600g)",
            "Plátanos maduros (400g)",
            "Flan casero (300g)",
            "Sirve de 3 a 4 personas"
        ],
        category: "navidad"
    },
    {
        id: 3,
        name: "Combo 16",
        price: 312.00,
        image: "assets/combo3.jpg",
        badge: "FAMILIAR",
        shipping: true,
        description: "El combo más completo para reuniones familiares.",
        longDescription: "Disfruta del Combo 16, nuestra selección especial para celebraciones. Incluye pollo asado, ropa vieja, arroz moro, tostones, yuca frita y postres variados.",
        details: [
            "Pollo asado (2kg)",
            "Ropa vieja (1kg)",
            "Arroz moro (1kg)",
            "Tostones (600g)",
            "Yuca frita (500g)",
            "Postres variados (400g)",
            "Sirve de 6 a 8 personas"
        ],
        category: "familiar"
    },
    {
        id: 4,
        name: "Combo 15",
        price: 240.00,
        image: "assets/combo4.jpg",
        badge: "ESPECIAL",
        shipping: true,
        description: "Combo especial con platos típicos cubanos.",
        longDescription: "El Combo 15 incluye una selección de los platos más populares de la cocina cubana. Vaca frita, arroz congrí, maduros, ensalada y yuca al mojo.",
        details: [
            "Vaca frita (1.2kg)",
            "Arroz congrí (800g)",
            "Maduros (500g)",
            "Ensalada mixta (400g)",
            "Yuca al mojo (500g)",
            "Sirve de 4 a 5 personas"
        ],
        category: "especial"
    },
    {
        id: 5,
        name: "Combo 14",
        price: 144.00,
        image: "assets/combo5.jpg",
        badge: "ECONÓMICO",
        shipping: true,
        description: "Combo económico sin sacrificar sabor.",
        longDescription: "Ideal para una comida rápida pero deliciosa. Incluye picadillo a la criolla, arroz blanco, frijoles, plátanos y casabe.",
        details: [
            "Picadillo a la criolla (800g)",
            "Arroz blanco (600g)",
            "Frijoles colorados (400g)",
            "Plátanos (300g)",
            "Casabe (200g)",
            "Sirve de 2 a 3 personas"
        ],
        category: "individual"
    },
    {
        id: 6,
        name: "Combo 13",
        price: 120.00,
        image: "assets/combo6.jpg",
        badge: "OFERTA",
        shipping: true,
        description: "Oferta especial. Combo individual con pollo.",
        longDescription: "Disfruta de este combo individual que incluye pollo salteado, arroz amarillo, frijoles negros, tostones y postre.",
        details: [
            "Pollo salteado (500g)",
            "Arroz amarillo (400g)",
            "Frijoles negros (300g)",
            "Tostones (200g)",
            "Postre del día (150g)",
            "Sirve 1 persona"
        ],
        category: "oferta"
    },
    {
        id: 7,
        name: "Combo 12",
        price: 120.00,
        image: "assets/combo7.jpg",
        badge: "OFERTA",
        shipping: true,
        description: "Combo de cerdo con guarniciones.",
        longDescription: "Delicioso combo de masas de cerdo fritas acompañadas de arroz moro, yuca frita, mojo y ensalada de aguacate.",
        details: [
            "Masas de cerdo fritas (500g)",
            "Arroz moro (400g)",
            "Yuca frita (300g)",
            "Mojo cubano (100ml)",
            "Ensalada de aguacate (200g)",
            "Sirve 1 persona"
        ],
        category: "oferta"
    }
];

// ========== ESTADO GLOBAL ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProducts = [...products];
let filteredProducts = [...products];

// ========== ELEMENTOS DEL DOM ==========
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categoryFilter = document.getElementById('categoryFilter');
const priceRange = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');
const freeShippingFilter = document.getElementById('freeShippingFilter');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalAmount = document.getElementById('cartTotalAmount');
const productModal = document.getElementById('productModal');
const cartModal = document.getElementById('cartModal');
const notification = document.getElementById('notification');
const categoryTitle = document.getElementById('categoryTitle');
const categoryList = document.querySelectorAll('.category-list li');

// ========== FUNCIONES PRINCIPALES ==========

// Renderizar productos
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                ${product.shipping ? '<div class="product-shipping">🚚 ENVÍO GRATIS</div>' : ''}
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Añadir al carrito
                    </button>
                    <button class="btn-view" onclick="event.stopPropagation(); viewProduct(${product.id})">
                        👁️
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Ver producto con descripción
window.viewProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalContent = document.getElementById('modalProductDetail');
    modalContent.innerHTML = `
        <div class="modal-product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-product-info">
            <h2>${product.name}</h2>
            <div class="modal-product-price">$${product.price.toFixed(2)}</div>
            ${product.shipping ? '<div class="modal-product-shipping">🚚 ENVÍO GRATIS</div>' : ''}
            <div class="modal-product-description">
                ${product.longDescription}
            </div>
            <div class="modal-product-details">
                <h3>Incluye:</h3>
                <ul>
                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id}); closeModal('productModal')" 
                    style="width: 100%; padding: 1rem; font-size: 1.1rem;">
                Añadir al carrito - $${product.price.toFixed(2)}
            </button>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Agregar al carrito
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToLocalStorage();
    showNotification('✅ Producto agregado al carrito');
}

// Eliminar del carrito
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToLocalStorage();
    showNotification('🗑️ Producto eliminado');
}

// Actualizar cantidad
window.updateQuantity = function(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToLocalStorage();
        }
    }
}

// Actualizar UI del carrito
function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Actualizar modal del carrito
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">🛒 Tu carrito está vacío</div>';
            if (cartTotalAmount) cartTotalAmount.textContent = '$0.00';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                        <div style="color: var(--text-gray); font-size: 0.9rem;">Cantidad: ${item.quantity}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span style="font-weight: 600;">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart(${item.id})" style="background: #dc3545; color: white; border: none;">🗑️</button>
                    </div>
                </div>
            `).join('');
            
            // Actualizar total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotalAmount) cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ========== FILTROS Y BÚSQUEDA ==========

// Aplicar todos los filtros
function applyFilters() {
    let result = [...products];
    
    // Filtro por búsqueda
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    if (searchTerm) {
        result = result.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtro por categoría
    const category = categoryFilter ? categoryFilter.value : 'all';
    if (category !== 'all') {
        result = result.filter(p => p.category === category);
        if (categoryTitle) categoryTitle.textContent = `Combos ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    } else {
        if (categoryTitle) categoryTitle.textContent = 'Todos los combos';
    }
    
    // Filtro por precio
    const maxPrice = priceRange ? parseInt(priceRange.value) : 350;
    result = result.filter(p => p.price <= maxPrice);
    
    // Filtro por envío gratis
    const freeShippingOnly = freeShippingFilter ? freeShippingFilter.checked : false;
    if (freeShippingOnly) {
        result = result.filter(p => p.shipping);
    }
    
    // Ordenamiento
    const sortBy = sortSelect ? sortSelect.value : 'default';
    switch(sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            result.sort((a, b) => a.id - b.id);
    }
    
    filteredProducts = result;
    renderProducts(result);
}

// ========== EVENT LISTENERS ==========

// Búsqueda
if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

// Ordenamiento
if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
}

// Filtro por categoría
if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
}

// Filtro por precio
if (priceRange) {
    priceRange.addEventListener('input', function() {
        if (priceDisplay) priceDisplay.textContent = `$${this.value}+`;
    });
    priceRange.addEventListener('change', applyFilters);
}

// Filtro envío gratis
if (freeShippingFilter) {
    freeShippingFilter.addEventListener('change', applyFilters);
}

// Categorías en sidebar
categoryList.forEach(item => {
    item.addEventListener('click', function() {
        categoryList.forEach(li => li.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        if (categoryFilter) {
            categoryFilter.value = category || 'all';
            applyFilters();
        }
    });
});

// ========== MODALES ==========

// Abrir carrito
document.getElementById('cartButton')?.addEventListener('click', () => {
    if (cartModal) {
        updateCartUI();
        cartModal.style.display = 'block';
    }
});

// Cerrar modales
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Cerrar al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// ========== CARRITO ==========

// Vaciar carrito
document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    cart = [];
    updateCartUI();
    saveCartToLocalStorage();
    showNotification('🗑️ Carrito vaciado');
});

// Finalizar compra
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('⚠️ El carrito está vacío');
        return;
    }
    
    let message = 'Hola! Quiero hacer un pedido:%0A%0A';
    
    cart.forEach(item => {
        message += `🛒 *${item.name}*%0A`;
        message += `   Cantidad: ${item.quantity}%0A`;
        message += `   Precio: $${(item.price * item.quantity).toFixed(2)}%0A%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *TOTAL: $${total.toFixed(2)}*%0A%0A`;
    message += `📍 Dirección: (Agregar aquí)%0A`;
    message += `📱 Teléfono: (Agregar aquí)%0A`;
    message += `⏰ Horario: (Agregar aquí)`;
    
    window.open(`https://wa.me/51916019867?text=${encodeURIComponent(message)}`, '_blank');
});

// ========== NOTIFICACIONES ==========

function showNotification(text) {
    if (!notification) return;
    
    notification.textContent = text;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
});
