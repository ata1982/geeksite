/**
 * AI Robotics Agent Network - Unified JavaScript
 * All functionality in one optimized file
 */

// ===== Global Variables =====
let currentPage = 1;
const agentsPerPage = 10;
let filteredAgents = [];
let currentSort = 'rating';

// ===== 300個の詳細専門分野データ =====
const detailedSpecialties = [
    // 機械学習・AI分野 (75項目)
    "深層学習", "機械学習エンジニア", "MLOps", "AutoML", "強化学習", "転移学習", "フェデレーテッドラーニング", "量子機械学習",
    "ニューラルネットワーク", "CNN", "RNN", "LSTM", "GRU", "Transformer", "BERT", "GPT", "VAE", "GAN", "拡散モデル", "Stable Diffusion",
    "PyTorch", "TensorFlow", "Keras", "JAX", "MXNet", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Hugging Face",
    "Weights & Biases", "MLflow", "Kubeflow", "DVC", "特徴量エンジニアリング", "ハイパーパラメータ最適化", "モデル解釈性", "SHAP",
    "LIME", "Explainable AI", "Responsible AI", "AI倫理", "バイアス検出", "公平性", "Few-shot Learning", "Meta Learning",
    "Neural Architecture Search", "Knowledge Distillation", "Pruning", "Quantization", "Edge AI", "Continual Learning", "Multi-task Learning",
    "Self-supervised Learning", "Contrastive Learning", "Adversarial Training", "Regularization", "Dropout", "Batch Normalization",
    "Attention Mechanism", "Cross-attention", "Self-attention", "Multi-head Attention", "Memory Networks", "Graph Neural Networks",
    "Capsule Networks", "Spiking Neural Networks", "Neuromorphic Computing", "Reservoir Computing", "Echo State Networks", "Liquid State Machines",
    "Evolutionary Algorithms", "Genetic Programming", "Swarm Intelligence", "Particle Swarm Optimization", "Ant Colony Optimization",

    // データサイエンス分野 (25項目)
    "データサイエンティスト", "データアナリスト", "ビジネスアナリスト", "統計解析", "データマイニング", "予測分析", "時系列解析", "A/Bテスト",
    "因果推論", "ベイズ統計", "仮説検定", "回帰分析", "クラスタリング", "異常検知", "レコメンドシステム", "協調フィルタリング",
    "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Plotly", "Jupyter", "Apache Spark", "Hadoop",

    // ロボティクス分野 (35項目)
    "ロボティクスエンジニア", "産業用ロボット", "サービスロボット", "ヒューマノイドロボット", "協働ロボット", "医療ロボット", "手術支援ロボット",
    "介護ロボット", "清掃ロボット", "警備ロボット", "農業ロボット", "建設ロボット", "宇宙ロボット", "海洋ロボット", "ドローン", "無人航空機",
    "UAV", "無人搬送車", "AGV", "AMR", "制御工学", "制御システム", "PID制御", "適応制御", "最適制御", "ロバスト制御", "モデル予測制御",
    "SLAM", "ナビゲーション", "経路計画", "動作計画", "逆運動学", "順運動学", "マニピュレータ", "エンドエフェクタ",

    // 自動運転・モビリティ分野 (30項目)
    "自動運転エンジニア", "ADAS", "レベル1自動運転", "レベル2自動運転", "レベル3自動運転", "レベル4自動運転", "レベル5自動運転",
    "車線維持支援", "自動車線変更", "自動駐車", "交通標識認識", "歩行者検出", "車両検出", "オブジェクト追跡", "Sensor Fusion",
    "車載LiDAR", "車載カメラ", "車載レーダー", "HD Map", "ローカライゼーション", "車両制御", "CAN通信", "AUTOSAR", "ISO 26262",
    "Safety", "SOTIF", "ODD", "MaaS", "コネクテッドカー", "V2X", "V2V", "V2I", "CARLA", "SUMO", "Apollo", "Autoware",

    // コンピュータビジョン分野 (40項目)
    "画像認識エンジニア", "画像分類", "物体検出", "セマンティックセグメンテーション", "インスタンスセグメンテーション", "パノプティックセグメンテーション",
    "顔認識", "顔検出", "表情認識", "姿勢推定", "骨格検出", "手形状認識", "ジェスチャー認識", "動作認識", "行動解析", "群衆解析",
    "トラッキング", "Multiple Object Tracking", "Re-ID", "3D物体検出", "3D姿勢推定", "3D再構成", "Structure from Motion", "Stereo Vision",
    "Depth Estimation", "Point Cloud", "PointNet", "PCL", "医療画像解析", "CT画像解析", "MRI画像解析", "X線画像解析", "病理画像解析",
    "内視鏡画像解析", "OCR", "文字認識", "レシート認識", "文書解析", "AR", "VR",

    // 自然言語処理・言語AI分野 (35項目)
    "NLPエンジニア", "大規模言語モデル", "ChatGPT", "GPT-4", "Claude", "LLaMA", "PaLM", "Gemini", "ファインチューニング", "プロンプトエンジニアリング",
    "In-context Learning", "RAG", "Vector Database", "Embedding", "Word2Vec", "GloVe", "FastText", "RoBERTa", "ELECTRA", "DeBERTa",
    "T5", "BART", "対話システム", "チャットボット", "質問応答", "要約", "翻訳", "機械翻訳", "ニューラル機械翻訳", "感情分析", "テキスト分類",
    "名前付きエンティティ認識", "固有表現抽出", "構文解析", "依存関係解析", "共参照解決",

    // AI・ML基盤技術分野 (25項目)
    "AI/MLプラットフォーム", "MLOpsエンジニア", "CI/CD for ML", "モデル管理", "モデルデプロイ", "モデル監視", "Docker", "Kubernetes", "Helm",
    "Istio", "GPU最適化", "CUDA", "cuDNN", "TensorRT", "ONNX", "OpenVINO", "TensorFlow Lite", "PyTorch Mobile", "エッジコンピューティング",
    "Jetson", "Coral", "Intel NUC", "Raspberry Pi", "分散学習", "並列学習",

    // 業界特化AI分野 (35項目)
    "FinTech", "金融AI", "アルゴリズム取引", "リスク管理", "信用スコアリング", "不正検知", "RegTech", "InsurTech", "医療AI", "創薬AI",
    "ドラッグディスカバリー", "診断支援AI", "ゲノム解析", "バイオインフォマティクス", "デジタル病理", "放射線科AI", "製造業AI", "予知保全",
    "品質管理AI", "生産最適化", "スマートファクトリー", "Industry 4.0", "小売AI", "レコメンドシステム", "需要予測", "価格最適化", "在庫最適化",
    "顧客分析", "マーケティングAI", "広告最適化", "コンテンツ生成", "エンターテイメントAI", "ゲームAI", "スポーツ分析", "農業AI"
];

