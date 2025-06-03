/**
 * ギークリーチ パフォーマンス監視システム
 * リアルタイム品質分析と自動最適化
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: {},
            userInteraction: {},
            errors: [],
            resources: []
        };
        this.init();
    }

    init() {
        this.measurePageLoad();
        this.trackUserInteractions();
        this.monitorErrors();
        this.analyzeResources();
        this.setupReporting();
    }

    // ページロード時間の計測
    measurePageLoad() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');
                
                this.metrics.pageLoad = {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
                    timestamp: Date.now()
                };

                this.evaluatePerformance();
                console.log('📊 Page Load Metrics:', this.metrics.pageLoad);
            });
        }
    }

    // ユーザーインタラクション追跡
    trackUserInteractions() {
        let interactionCount = 0;
        const interactionStart = Date.now();

        ['click', 'keydown', 'scroll', 'touchstart'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
                this.metrics.userInteraction = {
                    totalInteractions: interactionCount,
                    sessionDuration: Date.now() - interactionStart,
                    engagementRate: interactionCount / ((Date.now() - interactionStart) / 1000 / 60) // interactions per minute
                };
            }, { passive: true });
        });

        // スクロール深度追跡
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
            this.metrics.userInteraction.maxScrollDepth = maxScrollDepth;
        }, { passive: true });
    }

    // エラー監視
    monitorErrors() {
        window.addEventListener('error', (event) => {
            this.metrics.errors.push({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                timestamp: Date.now()
            });
            this.reportError(event);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.metrics.errors.push({
                type: 'promise',
                message: event.reason.toString(),
                timestamp: Date.now()
            });
            this.reportError(event);
        });
    }

    // リソース分析
    analyzeResources() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            
            resources.forEach(resource => {
                this.metrics.resources.push({
                    name: resource.name,
                    type: this.getResourceType(resource.name),
                    size: resource.transferSize || 0,
                    loadTime: resource.responseEnd - resource.startTime,
                    cached: resource.transferSize === 0
                });
            });

            this.optimizeResources();
        });
    }

    getResourceType(url) {
        if (url.includes('.css')) return 'stylesheet';
        if (url.includes('.js')) return 'script';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
        if (url.includes('.woff')) return 'font';
        return 'other';
    }

    // パフォーマンス評価
    evaluatePerformance() {
        const { firstContentfulPaint, totalLoadTime } = this.metrics.pageLoad;
        let score = 100;

        // スコア計算（Google PageSpeed基準）
        if (firstContentfulPaint > 1800) score -= 20;
        else if (firstContentfulPaint > 1200) score -= 10;

        if (totalLoadTime > 3000) score -= 30;
        else if (totalLoadTime > 2000) score -= 15;

        this.metrics.pageLoad.performanceScore = Math.max(0, score);

        // 自動最適化提案
        this.suggestOptimizations();
    }

    // 最適化提案
    suggestOptimizations() {
        const suggestions = [];
        const { performanceScore, firstContentfulPaint, totalLoadTime } = this.metrics.pageLoad;

        if (performanceScore < 80) {
            if (firstContentfulPaint > 1500) {
                suggestions.push('クリティカルCSSの最適化が必要です');
            }
            if (totalLoadTime > 2500) {
                suggestions.push('リソースの遅延読み込みを検討してください');
            }
        }

        // 大きなリソースの検出
        const largeResources = this.metrics.resources.filter(r => r.size > 100000);
        if (largeResources.length > 0) {
            suggestions.push(`${largeResources.length}個の大きなリソースが検出されました`);
        }

        if (suggestions.length > 0) {
            console.log('🔧 最適化提案:', suggestions);
        }
    }

    // エラー報告
    reportError(error) {
        console.error('🚨 Error detected:', error);
        
        // 本番環境では分析サービスに送信
        if (window.location.hostname !== 'localhost') {
            // Analytics service integration would go here
        }
    }

    // レポート生成
    generateReport() {
        return {
            performance: this.metrics.pageLoad,
            userEngagement: this.metrics.userInteraction,
            errors: this.metrics.errors.length,
            resourcesLoaded: this.metrics.resources.length,
            timestamp: Date.now()
        };
    }

    // 定期レポート送信
    setupReporting() {
        // 5分ごとにレポートを生成
        setInterval(() => {
            const report = this.generateReport();
            console.log('📈 Performance Report:', report);
            
            // LocalStorageに保存（開発用）
            const reports = JSON.parse(localStorage.getItem('performanceReports') || '[]');
            reports.push(report);
            
            // 最新10件のみ保持
            if (reports.length > 10) {
                reports.splice(0, reports.length - 10);
            }
            
            localStorage.setItem('performanceReports', JSON.stringify(reports));
        }, 300000); // 5分
    }

    // リソース最適化
    optimizeResources() {
        // 未使用の画像を遅延読み込みに変更
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (this.isInViewport(img)) {
                img.loading = 'eager';
            } else {
                img.loading = 'lazy';
            }
        });

        // Service Workerの登録
        if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
            navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('✅ Service Worker registered'))
                .catch(err => console.error('❌ Service Worker registration failed:', err));
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// A/Bテスト機能
class ABTestManager {
    constructor() {
        this.tests = {
            heroButton: {
                variants: ['無料で登録する', '今すぐ始める', '無料登録はこちら'],
                current: 0
            }
        };
        this.init();
    }

    init() {
        this.assignVariant();
        this.trackConversions();
    }

    assignVariant() {
        const userId = this.getUserId();
        const testIndex = userId % this.tests.heroButton.variants.length;
        this.tests.heroButton.current = testIndex;
        
        // ボタンテキストを変更
        const heroButton = document.querySelector('.cta-button');
        if (heroButton) {
            heroButton.textContent = this.tests.heroButton.variants[testIndex];
        }
    }

    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = Math.floor(Math.random() * 1000000);
            localStorage.setItem('userId', userId.toString());
        }
        return parseInt(userId);
    }

    trackConversions() {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('cta-button')) {
                this.recordConversion('heroButton', this.tests.heroButton.current);
            }
        });
    }

    recordConversion(testName, variantIndex) {
        const conversions = JSON.parse(localStorage.getItem('abTestResults') || '{}');
        if (!conversions[testName]) {
            conversions[testName] = {};
        }
        if (!conversions[testName][variantIndex]) {
            conversions[testName][variantIndex] = 0;
        }
        
        conversions[testName][variantIndex]++;
        localStorage.setItem('abTestResults', JSON.stringify(conversions));
        
        console.log('🎯 Conversion recorded:', testName, variantIndex);
    }
}

// ユーザー体験分析
class UXAnalyzer {
    constructor() {
        this.heatmapData = [];
        this.init();
    }

    init() {
        this.trackClicks();
        this.trackHovers();
        this.trackFormInteractions();
    }

    trackClicks() {
        document.addEventListener('click', (event) => {
            this.heatmapData.push({
                type: 'click',
                x: event.clientX,
                y: event.clientY,
                element: event.target.tagName,
                className: event.target.className,
                timestamp: Date.now()
            });
        });
    }

    trackHovers() {
        let hoverTimeout;
        document.addEventListener('mousemove', (event) => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                this.heatmapData.push({
                    type: 'hover',
                    x: event.clientX,
                    y: event.clientY,
                    timestamp: Date.now()
                });
            }, 1000);
        });
    }

    trackFormInteractions() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    this.recordFormEvent('focus', input.name);
                });
                
                input.addEventListener('blur', () => {
                    this.recordFormEvent('blur', input.name);
                });
            });
        });
    }

    recordFormEvent(type, fieldName) {
        const formEvents = JSON.parse(localStorage.getItem('formEvents') || '[]');
        formEvents.push({
            type,
            field: fieldName,
            timestamp: Date.now()
        });
        
        localStorage.setItem('formEvents', JSON.stringify(formEvents));
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
    window.abTestManager = new ABTestManager();
    window.uxAnalyzer = new UXAnalyzer();
    
    console.log('🚀 ギークリーチ パフォーマンス監視システム起動完了');
});

// グローバル関数として公開
window.getPerformanceReport = () => window.performanceMonitor?.generateReport();
window.getHeatmapData = () => window.uxAnalyzer?.heatmapData;
