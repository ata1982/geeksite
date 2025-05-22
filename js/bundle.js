/**
 * Global Manufacturing Careers
 * bundle.js - 統合されたJavaScriptファイル
 */

/**
 * ==================================================
 * 1. イベントリスナー設定
 * ==================================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // モバイルナビゲーション用ハンバーガーメニューの設定
    initMobileNav();
    
    // ドロップダウンメニュー対応
    initDropdownMenus();
    
    // スムーズスクロール
    initSmoothScroll();
    
    // Lazy Loading の初期化（必要に応じて）
    initLazyLoading();
    
    // 求人カードスライダー
    initJobCardsSlider();
});

/**
 * ==================================================
 * 2. モバイルナビゲーション機能
 * ==================================================
 */

/**
 * モバイルナビゲーション初期化
 */
function initMobileNav() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    
    if (!hamburgerBtn) return;
    
    // モバイルナビゲーション要素の作成
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';
    document.body.appendChild(mobileNavOverlay);
    
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // グローバルナビの内容をコピーしてモバイルナビに設定
    const globalNav = document.querySelector('.global-nav');
    if (globalNav) {
        const mobileNavContent = document.createElement('div');
        mobileNavContent.className = 'mobile-nav-content';
        
        // ロゴのコピー
        const logoArea = document.createElement('div');
        logoArea.className = 'mobile-nav-header';
        
        const logo = document.querySelector('.logo').cloneNode(true);
        logoArea.appendChild(logo);
        
        // 閉じるボタン
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.setAttribute('aria-label', '閉じる');
        closeBtn.innerHTML = '<span></span><span></span>';
        logoArea.appendChild(closeBtn);
        
        mobileNavContent.appendChild(logoArea);
        
        // ナビゲーションリンクのコピー
        const navContent = globalNav.cloneNode(true);
        navContent.classList.add('mobile-global-nav');
        mobileNavContent.appendChild(navContent);
        
        // 言語切り替えとログインボタン
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const mobileActions = document.createElement('div');
            mobileActions.className = 'mobile-actions';
            mobileActions.appendChild(headerRight.cloneNode(true));
            mobileNavContent.appendChild(mobileActions);
        }
        
        mobileNav.appendChild(mobileNavContent);
        document.body.appendChild(mobileNav);
        
        // イベントリスナー
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        closeBtn.addEventListener('click', toggleMobileMenu);
        mobileNavOverlay.addEventListener('click', toggleMobileMenu);
    }
}

/**
 * モバイルメニューの表示/非表示を切り替え
 */
function toggleMobileMenu() {
    document.body.classList.toggle('menu-open');
}

/**
 * ドロップダウンメニューの初期化（モバイル用）
 */
function initDropdownMenus() {
    // PCでは :hover で表示制御するのでJSは主にモバイル向け
    const dropdowns = document.querySelectorAll('.mobile-nav .has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (link && dropdownMenu) {
            // スマホ向けにタップイベント追加（PCではhoverで制御）
            link.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    this.parentNode.classList.toggle('active');
                }
            });
        }
    });
}

/**
 * ==================================================
 * 3. スクロール関連機能
 * ==================================================
 */

/**
 * スムーズスクロール設定
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // '#'のみのリンクは処理しない
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // モバイルナビゲーションを開いていたら閉じる
                if (document.body.classList.contains('menu-open')) {
                    toggleMobileMenu();
                }
                
                // スクロール
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // ヘッダーの高さ分調整
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ==================================================
 * 4. 画像の遅延読み込み
 * ==================================================
 */

/**
 * 画像の遅延読み込み
 */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // ブラウザネイティブの遅延読み込みをサポートしている場合
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // サポートしていない場合はIntersection Observerを使用
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

/**
 * ==================================================
 * 5. スライダー機能
 * ==================================================
 */

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
}