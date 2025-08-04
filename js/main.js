// 全局变量和函数
document.addEventListener('DOMContentLoaded', function() {
    // 购物车数量更新
    updateCartCount();
    
    // 导航栏活动状态
    setActiveNavLink();
});

// 更新购物车数量显示
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('dreamyd_cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-icon').forEach(el => {
        el.textContent = `购物车(${count})`;
    });
}

// 设置导航栏活动状态
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop();
    
    // 移除所有活动状态
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 根据当前页面设置活动状态
    if (currentPath === 'index.html' || currentPath === '') {
        document.querySelector('.main-nav a[href="index.html"]').classList.add('active');
    } else if (currentPath === 'login.html') {
        document.querySelector('.main-nav a[href="login.html"]').classList.add('active');
    } else if (currentPath === 'register.html') {
        document.querySelector('.main-nav a[href="register.html"]').classList.add('active');
    }
}