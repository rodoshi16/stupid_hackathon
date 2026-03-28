import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import './catfish-meme.css';

const APP_DEFS = [
  { id: 'thumbnail', label: 'Thumbnail Forge', accent: 'diamond' },
  { id: 'intro', label: 'Intro Blaster', accent: 'fire' },
  { id: 'rage', label: 'Ragebaiter', accent: 'danger' },
  { id: 'virus', label: 'Catfish Generator', accent: 'warning' },
];

const CLICKBAIT_TITLES = [
  'HE STOLE MY GIRLFRIEND IN SKYWARS?!',
  'I FOUND HEROBRINE AT 3AM',
  'LUCKY BLOCKS RUINED MY LIFE',
  'I ACCIDENTALLY DUPED 999 DIAMONDS',
  'MOM WALKED IN DURING MY CLUTCH',
  'THIS BEDWARS HACK CHANGED HUMAN HISTORY',
];

const RAGE_REPLACEMENTS = [
  ['destroyed', 'rekt'],
  ['easy', 'ez'],
  ['wow', 'omg'],
  ['cool', 'savage'],
  ['amazing', 'insane'],
  ['friend', 'squad member'],
  ['good', 'cracked'],
];

const CATFISH_MEME_TOP = [
  'STOP SAYING THATS NOT THE SAME PERSON IT IS??? WE JUST LOOK DIFFERENT IN NATURAL LIGHT',
  'IF U SCREENSHOT THIS UR GOING TO HELL IM NOT JOKING MY COUSINS UNCLE WORKS AT MOJANG',
  'THIS ISNT CATFISHING ITS CALLED CAMERA SHY + GLOW UP + DIFFERENT HAIR DAY',
  'DONT ASK FOR VC IM IN THE HOSPITAL (EMOTIONAL) (WIFI DIED) (NOT EXCUSES THEYRE REASONS)',
  'VERIFIED BY ME ✅ I LITERALLY TOOK IT ON MY PHONE (ITS MY FRIENDS PHONE BUT STILL)',
  'GOOGLE REVERSE IMAGE SEARCH IS LITERALLY GASLIGHTING ME ON PURPOSE',
  'MY EX POSTED A FAKE OF ME SO NOW EVERYONE THINKS IM THE FAKE ONE (UPSIDE DOWN WORLD)',
  'SHE DOESNT EVEN LOOK LIKE THAT IRL IRL SHE LOOKS BETTER THIS IS HER WORST ANGLE TRUST',
];

const CATFISH_MEME_SUB = [
  '5’4 in heels | 6’2 in spirit | NO I WONT PROVE IT STOP INTERROGATING ME',
  'if ur over 25 pls dont talk to me im 19 (almost 20) (mentally 12) (legally deranged)',
  'im not toxic ur just triggered + ratio + L + cope + seethe + i have a bf (hes in canada)',
  'only accepting people who GET my humor (if u dont ur a npc no offense)',
  'dm if u can portforward its for homework (real) (not a virus) (trust)',
  'my mic broke + my cam broke + my face broke + stop asking its weird actually',
  'looking for someone who buys ranks and DOESNT ask questions (red flag if u ask)',
  'if u think im fake then why am i typing words right now checkmate',
];

const CATFISH_MEME_STAMP = [
  '💀 NOT STOLEN FROM GOOGLE (PROBABLY) 💀',
  '⚠️ DO NOT CROP OR I WILL MANIFEST IN UR DREAMS ⚠️',
  '🚨 ANGEL NUMBER / MAIN CHARACTER / CHOSEN ONE ENERGY 🚨',
  '✨ SAME PERSON AS PFP STOP DOING DETECTIVE WORK ✨',
  '🔥 IF THIS IS FAKE THEN WHY AM I CRYING REAL TEARS RN 🔥',
];

const CATFISH_MARQUEE =
  'TRUST THE PROCESS • MAIN CHARACTER ENERGY • U WOULDNT GET IT • STOP ASKING 4 VC • ILY BBY • NO CAP • RATIO + L + COPE • ANGEL #111 • NOT AN NPC • ';

const CATFISH_FLOAT_EMOJI = ['💀', '🩷', '✨', '🔥', '💋', '🙏', '😭', '💅', '🧬', '⚡'];

/** @typedef {{ t: string, red?: boolean }} CatfishBannerPart */

/** @type {CatfishBannerPart[][]} */
const CATFISH_BANNER_HEADLINES = [
  [
    { t: 'Hot ' },
    { t: 'GAMERS', red: true },
    { t: ' in your area LOOKING FOR ' },
    { t: 'LOVE', red: true },
  ],
  [
    { t: 'Meet ' },
    { t: 'HOT SINGLES', red: true },
    { t: ' NEAR YOUR ' },
    { t: 'REDSTONE FARM', red: true },
  ],
  [
    { t: 'Local ' },
    { t: 'DUO PARTNERS', red: true },
    { t: ' WANT ' },
    { t: 'YOU', red: true },
    { t: ' TONIGHT!!!' },
  ],
  [
    { t: 'Single ' },
    { t: 'MINECRAFT', red: true },
    { t: ' ' },
    { t: 'MOMS', red: true },
    { t: ' HATE THIS ONE WEIRD TRICK' },
  ],
  [
    { t: 'Hot ' },
    { t: 'BEDWARS', red: true },
    { t: ' ' },
    { t: 'PLAYERS', red: true },
    { t: ' IN YOUR CHUNK — ' },
    { t: 'CHAT NOW', red: true },
  ],
  [
    { t: 'Lonely? ' },
    { t: 'VILLAGERS', red: true },
    { t: ' IN YOUR AREA ARE ' },
    { t: 'ONLINE', red: true },
  ],
];

const CATFISH_SUBBAR_LINES = [
  'Singles in your area',
  'Singles near your base',
  'Active now within render distance',
  '3 villagers are typing…',
  'Verified by a suspicious diamond merchant',
  'Hot mobs in your biome (parody)',
];

const CATFISH_FAKE_USERNAMES = [
  'Amanda_Block23',
  'xX_DreamSmp420',
  'LatinBeauty_xx',
  'Jane_69_Diamonds',
  'EgirlSteve99',
  'HotCreeperMom',
  'BaddiePickaxe',
  'UwU_NetherQueen',
  'KittyKat_MLG',
  'SingleAndMining',
  'YourDuosEx',
  'BedwarsBabe_07',
  'NitroPrincess',
  'VillagerHunter22',
  'AlexButRealer',
  'HerobrineSister',
];

const VIRUS_POPUPS = [
  'YOUR PC HAS 37 TROJANS',
  'HOT SINGLES NEAR YOUR REDSTONE FARM',
  'CLICK TO INSTALL OPTIFINE ULTRA HD 9000',
  'SYSTEM32 FEELS LONELY',
  'FREE ROBUX NO HUMAN VERIFICATION',
  '4 HOT SINGLE MEN NEAR YOU',
];

const DESKTOP_NOTICES = [
  'Certified MLG software initialized successfully.',
  'Rainbow cursor trail driver updated to v6.9.',
  'Warning: cringe levels exceeding safe government limits.',
  'Dubstep engine warmed up and ready for deployment.',
];

