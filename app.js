// Archivo: app.js (MODIFICADO)

// =====================
// ESTADO GLOBAL DE LA APLICACIÓN
// =====================
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let currentFilters = { search: '', category: 'all', brand: 'all', sort: 'name' };
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// =====================
// FUNCIONES DE ACTUALIZACIÓN DE UI
// =====================

function updateCartUI() {
  const count = cart.reduce((t, i) => t + i.quantity, 0);
  const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  document.getElementById('cartCount').textContent = count > 0 ? count : '0';
  document.getElementById('cartCount').classList.toggle('show', count > 0);
  document.getElementById('cartTotal').textContent = `€${total.toFixed(2)}`;
  document.getElementById('checkoutBtn').disabled = count === 0;
  document.getElementById('downloadPdfBtn').disabled = count === 0;
}

function updateWishlistUI() {
    const count = wishlist.length;
    document.getElementById('wishlistCount').textContent = count > 0 ? count : '0';
    document.getElementById('wishlistCount').classList.toggle('show', count > 0);
    document.getElementById('clearWishlistBtn').disabled = count === 0;
}

function updateWishlistButtonUI(productId, color, size) {
    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!card) return;
    const button = card.querySelector('.wishlist-btn');
    const icon = button.querySelector('i');
    const inWishlist = isInWishlist(productId, color, size);
    button.classList.toggle('active', inWishlist);
    icon.className = inWishlist ? 'bx bxs-heart' : 'bx bx-heart';
}

function updateCartButtonUI(productId, color, size) {
    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!card) return;
    const button = card.querySelector('.add-to-cart-btn');
    const inCart = isInCart(productId, color, size);
    button.classList.toggle('in-cart', inCart);
    button.querySelector('span').textContent = inCart ? 'En Carrito' : 'Añadir';
    button.querySelector('i').className = inCart ? 'bx bx-check' : 'bx bx-cart-add';
}


// =====================
// FUNCIONES DE UTILIDAD
// =====================

function getBadgeText(badge) {
    const badges = { sale: 'Oferta', new: 'Nuevo' };
    return badges[badge] || badge.charAt(0).toUpperCase() + badge.slice(1);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += `<i class='bx bxs-star star'></i>`;
    if (hasHalfStar) starsHTML += `<i class='bx bxs-star-half star'></i>`;
    for (let i = 0; i < emptyStars; i++) starsHTML += `<i class='bx bxs-star star empty'></i>`;
    return starsHTML;
}

function getBase64Image(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg"));
        };
        img.onerror = reject;
        img.src = url;
    });
}