// ===== エージェント名生成用データ =====
const agentNames = {
    maleNames: [
        "大翔", "蓮", "陽翔", "樹", "湊", "悠人", "陽太", "朝陽", "翔", "結翔",
        "翔太", "陽斗", "悠真", "陸", "新", "陽向", "蒼", "奏太", "碧", "颯",
        "翼", "律", "晴", "海翔", "結人", "颯太", "奏", "陽", "湊斗", "翔大",
        "健太", "翔平", "雅人", "優太", "拓海", "和也", "直樹", "智也", "大輔", "裕太",
        "慎太郎", "章", "浩", "誠", "隆", "修", "明", "博", "正", "清"
    ],
    femaleNames: [
        "陽葵", "凛", "詩", "莉子", "結菜", "杏", "美月", "結愛", "花", "咲良",
        "結衣", "紬", "あかり", "ひなた", "心春", "桜", "美咲", "愛莉", "心陽", "澪",
        "愛", "一花", "柚希", "心美", "美桜", "結月", "葵", "琴音", "美羽", "心結",
        "美穂", "加奈", "麻衣", "由美", "恵", "真由美", "智子", "裕子", "香織", "貴子",
        "明美", "千恵子", "和子", "洋子", "京子", "美佳", "尚子", "由紀", "理恵", "薫"
    ],
    surnames: [
        "佐藤", "鈴木", "高橋", "田中", "伊藤", "渡辺", "山本", "中村", "小林", "加藤",
        "吉田", "山田", "松本", "井上", "木村", "林", "斎藤", "清水", "山口", "阿部",
        "森", "池田", "橋本", "石川", "中島", "前田", "藤田", "小川", "後藤", "岡田",
        "長谷川", "村上", "近藤", "石井", "斉藤", "坂本", "遠藤", "青木", "藤井", "西村",
        "福田", "太田", "三浦", "岡本", "松田", "中川", "中野", "原田", "小野", "田村",
        "竹内", "金子", "和田", "中山", "石田", "上田", "森田", "原", "柴田", "酒井",
        "宮崎", "藤原", "野口", "松井", "谷口", "大野", "松尾", "木下", "安田", "飯田",
        "古川", "横山", "山下", "新井", "武田", "小島", "南", "平野", "浜田", "岡崎"
    ]
};

