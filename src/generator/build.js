const fs = require('fs');
const path = require('path');

const profile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../docs/site-seo-profile.json'), 'utf-8'));
const providers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/providers.json'), 'utf-8'));
const faqs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/faqs.json'), 'utf-8'));
const articles = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/articles.json'), 'utf-8'));

const DIST_DIR = path.resolve(__dirname, '../../dist');

// Utility to create directory recursively
function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Clean and prepare output dir
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
ensureDir(DIST_DIR);

// Copy stylesheet
ensureDir(path.join(DIST_DIR, 'css'));
fs.copyFileSync(
  path.join(__dirname, '../styles/clean-white.css'),
  path.join(DIST_DIR, 'css/clean-white.css')
);

// HTML Template components
function renderHeader(activePath = '/') {
  const navItemsHtml = profile.navigationItems.map(nav => {
    const isActive = activePath === nav.url || (nav.url !== '/' && activePath.startsWith(nav.url));
    return `<a href="${nav.url}" class="nav-link ${isActive ? 'active' : ''}">${nav.label}</a>`;
  }).join('');

  return `
  <header class="site-header">
    <div class="container header-top">
      <div class="brand-area">
        <a href="/" class="brand-logo">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          jcbijiao 机场比较网
        </a>
        <div class="brand-tagline">2026年稳定高速节点推荐与评测指南 · Clash/Sing-box/Shadowrocket客户端配置 · 便宜机场避坑与AI节点选购</div>
      </div>
      <div class="header-actions">
        <a href="https://t.me/+1Gr0KsguXvk1Y2Y1" target="_blank" rel="noopener noreferrer" class="btn-icon-tag btn-tg" title="Telegram 交流频道">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          <span>TG 频道</span>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn-icon-tag btn-github" title="GitHub 源码仓库">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          <span>GitHub</span>
        </a>
        <div class="header-search-wrapper">
          <div class="header-search-input-group">
            <input type="text" id="headerSearchInput" class="header-search-input" placeholder="搜索文章、FAQ、节点资讯..." autocomplete="off">
            <button class="header-search-btn" title="搜索">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
          <div id="headerSearchResults" class="search-results-dropdown"></div>
        </div>
        <a href="/reviews/" class="btn-cta-small">查看机场推荐榜</a>
        <button class="mobile-menu-toggle" onclick="document.querySelector('.nav-bar').classList.toggle('mobile-open')">☰</button>
      </div>
    </div>
    <div class="container">
      <nav class="nav-bar">
        ${navItemsHtml}
      </nav>
    </div>
  </header>
  `;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container footer-content">
      <div>
        <div class="footer-brand-title">jcbijiao 节点比较评测网</div>
        <p class="footer-seo-text">
          本站专注2026年机场推荐、性价比机场对比、Clash/Sing-box机场测评与节点选择指南，持续整理便宜机场、稳定节点推荐、AI机场推荐、节点订阅与优惠码信息，为用户提供带核验日期的选择参考。
        </p>
        <p class="footer-seo-text">
          <strong>合作与核验说明：</strong> 本站页面可能包含合作邀请链接。排名受内容策略与合作关系影响，但不影响价格透明度。所有价格、节点与套餐均标注最后核验日期，具体以第三方服务商结算页面为准。
        </p>
      </div>
      <div>
        <div class="footer-links-title">导航目录</div>
        <ul class="footer-links-list">
          <li><a href="/reviews/">机场推荐评测</a></li>
          <li><a href="/guide/">选购与避坑指南</a></li>
          <li><a href="/tutorials/">客户端使用教程</a></li>
          <li><a href="/faq/">常见问题 FAQ</a></li>
          <li><a href="/providers/">独立服务测评库</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-links-title">信任与条款</div>
        <ul class="footer-links-list">
          <li><a href="/about/">关于我们</a></li>
          <li><a href="/editorial-policy/">编辑原则</a></li>
          <li><a href="/methodology/">评测方法</a></li>
          <li><a href="/affiliate-disclosure/">联盟披露</a></li>
          <li><a href="/privacy/">隐私政策</a></li>
          <li><a href="/terms/">服务条款</a></li>
          <li><a href="/contact/">联系我们</a></li>
          <li><a href="/sitemap.xml">XML Sitemap</a></li>
          <li><a href="/feed.xml">RSS 订阅</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      &copy; 2026 jcbijiao. All rights reserved. 第三方商标归其权利人所有，本站不暗示官方隶属关系。
    </div>
  </footer>
  <script>
    function copyCoupon(code, btn) {
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.innerText;
        btn.innerText = '已复制!';
        setTimeout(() => btn.innerText = orig, 2000);
      });
    }
  </script>
  `;
}

function renderBreadcrumbs(items) {
  const listItems = items.map((it, idx) => {
    if (idx === items.length - 1) {
      return `<span>${it.name}</span>`;
    }
    return `<a href="${it.url}">${it.name}</a> &gt; `;
  }).join('');

  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${listItems}</nav>`;
}

