const fs = require('fs');
const path = require('path');

const providersPath = path.resolve(__dirname, '../src/data/providers.json');
const providers = JSON.parse(fs.readFileSync(providersPath, 'utf-8'));

const enrichedData = [
  {
    rank: 1,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)",
    packages: [
      { name: "基础体验包", price: "15 元/月", traffic: "100GB/月" },
      { name: "标准进阶包", price: "30 元/月", traffic: "250GB/月" },
      { name: "旗舰大流量包", price: "55 元/月", traffic: "500GB/月" }
    ]
  },
  {
    rank: 2,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、英国(UK)",
    packages: [
      { name: "4K影音套餐", price: "20 元/月", traffic: "120GB/月" },
      { name: "AI与大流量包", price: "38 元/月", traffic: "300GB/月" },
      { name: "至尊无限速包", price: "68 元/月", traffic: "600GB/月" }
    ]
  },
  {
    rank: 3,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "轻量备用年付", price: "84 元/年", traffic: "50GB/月" },
      { name: "标准版年付", price: "148 元/年", traffic: "120GB/月" },
      { name: "不限时按量包", price: "60 元/一次性", traffic: "200GB (永久有效)" }
    ]
  },
  {
    rank: 4,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "多协议体验版", price: "16 元/月", traffic: "100GB/月" },
      { name: "多协议进阶版", price: "32 元/月", traffic: "220GB/月" },
      { name: "年度多协议包", price: "160 元/年", traffic: "150GB/月" }
    ]
  },
  {
    rank: 5,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、德国(DE)",
    packages: [
      { name: "加密独立基础包", price: "25 元/月", traffic: "150GB/月" },
      { name: "双向中继高级包", price: "45 元/月", traffic: "350GB/月" },
      { name: "企业独立中继包", price: "88 元/月", traffic: "800GB/月" }
    ]
  },
  {
    rank: 6,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、韩国(KR)",
    packages: [
      { name: "云端中继基础包", price: "18 元/月", traffic: "120GB/月" },
      { name: "4K极速专线包", price: "35 元/月", traffic: "280GB/月" },
      { name: "畅游年度套餐", price: "180 元/年", traffic: "180GB/月" }
    ]
  },
  {
    rank: 7,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "基础入门包", price: "12 元/月", traffic: "80GB/月" },
      { name: "双卡备用包", price: "24 元/月", traffic: "200GB/月" },
      { name: "超值年付包", price: "118 元/年", traffic: "100GB/月" }
    ]
  },
  {
    rank: 8,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "基础多协议包", price: "15 元/月", traffic: "100GB/月" },
      { name: "高带宽流媒体包", price: "28 元/月", traffic: "200GB/月" },
      { name: "全能年卡包", price: "140 元/年", traffic: "120GB/月" }
    ]
  },
  {
    rank: 9,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)、英国(UK)",
    packages: [
      { name: "IEPL专线基础包", price: "20 元/月", traffic: "120GB/月" },
      { name: "IEPL专线进阶包", price: "38 元/月", traffic: "260GB/月" },
      { name: "全球多节点旗舰包", price: "75 元/月", traffic: "600GB/月" }
    ]
  },
  {
    rank: 10,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "标准套餐", price: "18 元/月", traffic: "100GB/月" },
      { name: "高级中继套餐", price: "32 元/月", traffic: "220GB/月" },
      { name: "尊享年付套餐", price: "168 元/年", traffic: "120GB/月" }
    ]
  },
  {
    rank: 11,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "极速基础包", price: "15 元/月", traffic: "90GB/月" },
      { name: "低延迟尊享包", price: "28 元/月", traffic: "200GB/月" },
      { name: "光速年卡包", price: "138 元/年", traffic: "100GB/月" }
    ]
  },
  {
    rank: 12,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "V2Ray基础包", price: "16 元/月", traffic: "100GB/月" },
      { name: "V2Ray专业包", price: "30 元/月", traffic: "220GB/月" },
      { name: "全协议年付包", price: "150 元/年", traffic: "120GB/月" }
    ]
  },
  {
    rank: 13,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "实惠月付包", price: "12 元/月", traffic: "80GB/月" },
      { name: "透明流量包", price: "22 元/月", traffic: "160GB/月" },
      { name: "不限时一次性包", price: "50 元/一次性", traffic: "150GB (永久有效)" }
    ]
  },
  {
    rank: 14,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)",
    packages: [
      { name: "办公中继基础包", price: "22 元/月", traffic: "150GB/月" },
      { name: "跨境商务进阶包", price: "42 元/月", traffic: "320GB/月" },
      { name: "企业专线大流量包", price: "78 元/月", traffic: "700GB/月" }
    ]
  },
  {
    rank: 15,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "外网基础包", price: "14 元/月", traffic: "100GB/月" },
      { name: "多终端进阶包", price: "26 元/月", traffic: "200GB/月" },
      { name: "光年年度套餐", price: "130 元/年", traffic: "110GB/月" }
    ]
  },
  {
    rank: 16,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "平价迷你包", price: "10 元/月", traffic: "60GB/月" },
      { name: "日常上网包", price: "18 元/月", traffic: "130GB/月" },
      { name: "Sogo年付包", price: "98 元/年", traffic: "70GB/月" }
    ]
  },
  {
    rank: 17,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)、英国(UK)",
    packages: [
      { name: "海量流量基础包", price: "25 元/月", traffic: "200GB/月" },
      { name: "多出口IP进阶包", price: "48 元/月", traffic: "450GB/月" },
      { name: "宇宙无限流包", price: "88 元/月", traffic: "900GB/月" }
    ]
  },
  {
    rank: 18,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "极简备用包", price: "9 元/月", traffic: "50GB/月" },
      { name: "二猫标准包", price: "16 元/月", traffic: "110GB/月" },
      { name: "二猫年卡包", price: "88 元/年", traffic: "60GB/月" }
    ]
  },
  {
    rank: 19,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "快捷订阅包", price: "15 元/月", traffic: "100GB/月" },
      { name: "影音流畅包", price: "28 元/月", traffic: "200GB/月" },
      { name: "一翻年付包", price: "140 元/年", traffic: "100GB/月" }
    ]
  },
  {
    rank: 20,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)",
    packages: [
      { name: "边缘计算基础包", price: "28 元/月", traffic: "200GB/月" },
      { name: "低延迟加速包", price: "52 元/月", traffic: "400GB/月" },
      { name: "EdgeNova旗舰包", price: "95 元/月", traffic: "850GB/月" }
    ]
  },
  {
    rank: 21,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "安全传输基础包", price: "20 元/月", traffic: "120GB/月" },
      { name: "高稳定性进阶包", price: "36 元/月", traffic: "240GB/月" },
      { name: "可信尊享年包", price: "188 元/年", traffic: "130GB/月" }
    ]
  },
  {
    rank: 22,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "速界基础包", price: "18 元/月", traffic: "100GB/月" },
      { name: "外贸电商进阶包", price: "35 元/月", traffic: "230GB/月" },
      { name: "速界年度包", price: "170 元/年", traffic: "110GB/月" }
    ]
  },
  {
    rank: 23,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)",
    packages: [
      { name: "移动端体验包", price: "12 元/月", traffic: "80GB/月" },
      { name: "快狸多设备包", price: "22 元/月", traffic: "160GB/月" },
      { name: "快狸年卡包", price: "110 元/年", traffic: "90GB/月" }
    ]
  },
  {
    rank: 24,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "省心上手包", price: "15 元/月", traffic: "100GB/月" },
      { name: "无忧畅游包", price: "28 元/月", traffic: "200GB/月" },
      { name: "无忧年付包", price: "140 元/年", traffic: "100GB/月" }
    ]
  },
  {
    rank: 25,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "高并发基础包", price: "19 元/月", traffic: "120GB/月" },
      { name: "高带宽进阶包", price: "36 元/月", traffic: "250GB/月" },
      { name: "灵猫年度包", price: "178 元/年", traffic: "130GB/月" }
    ]
  },
  {
    rank: 26,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "闪跃极速包", price: "22 元/月", traffic: "150GB/月" },
      { name: "低延迟进阶包", price: "40 元/月", traffic: "300GB/月" },
      { name: "FlashLeap年包", price: "198 元/年", traffic: "160GB/月" }
    ]
  },
  {
    rank: 27,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)",
    packages: [
      { name: "兼容基础包", price: "16 元/月", traffic: "100GB/月" },
      { name: "稳定输出包", price: "30 元/月", traffic: "210GB/月" },
      { name: "飞为年卡包", price: "150 元/年", traffic: "110GB/月" }
    ]
  },
  {
    rank: 28,
    regions: "香港(HK)、日本(JP)、新加坡(SG)、美国(US)、台湾(TW)、韩国(KR)",
    packages: [
      { name: "外贸专线基础包", price: "25 元/月", traffic: "180GB/月" },
      { name: "跨境工作者进阶包", price: "45 元/月", traffic: "360GB/月" },
      { name: "跨界商务大流量包", price: "80 元/月", traffic: "750GB/月" }
    ]
  }
];

const enrichMap = new Map(enrichedData.map(item => [item.rank, item]));

providers.forEach(p => {
  const info = enrichMap.get(p.rank);
  if (info) {
    p.regions = info.regions;
    p.packages = info.packages;
  }
});

fs.writeFileSync(providersPath, JSON.stringify(providers, null, 2), 'utf-8');
console.log('Successfully enriched src/data/providers.json with regions and package tiers for all 28 providers.');