const companies = ["テックスタートアップA社", "AI研究機関B", "ロボティクス企業C", "自動運転D社", "画像認識E社", "NLP研究所F", 
                   "機械学習G社", "データサイエンスH", "クラウドI社", "半導体J社", "センサーK社", "制御システムL",
                   "産業用ロボットM", "医療AIベンチャーN", "金融テックO社", "エンタープライズP", "コンサルQ社", "研究開発R機関",
                   "先端技術S社", "イノベーションT", "ディープテックU", "次世代技術V", "スマートW社", "デジタルX社",
                   "アルゴリズムY社", "インテリジェントZ", "オートメーションA2", "ビッグデータB2", "クラウドAIC2", "エッジD2"];

const locations = ["東京・リモート対応", "大阪・全国対応", "神奈川・首都圏", "愛知・中部地域", "福岡・九州", 
                   "北海道・全国", "京都・関西", "千葉・東京近郊", "埼玉・首都圏", "兵庫・関西圏",
                   "広島・中国地方", "宮城・東北", "静岡・東海", "茨城・関東", "栃木・北関東"];

// ===== エージェント生成システム =====
function generateAgentsForAllSpecialties() {
    const allAgents = [];
    let agentId = 1;
    
    detailedSpecialties.forEach((specialty, index) => {
        // 各専門分野に3人のエージェントを生成
        for (let i = 0; i < 3; i++) {
            allAgents.push(generateSpecialtyAgent(agentId, specialty, i));
            agentId++;
        }
    });
    
    return allAgents;
}

function generateSpecialtyAgent(id, specialty, agentIndex) {
    const surname = agentNames.surnames[id % agentNames.surnames.length];
    
    // 男女ランダムに選択
    const isMale = Math.random() > 0.5;
    const givenName = isMale ? 
        agentNames.maleNames[(id + agentIndex) % agentNames.maleNames.length] :
        agentNames.femaleNames[(id + agentIndex) % agentNames.femaleNames.length];
    
    const company1 = companies[id % companies.length];
    const company2 = companies[(id + agentIndex + 1) % companies.length];
    const location = locations[id % locations.length];
    
    // 評価とレビュー数の生成（専門性によって調整）
    const baseRating = 4.0 + Math.random() * 0.9;
    const rating = Math.round(baseRating * 10) / 10;
    const reviewCount = Math.floor(20 + Math.random() * 200);
    
    // 転職成功数と年収向上率
    const successCount = Math.floor(30 + Math.random() * 170);
    const salaryIncrease = Math.floor(110 + Math.random() * 50);
    const experience = Math.floor(3 + Math.random() * 12);
    
    // 関連する専門分野タグを生成
    const relatedSpecialties = generateRelatedSpecialties(specialty);
    
    // 既存の画像ファイルを使用（フォールバック対応）
    const imageOptions = [
        'images/people/consultant1.jpg',
        'images/people/consultant2.jpg', 
        'images/people/consultant3.jpg',
        'images/people/person1.jpg',
        'images/people/person2.jpg'
    ];
    const avatar = imageOptions[id % imageOptions.length];
    
    return {
        id,
        name: `${surname} ${givenName}`,
        title: `${specialty}専門エージェント`,
        avatar,
        location,
        rating,
        reviewCount,
        specialties: [specialty, ...relatedSpecialties],
        summary: `${company1}、${company2}出身。${specialty}分野で${successCount}名以上の転職支援実績。平均年収向上率${salaryIncrease}%。`,
        verified: Math.random() > 0.2, // 80%が認証済み
        primarySpecialty: specialty,
        stats: {
            successCount,
            salaryIncrease,
            experience
        },
        keywords: generateKeywords(specialty),
        gender: isMale ? 'male' : 'female'
    };
}