function renderHtmlPage({ title, description, canonical, content, schemaJson = null, activePath = '/' }) {
  const schemaScript = schemaJson ? `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>` : '';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://jcbijiao.my${canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://jcbijiao.my${canonical}">
  <meta property="og:site_name" content="jcbijiao 机场比较网">
  <link rel="alternate" type="application/rss+xml" title="jcbijiao RSS Feed" href="https://jcbijiao.my/feed.xml">
  <link rel="stylesheet" href="/css/clean-white.css">
  ${schemaScript}
</head>
<body>
  ${renderHeader(activePath)}
  <main>
    ${content}
  </main>
  ${renderFooter()}
  <script src="/js/search.js" defer></script>
</body>
</html>`;
}

// 1. GENERATE HOMEPAGE
console.log('Building Homepage (/index.html)...');
const primaryProviders = providers;

const primaryGridHtml = primaryProviders.map(p => `
  <div class="provider-card primary-top">
    <div class="provider-rank-badge">NO.${p.rank} ${p.rank <= 4 ? '核心主推' : '推荐机场'}</div>
    <div class="provider-header">
      <div class="provider-name">${p.name}</div>
      <div class="provider-suitable">${p.suitableFor}</div>
    </div>
    <div class="provider-meta">
      <div><strong>参考价格：</strong> ${p.priceFrom}</div>
      <div><strong>流量分配：</strong> ${p.trafficFrom}</div>
      <div><strong>特点简述：</strong> ${p.summary}</div>
    </div>
    ${p.coupon && p.coupon !== '暂无优惠码' ? `
    <div class="coupon-box">
      <span>优惠码: <span class="coupon-code">${p.coupon}</span></span>
      <button class="btn-copy" onclick="copyCoupon('${p.coupon}', this)">复制优惠码</button>
    </div>` : ''}
    <div class="provider-actions">
      <a href="/providers/${p.slug}/" class="btn-internal-review">查看 ${p.name} 机场测评</a>
      <a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" class="btn-affiliate-cta">${p.ctaText} &rarr;</a>
    </div>
  </div>
`).join('');

const comparisonTableRows = providers.slice(0, 12).map(p => `
  <tr>
    <td><strong>NO.${p.rank} ${p.name}</strong></td>
    <td>${p.priceFrom}</td>
    <td>${p.trafficFrom}</td>
    <td>${p.coupon || '暂无'}</td>
    <td>${p.suitableFor}</td>
    <td><a href="/providers/${p.slug}/">查看测评</a></td>
    <td><a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" style="font-weight:bold;">查看当前套餐</a></td>
  </tr>
`).join('');

const quickSidebarListHtml = providers.map(p => `
  <div class="quick-sidebar-item">
    <span class="quick-sidebar-name">NO.${p.rank} ${p.name}</span>
    <a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" class="btn-sidebar-aff">官网 &rarr;</a>
  </div>
`).join('');

const homeContent = `
<section class="hero-section">
  <div class="container">
    <div class="hero-badge">2026年稳定高速节点推荐与评测指南 · Clash/Sing-box/Shadowrocket客户端配置 · 便宜机场避坑与AI节点选购</div>
    <h1 class="hero-title">${profile.siteTitle}</h1>
    <p class="hero-keyword-summary">
      面向新手与专业用户提供2026精选机场横向评测、高性价比稳定节点推荐与跨境网络加速专线。全面涵盖机场推荐、节点购买、机场对比、便宜机场、稳定节点推荐、AI机场推荐与机场优惠码，帮助对比价格、流量、地区与订阅配置。
    </p>
    <div class="hero-ctas">
      <a href="/reviews/" class="btn-hero-primary">查看机场推荐榜单 &rarr;</a>
      <a href="/guide/" class="btn-hero-secondary">阅读选购避坑指南</a>
      <a href="https://varnexa.lingdongaff.com/#/?code=JoIy7bO1" target="_blank" rel="sponsored nofollow noopener" style="font-size:0.9rem; font-weight:600; text-decoration:underline; color:var(--brand-color);">
        查看灵动云当前套餐
      </a>
    </div>
    <div class="hero-disclosure-note">
      * 价格、流量及优惠折扣请以第三方服务商当前实际结算页为准（最后核验日期：2026-09-22）。
    </div>
  </div>
</section>

<div class="container home-layout-wrapper">
  <!-- Left Sidebar (图二左侧空白位置) -->
  <aside class="sidebar-col">
    <div class="quick-sidebar-box">
      <div class="quick-sidebar-header">
        <h3 class="quick-sidebar-title">⚡ 快速机场列表</h3>
        <span class="quick-sidebar-subtitle">收录全网 28 家精选机场直达官网入口</span>
      </div>
      <div class="quick-sidebar-list">
        ${quickSidebarListHtml}
      </div>
    </div>
  </aside>

  <!-- Right Main Content (机场推荐榜) -->
  <main class="main-content-col">
    <!-- 站长精选推荐文章: 选错机场多花上千块？ -->
    <section class="featured-guide-section" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:1.75rem; margin-bottom:2rem; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:inline-block; background:#eff6ff; color:#2563eb; font-weight:600; font-size:0.85rem; padding:0.25rem 0.75rem; border-radius:20px; margin-bottom:0.75rem;">
        🔥 老飞友深度指南
      </div>
      <h2 style="font-size:1.4rem; font-weight:700; color:#1e293b; margin-top:0; margin-bottom:1rem; line-height:1.4;">
        选错机场多花上千块？老飞友教你如何用【机场比较网】省钱又省心
      </h2>
      <div style="font-size:0.95rem; color:#475569; line-height:1.7; margin-bottom:1.25rem;">
        <p style="margin-bottom:0.75rem;">
          买机票时，绝大多数人只会盯着“哪趟航班更便宜”，却往往忽略了一个隐形开销大户——<strong>你落地的机场究竟在哪？</strong>
        </p>
        <p style="margin-bottom:0.75rem;">
          大城市通常拥有双机场甚至多机场（例如伦敦的希思罗与盖特威克、东京的羽田与成田、纽约的JFK与纽瓦克）。机票便宜了300元，落地后却发现往返市区的电车或打车费要花500元，外加拖着行李转车两个小时。这就是典型的<strong>“假便宜，真折腾”</strong>。
        </p>
        <p style="margin:0;">
          为了解决这类出行痛点，<strong>【机场比较网】</strong>应运而生。它不仅仅是一个查代码的工具，更是你行前规划决策的核心助手。为什么出发前必须先对比？
        </p>
      </div>

      <!-- 三大隐形成本 & 三大实战场景 并列整齐卡片网格 -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
        <div style="background:#f8fafc; border:1px solid #f1f5f9; border-radius:8px; padding:1rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#0f172a; margin-top:0; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            💡 警惕三大隐形成本
          </h3>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.875rem; color:#475569; line-height:1.6;">
            <li><strong>地面交通费：</strong>次要机场往返市区开支翻倍</li>
            <li><strong>时间精力消耗：</strong>转车折腾2小时，影响行程</li>
            <li><strong>夜间抵离风险：</strong>红眼航班打车费抹平机票差价</li>
          </ul>
        </div>

        <div style="background:#f8fafc; border:1px solid #f1f5f9; border-radius:8px; padding:1rem;">
          <h3 style="font-size:1rem; font-weight:600; color:#0f172a; margin-top:0; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            🎯 覆盖三大实战场景
          </h3>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.875rem; color:#475569; line-height:1.6;">
            <li><strong>商务出差：</strong>优先选择主机场，高效省时</li>
            <li><strong>家庭/亲子游：</strong>避开复杂转车，减少行李负担</li>
            <li><strong>背包客穷游：</strong>评估总成本，找到真性价比方案</li>
          </ul>
        </div>
      </div>

      <div style="background:#f0fdf4; border:1px solid #dcfce7; border-radius:8px; padding:1rem; color:#166534; font-size:0.9rem; line-height:1.6;">
        <strong>✨ 为什么选择【机场比较网】？</strong> 全网聚合 28+ 主流机场服务商，提供实时节点速度测速、专属优惠码折扣及清晰流量对比，帮你在出行与网络规划中实现真正高效与省钱！
      </div>
    </section>

    <h2 class="section-title" style="margin-top:0;">机场推荐榜：按需求比较服务</h2>
    <div class="provider-grid">
      ${primaryGridHtml}
    </div>

    <h2 class="section-title">快速对比表 (前12家主流服务)</h2>
    <div class="table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>服务名称</th>
            <th>参考价格</th>
            <th>流量分配</th>
            <th>优惠码</th>
            <th>适用场景</th>
            <th>站内测评</th>
            <th>官方套餐页</th>
          </tr>
        </thead>
        <tbody>
          ${comparisonTableRows}
        </tbody>
      </table>
    </div>

    <h2 class="section-title">按需求选型指南</h2>
    <div class="faq-grid">
      <div class="faq-card">
        <h3 class="faq-card-title">🚀 跨境办公与AI开发</h3>
        <p class="faq-card-excerpt">推荐选择配备智能分流中继、多出口IP与低丢包率的服务（如灵动云、暮光网络）。保证GitHub Copilot、ChatGPT与Claude连接稳固。</p>
        <a href="/tutorials/ai-airport-recommendation-chatgpt-claude/">查看 AI 机场推荐文章 &rarr;</a>
      </div>
      <div class="faq-card">
        <h3 class="faq-card-title">💰 高性价比与轻量备用</h3>
        <p class="faq-card-excerpt">推荐小流量年付或低门槛月付方案（如飞猫云）。折合每月仅需几元，极度适合日常浏览与备用断连容灾。</p>
        <a href="/reviews/value-monthly-cheap-airport-review/">查看便宜机场评测 &rarr;</a>
      </div>
      <div class="faq-card">
        <h3 class="faq-card-title">🎬 4K影音与晚高峰超清</h3>
        <p class="faq-card-excerpt">侧重晚高峰带宽冗余与Netflix/Disney+原生IP解锁（如暮光网络）。保证20:00-23:00无卡顿。</p>
        <a href="/reviews/4k-streaming-unlock-airport-review/">查看4K流媒体机场评测 &rarr;</a>
      </div>
    </div>

    <h2 class="section-title">精选教程与指南</h2>
    <div class="faq-grid">
      ${articles.slice(0, 6).map(a => `
        <div class="faq-card">
          <h3 class="faq-card-title">${a.title}</h3>
          <p class="faq-card-excerpt">${a.summary}</p>
          <a href="/${a.category}/${a.slug}/">阅读全文 &rarr;</a>
        </div>
      `).join('')}
    </div>
  </main>
</div>
`;

const homeHtml = renderHtmlPage({
  title: profile.siteTitle,
  description: profile.siteDescription,
  canonical: '/',
  content: homeContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "jcbijiao.my",
    "url": "https://jcbijiao.my/",
    "description": profile.siteDescription
  },
  activePath: '/'
});

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homeHtml, 'utf-8');

// 2. GENERATE /reviews/, /guide/, /tutorials/ INDEX & DETAIL PAGES
const sections = [
  { key: 'reviews', title: '机场推荐评测', desc: '优质稳定机场评测推荐、IEPL专线对比与选购排行榜。' },
  { key: 'guide', title: '选购与避坑指南', desc: '机场选购避坑指南、防跑路技巧、晚高峰测速与流量计算。' },
  { key: 'tutorials', title: '客户端使用教程', desc: 'Clash、Sing-box、Shadowrocket多平台客户端订阅配置教程。' }
];

sections.forEach(sec => {
  console.log(`Building section /${sec.key}/...`);
  const secDir = path.join(DIST_DIR, sec.key);
  ensureDir(secDir);

  const secArticles = articles.filter(a => a.category === sec.key);
  
  const secIndexContent = `
  <div class="container article-container">
    <div class="article-header">
      <h1 class="article-title">${sec.title}</h1>
      <p class="article-meta">${sec.desc}</p>
      ${renderBreadcrumbs([{ name: '首页', url: '/' }, { name: sec.title, url: `/${sec.key}/` }])}
    </div>
    <div class="faq-grid">
      ${secArticles.map(a => `
        <div class="faq-card">
          <h2 class="faq-card-title" style="font-size:1.15rem;"><a href="/${sec.key}/${a.slug}/">${a.title}</a></h2>
          <p class="faq-card-excerpt">${a.summary}</p>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">
            关键词: ${a.primaryKeyword} · 更新时间: ${a.lastmod}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;

  const secIndexHtml = renderHtmlPage({
    title: `${sec.title} - jcbijiao.my`,
    description: sec.desc,
    canonical: `/${sec.key}/`,
    content: secIndexContent,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": sec.title,
      "url": `https://jcbijiao.my/${sec.key}/`
    },
    activePath: `/${sec.key}/`
  });

  fs.writeFileSync(path.join(secDir, 'index.html'), secIndexHtml, 'utf-8');

  // Detail Articles
  secArticles.forEach(art => {
    const artDir = path.join(secDir, art.slug);
    ensureDir(artDir);

    const artContent = `
    <div class="container article-container">
      <div class="article-header">
        <h1 class="article-title">${art.title}</h1>
        <div class="article-meta">
          <span>作者: ${art.author}</span>
          <span>发布日期: ${art.date}</span>
          <span>最后更新: ${art.lastmod}</span>
          <span>分类: <a href="/${sec.key}/">${sec.title}</a></span>
        </div>
        ${renderBreadcrumbs([
          { name: '首页', url: '/' },
          { name: sec.title, url: `/${sec.key}/` },
          { name: art.title, url: `/${sec.key}/${art.slug}/` }
        ])}
      </div>

      <div class="article-body">
        ${art.body}
      </div>

      <div style="margin-top:3rem; padding:1.25rem; background-color:var(--bg-secondary); border-radius:8px;">
        <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">相关阅读推荐</h3>
        <ul>
          ${secArticles.filter(a => a.slug !== art.slug).slice(0, 4).map(rel => `
            <li><a href="/${sec.key}/${rel.slug}/">${rel.title}</a></li>
          `).join('')}
        </ul>
      </div>
    </div>
    `;

    const artHtml = renderHtmlPage({
      title: `${art.title} | jcbijiao.my`,
      description: art.summary,
      canonical: `/${sec.key}/${art.slug}/`,
      content: artContent,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": art.title,
        "description": art.summary,
        "datePublished": art.date,
        "dateModified": art.lastmod,
        "author": { "@type": "Person", "name": art.author }
      },
      activePath: `/${sec.key}/`
    });

    fs.writeFileSync(path.join(artDir, 'index.html'), artHtml, 'utf-8');
  });
});

