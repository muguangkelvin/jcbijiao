const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const BLOCKLIST = [
  '猫梦博客', 'maomeng', 'Gaterank', 'gaterank', '三毛机场', 'sanmao',
  '星维机场', '一毛机场', '一份机场', '二毛博客', '根据某博客', '某评测站称'
];

console.log('🔍 Starting jcbijiao.my Site Verification Audit...\n');

let totalErrors = 0;
let totalWarnings = 0;
let fileCount = 0;

// Recursive file scanner
function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Error: dist/ directory does not exist. Run build script first.');
  process.exit(1);
}

const allFiles = scanDirectory(DIST_DIR);
console.log(`📁 Total generated output files: ${allFiles.length}`);

// 1. Core Root Files Check
const requiredRoots = ['index.html', 'sitemap.xml', 'robots.txt', 'feed.xml', 'css/clean-white.css'];
requiredRoots.forEach(req => {
  const fullP = path.join(DIST_DIR, req);
  if (!fs.existsSync(fullP)) {
    console.error(`❌ Error: Missing essential file ${req}`);
    totalErrors++;
  } else {
    console.log(`  ✓ Found ${req}`);
  }
});

// 2. Blocklist Scan
console.log('\n🛡️ Scanning for Reference Publisher Blocklist compliance...');
let blocklistViolations = 0;

allFiles.forEach(fp => {
  if (fp.endsWith('.html') || fp.endsWith('.json') || fp.endsWith('.xml')) {
    const content = fs.readFileSync(fp, 'utf-8');
    BLOCKLIST.forEach(term => {
      if (content.includes(term)) {
        console.error(`❌ Blocklist Violation: Found blocked term "${term}" in ${path.relative(DIST_DIR, fp)}`);
        blocklistViolations++;
        totalErrors++;
      }
    });
  }
});

if (blocklistViolations === 0) {
  console.log('  ✓ 100% Clean! Zero blocked reference publisher terms found.');
}

// 3. HTML Quality Audit
console.log('\n📄 Auditing HTML Pages for SEO Metadata & Schema...');
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

htmlFiles.forEach(htmlPath => {
  fileCount++;
  const content = fs.readFileSync(htmlPath, 'utf-8');
  const relPath = path.relative(DIST_DIR, htmlPath);

  // Check H1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) {
    console.error(`❌ Missing <h1> tag in ${relPath}`);
    totalErrors++;
  }

  // Check Title
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ Missing or empty <title> in ${relPath}`);
    totalErrors++;
  }

  // Check Meta Description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`❌ Missing or empty meta description in ${relPath}`);
    totalErrors++;
  }

  // Check Canonical
  const canonMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonMatch || !canonMatch[1].startsWith('https://jcbijiao.my')) {
    console.error(`❌ Invalid or missing canonical link in ${relPath}`);
    totalErrors++;
  }

  // Check JSON-LD
  const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (schemaMatch) {
    try {
      JSON.parse(schemaMatch[1]);
    } catch (e) {
      console.error(`❌ Invalid JSON-LD schema syntax in ${relPath}`);
      totalErrors++;
    }
  }
});

console.log(`  ✓ Audited ${fileCount} HTML pages.`);

// 4. Check Primary Provider Rankings (Top 9)
console.log('\n🏆 Verifying Top 9 Primary Provider Rankings...');
const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
const expectedOrder = ['灵动云', '暮光网络', '飞猫云', '微风网络', '隐形人', '浪网', '梯子云', '飞V', '全球云'];
let lastIndex = 0;
let rankOk = true;

expectedOrder.forEach(name => {
  const currIndex = homeHtml.indexOf(name);
  if (currIndex === -1 || currIndex < lastIndex) {
    console.error(`❌ Provider order mismatch: "${name}" is out of order on Homepage.`);
    rankOk = false;
    totalErrors++;
  }
  lastIndex = currIndex;
});

if (rankOk) {
  console.log('  ✓ Top 9 primary ranking order verified: 灵动云 -> 暮光网络 -> 飞猫云 -> 微风网络 -> 隐形人 -> 浪网 -> 梯子云 -> 飞V -> 全球云');
}

// Summary Report
console.log('\n========================================');
console.log(`VERIFICATION SUMMARY`);
console.log(`Total Errors: ${totalErrors}`);
console.log(`Total Warnings: ${totalWarnings}`);
console.log('========================================\n');

if (totalErrors > 0) {
  console.error('❌ Verification FAILED with errors.');
  process.exit(1);
} else {
  console.log('✅ Verification PASSED successfully!');
}