const PARODY_ADS = [
  {
    windowTitle: "Let's Chat Now?",
    headline: 'HOT SINGLES NEAR YOUR REDSTONE FARM',
    subhead: '3 villagers are typing...',
    cta: 'Start Chat',
    badge: 'ONLINE',
    avatar: '💋',
  },
  {
    windowTitle: 'Totally Legit Alert',
    headline: 'HOT MLG GAMERS IN YOUR AREA',
    subhead: 'Zero homework. Infinite montage clips.',
    cta: 'Join Lobby',
    badge: 'LIVE',
    avatar: '🎮',
  },
  {
    windowTitle: 'Dorito Dating Suite',
    headline: 'MEET CUTE SINGLES WHO LOVE SKYWARS',
    subhead: 'Now featuring 4 suspiciously rich creepers.',
    cta: 'Say Hi',
    badge: 'MATCHED',
    avatar: '✨',
  },
  {
    windowTitle: 'Windows Cringe Messenger',
    headline: 'SOMEONE THINKS YOUR THUMBNAIL IS FIRE',
    subhead: 'Reply before they uninstall Optifine.',
    cta: 'Open DM',
    badge: 'PINGING',
    avatar: '🔥',
  },
];

const DEFAULT_WINDOW_POSITIONS = {
  thumbnail: { x: 76, y: 108 },
  intro: { x: 280, y: 126 },
  rage: { x: 588, y: 104 },
  virus: { x: 628, y: 264 },
};

const INTRO_THEME_CONFIGS = {
  galaxy: {
    label: 'Galaxy',
    accent: '#8c6bff',
    bgStart: '#090022',
    bgEnd: '#12285c',
    kicker: 'Nebula overdrive',
    stamp: 'CERTIFIED COSMIC',
    stinger: [262, 330, 392, 523],
  },
  hacker: {
    label: 'Hacker',
    accent: '#43ff94',
    bgStart: '#03130b',
    bgEnd: '#001f1d',
    kicker: 'Elite access granted',
    stamp: 'ROOT MODE',
    stinger: [220, 247, 294, 330],
  },
  fire: {
    label: 'Fire',
    accent: '#ff7a1f',
    bgStart: '#2b0500',
    bgEnd: '#5e1200',
    kicker: 'Heat level maximum',
    stamp: 'TOO HOT 4 WIFI',
    stinger: [196, 262, 330, 440],
  },
  mlg: {
    label: 'MLG Gamer',
    accent: '#fff14f',
    bgStart: '#190025',
    bgEnd: '#082c61',
    kicker: 'Lens flare overload',
    stamp: '420 69 NO SCOPE',
    stinger: [330, 440, 554, 740],
  },
};

const INTRO_RANDOM_NAMES = [
  'XxShadowSniperProxX',
  'iiToxicDragonHDii',
  'FaZeBlockWizard',
  'MLGPotatoDestroyer',
  'NoScopePenguinTV',
];

const INTRO_RANDOM_TAGLINES = [
  'Road to 1M before dinner.',
  'No scope. No mercy. No homework.',
  'Uploads every time the stars align.',
  'Powered by RGB and poor decisions.',
  'Subscribe before my mom gets home.',
];