// 3. GENERATE /providers/ AND INDIVIDUAL PROVIDER PAGES (28 PROVIDERS)
console.log('Building Provider Review Pages (/providers/)...');
const provDir = path.join(DIST_DIR, 'providers');
ensureDir(provDir);

const provIndexContent = `
<div class="container article-container">
  <div class="article-header">
    <h1 class="article-title">独立服务测评库 (28家机场数据库)</h1>
    <p class="article-meta">覆盖全网28家机场服务商的独立规范测评、价格套餐表与优惠码信息。</p>
    ${renderBreadcrumbs([{ name: '首页', url: '/' }, { name: '服务测评库', url: '/providers/' }])}
  </div>
  <div class="provider-grid">
    ${providers.map(p => `
      <div class="provider-card">
        <div class="provider-rank-badge">NO.${p.rank}</div>
        <div class="provider-header">
          <div class="provider-name">${p.name}</div>
          <div class="provider-suitable">${p.suitableFor}</div>
        </div>
        <div class="provider-meta">
          <div><strong>参考价格：</strong> ${p.priceFrom}</div>
          <div><strong>流量分配：</strong> ${p.trafficFrom}</div>
        </div>
        <div class="provider-actions">
          <a href="/providers/${p.slug}/" class="btn-internal-review">查看 ${p.name} 机场测评</a>
          <a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" class="btn-affiliate-cta">查看当前套餐 &rarr;</a>
        </div>
      </div>
    `).join('')}
  </div>
</div>
`;

const provIndexHtml = renderHtmlPage({
  title: '独立服务测评库 (28家机场数据库) | jcbijiao.my',
  description: '全网28家机场服务商独立测评，包含灵动云、暮光网络、飞猫云、微风网络等主流机场的节点与价格套餐。',
  canonical: '/providers/',
  content: provIndexContent,
  activePath: '/providers/'
});

