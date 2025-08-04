const CART_KEY = 'dreamyd_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-icon').forEach(el => {
        el.textContent = `购物车(${count})`;
    });
}
function addToCart(product) {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
        cart[idx].quantity += product.quantity;
        cart[idx].checked = true;
    } else {
        cart.push(product);
    }
    setCart(cart);
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.product-card');
            const id = card.dataset.id;
            const title = card.dataset.title;
            const price = parseFloat(card.dataset.price);
            const img = card.dataset.img;
            const product = {
                id,
                title,
                price,
                img,
                quantity: 1,
                checked: true
            };
            addToCart(product);
            alert('已加入购物车！');
        });
    });
});
