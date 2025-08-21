// Archivo: product-page.js (MODIFICADO)

document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // ESTADO Y FUNCIONES BÁSICAS
    // =====================
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
    function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
    function isInCart(productId, color, size) { return cart.some(item => item.cartId === `${productId}-${color}-${size}`); }
    function isInWishlist(productId, color, size) { return wishlist.includes(`${productId}-${color}-${size}`); }
    function getBadgeText(badge) { const b = { sale: 'Oferta', new: 'Nuevo' }; return b[badge] || ''; }
    function generateStars(rating) {
        const full = Math.floor(rating), half = rating % 1 !== 0, empty = 5 - full - (half ? 1 : 0);
        return `${'<i class="bx bxs-star star"></i>'.repeat(full)}${half ? '<i class="bx bxs-star-half star"></i>' : ''}${'<i class="bx bxs-star star empty"></i>'.repeat(empty)}`;
    }
    function showNotification(m, t) { const e = document.createElement('div'); e.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem;background:${t === 'success' ? 'var(--success-color)' : 'var(--error-color)'};color:white;border-radius:8px;z-index:10001;transform:translateX(120%);transition:transform 0.3s ease;`; e.textContent = m; document.body.appendChild(e); setTimeout(()=>e.style.transform='translateX(0)',10); setTimeout(() => {e.style.transform='translateX(120%)'; setTimeout(()=>e.remove(),300)}, 3000); }
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

    // =====================
    // LÓGICA DE LA CABECERA Y SIDEBARS
    // =====================
    const cartCountEl = document.getElementById('cartCount');
    const wishlistCountEl = document.getElementById('wishlistCount');
    const searchInput = document.getElementById('searchInput');

    function updateHeaderCounters() {
        const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
        cartCountEl.textContent = cartCount > 0 ? cartCount : '0';
        cartCountEl.classList.toggle('show', cartCount > 0);

        const wishlistCount = wishlist.length;
        wishlistCountEl.textContent = wishlistCount > 0 ? wishlistCount : '0';
        wishlistCountEl.classList.toggle('show', wishlistCount > 0);
    }

    function toggleCart() { closeWishlist(); document.getElementById('cartSidebar').classList.add('open'); document.getElementById('cartOverlay').classList.add('show'); renderCartItems(); }
    function toggleWishlist() { closeCart(); document.getElementById('wishlistSidebar').classList.add('open'); document.getElementById('wishlistOverlay').classList.add('show'); renderWishlistItems(); }
    function closeCart() { document.getElementById('cartSidebar').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('show'); }
    function closeWishlist() { document.getElementById('wishlistSidebar').classList.remove('open'); document.getElementById('wishlistOverlay').classList.remove('show'); }

    function renderCartItems() {
        const container = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
        
        if (cartTotalEl) cartTotalEl.textContent = `€${total.toFixed(2)}`;
        if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
        if (downloadPdfBtn) downloadPdfBtn.disabled = cart.length === 0;

        if (cart.length === 0) {
            container.innerHTML = `<div class="empty-cart"><p>Tu carrito está vacío</p></div>`; return;
        }
        container.innerHTML = cart.map(item => {
            const product = productsData.find(p => p.id === item.id);
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
    }

    function renderWishlistItems() {
        const container = document.getElementById('wishlistItems');
        const clearBtn = document.getElementById('clearWishlistBtn');
        if (clearBtn) clearBtn.disabled = wishlist.length === 0;

        if (wishlist.length === 0) {
            container.innerHTML = `<div class="empty-wishlist"><p>Tu lista de deseos está vacía.</p></div>`; return;
        }
        container.innerHTML = wishlist.map(wishlistId => {
            const [productId, color, size] = wishlistId.split('-');
            const product = productsData.find(p => p.id === parseInt(productId));
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
        }
        saveCart();
        updateHeaderCounters();
        renderCartItems();
        updateDynamicContent();
    }
    
    function handleWishlistItemAction(e) {
        const button = e.target.closest('[data-action]');
        if (!button) return;
        const action = button.dataset.action;
        const wishlistId = button.closest('.wishlist-item').dataset.wishlistId;
        const [productId, color, size] = wishlistId.split('-');

        if (action === 'remove-wishlist') {
            handleAddToWishlist(parseInt(productId), color, size);
            renderWishlistItems();
        } else if (action === 'add-to-cart-from-wishlist') {
            handleAddToCart(parseInt(productId), color, size);
            renderWishlistItems();
        }
    }

    function clearWishlist() {
        if (wishlist.length > 0 && confirm("¿Estás seguro de que quieres vaciar tu lista de deseos?")) {
            wishlist = [];
            saveWishlist();
            updateHeaderCounters();
            renderWishlistItems();
            updateDynamicContent();
            showNotification("Lista de deseos vaciada", "info");
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
            const storeUrl = window.location.href.split('#')[0].replace('product.html', '');
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
                const product = productsData.find(p => p.id === item.id);
                const imageUrl = typeof product.image === 'object' ? product.image[item.color] : product.image;
                const subtotal = item.price * item.quantity;
                try {
                    const imageBase64 = await getBase64Image(imageUrl);
                    if (imageBase64) { doc.addImage(imageBase64, 'JPEG', 14, y - 8, 12, 12); }
                } catch(imgErr) { console.log("No se pudo cargar una imagen para el PDF"); }
                doc.setFont("helvetica", "normal");
                const productUrl = `${storeUrl}product.html#/product/${item.id}/${item.color}`;
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
            doc.textWithLink('Visita nuestra tienda online', 14, y, { url: storeUrl + 'tienda.html' });
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
    
    // =====================
    // LÓGICA DE LA PÁGINA DE PRODUCTO
    // =====================
    const productDetailContainer = document.getElementById('productDetail');

    function loadProductDetails() {
        const hash = window.location.hash.substring(1);
        const params = hash.split('/');
        if (params[1] !== 'product' || !params[2]) { productDetailContainer.innerHTML = '<h1>Producto no encontrado</h1>'; return; }
        const productId = parseInt(params[2]);
        const selectedColor = params[3];
        const product = productsData.find(p => p.id === productId);
        if (!product) { productDetailContainer.innerHTML = '<h1>Producto no encontrado</h1>'; return; }
        renderProduct(product, selectedColor);
    }

    function renderProduct(p, initialColor) {
        const defaultColor = initialColor || p.colors[0];
        const finishSelectorHtml = `<div class="finish-selector"><label class="selector-label">Acabado:</label><select class="finish-select" data-action="color-select">${p.colors.map(c => `<option value="${c}" ${c === defaultColor ? 'selected' : ''}>${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('')}</select></div>`;
        const sizeSelectorHtml = `<div class="size-selector"><label class="selector-label">Talla:</label><select class="size-select" data-action="size-select">${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>`;
        productDetailContainer.innerHTML = `
            <div class="product-detail-container">
                <div class="product-image-column"><img src="${typeof p.image === 'object' ? p.image[defaultColor] : p.image}" alt="${p.name}" class="main-image"></div>
                <div class="product-details-column">
                    <p class="brand">${p.brand.toUpperCase()}</p><h1>${p.name}</h1>
                    <div class="rating"><div class="stars">${generateStars(p.rating)}</div><span class="rating-text">(${p.rating} de 5)</span></div>
                    <p class="description">${p.description}</p>
                    <div class="options-container">${finishSelectorHtml}${sizeSelectorHtml}</div>
                    <div class="price">...</div>
                    <div class="actions">
                        <button class="add-to-cart-btn" data-action="add-to-cart"><i class="bx bx-cart-add"></i><span>Añadir al Carrito</span></button>
                        <button class="wishlist-btn" data-action="wishlist"><i class="bx bx-heart"></i></button>
                    </div>
                </div>
            </div>`;
        updateDynamicContent();
        productDetailContainer.querySelector('[data-action="color-select"]').addEventListener('change', updateDynamicContent);
        productDetailContainer.querySelector('[data-action="size-select"]').addEventListener('change', updateDynamicContent);
        productDetailContainer.querySelector('[data-action="add-to-cart"]').addEventListener('click', handleAddToCart);
        productDetailContainer.querySelector('[data-action="wishlist"]').addEventListener('click', handleAddToWishlist);
    }
    
    function updateDynamicContent() {
        const productId = parseInt(window.location.hash.split('/')[2]);
        const product = productsData.find(p => p.id === productId);
        const selectedColor = productDetailContainer.querySelector('.finish-select').value;
        const selectedSize = productDetailContainer.querySelector('.size-select').value;
        const price = (product.colorPricing?.[selectedColor]?.price) || product.price;
        productDetailContainer.querySelector('.price').textContent = `€${price.toFixed(2)}`;
        if (typeof product.image === 'object') { productDetailContainer.querySelector('.main-image').src = product.image[selectedColor]; }
        const inCart = isInCart(productId, selectedColor, selectedSize);
        const cartBtn = productDetailContainer.querySelector('.add-to-cart-btn');
        cartBtn.classList.toggle('in-cart', inCart);
        cartBtn.querySelector('span').textContent = inCart ? 'En Carrito' : 'Añadir al Carrito';
        cartBtn.querySelector('i').className = inCart ? 'bx bx-check' : 'bx bx-cart-add';
        const inWishlist = isInWishlist(productId, selectedColor, selectedSize);
        const wishlistBtn = productDetailContainer.querySelector('.wishlist-btn');
        wishlistBtn.classList.toggle('active', inWishlist);
        wishlistBtn.querySelector('i').className = inWishlist ? 'bx bxs-heart' : 'bx bx-heart';
    }

    function handleAddToCart(productId, color, size) {
        if(typeof productId !== 'number') {
            productId = parseInt(window.location.hash.split('/')[2]);
            color = productDetailContainer.querySelector('.finish-select').value;
            size = productDetailContainer.querySelector('.size-select').value;
        }
        const product = productsData.find(p => p.id === productId);
        const cartId = `${productId}-${color}-${size}`;
        let item = cart.find(i => i.cartId === cartId);
        if (item) {
            item.quantity++;
        } else {
            const price = (product.colorPricing?.[color]?.price) || product.price;
            cart.push({ cartId, id: productId, color, size, quantity: 1, price });
        }
        saveCart();
        updateDynamicContent();
        updateHeaderCounters();
        showNotification('Producto añadido al carrito', 'success');
    }

    function handleAddToWishlist(productId, color, size) {
        if(typeof productId !== 'number') {
            productId = parseInt(window.location.hash.split('/')[2]);
            color = productDetailContainer.querySelector('.finish-select').value;
            size = productDetailContainer.querySelector('.size-select').value;
        }
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
        updateDynamicContent();
        updateHeaderCounters();
    }
    
    // =====================
    // INICIAR LA PÁGINA Y EVENT LISTENERS GENERALES
    // =====================
    updateHeaderCounters();
    loadProductDetails();
    
    // === CAMBIO REALIZADO AQUÍ ===
    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query) {
            localStorage.setItem('searchQuery', query);
        }
        // Añadimos el parámetro ?focusSearch=true a la URL de destino
        window.location.href = 'tienda.html?focusSearch=true';
    });
    // === FIN DEL CAMBIO ===

    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    document.getElementById('wishlistToggle').addEventListener('click', toggleWishlist);
    document.getElementById('wishlistClose').addEventListener('click', closeWishlist);
    document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);
    document.getElementById('cartItems').addEventListener('click', handleCartItemAction);
    document.getElementById('wishlistItems').addEventListener('click', handleWishlistItemAction);
    document.getElementById('clearWishlistBtn').addEventListener('click', clearWishlist);
    document.getElementById('downloadPdfBtn').addEventListener('click', handleDownloadPdf);
});