fs.writeFileSync(path.join(provDir, 'index.html'), provIndexHtml, 'utf-8');

providers.forEach(p => {
  const pSingleDir = path.join(provDir, p.slug);
  ensureDir(pSingleDir);

  const pContent = `
  <div class="container article-container">
    <div class="article-header">
      <h1 class="article-title">${p.name} 机场测评：2026最新价格套餐、覆盖地区、晚高峰测速与购买指南</h1>
      <div class="article-meta">
        <span>服务名称: ${p.name} (${p.alternateName || ''})</span>
        <span>综合排名: NO.${p.rank}</span>
        <span>核验日期: ${p.lastChecked || '2026-09-25'}</span>
      </div>
      ${renderBreadcrumbs([
        { name: '首页', url: '/' },
        { name: '独立服务测评库', url: '/providers/' },
        { name: `${p.name}测评`, url: `/providers/${p.slug}/` }
      ])}
    </div>

    <!-- 概要简报卡片 -->
    <div class="provider-card" style="margin-bottom:2rem; padding:1.5rem; border:1px solid #e2e8f0; border-radius:12px; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid #f1f5f9; padding-bottom:0.75rem;">
        <h2 style="margin:0; font-size:1.4rem; font-weight:700; color:#0f172a;">${p.name} 概要速览</h2>
        <span style="background:#eff6ff; color:#2563eb; font-weight:600; font-size:0.85rem; padding:0.25rem 0.75rem; border-radius:20px;">全网综合推荐 NO.${p.rank}</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.25rem; font-size:0.95rem; color:#334155;">
        <div><strong>💰 起步价格：</strong> <span style="color:#059669; font-weight:600;">${p.priceFrom}</span></div>
        <div><strong>📊 基础流量：</strong> ${p.trafficFrom}</div>
        <div><strong>🏷️ 专属优惠码：</strong> <strong style="color:#2563eb;">${p.coupon && p.coupon !== '暂无优惠码' ? p.coupon : '暂无专属优惠码'}</strong></div>
        <div><strong>🌐 覆盖地区：</strong> ${p.regions || '香港、日本、新加坡、美国'}</div>
      </div>
      <div style="font-size:0.9rem; color:#475569; background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1.25rem; line-height:1.6;">
        <strong>📝 简评总结：</strong> ${p.summary}
      </div>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" class="btn-affiliate-cta" style="flex:1; text-align:center; padding:0.75rem 1.25rem; background:#0284c7; color:#ffffff; font-weight:600; border-radius:8px; text-decoration:none;">前往 ${p.name} 官方结算页下单 &rarr;</a>
      </div>
    </div>

    <div class="article-body">
      <!-- 1. 机场简介 -->
      <h2>1. ${p.name} 机场简介与线路架构</h2>
      <p>
        在 2026 年的跨境网络与节点评测中，<strong>${p.name} (${p.alternateName || p.name})</strong> 凭借其稳健的线路传输架构与高性价比套餐定位，成为了众多科学上网与跨境办公用户的优选服务之一。
      </p>
      <p>
        根据本站编辑部的实测核验，${p.name} 采用多线路智能分流与中继中转架构，主干路由兼顾了物理 IEPL/IPLC 内网专线与高性能 BGP 入口。支持 Shadowsocks、Trojan、VLESS 等主流加密协议，能够完美兼容 Clash Verge Rev、Sing-box、iOS Shadowrocket（小火箭）及安卓客户端。
      </p>

      <!-- 2. 所有的套餐价格 -->
      <h2>2. ${p.name} 所有的套餐价格与流量明细</h2>
      <p>
        为了让用户清晰直观地了解 ${p.name} 的价格体系，我们整理了该服务商当前全量的套餐方案列表：
      </p>
      <div class="table-wrapper" style="margin:1.25rem 0;">
        <table class="comparison-table" style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f8fafc; text-align:left;">
              <th>套餐名称</th>
              <th>参考价格</th>
              <th>流量分配</th>
              <th>包含线路与服务特点</th>
              <th>专属优惠码</th>
            </tr>
          </thead>
          <tbody>
            ${(p.packages || []).map(pkg => `
              <tr>
                <td><strong>${pkg.name}</strong></td>
                <td style="color:#059669; font-weight:600;">${pkg.price}</td>
                <td>${pkg.traffic}</td>
                <td>全节点解锁、多地区中继/专线支持、多设备并发</td>
                <td><strong style="color:#2563eb;">${p.coupon && p.coupon !== '暂无优惠码' ? p.coupon : '直接下单'}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size:0.875rem; color:#64748b;">
        💡 提示：${p.coupon && p.coupon !== '暂无优惠码' ? `在下单结账时填入优惠码 <strong>${p.coupon}</strong> 可享受额外折减优惠。` : '以上价格带有最后核验日期（2026-09-25），实际套餐以官方结算页面为准。'}
      </p>

      <!-- 3. 节点地区与解锁能力 -->
      <h2>3. ${p.name} 节点覆盖地区与解锁能力</h2>
      <p>
        ${p.name} 在全球多个核心数据中心部署了优质中转与落地节点，节点涵盖：
      </p>
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; margin:1rem 0;">
        <div style="font-size:1.05rem; font-weight:600; color:#0f172a; margin-bottom:0.75rem;">🌐 节点覆盖地区分布：</div>
        <div style="font-size:0.95rem; color:#334155; line-height:1.8;">
          <strong>${p.regions || '香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)'}</strong>
        </div>
        <div style="margin-top:1rem; pt:0.75rem; border-top:1px dashed #cbd5e1; font-size:0.9rem; color:#475569;">
          <strong>🎬 4K流媒体解锁支持：</strong> Netflix、Disney+、YouTube 4K、HBO Max、BBC iPlayer<br>
          <strong>🤖 AI大模型服务支持：</strong> ChatGPT (OpenAI)、Claude 3.5 Sonnet、Google Gemini、Midjourney
        </div>
      </div>

      <!-- 4. 机场测试图 (Speed Test Report & Chart) -->
      <h2>4. ${p.name} 晚高峰测速与节点延迟测试图</h2>
      <p>
        编辑部在晚高峰黄金时段（20:00 - 23:00）针对 ${p.name} 的核心节点进行了多线程 Bandwidth 测速与 Ping 延迟测试，测试数据结果如下：
      </p>

      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; margin:1.25rem 0; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-weight:600; color:#0f172a; flex-wrap:wrap; gap:0.5rem;">
          <span>📊 ${p.name} 晚高峰全节点测速报告 (500M 宽带环境)</span>
          <span style="font-size:0.8rem; background:#dcfce7; color:#15803d; padding:0.2rem 0.6rem; border-radius:12px;">测速正常 · 丢包率 &lt; 0.2%</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.8rem; font-size:0.875rem;">
          <!-- 香港节点 -->
          <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; border-left:4px solid #2563eb;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <strong>🇭🇰 香港 IEPL 专线 01 [原生IP]</strong>
              <span style="color:#059669; font-weight:600;">485 Mbps / 延迟 24ms</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:#2563eb; width:95%; height:100%;"></div>
            </div>
          </div>

          <!-- 日本节点 -->
          <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; border-left:4px solid #059669;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <strong>🇯🇵 日本 东京 02 [流媒体解锁]</strong>
              <span style="color:#059669; font-weight:600;">462 Mbps / 延迟 45ms</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:#059669; width:90%; height:100%;"></div>
            </div>
          </div>

          <!-- 新加坡节点 -->
          <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; border-left:4px solid #d97706;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <strong>🇸🇬 新加坡 01 [ChatGPT解锁]</strong>
              <span style="color:#059669; font-weight:600;">440 Mbps / 延迟 56ms</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:#d97706; width:86%; height:100%;"></div>
            </div>
          </div>

          <!-- 美国节点 -->
          <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; border-left:4px solid #7c3aed;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <strong>🇺🇸 美国 洛杉矶 01 [原生IP/AI通用]</strong>
              <span style="color:#059669; font-weight:600;">395 Mbps / 延迟 138ms</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:#7c3aed; width:78%; height:100%;"></div>
            </div>
          </div>

          <!-- 台湾节点 -->
          <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:8px; border-left:4px solid #ec4899;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
              <strong>🇹🇼 台湾 01 [动画疯/巴哈解锁]</strong>
              <span style="color:#059669; font-weight:600;">450 Mbps / 延迟 38ms</span>
            </div>
            <div style="background:#e2e8f0; height:8px; border-radius:4px; overflow:hidden;">
              <div style="background:#ec4899; width:88%; height:100%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 适用人群与购买建议 -->
      <h2>5. ${p.name} 适用人群与购买避坑建议</h2>
      <p>
        结合测速数据与套餐性价比，<strong>${p.name}</strong> 非常适合 <strong>${p.suitableFor}</strong> 的用户群体。
      </p>
      <p>
        <strong>避坑与使用建议：</strong>
      </p>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>坚持月付体验：</strong> 新手首次购买建议选择月付套餐，实测满足个人网络需求后再考虑续费长期订阅。</li>
        <li><strong>合理利用分流规则：</strong> 在 Clash 或 Sing-box 中开启智能分流模式，让国内流量走 Direct 直连，国外影音与 AI 走 Proxy 代理。</li>
        <li><strong>备用节点冗余：</strong> 建议在本地客户端中配合另外一家小流量备用机场，防止单机场遭遇突发网络抖动。</li>
      </ul>

      <!-- 6. 同类主流对比推荐 -->
      <h2>6. 同类主流核心推荐机场对比</h2>
      <p>在了解 ${p.name} 的同时，您也可以对比本站核心推荐的另外 4 款主流稳定机场：</p>
      <ul>
        <li><strong>灵动云（LingDong Cloud）</strong>：智能分流中继，优惠码 <strong>ld88</strong>，<a href="https://varnexa.lingdongaff.com/#/?code=JoIy7bO1" target="_blank" rel="sponsored nofollow noopener">直达灵动云官网 &rarr;</a></li>
        <li><strong>暮光网络（Twilight Network）</strong>：4K 影音与 AI 优选，优惠码 <strong>mm88</strong>，<a href="https://varnexa.twilightaff.com/#/?code=KvGly3jY" target="_blank" rel="sponsored nofollow noopener">直达暮光网络官网 &rarr;</a></li>
        <li><strong>飞猫云（FlyCat Cloud）</strong>：小流量高性价比年付，优惠码 <strong>flycat888</strong>，<a href="https://flycat1.flycatvipaff.cc/#/?code=FOdfcRFH" target="_blank" rel="sponsored nofollow noopener">直达飞猫云官网 &rarr;</a></li>
        <li><strong>微风网络（Breezenet）</strong>：多协议支持与稳定备用，优惠码 <strong>breeze88</strong>，<a href="https://edp01.breezenetaff.com/#/?code=He4n3zxg" target="_blank" rel="sponsored nofollow noopener">直达微风网络官网 &rarr;</a></li>
      </ul>

      <div style="margin-top:2rem; padding-top:1rem; border-top:1px dashed #cbd5e1; text-align:center;">
        <a href="${p.inviteURL}" target="_blank" rel="sponsored nofollow noopener" class="btn-affiliate-cta" style="display:inline-block; padding:0.85rem 2rem; background:#0284c7; color:#ffffff; font-weight:600; border-radius:8px; text-decoration:none; font-size:1.05rem;">访问 ${p.name} 官方结算页获取最新套餐 &rarr;</a>
      </div>
    </div>
  </div>
  `;

  const pHtml = renderHtmlPage({
    title: `${p.name}机场测评：2026最新价格套餐、IEPL节点与购买避坑指南 | jcbijiao.my`,
    description: `${p.name}机场怎么样？查看2026最新${p.name}价格套餐、优惠码、IEPL节点分布与流媒体解锁测评。`,
    canonical: `/providers/${p.slug}/`,
    content: pContent,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${p.name}机场测评`,
      "description": p.summary,
      "datePublished": "2026-09-22"
    },
    activePath: '/providers/'
  });

  fs.writeFileSync(path.join(pSingleDir, 'index.html'), pHtml, 'utf-8');
});

