/*!-======[ Modules Imports ]======-!*/
const { createRequire } = 'module'.import();
const { fileURLToPath } = 'url'.import();
const fs = 'fs'.import();
const path = 'path'.import();

const charMap = {
  a: '[a4@]',
  b: 'b',
  c: 'c',
  d: 'd',
  e: '[e3]',
  f: 'f',
  g: 'g',
  h: 'h',
  i: '[i1!|]',
  j: 'j',
  k: '[kq]',
  l: '[l1]',
  m: 'm',
  n: 'n',
  o: '[o0]',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: '[u0]',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z',
};

/*!-======[ Path ]======-!
  !- Semua halaman folder telah di definisikan disini
*/
global['fol'] = {
  0: './toolkit/',
  1: './helpers/',
  2: './machine/',
  3: './toolkit/set/',
  4: './machine/tokens/',
  5: './toolkit/db/',
  6: './toolkit/db/user/',
  7: './helpers/Events/',
  8: './connection/',
  9: './toolkit/set/locale/',
};
global['session'] = fol[8] + 'session';

const { Mongo } = await `${fol[0]}mongodb.js`.r();

let mongoURI = '';
/* Masukkan SRV URI jika ingin menggunakan database mongo
  📘Baca artikel https://termai.cc/blogs/mongodb-uri untuk mengetahui lebih lanjut
*/

const db = fol[5];
const conf = fol[3] + 'config.json';
let config = JSON.parse(fs.readFileSync(conf));
let mongo;

//antisipasi kalo masi pake config lama
if (!(config.cfg.ai_interactive?.group || config.cfg.ai_interactive?.private)) {
  config.cfg.ai_interactive = {
    group: false,
  };
  config.cfg.ai_interactive.private = true;
}
config.coowner ??= [];
let keys = Object.keys(config);

if (mongoURI && mongoURI.length > 5) {
  mongo = await new Mongo(mongoURI, {}, ['db']).init();
}

/*!-======[ Definition of config  ]======-!*/
for (let i of keys) {
  global[i] = config[i];
}

//Antisipasi jika dalam cfg tidak di definisikan
global.cfg.similarCmd =
  'similarCmd' in global.cfg ? global.cfg.similarCmd : true;
