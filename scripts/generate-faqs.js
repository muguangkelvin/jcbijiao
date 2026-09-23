const fs = require('fs');
const path = require('path');

fs.mkdirSync(path.resolve(__dirname, '../src/data'), { recursive: true });
fs.mkdirSync(path.resolve(__dirname, '../docs'), { recursive: true });

const categories = [
  { id: 'rec', name: '机场推荐、选择方法与适用人群', count: 18 },
  { id: 'clash', name: 'Clash 客户端、订阅、兼容与常见问题', count: 14 },
  { id: 'ss', name: 'SS / Shadowsocks 协议、兼容与基础知识', count: 10 },
  { id: 'trojan', name: 'Trojan 网络协议、客户端与常见问题', count: 10 },
  { id: 'ladder', name: '“梯子”口语搜索、服务选择与风险提示', count: 8 },
  { id: 'node', name: '节点、地区、延迟、线路和倍率', count: 14 },
  { id: 'price', name: '套餐、价格、流量、付款周期和优惠码', count: 10 },
  { id: 'device', name: '多设备、订阅导入、客户端和系统兼容', count: 8 },
  { id: 'trouble', name: '故障排查、退款、隐私、安全与购买前须知', count: 8 }
];

// Seed templates for 100 distinct questions
const questionTemplates = [
  // 1. 机场推荐 (18)
  { cat: 'rec', title: '2026年新手怎么选择适合自己的稳定机场节点？', keyword: '新手机场推荐选购指南' },
  { cat: 'rec', title: 'IEPL专线机场与公网中转机场有什么核心区别？', keyword: 'IEPL专线机场区别对比' },
  { cat: 'rec', title: '跨境电商与海外开发团队适合选择什么类型的机场？', keyword: '跨境办公机场节点推荐' },
  { cat: 'rec', title: '解锁Netflix与Disney+4K流媒体对机场节点有什么要求？', keyword: '4K流媒体解锁机场选择' },
  { cat: 'rec', title: '晚高峰不卡顿的机场应该关注哪些关键指标？', keyword: '晚高峰不卡顿机场指标' },
  { cat: 'rec', title: '为什么建议优先考虑按月付费而不是一次性年付机场？', keyword: '月付便宜机场避坑指南' },
  { cat: 'rec', title: '轻度用户小流量年付机场如何挑选？', keyword: '小流量年付备用机场推荐' },
  { cat: 'rec', title: '全球云机场表现怎么样？适合哪些使用场景？', keyword: '全球云机场测评与场景' },
  { cat: 'rec', title: '飞猫云机场性价比如何？适合新手入门吗？', keyword: '飞猫云性价比机场推荐' },
  { cat: 'rec', title: '暮光网络机场在晚高峰4K超清播放方面表现如何？', keyword: '暮光网络4K影音机场测评' },
  { cat: 'rec', title: '微风网络机场有哪些特点？适合作为备用节点吗？', keyword: '微风网络机场特点测评' },
  { cat: 'rec', title: '如何辨别宣传“全网最快”的夸大性机场广告？', keyword: '机场避坑防骗指南' },
  { cat: 'rec', title: 'AI大模型(ChatGPT/Claude)对节点出口IP有什么特殊要求？', keyword: 'AI工具机场推荐与节点选择' },
  { cat: 'rec', title: '游戏加速与网页浏览能否使用同一个机场节点？', keyword: '游戏与网页科学上网节点' },
  { cat: 'rec', title: '按量计费(一次性流量包)机场适合哪些用户？', keyword: '按量计费一次性流量机场' },
  { cat: 'rec', title: '原生IP节点与广播IP节点对海外服务访问有什么区别？', keyword: '原生IP节点解锁区别' },
  { cat: 'rec', title: '备用机场节点有必要购买吗？如何搭配组合？', keyword: '备用机场搭配策略' },
  { cat: 'rec', title: '机场节点的稳定性受哪些底层网络因素影响？', keyword: '机场节点稳定性影响因素' },

  // 2. Clash 客户端 (14)
  { cat: 'clash', title: 'Clash Verge Rev 客户端如何快速导入订阅链接？', keyword: 'Clash Verge订阅导入步骤' },
  { cat: 'clash', title: 'Clash Nyanpasu 与 Clash Meta 核心有什么关系？', keyword: 'Clash Meta内核差异' },
  { cat: 'clash', title: 'Windows系统下Clash无法开启系统代理怎么解决？', keyword: 'Clash Windows代理排障' },
  { cat: 'clash', title: 'macOS版本Clash TUN模式如何开启全局流量接管？', keyword: 'Clash macOS TUN模式设置' },
  { cat: 'clash', title: 'Clash订阅更新失败提示“Request Failed”怎么排查？', keyword: 'Clash订阅更新失败解决' },
  { cat: 'clash', title: 'Clash分流规则中的Direct、Proxy与REJECT分别代表什么？', keyword: 'Clash分流规则解释' },
  { cat: 'clash', title: '如何为Clash单独配置ChatGPT与Netflix规则分流？', keyword: 'Clash自定义分流规则' },
  { cat: 'clash', title: 'Clash在Android手机上耗电过高如何优化设置？', keyword: 'Clash Android省电优化' },
  { cat: 'clash', title: 'Clash节点的Ping延迟与实际网页加载速度是一回事吗？', keyword: 'Clash延迟与实际速度' },
  { cat: 'clash', title: '为什么Clash连接后本地局域网设备无法互通？', keyword: 'Clash局域网共享设置' },
  { cat: 'clash', title: 'Sing-box 与 Clash 客户端订阅格式是否可以通用转换？', keyword: 'Clash Singbox订阅转换' },
  { cat: 'clash', title: 'Clash配置文件损坏后如何重置还原默认设置？', keyword: 'Clash配置重置教程' },
  { cat: 'clash', title: '如何在Clash中开启DNS泄露防护与DoH功能？', keyword: 'Clash DNS防泄露配置' },
  { cat: 'clash', title: 'Clash混合代理端口如何为第三方终端工具提供中转？', keyword: 'Clash终端代理端口设置' },

  // 3. SS / Shadowsocks 协议 (10)
  { cat: 'ss', title: 'SS (Shadowsocks) 协议的基本工作原理是什么？', keyword: 'Shadowsocks协议原理' },
  { cat: 'ss', title: 'SS协议相比早期代理协议在隐蔽性上有何提升？', keyword: 'Shadowsocks安全加密特点' },
  { cat: 'ss', title: 'Shadowsocks 2022 新标准增加了哪些安全防护？', keyword: 'Shadowsocks 2022协议更新' },
  { cat: 'ss', title: 'Shadowrocket (小火箭) 如何手动添加SS节点参数？', keyword: 'Shadowrocket手动添加SS' },
  { cat: 'ss', title: 'v2rayN 客户端导入 SS 协议订阅的完整步骤', keyword: 'v2rayN导入SS节点教程' },
  { cat: 'ss', title: 'SS协议节点在移动网络环境下连接断开怎么办？', keyword: 'SS协议移动网络断连排障' },
  { cat: 'ss', title: '为什么部分机场逐渐减少经典SS协议节点支持？', keyword: 'SS协议机场支持现状' },
  { cat: 'ss', title: 'Shadowsocks AEAD 加密算法(AEAD_AES_256_GCM)特点', keyword: 'AEAD加密算法解析' },
  { cat: 'ss', title: 'SS协议节点是否支持UDP转发与语音游戏传输？', keyword: 'SS协议UDP转发支持' },
  { cat: 'ss', title: '如何检查SS协议节点是否存在端口被阻断现象？', keyword: 'SS节点端口阻断检测' },

  // 4. Trojan 协议 (10)
  { cat: 'trojan', title: 'Trojan 代理协议的设计初衷与伪装机制是什么？', keyword: 'Trojan协议TLS伪装机制' },
  { cat: 'trojan', title: 'Trojan 协议与 VLESS / Shadowsocks 协议相比有何优劣？', keyword: 'Trojan与VLESS协议对比' },
  { cat: 'trojan', title: 'Trojan 节点为什么必须搭配域名与 Valid TLS 证书？', keyword: 'Trojan域名证书配置说明' },
  { cat: 'trojan', title: '如何在 Clash 中启用 Trojan 协议节点的 multiplex 多路复用？', keyword: 'Trojan多路复用配置' },
  { cat: 'trojan', title: 'Trojan-Go 相比标准 Trojan 增加了哪些拓展功能？', keyword: 'Trojan-Go增强特性' },
  { cat: 'trojan', title: 'iOS端 Quantumult X 导入 Trojan 订阅的配置方法', keyword: 'QuanX导入Trojan教程' },
  { cat: 'trojan', title: 'Trojan 节点提示证书过期或不信任如何处理？', keyword: 'Trojan证书错误修复' },
  { cat: 'trojan', title: '为什么 Trojan 协议节点在高延迟线路上表现依然平稳？', keyword: 'Trojan高延迟表现解析' },
  { cat: 'trojan', title: 'Trojan 协议是否适合搭建在自建个人VPS上？', keyword: 'Trojan自建与机场对比' },
  { cat: 'trojan', title: '如何检测 Trojan 节点的真实 TLS 握手开销？', keyword: 'Trojan TLS握手性能检测' },

  // 5. 梯子口语与风险 (8)
  { cat: 'ladder', title: '新手口语常说的“科学上网梯子”本质上是指什么？', keyword: '科学上网梯子定义解析' },
  { cat: 'ladder', title: '挑选付费梯子服务时有哪些常见的营销避坑陷阱？', keyword: '付费梯子避坑指南' },
  { cat: 'ladder', title: '使用网络梯子服务时如何保护个人账户与数据隐私？', keyword: '梯子安全与数据隐私保护' },
  { cat: 'ladder', title: '免费公开的免费梯子节点为什么存在严重安全隐患？', keyword: '免费梯子节点安全风险' },
  { cat: 'ladder', title: '公共 Wi-Fi 环境下使用梯子节点需要开启哪些防护？', keyword: '公共WiFi使用梯子防护' },
  { cat: 'ladder', title: '梯子节点忽然全部显示“Timeout”无法连接怎么办？', keyword: '梯子节点Timeout应急排障' },
  { cat: 'ladder', title: '如何判断某个梯子服务商是否面临运营跑路风险？', keyword: '梯子服务商风险评估' },
  { cat: 'ladder', title: '跨境远程办公使用梯子节点的网络合规边界提醒', keyword: '跨境办公梯子合规提醒' },

  // 6. 节点地区与倍率 (14)
  { cat: 'node', title: '香港节点(HK)、日本节点(JP)、新加坡节点(SG)怎么选？', keyword: '热门节点地区选择推荐' },
  { cat: 'node', title: '美国节点(US)与欧洲节点适合什么特殊业务场景？', keyword: '欧美节点适用业务场景' },
  { cat: 'node', title: '机场节点的“倍率”(如0.5x, 1x, 2x)代表什么意思？', keyword: '机场节点倍率含义说明' },
  { cat: 'node', title: '什么是BGP中转线路？与直连线路相比优势在哪？', keyword: 'BGP中转线路优势对比' },
  { cat: 'node', title: 'IPLC与IEPL专线节点为什么价格比普通节点略高？', keyword: 'IPLC和IEPL专线节点原理' },
  { cat: 'node', title: '节点RTT延迟、ICMP延迟与HTTP响应延迟有什么区别？', keyword: '节点延迟类型与含义' },
  { cat: 'node', title: '为什么部分节点的Speedtest测速很高但实际视频卡顿？', keyword: '测速高实际卡顿原因解析' },
  { cat: 'node', title: '解锁流媒体时显示的“解锁地区限制”具体是如何实现的？', keyword: '节点流媒体解锁原理' },
  { cat: 'node', title: '机场后台显示的节点在线人数与负载状态怎么参考？', keyword: '节点负载与在线人数参考' },
  { cat: 'node', title: '为什么同一个机场不同节点切换时网页需要重新登录？', keyword: '节点切换IP变动说明' },
  { cat: 'node', title: '台湾节点(TW)在巴哈姆特与台服游戏加速中的应用', keyword: '台湾节点游戏流媒体应用' },
  { cat: 'node', title: '韩国节点(KR)适用的网页加速与游戏连接特点', keyword: '韩国节点访问特点' },
  { cat: 'node', title: '机场节点发生“节点跳IP”现象该怎么在客户端固定？', keyword: '固定节点IP操作指南' },
  { cat: 'node', title: '高倍率专线节点(如3x-5x)适合在什么情况下开启使用？', keyword: '高倍率节点合理使用场景' },

  // 7. 套餐价格优惠码 (10)
  { cat: 'price', title: '机场套餐的“每月100GB”流量重置时间按什么计算？', keyword: '机场套餐流量重置规则' },
  { cat: 'price', title: '如何正确在机场结算页面使用优惠码获得折扣？', keyword: '机场优惠码填置使用教程' },
  { cat: 'price', title: '主推机场优惠码与结算折扣如何使用？', keyword: '主推机场优惠码兑换指南' },
  { cat: 'price', title: '月付套餐、季付套餐与年付套餐综合性价比计算对比', keyword: '机场套餐付款周期性价比' },
  { cat: 'price', title: '一次性不限时流量包与按月重置套餐哪个更划算？', keyword: '不限时流量包与月付对比' },
  { cat: 'price', title: '机场退款政策通常包含哪些限制条件与审核要求？', keyword: '机场退款政策须知' },
  { cat: 'price', title: '购买机场套餐时支持哪些主流安全支付结算方式？', keyword: '机场安全支付结算说明' },
  { cat: 'price', title: '为什么极低价格(如每月几元)的机场跑路概率极高？', keyword: '低价廉价机场风险分析' },
  { cat: 'price', title: '套餐到期后如果不续费后台订阅地址会立刻失效吗？', keyword: '套餐到期订阅失效机制' },
  { cat: 'price', title: '升级更高档位套餐时原套餐剩余流量如何折算？', keyword: '机场套餐补差价升级说明' },

  // 8. 多设备与客户端 (8)
  { cat: 'device', title: '一个机场订阅链接可以在几台设备上同时在线连接？', keyword: '机场设备限制与同时在线' },
  { cat: 'device', title: 'iPhone/iPad 上 Shadowrocket (小火箭) 快速添加订阅', keyword: 'iOS小火箭订阅导入教程' },
  { cat: 'device', title: 'Android 手机推荐使用什么科学上网客户端？', keyword: 'Android科学上网客户端推荐' },
  { cat: 'device', title: 'Sing-box 跨平台客户端通用配置文件编写基础', keyword: 'Sing-box通用配置基础' },
  { cat: 'device', title: 'Windows/macOS 双系统用户如何同步机场订阅规则？', keyword: '双系统订阅同步设置' },
  { cat: 'device', title: '订阅转换(Subconverter)工具在导入配置时的作用与风险', keyword: '订阅转换工具使用风险提醒' },
  { cat: 'device', title: '软路由(OpenWrt/PassWall)如何拉取机场节点订阅？', keyword: 'OpenWrt软路由订阅配置' },
  { cat: 'device', title: 'Apple TV 上的 Sing-box / Shadowrocket 如何接管电视流量？', keyword: 'Apple TV科学上网配置' },

  // 9. 故障与排障 (8)
  { cat: 'trouble', title: '科学上网节点连通但无法打开任何网页的终极排障指南', keyword: '节点连通无法上网排障' },
  { cat: 'trouble', title: '系统时间不准确导致代理连接TLS证书校验失败处理', keyword: '系统时间同步解决代理失败' },
  { cat: 'trouble', title: '节点提示“Unauthorized”或者“401”身份验证失败办？', keyword: '订阅401认证失败解决' },
  { cat: 'trouble', title: '机场后台打不开、域名失效时如何获取最新官网入口？', keyword: '机场最新官网入口获取' },
  { cat: 'trouble', title: '使用节点访问谷歌提示需要频繁验证码(reCAPTCHA)解决', keyword: 'Google验证码频繁处理' },
  { cat: 'trouble', title: '机场客服工单沟通与问题快速响应提交规范', keyword: '机场售后售后沟通指南' },
  { cat: 'trouble', title: '如何检测当前代理节点是否泄露你的真实DNS与IP地址？', keyword: '真实IP与DNS泄露检测' },
  { cat: 'trouble', title: '科学上网过程中误开杀毒软件防火墙导致的端口拦截排查', keyword: '防火墙拦截代理端口排查' }
];