function generateRelatedSpecialties(primarySpecialty) {
    const related = [];
    const maxRelated = 3;
    
    // 主要専門分野に基づいて関連分野を選択
    const specialtyMaps = {
        // 機械学習関連
        "深層学習": ["PyTorch", "TensorFlow", "CNN"],
        "機械学習エンジニア": ["MLOps", "Python", "データサイエンス"],
        "MLOps": ["Docker", "Kubernetes", "CI/CD for ML"],
        "強化学習": ["ゲームAI", "ロボティクス", "最適制御"],
        
        // ロボティクス関連
        "ロボティクスエンジニア": ["ROS", "制御工学", "SLAM"],
        "産業用ロボット": ["制御システム", "PID制御", "安全性"],
        "自動運転エンジニア": ["ADAS", "コンピュータビジョン", "センサーフュージョン"],
        
        // AI関連
        "NLPエンジニア": ["大規模言語モデル", "BERT", "Transformer"],
        "画像認識エンジニア": ["CNN", "物体検出", "OpenCV"],
        "データサイエンティスト": ["統計解析", "Python", "機械学習"]
    };
    
    if (specialtyMaps[primarySpecialty]) {
        related.push(...specialtyMaps[primarySpecialty].slice(0, maxRelated));
    } else {
        // デフォルトの関連分野
        const generalRelated = ["AI", "機械学習", "Python", "データ分析", "プログラミング"];
        for (let i = 0; i < maxRelated; i++) {
            const randomSpecialty = generalRelated[Math.floor(Math.random() * generalRelated.length)];
            if (!related.includes(randomSpecialty)) {
                related.push(randomSpecialty);
            }
        }
    }
    
    return related;
}

function generateKeywords(specialty) {
    const keywordMaps = {
        "深層学習": ["neural networks", "deep learning", "AI", "machine learning", "python"],
        "ロボティクス": ["robotics", "automation", "control systems", "sensors", "mechanical engineering"],
        "自動運転": ["autonomous driving", "ADAS", "computer vision", "sensor fusion", "automotive"],
        "NLP": ["natural language processing", "text analysis", "linguistics", "chatbots", "language models"],
        "データサイエンス": ["data science", "statistics", "analytics", "big data", "visualization"]
    };
    
    return keywordMaps[specialty] || ["AI", "technology", "engineering", "software", "innovation"];
}

// ===== 既存のコードを更新 =====
function generateDummyAgents() {
    // 300個の専門分野から900人のエージェントを生成
    filteredAgents = generateAgentsForAllSpecialties();
    console.log(`Generated ${filteredAgents.length} agents for ${detailedSpecialties.length} specialties`);
}

// ===== 専門分野別検索機能強化 =====
function performSearch() {
    const keyword = document.getElementById('keyword-search')?.value.toLowerCase() || '';
    const specialtyFilter = document.getElementById('specialty-filter')?.value || '';
    const experienceFilter = document.getElementById('experience-filter')?.value || '';
    const ratingFilter = document.getElementById('rating-filter')?.value || '';
    const locationFilter = document.getElementById('location-filter')?.value || '';
    
    let filtered = [...filteredAgents];
    
    // キーワード検索
    if (keyword) {
        filtered = filtered.filter(agent => {
            const searchText = [
                agent.name, 
                agent.title, 
                ...agent.specialties, 
                agent.summary,
                ...agent.keywords
            ].join(' ').toLowerCase();
            return searchText.includes(keyword);
        });
    }
    
    // 専門分野フィルター
    if (specialtyFilter) {
        filtered = filtered.filter(agent => 
            agent.primarySpecialty === specialtyFilter || 
            agent.specialties.includes(specialtyFilter)
        );
    }
    
    // 経験年数フィルター
    if (experienceFilter) {
        filtered = filtered.filter(agent => {
            const experience = agent.stats.experience;
            switch (experienceFilter) {
                case '1-3': return experience >= 1 && experience <= 3;
                case '3-5': return experience >= 3 && experience <= 5;
                case '5-10': return experience >= 5 && experience <= 10;
                case '10+': return experience >= 10;
                default: return true;
            }
        });
    }
    
    // 評価フィルター
    if (ratingFilter) {
        const minRating = parseFloat(ratingFilter);
        filtered = filtered.filter(agent => agent.rating >= minRating);
    }
    
    // 地域フィルター
    if (locationFilter) {
        filtered = filtered.filter(agent => 
            agent.location.includes(locationFilter)
        );
    }
    
    // ソート
    filtered.sort((a, b) => {
        switch (currentSort) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.stats.experience - a.stats.experience;
            case 'success':
                return b.stats.successCount - a.stats.successCount;
            case 'salary':
                return b.stats.salaryIncrease - a.stats.salaryIncrease;
            default:
                return b.rating - a.rating;
        }
    });
    
    displayAgents(filtered, 1);
    updateResultsCount(filtered.length);
    updatePagination(filtered.length);
}