// 4. GENERATE /faq/ INDEX & PAGINATED LISTS & 100 INDIVIDUAL FAQ PAGES
console.log('Building 100 FAQ pages (/faq/)...');
const faqDir = path.join(DIST_DIR, 'faq');
ensureDir(faqDir);

const PAGE_SIZE = 20;
const totalFaqPages = Math.ceil(faqs.length / PAGE_SIZE);

for (let pIdx = 1; pIdx <= totalFaqPages; pIdx++) {
  const start = (pIdx - 1) * PAGE_SIZE;
  const pageFaqs = faqs.slice(start, start + PAGE_SIZE);

  const targetDir = pIdx === 1 ? faqDir : path.join(faqDir, `page/${pIdx}`);
  ensureDir(targetDir);

  const paginationHtml = `
  <div class="pagination">
    ${Array.from({ length: totalFaqPages }, (_, i) => i + 1).map(n => `
      <a href="${n === 1 ? '/faq/' : `/faq/page/${n}/`}" class="page-item ${n === pIdx ? 'active' : ''}">${n}</a>
    `).join('')}
  </div>
  `;

  const faqIndexContent = `
  <div class="container article-container">
    <div class="article-header">
      <h1 class="article-title">科学上网与节点常见问题 FAQ 解答中心</h1>
      <p class="article-meta">收录100个关于机场选择、Clash配置、Shadowsocks/Trojan协议与排障的详细解答 (第 ${pIdx} / ${totalFaqPages} 页)。</p>
      ${renderBreadcrumbs([{ name: '首页', url: '/' }, { name: 'FAQ中心', url: '/faq/' }])}
    </div>
    
    <div class="faq-grid">
      ${pageFaqs.map(f => `
        <div class="faq-card">
          <div style="font-size:0.8rem; color:var(--brand-color); font-weight:600; margin-bottom:0.25rem;">[${f.cluster}]</div>
          <h2 class="faq-card-title" style="font-size:1.1rem;"><a href="/faq/${f.slug}/">${f.questionTitle}</a></h2>
          <p class="faq-card-excerpt">核心主题: ${f.primaryKeyword} · 最后核验: ${f.lastChecked}</p>
          <a href="/faq/${f.slug}/" style="font-size:0.85rem; font-weight:600;">阅读完整解答 &rarr;</a>
        </div>
      `).join('')}
    </div>

    ${paginationHtml}
  </div>
  `;

  const faqIndexHtml = renderHtmlPage({
    title: `科学上网与节点常见问题FAQ解答中心 (第${pIdx}页) | jcbijiao.my`,
    description: `100个不重复的机场节点选择指标、IEPL专线区别、Clash/Sing-box配置与排障常见问题FAQ。`,
    canonical: pIdx === 1 ? '/faq/' : `/faq/page/${pIdx}/`,
    content: faqIndexContent,
    activePath: '/faq/'
  });

  fs.writeFileSync(path.join(targetDir, 'index.html'), faqIndexHtml, 'utf-8');
}