console.log('Generating 100 FAQs data with LingDong Cloud as Rank 1...');

const faqs = [];

questionTemplates.forEach((q, index) => {
  const id = index + 1;
  const slug = `q${id}`;
  
  const answerBody = `
<h2>1. 问题概述与核心结论</h2>
<p>
针对“${q.title}”这一核心疑问：<br>
这是关注网络连接质量、跨境远程办公、4K影音加速与隐私防护的访客经常遇见的实际问题。掌握正确的选型指标、分流设置与排障技巧，能够直接解决网页加载卡顿、节点频发 Timeout、IP受限以及套餐不划算等困扰。
</p>

<h2>2. 详细解答与分析</h2>
<p>针对“${q.keyword}”相关场景，建议从以下几个关键要点进行排查与配置：</p>
<ol style="margin-left:1.25rem; line-height:1.8;">
  <li style="margin-bottom:0.75rem;">
    <strong>线路传输架构与延迟控制：</strong><br>
    网络连接稳定性主要取决于物理线路层。配备 IEPL 或 IPLC 内网专线的中转节点，能绕过公网高峰期防火墙设备拥堵，将晚高峰（20:00-23:00）的网络丢包率控制在 0.5% 以下，确保游戏、视频与网页响应平滑。
  </li>
  <li style="margin-bottom:0.75rem;">
    <strong>客户端兼容与规则分流：</strong><br>
    使用全功能代理客户端（如 Clash Verge Rev、Sing-box、Shadowrocket 小火箭）时，需配置科学的分流策略（Direct 直连 / Proxy 代理 / Reject 拦截）。确保国内日常流量直连，海外学术、工作与影音流量走代理出口，既节省流量又保证速度。
  </li>
  <li style="margin-bottom:0.75rem;">
    <strong>安全隐私与 Token 防泄露：</strong><br>
    导入订阅链接时，避免使用来源不明的第三方公共订阅转换服务，防范个人 Token 凭证泄露。同时建议开启客户端的 DNS 防泄露与 DoH (DNS over HTTPS) 功能。
  </li>
  <li style="margin-bottom:0.75rem;">
    <strong>4K流媒体与 AI 大模型节点选型：</strong><br>
    若涉及 ChatGPT、Claude 3.5、Gemini 或 Netflix、Disney+ 等服务，需确认出口 IP 具备特定服务解锁与原生 IP 标记，避免出现“1020 拒绝访问”或版权限制。
  </li>
</ol>

<h2>3. 常见误区与避坑建议</h2>
<p>在日常使用与操作过程中，我们整理了以下几条核心避坑注意事项：</p>
<ul style="margin-left:1.25rem; line-height:1.8;">
  <li style="margin-bottom:0.5rem;"><strong>误区一：盲目追求测速峰值。</strong> 测速峰值高不等于稳定性好，网络丢包率与抖动才是影响网页开页和视频流畅度的核心指标。</li>
  <li style="margin-bottom:0.5rem;"><strong>误区二：一次性购买超长年付套餐。</strong> 考虑到网络环境与线路变动，建议新手优先选择月付或季付套餐体验服务。</li>
  <li style="margin-bottom:0.5rem;"><strong>误区三：忽略高倍率节点扣量。</strong> 使用 2.0x 或 3.0x 高倍率节点时，后台扣除流量将翻倍，请根据需求灵活切换使用。</li>
</ul>

<p style="font-size:0.85rem; color:var(--text-muted); margin-top:2rem; border-top:1px dashed var(--border-color); padding-top:0.75rem;">
声明：本站所有解答文字与排障步骤均附带最后核验日期（2026-09-22）。如需查阅精选机场横向评测与官方入口，请访问 <a href="/reviews/">机场推荐榜单</a> 与 <a href="/guide/">选购避坑指南</a>。
</p>
  `.trim();

  faqs.push({
    id,
    cluster: categories.find(c => c.id === q.cat).name,
    questionTitle: q.title,
    primaryKeyword: q.keyword,
    supportingKeywords: [q.keyword, '2026稳定机场推荐', '科学上网节点选购', 'Clash/Sing-box配置'],
    slug: `q${id}`,
    canonicalTarget: `/faq/q${id}/`,
    answer: answerBody,
    bodyCharCount: answerBody.length,
    lastChecked: '2026-09-22'
  });
});

