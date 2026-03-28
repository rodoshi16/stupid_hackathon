import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const APP_DEFS = [
  { id: 'thumbnail', label: 'Thumbnail Forge', accent: 'diamond' },
  { id: 'intro', label: 'Intro Blaster', accent: 'fire' },
  { id: 'song', label: 'Parody Jukebox', accent: 'slime' },
  { id: 'rage', label: 'Rage Translator', accent: 'danger' },
  { id: 'virus', label: 'Totally Safe Download', accent: 'warning' },
];

const CLICKBAIT_TITLES = [
  'HE STOLE MY GIRLFRIEND IN SKYWARS?!',
  'I FOUND HEROBRINE AT 3AM',
  'LUCKY BLOCKS RUINED MY LIFE',
  'I ACCIDENTALLY DUPED 999 DIAMONDS',
  'MOM WALKED IN DURING MY CLUTCH',
  'THIS BEDWARS HACK CHANGED HUMAN HISTORY',
];

const SONG_TITLES = [
  'Revenge 2',
  'Creeper in My Walls',
  'Mine All Night',
  "Don't Dig Straight Down (Emotional Version)",
  'Diamond Tears AMV',
  'My Heart Is In The Nether',
];

const SONG_CHORUSES = [
  'Creeper in my hallway, griefing my soul, swing that pickaxe baby, never let me go.',
  'Mine mine mine till the sunrise hurts, crafted these feelings in a dirt block shirt.',
  'Girl you got me lagging, redstone in my chest, respawn in your village and I will do the rest.',
  'We fell in lava but the love stayed on, now I am autotuned inside this parody song.',
];

