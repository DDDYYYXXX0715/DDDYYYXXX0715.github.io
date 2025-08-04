// 购物车数据结构示例：[{id, title, price, img, quantity, checked}]
const CART_KEY = 'dreamyd_cart';

// 获取购物车数据
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

// 保存购物车数据
function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// 渲染购物车列表
function renderCart() {
    const cart = getCart();
    const tbody = document.getElementById('cart-list');
    tbody.innerHTML = '';
    cart.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="item-checkbox" data-idx="${idx}" ${item.checked ? 'checked' : ''}></td>
            <td>
                <img src="${item.img}" alt="${item.title}" style="width:60px;height:60px;">
                <span>${item.title}</span>
            </td>
            <td>¥${item.price.toFixed(2)}</td>
            <td>
                <button class="decrease" data-idx="${idx}">-</button>
                <input type="number" class="quantity-input" data-idx="${idx}" min="1" value="${item.quantity}">
                <button class="increase" data-idx="${idx}">+</button>
            </td>
            <td>¥${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="delete-btn" data-idx="${idx}">删除</button></td>
        `;
        tbody.appendChild(tr);
    });
    updateFooter();
}

// 更新底部统计
function updateFooter() {
    const cart = getCart();
    let total = 0, count = 0;
    cart.forEach(item => {
        if (item.checked) {
            total += item.price * item.quantity;
            count += item.quantity;
        }
    });
    document.getElementById('total-price').textContent = '¥' + total.toFixed(2);
    document.getElementById('selected-count').textContent = count;
    // 全选状态
    const allChecked = cart.length > 0 && cart.every(item => item.checked);
    document.getElementById('select-all').checked = allChecked;
    document.getElementById('select-all-bottom').checked = allChecked;
}

// 事件绑定
document.addEventListener('DOMContentLoaded', function() {
    renderCart();

    // 数量增减
    document.getElementById('cart-list').addEventListener('click', function(e) {
        const idx = e.target.dataset.idx;
        if (e.target.classList.contains('increase')) {
            const cart = getCart();
            cart[idx].quantity++;
            setCart(cart);
            renderCart();
        }
        if (e.target.classList.contains('decrease')) {
            const cart = getCart();
            if (cart[idx].quantity > 1) {
                cart[idx].quantity--;
                setCart(cart);
                renderCart();
            }
        }
        if (e.target.classList.contains('delete-btn')) {
            const cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
        }
    });

    // 数量输入
    document.getElementById('cart-list').addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const idx = e.target.dataset.idx;
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            const cart = getCart();
            cart[idx].quantity = val;
            setCart(cart);
            renderCart();
        }
        if (e.target.classList.contains('item-checkbox')) {
            const idx = e.target.dataset.idx;
            const cart = getCart();
            cart[idx].checked = e.target.checked;
            setCart(cart);
            renderCart();
        }
    });

    // 全选
    document.getElementById('select-all').addEventListener('change', function(e) {
        const checked = e.target.checked;
        const cart = getCart();
        cart.forEach(item => item.checked = checked);
        setCart(cart);
        renderCart();
    });
    document.getElementById('select-all-bottom').addEventListener('change', function(e) {
        const checked = e.target.checked;
        const cart = getCart();
        cart.forEach(item => item.checked = checked);
        setCart(cart);
        renderCart();
    });

    // 结算
    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cart = getCart();
        const selected = cart.filter(item => item.checked);
        if (selected.length === 0) {
            alert('请先选择要结算的商品');
            return;
        }
        alert('结算成功！共' + selected.length + '种商品，合计¥' + selected.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
        // 清除已结算商品
        const newCart = cart.filter(item => !item.checked);
        setCart(newCart);
        renderCart();
    });
});

// 其它页面加入购物车时应调用如下函数：
// addToCart({id, title, price, img, quantity:1, checked:true})
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
}