function isInWishlist(productId, color, size) { return wishlist.includes(`${productId}-${color}-${size}`); }
function isInCart(productId, color, size) { return cart.some(item => item.cartId === `${productId}-${color}-${size}`); }
function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
function showNotification(m, t) { const e = document.createElement('div'); e.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem;background:${t === 'success' ? 'var(--success-color)' : 'var(--error-color)'};color:white;border-radius:8px;z-index:1001;transform:translateX(120%);transition:transform 0.3s ease;`; e.textContent = m; document.body.appendChild(e); setTimeout(()=>e.style.transform='translateX(0)',10); setTimeout(() => {e.style.transform='translateX(120%)'; setTimeout(()=>e.remove(),300)}, 3000); }
function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('show'); }
function closeWishlist() { document.getElementById('wishlistSidebar').classList.remove('open'); document.getElementById('wishlistOverlay').classList.remove('show'); }
function toggleCart() { closeWishlist(); document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('show'); renderCartItems(); }
function toggleWishlist() { closeCart(); document.getElementById('wishlistSidebar').classList.add('open'); document.getElementById('wishlistOverlay').classList.add('show'); renderWishlistItems(); }


// =====================
// INICIALIZACIÓN Y EVENT LISTENERS
// =====================

function initApp() {
  
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('focusSearch')) {
      document.getElementById('searchInput').focus();
      history.pushState(null, '', window.location.pathname);
  }
  
  const savedQuery = localStorage.getItem('searchQuery');
  if (savedQuery) {
      document.getElementById('searchInput').value = savedQuery;
      currentFilters.search = savedQuery;
      localStorage.removeItem('searchQuery');
  }

  if (window.location.hash.startsWith('#scrollTo=')) {
      const productId = parseInt(window.location.hash.split('=')[1]);
      setTimeout(() => {
          scrollToProduct(productId);
          history.pushState("", document.title, window.location.pathname + window.location.search);
      }, 100);
  }

  allProducts = [...productsData];
  applyFiltersAndRender();
  updateCartUI();
  updateWishlistUI();
  initEventListeners();
  setupIntersectionObserver();
}

function initEventListeners() {
  document.getElementById('cartToggle').addEventListener('click', toggleCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('wishlistToggle').addEventListener('click', toggleWishlist);
  document.getElementById('wishlistClose').addEventListener('click', closeWishlist);
  document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);
  document.getElementById('productsGrid').addEventListener('click', handleProductInteraction);
  document.getElementById('downloadPdfBtn').addEventListener('click', handleDownloadPdf);
  document.getElementById('clearWishlistBtn').addEventListener('click', clearWishlist);
  
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => { currentFilters.search = e.target.value; applyFiltersAndRender(); handleSearch(e); });
  searchInput.addEventListener('focus', handleSearch);
  document.body.addEventListener('click', (e) => { if (!e.target.closest('.search-container')) { document.getElementById('searchResults').style.display = 'none'; } });

  document.getElementById('categoryFilters').addEventListener('click', (e) => { if(e.target.dataset.category) { currentFilters.category = e.target.dataset.category; applyFiltersAndRender(); } });
  document.getElementById('brandFilters').addEventListener('click', (e) => { if(e.target.dataset.brand) { currentFilters.brand = e.target.dataset.brand; applyFiltersAndRender(); } });
  document.getElementById('sortSelect').addEventListener('change', (e) => { currentFilters.sort = e.target.value; applyFiltersAndRender(); });
}

function setupIntersectionObserver() {
    const loader = document.getElementById('loader');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreProducts();
        }
    }, { threshold: 1.0 });
    if(loader) observer.observe(loader);
}


// =====================
// RENDERIZADO DE COMPONENTES
// =====================

function renderWishlistItems() {
    const container = document.getElementById('wishlistItems');
    if (wishlist.length === 0) {
        container.innerHTML = `<div class="empty-wishlist"><p>Tu lista de deseos está vacía.</p></div>`; return;
    }
    container.innerHTML = wishlist.map(wishlistId => {
        const [productId, color, size] = wishlistId.split('-');
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return '';
        const price = (product.colorPricing?.[color]?.price) || product.price;
        const imageUrl = typeof product.image === 'object' ? product.image[color] : (product.image || 'https://via.placeholder.com/80');
        const inCart = isInCart(parseInt(productId), color, size);
        return `
            <div class="wishlist-item" data-wishlist-id="${wishlistId}">
                <img src="${imageUrl}" alt="${product.name}" class="wishlist-item-image">
                <div class="wishlist-item-info">
                    <h3 class="wishlist-item-title">${product.name}</h3>
                    <div class="wishlist-item-details">Color: ${color}, Talla: ${size}</div>
                    <div class="wishlist-item-price">€${price.toFixed(2)}</div>
                </div>
                <div class="wishlist-item-actions">
                     <button class="add-to-cart-from-wishlist" data-action="add-to-cart-from-wishlist" ${inCart ? 'disabled' : ''}>${inCart ? 'En Carrito' : 'Añadir'}</button>
                     <button class="remove-wishlist-item" data-action="remove-wishlist" title="Eliminar"><i class="bx bx-trash"></i></button>
                </div>
            </div>`;
    }).join('');
    container.removeEventListener('click', handleWishlistItemAction);
    container.addEventListener('click', handleWishlistItemAction);
}

function renderProducts(products, mode = 'overwrite') {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResultsMessage');
  const loader = document.getElementById('loader');

  if (mode === 'overwrite') {
    grid.innerHTML = '';
  }

  if (products.length === 0 && currentPage === 1) {
      noResults.style.display = 'block';
      if(loader) loader.style.display = 'none';
      return;
  }
  noResults.style.display = 'none';
  
  const productsHTML = products.map(p => {
    const defaultColor = p.colors[0];
    const defaultPrice = (p.colorPricing?.[defaultColor]?.price) || p.price;
    const defaultImage = typeof p.image === 'object' ? p.image[defaultColor] : p.image;
    const defaultBadge = (p.colorPricing?.[defaultColor]?.badge) || p.badge;
    let finishSelectorHtml;
    if (p.colors.length >= 9) {
        finishSelectorHtml = `<div class="finish-selector"><select class="finish-select" data-action="color-select">${p.colors.map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('')}</select></div>`;
    } else {
        finishSelectorHtml = `<div class="finish-selector"><div class="color-options">${p.colors.map((c, i) => `<span class="color-option ${c} ${i === 0 ? 'active' : ''}" data-color="${c}" data-action="color-select"></span>`).join('')}</div></div>`;
    }
    const sizeSelectorHtml = `<div class="size-selector"><select class="size-select" data-action="size-select">${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>`;

    return `
    <article class="product-card" data-product-id="${p.id}">
        <div class="product-header">
            <div class="brand-logo"><img src="${p.logo}" alt="${p.brand} logo" onerror="this.parentElement.innerHTML = '${p.brand.charAt(0).toUpperCase()}'"></div>
            <button class="wishlist-btn" data-action="wishlist"><i class="bx bx-heart"></i></button>
        </div>
        <a href="product.html#/product/${p.id}/${defaultColor}" class="product-link" data-action="view-product">
            <div class="product-image-container">
                ${defaultBadge ? `<span class="badge ${defaultBadge}">${getBadgeText(defaultBadge)}</span>` : ''}
                <img src="${defaultImage}" alt="${p.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="rating">
                    <div class="stars">${generateStars(p.rating)}</div>
                    <span class="rating-text">(${p.rating})</span>
                </div>
            </div>
        </a>
        <div class="options-container">
            ${finishSelectorHtml}
            ${sizeSelectorHtml}
        </div>
        <div class="product-footer">
            <div class="price"><span class="current-price">€${defaultPrice.toFixed(2)}</span></div>
            <button class="add-to-cart-btn" data-action="add-to-cart"><i class="bx bx-cart-add"></i><span>Añadir</span></button>
        </div>
    </article>`;
  }).join('');
  
  grid.insertAdjacentHTML('beforeend', productsHTML);
  if(loader) grid.appendChild(loader);
  
  products.forEach(p => {
    const card = document.querySelector(`.product-card[data-product-id="${p.id}"]`);
    if(card){
        const selectEl = card.querySelector('.finish-select');
        const color = selectEl ? selectEl.value : card.querySelector('.color-option.active').dataset.color;
        const size = card.querySelector('.size-select').value;
        updateWishlistButtonUI(p.id, color, size);
        updateCartButtonUI(p.id, color, size);
    }
  });
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><p>Tu carrito está vacío</p></div>`; return;
    }
    container.innerHTML = cart.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        const imageUrl = typeof product.image === 'object' ? product.image[item.color] : (product.image || 'https://via.placeholder.com/60');
        return `
        <div class="cart-item" data-cart-id="${item.cartId}">
            <img src="${imageUrl}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${product.name}</h3>
                <div class="cart-item-details">Color: ${item.color}, Talla: ${item.size}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
            </div>
            <button class="remove-item" data-action="remove" title="Eliminar"><i class="bx bx-trash"></i></button>
        </div>`;
    }).join('');
    container.removeEventListener('click', handleCartItemAction);
    container.addEventListener('click', handleCartItemAction);
}