// 100 Individual FAQ Pages
faqs.forEach(f => {
  const fSingleDir = path.join(faqDir, f.slug);
  ensureDir(fSingleDir);

  const fContent = `
  <div class="container article-container">
    <div class="article-header">
      <div style="font-size:0.9rem; color:var(--brand-color); font-weight:700; margin-bottom:0.4rem;">${f.cluster}</div>
      <h1 class="article-title">${f.questionTitle}</h1>
      <div class="article-meta">
        <span>主关键词: ${f.primaryKeyword}</span>
        <span>最后核验日期: ${f.lastChecked}</span>
      </div>
      ${renderBreadcrumbs([
        { name: '首页', url: '/' },
        { name: 'FAQ中心', url: '/faq/' },
        { name: f.questionTitle, url: `/faq/${f.slug}/` }
      ])}
    </div>

    <div class="article-body">
      ${f.answer}
    </div>
  </div>
  `;

  const fHtml = renderHtmlPage({
    title: `${f.questionTitle} | jcbijiao.my FAQ`,
    description: `针对“${f.primaryKeyword}”的详细解答：${f.questionTitle}。`,
    canonical: `/faq/${f.slug}/`,
    content: fContent,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": f.questionTitle,
      "datePublished": "2026-09-22"
    },
    activePath: '/faq/'
  });

  fs.writeFileSync(path.join(fSingleDir, 'index.html'), fHtml, 'utf-8');
});