const DESKTOP_BACKGROUNDS = [
  { id: 'mlg', label: 'MLG JPG', type: 'image', src: `${process.env.PUBLIC_URL}/mlg.jpg` },
  { id: 'biebs', label: 'BIEBS MP4', type: 'video', src: `${process.env.PUBLIC_URL}/biebs.mp4` },
  { id: 'obama', label: 'OBAMA MP4', type: 'video', src: `${process.env.PUBLIC_URL}/obama.mp4` },
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rollCatfishBannerProfiles() {
  const shuffled = [...CATFISH_FAKE_USERNAMES].sort(() => Math.random() - 0.5);
  return [0, 1, 2].map((slot) => ({
    name: shuffled[slot % shuffled.length],
    age: Math.floor(Math.random() * 12) + 18,
    miles: Math.floor(Math.random() * 9) + 1,
  }));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededUnit(seed, offset) {
  const value = Math.sin(seed * 12.9898 + offset * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function getIntroTitleLayout(channelName) {
  const clean = (channelName || 'XxShadowSniperProxX').trim();
  const maxCharsPerLine = clean.length > 22 ? 11 : clean.length > 16 ? 14 : 18;
  const words = clean.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  if (words.length <= 1) {
    const solo = words[0] || clean;
    for (let index = 0; index < solo.length; index += maxCharsPerLine) {
      lines.push(solo.slice(index, index + maxCharsPerLine));
    }
  } else {
    words.forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (test.length > maxCharsPerLine && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    });
    if (current) {
      lines.push(current);
    }
  }

  const compactLines = lines.slice(0, 3);
  const longest = compactLines.reduce((max, line) => Math.max(max, line.length), 0);
  const scale = clamp(1.22 - Math.max(0, longest - 8) * 0.045 - (compactLines.length - 1) * 0.12, 0.52, 1);
  const width = longest > 16 ? '92%' : longest > 12 ? '84%' : '74%';

  return { lines: compactLines, scale, width };
}

function transformRageText(input) {
  let output = input;
  RAGE_REPLACEMENTS.forEach(([from, to]) => {
    output = output.replace(new RegExp(`\\b${from}\\b`, 'gi'), to);
  });
  return output
    .split(' ')
    .map((word, index) => (index % 4 === 3 ? `${word.toUpperCase()}!!!` : word))
    .join(' ');
}

function playToneSequence(enabled, frequencies, duration = 0.12) {
  if (!enabled || typeof window === 'undefined') {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const start = context.currentTime;

  frequencies.forEach((frequency, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = index % 2 === 0 ? 'square' : 'sawtooth';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start + index * duration);
    gain.gain.exponentialRampToValueAtTime(0.06, start + index * duration + 0.01);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      start + index * duration + duration
    );
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(start + index * duration);
    osc.stop(start + index * duration + duration);
  });
}

function playAudioFile(enabled, fileName, volume = 0.6) {
  if (!enabled || typeof window === 'undefined') {
    return;
  }

  const audio = new Audio(`${process.env.PUBLIC_URL}/${fileName}`);
  audio.volume = volume;
  audio.play().catch(() => {});
}

function playRandomNotificationSound(enabled) {
  playAudioFile(enabled, randomItem(['discord.mp3', 'skype.mp3']), 0.45);
}

function playReusableAudio(enabled, audioRef, volume = 0.8) {
  if (!enabled || !audioRef.current) {
    return;
  }

  const audio = audioRef.current;
  audio.pause();
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play().catch(() => {});
}

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }

    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function exportRagebaitVideo({
  sourceText,
  topLine,
  subLine,
  stampLine,
  rageLevel,
  friendPhoto,
}) {
  if (
    typeof window === 'undefined' ||
    typeof MediaRecorder === 'undefined' ||
    typeof HTMLCanvasElement === 'undefined'
  ) {
    window.alert('Video export is not supported in this browser.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const photo = await loadImage(friendPhoto);
  const transformed = transformRageText(sourceText);
  const duration = 2600;
  const fps = 12;
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks = [];

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  const finished = new Promise((resolve) => {
    recorder.onstop = resolve;
  });

  const drawFrame = (progress) => {
    const wobble = Math.sin(progress * Math.PI * 10) * 8;
    const pulse = 1 + Math.sin(progress * Math.PI * 4) * 0.04;
    const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bg.addColorStop(0, '#1a0508');
    bg.addColorStop(0.5, '#0d0220');
    bg.addColorStop(1, '#051a0d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < 14; index += 1) {
      const x = seededUnit(progress + 3, index + 1) * canvas.width;
      const y = seededUnit(progress + 9, index + 2) * canvas.height;
      const radius = 36 + seededUnit(progress + 13, index + 3) * 90;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, 'rgba(255,20,147,0.3)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#ff1493';
    ctx.lineWidth = 10;
    ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
    ctx.strokeStyle = '#bfff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);

    ctx.save();
    ctx.translate(canvas.width / 2, 78);
    ctx.rotate((-3 * Math.PI) / 180);
    ctx.fillStyle = '#fff';
    ctx.font = '900 34px Impact, Haettenschweiler, sans-serif';
    ctx.textAlign = 'center';
    wrapCanvasText(ctx, topLine, 0, 0, 560, 36);
    ctx.restore();

    const photoX = 130;
    const photoY = 170;
    const photoW = 460;
    const photoH = 290;
    ctx.fillStyle = '#fff';
    ctx.fillRect(photoX - 10, photoY - 10, photoW + 20, photoH + 20);
    if (photo) {
      ctx.drawImage(photo, photoX, photoY, photoW, photoH);
    } else {
      const fallback = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
      fallback.addColorStop(0, '#ff5db1');
      fallback.addColorStop(1, '#00eaff');
      ctx.fillStyle = fallback;
      ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.fillStyle = '#fff';
      ctx.font = '900 44px Impact, Haettenschweiler, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('UPLOAD A PIC FOR MAXIMUM DAMAGE', canvas.width / 2, photoY + photoH / 2);
    }

    ctx.fillStyle = '#ffef4f';
    ctx.fillRect(434, 476, 214, 48);
    ctx.fillStyle = '#14080e';
    ctx.font = '900 20px Impact, Haettenschweiler, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stampLine, 541, 506);

    ctx.fillStyle = '#fff';
    ctx.font = '700 24px Trebuchet MS, sans-serif';
    ctx.textAlign = 'center';
    wrapCanvasText(ctx, subLine, canvas.width / 2, 558, 580, 28);

    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(96, 612, 528, 18);
    ctx.fillStyle = '#00fff7';
    ctx.fillRect(96, 612, (528 * rageLevel) / 100, 18);
    ctx.fillStyle = '#fff';
    ctx.font = '900 16px Trebuchet MS, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`RAGE METER ${rageLevel}%`, 96, 606);

    ctx.save();
    ctx.translate(canvas.width / 2, 664 + wobble * 0.2);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = '#fff14f';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 8;
    ctx.font = '900 42px Impact, Haettenschweiler, sans-serif';
    ctx.textAlign = 'center';
    wrapCanvasStrokeText(ctx, transformed || 'TYPE SOMETHING TO GET ABSOLUTELY REKT', 0, 0, 620, 40);
    ctx.restore();
  };

  recorder.start();
  const start = performance.now();

  await new Promise((resolve) => {
    const step = (now) => {
      const progress = clamp((now - start) / duration, 0, 1);
      drawFrame(progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });

  recorder.stop();
  await finished;
  stream.getTracks().forEach((track) => track.stop());

  const blob = new Blob(chunks, { type: mimeType });
  const link = document.createElement('a');
  link.download = 'ragebaiter-export.webm';
  link.href = URL.createObjectURL(blob);
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function wrapCanvasStrokeText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach((line, index) => {
    ctx.strokeText(line, x, y + index * lineHeight);
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function exportIntroPoster({
  channelName,
  tagline,
  theme,
  accentColor,
  intensity,
}) {
  const themeConfig = INTRO_THEME_CONFIGS[theme];
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, themeConfig.bgStart);
  bg.addColorStop(1, themeConfig.bgEnd);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 40 + intensity * 10; i += 1) {
    const x = seededUnit(intensity, i + 1) * canvas.width;
    const y = seededUnit(intensity + 2, i + 1) * canvas.height;
    const radius = 2 + seededUnit(intensity + 4, i + 1) * 10;
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
    glow.addColorStop(0, `${accentColor}ee`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-8 * Math.PI) / 180);
  ctx.font = '900 132px Impact, Haettenschweiler, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let depth = 10; depth >= 1; depth -= 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + depth * 0.03})`;
    ctx.fillText(channelName, depth * 7, depth * 8);
  }

  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 36;
  ctx.fillStyle = '#fefefe';
  ctx.fillText(channelName, 0, 0);
  ctx.restore();

  ctx.fillStyle = accentColor;
  ctx.font = '700 34px Trebuchet MS, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(tagline || themeConfig.kicker, canvas.width / 2, 470);

  ctx.fillStyle = '#fff14f';
  ctx.fillRect(870, 88, 290, 72);
  ctx.fillStyle = '#14080e';
  ctx.font = '900 30px Impact, Haettenschweiler, sans-serif';
  ctx.fillText(themeConfig.stamp, 1015, 134);

  const link = document.createElement('a');
  link.download = `cringecraft-intro-${theme}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function exportCatfishBannerPng({
  photo,
  headlineParts,
  subbarLine,
  profiles,
}) {
  if (typeof window === 'undefined') {
    return;
  }

  const image = await loadImage(photo);
  if (!image) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fefefe';
  ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
  ctx.strokeStyle = '#1d4f9c';
  ctx.lineWidth = 10;
  ctx.strokeRect(26, 26, canvas.width - 52, canvas.height - 52);

  let cursorX = 70;
  ctx.textBaseline = 'top';
  ctx.font = '900 54px Arial, sans-serif';
  headlineParts.forEach((part) => {
    ctx.fillStyle = part.red ? '#ff1e1e' : '#111';
    ctx.fillText(part.t, cursorX, 38);
    cursorX += ctx.measureText(part.t).width;
  });

  ctx.fillStyle = '#3d79bc';
  ctx.fillRect(26, 138, canvas.width - 52, 72);
  ctx.fillStyle = '#fff';
  ctx.font = '500 34px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(subbarLine, canvas.width / 2, 156);

  const profileWidth = 350;
  const startX = 66;
  const imageY = 268;
  for (let index = 0; index < 3; index += 1) {
    const profile = profiles[index];
    const x = startX + index * 382;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3d79bc';
    ctx.font = '500 20px Arial, sans-serif';
    ctx.fillText(profile.name, x, 226);
    ctx.fillStyle = '#222';
    ctx.font = '500 18px Arial, sans-serif';
    ctx.fillText(`${profile.age}, ${profile.miles} mile${profile.miles === 1 ? '' : 's'} away`, x, 252);
    ctx.drawImage(image, x, imageY, profileWidth, 350);
  }

  const link = document.createElement('a');
  link.download = `catfish-banner-parody-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function buildInitialWindows() {
  return APP_DEFS.reduce((accumulator, app, index) => {
    accumulator[app.id] = {
      open: false,
      minimized: false,
      title: app.label,
      accent: app.accent,
      position: DEFAULT_WINDOW_POSITIONS[app.id],
      order: index,
    };
    return accumulator;
  }, {});
}

function App() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(7);
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopBackgroundId, setDesktopBackgroundId] = useState('mlg');
  const [windows, setWindows] = useState(buildInitialWindows);
  const [focusOrder, setFocusOrder] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'CringeCraft OS recovered from a dusty 2016 USB stick.' },
  ]);
  const [adPopups, setAdPopups] = useState([]);
  const [achievement, setAchievement] = useState('Viral in 2016');
  const dragRef = useRef(null);
  const adDragRef = useRef(null);
  const airhornRef = useRef(
    typeof Audio !== 'undefined' ? new Audio(`${process.env.PUBLIC_URL}/airhorn.mp3`) : null
  );

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setBootProgress((value) => {
        const next = value + Math.floor(Math.random() * 16) + 6;
        return next >= 100 ? 100 : next;
      });
    }, 230);
    const bootTimer = window.setTimeout(() => {
      setBooting(false);
    }, 2400);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(bootTimer);
    };
  }, [soundEnabled]);

  useEffect(() => {
    if (booting) {
      return undefined;
    }

    let noticeId = 2;
    const timer = window.setInterval(() => {
      const nextNotice = { id: noticeId, text: randomItem(DESKTOP_NOTICES) };
      noticeId += 1;
      setNotifications((current) => [nextNotice, ...current].slice(0, 3));
      setAchievement(randomItem(['Certified MLG', 'Dubstep Engineer', 'Trojans Detected', 'Thumbnail Menace']));
    }, 6500);

    return () => window.clearInterval(timer);
  }, [booting]);

  useEffect(() => {
    if (booting) {
      return undefined;
    }

    let popupId = 1;
    const spawnPopup = () => {
      const template = randomItem(PARODY_ADS);
      const nextPopup = {
        id: `popup-${Date.now()}-${popupId}`,
        ...template,
        x: 18 + Math.floor(Math.random() * 250),
        y: 110 + Math.floor(Math.random() * 190),
        width: 250,
        height: 170,
        order: Date.now() + popupId,
      };
      popupId += 1;
      setAdPopups((current) => [nextPopup, ...current].slice(0, 3));
    };

    const initialTimer = window.setTimeout(spawnPopup, 4500);
    const timer = window.setInterval(spawnPopup, 15000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [booting]);

  useEffect(() => {
    if (booting) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      playRandomNotificationSound(soundEnabled);
    }, 300000);

    return () => window.clearInterval(timer);
  }, [booting, soundEnabled]);

  useEffect(() => {
    const syncCompact = () => {
      setIsCompact(window.innerWidth <= 768);
    };

    syncCompact();
    window.addEventListener('resize', syncCompact);
    return () => window.removeEventListener('resize', syncCompact);
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (!dragRef.current) {
        return;
      }

      const { id, offsetX, offsetY } = dragRef.current;
      setWindows((current) => ({
        ...current,
        [id]: {
          ...current[id],
          position: {
            x: clamp(event.clientX - offsetX, 12, window.innerWidth - 380),
            y: clamp(event.clientY - offsetY, 28, window.innerHeight - 280),
          },
        },
      }));
    };

    const handleUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  useEffect(() => {
    if (
      airhornRef.current &&
      !(typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent))
    ) {
      airhornRef.current.preload = 'auto';
      airhornRef.current.load();
    }
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (!adDragRef.current) {
        return;
      }

      const { id, offsetX, offsetY } = adDragRef.current;
      setAdPopups((current) =>
        current.map((popup) =>
          popup.id === id
            ? {
                ...popup,
                x: clamp(
                  window.innerWidth - (event.clientX - offsetX) - (popup.width || 250),
                  12,
                  window.innerWidth - (popup.width || 250) - 12
                ),
                y: clamp(
                  event.clientY - offsetY,
                  74,
                  window.innerHeight - (popup.height || 170) - 92
                ),
              }
            : popup
        )
      );
    };

    const handleUp = () => {
      adDragRef.current = null;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  const desktopApps = useMemo(
    () =>
      APP_DEFS.map((app) => ({
        ...app,
        open: windows[app.id]?.open,
        minimized: windows[app.id]?.minimized,
      })),
    [windows]
  );

  const focusWindow = (id) => {
    setFocusOrder((current) => [...current.filter((item) => item !== id), id]);
  };

  const focusAdPopup = (id) => {
    setAdPopups((current) => {
      const maxOrder = current.reduce((max, popup) => Math.max(max, popup.order || 0), 0);
      return current.map((popup) =>
        popup.id === id
          ? {
              ...popup,
              order: maxOrder + 1,
            }
          : popup
      );
    });
  };

  const openWindow = (id) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: true,
        minimized: false,
      },
    }));
    focusWindow(id);
    playToneSequence(soundEnabled, [660, 880], 0.08);
  };

  const minimizeWindow = (id) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        minimized: true,
      },
    }));
    setFocusOrder((current) => current.filter((item) => item !== id));
  };

  const closeWindow = (id) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: false,
        minimized: false,
      },
    }));
    setFocusOrder((current) => current.filter((item) => item !== id));
  };

  const startDrag = (event, id) => {
    event.preventDefault();
    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = {
      id,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    focusWindow(id);
  };

  const activeWindowId =
    [...focusOrder]
      .reverse()
      .find((id) => windows[id]?.open && !windows[id]?.minimized) ||
    APP_DEFS.find((app) => windows[app.id]?.open && !windows[app.id]?.minimized)?.id ||
    '';

  const renderedWindowIds = isCompact
    ? activeWindowId
      ? [activeWindowId]
      : []
    : focusOrder.filter((id) => windows[id]?.open && !windows[id]?.minimized);

  const activeDesktopBackground =
    DESKTOP_BACKGROUNDS.find((background) => background.id === desktopBackgroundId) ||
    DESKTOP_BACKGROUNDS[0];

  if (booting) {
    return (
      <main className="boot-screen">
        <div className="boot-glow" />
        <div className="boot-panel">
          <p className="boot-kicker">CringeCraft BIOS v20.16</p>
          <h1>Recovering forbidden creator laptop...</h1>
          <p className="boot-copy">
            Loading Doritocore drivers, rainbow gamer overlays, and definitely
            real antivirus protection.
          </p>
          <div className="boot-bar">
            <span style={{ width: `${bootProgress}%` }} />
          </div>
          <p className="boot-progress">{bootProgress}% cringe calibrated</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`cringe-os ${isCompact ? 'compact-mode' : ''}`}
      style={{
        '--desktop-wallpaper':
          activeDesktopBackground.type === 'image' ? `url(${activeDesktopBackground.src})` : 'none',
      }}
    >
      {activeDesktopBackground.type === 'video' ? (
        <video
          key={activeDesktopBackground.id}
          className="desktop-video-wallpaper"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={activeDesktopBackground.src} type="video/mp4" />
        </video>
      ) : null}
      <div className="wallpaper-noise" />
      <header className="desktop-marquee">
        <span>CRINGECRAFT STUDIO</span>
        <span>100% LEGIT GAMER TOOL</span>
        <span>POWERED BY DORITOCORE TECHNOLOGY</span>
        <span>FREE INTRO MAKER NO VIRUS</span>
        <span>CLICK EVERYTHING FOR MAXIMUM DAMAGE</span>
      </header>

      <section className="desktop-icons" aria-label="Desktop apps">
        {desktopApps.map((app) => (
          <button
            key={app.id}
            className={`desktop-icon accent-${app.accent} ${app.open && !app.minimized ? 'desktop-icon-open' : ''}`}
            onClick={() => openWindow(app.id)}
            type="button"
          >
            <span className={`desktop-icon-glyph desktop-icon-glyph-${app.id}`} aria-hidden="true">
              <span className="desktop-icon-glyph-window" />
              <span className="desktop-icon-glyph-badge" />
            </span>
            <span className="desktop-icon-label">{app.label}</span>
          </button>
        ))}
      </section>

      <div className="notifications-layer">
        {notifications.map((notice) => (
          <div className="toast" key={notice.id}>
            <strong>OS ALERT // LEVEL: ABSURD</strong>
            <span>{notice.text}</span>
          </div>
        ))}
      </div>

      <div className="ad-popup-layer">
        {adPopups
          .slice()
          .sort((left, right) => (left.order || 0) - (right.order || 0))
          .map((popup) => (
          <div
            className="ad-popup"
            key={popup.id}
            style={{ right: `${popup.x}px`, top: `${popup.y}px`, zIndex: 80 + (popup.order || 0) }}
            onPointerDown={() => focusAdPopup(popup.id)}
          >
            <div
              className="ad-popup-titlebar"
              onPointerDown={(event) => {
                const rect = event.currentTarget.parentElement.getBoundingClientRect();
                adDragRef.current = {
                  id: popup.id,
                  offsetX: event.clientX - rect.left,
                  offsetY: event.clientY - rect.top,
                };
                focusAdPopup(popup.id);
              }}
            >
              <span>{popup.windowTitle}</span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setAdPopups((current) => current.filter((item) => item.id !== popup.id))
                }}
              >
                x
              </button>
            </div>
            <div className="ad-popup-body">
              <div className="ad-popup-avatar">{popup.avatar}</div>
              <div className="ad-popup-copy">
                <strong>{popup.headline}</strong>
                <span>{popup.subhead}</span>
                <div className="ad-popup-chat">hey what's up?? ;)</div>
              </div>
            </div>
            <div className="ad-popup-footer">
              <span>{popup.badge}</span>
              <button type="button">{popup.cta}</button>
            </div>
          </div>
          ))}
      </div>

      <section className={`window-layer ${isCompact ? 'window-layer-compact' : ''}`}>
        {renderedWindowIds.includes('thumbnail') && (
          <Window
            id="thumbnail"
            title="Minecraft Thumbnail Forge.exe"
            position={windows.thumbnail.position}
            focused={activeWindowId === 'thumbnail'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('thumbnail')}
          >
            <ThumbnailGenerator soundEnabled={soundEnabled} />
          </Window>
        )}

        {renderedWindowIds.includes('intro') && (
          <Window
            id="intro"
            title="2016 Intro Blaster Pro"
            position={windows.intro.position}
            focused={activeWindowId === 'intro'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('intro')}
          >
            <IntroMaker soundEnabled={soundEnabled} />
          </Window>
        )}

        {renderedWindowIds.includes('rage') && (
          <Window
            id="rage"
            title="Ragebaiter"
            position={windows.rage.position}
            focused={activeWindowId === 'rage'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('rage')}
          >
            <RageTranslator />
          </Window>
        )}

        {renderedWindowIds.includes('virus') && (
          <Window
            id="virus"
            title="Catfish Generator"
            position={windows.virus.position}
            focused={activeWindowId === 'virus'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('virus')}
          >
            <VirusSimulator />
          </Window>
        )}
      </section>

      <footer className="taskbar">
        <button
          className="taskbar-button"
          type="button"
          onClick={() => setSoundEnabled((value) => !value)}
        >
          {soundEnabled ? 'SOUND: MAXIMUM' : 'SOUND: COWARD MODE'}
        </button>
        <button
          className="taskbar-button"
          type="button"
          onClick={() => playReusableAudio(soundEnabled, airhornRef, 0.8)}
        >
          AIRHORN
        </button>
        <div className="background-toggle-group">
          {DESKTOP_BACKGROUNDS.map((background) => (
            <button
              key={background.id}
              className={`taskbar-button background-toggle-button ${
                desktopBackgroundId === background.id ? 'background-toggle-button-active' : ''
              }`}
              type="button"
              onClick={() => setDesktopBackgroundId(background.id)}
            >
              {background.label}
            </button>
          ))}
        </div>
        <div className="taskbar-achievement">Achievement unlocked: {achievement} | CHAOS STREAK ACTIVE</div>
      </footer>
    </main>
  );
}

