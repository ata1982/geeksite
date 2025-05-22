/**
 * Global Manufacturing Careers
 * slider.js - スライダー機能用スクリプト
 */

document.addEventListener('DOMContentLoaded', function() {
    // 求人カードスライダー
    initJobCardsSlider();
});

/**
 * 求人カードのスライダー初期化
 * レスポンシブ対応 - モバイル時のみスライド機能を有効化
 */
function initJobCardsSlider() {
    // PC表示時はスライダー不要、グリッドで3列表示
    if (window.innerWidth >= 992) {
        return;
    }
    
    const jobsContainer = document.querySelector('.featured-jobs-container');
    
    if (!jobsContainer) return;
    
    // コンテナに'slider'クラスを追加
    jobsContainer.classList.add('slider');
    
    // カード要素に'slide'クラスを追加
    const jobCards = jobsContainer.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.classList.add('slide');
    });
    
    // コントロールボタンを作成
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-control slider-prev';
    prevBtn.innerHTML = '&lt;';
    prevBtn.setAttribute('aria-label', '前の求人へ');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-control slider-next';
    nextBtn.innerHTML = '&gt;';
    nextBtn.setAttribute('aria-label', '次の求人へ');
    
    // スライダーのラッパーに追加
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider-wrapper';
    jobsContainer.parentNode.insertBefore(sliderWrapper, jobsContainer);
    sliderWrapper.appendChild(jobsContainer);
    sliderWrapper.appendChild(prevBtn);
    sliderWrapper.appendChild(nextBtn);
    
    // ページネーションドット
    const pagination = document.createElement('div');
    pagination.className = 'slider-pagination';
    
    for (let i = 0; i < jobCards.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'pagination-dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        pagination.appendChild(dot);
    }
    
    sliderWrapper.appendChild(pagination);
    
    // 初期位置
    let currentIndex = 0;
    
    // スライド操作関数
    function goToSlide(index) {
        if (index < 0) index = jobCards.length - 1;
        if (index >= jobCards.length) index = 0;
        
        jobsContainer.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        
        // アクティブドット更新
        const dots = pagination.querySelectorAll('.pagination-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    // イベントリスナー
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // ドットクリック
    pagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-dot')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            goToSlide(index);
        }
    });
    
    // タッチスワイプ対応
    let touchStartX = 0;
    let touchEndX = 0;
    
    jobsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);
    
    jobsContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, false);
    
    jobsContainer.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (diff > 50) {
            // 左スワイプ
            goToSlide(currentIndex + 1);
        } else if (diff < -50) {
            // 右スワイプ
            goToSlide(currentIndex - 1);
        }
    }, false);
    
    // スタイルの追加
    addSliderStyles();
}

/**
 * スライダー用スタイルをページに追加
 */
function addSliderStyles() {
    const styleElement = document.createElement('style');
    
    const css = `
        .slider-wrapper {
            position: relative;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .slider {
            display: flex;
            transition: transform 0.5s ease;
            width: 100%;
        }
        
        .slide {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
        }
        
        .slider-control {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1rem;
            z-index: 5;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .slider-prev {
            left: 10px;
        }
        
        .slider-next {
            right: 10px;
        }
        
        .slider-pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        .pagination-dot {
            width: 10px;
            height: 10px;
            background-color: #ddd;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .pagination-dot.active {
            background-color: var(--accent-color);
        }
        
        @media (min-width: 576px) {
            .slide {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }
        
        @media (min-width: 768px) and (max-width: 991.98px) {
            .slide {
                flex: 0 0 50%;
                max-width: 50%;
            }
        }
    `;
    
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
}