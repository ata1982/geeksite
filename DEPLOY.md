# 🚀 静的HTMLサイト自動デプロイ設定

VSCodeからGitHubにプッシュ → GitHub Actions経由でVercelに自動デプロイする設定です。

## 📋 前提条件
- 静的HTMLサイト
- GitHub リポジトリ
- Vercel アカウント
- VSCode + Git 設定済み

## ⚙️ STEP 1: Vercel API設定

### 1-1. Vercel API Token取得
1. [Vercel Dashboard](https://vercel.com/account/tokens) にアクセス
2. 「Create Token」をクリック
3. Token Name: `GitHub Actions Deploy`
4. Scope: `Full Account`
5. 「Create」→ トークンをコピー

### 1-2. Vercel Project ID取得
1. Vercel Dashboard → 対象プロジェクト
2. Settings → General
3. Project ID をコピー

### 1-3. Vercel Org ID取得
1. Vercel Dashboard → Settings → General
2. Team ID をコピー

## 🔧 STEP 2: GitHub Secrets設定

GitHub リポジトリで以下を設定：
1. Settings → Secrets and variables → Actions
2. 「New repository secret」で以下を追加：
   - `VERCEL_TOKEN` = [STEP 1-1で取得したトークン]
   - `VERCEL_PROJECT_ID` = [STEP 1-2で取得したProject ID]
   - `VERCEL_ORG_ID` = [STEP 1-3で取得したOrg ID]

## 📁 設定ファイル

以下のファイルが自動で作成されています：
- `.github/workflows/deploy.yml` - GitHub Actions設定
- `vercel.json` - Vercel設定

## 🔄 デプロイフロー

### 基本的な開発フロー
```bash
# ファイル編集
# VSCodeでHTML/CSS/JSを編集

# 変更をコミット
git add .
git commit -m "feat: 新機能追加"

# プッシュ（自動デプロイ開始）
git push origin main
```

### Pull Request フロー
```bash
# フィーチャーブランチ作成
git checkout -b feature/new-page

# 開発・コミット
git add .
git commit -m "feat: 新しいページ追加"

# プッシュ
git push origin feature/new-page

# GitHub でPull Request作成
# → プレビューデプロイが自動実行
```

## 📊 デプロイ確認

### GitHub Actions確認
1. GitHub Repository → Actions タブ
2. ワークフロー実行状況を確認

### Vercel確認
1. Vercel Dashboard → Deployments
2. 本番URLで動作確認

## 🛠️ カスタマイズ

### ディレクトリ構造に応じた調整
現在の構造に最適化済み：
- `css/` - スタイルシート
- `js/` - JavaScript
- `auth/`, `jobs/`, `knowhow/` など - 各ページ

### vercel.json の調整
必要に応じて `vercel.json` でルーティングをカスタマイズできます。

## ✅ チェックリスト

### 初回設定
- [ ] Vercel API Token設定済み
- [ ] GitHub Secrets設定済み
- [ ] `.github/workflows/deploy.yml` 確認済み
- [ ] `vercel.json` 確認済み

### 毎回のデプロイ前
- [ ] ローカルでHTML表示確認済み
- [ ] リンク切れなし
- [ ] 画像表示確認済み

### デプロイ後
- [ ] GitHub Actions成功
- [ ] Vercel デプロイ成功
- [ ] 本番URLで動作確認
- [ ] モバイル表示確認

## 🎯 完了！

これで VSCode → git push → 自動デプロイ の完全自動化が完成しました！

プッシュするだけで本番環境が更新されます。