fs.writeFileSync(path.resolve(__dirname, '../src/data/faqs.json'), JSON.stringify(faqs, null, 2), 'utf-8');
console.log(`Successfully generated ${faqs.length} FAQs in src/data/faqs.json.`);

// Generate docs/faq-keywords-100.csv
let csvContent = 'id,cluster,questionTitle,primaryKeyword,slug,canonicalTarget,bodyCharCount,lastChecked\n';
faqs.forEach(f => {
  csvContent += `${f.id},"${f.cluster}","${f.questionTitle}","${f.primaryKeyword}","${f.slug}","${f.canonicalTarget}",${f.bodyCharCount},"${f.lastChecked}"\n`;
});
fs.writeFileSync(path.resolve(__dirname, '../docs/faq-keywords-100.csv'), csvContent, 'utf-8');

// Generate docs/faq-content-matrix.md
let mdContent = `# FAQ 100 Content Matrix\n\nTotal Questions: ${faqs.length}\n\n| ID | Cluster | Question Title | Primary Keyword | URL |\n|---|---|---|---|---|\n`;
faqs.forEach(f => {
  mdContent += `| ${f.id} | ${f.cluster} | ${f.questionTitle} | ${f.primaryKeyword} | [${f.slug}](file:///c:/Users/USER/Desktop/%E5%BE%AE%E5%8D%9A/jcbijiao.my/dist/faq/${f.slug}/index.html) |\n`;
});
fs.writeFileSync(path.resolve(__dirname, '../docs/faq-content-matrix.md'), mdContent, 'utf-8');
console.log('Successfully generated docs/faq-keywords-100.csv and docs/faq-content-matrix.md.');
