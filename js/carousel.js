
// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.carousel-slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalSlides = slideItems.length;
    
    // 更新轮播图位置
    function updateCarousel() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // 自动播放
    let autoPlayInterval = setInterval(nextSlide, 3000); // 3秒切换一次
    
    // 按钮事件
    nextBtn.addEventListener('click', function() {
        clearInterval(autoPlayInterval); // 清除自动播放
        nextSlide();
        autoPlayInterval = setInterval(nextSlide, 3000); // 重新开始自动播放
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(autoPlayInterval); // 清除自动播放
        prevSlide();
        autoPlayInterval = setInterval(nextSlide, 3000); // 重新开始自动播放
    });
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(autoPlayInterval); // 清除自动播放
            currentIndex = index;
            updateCarousel();
            autoPlayInterval = setInterval(nextSlide, 3000); // 重新开始自动播放
        });
    });
});
