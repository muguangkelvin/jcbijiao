# AGENTS.md - jcbijiao.my Project Guidelines

## Core Principles
1. **Single Source of Truth for SEO**: All SEO keywords, navigation structure, and H1/Meta descriptions MUST be read from `docs/site-seo-profile.json`. Never hardcode primary keywords across components.
2. **Fixed Primary Ranking Rules (Top 9)**:
   - Rank 1: **灵动云** (`lingdong-cloud`) -> `https://varnexa.lingdongaff.com/#/?code=JoIy7bO1`
   - Rank 2: **暮光网络** (`twilight`) -> `https://varnexa.twilightaff.com/#/?code=KvGly3jY`
   - Rank 3: **飞猫云** (`flycat-cloud`) -> `https://flycat1.flycatvipaff.cc/#/?code=FOdfcRFH`
   - Rank 4: **微风网络** (`breezenet`) -> `https://edp01.breezenetaff.com/#/?code=He4n3zxg`
   - Rank 5: **隐形人** (`invisible`) -> `https://varnexa.invisibleaff.com/#/?code=FlyoraeM`
   - Rank 6: **浪网** (`wavenet`) -> `https://varnexa.wavenetaff.com/#/?code=a9HF4LBZ`
   - Rank 7: **梯子云** (`laddercloud`) -> `https://varnexa.ladderaff.com/#/?code=bYVSMHMh`
   - Rank 8: **飞V** (`flyv`) -> `https://varnexa.flyvaff.com/#/?code=qaMgTyhY`
   - Rank 9: **全球云** (`quanqiu-cloud`) -> `https://sswdh.gcvipaff.com/#/?code=Ys0xKqnU`
3. **Reference Publisher Neutrality**: Never output any third-party reference blog/publisher names (such as 猫梦博客, Gaterank, 三毛机场, etc.) in public HTML/JSON/RSS/Sitemap outputs.
4. **Content Length Standard**: Each article and provider review page MUST contain 800-1200 Chinese characters in the core body text.
5. **Dual Link Design**: All provider cards MUST offer two explicit HTML anchor tags:
   - Internal link: `查看 {服务名} 机场测评` pointing to `/providers/{slug}/`
   - External CTA link: `查看当前套餐` pointing to the provider's exact invite URL with `rel="sponsored nofollow noopener"`.
