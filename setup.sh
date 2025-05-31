#!/bin/bash

echo "🚀 GeekSite 自動セットアップスクリプト"
echo "=================================="

# 色設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# エラーハンドリング
set -e

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. 環境チェック
print_status "環境をチェック中..."

# Git チェック
if command -v git &> /dev/null; then
    print_success "Git がインストールされています"
else
    print_error "Git がインストールされていません"
    exit 1
fi

# Node.js チェック
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js がインストールされています ($NODE_VERSION)"
else
    print_warning "Node.js がインストールされていません（GitHub Actionsで使用されます）"
fi

# 2. プロジェクト構造チェック
print_status "プロジェクト構造をチェック中..."

REQUIRED_FILES=("index.html" "css/style.css" "vercel.json")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file が存在します"
    else
        print_error "$file が見つかりません"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    print_error "必要なファイルが不足しています: ${MISSING_FILES[*]}"
    exit 1
fi

# 3. HTMLファイルの基本チェック
print_status "HTMLファイルをチェック中..."

HTML_FILES=$(find . -name "*.html" -not -path "./node_modules/*")
HTML_COUNT=$(echo "$HTML_FILES" | wc -l)

print_success "HTMLファイル数: $HTML_COUNT"

for file in $HTML_FILES; do
    if grep -q "<!DOCTYPE\|<html" "$file"; then
        print_success "$file - 基本構文OK"
    else
        print_warning "$file - DOCTYPE または html タグが見つかりません"
    fi
done

# 4. CSS/JSファイルチェック
print_status "静的リソースをチェック中..."

if [ -f "css/style.css" ]; then
    CSS_SIZE=$(stat -f%z "css/style.css" 2>/dev/null || stat -c%s "css/style.css" 2>/dev/null)
    print_success "メインCSS: $CSS_SIZE bytes"
else
    print_error "メインCSSファイルが見つかりません"
fi

if [ -f "js/bundle.js" ]; then
    JS_SIZE=$(stat -f%z "js/bundle.js" 2>/dev/null || stat -c%s "js/bundle.js" 2>/dev/null)
    print_success "メインJS: $JS_SIZE bytes"
else
    print_warning "メインJSファイルが見つかりません（オプション）"
fi

# 5. Git リポジトリチェック
print_status "Gitリポジトリをチェック中..."

if [ -d ".git" ]; then
    print_success "Gitリポジトリが初期化されています"
    
    # リモートURLチェック
    if git remote get-url origin &> /dev/null; then
        REMOTE_URL=$(git remote get-url origin)
        print_success "リモートリポジトリ: $REMOTE_URL"
    else
        print_warning "リモートリポジトリが設定されていません"
        print_status "GitHub リポジトリを作成してリモートを追加してください:"
        echo "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    fi
else
    print_error "Gitリポジトリではありません"
    print_status "Gitリポジトリを初期化してください: git init"
    exit 1
fi

# 6. GitHub Actions チェック
print_status "GitHub Actions設定をチェック中..."

if [ -f ".github/workflows/deploy.yml" ]; then
    print_success "GitHub Actions設定ファイルが存在します"
else
    print_error "GitHub Actions設定ファイルが見つかりません"
    exit 1
fi

# 7. Vercel設定チェック
print_status "Vercel設定をチェック中..."

if [ -f "vercel.json" ]; then
    print_success "vercel.json が存在します"
    
    # vercel.json の基本構文チェック
    if command -v node &> /dev/null; then
        if node -pe "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))" &> /dev/null; then
            print_success "vercel.json の構文は正しいです"
        else
            print_error "vercel.json の構文エラーがあります"
        fi
    fi
else
    print_error "vercel.json が見つかりません"
    exit 1
fi

# 8. ローカルサーバーテスト
print_status "ローカルサーバーでテスト中..."

if command -v python3 &> /dev/null; then
    # バックグラウンドでサーバー起動
    python3 -m http.server 8000 &> /dev/null &
    SERVER_PID=$!
    
    # サーバー起動を待つ
    sleep 3
    
    # localhost テスト
    if curl -s http://localhost:8000 > /dev/null; then
        print_success "ローカルサーバーが正常に動作しています"
        print_status "ブラウザで確認: http://localhost:8000"
    else
        print_warning "ローカルサーバーの動作確認に失敗しました"
    fi
    
    # サーバー停止
    kill $SERVER_PID 2>/dev/null || true
    
else
    print_warning "Python3が見つかりません。ローカルサーバーテストをスキップします"
fi

# 9. 最終チェック結果
echo ""
echo "=================================="
print_success "🎉 セットアップチェック完了！"
echo "=================================="

print_status "次のステップ:"
echo "1. GitHub に secrets を設定:"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_PROJECT_ID" 
echo "   - VERCEL_ORG_ID"
echo ""
echo "2. 変更をコミット・プッシュ:"
echo "   git add ."
echo "   git commit -m \"feat: セットアップ完了\""
echo "   git push origin main"
echo ""
echo "3. GitHub Actions でビルド・デプロイを確認"
echo ""
print_success "🚀 準備完了！プッシュして自動デプロイを開始できます！"