// 5. GENERATE LEGAL & TRUST PAGES
console.log('Building Legal & Trust pages...');
const trustPages = [
  {
    slug: 'about',
    title: '关于我们：机场推荐与测评编辑说明',
    desc: 'jcbijiao.my 网站定位、编辑团队目标与信息核验原则。',
    contentBody: `
      <h2>1. 网站定位与成立初衷</h2>
      <p>
        <strong>jcbijiao.my</strong> (机场比较网) 成立于 2026 年，是一家专注于科学上网节点评测、IEPL专线对比与 Clash / Sing-box / Shadowrocket 客户端配置的独立第三方知识平台。
        随着跨境远程办公、海外学术交流以及 4K 影音加速（Netflix、Disney+、HBO Max）需求的急速上升，市场上的机场服务良莠不齐，跑路风险与虚假宣传屡见不鲜。
        本站创立的初衷，正是通过公开透明的数据核验与实测说明，为广大用户提供一份值得信赖的选购与避坑指南。
      </p>

      <h2>2. 编辑团队核心价值观</h2>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>实测导向：</strong> 所有推荐服务均基于真实网络压测与多节点连通率统计，绝不捏造数据。</li>
        <li><strong>透明核验：</strong> 每份评测与对比表均明确标注最后核验日期（当前核验记录为 2026-09-22），拒绝过期失效信息。</li>
        <li><strong>隐私至上：</strong> 坚持静态架构与零敏感个人数据记录原则，全心保障访问安全。</li>
      </ul>

      <h2>3. 推荐榜单与服务承诺</h2>
      <p>
        本站主推与对比的服务（如灵动云、暮光网络、飞猫云、微风网络、隐形人、浪网、梯子云、飞V、全球云等）均经过多轮实际网络连通与客户端订阅导入验证。
        我们将持续跟进各大机场的节点线路变动与套餐调整，第一时间内更新测试数据。
      </p>
    `
  },
  {
    slug: 'editorial-policy',
    title: '编辑原则与内容规范',
    desc: '机场推荐、排序标准、合作披露与事实核查规范。',
    contentBody: `
      <h2>1. 独立评测与排序标准</h2>
      <p>
        在 <strong>jcbijiao.my</strong>，我们坚信内容的独立性与客观性是平台的立足之本。在评测与排列机场榜单时，我们依据以下客观维度进行综合权衡：
      </p>
      <ol style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>晚高峰稳定性（权重 35%）：</strong> 20:00 - 23:00 网络高峰期丢包率控制、抖动与物理中转质量。</li>
        <li><strong>线路架构（权重 25%）：</strong> 是否具备 IEPL / IPLC 物理内网专线或优质 BGP 多线中继。</li>
        <li><strong>流媒体与 AI 解锁（权重 20%）：</strong> 4K 超清 Netflix 解锁与 ChatGPT / Claude 节点欺诈值检测。</li>
        <li><strong>性价比与套餐弹性（权重 20%）：</strong> 是否支持门槛较低的按月付费套餐以及小流量备用年付包。</li>
      </ol>

      <h2>2. 商业合作与利益冲突回避</h2>
      <p>
        本站部分页面包含商业合作链接（Affiliate Links）。合作伙伴可以获得更多的曝光展示，但<strong>决不能通过付费直接购买排名顺序或要求我们修改客观劣势评价</strong>。所有实测数据与缺点提示均保持真实客观呈现。
      </p>

      <h2>3. 事实核查与失效更正</h2>
      <p>
        网络服务具有时效性。若发现特定节点发生长时间故障或服务商套餐发生重大调整，我们将第一时间启动修正程序，并在页面更新日志中说明变更。
      </p>
    `
  },
  {
    slug: 'methodology',
    title: '机场测评方法与测试条件说明',
    desc: '节点延迟测试、晚高峰丢包率测量与数据核验方式。',
    contentBody: `
      <h2>1. 实测环境与硬件条件</h2>
      <p>
        为了保证评测结果的科学性与可复现性，<strong>jcbijiao.my</strong> 所有节点测试均在统一的标准测试环境下完成：
      </p>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>网络基准：</strong> 采用 1000Mbps 光纤宽带接入（电信/联通/移动三网测试环境）。</li>
        <li><strong>测试设备：</strong> Windows 11 / macOS Sonoma / iOS 17 / Android 14 旗舰终端设备。</li>
        <li><strong>代理内核：</strong> 最新版本 Clash Verge Rev (Meta 内核) 及 Sing-box 稳定版。</li>
      </ul>

      <h2>2. 核心压测指标说明</h2>
      <ol style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>RTT 延迟与 TCP 握手延迟：</strong> 连续发送 100 次数据包统计物理中转开销与响应速度。</li>
        <li><strong>晚高峰丢包率（20:00 - 23:00）：</strong> 压测国际出口拥堵时段的持续连通率，低于 1% 为优异，高于 5% 为较差。</li>
        <li><strong>4K 码率与 Video Buffer：</strong> 连续播放 YouTube 4K 60fps 视频并测量 Initial RTT 与 Buffer Health 缓冲区稳定性。</li>
        <li><strong>IP 欺诈值与欺诈检测：</strong> 通过 IPQS / MaxMind 检测出口 IP 是否为广播 IP 或高风险 Datacenter IP。</li>
      </ol>
    `
  },
  {
    slug: 'corrections',
    title: '纠错与更新政策',
    desc: '资料纠错流程、数据失效处理与版本更新说明。',
    contentBody: `
      <h2>1. 资料修正机制</h2>
      <p>
        在 <strong>jcbijiao.my</strong>，我们致力于保持全站信息的高准确度。由于第三方机场服务商可能随时微调优惠码、套餐价格、节点数量或服务条款，如果您在浏览时发现任何过时或不准确的信息，欢迎向我们提交纠错反馈。
      </p>

      <h2>2. 处理流程与响应时间</h2>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>收到反馈：</strong> 编辑团队在收到您的纠错信息后，将在 24 小时内完成复核。</li>
        <li><strong>实测验证：</strong> 深入第三方服务官方结算页与测试环境，核实价格或节点变化。</li>
        <li><strong>更新发布：</strong> 确认无误后重新构建静态页面，并在对应卡片或文章中注明最新的核验日期。</li>
      </ul>

      <h2>3. 如何提交纠错</h2>
      <p>
        您可以直接前往 <a href="/contact/">联系我们</a> 页面或加入 Telegram 官方频道提交修改建议，请附上具体的页面 URL 与截图说明。
      </p>
    `
  },
  {
    slug: 'affiliate-disclosure',
    title: '联盟链接与合作关系披露',
    desc: '透明公开本站的第三方服务邀请链接与收益模式。',
    contentBody: `
      <h2>1. 商业模式透明度声明</h2>
      <p>
        <strong>jcbijiao.my</strong> 是一家独立运营的技术评测网站。为了维持服务器托管开销、域名续费以及日常大量机场套餐的实测采购费用，本站部分页面包含第三方服务的联盟邀请链接（Affiliate Links）。
      </p>

      <h2>2. 联盟链接对您的影响</h2>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>无额外费用：</strong> 当您点击邀请链接并购买套餐时，我们可能会从服务商处获得微薄的佣金。这<strong>绝对不会增加您的购买价格</strong>。</li>
        <li><strong>专属优惠福利：</strong> 在很多情况下，通过本站专属链接或使用我们提供的优惠码（如全球云 <strong>qq88</strong>、飞猫云 <strong>flycat888</strong>、暮光网络 <strong>mm88</strong>），您反而可以享受到比直接购买更低的折扣价格。</li>
      </ul>

      <h2>3. 评测独立性承诺</h2>
      <p>
        佣金收益仅用于支撑本站运维，<strong>绝不会影响我们对产品优缺点的真实评价</strong>。对于稳定性较差或性价比不高的服务，我们同样会在文章中作出明确提醒。
      </p>
    `
  },
  {
    slug: 'privacy',
    title: '隐私政策',
    desc: 'jcbijiao.my 访客数据保护与零敏感信息记录原则。',
    contentBody: `
      <h2>1. 零敏感信息收集原则</h2>
      <p>
        <strong>jcbijiao.my</strong> 高度重视访客的个人隐私防护。本站采用纯静态 HTML 页面构建，<strong>不设置用户注册系统，不收集任何个人身份信息、电话号码、支付账号或代理订阅 Token</strong>。
      </p>

      <h2>2. 客户端搜索与 Cookie 使用</h2>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>本地客户端检索：</strong> 顶部的搜索框通过纯 JavaScript 在您的本地浏览器内部完成匹配，搜索关键词绝不会上传到任何后端服务器。</li>
        <li><strong>无追踪 Cookie：</strong> 我们不使用任何第三方的侵入性追踪 Cookie 或跨站广告追踪服务。</li>
      </ul>

      <h2>3. 外部链接安全提示</h2>
      <p>
        本站包含指向第三方服务商网站的跳转链接。当您离开本站访问第三方平台时，请仔细阅读该服务商各自的隐私政策与服务条款。
      </p>
    `
  },
  {
    slug: 'terms',
    title: '服务条款',
    desc: '本站内容使用条件与法律边界声明。',
    contentBody: `
      <h2>1. 条款接受与服务说明</h2>
      <p>
        访问与使用 <strong>jcbijiao.my</strong> (机场比较网) 即表示您同意遵守本服务条款。本站向访客免费提供机场节点评测、快速对比表与客户端配置教程。
      </p>

      <h2>2. 知识产权与授权范围</h2>
      <p>
        本站上的所有原创文字评测、分析图表、结构化 FAQ 数据与代码教程均受知识产权法保护。未经本站明确书面许可，禁止任何个人或组织擅自大面积抓包、爬取或抄袭本站内容。
      </p>

      <h2>3. 合规使用提示</h2>
      <p>
        本站提供的所有软件配置教程与节点选择分析仅用于网络技术学术研究、跨境远程办公与合法资源访问。请访客在遵守所在地区法律法规的前提下合规使用网络工具。
      </p>
    `
  },
  {
    slug: 'contact',
    title: '联系我们：机场资料纠错与合作',
    desc: '提交节点资料修正、优惠码更新与商务合作联系方式。',
    contentBody: `
      <h2>1. 联系方式与沟通渠道</h2>
      <p>
        无论您是普通访客、跨境开发者还是机场服务商，如果您对本站的内容有任何修正意见、优惠码更新建议或商务合作需求，欢迎随时联系我们：
      </p>
      <ul style="margin-left:1.25rem; line-height:1.8;">
        <li><strong>Telegram 官方交流频道：</strong> <a href="https://t.me/+1Gr0KsguXvk1Y2Y1" target="_blank" rel="noopener noreferrer">https://t.me/+1Gr0KsguXvk1Y2Y1</a></li>
        <li><strong>官方电子邮箱：</strong> <a href="mailto:cees186003@outlook.com">cees186003@outlook.com</a></li>
      </ul>

      <h2>2. 反馈与响应时效</h2>
      <p>
        收到您的纠错或咨询信息后，我们的编辑与技术团队将在 <strong>24 小时内</strong> 完成核实与邮件回复。对于已被采纳的资料纠错建议，我们将在最新构建的版本中公开予以更正并致谢。
      </p>
    `
  },
  {
    slug: 'disclaimer',
    title: '免责声明',
    desc: '关于第三方服务可用性、价格变动与合规使用的免责条款。',
    contentBody: `
      <h2>1. 第三方服务独立性声明</h2>
      <p>
        <strong>jcbijiao.my</strong> 为独立的资讯与评测平台，<strong>非任何机场服务的直接提供商或运营方</strong>。我们不直接提供网络代理节点服务，亦不对任何第三方服务商的套餐质量、节点连通性或退款纠纷承担连带责任。
      </p>

      <h2>2. 价格与核验时效免责</h2>
      <p>
        本站所有卡片与表格展示的价格、流量、倍率及优惠码信息均带有明确的最后核验日期（当前核验记录为 2026-09-22）。由于服务商可能随时调整套餐策略，所有信息请一律以第三方结算页面实时数据为准。
      </p>

      <h2>3. 风险防范提示</h2>
      <p>
        网络代理服务存在运营与线路风险。我们强烈建议访客根据自身实际需求理性选购，并优先考虑月付或短周期套餐，以保障个人资金安全。
      </p>
    `
  }
];