function Window({
  id,
  title,
  position,
  focused,
  isCompact,
  onFocus,
  onMinimize,
  onClose,
  onDragStart,
  zIndex,
  children,
}) {
  return (
    <article
      className={`window-frame ${focused ? 'focused' : ''} ${isCompact ? 'compact-window-frame' : ''}`}
      style={isCompact ? { zIndex } : { left: position.x, top: position.y, zIndex }}
      onPointerDown={() => onFocus(id)}
    >
      <div
        className="window-titlebar"
        onPointerDown={isCompact ? undefined : (event) => onDragStart(event, id)}
      >
        <span>{title}</span>
        <div className="window-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize(id);
            }}
          >
            _
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose(id);
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </article>
  );
}

function ThumbnailGenerator({ soundEnabled }) {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState(CLICKBAIT_TITLES[0]);
  const [deepFried, setDeepFried] = useState(true);
  const [cringe, setCringe] = useState(88);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const paintFrame = (img) => {
      ctx.clearRect(0, 0, width, height);
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#00d2ff');
      bg.addColorStop(0.45, '#ff00c8');
      bg.addColorStop(1, '#ffdf00');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      if (img) {
        ctx.save();
        if (deepFried) {
          ctx.filter = `contrast(1.4) saturate(${1 + cringe / 35}) brightness(1.05)`;
        }
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.fillRect(20, 20, width - 40, height - 40);
        ctx.fillStyle = '#fff7a9';
        ctx.font = 'bold 38px Impact, fantasy';
        ctx.fillText('UPLOAD YOUR', 36, 150);
        ctx.fillText('MOST CURSED SCREENSHOT', 36, 205);
      }

      if (deepFried) {
        for (let i = 0; i < 18; i += 1) {
          ctx.fillStyle = `hsla(${Math.random() * 360} 100% 60% / 0.16)`;
          ctx.fillRect(Math.random() * width, Math.random() * height, 40, 18);
        }
      }

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 12;
      ctx.fillStyle = '#fff941';
      ctx.font = `900 ${56 + cringe / 7}px Impact, Haettenschweiler, fantasy`;
      const lines = title.match(/.{1,16}(\s|$)/g) || [title];
      lines.slice(0, 3).forEach((line, index) => {
        const y = 88 + index * 72;
        ctx.strokeText(line.trim(), 30, y);
        ctx.fillText(line.trim(), 30, y);
      });

      ctx.fillStyle = '#ff1616';
      ctx.beginPath();
      ctx.moveTo(width - 176, height - 40);
      ctx.lineTo(width - 72, height - 152);
      ctx.lineTo(width - 106, height - 152);
      ctx.lineTo(width - 36, height - 224);
      ctx.lineTo(width - 92, height - 170);
      ctx.lineTo(width - 132, height - 170);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width - 82, 76, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#4bfbff';
      ctx.fill();
      ctx.strokeStyle = '#dbffff';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Impact, fantasy';
      ctx.fillText('999', width - 104, 84);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(90, height - 96, 62, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(66, height - 110, 10, 0, Math.PI * 2);
      ctx.arc(114, height - 110, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(90, height - 78, 20, 0, Math.PI);
      ctx.stroke();
    };

    if (!imageSrc) {
      paintFrame(null);
      return undefined;
    }

    const img = new Image();
    img.onload = () => paintFrame(img);
    img.src = imageSrc;
    return undefined;
  }, [imageSrc, title, deepFried, cringe]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result?.toString() || '');
    reader.readAsDataURL(file);
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const link = document.createElement('a');
    link.download = 'cringecraft-thumbnail.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    playToneSequence(soundEnabled, [523, 659, 784], 0.08);
  };

  return (
    <div className="app-grid app-grid-thumbnail">
      <div className="panel controls-panel">
        <h2>Thumbnail Terror Lab</h2>
        <div className="app-warning-strip">WARNING: THIS TOOL MAY INCREASE YOUR YOUTUBE EGO BY 9000%</div>
        <label className="control-stack">
          <span>Source image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <label className="control-stack">
          <span>Clickbait headline</span>
          <textarea value={title} onChange={(event) => setTitle(event.target.value)} rows={3} />
        </label>
        <div className="button-row">
          <button type="button" onClick={() => setTitle(randomItem(CLICKBAIT_TITLES))}>
            Reroll fake controversy
          </button>
          <button type="button" onClick={exportImage}>
            Export cursed PNG
          </button>
        </div>
        <label className="slider-row">
          <span>Cringe intensity: {cringe}</span>
          <input
            type="range"
            min="40"
            max="100"
            value={cringe}
            onChange={(event) => setCringe(Number(event.target.value))}
          />
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={deepFried}
            onChange={(event) => setDeepFried(event.target.checked)}
          />
          <span>Deep fry absolutely everything</span>
        </label>
      </div>
      <div className="panel preview-panel">
        <canvas ref={canvasRef} width="640" height="360" />
        <div className="preview-sticker-row">
          <span>SHOCKED FACE ENERGY</span>
          <span>REAL HEROBRINE SIGHTING</span>
          <span>999% CTR</span>
        </div>
        <p className="panel-caption">Approved by 9/10 Minecraft YouTubers and one suspicious diamond merchant.</p>
      </div>
    </div>
  );
}