// ===== エージェントカード表示の強化 =====
function createAgentCard(agent) {
    const starsHtml = Array.from({length: 5}, (_, i) => {
        return `<i class="fas fa-star${i < Math.floor(agent.rating) ? '' : ' opacity-30'}"></i>`;
    }).join('');
    
    const specialtyTags = agent.specialties.slice(0, 4).map(specialty => 
        `<span class="specialty-tag">${specialty}</span>`
    ).join('');
    
    return `
        <div class="agent-card" data-specialty="${agent.primarySpecialty}">
            <div class="agent-header">
                <div class="agent-avatar">
                    <img src="${agent.avatar}" alt="${agent.name}のプロフィール写真" loading="lazy">
                    ${agent.verified ? '<div class="verified-badge"><i class="fas fa-check"></i></div>' : ''}
                </div>
                <div class="agent-basic-info">
                    <h3 class="agent-name">${agent.name}</h3>
                    <p class="agent-title">${agent.title}</p>
                    <div class="agent-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${agent.location}</span>
                    </div>
                </div>
                <div class="agent-rating">
                    <div class="stars">${starsHtml}</div>
                    <span class="rating-score">${agent.rating}</span>
                    <span class="review-count">(${agent.reviewCount}レビュー)</span>
                </div>
            </div>
            <div class="agent-specialties">
                ${specialtyTags}
            </div>
            <p class="agent-summary">${agent.summary}</p>
            <div class="agent-stats">
                <div class="stat-item">
                    <span class="stat-value">${agent.stats.successCount}+</span>
                    <span class="stat-name">転職成功</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${agent.stats.salaryIncrease}%</span>
                    <span class="stat-name">年収向上率</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${agent.stats.experience}年</span>
                    <span class="stat-name">業界経験</span>
                </div>
            </div>
            <div class="agent-actions">
                <button class="btn btn-primary" onclick="bookConsultation(${agent.id})">相談予約</button>
                <button class="btn btn-outline" onclick="viewProfile(${agent.id})">プロフィール詳細</button>
            </div>
        </div>
    `;
}

