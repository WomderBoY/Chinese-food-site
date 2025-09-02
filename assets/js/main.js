// 主JavaScript文件
console.log('八大菜系网站已加载');

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成');

    // 菜品索引（名称与链接）
    const dishes = [
        // 四川
        { name: '东坡肘子', url: 'dishes/sichuan/dp-zhz.html', cuisine: '川菜' },
        { name: '宫保鸡丁', url: 'dishes/sichuan/kungpao-chicken.html', cuisine: '川菜' },
        { name: '毛血旺', url: 'dishes/sichuan/maoxuewang.html', cuisine: '川菜' },
        // 广东
        { name: '蜜汁叉烧', url: 'dishes/cantonese/mizhichi.html', cuisine: '粤菜' },
        { name: '烧乳猪', url: 'dishes/cantonese/shaoruzhu.html', cuisine: '粤菜' },
        { name: '御品官燕', url: 'dishes/cantonese/yupingguanyan.html', cuisine: '粤菜' },
        // 山东
        { name: '爆炒腰花', url: 'dishes/shandong/baochao-yaohua.html', cuisine: '鲁菜' },
        { name: '九转大肠', url: 'dishes/shandong/jiuzhuan-dachang.html', cuisine: '鲁菜' },
        { name: '糖醋鲤鱼', url: 'dishes/shandong/tangcu-liyu.html', cuisine: '鲁菜' },
        // 江苏
        { name: '砂锅鱼头', url: 'dishes/jiangsu/shaoguo-yutou.html', cuisine: '苏菜' },
        { name: '糖醋排骨', url: 'dishes/jiangsu/tangcu-paigu.html', cuisine: '苏菜' },
        { name: '天下第一菜', url: 'dishes/jiangsu/tianxia-diyici.html', cuisine: '苏菜' },
        // 浙江
        { name: '东坡肉', url: 'dishes/zhejiang/dongpo-rou.html', cuisine: '浙菜' },
        { name: '龙井虾仁', url: 'dishes/zhejiang/longjing-xiaren.html', cuisine: '浙菜' },
        { name: '西湖醋鱼', url: 'dishes/zhejiang/xihu-cuyu.html', cuisine: '浙菜' },
        // 湖南
        { name: '剁椒鱼头', url: 'dishes/hunan/duojiao-yutou.html', cuisine: '湘菜' },
        { name: '腊味和蒸', url: 'dishes/hunan/lawei-hezheng.html', cuisine: '湘菜' },
        { name: '麻辣子鸡', url: 'dishes/hunan/mala-zi-ji.html', cuisine: '湘菜' },
        // 福建
        { name: '佛跳墙', url: 'dishes/fujian/fo-tiao-qiang.html', cuisine: '闽菜' },
        { name: '鸡丝燕窝', url: 'dishes/fujian/ji-si-yan-wo.html', cuisine: '闽菜' },
        { name: '醉排骨', url: 'dishes/fujian/zui-pai-gu.html', cuisine: '闽菜' },
        // 安徽
        { name: '肥西老母鸡汤', url: 'dishes/anhui/fei_xi_lao_mu_ji_tang.html', cuisine: '徽菜' },
        { name: '徽州臭鳜鱼', url: 'dishes/anhui/hui_zhou_chou_gui_yu.html', cuisine: '徽菜' },
        { name: '火腿炖甲鱼', url: 'dishes/anhui/huo_tui_dun_jia_yu.html', cuisine: '徽菜' }
    ];

    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const randomBtn = document.getElementById('random-btn');
    const randomDisplay = document.getElementById('random-display');
    if (!input || !results) return;

    let lastKeyword = '';
    let debounceTimer = null;

    function renderEmpty() {
        results.innerHTML = '\n<div class="search-empty" role="note">无</div>';
        results.style.display = 'block';
    }

    function renderResults(items) {
        if (!items.length) {
            results.innerHTML = '';
            results.style.display = 'none';
            return;
        }
        const html = items.slice(0, 8).map(item => {
            const safeName = item.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `\n<a class="search-item" href="${item.url}" role="option">${safeName}<span class="tag">${item.cuisine}</span></a>`;
        }).join('');
        results.innerHTML = html;
        results.style.display = 'block';
    }

    function doSearch(keyword) {
        const kw = keyword.trim();
        if (kw === '') {
            renderResults([]);
            return;
        }
        const lowered = kw.toLowerCase();
        const matched = dishes.filter(d => d.name.toLowerCase().includes(lowered));
        if (matched.length === 0) {
            renderEmpty();
        } else {
            renderResults(matched);
        }
    }

    input.addEventListener('input', function() {
        const value = input.value;
        if (value === lastKeyword) return;
        lastKeyword = value;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => doSearch(value), 120);
    });

    // 回车直达首个结果
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const first = results.querySelector('.search-item');
            if (first) {
                window.location.href = first.getAttribute('href');
            }
        }
        if (e.key === 'Escape') {
            input.blur();
            renderResults([]);
        }
    });

    // 点击页面空白处关闭结果
    document.addEventListener('click', function(e) {
        if (!results.contains(e.target) && e.target !== input) {
            renderResults([]);
        }
    });

    // 今天吃什么：随机滚动与停驻
    if (randomBtn && randomDisplay) {
        let rollingTimer = null;
        let stopTimer = null;

        function pickRandomIndex() {
            return Math.floor(Math.random() * dishes.length);
        }

        function startRolling(durationMs) {
            const interval = 70; // 滚动速度
            rollingTimer = setInterval(() => {
                const idx = pickRandomIndex();
                const item = dishes[idx];
                randomDisplay.textContent = item.name;
            }, interval);

            stopTimer = setTimeout(() => {
                clearInterval(rollingTimer);
                rollingTimer = null;
                // 最终结果
                const finalIdx = pickRandomIndex();
                const finalItem = dishes[finalIdx];
                randomDisplay.textContent = finalItem.name;
                randomBtn.disabled = false;
                // 点击结果跳转到菜品页面（可选但符合预期）
                randomDisplay.onclick = () => { window.location.href = finalItem.url; };
            }, durationMs);
        }

        randomBtn.addEventListener('click', function() {
            if (rollingTimer) return; // 避免重复触发
            randomBtn.disabled = true;
            randomDisplay.onclick = null;
            randomDisplay.textContent = '';
            // 随机滚动 1.2s - 2.2s 之间
            const duration = 1200 + Math.floor(Math.random() * 1000);
            startRolling(duration);
        });
    }
});