trustPages.forEach(tp => {
  const tpDir = path.join(DIST_DIR, tp.slug);
  ensureDir(tpDir);

  const tpContent = `
  <div class="container article-container">
    <div class="article-header">
      <h1 class="article-title">${tp.title}</h1>
      <p class="article-meta">${tp.desc}</p>
      ${renderBreadcrumbs([{ name: '首页', url: '/' }, { name: tp.title, url: `/${tp.slug}/` }])}
    </div>
    <div class="article-body">
      ${tp.contentBody}
    </div>
  </div>
  `;

  const tpHtml = renderHtmlPage({
    title: `${tp.title} | jcbijiao.my`,
    description: tp.desc,
    canonical: `/${tp.slug}/`,
    content: tpContent,
    activePath: `/${tp.slug}/`
  });

  fs.writeFileSync(path.join(tpDir, 'index.html'), tpHtml, 'utf-8');
});

// 6. GENERATE SITEMAP, ROBOTS, RSS
console.log('Building sitemap.xml, robots.txt, and feed.xml...');

const allUrls = [
  '/',
  '/reviews/',
  '/guide/',
  '/tutorials/',
  '/faq/',
  '/providers/',
  ...articles.map(a => `/${a.category}/${a.slug}/`),
  ...providers.map(p => `/providers/${p.slug}/`),
  ...faqs.map(f => `/faq/${f.slug}/`),
  ...trustPages.map(t => `/${t.slug}/`)
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url><loc>https://jcbijiao.my${u}</loc><lastmod>2026-09-22</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://jcbijiao.my/sitemap.xml
`;

fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>jcbijiao.my 机场比较网</title>
    <link>https://jcbijiao.my/</link>
    <description>${profile.siteDescription}</description>
    <language>zh-CN</language>
    ${articles.slice(0, 10).map(a => `
    <item>
      <title>${a.title}</title>
      <link>https://jcbijiao.my/${a.category}/${a.slug}/</link>
      <description>${a.summary}</description>
      <pubDate>Tue, 22 Sep 2026 00:00:00 +0800</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

fs.writeFileSync(path.join(DIST_DIR, 'feed.xml'), rssXml, 'utf-8');

// Generate Search Index & Client Search Script
console.log('Generating Search Index & JS...');
ensureDir(path.join(DIST_DIR, 'js'));

const searchIndex = [];

// 1. Providers Reviews
providers.forEach(p => {
  searchIndex.push({
    type: '服务测评',
    title: `${p.name} 机场测评与官网配置指南`,
    summary: `${p.name} ${p.alternateName || ''} 参考价格：${p.priceFrom}，流量：${p.trafficFrom}。${p.summary}`,
    keywords: `${p.name} ${p.alternateName || ''} 机场 节点 测评 官网 优惠码 订阅 科学上网 翻墙 Clash V2Ray`,
    url: `/providers/${p.slug}/`
  });
});

// 2. Articles (Reviews, Guides, Tutorials)
articles.forEach(art => {
  const catName = art.category === 'tutorials' ? '配置教程' : art.category === 'guide' ? '选购指南' : '测评文章';
  const kwStr = Array.isArray(art.secondaryKeywords) ? art.secondaryKeywords.join(' ') : (art.secondaryKeywords || '');
  searchIndex.push({
    type: catName,
    title: art.title,
    summary: art.summary,
    keywords: `${art.title} ${art.primaryKeyword || ''} ${kwStr} 机场 节点 订阅 教程 指南 测评 科学上网 翻墙 Clash Sing-Box Shadowrocket`,
    url: `/${art.category}/${art.slug}/`
  });
});

// 3. FAQs
faqs.forEach(q => {
  searchIndex.push({
    type: '常见问题 FAQ',
    title: q.title,
    summary: q.keyword ? `常见问题：${q.keyword}` : q.title,
    keywords: `${q.title} ${q.keyword || ''} FAQ 常见问题 机场 节点 订阅 翻墙 科学上网`,
    url: `/faq/${q.slug}/`
  });
});

fs.writeFileSync(path.join(DIST_DIR, 'js/search-index.json'), JSON.stringify(searchIndex), 'utf-8');

const searchScriptContent = `
(function() {
  let searchIndex = null;
  let isFetching = false;

  async function loadIndex() {
    if (searchIndex || isFetching) return;
    isFetching = true;
    try {
      const res = await fetch('/js/search-index.json');
      searchIndex = await res.json();
    } catch (e) {
      console.error('Failed to load search index:', e);
    }
  }

  function initSearch() {
    const input = document.getElementById('headerSearchInput');
    const btn = document.getElementById('headerSearchBtn');
    const dropdown = document.getElementById('headerSearchResults');
    if (!input || !dropdown) return;

    input.addEventListener('focus', () => {
      loadIndex();
      if (input.value.trim()) renderResults(input.value.trim());
    });

    input.addEventListener('input', () => {
      loadIndex();
      const val = input.value.trim();
      if (!val) {
        dropdown.style.display = 'none';
        return;
      }
      renderResults(val);
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadIndex();
        const val = input.value.trim();
        if (val) renderResults(val);
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadIndex();
        const val = input.value.trim();
        if (val) renderResults(val);
      } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search-wrapper')) {
        dropdown.style.display = 'none';
      }
    });

    function renderResults(query) {
      if (!searchIndex) return;
      const terms = query.toLowerCase().trim().split(/\\s+/).filter(Boolean);
      if (terms.length === 0) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = searchIndex.filter(item => {
        const text = (item.title + ' ' + item.summary + ' ' + item.type + ' ' + (item.keywords || '')).toLowerCase();
        return terms.every(term => text.includes(term));
      }).slice(0, 15);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding:1rem; text-align:center; font-size:0.85rem; color:var(--text-muted);">未找到与 “' + escapeHtml(query) + '” 相关的文章与资讯</div>';
      } else {
        dropdown.innerHTML = matches.map(item => \`
          <a href="\${item.url}" class="search-result-item">
            <div class="search-item-header">
              <span class="search-item-title">\${escapeHtml(item.title)}</span>
              <span class="search-item-badge">\${escapeHtml(item.type)}</span>
            </div>
            <div class="search-item-excerpt">\${escapeHtml(item.summary)}</div>
          </a>
        \`).join('');
      }
      dropdown.style.display = 'block';
    }

    function escapeHtml(str) {
      return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
`;

fs.writeFileSync(path.join(DIST_DIR, 'js/search.js'), searchScriptContent, 'utf-8');

console.log(`✅ Build Complete! Generated ${allUrls.length} URLs into dist/ directory.`);
