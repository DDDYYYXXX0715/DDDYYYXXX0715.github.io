// 购物车本地存储key
const CART_KEY = 'dreamyd_cart';

// 获取购物车
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

// 保存购物车
function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// 更新头部购物车数量
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-icon').forEach(el => {
        el.textContent = `购物车(${count})`;
    });
}

// 加入购物车
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

// 页面加载后绑定事件
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        // 获取商品信息
        const title = document.getElementById('product-title').textContent.trim();
        const priceStr = document.getElementById('product-price').textContent.replace(/[^\d.]/g, '');
        const price = parseFloat(priceStr);
        const img = document.getElementById('main-product-image').src;
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        const idText = document.getElementById('product-id').textContent;
        // 提取编号
        const idMatch = idText.match(/商品编号:\s*(\S+)/);
        const id = idMatch ? idMatch[1] : title;

        const product = {
            id,
            title,
            price,
            img,
            quantity,
            checked: true
        };
        addToCart(product);
        alert('已加入购物车！');
    });

    // 获取元素
    const mainImage = document.getElementById('main-product-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    const productGallery = document.querySelector('.product-gallery');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');

    // 检查是否是详情页(确保元素存在)
    if (mainImage && thumbnailImages.length > 0) {
        // 创建放大镜元素
        const magnifierGlass = document.createElement('div');
        magnifierGlass.className = 'magnifier-glass';
        productGallery.appendChild(magnifierGlass);

        // 设置放大镜样式
        magnifierGlass.style.width = '150px';
        magnifierGlass.style.height = '150px';
        magnifierGlass.style.position = 'absolute';
        magnifierGlass.style.border = '3px solid #4a90e2'; /* 天蓝色边框 */
        magnifierGlass.style.borderRadius = '50%';
        magnifierGlass.style.cursor = 'none';
        magnifierGlass.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
        magnifierGlass.style.display = 'none';
        magnifierGlass.style.backgroundRepeat = 'no-repeat';
        magnifierGlass.style.zIndex = '1000';

        // 当前显示的图片URL
        let currentImageSrc = mainImage.src;
        let currentDesc = productDescription.textContent;
        let currentTitle = productTitle.textContent;

        // 鼠标进入主图区域
        mainImage.addEventListener('mouseenter', function() {
            magnifierGlass.style.display = 'block';
            updateMagnifierBackground();
        });

        // 鼠标离开主图区域
        mainImage.addEventListener('mouseleave', function() {
            magnifierGlass.style.display = 'none';
        });

        // 鼠标在主图区域移动
        mainImage.addEventListener('mousemove', function(e) {
            // 获取鼠标相对于主图的位置
            const bounds = mainImage.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            // 计算放大镜位置
            const glassWidth = magnifierGlass.offsetWidth;
            const glassHeight = magnifierGlass.offsetHeight;

            // 确保放大镜不会超出图片边界
            let glassX = x - glassWidth / 2;
            let glassY = y - glassHeight / 2;

            if (glassX < 0) glassX = 0;
            if (glassY < 0) glassY = 0;
            if (glassX > bounds.width - glassWidth) glassX = bounds.width - glassWidth;
            if (glassY > bounds.height - glassHeight) glassY = bounds.height - glassHeight;

            // 设置放大镜位置
            magnifierGlass.style.left = glassX + 'px';
            magnifierGlass.style.top = glassY + 'px';

            // 计算背景位置
            const bgX = (x / bounds.width) * 100;
            const bgY = (y / bounds.height) * 100;

            // 更新放大镜背景位置
            magnifierGlass.style.backgroundImage = `url(${currentImageSrc})`;
            magnifierGlass.style.backgroundSize = `${mainImage.offsetWidth * 2}px ${mainImage.offsetHeight * 2}px`;
            magnifierGlass.style.backgroundPosition = `-${x * 2 - glassWidth / 2}px -${y * 2 - glassHeight / 2}px`;
        });

        // 更新放大镜背景
        function updateMagnifierBackground() {
            magnifierGlass.style.backgroundImage = `url(${currentImageSrc})`;
            magnifierGlass.style.backgroundSize = `${mainImage.offsetWidth * 2}px ${mainImage.offsetHeight * 2}px`;
            magnifierGlass.style.backgroundPosition = `-${mainImage.offsetWidth / 2 - magnifierGlass.offsetWidth / 2}px -${mainImage.offsetHeight / 2 - magnifierGlass.offsetHeight / 2}px`;
        }

        // 更新商品描述(带过渡效果)
        function updateDescription(newDesc) {
            productDescription.classList.remove('fade-in');
            void productDescription.offsetWidth; // 触发重绘
            productDescription.textContent = newDesc;
            productDescription.classList.add('fade-in');
        }

        // 切换主图和商品信息
        thumbnailImages.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 移除所有缩略图的active类
                thumbnailImages.forEach(t => t.classList.remove('active'));

                // 添加active类到当前缩略图
                this.classList.add('active');

                // 更新主图
                mainImage.src = this.src;
                currentImageSrc = this.src;

                // 根据图片alt设置标题、描述、价格、编号、规格参数
                let desc = '';
                let title = '';
                let price = '';
                let id = '';
                let specs = '';
                switch (this.alt) {
                    case '碎花连衣裙':
                        title = '碎花连衣裙';
                        desc = 'DreamyD夏季新品碎花连衣裙，采用优质雪纺面料，轻盈透气，穿着舒适。精致的碎花图案，展现女性柔美气质。A字裙摆设计，修饰身形，适合各种场合穿着。';
                        price = '¥199.00';
                        id = '商品编号: DD20230601';
                        specs = `
                            <li>颜色: 黄色</li>
                            <li>尺码: S/M/L/XL</li>
                            <li>面料: 95%棉, 5%氨纶</li>
                            <li>季节: 夏季</li>
                            <li>风格: 田园风</li>
                        `;
                        break;
                    case '白色短袖':
                        title = '白色短袖';
                        desc = 'DreamyD纯棉白色短袖T恤，采用100%优质纯棉面料，柔软透气，吸湿排汗。简约设计，百搭款式，适合日常休闲穿着。';
                        price = '¥89.00';
                        id = '商品编号: DD20230602';
                        specs = `
                            <li>颜色: 白色</li>
                            <li>尺码: S/M/L/XL</li>
                            <li>面料: 100%棉</li>
                            <li>季节: 夏季</li>
                            <li>风格: 简约休闲</li>
                        `;
                        break;
                    case '紫色短裤':
                        title = '紫色短裤';
                        desc = 'DreamyD时尚紫色牛仔短裤，采用优质牛仔布料，弹性适中，穿着舒适。修身剪裁，展现腿部线条，适合夏季搭配T恤或衬衫。';
                        price = '¥129.00';
                        id = '商品编号: DD20230603';
                        specs = `
                            <li>颜色: 紫色</li>
                            <li>尺码: S/M/L/XL</li>
                            <li>面料: 牛仔布</li>
                            <li>季节: 夏季</li>
                            <li>风格: 时尚百搭</li>
                        `;
                        break;
                    case '黑色手提包':
                        title = '黑色手提包';
                        desc = 'DreamyD克瑟系列手提包，采用优质PU皮革，手感柔软，耐磨耐用。大容量设计，内部设有多个隔层，方便分类存放物品。时尚简约设计，适合各种场合搭配。';
                        price = '¥259.00';
                        id = '商品编号: DD20230604';
                        specs = `
                            <li>颜色: 黑色</li>
                            <li>尺寸: 32cm x 25cm x 12cm</li>
                            <li>材质: PU皮革</li>
                            <li>容量: 可放A4杂志/平板</li>
                            <li>风格: 简约通勤</li>
                        `;
                        break;
                    default:
                        title = this.alt;
                        desc = this.getAttribute('data-desc') || '';
                        price = '¥199.00';
                        id = '商品编号: DD20230601';
                        specs = `
                            <li>颜色: 浅蓝色</li>
                            <li>尺码: S/M/L/XL</li>
                            <li>面料: 95%棉, 5%氨纶</li>
                            <li>季节: 夏季</li>
                            <li>风格: 田园风</li>
                        `;
                }

                // 更新商品标题
                productTitle.textContent = title;
                // 更新商品描述(带过渡效果)
                updateDescription(desc);
                // 更新价格
                document.getElementById('product-price').textContent = price;
                // 更新商品编号
                document.getElementById('product-id').textContent = id;
                // 更新规格参数
                document.querySelector('.product-specs ul').innerHTML = specs;

                // 更新放大镜背景
                updateMagnifierBackground();
            });
        });
    } else {
        console.log('放大镜元素未找到，可能不是商品详情页或元素ID不匹配');
    }
});
