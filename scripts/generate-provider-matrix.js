const fs = require('fs');
const path = require('path');

const providers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/providers.json'), 'utf-8'));

let md = `# Provider Review Matrix (28 Independent Provider Reviews)\n\nTotal Providers: ${providers.length}\n\n| Rank | Name | Slug | Canonical URL | Primary Keyword | Coupon | Last Checked |\n|---|---|---|---|---|---|---|\n`;

providers.forEach(p => {
  md += `| ${p.rank} | ${p.name} | ${p.slug} | [https://jcbijiao.my/providers/${p.slug}/](file:///c:/Users/USER/Desktop/%E5%BE%AE%E5%8D%9A/jcbijiao.my/dist/providers/${p.slug}/index.html) | ${p.name}机场测评 | ${p.coupon || '无'} | ${p.lastChecked} |\n`;
});

fs.writeFileSync(path.join(__dirname, '../docs/provider-review-matrix.md'), md, 'utf-8');
console.log('Successfully generated docs/provider-review-matrix.md.');