// =====================
// MANEJADORES DE EVENTOS Y LÓGICA DE NEGOCIO
// =====================

function handleProductInteraction(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const isLink = target.matches('.product-link');
  if (!isLink && target.tagName !== 'SELECT') e.preventDefault();
  const action = target.dataset.action;
  const card = target.closest('.product-card');
  const productId = parseInt(card.dataset.productId);
  
  const selectEl = card.querySelector('.finish-select');
  const selectedColor = selectEl ? selectEl.value : card.querySelector('.color-option.active').dataset.color;
  const selectedSize = card.querySelector('.size-select').value;
  
  switch (action) {
    case 'add-to-cart': addToCart(productId, selectedColor, selectedSize); break;
    case 'wishlist': handleWishlist(productId, selectedColor, selectedSize); break;
    case 'color-select': handleColorSelect(target); break;
    case 'size-select': handleSizeSelect(target); break;
    case 'view-product': console.log(`Navegando a la URL: ${target.href}`); break;
  }
}

function handleWishlistItemAction(e) {
    const button = e.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const wishlistId = button.closest('.wishlist-item').dataset.wishlistId;
    const [productId, color, size] = wishlistId.split('-');
    if (action === 'remove-wishlist') {
        handleWishlist(parseInt(productId), color, size);
        renderWishlistItems();
    } else if (action === 'add-to-cart-from-wishlist') {
        addToCart(parseInt(productId), color, size);
        renderWishlistItems();
    }
}

