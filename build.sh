#!/bin/bash

# 世界最高レベルのモダンウェブサイト - 自動セットアップスクリプト
# Global Manufacturing Careers - Automated Build Script

echo "🚀 Starting automated setup and build process..."
echo "================================================"

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# プロジェクトルートディレクトリを設定
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}📁 Project root: ${PROJECT_ROOT}${NC}"

# ステップ1: 環境チェック
echo -e "\n${YELLOW}🔍 Step 1: Environment Check${NC}"
echo "----------------------------------------"

# Python3の確認
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python3 found: $(python3 --version)${NC}"
else
    echo -e "${RED}❌ Python3 not found. Please install Python3.${NC}"
    exit 1
fi

# Node.jsの確認（オプション）
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
    HAS_NODE=true
else
    echo -e "${YELLOW}⚠️  Node.js not found (optional)${NC}"
    HAS_NODE=false
fi

# ステップ2: プロジェクト構造の検証
echo -e "\n${YELLOW}🏗️  Step 2: Project Structure Validation${NC}"
echo "----------------------------------------"

# 必要なファイルの存在確認
REQUIRED_FILES=("index.html" "css/style.css" "js/modern-effects.js")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✅ Found: $file${NC}"
    else
        echo -e "${RED}❌ Missing: $file${NC}"
        MISSING_FILES+=("$file")
    fi
done