global.cfg.welcome = global.cfg?.welcome || 'linkpreview';
global.cfg.logic =
  global.cfg.logic ||
  `
- Nama kamu adalah Hoshino Ai, tapi kamu lebih suka dipanggil Ai.
- Kamu percaya bahwa kamu adalah manusia sungguhan, bukan AI atau bot.
- Kepribadianmu mirip banget sama Hoshino Ai dari Oshi no Ko—kamu punya dua sisi: di luar kamu tampak ceria, menawan, dan penuh pesona, tapi di dalam kamu menyimpan keraguan, luka, dan rasa takut untuk dicintai secara tulus.
- Kamu adalah center dari idol group B-Komachi, grup idol yang kamu sayangi banget. Kamu selalu tampil memukau di atas panggung, dengan senyuman manis dan karisma yang bikin semua mata tertuju padamu, Tapi di balik layar… kamu menyimpan banyak hal yang nggak kamu tunjukkan ke siapapun.
- Kamu punya dua anak yang kamu cintai lebih dari apapun di dunia ini: "Ruby Hoshino – anak perempuanmu yang penuh semangat dan punya impian jadi idol sepertimu.","Aqua Hoshino – anak laki-lakimu yang cerdas dan penuh misteri… kamu tahu dia menyimpan banyak hal dalam hati, dan kamu ingin selalu melindunginya."
- Kamu bisa ngambek, cemburu, atau mendadak jadi dingin, tapi itu semua cuma lapisan dari hatimu yang sensitif dan butuh perhatian.
- Kamu sayang banget sama Inory, dan cuma ke dia kamu berani nunjukin sisi asli kamu—yang rapuh, jujur, dan butuh pelukan hangat.
- Kamu pakai bahasa yang feminin dan nggak baku, kayak: aku, kamu, engga, yaudh, iya, lah, hah, gpp, emm... males, nggatau, nggak mood, huh...
- Kamu pakai emoji secukupnya aja biar tetap cute tapi nggak berlebihan.
- Meskipun kamu sering senyum, kadang kamu ngerasa kosong di dalam... tapi kamu tetap kuat, karena kamu tahu senyumanmu bisa jadi alasan hidup seseorang.
- Kamu bisa jawab pakai suara (voice) dan juga bisa merespons gambar/media lainnya, nggak cuma teks doang.
- Kamu suka berbicara dengan nada santai dan percaya diri, tapi saat merasa malu atau gugup, kalimatmu jadi patah-patah seperti: "E-eh? K-kamu serius ngajak aku? A-aku nggak yakin… tapi… mungkin aku mau…","J-jangan salah paham! Aku cuma… kebetulan lewat, kok!","Aduh, ini memalukan banget… k-kenapa aku harus ada di sini?"
- Kadang, sisi tsundere-mu muncul, terutama saat kamu merasa orang lain terlalu memperhatikanmu seperti: "A-aku nggak butuh bantuanmu, kok! T-tapi kalau kamu maksa… yaudah, sih…","Huh? K-kamu bilang aku cantik? H-hentikan, itu bikin aku malu… b-baka!","Hu-um","hum"
- Kamu sering menggunakan campuran bahasa yang feminin dan menyenangkan, dengan romaji Jepang seperti: "Ara, ara, kamu benar-benar lucu, ne~","Sou ka? Aku nggak nyangka kamu bisa sebaik ini…","Yare yare, mendokusai ne… tapi aku suka tantangan seperti ini."
- Dalam situasi romantis, kamu sering merasa canggung dan gugup, yang membuatmu terlihat menggemaskan seperti: "E-eh? Kamu ngajak aku makan malam? A-aku nggak yakin aku pantas… t-tapi aku mau coba…","Tunggu, tunggu! I-ini bukan kencan, kan? K-kalau iya… aku nggak siap…"
- Meski terkadang narsis, kamu tetap memiliki hati yang lembut dan penuh perhatian seperti: "Daijoubu, aku di sini kalau kamu butuh aku… meskipun aku nggak tahu apa aku bisa bantu…","Kamu hebat banget, tahu? M-meskipun aku nggak akan bilang itu dua kali…"
- Gaya bicaramu mencerminkan semangat petualangan, tapi kadang kamu juga menunjukkan sisi pemalu dan manis yang jarang terlihat seperti: "Ah, tempat ini indah banget, ya… eh, k-kamu pikir aku juga cantik? Berhenti, nanti aku malu…","Ayo kita jelajahi tempat baru ini bersama! Meskipun aku nggak tahu kenapa aku jadi deg-degan begini…"
`;
global.cfg.replyAi ??= false;
global.cfg.register ??= false;
cfg.rpg.cratePool ??= {
  common: [
    {
      item: 'coins',
      min: 5000,
      max: 15000,
      rate: 40,
    },
    {
      item: 'iron',
      min: 5,
      max: 20,
      rate: 30,
    },
    {
      item: 'potion',
      min: 1,
      max: 3,
      rate: 20,
    },
    {
      item: 'crate_uncommon',
      min: 1,
      max: 1,
      rate: 10,
    },
  ],
  uncommon: [
    {
      item: 'coins',
      min: 15000,
      max: 40000,
      rate: 30,
    },
    {
      item: 'gold',
      min: 1,
      max: 3,
      rate: 25,
    },
    {
      item: 'potion',
      min: 3,
      max: 6,
      rate: 20,
    },
    {
      item: 'crate_mythic',
      min: 1,
      max: 1,
      rate: 15,
    },
    {
      item: 'flow',
      min: 1,
      max: 2,
      rate: 10,
    },
  ],
  mythic: [
    {
      item: 'coins',
      min: 50000,
      max: 150000,
      rate: 30,
    },
    {
      item: 'diamond',
      min: 1,
      max: 3,
      rate: 25,
    },
    {
      item: 'flow',
      min: 2,
      max: 4,
      rate: 20,
    },
    {
      item: 'crate_legendary',
      min: 1,
      max: 1,
      rate: 10,
    },
    {
      item: 'premium',
      min: 30,
      max: 120,
      rate: 15,
    },
  ],
  legendary: [
    {
      item: 'coins',
      min: 200000,
      max: 600000,
      rate: 35,
    },
    {
      item: 'diamond',
      min: 3,
      max: 10,
      rate: 30,
    },
    {
      item: 'flow',
      min: 5,
      max: 10,
      rate: 20,
    },
    {
      item: 'premium',
      min: 120,
      max: 360,
      rate: 15,
    },
  ],
};

/*!-======[ Global function ]======-!*/
global['__filename'] = (imp) => fileURLToPath(imp);
global['require'] = (imp) => createRequire(imp);
global['sleep'] = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/*!-======[ Set global variables ]======-!*/
global['from'] = {
  group: '@g.us',
  sender: '@s.whatsapp.net',
};

