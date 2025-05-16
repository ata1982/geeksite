/**
 * Global Manufacturing Careers
 * main.js - 共通スクリプト
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
});

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