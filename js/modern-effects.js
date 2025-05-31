// 世界最高レベルのモダンウェブサイト - インタラクション処理
document.addEventListener('DOMContentLoaded', function() {
    
    // ヘッダーのスクロール効果
    const header = document.getElementById('site-header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // ヘッダーの隠し表示（スクロール方向に応じて）
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    }
    
    // スムーズなスクロール効果
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateHeader);
    });
    
    // インtersectionObserver でアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // 段階的アニメーション
                const children = entry.target.querySelectorAll('.strength-item, .job-card, .story-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // 監視対象の要素を設定
    const animateElements = document.querySelectorAll('.strengths-section, .featured-jobs-section, .success-stories-section, .knowhow-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // カードの個別アニメーション設定
    const cards = document.querySelectorAll('.strength-item, .job-card, .story-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(10deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // パララックス効果
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section::before, .hero-section::after');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // マウス追従効果
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 3D効果をマウス位置に応じて調整
        const cards3D = document.querySelectorAll('.transform-3d');
        cards3D.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const rotateX = (mouseY - cardCenterY) / 10;
            const rotateY = (mouseX - cardCenterX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
    });
    
    // カードからマウスが離れた時のリセット
    const cards3D = document.querySelectorAll('.transform-3d');
    cards3D.forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // スムーズなページ内リンク
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 検索ボックスの動的効果
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02) translateZ(10px)';
            searchInput.parentElement.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1) translateZ(0px)';
            searchInput.parentElement.style.boxShadow = '';
        });
    }
    
    // ローディングアニメーション（オプション）
    function addLoadingAnimation() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease-in-out';
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                body.style.opacity = '1';
            }, 100);
        });
    }
    
    // ダークモード検出（将来の拡張用）
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // パフォーマンス最適化：リサイズのスロットリング
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // リサイズ時の処理
            updateHeader();
        }, 250);
    });
    
    console.log('🎉 Modern effects initialized - World-class website ready!');
});

// 高度なカーソル効果（オプション）
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.2) 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // ホバー時のカーソル拡大
    const hoverElements = document.querySelectorAll('a, button, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// カスタムカーソルを有効にする場合（デスクトップのみ）
if (window.innerWidth > 768) {
    // initCustomCursor();
}