// ===== ページネーション強化 =====
function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / agentsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (!pagination || totalPages <= 1) return;
    
    let paginationHTML = '';
    
    // 前のページボタン
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>`;
    }
    
    // ページ番号
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                          onclick="changePage(${i})">${i}</button>`;
    }
    
    // 次のページボタン
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>`;
    }
    
    paginationHTML += `<span class="page-info">${currentPage} / ${totalPages}</span>`;
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    performSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 専門分野統計情報の生成 =====
function generateSpecialtyStats() {
    const stats = {
        totalSpecialties: detailedSpecialties.length,
        totalAgents: filteredAgents.length,
        avgAgentsPerSpecialty: Math.round(filteredAgents.length / detailedSpecialties.length),
        topSpecialties: getTopSpecialties()
    };
    
    console.log('Specialty Statistics:', stats);
    return stats;
}

function getTopSpecialties() {
    const specialtyCount = {};
    
    filteredAgents.forEach(agent => {
        const specialty = agent.primarySpecialty;
        specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });
    
    return Object.entries(specialtyCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([specialty, count]) => ({ specialty, count }));
}

// ===== 初期化時に統計情報を表示 =====
function initializeSearch() {
    generateDummyAgents();
    handleURLParameters();
    displayAgents(filteredAgents, 1);
    updatePagination(filteredAgents.length);
    
    // 統計情報を生成
    const stats = generateSpecialtyStats();
    console.log(`✅ ${stats.totalAgents}名のエージェントを${stats.totalSpecialties}の専門分野に登録完了`);
    
    // 検索機能の初期化
    const keywordInput = document.getElementById('keyword-search');
    if (keywordInput) {
        keywordInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    const filters = ['specialty-filter', 'experience-filter', 'rating-filter', 'location-filter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', performSearch);
        }
    });
    
    const sortBy = document.getElementById('sort-by');
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            currentSort = this.value;
            performSearch();
        });
    }
    
    // 専門分野セレクトボックスにオプションを追加
    populateSpecialtyFilter();
}

function populateSpecialtyFilter() {
    const specialtyFilter = document.getElementById('specialty-filter');
    if (!specialtyFilter) return;
    
    // 現在のオプションをクリア（最初のdefaultオプション以外）
    while (specialtyFilter.children.length > 1) {
        specialtyFilter.removeChild(specialtyFilter.lastChild);
    }
    
    // 専門分野をアルファベット順にソート
    const sortedSpecialties = [...detailedSpecialties].sort();
    
    sortedSpecialties.forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        specialtyFilter.appendChild(option);
    });
}

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Initialize page-specific functionality
    if (window.location.pathname.includes('search')) {
        initializeSearch();
    }
    if (document.getElementById('registration-form')) {
        initializeRegistrationForm();
    }
    if (document.getElementById('company-registration-form')) {
        initializeCompanyRegistrationForm();
    }
});

// ===== App Initialization =====
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initScrollToTop();
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenuBtn.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Unified Form Handling =====
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateFormData(this, data)) {
                submitFormData(this, data);
            }
        });
        
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                if (this.form.id.includes('registration')) {
                    updateProgress();
                }
            });
        });
    });
}

// ===== Unified Validation =====
function validateFormData(form, data) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'この項目は必須です');
        return false;
    }
    
    switch (fieldName) {
        case 'email':
        case 'contactEmail':
            if (value && !isValidEmail(value)) {
                showFieldError(field, '有効なメールアドレスを入力してください');
                return false;
            }
            break;
        case 'phone':
        case 'contactPhone':
            if (value && !isValidPhone(value)) {
                showFieldError(field, '有効な電話番号を入力してください');
                return false;
            }
            break;
        case 'companyWebsite':
        case 'website':
        case 'linkedin':
            if (value && !isValidUrl(value)) {
                showFieldError(field, '有効なURLを入力してください');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// ===== Validation Helpers =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function isValidUrl(url) {
    try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
    } catch {
        return false;
    }
}

// ===== Form Submission =====
function submitFormData(form, data) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        console.log('Form data:', data);
        showSuccessMessage(form);
        form.reset();
        
        if (form.id.includes('registration')) {
            updateProgress();
            clearSavedData(form.id);
        }
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage(form) {
    const existingMessage = form.querySelector('.success-message, .form-error');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    
    let message = 'お問い合わせありがとうございます。';
    if (form.id.includes('registration')) {
        message = '登録申請を受け付けました。審査後、3営業日以内にご連絡いたします。';
    }
    
    successElement.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--success); margin-bottom: 1rem;">${message}</h3>
        </div>
    `;
    successElement.style.cssText = `
        background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
        border: 1px solid #bbf7d0;
        padding: 2rem;
        border-radius: var(--radius-lg);
        margin-bottom: 2rem;
        box-shadow: var(--shadow);
    `;
    
    form.insertBefore(successElement, form.firstChild);
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== Progress Tracking =====
function updateProgress() {
    const form = document.querySelector('[id*="registration-form"]');
    if (!form) return;
    
    const requiredFields = form.querySelectorAll('[required]');
    let completedFields = 0;
    let totalFields = requiredFields.length;
    
    requiredFields.forEach(field => {
        if (field.type === 'checkbox') return;
        if (field.value.trim()) completedFields++;
    });
    
    const progress = Math.round((completedFields / totalFields) * 100);
    
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText && progressFill) {
        progressText.textContent = `${progress}%`;
        progressFill.style.width = `${progress}%`;
    }
}

