const fs = require('fs');

const rawUrls = [
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918943/WhatsApp_Image_2025-04-10_at_7.56.44_PM_g08ipn.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784918911/WhatsApp_Image_2025-04-10_at_7.56.43_PM_1_nrctvv.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920991/WhatsApp_Image_2026-07-22_at_12.40.35_1_et8ph2.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920961/PXL_20230728_091808559.MP_hzwiu4.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920858/IMG20241218174013_fl9gkc.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920847/IMG20241218174002_qxdjfb.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920828/IMG20241218173802_x7hck4.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920812/IMG_20241218_191657884_ncyy9p.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920751/IMG_20241218_150435684_x32lxb.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920733/IMG_20241218_150426352_msbpep.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920669/WhatsApp_Image_2025-03-21_at_15.53.59_04b970c8_cgq9un.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920628/IMG20221216170446_snuczh.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920604/IMG20221216161703_jw7ohf.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920510/20260319_152153_phkswx.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920526/20260513_192544_uweqsp.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784920471/20260128_215004_xvhvlx.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919164/IMG-20241123-WA0066_gqxmhb.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919137/IMG-20250510-WA0048_l38c9l.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784921818/20240905_190734_t5ljvn.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784921816/20250524_195615_ikobsh.jpg",
  "https://res.cloudinary.com/ajoy-kapat/image/upload/v1784921815/20260513_201728_jmuatc.jpg"
];

// Clean URLs
const urls = [...new Set(rawUrls.map(u => u.replace(/\n/g, '').trim()))];

const groupFile = 'src/content/group.json';
const groupData = JSON.parse(fs.readFileSync(groupFile, 'utf8'));

const existingUrls = new Set(groupData.photos.map(p => p.img));
const yearCounts = {};

// init year counts from existing
groupData.photos.forEach(p => {
  const match = p.caption.match(/20\d{2}/);
  if (match) {
    const year = match[0];
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  }
});

const extractYear = (url) => {
  const match = url.match(/202[0-9]/);
  return match ? match[0] : '2024'; // fallback
};

for (const url of urls) {
  if (!existingUrls.has(url)) {
    const year = extractYear(url);
    yearCounts[year] = (yearCounts[year] || 0) + 1;
    const count = yearCounts[year];
    const caption = count > 1 ? `Group Photo-${year} (${count})` : `Group Photo-${year}`;
    groupData.photos.push({ caption, img: url });
  }
}

// sort photos by year extracted from caption
groupData.photos.sort((a, b) => {
  const yearA = parseInt(a.caption.match(/20\d{2}/)?.[0] || '0');
  const yearB = parseInt(b.caption.match(/20\d{2}/)?.[0] || '0');
  if (yearA !== yearB) return yearA - yearB;
  return a.caption.localeCompare(b.caption);
});

fs.writeFileSync(groupFile, JSON.stringify(groupData, null, 2) + '\n');
console.log('Updated src/content/group.json successfully!');