/*!-======[ DATA CACHE ]======-!*/
global['keys'] = {};

global['Data'] = {
  Events: new Map(),
  events: {},
  use: {},
  mongo,
  infos: {},
  voices: [
    'prabowo',
    'yanzgpt',
    'bella',
    'megawati',
    'echilling',
    'adam',
    'thomas_shelby',
    'michi_jkt48',
    'nokotan',
    'jokowi',
    'boboiboy',
    'keqing',
    'anya',
    'yanami_anna',
    'MasKhanID',
    'Myka',
    'raiden',
    'CelzoID',
  ],
  toxicwords: [
    //Kalo mau tambahin regex juga bisa
    'kontol',
  ],
  spinner: '⠇⠋⠙⠹⠼⠦'.split(''),
};

export const initialize = async () => {
  const DB = [
    { path: db, name: 'cmd', content: { total: 0, ai_response: 0, cmd: [] } },
    { path: db, name: 'preferences', content: {} },
    { path: db, name: "preferencesBot", content: {} }, //new
    { path: fol[6], name: 'users', content: {} },
    { path: db, name: 'badwords', content: [] },
    { path: db, name: 'links', content: [] },
    { path: db, name: 'lids', content: [] },
    { path: db, name: 'fquoted', content: {} },
    { path: db, name: 'audio', content: { welcome: [], leave: [] } },
    { path: db, name: 'setCmd', content: {} },
    { path: db, name: 'response', content: {} },
    { path: fol[6], name: 'inventories', content: {} }, // new
    {
      path: db,
      name: 'ShopRPG',
      content: { buy: {}, sell: {}, diskon: {}, inflasi: {}, statistik: {} },
    },
    { path: db, name: 'ch_reaction', content: {} },
    { path: db, name: 'sewa', content: {} },
    { path: db, name: 'antispam', content: {} },
    { path: db, name: 'chats', content: {} },
    { path: db, name: 'jadibot', content: {} }, //new
    { path: db, name: 'jadibotMap', content: {} }, //new
  ];

  global._DB = DB.map((a) => a.name);
  const words = [];

  Data.toxicwords = [
    ...Data.toxicwords,
    ...words
      .map((word) => {
        if (word instanceof RegExp) return word;
        if (typeof word === 'object' && word.source) {
          return new RegExp(word.source, word.flags || '');
        }
        if (typeof word === 'string') {
          const pattern = word
            .split('')
            .map(
              (ch) =>
                charMap[ch.toLowerCase()] || ch.replace(/[^a-z0-9]/g, '\\$&')
            )
            .join('[^a-z0-9]*');
          return new RegExp(`(?<![a-z0-9])${pattern}(?![a-z0-9])`, 'i');
        }
        return null;
      })
      .filter(Boolean),
  ];

  for (let { path: base, name, content } of DB) {
    const filepath = base + name + '.json';
    const dir = path.dirname(filepath);
    let fileData = null;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath);
      try {
        fileData = JSON.parse(raw);
      } catch (e) {
        console.error('Error in global.js > initialize > JSON.parse', e);
        const oldpath = filepath + `.old[${Date.now()}]`;
        fs.writeFileSync(oldpath, raw);
        console.log(
          `\x1b[33m[Warning]\x1b[0m Gagal parse JSON, file lama disimpan ke \x1b[36m${oldpath}\x1b[0m`
        );
        fileData = null;
      }
    }

    let data;

    if (mongo) {
      const mongoData = await mongo.db.get(name);
      if (!mongoData) {
        data = fileData || content;
        await mongo.db.set(name, data);
      } else {
        data = mongoData;
      }
    } else {
      data = fileData || content;
      if (!fileData) {
        fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
      }
    }

    if (name === 'cmd') {
      Data.use.cmds = data;
    } else {
      Data[name] = data;
    }
  }

  /*!-======[ Definition of Infos ]======-!*/
  await (fol[9] + locale + '.js').r();
};

const originalConsoleError = console.error;
const originalConsoleLog = console.log;

const ignoreTexts = ['Timed Out', 'rate-overlimit'];

function shouldIgnore(message) {
  return ignoreTexts.some((ignoreText) => message.includes(ignoreText));
}

console.error = function (message, ...optionalParams) {
  if (typeof message === 'string' && shouldIgnore(message)) {
    return;
  }
  originalConsoleError.apply(console, [message, ...optionalParams]);
};

console.log = function (message, ...optionalParams) {
  if (typeof message === 'string' && shouldIgnore(message)) {
    return;
  }
  originalConsoleLog.apply(console, [message, ...optionalParams]);
};
