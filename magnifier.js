document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const mainImage = document.getElementById('main-product-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    const productGallery = document.querySelector('.product-gallery');
    
    // 检查是否是详情页
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
            magnifierGlass.style.backgroundPosition = `${bgX}% ${bgY}%`;
        });
        
        // 更新放大镜背景
        function updateMagnifierBackground() {
            magnifierGlass.style.backgroundImage = `url(${currentImageSrc})`;
            magnifierGlass.style.backgroundSize = `${mainImage.offsetWidth * 2}px ${mainImage.offsetHeight * 2}px`;
        }
        
        // 切换主图时更新放大镜背景
        thumbnailImages.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 移除所有缩略图的active类
                thumbnailImages.forEach(t => t.classList.remove('active'));
                
                // 添加active类到当前缩略图
                this.classList.add('active');
                
                // 更新主图
                mainImage.src = this.src;
                currentImageSrc = this.src;
                
                // 更新放大镜背景
                updateMagnifierBackground();
            });
        });
    }
});