function handleCartItemAction(e) {
    const button = e.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const cartId = button.closest('.cart-item').dataset.cartId;
    let item = cart.find(i => i.cartId === cartId);
    if (!item) return;
    switch(action) {
        case 'increase': item.quantity++; break;
        case 'decrease': item.quantity--; break;
        case 'remove': item.quantity = 0; break;
    }
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.cartId !== cartId);
        const [productId, color, size] = cartId.split('-');
        updateCartButtonUI(parseInt(productId), color, size);
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

// === NUEVA FUNCIÓN PARA NAVEGAR A LA PÁGINA DEL PRODUCTO ===
function navigateToProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    // Usamos el primer color como predeterminado para la URL
    const defaultColor = product.colors[0];
    window.location.href = `product.html#/product/${productId}/${defaultColor}`;
}

function showSearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (results.length === 0) { searchResults.style.display = 'none'; return; }
    searchResults.style.display = 'block';
    searchResults.innerHTML = results.slice(0, 5).map(p => {
        const imageUrl = typeof p.image === 'object' ? p.image[p.colors[0]] : p.image;
        const price = (p.colorPricing?.[p.colors[0]]?.price) || p.price;
        return `
            <div class="search-result-item" data-product-id="${p.id}" onmousedown="navigateToProduct(${p.id})">
                <img src="${imageUrl}" alt="${p.name}" class="search-result-image">
                <div class="search-result-info">
                    <strong>${p.name}</strong>
                    <small>€${price.toFixed(2)}</small>
                </div>
            </div>`;
    }).join('');
}

function scrollToProduct(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (productCard) {
        productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        gsap.fromTo(productCard, { scale: 1.05, borderColor: "var(--primary-color)" }, { scale: 1, borderColor: "transparent", duration: 1.5, ease: "elastic.out(1, 0.5)" });
    }
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('searchInput').value = '';
    currentFilters.search = '';
    applyFiltersAndRender();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) { showSearchResults([]); return; }
    const results = allProducts.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
    showSearchResults(results);
}

function handleWishlist(productId, color, size) {
    const wishlistId = `${productId}-${color}-${size}`;
    const index = wishlist.indexOf(wishlistId);
    if (index === -1) {
        wishlist.push(wishlistId);
        showNotification('Añadido a favoritos', 'success');
    } else {
        wishlist.splice(index, 1);
        showNotification('Eliminado de favoritos', 'info');
    }
    saveWishlist();
    updateWishlistUI();
    updateWishlistButtonUI(productId, color, size);
}