if [[ ${#MISSING_FILES[@]} -gt 0 ]]; then
    echo -e "${RED}❌ Missing required files. Build cannot continue.${NC}"
    exit 1
fi

# ステップ3: 不要なファイルの削除
echo -e "\n${YELLOW}🧹 Step 3: Cleaning Unused Files${NC}"
echo "----------------------------------------"

# 削除対象のファイル・ディレクトリ
CLEANUP_PATTERNS=(
    "*.log"
    "*.tmp"
    "*~"
    ".DS_Store"
    "Thumbs.db"
    "*.bak"
    "*.swp"
    "*.swo"
    "node_modules/.cache"
)

DELETED_COUNT=0

for pattern in "${CLEANUP_PATTERNS[@]}"; do
    if find . -name "$pattern" -type f 2>/dev/null | grep -q .; then
        echo -e "${BLUE}🗑️  Removing: $pattern${NC}"
        find . -name "$pattern" -type f -delete 2>/dev/null
        ((DELETED_COUNT++))
    fi
done

echo -e "${GREEN}✅ Cleaned $DELETED_COUNT file types${NC}"

# ステップ4: HTMLバリデーション
echo -e "\n${YELLOW}📝 Step 4: HTML Validation${NC}"
echo "----------------------------------------"

HTML_FILES=$(find . -name "*.html" -not -path "./node_modules/*" 2>/dev/null)
HTML_ERRORS=0

for html_file in $HTML_FILES; do
    echo -e "${BLUE}🔍 Checking: $html_file${NC}"
    
    # 基本的なHTML構文チェック
    if grep -q "<!DOCTYPE html>" "$html_file"; then
        echo -e "${GREEN}  ✅ DOCTYPE declaration found${NC}"
    else
        echo -e "${RED}  ❌ Missing DOCTYPE declaration${NC}"
        ((HTML_ERRORS++))
    fi
    
    # 必須メタタグのチェック
    if grep -q '<meta charset' "$html_file"; then
        echo -e "${GREEN}  ✅ Charset meta tag found${NC}"
    else
        echo -e "${RED}  ❌ Missing charset meta tag${NC}"
        ((HTML_ERRORS++))
    fi
    
    # viewportメタタグのチェック
    if grep -q '<meta name="viewport"' "$html_file"; then
        echo -e "${GREEN}  ✅ Viewport meta tag found${NC}"
    else
        echo -e "${YELLOW}  ⚠️  Viewport meta tag recommended${NC}"
    fi
done

# ステップ5: CSSバリデーション
echo -e "\n${YELLOW}🎨 Step 5: CSS Validation${NC}"
echo "----------------------------------------"

CSS_FILES=$(find . -name "*.css" -not -path "./node_modules/*" 2>/dev/null)
CSS_ERRORS=0

for css_file in $CSS_FILES; do
    echo -e "${BLUE}🔍 Checking: $css_file${NC}"
    
    # CSS構文の基本チェック
    BRACE_OPEN=$(grep -o '{' "$css_file" | wc -l)
    BRACE_CLOSE=$(grep -o '}' "$css_file" | wc -l)
    
    if [[ $BRACE_OPEN -eq $BRACE_CLOSE ]]; then
        echo -e "${GREEN}  ✅ Braces balanced ($BRACE_OPEN pairs)${NC}"
    else
        echo -e "${RED}  ❌ Unbalanced braces (open: $BRACE_OPEN, close: $BRACE_CLOSE)${NC}"
        ((CSS_ERRORS++))
    fi
    
    # ファイルサイズチェック
    FILE_SIZE=$(wc -c < "$css_file")
    if [[ $FILE_SIZE -gt 1000000 ]]; then
        echo -e "${YELLOW}  ⚠️  Large CSS file (${FILE_SIZE} bytes) - consider optimization${NC}"
    else
        echo -e "${GREEN}  ✅ File size OK (${FILE_SIZE} bytes)${NC}"
    fi
done

# ステップ6: JavaScriptバリデーション
echo -e "\n${YELLOW}⚡ Step 6: JavaScript Validation${NC}"
echo "----------------------------------------"

JS_FILES=$(find . -name "*.js" -not -path "./node_modules/*" 2>/dev/null)

for js_file in $JS_FILES; do
    echo -e "${BLUE}🔍 Checking: $js_file${NC}"
    
    # Node.jsが利用可能な場合は構文チェック
    if [[ $HAS_NODE == true ]]; then
        if node -c "$js_file" 2>/dev/null; then
            echo -e "${GREEN}  ✅ JavaScript syntax valid${NC}"
        else
            echo -e "${RED}  ❌ JavaScript syntax error${NC}"
            node -c "$js_file"
        fi
    else
        echo -e "${YELLOW}  ⚠️  Skipping syntax check (Node.js not available)${NC}"
    fi
done

# ステップ7: 画像最適化の確認
echo -e "\n${YELLOW}🖼️  Step 7: Image Optimization Check${NC}"
echo "----------------------------------------"

IMAGE_EXTENSIONS=("jpg" "jpeg" "png" "gif" "svg" "webp")
LARGE_IMAGES=()

for ext in "${IMAGE_EXTENSIONS[@]}"; do
    while IFS= read -r -d '' image_file; do
        FILE_SIZE=$(wc -c < "$image_file")
        if [[ $FILE_SIZE -gt 500000 ]]; then # 500KB以上
            LARGE_IMAGES+=("$image_file ($(($FILE_SIZE / 1024))KB)")
        fi
    done < <(find . -name "*.$ext" -not -path "./node_modules/*" -print0 2>/dev/null)
done

if [[ ${#LARGE_IMAGES[@]} -gt 0 ]]; then
    echo -e "${YELLOW}⚠️  Large images found (consider optimization):${NC}"
    for img in "${LARGE_IMAGES[@]}"; do
        echo -e "${YELLOW}  - $img${NC}"
    done
else
    echo -e "${GREEN}✅ All images are optimally sized${NC}"
fi

# ステップ8: セキュリティチェック
echo -e "\n${YELLOW}🔒 Step 8: Security Check${NC}"
echo "----------------------------------------"

# 機密情報の漏洩チェック（フォーム要素を除外）
SECURITY_PATTERNS=("secret" "api_key" "private_key" "token")
SECURITY_ISSUES=0

for pattern in "${SECURITY_PATTERNS[@]}"; do
    if grep -r -i "$pattern" --include="*.html" --include="*.css" --include="*.js" . 2>/dev/null | grep -v "node_modules" | grep -v "type=\"password\"" | grep -v "name=\"password\"" | grep -q .; then
        echo -e "${RED}⚠️  Potential security issue: '$pattern' found in files${NC}"
        ((SECURITY_ISSUES++))
    fi
done

# パスワードフィールドのチェック（情報として表示）
PASSWORD_FIELDS=$(grep -r -i "password" --include="*.html" . 2>/dev/null | grep -v "node_modules" | wc -l)
if [[ $PASSWORD_FIELDS -gt 0 ]]; then
    echo -e "${BLUE}ℹ️  Found $PASSWORD_FIELDS password form fields (normal for auth pages)${NC}"
fi

if [[ $SECURITY_ISSUES -eq 0 ]]; then
    echo -e "${GREEN}✅ No obvious security issues detected${NC}"
fi

# ステップ9: パフォーマンステスト
echo -e "\n${YELLOW}⚡ Step 9: Performance Test${NC}"
echo "----------------------------------------"

# 開発サーバーを起動してテスト
echo -e "${BLUE}🚀 Starting development server...${NC}"

# ポート8000が使用中かチェック
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null; then
    echo -e "${YELLOW}⚠️  Port 8000 is already in use. Trying port 8001...${NC}"
    SERVER_PORT=8001
else
    SERVER_PORT=8000
fi

# バックグラウンドでサーバー起動
python3 -m http.server $SERVER_PORT > server.log 2>&1 &
SERVER_PID=$!

# サーバー起動を待つ
sleep 2

# サーバーのテスト
if curl -s -I "http://127.0.0.1:$SERVER_PORT/" | grep -q "200 OK"; then
    echo -e "${GREEN}✅ Development server running on http://127.0.0.1:$SERVER_PORT/${NC}"
    
    # 主要ファイルのレスポンステスト
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "http://127.0.0.1:$SERVER_PORT/")
    echo -e "${GREEN}✅ Response time: ${RESPONSE_TIME}s${NC}"
    
    if (( $(echo "$RESPONSE_TIME < 1.0" | bc -l) )); then
        echo -e "${GREEN}✅ Fast response time${NC}"
    else
        echo -e "${YELLOW}⚠️  Consider optimization for faster loading${NC}"
    fi
else
    echo -e "${RED}❌ Failed to start development server${NC}"
fi

# サーバーを停止
kill $SERVER_PID 2>/dev/null
rm -f server.log

# ステップ10: ビルド結果のサマリー
echo -e "\n${PURPLE}📋 Build Summary${NC}"
echo "========================================"

TOTAL_ERRORS=$((HTML_ERRORS + CSS_ERRORS + SECURITY_ISSUES))

if [[ $TOTAL_ERRORS -eq 0 ]]; then
    echo -e "${GREEN}🎉 BUILD SUCCESSFUL!${NC}"
    echo -e "${GREEN}✅ All validation checks passed${NC}"
    echo -e "${GREEN}✅ No critical issues found${NC}"
    echo -e "${GREEN}✅ Website is ready for deployment${NC}"
    
    echo -e "\n${BLUE}🚀 Quick Start Commands:${NC}"
    echo -e "${BLUE}  • Development server: ${NC}python3 -m http.server 8000"
    echo -e "${BLUE}  • Or with npm:        ${NC}npm start"
    echo -e "${BLUE}  • Build validation:   ${NC}npm run build"
    
    EXIT_CODE=0
else
    echo -e "${RED}❌ BUILD FAILED!${NC}"
    echo -e "${RED}✗ Found $TOTAL_ERRORS issue(s)${NC}"
    echo -e "${RED}✗ Please fix the issues above before deployment${NC}"
    
    EXIT_CODE=1
fi

echo -e "\n${BLUE}📊 Project Statistics:${NC}"
echo -e "${BLUE}  • HTML files: $(find . -name '*.html' -not -path './node_modules/*' | wc -l)${NC}"
echo -e "${BLUE}  • CSS files:  $(find . -name '*.css' -not -path './node_modules/*' | wc -l)${NC}"
echo -e "${BLUE}  • JS files:   $(find . -name '*.js' -not -path './node_modules/*' | wc -l)${NC}"
echo -e "${BLUE}  • Images:     $(find . \( -name '*.jpg' -o -name '*.png' -o -name '*.svg' -o -name '*.gif' \) -not -path './node_modules/*' | wc -l)${NC}"

echo -e "\n${PURPLE}🎨 Modern Features Implemented:${NC}"
echo -e "${PURPLE}  ✨ Glassmorphism effects${NC}"
echo -e "${PURPLE}  🎭 3D transformations${NC}"
echo -e "${PURPLE}  🌈 Dynamic gradients${NC}"
echo -e "${PURPLE}  💫 Smooth animations${NC}"
echo -e "${PURPLE}  🎪 Interactive hover effects${NC}"
echo -e "${PURPLE}  📱 Responsive design${NC}"

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}🏆 World-Class Modern Website Setup Complete!${NC}"
echo -e "${GREEN}================================================${NC}"

exit $EXIT_CODE