const SONG_GENRES = ['Dubstep Gospel', 'Sad Block Pop', 'MLG Trap', 'Galaxy Screamo', 'Optifine R&B'];

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
  song: { x: 214, y: 236 },
  rage: { x: 588, y: 104 },
  virus: { x: 628, y: 264 },
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function generateSongCard() {
  return {
    title: randomItem(SONG_TITLES),
    chorus: randomItem(SONG_CHORUSES),
    genre: randomItem(SONG_GENRES),
    cringe: Math.floor(Math.random() * 31) + 69,
    popularity: `${Math.floor(Math.random() * 8) + 2}.${Math.floor(Math.random() * 10)}M fake views`,
    palette: [
      `hsl(${Math.floor(Math.random() * 360)} 95% 55%)`,
      `hsl(${Math.floor(Math.random() * 360)} 100% 65%)`,
    ],
  };
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
    typeof window !== 'undefined' ? window.innerWidth <= 1100 : false
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [windows, setWindows] = useState(buildInitialWindows);
  const [focusOrder, setFocusOrder] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'CringeCraft OS recovered from a dusty 2016 USB stick.' },
  ]);
  const [adPopups, setAdPopups] = useState([]);
  const [achievement, setAchievement] = useState('Viral in 2016');
  const dragRef = useRef(null);

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
      setIsCompact(window.innerWidth <= 1100);
    };

    syncCompact();
    window.addEventListener('resize', syncCompact);
    return () => window.removeEventListener('resize', syncCompact);
  }, []);

  useEffect(() => {
    if (!dragRef.current) {
      return undefined;
    }

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
      style={{ '--desktop-wallpaper': `url(${process.env.PUBLIC_URL}/mlg.jpg)` }}
    >
      <div className="wallpaper-noise" />
      <header className="desktop-marquee">
        <span>CRINGECRAFT STUDIO</span>
        <span>100% LEGIT GAMER TOOL</span>
        <span>POWERED BY DORITOCORE TECHNOLOGY</span>
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
            <strong>OS ALERT</strong>
            <span>{notice.text}</span>
          </div>
        ))}
      </div>

      <div className="ad-popup-layer">
        {adPopups.map((popup) => (
          <div
            className="ad-popup"
            key={popup.id}
            style={{ right: `${popup.x}px`, top: `${popup.y}px` }}
          >
            <div className="ad-popup-titlebar">
              <span>{popup.windowTitle}</span>
              <button
                type="button"
                onClick={() =>
                  setAdPopups((current) => current.filter((item) => item.id !== popup.id))
                }
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

        {renderedWindowIds.includes('song') && (
          <Window
            id="song"
            title="Minecraft Parody Jukebox"
            position={windows.song.position}
            focused={activeWindowId === 'song'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('song')}
          >
            <SongGenerator soundEnabled={soundEnabled} />
          </Window>
        )}

        {renderedWindowIds.includes('rage') && (
          <Window
            id="rage"
            title="Gamer Rage Translator"
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
            title="TotallySafeDownload.biz"
            position={windows.virus.position}
            focused={activeWindowId === 'virus'}
            isCompact={isCompact}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            onDragStart={startDrag}
            zIndex={30 + renderedWindowIds.indexOf('virus')}
          >
            <VirusSimulator soundEnabled={soundEnabled} />
          </Window>
        )}
      </section>

      <footer className="taskbar">
        <button
          className="taskbar-button"
          type="button"
          onClick={() => setSoundEnabled((value) => !value)}
        >
          {soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
        </button>
        <button
          className="taskbar-button"
          type="button"
          onClick={() => playAudioFile(soundEnabled, 'airhorn.mp3', 0.8)}
        >
          AIRHORN
        </button>
        <div className="taskbar-achievement">Achievement unlocked: {achievement}</div>
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
            Randomize drama
          </button>
          <button type="button" onClick={exportImage}>
            Export PNG
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
        <p className="panel-caption">Approved by 9/10 Minecraft YouTubers and one suspicious diamond merchant.</p>
      </div>
    </div>
  );
}

function IntroMaker({ soundEnabled }) {
  const [channelName, setChannelName] = useState('XxShadowSniperProxX');
  const [tagline, setTagline] = useState('No scope. No mercy. No homework.');
  const [favoriteColor, setFavoriteColor] = useState('#00f6ff');
  const [vibe, setVibe] = useState('galaxy');
  const [replayKey, setReplayKey] = useState(0);

  const replayIntro = () => {
    setReplayKey((value) => value + 1);
    playToneSequence(soundEnabled, [330, 392, 494, 660], 0.11);
  };

  return (
    <div className="app-grid app-grid-intro">
      <div className="panel controls-panel">
        <h2>Intro Blaster Controls</h2>
        <label className="control-stack">
          <span>Channel name</span>
          <input value={channelName} onChange={(event) => setChannelName(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Tagline</span>
          <input value={tagline} onChange={(event) => setTagline(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Favorite color</span>
          <input type="color" value={favoriteColor} onChange={(event) => setFavoriteColor(event.target.value)} />
        </label>
        <label className="control-stack">
          <span>Vibe</span>
          <select value={vibe} onChange={(event) => setVibe(event.target.value)}>
            <option value="hacker">Hacker</option>
            <option value="gaming">Gaming</option>
            <option value="neon">Neon</option>
            <option value="galaxy">Galaxy</option>
            <option value="fire">Fire</option>
          </select>
        </label>
        <div className="button-row">
          <button type="button" onClick={replayIntro}>
            Replay intro
          </button>
          <button
            type="button"
            onClick={() => {
              setChannelName('iiToxicDragonHDii');
              setTagline('Road to 1M before dinner');
              setVibe('fire');
              replayIntro();
            }}
          >
            Make it worse
          </button>
        </div>
      </div>
      <div className="panel intro-preview">
        <div className={`intro-scene vibe-${vibe}`} key={replayKey} style={{ '--intro-color': favoriteColor }}>
          <div className="intro-particles" />
          <div className="intro-ring" />
          <div className="intro-name">{channelName}</div>
          <div className="intro-tagline">{tagline}</div>
          <div className="intro-stamp">SUBSCRIBE NOW NO VIRUS</div>
        </div>
      </div>
    </div>
  );
}

function SongGenerator({ soundEnabled }) {
  const [song, setSong] = useState(() => generateSongCard());

  const regenerate = () => {
    setSong(generateSongCard());
    playToneSequence(soundEnabled, [262, 330, 392, 523], 0.09);
  };

  return (
    <div className="app-grid app-grid-song">
      <div className="panel song-cover-panel">
        <div
          className="song-cover"
          style={{
            background: `radial-gradient(circle at top, ${song.palette[0]}, transparent 45%), linear-gradient(135deg, ${song.palette[1]}, #090011)`,
          }}
        >
          <div className="song-cover-grid" />
          <div className="song-cover-title">{song.title}</div>
          <div className="song-cover-subtitle">{song.genre}</div>
        </div>
      </div>
      <div className="panel controls-panel">
        <h2>Parody Song Forge</h2>
        <p className="song-meta">{song.popularity}</p>
        <p className="song-chorus">"{song.chorus}"</p>
        <div className="cringe-meter">
          <span>Cringe rating</span>
          <strong>{song.cringe}/100</strong>
        </div>
        <div className="button-row">
          <button type="button" onClick={regenerate}>
            Regenerate anthem
          </button>
          <button type="button" onClick={() => playToneSequence(soundEnabled, [220, 262, 294, 262], 0.18)}>
            Play chorus
          </button>
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
  const transformed = transformRageText(sourceText);
  const rageLevel = clamp(Math.floor(transformed.length * 0.9), 12, 100);

  const rollCatfishChaos = () => {
    setCatfishTopIdx(Math.floor(Math.random() * CATFISH_MEME_TOP.length));
    setCatfishSubIdx(Math.floor(Math.random() * CATFISH_MEME_SUB.length));
    setCatfishStampIdx(Math.floor(Math.random() * CATFISH_MEME_STAMP.length));
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
        <p className="panel-caption">
          Rage text still prints on the meme. Everything stays in your browser.
        </p>
      </div>
      <div className="panel rage-output">
        {friendPhoto ? (
          <div className="rage-catfish-meme">
            <div className="rage-catfish-sparkles rage-catfish-sparkles-a" aria-hidden>
              ✨💀✨🩷✨💀✨🩷✨💀✨
            </div>
            <div className="rage-catfish-sparkles rage-catfish-sparkles-b" aria-hidden>
              ⚠️ REAL HUMAN ⚠️ NOT NPC ⚠️ TRUST THE LORE ⚠️
            </div>
            <p className="rage-catfish-top">{CATFISH_MEME_TOP[catfishTopIdx]}</p>
            <div className="rage-catfish-photo-shell">
              <img className="rage-catfish-photo" src={friendPhoto} alt="Uploaded friend in catfish meme frame" />
            </div>
            <p className="rage-catfish-sub">{CATFISH_MEME_SUB[catfishSubIdx]}</p>
            <p className="rage-catfish-stamp">{CATFISH_MEME_STAMP[catfishStampIdx]}</p>
            <div className="rage-meter-bar rage-catfish-meter">
              <span style={{ width: `${rageLevel}%` }} />
            </div>
            <p className="rage-meter-copy">Rage meter: {rageLevel}%</p>
            <div className="rage-caption rage-catfish-rage-line">
              {transformed || 'TYPE SOMETHING TO GET ABSOLUTELY REKT'}
            </div>
          </div>
        ) : (
          <>
            <div className="rage-meter-bar">
              <span style={{ width: `${rageLevel}%` }} />
            </div>
            <p className="rage-meter-copy">Rage meter: {rageLevel}%</p>
            <div className="rage-caption">{transformed || 'TYPE SOMETHING TO GET ABSOLUTELY REKT'}</div>
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

function VirusSimulator({ soundEnabled }) {
  const [photo, setPhoto] = useState('');
  const [popup, setPopup] = useState(VIRUS_POPUPS[0]);
  const [progress, setProgress] = useState(14);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPopup(randomItem(VIRUS_POPUPS));
      setProgress((current) => (current >= 100 ? 11 : current + Math.floor(Math.random() * 23)));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result?.toString() || '');
    reader.readAsDataURL(file);
  };

  return (
    <div className="app-grid app-grid-small">
      <div className="panel controls-panel">
        <h2>Clearly Fake Scam Builder</h2>
        <label className="control-stack">
          <span>Upload friend photo for parody banner ads</span>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>
        <div className="virus-progress">
          <div className="virus-progress-bar">
            <span style={{ width: `${clamp(progress, 0, 100)}%` }} />
          </div>
          <p>Installing Optifine Ultra HD 9000: {clamp(progress, 0, 100)}%</p>
        </div>
        <button type="button" onClick={() => playToneSequence(soundEnabled, [110, 98, 87, 73], 0.1)}>
          Trigger suspicious noise
        </button>
      </div>
      <div className="panel virus-scene">
        <div className="virus-popup">{popup}</div>
        <div className="virus-ad-grid">
          <div className="virus-ad">FREE ROBUX</div>
          <div className="virus-ad">
            {photo ? <img src={photo} alt="Uploaded friend" /> : <span>YOUR FACE HERE</span>}
          </div>
          <div className="virus-ad">HOT SINGLES NEAR YOUR BASE</div>
          <div className="virus-ad">DOWNLOAD MORE RAM</div>
        </div>
        <p className="panel-caption">
          Parody only. No passwords, no payment forms, no fake credential theft nonsense.
        </p>
      </div>
    </div>
  );
}

export default App;