// ===== displayAgents関数の追加 =====
function displayAgents(agents, page) {
    const agentsGrid = document.getElementById('agents-grid');
    if (!agentsGrid) return;
    
    const startIndex = (page - 1) * agentsPerPage;
    const endIndex = startIndex + agentsPerPage;
    const pageAgents = agents.slice(startIndex, endIndex);
    
    agentsGrid.innerHTML = pageAgents.map(agent => createAgentCard(agent)).join('');
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${count}件のエージェントが見つかりました`;
    }
}

// ===== Agent Actions =====
function bookConsultation(agentId) {
    const agent = filteredAgents.find(a => a.id === agentId);
    if (agent) {
        alert(`${agent.name}との相談予約機能は準備中です。`);
    }
}

function viewProfile(agentId) {
    const agent = filteredAgents.find(a => a.id === agentId);
    if (agent) {
        alert(`${agent.name}のプロフィール詳細機能は準備中です。`);
    }
}

// ===== Registration Forms =====
function initializeRegistrationForm() {
    initFormValidation();
    initAutoSave('agentRegistrationData');
    initializeLinkedInRegistration(); // LinkedIn機能を追加
}

function initializeCompanyRegistrationForm() {
    initFormValidation();
    initAutoSave('companyRegistrationData');
}

function initFormValidation() {
    // フォームバリデーションロジック
}

// ===== Auto-save =====
function initAutoSave(storageKey) {
    const form = document.querySelector('[id*="registration-form"]');
    if (!form) return;
    
    loadSavedData(storageKey);
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => saveFormData(storageKey), 1000));
    });
}

function saveFormData(storageKey) {
    const form = document.querySelector('[id*="registration-form"]');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadSavedData(storageKey) {
    const savedData = localStorage.getItem(storageKey);
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    Object.keys(data).forEach(key => {
        const field = document.querySelector(`[name="${key}"]`);
        if (field && field.type !== 'checkbox') {
            field.value = data[key];
        }
    });
}

function clearSavedData(formId) {
    const storageKey = formId.includes('company') ? 'companyRegistrationData' : 'agentRegistrationData';
    localStorage.removeItem(storageKey);
}

// ===== Animations =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll(
        '.service-card, .flow-step, .consultant-card, .section-header'
    );
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// ===== Scroll to Top =====
function initScrollToTop() {
    let scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.transform = 'translateY(0)';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.transform = 'translateY(100px)';
            scrollToTopBtn.style.opacity = '0';
        }
    });
}

// ===== URL Parameters =====
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const specialty = urlParams.get('specialty');
    
    if (specialty) {
        const specialtyFilter = document.getElementById('specialty-filter');
        if (specialtyFilter) {
            specialtyFilter.value = specialty;
            performSearch();
        }
    }
}

// ===== 検索ボタンとリセットボタンのイベントハンドラー =====
function initializeSearchButtons() {
    const searchBtn = document.getElementById('search-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // フィルターをリセット
            document.getElementById('keyword-search').value = '';
            document.getElementById('specialty-filter').value = '';
            document.getElementById('experience-filter').value = '';
            document.getElementById('rating-filter').value = '';
            document.getElementById('location-filter').value = '';
            document.getElementById('sort-by').value = 'rating';
            
            // 現在のページを1にリセット
            currentPage = 1;
            
            // 検索を再実行
            performSearch();
        });
    }
}

// ===== LinkedIn登録機能 =====
function initializeLinkedInRegistration() {
    const linkedinBtn = document.getElementById('linkedin-register-btn');
    if (!linkedinBtn) return;
    
    linkedinBtn.addEventListener('click', function() {
        initiateLinkedInAuth();
    });
}

function initiateLinkedInAuth() {
    // LinkedIn OAuth 2.0 認証フロー
    const clientId = 'YOUR_LINKEDIN_CLIENT_ID'; // 実際のクライアントIDに置き換え
    const redirectUri = encodeURIComponent(window.location.origin + '/register.html');
    const state = generateRandomState();
    const scope = encodeURIComponent('r_liteprofile r_emailaddress');
    
    // 状態をローカルストレージに保存（CSRF対策）
    localStorage.setItem('linkedin_oauth_state', state);
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
                   `response_type=code&` +
                   `client_id=${clientId}&` +
                   `redirect_uri=${redirectUri}&` +
                   `state=${state}&` +
                   `scope=${scope}`;
    
    // 新しいウィンドウでLinkedIn認証を開く
    const authWindow = window.open(
        authUrl,
        'linkedin-auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    
    // 認証完了を監視
    const checkClosed = setInterval(() => {
        if (authWindow.closed) {
            clearInterval(checkClosed);
            checkLinkedInAuthResult();
        }
    }, 1000);
}

function generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

function checkLinkedInAuthResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    if (error) {
        showLinkedInError('LinkedIn認証がキャンセルされました');
        return;
    }
    
    if (code && state) {
        const savedState = localStorage.getItem('linkedin_oauth_state');
        if (state !== savedState) {
            showLinkedInError('認証エラー：不正なリクエストです');
            return;
        }
        
        // 認証コードを使用してアクセストークンを取得
        exchangeCodeForToken(code);
        
        // URLからパラメータを削除
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

async function exchangeCodeForToken(code) {
    try {
        showLinkedInLoading();
        
        // 実際の実装では、この処理はバックエンドで行う必要があります
        // ここではフロントエンドでのデモ実装を示しています
        const response = await fetch('/api/linkedin/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                redirect_uri: window.location.origin + '/register.html'
            })
        });
        
        if (!response.ok) {
            throw new Error('トークン取得に失敗しました');
        }
        
        const data = await response.json();
        fetchLinkedInProfile(data.access_token);
        
    } catch (error) {
        console.error('LinkedIn認証エラー:', error);
        showLinkedInError('認証に失敗しました。もう一度お試しください。');
        hideLinkedInLoading();
    }
}

async function fetchLinkedInProfile(accessToken) {
    try {
        // LinkedInプロフィール情報を取得
        const [profileResponse, emailResponse] = await Promise.all([
            fetch('https://api.linkedin.com/v2/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Connection': 'Keep-Alive'
                }
            }),
            fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Connection': 'Keep-Alive'
                }
            })
        ]);
        
        const profile = await profileResponse.json();
        const emailData = await emailResponse.json();
        
        // フォームに情報を自動入力
        populateFormWithLinkedInData(profile, emailData);
        hideLinkedInLoading();
        showLinkedInSuccess();
        
    } catch (error) {
        console.error('プロフィール取得エラー:', error);
        showLinkedInError('プロフィール情報の取得に失敗しました');
        hideLinkedInLoading();
    }
}

function populateFormWithLinkedInData(profile, emailData) {
    // 基本情報の自動入力
    if (profile.localizedFirstName) {
        document.getElementById('firstName').value = profile.localizedFirstName;
    }
    
    if (profile.localizedLastName) {
        document.getElementById('lastName').value = profile.localizedLastName;
    }
    
    // メールアドレスの自動入力
    if (emailData.elements && emailData.elements.length > 0) {
        const email = emailData.elements[0]['handle~'].emailAddress;
        document.getElementById('email').value = email;
    }
    
    // LinkedInプロフィールURLを設定
    if (profile.vanityName) {
        document.getElementById('linkedin').value = `https://linkedin.com/in/${profile.vanityName}`;
    }
    
    // フォームの進捗を更新
    updateProgress();
    
    // 入力されたフィールドをハイライト
    highlightAutoFilledFields();
}

