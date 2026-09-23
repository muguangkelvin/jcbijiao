# Publishing & Maintenance Guide - jcbijiao.my

## Adding New Articles
1. Open `src/data/articles.json`.
2. Add a new article object following the schema:
   ```json
   {
     "id": 38,
     "category": "reviews",
     "title": "文章标题",
     "slug": "article-slug",
     "primaryKeyword": "目标关键词",
     "secondaryKeywords": ["辅助词1", "辅助词2"],
     "summary": "简短摘要",
     "body": "正文 Markdown / HTML 内容 (800-1200字)",
     "date": "2026-09-22",
     "lastmod": "2026-09-22",
     "author": "编辑部"
   }
   ```
3. Run `npm run build` to rebuild static HTML pages and updated sitemap.

## Updating Provider Data or Affiliate Links
1. Open `src/data/providers.json`.
2. Locate target provider and update `inviteURL`, `coupon`, `priceFrom`, or `lastChecked`.
3. Run `npm run build && npm run verify`.