function handleColorSelect(element) {
  const card = element.closest('.product-card');
  const productId = parseInt(card.dataset.productId);
  const selectedColor = element.tagName === 'SELECT' ? element.value : element.dataset.color;
  if (element.tagName === 'SPAN') {
    card.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
    element.classList.add('active');
  }
  const product = allProducts.find(p => p.id === productId);
  const price = (product.colorPricing?.[selectedColor]?.price) || product.price;
  card.querySelector('.current-price').textContent = `€${price.toFixed(2)}`;
  const image = typeof product.image === 'object' ? product.image[selectedColor] : product.image;
  if (image) card.querySelector('.product-image').src = image;
  card.querySelector('.product-link').href = `product.html#/product/${productId}/${selectedColor}`;
  const imageContainer = card.querySelector('.product-image-container');
  const oldBadge = imageContainer.querySelector('.badge');
  if (oldBadge) oldBadge.remove();
  const newBadge = (product.colorPricing?.[selectedColor]?.badge) || product.badge;
  if (newBadge) {
      const badgeEl = document.createElement('span');
      badgeEl.className = `badge ${newBadge}`;
      badgeEl.textContent = getBadgeText(newBadge);
      imageContainer.prepend(badgeEl);
  }
  const selectedSize = card.querySelector('.size-select').value;
  updateWishlistButtonUI(productId, selectedColor, selectedSize);
  updateCartButtonUI(productId, selectedColor, selectedSize);
}

function handleSizeSelect(element) {
    const card = element.closest('.product-card');
    const productId = parseInt(card.dataset.productId);
    const selectedSize = element.value;
    const selectEl = card.querySelector('.finish-select');
    const selectedColor = selectEl ? selectEl.value : card.querySelector('.color-option.active').dataset.color;
    updateWishlistButtonUI(productId, selectedColor, selectedSize);
    updateCartButtonUI(productId, selectedColor, selectedSize);
}

function addToCart(productId, selectedColor, selectedSize) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    const cartId = `${productId}-${selectedColor}-${selectedSize}`;
    let item = cart.find(i => i.cartId === cartId);
    if (item) {
        item.quantity++;
    } else {
        const price = (product.colorPricing?.[selectedColor]?.price) || product.price;
        cart.push({ cartId, id: productId, color: selectedColor, size: selectedSize, quantity: 1, price });
    }
    saveCart();
    updateCartUI();
    updateCartButtonUI(productId, selectedColor, selectedSize);
    showNotification('Producto añadido al carrito', 'success');
    gsap.fromTo("#cartToggle", {scale: 1.3}, {scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)"});
}

function clearWishlist() {
    if (wishlist.length > 0 && confirm("¿Estás seguro de que quieres vaciar tu lista de deseos?")) {
        const tempWishlist = [...wishlist];
        wishlist = [];
        saveWishlist();
        updateWishlistUI();
        renderWishlistItems();
        tempWishlist.forEach(wishlistId => {
            const [productId, color, size] = wishlistId.split('-');
            updateWishlistButtonUI(parseInt(productId), color, size);
        });
        showNotification("Lista de deseos vaciada", "info");
    }
}

