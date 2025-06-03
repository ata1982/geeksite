/**
 * ギークリーチ Service Worker
 * 高性能キャッシュ戦略とオフライン対応
 */

const CACHE_NAME = 'geekreach-v1.0.0';
const STATIC_CACHE = 'geekreach-static-v1';
const DYNAMIC_CACHE = 'geekreach-dynamic-v1';

// キャッシュする重要なリソース
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/consultants.html',
  '/company-register.html',
  '/contact.html',
  '/pricing.html',
  '/privacy.html',
  '/terms.html',
  '/blog.html',
  '/css/style.css',
  '/css/critical.css',
  '/js/app.js',
  '/images/logo/logo.svg',
  '/images/og-image.jpg',
  '/manifest.json'
];

// Install Event - リソースのプリキャッシュ
self.addEventListener('install', event => {
  console.log('🚀 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Failed to cache static assets:', error);
      })
  );
});

// Activate Event - 古いキャッシュの削除
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE
            )
            .map(cacheName => {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch Event - ネットワーク戦略
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 同一オリジンのリクエストのみ処理
  if (url.origin !== location.origin) return;
  
  // API呼び出しは Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // 静的アセットは Cache First
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // HTMLページは Stale While Revalidate
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // その他は Network First
  event.respondWith(networkFirst(request));
});

// Cache First 戦略 - 静的アセット用
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return caches.match('/404.html');
  }
}

// Network First 戦略 - API・動的コンテンツ用
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Network First failed:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // オフライン用フォールバック
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/404.html');
    }
    
    throw error;
  }
}

// Stale While Revalidate 戦略 - HTMLページ用
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// 静的アセット判定
function isStaticAsset(pathname) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2'];
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// バックグラウンド同期（将来の機能拡張用）
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  console.log('🔄 Performing background sync...');
  // ここで必要なバックグラウンド処理を実装
}

// Push通知（将来の機能拡張用）
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/images/logo/logo-small.svg',
      badge: '/images/logo/logo-small.svg',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: '開く'
        },
        {
          action: 'close',
          title: '閉じる'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification('ギークリーチ', options)
    );
  }
});

// 通知クリック処理
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('🎯 ギークリーチ Service Worker loaded successfully');
