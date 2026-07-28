const fs = require('fs');

const rawUrls = `
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920991/WhatsApp_Image_2026-07-
22_at_12.40.35_1_et8ph2.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920961/PXL_20230728_091808559.MP_hzwiu4.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920858/IMG20241218174013_fl9gkc.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920847/IMG20241218174002_qxdjfb.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920828/IMG20241218173802_x7hck4.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920812/IMG_20241218_191657884_ncyy9p.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920751/IMG_20241218_150435684_x32lxb.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920733/IMG_20241218_150426352_msbpep.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920669/WhatsApp_Image_2025-03-
21_at_15.53.59_04b970c8_cgq9un.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920628/IMG20221216170446_snuczh.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920604/IMG20221216161703_jw7ohf.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920510/20260319_152153_phkswx.jpg

https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920526/20260513_192544_uweqsp.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784920471/20260128_215004_xvhvlx.jpg
https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919164/IMG-20241123-
WA0066_gqxmhb.jpg
https://res.cloudinary.com/ajoy-kapat/image/upload/v1784919137/IMG-20250510-
WA0048_l38c9l.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784921818/20240905_190734_t5ljvn.jpg
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784921816/20250524_195615_ikobsh.heic
https://res.cloudinary.com/ajoy-
kapat/image/upload/v1784921815/20260513_201728_jmuatc.heic
`;

const urls = rawUrls.split('\n')
  .filter(l => l.trim())
  .join('')
  .split('https://')
  .filter(u => u)
  .map(u => 'https://' + u.replace(/\s/g, ''));

const uniqueUrls = [...new Set(urls)];

const groupPath = './src/content/group.json';
const group = JSON.parse(fs.readFileSync(groupPath, 'utf8'));

const startIndex = group.photos.length;

const newPhotos = uniqueUrls.map((url, i) => {
  return {
    caption: `Group Photo 2026 ${i + 1}`,
    img: url
  };
});

group.photos = group.photos.concat(newPhotos);

fs.writeFileSync(groupPath, JSON.stringify(group, null, 2) + "\n");

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const ndjson = newPhotos.map((photo, i) => {
  return JSON.stringify({
    _id: `groupPhoto-${slug(photo.caption)}`,
    _type: "groupPhoto",
    caption: photo.caption,
    imageUrl: photo.img,
    order: startIndex + i,
  });
}).join('\n');

fs.writeFileSync('./scripts/new-photos.ndjson', ndjson + "\n");
console.log('Created scripts/new-photos.ndjson with ' + newPhotos.length + ' photos');