function applyFiltersAndRender() {
    filteredProducts = [...allProducts];
    if (currentFilters.search) {
        const s = currentFilters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    }
    if (currentFilters.category !== 'all') { filteredProducts = filteredProducts.filter(p => p.category === currentFilters.category); }
    if (currentFilters.brand !== 'all') { filteredProducts = filteredProducts.filter(p => p.brand === currentFilters.brand); }
    filteredProducts.sort((a, b) => {
        const priceA = a.price || (a.colorPricing?.[a.colors[0]]?.price);
        const priceB = b.price || (b.colorPricing?.[b.colors[0]]?.price);
        switch(currentFilters.sort) {
            case 'price-low': return priceA - priceB;
            case 'price-high': return priceB - priceA;
            default: return a.name.localeCompare(b.name);
        }
    });
    document.querySelectorAll('#categoryFilters .filter-button, #brandFilters .filter-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`#categoryFilters [data-category="${currentFilters.category}"]`).classList.add('active');
    document.querySelector(`#brandFilters [data-brand="${currentFilters.brand}"]`).classList.add('active');
    
    currentPage = 1;
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    renderProducts(initialProducts, 'overwrite');
    document.getElementById('loader').style.display = filteredProducts.length > productsPerPage ? 'block' : 'none';
}

function loadMoreProducts() {
    currentPage++;
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const nextProducts = filteredProducts.slice(start, end);
    
    if (nextProducts.length > 0) {
        renderProducts(nextProducts, 'append');
    } else {
        document.getElementById('loader').style.display = 'none';
    }
}

async function handleDownloadPdf() {
    const btn = document.getElementById('downloadPdfBtn');
    btn.disabled = true;
    btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Generando...`;
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
        const storeUrl = window.location.href.split('#')[0];
        let y = 20;
        doc.setFontSize(18); doc.text("Resumen de Pedido - ShopModern", 14, y);
        y += 10;
        doc.setFontSize(11); doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, y);
        y += 15;
        doc.setFont("helvetica", "bold");
        doc.text("Producto", 30, y); doc.text("Cant.", 120, y); doc.text("Precio", 140, y); doc.text("Subtotal", 170, y);
        y += 7; doc.line(14, y, 196, y); y += 10;
        for (const item of cart) {
            if (y > 270) { doc.addPage(); y = 20; }
            const product = allProducts.find(p => p.id === item.id);
            const imageUrl = typeof product.image === 'object' ? product.image[item.color] : product.image;
            const subtotal = item.price * item.quantity;
            try {
                const imageBase64 = await getBase64Image(imageUrl);
                if (imageBase64) { doc.addImage(imageBase64, 'JPEG', 14, y - 8, 12, 12); }
            } catch(imgErr) { console.log("No se pudo cargar una imagen para el PDF"); }
            doc.setFont("helvetica", "normal");
            const productUrl = `${storeUrl}#/product/${item.id}/${item.color}`;
            doc.setTextColor(0, 0, 255);
            doc.textWithLink(`${product.name} (Color: ${item.color}, Talla: ${item.size})`, 30, y, { url: productUrl, maxWidth: 85 });
            doc.setTextColor(0, 0, 0);
            doc.text(item.quantity.toString(), 122, y);
            doc.text(`€${item.price.toFixed(2)}`, 142, y);
            doc.text(`€${subtotal.toFixed(2)}`, 172, y);
            y += 20;
        }
        doc.line(14, y, 196, y); y += 10;
        doc.setFont("helvetica", "bold");
        doc.text("Total del Pedido:", 140, y);
        doc.text(`€${total.toFixed(2)}`, 172, y);
        y += 15;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 255);
        doc.textWithLink('Visita nuestra tienda online', 14, y, { url: storeUrl });
        doc.save("pedido-shopmodern.pdf");
        showNotification('PDF generado con éxito', 'success');
    } catch(e) {
        console.error("Error al generar PDF:", e);
        showNotification("Error al generar PDF", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class='bx bxs-file-pdf'></i> Descargar Pedido`;
    }
}

// Opcional: Para simular una gran cantidad de productos
function simulateLargeProductList(targetCount) {
    const baseProducts = [...productsData];
    while (allProducts.length < targetCount) {
        const newProduct = JSON.parse(JSON.stringify(baseProducts[allProducts.length % baseProducts.length]));
        newProduct.id = allProducts.length + 1;
        newProduct.name = `${newProduct.name} #${newProduct.id}`;
        allProducts.push(newProduct);
    }
}

document.addEventListener('DOMContentLoaded', initApp);