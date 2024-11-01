// script.js
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupModal('support-modal', 'open-support-modal');
    setupModal('cart-modal', 'open-cart-modal');

    const form = document.querySelector('form');
    form.addEventListener('submit', handleSupportFormSubmit);
});

async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'product');

        productElement.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Ціна: ${product.price} грн</p>
                    <button class="btn btn-primary" onclick="addToCart('${product.title}', ${product.price})">Додати в корзину</button>
                </div>
            </div>
        `;

        productList.appendChild(productElement);
    });
}

function addToCart(title, price) {
    const cartItems = document.getElementById('cart-items');
    const item = document.createElement('div');
    item.classList.add('list-group-item');
    item.textContent = `${title} - ${price} грн`;
    cartItems.appendChild(item);
}

function handleSupportFormSubmit(event) {
    event.preventDefault();
    alert('Ваше повідомлення було відправлено!');
    event.target.reset();
    closeModal('support-modal');
}

function setupModal(modalId, openButtonId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    const openButton = document.getElementById(openButtonId);

    openButton.addEventListener('click', () => {
        modal.show();
    });
}

function closeModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();
}