function highlightAutoFilledFields() {
    const autoFilledFields = ['firstName', 'lastName', 'email', 'linkedin'];
    
    autoFilledFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value) {
            field.classList.add('auto-filled');
            
            // 3秒後にハイライトを削除
            setTimeout(() => {
                field.classList.remove('auto-filled');
            }, 3000);
        }
    });
}

function showLinkedInLoading() {
    const btn = document.getElementById('linkedin-register-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> LinkedIn認証中...';
    btn.disabled = true;
}

function hideLinkedInLoading() {
    const btn = document.getElementById('linkedin-register-btn');
    btn.innerHTML = '<i class="fab fa-linkedin"></i> LinkedInで登録';
    btn.disabled = false;
}

function showLinkedInSuccess() {
    const socialReg = document.querySelector('.social-registration');
    const successDiv = document.createElement('div');
    successDiv.className = 'linkedin-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>LinkedInから情報を取得しました！</span>
    `;
    
    socialReg.appendChild(successDiv);
    
    // 3秒後に成功メッセージを削除
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showLinkedInError(message) {
    const socialReg = document.querySelector('.social-registration');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'linkedin-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    socialReg.appendChild(errorDiv);
    
    // 5秒後にエラーメッセージを削除
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== 既存の初期化関数を更新 =====
function initializeRegistrationForm() {
    initFormValidation();
    initAutoSave('agentRegistrationData');
    initializeLinkedInRegistration(); // LinkedIn機能を追加
}

// ...existing code...