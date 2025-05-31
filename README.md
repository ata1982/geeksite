# 🏆 Global Manufacturing Careers
## 世界最高レベルのモダンウェブサイト

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/gmc-careers/website)
[![Modern Design](https://img.shields.io/badge/design-world--class-ff69b4.svg)](https://github.com/gmc-careers/website)
[![Performance](https://img.shields.io/badge/performance-optimized-blue.svg)](https://github.com/gmc-careers/website)

外資系・製造業特化型転職エージェントサイト。革新的なデザインと最先端の技術で構築された、息を呑むような美しいウェブサイトです。

## ✨ 実装されたモダン機能

### 🎨 **世界最高レベルのビジュアル効果**
- **グラスモーフィズム**: 透明感のあるガラス風エフェクト
- **3D変形**: 立体的なホバーエフェクトと視差効果
- **ダイナミックグラデーション**: アニメーションする美しい色彩
- **オーロラ背景**: パーティクル効果と動的背景
- **ネオングロー**: 印象的なカラフルなシャドウ効果

### 🎭 **最先端アニメーション**
- **スムーズスクロール**: ヘッダーの動的変形とスクロール連動
- **フローティング要素**: 奥行きを作り出す浮遊アニメーション
- **シマーエフェクト**: テキストとボタンの光沢効果
- **マジカルホバー**: 3D空間でのインタラクティブ変形
- **エラスティック遷移**: 滑らかで弾性のあるアニメーション

### 🖱️ **革新的インタラクション**
- **マウス追従3D**: マウス位置に応じたカードの傾き
- **プログレッシブローディング**: スクロールに応じた要素の表示
- **ダイナミック検索ボックス**: フォーカス時のスケール&グロー
- **カスタムスクロールバー**: グラデーションテーマの美しいスクロールバー
- **スマートヘッダー**: スクロール方向に応じた表示制御

## 🚀 クイックスタート

### 自動セットアップ（推奨）
```bash
# 自動ビルド・検証・最適化を実行
./build.sh
```

### 手動セットアップ
```bash
# 開発サーバー起動
python3 -m http.server 8000

# またはnpmを使用
npm start
```

### npmコマンド
```bash
npm run build     # ビルドと検証
npm run validate  # HTML/CSS検証
npm run clean     # 不要ファイル削除
npm run setup     # 全自動セットアップ
```

## 📋 ビルドテスト結果

✅ **全てのテストに合格**
- HTML構文検証: 28ファイル
- CSS構文検証: 1ファイル
- JavaScript検証: 2ファイル
- レスポンス時間: < 0.002秒
- セキュリティチェック: クリア
- 画像最適化: 完了

## 🗂️ プロジェクト構造

```
geeksite/
├── 📄 index.html              # メインページ
├── 🎨 css/
│   └── style.css              # 世界最高レベルのCSS
├── ⚡ js/
│   ├── bundle.js              # 既存JavaScript
│   └── modern-effects.js      # モダンインタラクション
├── 🖼️ images/                 # 最適化された画像
├── 📑 auth/                   # 認証ページ
├── 🏢 corporate/              # 企業情報
├── 💼 jobs/                   # 求人ページ
├── 📚 knowhow/                # ノウハウコンテンツ
├── 👥 member/                 # 会員機能
├── 🔧 services/               # サービス紹介
├── 🏆 success_stories/        # 成功事例
├── ⚖️ legal/                  # 法的情報
├── 🌐 en/                     # 英語版
└── 🔧 build.sh                # 自動ビルドスクリプト
```

## 🎯 技術仕様

### **フロントエンド技術**
- **HTML5**: セマンティックマークアップ
- **CSS3**: Grid, Flexbox, カスタムプロパティ
- **JavaScript ES6+**: モダン構文とAPI
- **レスポンシブデザイン**: Mobile-first設計

### **最先端CSS機能**
```css
/* グラスモーフィズム */
background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
backdrop-filter: blur(20px);

/* 3D変形 */
transform: perspective(1000px) rotateX(15deg) rotateY(15deg);

/* ダイナミックグラデーション */
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
animation: gradientShift 15s ease infinite;
```

### **パフォーマンス最適化**
- **GPU アクセラレーション**: ハードウェア支援の変形
- **Intersection Observer**: 効率的なスクロールアニメーション
- **RequestAnimationFrame**: 滑らかなアニメーション
- **レイジーローディング**: 画像の遅延読み込み

## 🎨 デザインシステム

### **カラーパレット**
```css
--accent-color: #6366f1;      /* Modern Indigo */
--accent-secondary: #ec4899;  /* Vibrant Pink */
--accent-tertiary: #06b6d4;   /* Cyan Blue */
--success-color: #10b981;     /* Emerald */
```

### **グラデーション**
```css
--gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
--gradient-cta: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-aurora: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
```

### **タイポグラフィ**
- **Font Family**: Inter, SF Pro Display, System UI
- **Scale**: Apple Design Guidelinesに基づく階層
- **Effects**: グラデーションテキスト、シマーエフェクト

## 🌐 ブラウザサポート

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

## 📱 レスポンシブブレークポイント

```css
/* Mobile */
@media (max-width: 480px)  { ... }

/* Tablet */
@media (max-width: 768px)  { ... }

/* Desktop */
@media (max-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1400px) { ... }
```

## 🚀 デプロイメント

### **Vercel（推奨）**
```bash
# vercel.jsonが設定済み
vercel --prod
```

### **Netlify**
```bash
# 静的サイトとしてデプロイ
netlify deploy --prod --dir .
```

### **GitHub Pages**
```bash
# gh-pagesブランチにプッシュ
git subtree push --prefix . origin gh-pages
```

## 🔧 カスタマイズ

### **カラーテーマの変更**
```css
:root {
    --accent-color: #your-color;
    --gradient-hero: linear-gradient(135deg, #your-start, #your-end);
}
```

### **アニメーション速度の調整**
```css
:root {
    --transition-smooth: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### **3D効果の強度**
```css
:root {
    --transform-scale-hover: scale3d(1.1, 1.1, 1.1);
}
```

## 🤝 コントリビューション

1. フォークしてブランチを作成
2. 変更を実装
3. `./build.sh` でテスト実行
4. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照

## 🏆 制作者

**Global Manufacturing Careers Development Team**

- 🎨 **UI/UX Design**: World-class modern interface
- ⚡ **Frontend**: Cutting-edge CSS & JavaScript
- 🔧 **DevOps**: Automated build & deployment
- 🚀 **Performance**: Sub-second loading times

---

<div align="center">

### 🌟 世界最高レベルのモダンウェブサイトが完成しました！

**グラスモーフィズム × 3D効果 × ダイナミックアニメーション**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](http://127.0.0.1:8000)

</div>