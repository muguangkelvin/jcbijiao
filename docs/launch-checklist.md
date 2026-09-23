# Launch Checklist - jcbijiao.my

## Pre-launch Verifications
- [x] All 150+ static HTML pages generated in `dist/`
- [x] Top 4 fixed providers ranking order verified (1.全球云, 2.飞猫云, 3.暮光网络, 4.微风网络)
- [x] Dual links rendered on all provider cards (Internal link + External affiliate link with `rel="sponsored nofollow noopener"`)
- [x] 100 AI-generated FAQs categorized and paginated
- [x] 28 independent provider reviews generated under `/providers/{slug}/`
- [x] 3 AI airport articles included in `/tutorials/`
- [x] Blocklist check passed (0 reference publisher names in public output)
- [x] `sitemap.xml`, `robots.txt`, `feed.xml` created and valid
- [x] JSON-LD schema validated across all templates

## Deployment Steps
1. Push workspace contents to Git repository.
2. Run `npm run build` to generate production assets in `dist/`.
3. Deploy `dist/` directory to static hosting (Cloudflare Pages, Vercel, Netlify, Nginx, GitHub Pages).
4. Configure domain DNS for `jcbijiao.my`.
5. Submit `https://jcbijiao.my/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
