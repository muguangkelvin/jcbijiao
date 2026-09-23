# jcbijiao.my - 机场比较网 (2026)

> 纯静态 Clean White 风格长文博客与知识库系统，专注于 2026 年机场节点对比与推荐、科学上网网络测速、节点订阅评测与客户端配置教程。

## 🌟 核心特性
- **Clean White 极简设计**: 优雅白底无打扰长文排版，适配桌面与移动端响应式视图。
- **SEO 独家 Profile 配置**: 全站单一定义源 `docs/site-seo-profile.json`，支持快捷整体替换活动关键词与导航。
- **固定核心主推榜单**: 全站统一推广顺序（1.灵动云, 2.暮光网络, 3.飞猫云, 4.微风网络, 5.隐形人, 6.浪网, 7.梯子云, 8.飞V, 9.全球云），邀请链接带 `rel="sponsored nofollow noopener"`。
- **28 家服务独立测评**: 覆盖全量 28 家机场服务商，生成规范测评页 (`/providers/{slug}/`)，单篇控制在 800-1200 中文字符。
- **100 个 AI 生成 FAQ 矩阵**: 9 大主题分类配额（18, 14, 10, 10, 8, 14, 10, 8, 8），结构化问答与 5 页分页浏览。
- **3 篇 AI 机场推荐专文**: 在 `/tutorials/` 中融入 ChatGPT/Claude/Gemini 节点选购指南。
- **零公开第三方博客名称**: 遵循参考博客隔离规范，绝不暴露内部参考源名称。

## 🚀 快速开始

### 安装与依赖
```bash
# 项目使用标准 Node.js 内置模块，无外部重型依赖
node -v
```

### 构建生产静态文件
```bash
node scripts/generate-faqs.js
node scripts/generate-articles.js
node scripts/generate-provider-matrix.js
npm run build
```
静态文件将生成至 `dist/` 目录。

### 运行自动化验证脚本
```bash
npm run verify
```

### 本地预览服务器
```bash
npm run preview
```
访问 [http://localhost:3000](http://localhost:3000) 即可预览。

## 📁 目录结构
```
jcbijiao.my/
├── docs/                      # SEO Profile、矩阵与部署文档
│   ├── site-seo-profile.json  # SEO 核心配置文件
│   ├── faq-keywords-100.csv   # 100个FAQ分配表
│   ├── faq-content-matrix.md  # FAQ 内容矩阵
│   ├── navigation-content-matrix.md # 导航文章矩阵
│   ├── provider-review-matrix.md   # 28家测评矩阵
│   ├── keyword-coverage.csv   # 关键词覆盖率
│   └── launch-checklist.md    # 部署上线清单
├── src/
│   ├── data/                  # 结构化 JSON 数据 (providers, faqs, articles)
│   ├── styles/                # Clean White 样式表 (clean-white.css)
│   └── generator/             # SSG 静态 HTML 构建引擎 (build.js)
├── scripts/
│   ├── generate-faqs.js       # 生成 100 FAQ 数据
│   ├── generate-articles.js   # 生成导航文章数据
│   ├── generate-provider-matrix.js # 生成测评矩阵
│   ├── verify.js              # 自动化 SEO/语法/黑名单测试
│   └── server.js              # 本地 HTTP 预览服务
├── dist/                      # 静态输出目录 (生产环境部署)
├── package.json
├── AGENTS.md
└── README.md
```

## 📄 License
MIT License.