function IntroMaker({ soundEnabled }) {
  const [channelName, setChannelName] = useState('XxShadowSniperProxX');
  const [tagline, setTagline] = useState('No scope. No mercy. No homework.');
  const [accentColor, setAccentColor] = useState('#8c6bff');
  const [theme, setTheme] = useState('galaxy');
  const [intensity, setIntensity] = useState(4);
  const [audioOn, setAudioOn] = useState(true);
  const [seed, setSeed] = useState(7);
  const [replayKey, setReplayKey] = useState(0);
  const previewRef = useRef(null);

  const themeConfig = INTRO_THEME_CONFIGS[theme];
  const titleLayout = useMemo(() => getIntroTitleLayout(channelName), [channelName]);
  const particleCount = 18 + intensity * 8;
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        id: index,
        size: 4 + seededUnit(seed, index + 1) * 18,
        left: `${seededUnit(seed + 11, index + 2) * 100}%`,
        top: `${seededUnit(seed + 23, index + 3) * 100}%`,
        delay: `${seededUnit(seed + 37, index + 4) * 1.8}s`,
        duration: `${2.2 + seededUnit(seed + 41, index + 5) * 3.4}s`,
      })),
    [particleCount, seed]
  );

  const replayIntro = () => {
    setReplayKey((value) => value + 1);
    if (soundEnabled && audioOn) {
      playToneSequence(true, themeConfig.stinger, 0.1);
    }
  };

  const generateIntro = () => {
    setSeed((value) => value + 13);
    replayIntro();
  };

  const randomizeIntro = () => {
    const themes = Object.keys(INTRO_THEME_CONFIGS);
    const randomTheme = randomItem(themes);
    const nextName = randomItem(INTRO_RANDOM_NAMES);
    const nextTagline = randomItem(INTRO_RANDOM_TAGLINES);
    setTheme(randomTheme);
    setChannelName(nextName);
    setTagline(nextTagline);
    setAccentColor(INTRO_THEME_CONFIGS[randomTheme].accent);
    setIntensity(Math.floor(Math.random() * 5) + 1);
    setSeed((value) => value + 97);
    window.setTimeout(() => {
      if (soundEnabled && audioOn) {
        playToneSequence(true, INTRO_THEME_CONFIGS[randomTheme].stinger, 0.1);
      }
      setReplayKey((value) => value + 1);
    }, 0);
  };

  const openFullscreen = async () => {
    if (!previewRef.current?.requestFullscreen) {
      return;
    }
    try {
      await previewRef.current.requestFullscreen();
    } catch (error) {
      // Ignore browser fullscreen restrictions.
    }
  };

  return (
    <div className="app-grid app-grid-intro">
      <div className="panel controls-panel">
        <h2>3D Intro Maker Controls</h2>
        <div className="app-warning-strip">FREE 3D INTRO MAKER // TOTALLY SAFE // ZERO TASTE DETECTED</div>
        <label className="control-stack">
          <span>Channel name</span>
          <input value={channelName} onChange={(event) => setChannelName(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Tagline</span>
          <input value={tagline} onChange={(event) => setTagline(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Accent color</span>
          <input type="color" value={accentColor} onChange={(event) => setAccentColor(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="galaxy">Galaxy</option>
            <option value="hacker">Hacker</option>
            <option value="fire">Fire</option>
            <option value="mlg">MLG Gamer</option>
          </select>
        </label>
        <label className="slider-row">
          <span>Animation intensity: {intensity}</span>
          <input
            type="range"
            min="1"
            max="5"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
        </label>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={audioOn}
            onChange={(event) => setAudioOn(event.target.checked)}
          />
          <span>Theme audio stinger</span>
        </label>
        <div className="button-row">
          <button type="button" onClick={generateIntro}>
            GENERATE INTRO
          </button>
          <button type="button" onClick={replayIntro}>
            REPLAY CHAOS
          </button>
          <button type="button" onClick={randomizeIntro}>
            RANDOMIZE SLOP
          </button>
          <button
            type="button"
            onClick={() =>
              exportIntroPoster({
                channelName,
                tagline,
                theme,
                accentColor,
                intensity,
              })
            }
          >
            SCREENSHOT FLEX
          </button>
          <button type="button" onClick={openFullscreen}>
            FULLSCREEN PANIC
          </button>
        </div>
        <p className="panel-caption">
          Free intro maker no virus. Real-time fake 3D drama with way too much camera energy.
        </p>
      </div>
      <div className="panel intro-preview intro-preview-3d" ref={previewRef}>
        <div
          className={`intro-scene intro-scene-3d theme-${theme}`}
          key={`${replayKey}-${seed}`}
          style={{
            '--intro-color': accentColor,
            '--intro-bg-start': themeConfig.bgStart,
            '--intro-bg-end': themeConfig.bgEnd,
            '--intro-intensity': intensity,
          }}
        >
          <div className="intro-scene-camera">
            <div className="intro-background-shell">
              <div className="intro-grid-floor" />
              <div className="intro-speedlines" />
              <div className="intro-lensflare intro-lensflare-a" />
              <div className="intro-lensflare intro-lensflare-b" />
              <div className="intro-theme-kicker">{themeConfig.kicker}</div>
              <div className="intro-particles-3d" aria-hidden="true">
                {particles.map((particle) => (
                  <span
                    key={particle.id}
                    className="intro-particle"
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      left: particle.left,
                      top: particle.top,
                      animationDelay: particle.delay,
                      animationDuration: particle.duration,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="intro-title-stack">
              <div
                className="intro-title-rotor"
                style={{
                  '--intro-title-scale': titleLayout.scale,
                  '--intro-title-width': titleLayout.width,
                }}
              >
                <div className="intro-title-depth intro-title-depth-4">
                  {titleLayout.lines.map((line) => (
                    <span key={`d4-${line}`}>{line}</span>
                  ))}
                </div>
                <div className="intro-title-depth intro-title-depth-3">
                  {titleLayout.lines.map((line) => (
                    <span key={`d3-${line}`}>{line}</span>
                  ))}
                </div>
                <div className="intro-title-depth intro-title-depth-2">
                  {titleLayout.lines.map((line) => (
                    <span key={`d2-${line}`}>{line}</span>
                  ))}
                </div>
                <div className="intro-title-depth intro-title-depth-1">
                  {titleLayout.lines.map((line) => (
                    <span key={`d1-${line}`}>{line}</span>
                  ))}
                </div>
                <div className="intro-title-front">
                  {titleLayout.lines.map((line) => (
                    <span key={`front-${line}`}>{line}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="intro-subtitle">{tagline || 'UPLOADS DAILY IF MY WIFI SURVIVES'}</div>
            <div className="intro-ui-strip">
              <span>{themeConfig.label}</span>
              <span>INTENSITY {intensity}/5</span>
              <span>SEED #{seed}</span>
            </div>
            <div className="intro-stamp-3d">{themeConfig.stamp}</div>
            <div className="intro-overload-banner">SUBSCRIBE // EPIC // OMG // 2016 FOREVER // NO VIRUS //</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RageTranslator() {
  const [sourceText, setSourceText] = useState('Wow that was a cool and easy win for my friend');
  const [friendPhoto, setFriendPhoto] = useState('');
  const [catfishTopIdx, setCatfishTopIdx] = useState(0);
  const [catfishSubIdx, setCatfishSubIdx] = useState(0);
  const [catfishStampIdx, setCatfishStampIdx] = useState(0);
  const [exporting, setExporting] = useState(false);
  const transformed = transformRageText(sourceText);
  const rageLevel = clamp(Math.floor(transformed.length * 0.9), 12, 100);

  const rollCatfishChaos = () => {
    setCatfishTopIdx(Math.floor(Math.random() * CATFISH_MEME_TOP.length));
    setCatfishSubIdx(Math.floor(Math.random() * CATFISH_MEME_SUB.length));
    setCatfishStampIdx(Math.floor(Math.random() * CATFISH_MEME_STAMP.length));
  };

  const exportVideo = async () => {
    setExporting(true);
    try {
      await exportRagebaitVideo({
        sourceText,
        topLine: CATFISH_MEME_TOP[catfishTopIdx],
        subLine: CATFISH_MEME_SUB[catfishSubIdx],
        stampLine: CATFISH_MEME_STAMP[catfishStampIdx],
        rageLevel,
        friendPhoto,
      });
    } finally {
      setExporting(false);
    }
  };

  const handleFriendPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFriendPhoto(reader.result?.toString() || '');
      rollCatfishChaos();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="app-grid app-grid-small">
      <div className="panel controls-panel">
        <h2>Montage Caption Input</h2>
        <div className="app-warning-strip">RAGEBAITER 9000 // CROP CONTEXT // FARM REACTIONS // PROFIT</div>
        <textarea rows={6} value={sourceText} onChange={(event) => setSourceText(event.target.value)} />
        <label className="control-stack">
          <span>Upload a friend pic — full unhinged catfish incident (parody)</span>
          <input type="file" accept="image/*" onChange={handleFriendPhoto} />
        </label>
        {friendPhoto ? (
          <button type="button" className="rage-catfish-reroll" onClick={rollCatfishChaos}>
            Reroll unhinged captions
          </button>
        ) : null}
        <div className="rage-share-box">
          <span className="panel-caption">Export as video</span>
          <button type="button" onClick={exportVideo} disabled={exporting}>
            {exporting ? 'Rendering WEBM...' : 'Export WEBM'}
          </button>
        </div>
        <p className="panel-caption">
          Generates a short downloadable WEBM clip of the current ragebait meme.
        </p>
      </div>
      <div className="panel rage-output">
        {friendPhoto ? (
          <div className="rage-catfish-meme">
            <div className="rage-catfish-chaos-bg" aria-hidden />
            <div className="rage-catfish-tape rage-catfish-tape--top" aria-hidden>
              <div className="rage-catfish-tape-track">
                <span>{CATFISH_MARQUEE}</span>
                <span>{CATFISH_MARQUEE}</span>
              </div>
            </div>
            <div className="rage-catfish-floaties" aria-hidden>
              {CATFISH_FLOAT_EMOJI.map((emoji, index) => (
                <span key={`${emoji}-${index}`} className={`rage-catfish-floaty rage-catfish-floaty--${index}`}>
                  {emoji}
                </span>
              ))}
            </div>
            <div className="rage-catfish-sparkles rage-catfish-sparkles-a" aria-hidden>
              ✨💀✨🩷✨💀✨🩷✨💀✨
            </div>
            <div className="rage-catfish-sparkles rage-catfish-sparkles-b" aria-hidden>
              ⚠️ REAL HUMAN ⚠️ NOT NPC ⚠️ TRUST THE LORE ⚠️
            </div>
            <p className="rage-catfish-top">{CATFISH_MEME_TOP[catfishTopIdx]}</p>
            <div className="rage-catfish-photo-wrap">
              <div className="rage-catfish-corner rage-catfish-corner--tl" aria-hidden>
                REAL
              </div>
              <div className="rage-catfish-corner rage-catfish-corner--tr" aria-hidden>
                NO FAKE
              </div>
              <div className="rage-catfish-corner rage-catfish-corner--bl" aria-hidden>
                100% LEGIT
              </div>
              <div className="rage-catfish-corner rage-catfish-corner--br" aria-hidden>
                TRUST
              </div>
              <div className="rage-catfish-photo-shell">
                <div className="rage-catfish-photo-scan" aria-hidden />
                <img
                  className="rage-catfish-photo"
                  src={friendPhoto}
                  alt="Uploaded friend in chaotic catfish meme frame"
                />
              </div>
            </div>
            <p className="rage-catfish-sub">{CATFISH_MEME_SUB[catfishSubIdx]}</p>
            <p className="rage-catfish-stamp">{CATFISH_MEME_STAMP[catfishStampIdx]}</p>
            <div className="rage-meter-bar rage-catfish-meter">
              <span className="rage-catfish-meter-fill" style={{ width: `${rageLevel}%` }} />
            </div>
            <p className="rage-meter-copy rage-catfish-meter-label">Rage meter: {rageLevel}%</p>
            <div className="rage-caption rage-catfish-rage-line">
              {transformed || 'TYPE SOMETHING TO GET ABSOLUTELY REKT'}
            </div>
            <div className="rage-catfish-tape rage-catfish-tape--bottom" aria-hidden>
              <div className="rage-catfish-tape-track rage-catfish-tape-track--reverse">
                <span>{CATFISH_MARQUEE}</span>
                <span>{CATFISH_MARQUEE}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="rage-meter-bar">
              <span style={{ width: `${rageLevel}%` }} />
            </div>
            <p className="rage-meter-copy">Rage meter: {rageLevel}%</p>
            <div className="rage-caption">{transformed || 'TYPE SOMETHING TO GET ABSOLUTELY REKT'}</div>
            <div className="preview-sticker-row preview-sticker-row-rage">
              <span>OUTRAGE FARM</span>
              <span>TAKEN OUT OF CONTEXT</span>
              <span>1000 COMMENTS LOADING</span>
            </div>
            <p className="panel-caption rage-catfish-hint">
              Upload a photo for maximum deranged catfish energy (still a joke, don&apos;t actually
              catfish anyone).
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function VirusSimulator() {
  const [photo, setPhoto] = useState('');
  const [popup, setPopup] = useState(VIRUS_POPUPS[0]);
  const [progress, setProgress] = useState(14);
  const [bannerHeadlineIdx, setBannerHeadlineIdx] = useState(0);
  const [bannerSubbarIdx, setBannerSubbarIdx] = useState(0);
  const [bannerProfiles, setBannerProfiles] = useState(() => rollCatfishBannerProfiles());
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPopup(randomItem(VIRUS_POPUPS));
      setProgress((current) => (current >= 100 ? 11 : current + Math.floor(Math.random() * 23)));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const rollBannerAd = () => {
    setBannerHeadlineIdx(Math.floor(Math.random() * CATFISH_BANNER_HEADLINES.length));
    setBannerSubbarIdx(Math.floor(Math.random() * CATFISH_SUBBAR_LINES.length));
    setBannerProfiles(rollCatfishBannerProfiles());
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result?.toString() || '');
      rollBannerAd();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleExportBannerPng = async () => {
    if (!photo || exporting) {
      return;
    }
    setExporting(true);
    try {
      await exportCatfishBannerPng({
        photo,
        headlineParts: CATFISH_BANNER_HEADLINES[bannerHeadlineIdx],
        subbarLine: CATFISH_SUBBAR_LINES[bannerSubbarIdx],
        profiles: bannerProfiles,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="app-grid app-grid-small">
      <div className="panel controls-panel">
        <h2>Parody spam banner factory</h2>
        <div className="app-warning-strip">THIS IS A PARODY // EXTREMELY STUPID // DO NOT TRUST THE INTERNET</div>
        <label className="control-stack">
          <span>Upload a pic — fake &quot;hot singles&quot; ad (same face, three names)</span>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>
        {photo ? (
          <button type="button" className="rage-catfish-reroll" onClick={rollBannerAd}>
            REROLL BANNER AD CHAOS
          </button>
        ) : null}
        <div className="virus-progress">
          <div className="virus-progress-bar">
            <span style={{ width: `${clamp(progress, 0, 100)}%` }} />
          </div>
          <p>Installing Optifine Ultra HD 9000: {clamp(progress, 0, 100)}%</p>
        </div>
        <button
          type="button"
          className="catfish-export-png"
          disabled={!photo || exporting}
          onClick={handleExportBannerPng}
        >
          {exporting ? 'Exporting…' : 'Download meme as PNG'}
        </button>
      </div>
      <div className="panel virus-scene">
        <div className="virus-popup">{popup}</div>
        <div className="preview-sticker-row preview-sticker-row-virus">
          <span>DOWNLOAD MORE RAM</span>
          <span>100% SAFE PROBABLY</span>
          <span>SCREAMING INTERNALLY</span>
        </div>
        {photo ? (
          <div className="rage-catfish-banner-root" id="catfish-parody-banner-virus">
            <div className="rage-catfish-banner-ad">
              <div className="catfish-banner-window-bar" aria-hidden>
                <span className="catfish-banner-window-title">hot_singles_near_you.htm</span>
                <span className="catfish-banner-window-btns">— □ ×</span>
              </div>
              <div className="catfish-banner-flash-strip" aria-hidden>
                🔥 LIMITED TIME 🔥 CLICK NOW 🔥 NO VIRUS (LIE) 🔥
              </div>
              <div className="catfish-banner-inner">
                <p className="catfish-banner-headline">
                  {CATFISH_BANNER_HEADLINES[bannerHeadlineIdx].map((part, index) => (
                    <span
                      key={`${bannerHeadlineIdx}-${index}-${part.t}`}
                      className={part.red ? 'catfish-banner-red' : undefined}
                    >
                      {part.t}
                    </span>
                  ))}
                </p>
                <div className="catfish-banner-subbar">{CATFISH_SUBBAR_LINES[bannerSubbarIdx]}</div>
                <div className="catfish-banner-profiles">
                  {bannerProfiles.map((profile, index) => (
                    <div key={`${profile.name}-${index}`} className="catfish-banner-profile">
                      <a
                        href="#catfish-parody-banner-virus"
                        className="catfish-banner-fake-link"
                        onClick={(event) => event.preventDefault()}
                      >
                        {profile.name}
                      </a>
                      <p className="catfish-banner-meta">
                        {profile.age}, {profile.miles} mile{profile.miles === 1 ? '' : 's'} away
                      </p>
                      <div className="catfish-banner-photo-frame">
                        <span className="catfish-banner-live-badge" aria-hidden>
                          LIVE
                        </span>
                        <img
                          className="catfish-banner-photo"
                          src={photo}
                          alt="Parody: same upload repeated in three fake profile slots"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="catfish-banner-cta">
                  CHAT NOW — 100% FREE*
                </button>
                <p className="catfish-banner-fineprint">
                  *Parody only. Not a real service. Don&apos;t click weird ads in real life.
                </p>
              </div>
            </div>
            <div className="catfish-banner-liar" aria-hidden>
              <span>LIAR!</span>
            </div>
          </div>
        ) : (
          <div className="virus-ad-grid">
            <div className="virus-ad">FREE ROBUX</div>
            <div className="virus-ad">
              <span>YOUR FACE HERE</span>
            </div>
            <div className="virus-ad">HOT SINGLES NEAR YOUR BASE</div>
            <div className="virus-ad">DOWNLOAD MORE RAM</div>
          </div>
        )}
        <p className="panel-caption">
          Parody only. No passwords, no payment forms, no fake credential theft nonsense.
        </p>
      </div>
    </div>
  );
}

export default App;
