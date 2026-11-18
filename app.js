(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  // Default State
  const DEFAULT_STATE = {
    template: 'cyan-curve',
    company: 'COMPANY NAME',
    tagline: 'YOUR AMAZING TAGLINE GOES HERE',
    name: 'ASEP SMITH',
    role: 'CONSULTANT',
    services: 'GRAPHIC . PRINT . WEB',
    email: 'YOUR@EMAIL.COM',
    phone: '+(000) 000 0000',
    phone2: '+(000) 000 0000',
    address: 'Country, City, Area\nStreet, Building, Zip code',
    website: 'WWW.YOUROWNWEBSITE.COM',
    accent: '#00f5e1',
    dark: '#242424',
    box: '#3b3b3b',
    accentText: '#161616',
    emblem: 'labyrinth',
    customLogo: '',
    gmailUser: ''
  };

  // Preset Configurations when switching templates so each model looks immediately like its reference image
  const TEMPLATE_DEFAULTS = {
    'cyan-curve':    { accent: '#00f5e1', dark: '#242424', box: '#3b3b3b', emblem: 'labyrinth' },
    'mono-sidebar':  { accent: '#333333', dark: '#303030', box: '#3d3d3d', emblem: 'hexprism' },
    'teal-stripes':  { accent: '#009ec2', dark: '#262626', box: '#3b3b3b', emblem: 'ribbon' },
    'red-band':      { accent: '#d32f2f', dark: '#2b2b2b', box: '#424242', emblem: 'ribbon' },
    'orange-column': { accent: '#f05438', dark: '#2b2b2b', box: '#3b3b3b', emblem: 'ribbon' },
    'blue-ribbon':   { accent: '#008bd0', dark: '#2e2e2e', box: '#3b3b3b', emblem: 'ribbon' },
    'shield-banner': { accent: '#323232', dark: '#2d2d2d', box: '#424242', emblem: 'diamonde' },
    'gold-bars':     { accent: '#e5c168', dark: '#111113', box: '#1f1d18', emblem: 'goldr' },
    'gold-plaid':    { accent: '#e5c168', dark: '#111113', box: '#1f1d18', emblem: 'goldr' },
    'gold-script':        { accent: '#e5c168', dark: '#111113', box: '#1f1d18', emblem: 'scripts' },
    'cyan-frame':         { accent: '#00b4d8', dark: '#333333', box: '#424242', emblem: 'diamonde' },
    'blue-shield-center': { accent: '#008bd0', dark: '#2c2c2c', box: '#3b3b3b', emblem: 'hexprism' }
  };

  // Vector Emblems (Includes Exact Labyrinth, Bookmark Ribbon, Hexagon, Rotated Diamond-E, Gold Square R, Calligraphy S)
  const EMBLEMS = {
    labyrinth: () => `
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="square" stroke-linejoin="round">
        <path d="M 43 17.2 A 46 46 0 1 0 77 17.2" />
        <path d="M 43 17.2 V 29 M 77 17.2 V 29 M 43 15 H 77" />
        <path d="M 55 92.6 A 33 33 0 1 1 65 92.6" />
        <path d="M 43 29 A 33 33 0 0 1 77 29" />
        <circle cx="60" cy="60" r="19.5" />
        <path d="M 60 79.5 V 105" />
      </svg>
    `,
    ribbon: () => `
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M14 10 H86 V92 L50 62 L14 92 Z"/>
      </svg>
    `,
    hexprism: () => `
      <svg viewBox="0 0 100 100">
        <polygon points="50,6 92,28 92,72 50,94 8,72 8,28" fill="currentColor"/>
        <polygon points="22,34 78,34 50,84" fill="#ffffff"/>
      </svg>
    `,
    diamonde: () => `
      <svg viewBox="0 0 100 100" fill="currentColor">
        <g transform="translate(50 50) rotate(-45) translate(-34 -34)">
          <path d="M0 0 H68 V15 H16 V26 H54 V41 H16 V53 H68 V68 H0 Z"/>
        </g>
      </svg>
    `,
    goldr: () => `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="12" y="12" width="76" height="76"/>
        <path d="M52 14 C64 26 64 38 50 44 C46 46 66 68 74 88"/>
        <path d="M34 62 C38 72 42 80 46 88"/>
      </svg>
    `,
    scripts: () => `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.8">
        <circle cx="50" cy="50" r="42"/>
        <path d="M64 28 C44 20 30 36 48 49 C68 62 56 84 32 74 C24 70 24 60 32 56" stroke-width="4.5" stroke-linecap="round"/>
      </svg>
    `,
    crown: () => `
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="60" cy="60" r="46"/>
        <path d="M32 76 L38 44 L52 58 L60 38 L68 58 L82 44 L88 76 Z"/>
        <line x1="34" y1="84" x2="86" y2="84"/>
      </svg>
    `,
    monogram: (st) => {
      const initials = (st.name || st.company || 'EX')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(w => w[0] || '')
        .join('')
        .toUpperCase() || 'EX';
      return `<div class="monogram-circle">${esc(initials)}</div>`;
    }
  };

  // Imperial Gold Filigree Swirls for Model 10
  const FLOURISH_SVG = `
    <svg viewBox="0 0 340 175" fill="none" stroke="currentColor" stroke-linecap="round">
      <path d="M135 175 C175 115 168 42 132 22 C105 8 82 28 92 50 C100 66 118 58 114 44" stroke-width="3.2"/>
      <path d="M108 175 C82 125 98 70 132 78 C154 84 152 114 132 114" stroke-width="2.2"/>
      <path d="M205 175 C165 115 172 42 208 22 C235 8 258 28 248 50 C240 66 222 58 226 44" stroke-width="3.2"/>
      <path d="M232 175 C258 125 242 70 208 78 C186 84 188 114 208 114" stroke-width="2.2"/>
      <path d="M18 175 C14 128 45 104 66 122 C78 134 68 152 54 144" stroke-width="2"/>
      <path d="M322 175 C326 128 295 104 274 122 C262 134 272 152 286 144" stroke-width="2"/>
    </svg>
  `;

  // Contact Icons SVGs
  const ICONS = {
    phone: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>`,
    landline: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-3V4H7v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 6h6v2H9V6zm3 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4.2" ry="9"/><path d="M3.5 9h17M3.5 15h17M12 3v18"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`,
    house: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><rect x="9.5" y="13" width="5" height="7"/></svg>`,
    monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
    executive: `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2c0-3.3 3.6-6 8-6s8 2.7 8 6v2H4zm8-7l-1.5 4.5L12 20l1.5-1.5L12 14z"/></svg>`
  };

  let state = { ...DEFAULT_STATE };
  let isBack = false;
  let currentDeg = 0;
  let nfcAbortController = null;
  let lastScannedState = null;

  function esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { t.hidden = true; }, 4000);
  }

  function playNfcBeep(success = true) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(success ? 880 : 320, ctx.currentTime);
      if (success) osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
      setTimeout(() => ctx.close(), 350);
    } catch {}
    if (navigator.vibrate) {
      try { navigator.vibrate(success ? [35, 50, 65] : [120]); } catch {}
    }
  }

  // Decode card payload from URL (?d=compact or ?c=json)
  function parseCardFromUrl(urlStr) {
    try {
      const u = new URL(urlStr, window.location.origin);
      const d = u.searchParams.get('d');
      if (d) {
        const b64 = d.replace(/-/g, '+').replace(/_/g, '/');
        const raw = decodeURIComponent(escape(atob(b64)));
        const parts = raw.split('\x1f');
        if (parts.length >= 8) {
          return {
            company: parts[0] || DEFAULT_STATE.company,
            tagline: parts[1] || DEFAULT_STATE.tagline,
            name: parts[2] || DEFAULT_STATE.name,
            role: parts[3] || DEFAULT_STATE.role,
            email: parts[4] || DEFAULT_STATE.email,
            phone: parts[5] || DEFAULT_STATE.phone,
            address: parts[6] || DEFAULT_STATE.address,
            website: parts[7] || DEFAULT_STATE.website,
            accent: parts[8] || DEFAULT_STATE.accent,
            dark: parts[9] || DEFAULT_STATE.dark,
            box: parts[10] || DEFAULT_STATE.box,
            emblem: parts[11] || DEFAULT_STATE.emblem,
            template: parts[12] || DEFAULT_STATE.template,
            phone2: parts[13] || DEFAULT_STATE.phone2,
            services: parts[14] || DEFAULT_STATE.services
          };
        }
      }
      const c = u.searchParams.get('c');
      if (c) {
        const json = decodeURIComponent(escape(atob(c)));
        return JSON.parse(json);
      }
    } catch (e) {
      console.warn('Could not parse card URL:', e);
    }
    return null;
  }

  function loadInitialState() {
    const parsedFromUrl = parseCardFromUrl(window.location.href);
    if (parsedFromUrl) {
      state = { ...DEFAULT_STATE, ...parsedFromUrl };
      document.documentElement.classList.add('pure-nfc-mode');
      document.body.classList.add('pure-nfc-mode');
      $('editor-panel').hidden = true;
      $('app-header').hidden = true;
      $('nfc-visitor-bar').hidden = true;
      if ($('app-footer')) $('app-footer').hidden = true;
      return;
    }
    try {
      const saved = localStorage.getItem('vcard_executive_state_v2');
      if (saved) {
        state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch {}
  }

  function saveState() {
    try {
      localStorage.setItem('vcard_executive_state_v2', JSON.stringify(state));
    } catch {}
  }

  function getContrastColor(hex) {
    const clean = (hex || '#00f5e1').replace('#', '');
    if (clean.length !== 6) return '#161616';
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 145 ? '#161616' : '#ffffff';
  }

  function cleanUrl(raw) {
    const trimmed = (raw || '').trim();
    if (!trimmed) return 'https://4u.ia.br';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return 'https://' + trimmed;
  }

  function cleanPhoneDigits(raw) {
    return (raw || '').replace(/[^\d+]/g, '');
  }

  function renderEmblemHtml() {
    if (state.customLogo) {
      return `<img src="${esc(state.customLogo)}" alt="Logo">`;
    }
    const fn = EMBLEMS[state.emblem] || EMBLEMS.labyrinth;
    return fn(state);
  }

  function splitNameParts(fullName) {
    const parts = (fullName || 'NAME SURNAME').trim().split(/\s+/);
    if (parts.length === 1) return [parts[0], ''];
    return [parts[0], parts.slice(1).join(' ')];
  }

  function addressLinesHtml(addr) {
    return esc(addr || '').replace(/\n/g, '<br>');
  }

  // Real ISO/IEC 18004 Scannable QR Code Renderer on Canvas
  function drawQrVisual(canvas, text, accentColor = '#00bfa5', darkBg = false) {
    if (!canvas) return;
    const payload = (text || window.location.href || 'https://4u.ia.br/app/vcard/').trim();

    // Ensure high internal pixel resolution for crisp scanning on mobile screens
    const targetPx = Math.max(canvas.width || 220, 220);
    if (canvas.width !== targetPx) canvas.width = targetPx;
    if (canvas.height !== targetPx) canvas.height = targetPx;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const size = canvas.width;

    // High-contrast background & foreground so 100% of iOS/Android cameras scan instantly
    const bgColor = darkBg ? '#fcf5e3' : '#ffffff';
    const fgColor = darkBg ? '#14120d' : '#111111';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    if (typeof window.qrcode === 'function') {
      try {
        const qr = window.qrcode(0, 'L');
        qr.addData(payload);
        qr.make();
        const count = qr.getModuleCount();
        const quietZone = 2.5;
        const totalModules = count + quietZone * 2;
        const cellSize = size / totalModules;
        const offset = quietZone * cellSize;

        ctx.fillStyle = fgColor;
        for (let r = 0; r < count; r++) {
          for (let c = 0; c < count; c++) {
            if (qr.isDark(r, c)) {
              const x0 = Math.floor(offset + c * cellSize);
              const y0 = Math.floor(offset + r * cellSize);
              const x1 = Math.ceil(offset + (c + 1) * cellSize);
              const y1 = Math.ceil(offset + (r + 1) * cellSize);
              ctx.fillRect(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0));
            }
          }
        }

        if (darkBg) {
          ctx.strokeStyle = accentColor || '#e5c168';
          ctx.lineWidth = Math.max(4, Math.round(size * 0.025));
          ctx.strokeRect(0, 0, size, size);
        }
        return;
      } catch (err) {
        console.warn('QR encode fallback:', err);
      }
    }
  }

  // ================= 6 TEMPLATES RENDERER (FRONT & BACK) =================
  function renderTemplateFaces() {
    const logo = renderEmblemHtml();
    const [firstName, lastName] = splitNameParts(state.name);
    const phoneDigits = cleanPhoneDigits(state.phone);
    const phoneHref = `tel:${phoneDigits}`;
    const emailHref = `mailto:${esc((state.email || '').trim())}`;
    const webHref = esc(cleanUrl(state.website));
    const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(state.address || '')}`;
    const tpl = state.template || 'cyan-curve';

    let frontHtml = '';
    let backHtml = '';

    if (tpl === 'cyan-curve') {
      // MODEL 1: Original Cyan Curve & Dark Charcoal
      frontHtml = `
        <div class="front-top-bar"></div>
        <div class="front-top-tongue">
          <div class="nfc-chip-waves" title="NFC Contactless">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 8.5a6.5 6.5 0 0 1 0 7"/><path d="M9.5 6a10 10 0 0 1 0 12"/><path d="M13 3.5a13.5 13.5 0 0 1 0 17"/>
            </svg>
          </div>
        </div>
        <div class="front-center-content">
          <div class="brand-logo-wrap">${logo}</div>
          <h1 class="front-company-name">${esc(state.company)}</h1>
          <p class="front-tagline">${esc(state.tagline)}</p>
        </div>
        <div class="card-flip-badge" data-flip-trigger><span>Deslize para ver contatos →</span></div>
        <div class="front-bottom-tongue">
          <a href="${webHref}" target="_blank" rel="noopener noreferrer" class="front-website-link">${esc(state.website)}</a>
        </div>
      `;

      backHtml = `
        <div class="back-top-header">
          <div class="back-header-inner">
            <div class="brand-logo-wrap back-logo-wrap">${logo}</div>
            <h2 class="back-company-name">${esc(state.company)}</h2>
            <p class="back-tagline">${esc(state.tagline)}</p>
          </div>
          <div class="back-top-tongue"></div>
        </div>
        <div class="back-person-block">
          <h3 class="back-person-name">${esc(state.name)}</h3>
          <p class="back-person-role">${esc(state.role)}</p>
        </div>
        <div class="back-contact-box">
          <a class="contact-row" href="${emailHref}">
            <span class="contact-icon-circle">${ICONS.email}</span>
            <span class="contact-text">${esc(state.email)}</span>
          </a>
          <a class="contact-row" href="${phoneHref}">
            <span class="contact-icon-circle">${ICONS.phone}</span>
            <span class="contact-text">${esc(state.phone)}</span>
          </a>
          <a class="contact-row" href="${mapHref}" target="_blank" rel="noopener noreferrer">
            <span class="contact-icon-circle">${ICONS.house}</span>
            <span class="contact-text">${addressLinesHtml(state.address)}</span>
          </a>
          <a class="contact-row" href="${webHref}" target="_blank" rel="noopener noreferrer">
            <span class="contact-icon-circle">${ICONS.globe}</span>
            <span class="contact-text">${esc(state.website)}</span>
          </a>
        </div>
      `;
    } else if (tpl === 'mono-sidebar') {
      // MODEL 2: Graphite Left Sidebar + Diamond Icons + Bottom Right QR
      frontHtml = `
        <div class="tpl-light-surface">
          <div class="m2-sidebar"></div>
          <div class="m2-front-body">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="color:var(--card-dark)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="color:#262626">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>
          <div class="m2-front-footer">
            <span class="tpl-services-footer">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface">
          <div class="m2-sidebar"></div>
          <div class="m2-sidebar-notch"></div>
          <div class="m2-back-body">
            <div class="tpl-brand-row" style="margin-bottom:46px">
              <div class="tpl-emblem" style="color:var(--card-dark)">${logo}</div>
              <div>
                <h2 class="tpl-company-title" style="font-size:18px;color:#262626">${esc(state.company)}</h2>
                <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
              </div>
            </div>

            <div class="tpl-name-block">
              <h3><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <p>${esc(state.role)}</p>
            </div>

            <div class="m2-contact-list">
              <a class="tpl-contact-link m2-contact-item" href="${phoneHref}">
                <span class="m2-diamond-icon">${ICONS.phone}</span>
                <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
              </a>
              <a class="tpl-contact-link m2-contact-item" href="${emailHref}">
                <span class="m2-diamond-icon">${ICONS.globe}</span>
                <div>${esc(state.email)}<br>${esc(state.website)}</div>
              </a>
              <a class="tpl-contact-link m2-contact-item" href="${mapHref}" target="_blank" rel="noopener noreferrer">
                <span class="m2-diamond-icon">${ICONS.pin}</span>
                <div>${addressLinesHtml(state.address)}</div>
              </a>
            </div>

            <div style="margin-top:auto;display:flex;justify-content:flex-end;padding-top:10px">
              <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
            </div>
          </div>
        </div>
      `;
    } else if (tpl === 'teal-stripes') {
      // MODEL 3: Teal Double Vertical Stripes + Diagonal Cut + Square Icons
      frontHtml = `
        <div class="tpl-dark-surface">
          <div class="m3-front-left-bars"><i></i><i></i></div>
          <div class="m3-front-right-bars"><i></i><i></i></div>
          <div class="tpl-brand-col" style="margin:auto;text-align:center;padding:0 36px;z-index:2">
            <div class="tpl-emblem" style="width:52px;height:52px;margin:0 auto 10px;color:var(--card-accent)">${logo}</div>
            <h1 class="tpl-company-title" style="font-size:23px;color:#fff">${esc(state.company)}</h1>
            <p class="tpl-company-sub" style="color:#ccc">${esc(state.tagline)}</p>
          </div>
          <div style="text-align:center;padding-bottom:68px;z-index:2">
            <span class="tpl-services-footer" style="color:#e5e5e5">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface" style="padding:38px 24px 24px 72px">
          <div class="m3-back-bars"><i></i><i></i></div>
          <div class="m3-back-slash"></div>

          <div style="text-align:center;margin-bottom:34px">
            <div class="tpl-emblem" style="width:42px;height:42px;margin:0 auto 6px;color:var(--card-accent)">${logo}</div>
            <h2 class="tpl-company-title" style="font-size:19px;color:#2b2b2b">${esc(state.company)}</h2>
            <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
          </div>

          <div class="tpl-name-block" style="padding-bottom:10px;border-bottom:2px solid var(--card-accent)">
            <h3><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
            <p>${esc(state.role)}</p>
          </div>

          <div style="margin-top:20px;display:flex;flex-direction:column;gap:15px">
            <div class="m3-contact-row">
              <a class="tpl-contact-link" href="${phoneHref}">
                <span class="m3-sq-icon">${ICONS.phone}</span>
                <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
              </a>
              <span class="m3-dash"></span>
            </div>
            <div class="m3-contact-row">
              <a class="tpl-contact-link" href="${emailHref}">
                <span class="m3-sq-icon">${ICONS.globe}</span>
                <div>${esc(state.email)}<br>${esc(state.website)}</div>
              </a>
              <span class="m3-dash"></span>
            </div>
            <div class="m3-contact-row">
              <a class="tpl-contact-link" href="${mapHref}" target="_blank" rel="noopener noreferrer">
                <span class="m3-sq-icon">${ICONS.pin}</span>
                <div>${addressLinesHtml(state.address)}</div>
              </a>
              <span class="m3-dash"></span>
            </div>
          </div>

          <div style="margin-top:auto;display:flex;justify-content:flex-end;padding-top:10px">
            <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'red-band') {
      // MODEL 4: Crimson Band (Horizontal Center Band on Front, Dark Contact Band on Back)
      frontHtml = `
        <div class="tpl-dark-surface">
          <div class="m4-front-band">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:46px;height:46px;color:var(--card-accent)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="color:#fff;font-size:22px">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#ddd">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>
          <div style="text-align:center;padding-bottom:58px">
            <span class="tpl-services-footer" style="color:#e0e0e0">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface">
          <div class="m4-back-top-bar"></div>
          <div style="padding:44px 24px 20px 64px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:42px;height:42px;color:var(--card-accent)">${logo}</div>
              <div>
                <h2 class="tpl-company-title" style="font-size:19px;color:#2b2b2b">${esc(state.company)}</h2>
                <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
              </div>
            </div>

            <div class="tpl-name-block" style="margin-top:64px">
              <h3><strong style="color:var(--card-accent)">${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <p>${esc(state.role)}</p>
            </div>
          </div>

          <div class="m4-back-mid-band">
            <a class="tpl-contact-link" href="${phoneHref}" style="color:#fff">
              <span class="m4-round-icon">${ICONS.phone}</span>
              <span>${esc(state.phone)}</span>
            </a>
            <a class="tpl-contact-link" href="${phoneHref}" style="color:#fff">
              <span class="m4-round-icon">${ICONS.landline}</span>
              <span>${esc(state.phone2)}</span>
            </a>
            <a class="tpl-contact-link" href="${emailHref}" style="color:#fff">
              <span class="m4-round-icon">${ICONS.email}</span>
              <span>${esc(state.email)}</span>
            </a>
            <a class="tpl-contact-link" href="${webHref}" target="_blank" rel="noopener noreferrer" style="color:#fff">
              <span class="m4-round-icon">${ICONS.monitor}</span>
              <span>${esc(state.website)}</span>
            </a>
          </div>

          <div style="flex:1;padding:16px 24px 22px 60px;display:flex;align-items:center;justify-content:space-between;gap:12px">
            <a class="tpl-contact-link" href="${mapHref}" target="_blank" rel="noopener noreferrer" style="flex-direction:column;align-items:flex-start;gap:6px">
              <span style="color:var(--card-accent);width:18px;height:18px;display:block">${ICONS.pin}</span>
              <div>${addressLinesHtml(state.address)}</div>
            </a>
            <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'orange-column') {
      // MODEL 5: Coral Executive Column + Avatar Box + Grey Contact Strips
      frontHtml = `
        <div class="tpl-dark-surface">
          <div style="margin:auto;padding:24px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:48px;height:48px;color:var(--card-accent)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="color:#fff;font-size:22px">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#ccc">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>
          <div style="text-align:center;padding-bottom:64px">
            <span class="tpl-services-footer" style="color:#e5e5e5">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface" style="padding:36px 22px 22px">
          <div class="m5-top-pillar"></div>
          <div class="m5-avatar-box">${ICONS.executive}</div>
          <div class="m5-bottom-pillar"></div>

          <div class="tpl-brand-row" style="margin-left:62px;margin-bottom:72px">
            <div class="tpl-emblem" style="width:42px;height:42px;color:var(--card-accent)">${logo}</div>
            <div>
              <h2 class="tpl-company-title" style="font-size:19px;color:#2b2b2b">${esc(state.company)}</h2>
              <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
            </div>
          </div>

          <div class="tpl-name-block" style="margin-left:62px;margin-bottom:26px">
            <h3><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
            <p>${esc(state.role)}</p>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;position:relative;z-index:2">
            <a class="tpl-contact-link m5-card-strip" href="${phoneHref}">
              <div class="m5-strip-left"><span class="m3-sq-icon" style="width:24px;height:24px">${ICONS.phone}</span></div>
              <div style="padding:6px 10px">${esc(state.phone)}<br>${esc(state.phone2)}</div>
            </a>
            <a class="tpl-contact-link m5-card-strip" href="${emailHref}">
              <div class="m5-strip-left"><span class="m3-sq-icon" style="width:24px;height:24px">${ICONS.globe}</span></div>
              <div style="padding:6px 10px">${esc(state.email)}<br>${esc(state.website)}</div>
            </a>
            <a class="tpl-contact-link m5-card-strip" href="${mapHref}" target="_blank" rel="noopener noreferrer">
              <div class="m5-strip-left"><span class="m3-sq-icon" style="width:24px;height:24px">${ICONS.pin}</span></div>
              <div style="padding:6px 10px">${addressLinesHtml(state.address)}</div>
            </a>
          </div>

          <div style="margin-top:auto;display:flex;justify-content:flex-end;padding-top:12px;position:relative;z-index:2">
            <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'blue-ribbon') {
      // MODEL 6: Royal Top Vertical Ribbon + Bottom Accent Bar & QR
      frontHtml = `
        <div class="tpl-dark-surface">
          <div class="m6-front-ribbon"></div>
          <div style="padding:0 28px 0 72px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:46px;height:46px;color:var(--card-accent)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="color:#fff;font-size:22px">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#ccc">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>
          <div style="margin-top:auto;text-align:center;padding-bottom:64px">
            <span class="tpl-services-footer" style="color:#e5e5e5">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface">
          <div class="m6-back-top-ribbon"></div>
          <div style="padding:0 24px 0 34px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:42px;height:42px;color:var(--card-accent)">${logo}</div>
              <div>
                <h2 class="tpl-company-title" style="font-size:19px;color:#2b2b2b">${esc(state.company)}</h2>
                <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
              </div>
            </div>

            <div class="tpl-name-block" style="margin-top:46px;position:relative">
              <h3><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <div style="display:flex;align-items:center;gap:10px;margin-top:3px">
                <p style="margin:0">${esc(state.role)}</p>
                <span style="flex:1;height:2px;background:var(--card-accent)"></span>
              </div>
            </div>

            <a class="tpl-contact-link" href="${mapHref}" target="_blank" rel="noopener noreferrer" style="margin-top:16px;display:block">
              <div>${addressLinesHtml(state.address)}</div>
              <span style="display:block;width:28px;height:2.5px;background:var(--card-accent);margin-top:8px"></span>
            </a>

            <div style="margin-top:16px;display:flex;flex-direction:column;gap:8px">
              <a class="tpl-contact-link" href="${phoneHref}">
                <span class="m4-round-icon">${ICONS.phone}</span>
                <span>${esc(state.phone)}</span>
              </a>
              <a class="tpl-contact-link" href="${phoneHref}">
                <span class="m4-round-icon">${ICONS.landline}</span>
                <span>${esc(state.phone2)}</span>
              </a>
              <a class="tpl-contact-link" href="${emailHref}">
                <span class="m4-round-icon">${ICONS.email}</span>
                <span>${esc(state.email)}</span>
              </a>
              <a class="tpl-contact-link" href="${webHref}" target="_blank" rel="noopener noreferrer">
                <span class="m4-round-icon">${ICONS.monitor}</span>
                <span>${esc(state.website)}</span>
              </a>
            </div>
          </div>

          <div style="margin-top:auto;padding:12px 24px 24px 0;display:flex;align-items:center;gap:18px">
            <div class="m6-bottom-bar"></div>
            <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'shield-banner') {
      // MODEL 7: Pentagon Shield Top Banner + Clean Table + Dark Bottom Footer with QR
      frontHtml = `
        <div class="tpl-dark-surface">
          <div class="m4-front-band" style="height:215px;flex-direction:column;text-align:center">
            <div class="tpl-emblem" style="width:52px;height:52px;color:#ffffff;margin-bottom:10px">${logo}</div>
            <h1 class="tpl-company-title" style="color:#ffffff;font-size:21px">${esc(state.company)}</h1>
            <p class="tpl-company-sub" style="color:#d8d8d8">${esc(state.tagline)}</p>
          </div>
          <div style="text-align:center;padding-bottom:56px">
            <span class="tpl-services-footer" style="color:#e5e5e5">${esc(state.services)}</span>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface">
          <div class="m7-top-shield">
            <div class="tpl-emblem" style="width:46px;height:46px;color:#ffffff;margin:0 auto 8px">${logo}</div>
            <h2 class="tpl-company-title" style="color:#ffffff;font-size:18px">${esc(state.company)}</h2>
            <p class="tpl-company-sub" style="color:#dcdcdc">${esc(state.tagline)}</p>
          </div>

          <div style="padding:26px 28px 16px">
            <div class="tpl-name-block">
              <h3><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <p>${esc(state.role)}</p>
              <span style="display:block;width:30px;height:3px;background:var(--card-dark);margin-top:10px"></span>
            </div>

            <div class="m7-info-table">
              <a class="m7-info-row" href="${phoneHref}"><span>Phone</span><span>:</span><span>${esc(state.phone)}</span></a>
              <a class="m7-info-row" href="${phoneHref}"><span>Fax</span><span>:</span><span>${esc(state.phone2)}</span></a>
              <a class="m7-info-row" href="${emailHref}"><span>email</span><span>:</span><span>${esc(state.email)}</span></a>
              <a class="m7-info-row" href="${webHref}" target="_blank" rel="noopener noreferrer"><span>Website</span><span>:</span><span>${esc(state.website)}</span></a>
            </div>
          </div>

          <div class="m7-bottom-footer">
            <a class="tpl-contact-link" href="${mapHref}" target="_blank" rel="noopener noreferrer" style="flex-direction:column;align-items:flex-start;gap:6px;color:#fff">
              <span style="width:16px;height:16px;color:#fff">${ICONS.pin}</span>
              <div>${addressLinesHtml(state.address)}</div>
            </a>
            <canvas class="tpl-qr-mini" data-card-qr width="120" height="120"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'gold-bars') {
      // MODEL 8: Black & Gold 24k with 3 Metallic Bottom Stripes & Top-Right Gold QR
      frontHtml = `
        <div class="gold-surface">
          <div style="margin:auto;text-align:center;padding:24px">
            <div class="tpl-emblem" style="width:74px;height:74px;margin:0 auto;color:var(--card-accent)">${logo}</div>
            <h1 class="gold-brand-title">${esc(state.company)}</h1>
            <p class="gold-brand-sub">${esc(state.tagline)}</p>
          </div>
          <div style="padding-bottom:32px">
            <div class="gold-metallic-bars"><i></i><i></i><i></i></div>
          </div>
        </div>
      `;

      backHtml = `
        <div class="gold-surface">
          <div style="padding:36px 28px 10px;display:flex;justify-content:flex-end">
            <canvas class="tpl-qr-mini" data-card-qr="dark" width="120" height="120" style="background:transparent;padding:0"></canvas>
          </div>

          <div style="padding:12px 28px 20px;margin-top:auto;margin-bottom:auto">
            <div style="margin-bottom:28px">
              <h3 class="gold-person-name"><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <p class="gold-person-role">${esc(state.role)}</p>
            </div>

            <div class="gold-contact-list">
              <a class="gold-contact-row" href="${phoneHref}">
                <span class="gold-contact-icon">${ICONS.phone}</span>
                <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
              </a>
              <a class="gold-contact-row" href="${emailHref}">
                <span class="gold-contact-icon">${ICONS.globe}</span>
                <div>${esc(state.email)}<br>${esc(state.website)}</div>
              </a>
              <a class="gold-contact-row" href="${mapHref}" target="_blank" rel="noopener noreferrer">
                <span class="gold-contact-icon">${ICONS.pin}</span>
                <div>${addressLinesHtml(state.address)}</div>
              </a>
            </div>
          </div>

          <div style="padding-bottom:32px">
            <div class="gold-metallic-bars"><i></i><i></i><i></i></div>
          </div>
        </div>
      `;
    } else if (tpl === 'gold-plaid') {
      // MODEL 9: Black & Gold Intersecting Tartan/Grid Lines
      frontHtml = `
        <div class="gold-surface">
          <div class="gold-plaid-h"><i></i><i></i><i></i></div>
          <div class="gold-plaid-v right"><i></i><i></i><i></i></div>
          <div style="margin:auto;text-align:center;padding:24px 54px 24px 24px;z-index:3">
            <div class="tpl-emblem" style="width:72px;height:72px;margin:0 auto;color:var(--card-accent)">${logo}</div>
            <h1 class="gold-brand-title">${esc(state.company)}</h1>
            <p class="gold-brand-sub">${esc(state.tagline)}</p>
          </div>
        </div>
      `;

      backHtml = `
        <div class="gold-surface" style="padding:84px 24px 28px 66px">
          <div class="gold-plaid-h"><i></i><i></i><i></i></div>
          <div class="gold-plaid-v left"><i></i><i></i><i></i></div>

          <div style="margin-bottom:26px;z-index:3">
            <h3 class="gold-person-name"><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
            <p class="gold-person-role">${esc(state.role)}</p>
          </div>

          <div class="gold-contact-list" style="z-index:3">
            <a class="gold-contact-row" href="${phoneHref}">
              <span class="gold-contact-icon">${ICONS.phone}</span>
              <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
            </a>
            <a class="gold-contact-row" href="${emailHref}">
              <span class="gold-contact-icon">${ICONS.globe}</span>
              <div>${esc(state.email)}<br>${esc(state.website)}</div>
            </a>
            <a class="gold-contact-row" href="${mapHref}" target="_blank" rel="noopener noreferrer">
              <span class="gold-contact-icon">${ICONS.pin}</span>
              <div>${addressLinesHtml(state.address)}</div>
            </a>
          </div>

          <div style="margin-top:auto;display:flex;justify-content:center;padding-right:28px;z-index:3">
            <canvas class="tpl-qr-mini" data-card-qr="dark" width="120" height="120" style="background:transparent;padding:0;width:82px;height:82px"></canvas>
          </div>
        </div>
      `;
    } else if (tpl === 'gold-script') {
      // MODEL 10: Royal Gold Calligraphy & Filigree Swirls
      frontHtml = `
        <div class="gold-surface">
          <div style="margin:auto;text-align:center;padding:0 24px 60px;z-index:2">
            <div class="tpl-emblem" style="width:74px;height:74px;margin:0 auto 12px;color:var(--card-accent)">${logo}</div>
            <h1 class="script-heading" style="font-size:44px;margin:0">${esc(state.company)}</h1>
            <p class="gold-brand-sub" style="margin-top:6px;font-size:8px">${esc(state.tagline)}</p>
          </div>
          <div class="script-flourish-bottom">${FLOURISH_SVG}</div>
        </div>
      `;

      backHtml = `
        <div class="gold-surface" style="padding:52px 28px 160px">
          <div style="text-align:center;margin-bottom:32px;z-index:2">
            <h3 class="script-heading" style="font-size:50px;margin:0">${esc(firstName)}<br>${esc(lastName)}</h3>
            <p class="gold-person-role" style="margin-top:6px;letter-spacing:1.5px;text-transform:uppercase;font-size:9px">${esc(state.role)}</p>
          </div>

          <div class="gold-contact-list" style="margin:0 auto;z-index:2">
            <a class="gold-contact-row" href="${phoneHref}">
              <span class="gold-contact-icon">${ICONS.phone}</span>
              <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
            </a>
            <a class="gold-contact-row" href="${emailHref}">
              <span class="gold-contact-icon">${ICONS.globe}</span>
              <div>${esc(state.email)}<br>${esc(state.website)}</div>
            </a>
            <a class="gold-contact-row" href="${mapHref}" target="_blank" rel="noopener noreferrer">
              <span class="gold-contact-icon">${ICONS.pin}</span>
              <div>${addressLinesHtml(state.address)}</div>
            </a>
          </div>

          <div class="script-flourish-bottom">${FLOURISH_SVG}</div>
        </div>
      `;
    } else if (tpl === 'cyan-frame') {
      // MODEL 11: Charcoal Frame with Split Cyan & Light Panels
      frontHtml = `
        <div class="m11-frame">
          <div class="m11-panel-light" style="flex:1.55;align-items:center;justify-content:center;padding:20px;gap:26px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:46px;height:46px;color:var(--card-accent)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="font-size:19px;color:#2b2b2b">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#555">${esc(state.tagline)}</p>
              </div>
            </div>
            <canvas class="tpl-qr-mini" data-card-qr width="130" height="130" style="width:92px;height:92px;background:transparent"></canvas>
          </div>

          <a class="m11-panel-accent" href="${mapHref}" target="_blank" rel="noopener noreferrer" style="flex:0.85;text-decoration:none;text-align:center;padding:16px">
            <span style="width:20px;height:20px;color:#fff;margin-bottom:8px">${ICONS.pin}</span>
            <div style="font-size:10px;line-height:1.45;font-weight:500;color:#fff">${addressLinesHtml(state.address)}</div>
          </a>
        </div>
      `;

      backHtml = `
        <div class="m11-frame">
          <div class="m11-panel-accent" style="flex:0.68;padding:18px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:46px;height:46px;color:#ffffff">${logo}</div>
              <div>
                <h2 class="tpl-company-title" style="font-size:19px;color:#ffffff">${esc(state.company)}</h2>
                <p class="tpl-company-sub" style="color:#eef9ff">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>

          <div class="m11-panel-light" style="flex:1.32;padding:26px 18px 20px 60px;justify-content:space-between">
            <div class="m11-left-strip" style="height:82px;justify-content:flex-end;padding-bottom:10px;color:#222">
              ${ICONS.executive}
            </div>
            <div class="m11-left-strip" style="top:122px;bottom:0;justify-content:space-around;padding:12px 0">
              <span class="m11-white-sq-icon">${ICONS.phone}</span>
              <span class="m11-white-sq-icon">${ICONS.landline}</span>
              <span class="m11-white-sq-icon">${ICONS.email}</span>
              <span class="m11-white-sq-icon">${ICONS.monitor}</span>
            </div>

            <div class="tpl-name-block" style="margin-top:8px">
              <h3 style="font-size:18px"><strong style="color:var(--card-accent)">${esc(firstName)}</strong> ${esc(lastName)}</h3>
              <p>${esc(state.role)}</p>
            </div>

            <div style="display:flex;flex-direction:column;justify-content:space-around;height:188px;font-size:10.5px;font-weight:500;color:#333">
              <a href="${phoneHref}" style="color:inherit;text-decoration:none">${esc(state.phone)}</a>
              <a href="${phoneHref}" style="color:inherit;text-decoration:none">${esc(state.phone2)}</a>
              <a href="${emailHref}" style="color:inherit;text-decoration:none">${esc(state.email)}</a>
              <a href="${webHref}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">${esc(state.website)}</a>
            </div>
          </div>
        </div>
      `;
    } else if (tpl === 'blue-shield-center') {
      // MODEL 12: Royal Blue Top Shield + Centered Job Badge + Vertically Stacked Contact Blocks
      const invertedHexLogo = (!state.customLogo && state.emblem === 'hexprism')
        ? `<svg viewBox="0 0 100 100"><polygon points="50,6 92,28 92,72 50,94 8,72 8,28" fill="#ffffff"/><polygon points="22,34 78,34 50,84" fill="var(--card-accent)"/></svg>`
        : logo;

      frontHtml = `
        <div class="tpl-dark-surface">
          <div style="margin:auto;padding:28px">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:52px;height:52px;color:var(--card-accent)">${logo}</div>
              <div>
                <h1 class="tpl-company-title" style="color:#ffffff;font-size:22px">${esc(state.company)}</h1>
                <p class="tpl-company-sub" style="color:#d0d0d0">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      backHtml = `
        <div class="tpl-light-surface">
          <div class="m12-top-shield">
            <div class="tpl-brand-row">
              <div class="tpl-emblem" style="width:46px;height:46px;color:#ffffff">${invertedHexLogo}</div>
              <div>
                <h2 class="tpl-company-title" style="color:#ffffff;font-size:19px">${esc(state.company)}</h2>
                <p class="tpl-company-sub" style="color:#e6f4ff">${esc(state.tagline)}</p>
              </div>
            </div>
          </div>

          <div class="tpl-name-block" style="text-align:center;margin-top:26px">
            <h3 style="font-size:20px"><strong>${esc(firstName)}</strong> ${esc(lastName)}</h3>
            <div><span class="m12-role-badge">${esc(state.role)}</span></div>
          </div>

          <div class="m12-center-stack">
            <a class="m12-contact-block" href="${phoneHref}">
              <span class="m3-sq-icon">${ICONS.phone}</span>
              <div>${esc(state.phone)}<br>${esc(state.phone2)}</div>
            </a>

            <a class="m12-contact-block" href="${emailHref}">
              <span class="m3-sq-icon">${ICONS.globe}</span>
              <div>${esc(state.email)}</div>
            </a>

            <a class="m12-contact-block" href="${mapHref}" target="_blank" rel="noopener noreferrer">
              <span class="m3-sq-icon">${ICONS.pin}</span>
              <div>${addressLinesHtml(state.address)}</div>
            </a>
          </div>
        </div>
      `;
    }

    $('mount-front').innerHTML = frontHtml;
    $('mount-back').innerHTML = backHtml;

    // Bind any flip triggers inside the newly rendered template
    for (const el of document.querySelectorAll('[data-flip-trigger]')) {
      el.onclick = (e) => {
        e.stopPropagation();
        setFace(!isBack);
      };
    }

    // Draw live QR Code on templates that include [data-card-qr]
    const qrCanvases = document.querySelectorAll('[data-card-qr]');
    if (qrCanvases.length) {
      const shareUrl = buildShareableNfcUrl();
      for (const c of qrCanvases) {
        const isDarkQr = c.dataset.cardQr === 'dark';
        drawQrVisual(c, shareUrl, state.accent, isDarkQr);
      }
    }
  }

  function renderCard() {
    const root = document.documentElement;
    state.accentText = getContrastColor(state.accent);
    root.style.setProperty('--card-accent', state.accent);
    root.style.setProperty('--card-dark', state.dark);
    root.style.setProperty('--card-box', state.box || '#3b3b3b');
    root.style.setProperty('--card-accent-text', state.accentText);

    renderTemplateFaces();

    const phoneDigits = cleanPhoneDigits(state.phone);
    $('btn-whatsapp-direct').href = `https://wa.me/${phoneDigits.replace(/^\+/, '')}`;
  }

  function syncFormInputs() {
    $('input-company').value = state.company;
    $('input-tagline').value = state.tagline;
    $('input-name').value = state.name;
    $('input-role').value = state.role;
    $('input-services').value = state.services;
    $('input-email').value = state.email;
    $('input-phone').value = state.phone;
    $('input-phone2').value = state.phone2;
    $('input-address').value = state.address;
    $('input-website').value = state.website;
    $('input-custom-accent').value = state.accent;
    $('input-custom-dark').value = state.dark;

    for (const tCard of document.querySelectorAll('.template-card')) {
      tCard.classList.toggle('active', tCard.dataset.template === state.template);
    }
    for (const btn of document.querySelectorAll('.emblem-btn')) {
      btn.classList.toggle('active', !state.customLogo && btn.dataset.emblem === state.emblem);
    }
    for (const sw of document.querySelectorAll('.palette-swatch')) {
      sw.classList.toggle('active', sw.dataset.accent.toLowerCase() === state.accent.toLowerCase());
    }
  }

  // ================= 3D CARD FLIP & FINGER SWIPE ENGINE =================
  const scene = $('card-scene');
  const card3d = $('card-3d');
  const tabFront = $('tab-front');
  const tabBack = $('tab-back');

  // Keep continuous 180° step rotation so swiping left or right ALWAYS flips smoothly without getting stuck
  function syncFaceTabs() {
    const normalized = ((Math.round(currentDeg / 180) % 2) + 2) % 2;
    isBack = normalized === 1;
    tabFront.classList.toggle('active', !isBack);
    tabBack.classList.toggle('active', isBack);
  }

  function applyCardRotation(deg, vibrate = true) {
    currentDeg = Math.round(deg / 180) * 180;
    card3d.classList.remove('dragging');
    card3d.style.transform = `rotateY(${currentDeg}deg)`;
    syncFaceTabs();
    if (vibrate && navigator.vibrate) {
      try { navigator.vibrate(14); } catch {}
    }
  }

  function setFace(back, vibrate = true) {
    const wantBack = Boolean(back);
    syncFaceTabs();
    if (wantBack !== isBack) {
      applyCardRotation(currentDeg + 180, vibrate);
    } else {
      applyCardRotation(currentDeg, false);
    }
  }

  tabFront.onclick = () => setFace(false);
  tabBack.onclick = () => setFace(true);
  $('btn-flip-card').onclick = () => applyCardRotation(currentDeg + 180, true);

  let dragStartX = 0;
  let dragStartY = 0;
  let lastDx = 0;
  let lastDy = 0;
  let isDragging = false;
  let hasDraggedCard = false;
  let startDeg = 0;
  let activePointerId = null;

  function beginCardDrag(clientX, clientY, pointerId = null) {
    isDragging = true;
    hasDraggedCard = false;
    dragStartX = clientX;
    dragStartY = clientY;
    lastDx = 0;
    lastDy = 0;
    startDeg = currentDeg;
    activePointerId = pointerId;
  }

  function moveCardDrag(clientX, clientY) {
    const rect = scene.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const relX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const relY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      const glare = `radial-gradient(circle at ${relX.toFixed(1)}% ${relY.toFixed(1)}%, rgba(255,255,255,0.22), transparent 60%)`;
      $('glare-front').style.background = glare;
      $('glare-back').style.background = glare;
    }

    if (!isDragging) return;
    lastDx = clientX - dragStartX;
    lastDy = clientY - dragStartY;

    if (!hasDraggedCard && Math.abs(lastDx) > 7) {
      hasDraggedCard = true;
      card3d.classList.add('dragging');
    }

    if (hasDraggedCard) {
      const deltaDeg = (lastDx / 180) * 180;
      const tiltX = Math.max(-8, Math.min(8, -lastDy / 25));
      const liveDeg = startDeg + deltaDeg;
      card3d.style.transform = `rotateY(${liveDeg.toFixed(1)}deg) rotateX(${tiltX.toFixed(1)}deg)`;
    }
  }

  function endCardDrag() {
    if (!isDragging) return;
    isDragging = false;
    activePointerId = null;

    if (Math.abs(lastDx) > 22) {
      // Flip 180° in the exact direction the finger pushed the card
      const step = lastDx > 0 ? 180 : -180;
      applyCardRotation(startDeg + step, true);
    } else {
      applyCardRotation(startDeg, false);
    }
    setTimeout(() => { hasDraggedCard = false; }, 60);
  }

  // Prevent accidental link navigation when the user was swiping the card
  scene.addEventListener('click', (e) => {
    if (hasDraggedCard) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Prevent native link/image ghost drag on desktop & mobile
  scene.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events (primary on Android / iOS so horizontal swipe never gets killed by pointercancel)
  scene.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    beginCardDrag(t.clientX, t.clientY, 'touch');
  }, { passive: true });

  scene.addEventListener('touchmove', (e) => {
    if (!isDragging || activePointerId !== 'touch' || !e.touches.length) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStartX;
    const dy = t.clientY - dragStartY;
    // If predominantly horizontal swipe, prevent vertical page scroll from canceling the flip
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 0.85 && e.cancelable) {
      e.preventDefault();
    }
    moveCardDrag(t.clientX, t.clientY);
  }, { passive: false });

  scene.addEventListener('touchend', () => {
    if (activePointerId === 'touch') endCardDrag();
  });

  scene.addEventListener('touchcancel', () => {
    if (activePointerId === 'touch') endCardDrag();
  });

  // Mouse / Pointer fallback for desktop
  scene.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    beginCardDrag(e.clientX, e.clientY, e.pointerId);
    try { scene.setPointerCapture(e.pointerId); } catch {}
  });

  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    moveCardDrag(e.clientX, e.clientY);
  });

  scene.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch') return;
    endCardDrag();
  });

  scene.addEventListener('pointercancel', (e) => {
    if (e.pointerType === 'touch') return;
    endCardDrag();
  });

  // ================= TEMPLATE & FORM BINDINGS =================
  for (const tCard of document.querySelectorAll('.template-card')) {
    tCard.onclick = () => {
      const tpl = tCard.dataset.template;
      state.template = tpl;
      const preset = TEMPLATE_DEFAULTS[tpl];
      if (preset) {
        state.accent = preset.accent;
        state.dark = preset.dark;
        state.box = preset.box;
        if (!state.customLogo) state.emblem = preset.emblem;
      }
      syncFormInputs();
      renderCard();
      saveState();
    };
  }

  const fieldMap = [
    ['input-company', 'company'],
    ['input-tagline', 'tagline'],
    ['input-name', 'name'],
    ['input-role', 'role'],
    ['input-services', 'services'],
    ['input-email', 'email'],
    ['input-phone', 'phone'],
    ['input-phone2', 'phone2'],
    ['input-address', 'address'],
    ['input-website', 'website']
  ];

  for (const [inputId, key] of fieldMap) {
    $(inputId).addEventListener('input', (e) => {
      state[key] = e.target.value;
      renderCard();
      saveState();
      if (['name', 'role', 'email', 'phone', 'phone2', 'address'].includes(key) && !isBack) {
        setFace(true, false);
      } else if (['services'].includes(key) && isBack) {
        setFace(false, false);
      }
    });
  }

  for (const sw of document.querySelectorAll('.palette-swatch')) {
    sw.onclick = () => {
      state.accent = sw.dataset.accent;
      state.dark = sw.dataset.dark;
      state.box = sw.dataset.box;
      syncFormInputs();
      renderCard();
      saveState();
    };
  }

  $('input-custom-accent').oninput = (e) => {
    state.accent = e.target.value;
    renderCard();
    saveState();
  };

  $('input-custom-dark').oninput = (e) => {
    state.dark = e.target.value;
    renderCard();
    saveState();
  };

  for (const btn of document.querySelectorAll('.emblem-btn')) {
    btn.onclick = () => {
      state.emblem = btn.dataset.emblem;
      state.customLogo = '';
      syncFormInputs();
      renderCard();
      saveState();
    };
  }

  $('input-logo-file').onchange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        const max = 220;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        state.customLogo = c.toDataURL('image/png', 0.9);
        syncFormInputs();
        renderCard();
        saveState();
        showToast('✓ Logo aplicado ao cartão!');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  $('btn-reset-demo').onclick = () => {
    state = { ...DEFAULT_STATE };
    syncFormInputs();
    renderCard();
    saveState();
    setFace(false);
    showToast('Modelo original restaurado!');
  };

  // ================= CLIENT VIEW MODE & COMPACT NFC URL =================
  function exitVisitorAndOpenStudio() {
    document.documentElement.classList.remove('pure-nfc-mode');
    document.body.classList.remove('pure-nfc-mode', 'client-mode');
    $('editor-panel').hidden = false;
    $('app-header').hidden = false;
    if ($('app-footer')) $('app-footer').hidden = false;
    $('nfc-visitor-bar').hidden = true;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    $('btn-toggle-mode').innerHTML = `📱 <span class="hide-sm" data-i18n="viewAsClient">${isEn ? 'Client' : 'Cliente'}</span>`;
    window.history.replaceState({}, '', window.location.pathname);
    setTimeout(() => {
      $('editor-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    showToast(isEn ? '✨ Studio unlocked! Customize your own 3D Card below.' : '✨ Estúdio liberado! Personalize abaixo o seu próprio Cartão 3D.');
  }

  $('btn-toggle-mode').onclick = () => {
    const isClient = document.body.classList.toggle('client-mode');
    $('editor-panel').hidden = isClient;
    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    $('btn-toggle-mode').innerHTML = isClient
      ? `✏️ <span class="hide-sm">${isEn ? 'Editor' : 'Editor'}</span>`
      : `📱 <span class="hide-sm" data-i18n="viewAsClient">${isEn ? 'Client' : 'Cliente'}</span>`;
    showToast(isClient ? 'Visão do celular ao aproximar o cartão NFC! Passe o dedo para girar.' : 'Modo Editor ativado.');
  };

  $('btn-visitor-create').onclick = exitVisitorAndOpenStudio;
  if ($('btn-dock-create-card')) {
    $('btn-dock-create-card').onclick = exitVisitorAndOpenStudio;
  }

  function buildShareableNfcUrl() {
    const keys = [
      'company',
      'tagline',
      'name',
      'role',
      'email',
      'phone',
      'address',
      'website',
      'accent',
      'dark',
      'box',
      'emblem',
      'template',
      'phone2',
      'services'
    ];
    // Delta-compress against DEFAULT_STATE so unchanged fields take 0 bytes (smaller NFC payload & cleaner QR Code)
    const rawParts = keys.map((k) => (state[k] === DEFAULT_STATE[k] ? '' : (state[k] || '')));
    while (rawParts.length > 8 && rawParts[rawParts.length - 1] === '') {
      rawParts.pop();
    }
    const fields = rawParts.join('\x1f');
    const b64url = btoa(unescape(encodeURIComponent(fields)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    const base = window.location.origin + window.location.pathname;
    return `${base}?d=${b64url}`;
  }

  function buildVcardString() {
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${state.name}`,
      `ORG:${state.company}`,
      `TITLE:${state.role}`,
      `TEL;TYPE=CELL,VOICE:${cleanPhoneDigits(state.phone)}`,
      state.phone2 ? `TEL;TYPE=WORK,VOICE:${cleanPhoneDigits(state.phone2)}` : '',
      `EMAIL;TYPE=WORK,INTERNET:${state.email}`,
      `URL:${cleanUrl(state.website)}`,
      `ADR;TYPE=WORK:;;${(state.address || '').replace(/\n/g, ', ')};;;;`,
      `NOTE:${state.tagline}`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');
  }

  // ================= COMPLETE NFC HARDWARE STUDIO =================
  function stopNfcOperations() {
    if (nfcAbortController) {
      nfcAbortController.abort();
      nfcAbortController = null;
    }
    $('nfc-write-radar').hidden = true;
  }

  function updateChipCapacityMeter() {
    const mode = $('nfc-write-mode').value;
    const urlBytes = new TextEncoder().encode(buildShareableNfcUrl()).length + 7;
    const vcardBytes = new TextEncoder().encode(buildVcardString()).length + 18;
    const totalBytes = mode === 'url' ? urlBytes : mode === 'vcard' ? vcardBytes : (urlBytes + vcardBytes);

    $('nfc-byte-count').textContent = `${totalBytes} bytes`;
    const pct = Math.min(100, Math.round((totalBytes / 888) * 100));
    const fill = $('chip-bar-fill');
    fill.style.width = `${Math.max(8, pct)}%`;
    fill.style.background = totalBytes <= 504
      ? 'linear-gradient(90deg, var(--card-accent), #10b981)'
      : totalBytes <= 888
        ? 'linear-gradient(90deg, #eab308, #f97316)'
        : '#f43f5e';

    const chips = [
      ['NTAG213', 144],
      ['NTAG215', 504],
      ['NTAG216', 888]
    ];
    $('chip-compat-badges').innerHTML = chips
      .map(([name, max]) => `<span class="chip-badge ${totalBytes <= max ? '' : 'off'}">${name}</span>`)
      .join('');

    $('chip-meter-hint').textContent = totalBytes <= 144
      ? '✓ Cabe em qualquer chip NFC (NTAG213, NTAG215 e NTAG216).'
      : totalBytes <= 504
        ? '✓ Recomendado cartão plástico NTAG215 (504 B) ou NTAG216 (888 B).'
        : totalBytes <= 888
          ? '⚠️ Requer cartão NTAG216 (888 B) devido ao modo duplo.'
          : '⚠️ Dados excedem 888 B. Use o Modo 1 (Link 3D) para caber facilmente.';
  }

  $('nfc-write-mode').onchange = updateChipCapacityMeter;

  document.querySelectorAll('.nfc-mode-card').forEach(card => {
    card.onclick = () => {
      const mode = card.dataset.mode;
      $('nfc-write-mode').value = mode;
      document.querySelectorAll('.nfc-mode-card').forEach(c => {
        const isSelected = c.dataset.mode === mode;
        c.classList.toggle('active', isSelected);
        c.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      });
      updateChipCapacityMeter();
    };
  });

  function selectNfcTab(target) {
    stopNfcOperations();
    for (const b of document.querySelectorAll('[data-nfc-tab]')) {
      b.classList.toggle('active', b.dataset.nfcTab === target);
    }
    $('nfc-pane-write').hidden = target !== 'write';
    $('nfc-pane-read').hidden = target !== 'read';
    $('nfc-pane-qr').hidden = target !== 'qr';
  }

  for (const tabBtn of document.querySelectorAll('[data-nfc-tab]')) {
    tabBtn.onclick = () => selectNfcTab(tabBtn.dataset.nfcTab);
  }

  function openNfcStudioModal(initialTab = 'write') {
    stopNfcOperations();
    const url = buildShareableNfcUrl();
    $('share-url-input').value = url;
    drawQrVisual($('qr-canvas'), url, state.accent);
    updateChipCapacityMeter();
    $('nfc-write-status').hidden = true;

    const waShareBtn = $('btn-share-whatsapp-card');
    if (waShareBtn) {
      const msg = typeof currentLang !== 'undefined' && currentLang === 'en'
        ? `Hello! Here is my interactive 3D Business Card (${state.name} — ${state.company}): ${url}`
        : `Olá! Confira meu Cartão de Visitas Virtual 3D (${state.name} — ${state.company}): ${url}`;
      waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    }

    selectNfcTab(typeof initialTab === 'string' ? initialTab : 'write');
    $('dialog-share').showModal();
  }

  $('btn-share-nfc').onclick = () => openNfcStudioModal('write');
  if ($('btn-open-nfc-studio')) $('btn-open-nfc-studio').onclick = () => openNfcStudioModal('write');
  if ($('btn-quick-share-card')) {
    $('btn-quick-share-card').onclick = () => openNfcStudioModal('qr');
  }
  if ($('btn-native-share-card')) {
    $('btn-native-share-card').onclick = async () => {
      const url = buildShareableNfcUrl();
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${state.name} — ${state.company}`,
            text: `Cartão de Visitas 3D de ${state.name} (${state.company})`,
            url
          });
          return;
        } catch {}
      }
      try {
        await navigator.clipboard.writeText(url);
        showToast('✓ Link do Cartão 3D copiado!');
      } catch {}
    };
  }
  $('btn-cancel-nfc-op').onclick = () => {
    stopNfcOperations();
    const status = $('nfc-write-status');
    status.hidden = false;
    status.textContent = 'Operação NFC cancelada.';
  };

  $('btn-write-nfc').onclick = async () => {
    stopNfcOperations();
    const status = $('nfc-write-status');
    status.hidden = false;

    if (!('NDEFReader' in window)) {
      status.textContent = 'ℹ️ Seu navegador atual não possui API de gravação direta (Web NFC). Abra este WebApp no Google Chrome em um celular Android com NFC ativo para gravar direto no cartão plástico!';
      return;
    }

    const mode = $('nfc-write-mode').value;
    const url = buildShareableNfcUrl();
    const vcardStr = buildVcardString();
    const encoder = new TextEncoder();

    const records = [];
    if (mode === 'url' || mode === 'hybrid') {
      records.push({ recordType: 'url', data: url });
    }
    if (mode === 'vcard' || mode === 'hybrid') {
      records.push({
        recordType: 'mime',
        mediaType: 'text/vcard',
        data: encoder.encode(vcardStr)
      });
    }

    try {
      nfcAbortController = new AbortController();
      $('nfc-radar-title').textContent = 'Aproxime o Cartão Plástico NFC atrás do celular para GRAVAR…';
      $('nfc-write-radar').hidden = false;
      status.textContent = '📡 Aguardando aproximação do cartão físico NFC…';

      const ndef = new window.NDEFReader();
      await ndef.write({ records }, { signal: nfcAbortController.signal });

      $('nfc-write-radar').hidden = true;
      playNfcBeep(true);
      status.textContent = '✅ Cartão Físico NFC gravado com sucesso! Pode afastar o cartão.';
      showToast('✅ Cartão NFC gravado com sucesso!');
    } catch (err) {
      if (err.name === 'AbortError') return;
      $('nfc-write-radar').hidden = true;
      playNfcBeep(false);
      status.textContent = `⚠️ Falha ao gravar: ${err.message || 'Verifique se o NFC está ativo e se o cartão suporta a capacidade.'}`;
    }
  };

  $('btn-lock-nfc').onclick = async () => {
    stopNfcOperations();
    const status = $('nfc-write-status');
    status.hidden = false;

    if (!('NDEFReader' in window)) {
      status.textContent = 'ℹ️ Abra no Chrome para Android com NFC ativo para travar um cartão físico.';
      return;
    }
    const ndef = new window.NDEFReader();
    if (typeof ndef.makeReadOnly !== 'function') {
      status.textContent = 'ℹ️ Sua versão do Chrome/Android não suporta trava permanente (makeReadOnly).';
      return;
    }
    if (!window.confirm('ATENÇÃO: Travar o cartão NFC torna os dados permanentes e impede qualquer regravação futura neste plástico. Deseja realmente travar?')) {
      return;
    }

    try {
      nfcAbortController = new AbortController();
      $('nfc-radar-title').textContent = 'Encoste o Cartão NFC para TRAVAR permanentemente…';
      $('nfc-write-radar').hidden = false;
      status.textContent = '🔒 Aguardando cartão para aplicar proteção somente-leitura…';

      await ndef.makeReadOnly({ signal: nfcAbortController.signal });

      $('nfc-write-radar').hidden = true;
      playNfcBeep(true);
      status.textContent = '🔒 Cartão NFC travado com sucesso (Somente Leitura permanente)!';
      showToast('🔒 Cartão protegido contra regravação!');
    } catch (err) {
      if (err.name === 'AbortError') return;
      $('nfc-write-radar').hidden = true;
      playNfcBeep(false);
      status.textContent = `⚠️ Não foi possível travar: ${err.message || 'Erro de comunicação NFC.'}`;
    }
  };

  $('btn-start-read-nfc').onclick = async () => {
    stopNfcOperations();
    const resultBox = $('nfc-read-result');
    const listEl = $('read-records-list');

    if (!('NDEFReader' in window)) {
      resultBox.hidden = false;
      $('read-uid').textContent = 'Simulação / Desktop';
      $('read-count').textContent = '1';
      listEl.innerHTML = `<div class="read-record-item"><small>AVISO DO NAVEGADOR</small><div>Para ler chips físicos via antena NFC, abra este WebApp no Chrome para Android.</div></div>`;
      return;
    }

    try {
      nfcAbortController = new AbortController();
      const ndef = new window.NDEFReader();
      await ndef.scan({ signal: nfcAbortController.signal });
      showToast('🔍 Leitor NFC ativo! Encoste o cartão atrás do celular.');

      ndef.onreadingerror = () => {
        playNfcBeep(false);
        showToast('⚠️ Erro ao ler o chip NFC. Tente encostar novamente.');
      };

      ndef.onreading = (event) => {
        playNfcBeep(true);
        stopNfcOperations();
        resultBox.hidden = false;
        $('read-uid').textContent = event.serialNumber || 'UID Oculto';
        const records = event.message?.records || [];
        $('read-count').textContent = String(records.length);
        listEl.innerHTML = '';
        lastScannedState = null;

        const decoder = new TextDecoder();
        for (const rec of records) {
          let decodedText = '';
          try {
            decodedText = decoder.decode(rec.data);
          } catch {}
          const item = document.createElement('div');
          item.className = 'read-record-item';
          item.innerHTML = `<small>${rec.recordType.toUpperCase()} ${rec.mediaType ? `(${rec.mediaType})` : ''}</small><div></div>`;
          item.querySelector('div').textContent = decodedText || '(Dados binários)';
          listEl.appendChild(item);

          if (rec.recordType === 'url' && decodedText) {
            const maybeCard = parseCardFromUrl(decodedText);
            if (maybeCard) lastScannedState = maybeCard;
          }
        }
        $('btn-load-read-card').hidden = !lastScannedState;
        showToast('✅ Cartão NFC lido com sucesso!');
      };
    } catch (err) {
      showToast(`⚠️ Não foi possível ativar o leitor NFC: ${err.message || ''}`);
    }
  };

  $('btn-load-read-card').onclick = () => {
    if (!lastScannedState) return;
    state = { ...DEFAULT_STATE, ...lastScannedState };
    syncFormInputs();
    renderCard();
    saveState();
    $('dialog-share').close();
    showToast('✨ Dados do cartão NFC carregados no Editor 3D!');
  };

  $('btn-copy-link').onclick = async () => {
    const url = $('share-url-input').value;
    try {
      await navigator.clipboard.writeText(url);
      showToast('✓ Link NFC copiado! Grave no cartão ou envie no WhatsApp.');
    } catch {
      $('share-url-input').select();
      document.execCommand('copy');
      showToast('✓ Link NFC copiado!');
    }
  };

  $('btn-save-vcf').onclick = () => {
    const blob = new Blob([buildVcardString()], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.name || 'executivo').toLowerCase().replace(/\s+/g, '-')}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    showToast(currentLang === 'en' ? '📥 Contact (.vcf) downloaded!' : '📥 Contato (.vcf) gerado para salvar na agenda!');
  };

  // ================= 4U-LABS STANDARDS: BILINGUAL PT/EN, GIS, PWA & MODALS =================
  const I18N = {
    pt: {
      brandSub: 'CARTÃO DIGITAL NFC · 4u-Labs',
      installApp: 'Instalar',
      loginGmail: 'Gmail',
      viewAsClient: 'Cliente',
      backToEditor: 'Editor',
      btnShareNfc: '📡 NFC & QR',
      visitorVerified: 'Cartão Executivo NFC verificado',
      visitorCreate: 'Criar meu cartão →',
      tabFront: 'Frente do Cartão',
      tabBack: 'Verso (Contatos)',
      swipeHint: '👆 Passe o dedo no cartão para girar',
      btnSaveVcf: '📥 Agenda',
      btnFlipCard: '🔄 Virar',
      btnQuickShare: '📤 Compartilhar Cartão',
      btnDockCreate: '✨ Criar Meu Cartão',
      btnShareViaWhatsapp: '💬 Enviar Meu Cartão no WhatsApp',
      btnShareNative: '📲 Compartilhar Link (Menu do Celular)',
      editorEyebrow: 'PERSONALIZAÇÃO EXECUTIVA',
      editorTitle: 'Estúdio do Cartão NFC',
      btnResetDemo: 'Restaurar Demo',
      gmailTitle: 'Cadastro Rápido com Gmail',
      gmailSub: 'Importe seu nome, empresa e e-mail em 1 clique',
      btnConnect: 'Conectar',
      sec1Label: '1. Escolha o Modelo Vertical (12 Layouts Executivos)',
      sec2Label: '2. Acabamento & Cor de Destaque',
      lblAccentColor: 'Cor Principal:',
      lblDarkColor: 'Cor Escura / Base:',
      sec3Label: '3. Símbolo / Logotipo da Empresa',
      btnUploadLogo: '📤 Enviar Minha Logo / Foto',
      sec4Label: '4. Empresa & Executivo',
      lblCompany: 'Nome da Empresa',
      lblTagline: 'Slogan / Tagline',
      lblName: 'Seu Nome Completo',
      lblRole: 'Cargo / Título Executivo',
      lblServices: 'Especialidades / Rodapé da Frente (ex: GRAPHIC . PRINT . WEB)',
      sec5Label: '5. Dados de Contato (Verso Interativo)',
      lblPhone1: '📞 Telefone Principal / WhatsApp',
      lblPhone2: '📱 Telefone 2 / Comercial',
      lblEmail: '✉️ E-mail Executivo',
      lblWebsite: '🌐 Website ou LinkedIn',
      lblAddress: '📍 Endereço Comercial (Duas linhas)',
      sec6Label: '6. Estúdio de Cartão Físico NFC & QR Code',
      nfcBannerTitle: 'Grave seu Cartão Plástico (NTAG213 / 215 / 216)',
      nfcBannerSub: 'Grave o Cartão 3D + Contato Offline, teste a leitura de chips e trave contra regravação.',
      btnOpenNfcStudio: '📡 Abrir Gravador NFC',
      footerGuide: 'Guia',
      footerPrivacy: 'Privacidade',
      footerTerms: 'Termos',
      footerDonate: '♡ Apoiar',
      gmailModalTitle: 'Entrar com Conta Google / Gmail',
      gisOneClickLabel: 'Login Oficial Google em 1 Clique:',
      orFillManual: 'ou personalize os dados do perfil',
      lblExecName: 'Seu Nome Executivo',
      lblExecEmail: 'Seu E-mail (@gmail.com ou corporativo)',
      lblExecCompany: 'Empresa / Organização',
      lblExecRole: 'Cargo Executivo',
      lblExecPhone: 'WhatsApp / Celular',
      btnSyncProfile: '✓ Sincronizar Perfil no Cartão',
      nfcModalTitle: '📡 Estúdio NFC',
      nfcTabWrite: '📲 Gravar Cartão NFC',
      nfcTabRead: '🔍 Ler / Testar Chip',
      nfcTabQr: '🔗 Link & QR Code',
      nfcWriteModeLbl: 'Modo de Gravação no Chip',
      nfcMode1Title: 'Cartão 3D Interativo',
      nfcMode1Badge: 'Recomendado',
      nfcMode1Desc: 'Abre Frente e Verso em qualquer celular (iPhone & Android)',
      nfcMode2Title: 'Duplo Híbrido',
      nfcMode2Desc: 'Cartão 3D Online + Contato vCard Offline',
      nfcMode3Title: 'Contato Direto na Agenda',
      nfcMode3Desc: 'Salva direto nos contatos (100% Offline)',
      ndefSizeLbl: 'Tamanho dos Dados NDEF:',
      nfcHoldHint: 'Mantenha encostado por 1 segundo até ouvir o sinal',
      btnCancel: 'Cancelar',
      btnWriteNfcNow: '📡 Gravar no Cartão NFC Agora',
      btnLockNfc: '🔒 Travar Cartão (Somente Leitura)',
      nfcReadDesc: 'Encoste qualquer cartão plástico ou tag NFC atrás do celular para verificar o número de série do chip (UID) e os dados gravados nele:',
      btnStartReadNfc: '🔍 Ativar Leitor NFC e Encostar Cartão',
      btnLoadReadCard: '✨ Carregar Este Cartão no Editor 3D',
      qrScanHint: 'Aponte a Câmera para abrir o cartão',
      shareLinkLbl: 'Link de Compartilhamento',
      btnCopyLink: 'Copiar Link',
      helpModalTitle: '📘 Guia Rápido — vCard Executive NFC',
      helpStep1: 'Escolha entre os 12 modelos executivos verticais. Passe o dedo na tela (ou arraste com o mouse) para girar em 3D entre a Frente e o Verso com seus contatos clicáveis.',
      helpStep2: 'Compre um cartão PVC com chip NTAG213, NTAG215 ou NTAG216. Abra este app no Google Chrome do seu Android, clique em "Link NFC & QR Code" → "Gravar no Cartão NFC Agora" e encoste o plástico atrás do celular.',
      helpStep3: 'O celular do cliente (iPhone ou Android) abre instantaneamente seu Cartão 3D na tela sem precisar instalar nada! Ele pode girar o cartão, chamar no WhatsApp ou clicar em "Salvar na Agenda".',
      helpStep4: '100% client-side: seus dados ficam salvos no seu navegador e codificados de forma compacta no próprio link ou chip NFC. Você também pode travar o chip contra regravações.',
      hubTitle: '4u-Labs — Aplicativos, suporte e comunidade',
      hubSub: 'Conheça o ecossistema 4u-Labs, acesse nossa loja de aplicativos web e acompanhe nossas redes oficiais:',
      hubGroupInst: 'Institucional & Ecossistema (6)',
      hubGroupSocial: 'Comunidade, Código & Redes (8)',
      donateBoxTitle: '♡ Apoie o desenvolvimento gratuito da 4u-Labs',
      donateBoxSub: 'Sua contribuição mantém nossos aplicativos 100% gratuitos e sem anúncios.'
    },
    en: {
      brandSub: 'NFC DIGITAL CARD · 4u-Labs',
      installApp: 'Install',
      loginGmail: 'Gmail',
      viewAsClient: 'Client',
      backToEditor: 'Editor',
      btnShareNfc: '📡 NFC & QR',
      visitorVerified: 'Verified Executive NFC Card',
      visitorCreate: 'Create my card →',
      tabFront: 'Card Front',
      tabBack: 'Back (Contacts)',
      swipeHint: '👆 Swipe across the card to flip 3D',
      btnSaveVcf: '📥 Contacts',
      btnFlipCard: '🔄 Flip',
      btnQuickShare: '📤 Share Card',
      btnDockCreate: '✨ Create My Card',
      btnShareViaWhatsapp: '💬 Send My Card via WhatsApp',
      btnShareNative: '📲 Share Link (Phone Menu)',
      editorEyebrow: 'EXECUTIVE CUSTOMIZATION',
      editorTitle: 'NFC Card Studio',
      btnResetDemo: 'Reset Demo',
      gmailTitle: 'Quick Setup with Gmail',
      gmailSub: 'Import your name, company and email in 1 click',
      btnConnect: 'Connect',
      sec1Label: '1. Choose Vertical Template (12 Executive Layouts)',
      sec2Label: '2. Finish & Accent Color',
      lblAccentColor: 'Accent Color:',
      lblDarkColor: 'Dark / Base Color:',
      sec3Label: '3. Company Emblem / Logo',
      btnUploadLogo: '📤 Upload My Logo / Photo',
      sec4Label: '4. Company & Executive',
      lblCompany: 'Company Name',
      lblTagline: 'Tagline / Slogan',
      lblName: 'Your Full Name',
      lblRole: 'Executive Role / Title',
      lblServices: 'Specialties / Front Footer (e.g. GRAPHIC . PRINT . WEB)',
      sec5Label: '5. Contact Channels (Interactive Back)',
      lblPhone1: '📞 Primary Phone / WhatsApp',
      lblPhone2: '📱 Secondary / Office Phone',
      lblEmail: '✉️ Executive Email',
      lblWebsite: '🌐 Website or LinkedIn',
      lblAddress: '📍 Business Address (Two lines)',
      sec6Label: '6. Physical NFC Card & QR Studio',
      nfcBannerTitle: 'Write to Your Plastic NFC Card (NTAG213 / 215 / 216)',
      nfcBannerSub: 'Write 3D Card + Offline Contact, test chip reading and lock against overwrite.',
      btnOpenNfcStudio: '📡 Open NFC Writer',
      footerGuide: 'Guide',
      footerPrivacy: 'Privacy',
      footerTerms: 'Terms',
      footerDonate: '♡ Support',
      gmailModalTitle: 'Sign in with Google / Gmail',
      gisOneClickLabel: 'Official 1-Click Google Sign-In:',
      orFillManual: 'or customize your profile details',
      lblExecName: 'Your Executive Name',
      lblExecEmail: 'Your Email (@gmail.com or corporate)',
      lblExecCompany: 'Company / Organization',
      lblExecRole: 'Executive Title',
      lblExecPhone: 'WhatsApp / Mobile',
      btnSyncProfile: '✓ Sync Profile to Card',
      nfcModalTitle: '📡 NFC Studio',
      nfcTabWrite: '📲 Write NFC Card',
      nfcTabRead: '🔍 Read / Test Chip',
      nfcTabQr: '🔗 Link & QR Code',
      nfcWriteModeLbl: 'Plastic Chip Write Mode',
      nfcMode1Title: 'Interactive 3D Card',
      nfcMode1Badge: 'Recommended',
      nfcMode1Desc: 'Opens Front & Back on any phone (iPhone & Android)',
      nfcMode2Title: 'Dual Hybrid',
      nfcMode2Desc: 'Online 3D Card + Offline vCard Contact',
      nfcMode3Title: 'Direct Phone Contacts',
      nfcMode3Desc: 'Saves directly to address book (100% Offline)',
      ndefSizeLbl: 'NDEF Payload Size:',
      nfcHoldHint: 'Hold the card against the back of your phone for 1 second',
      btnCancel: 'Cancel',
      btnWriteNfcNow: '📡 Write to NFC Card Now',
      btnLockNfc: '🔒 Lock Card (Read-Only)',
      nfcReadDesc: 'Tap any plastic NFC card or tag on the back of your phone to inspect its chip UID and stored NDEF records:',
      btnStartReadNfc: '🔍 Start NFC Reader & Tap Card',
      btnLoadReadCard: '✨ Load This Card in 3D Editor',
      qrScanHint: 'Point camera to open the card',
      shareLinkLbl: 'Share Link',
      btnCopyLink: 'Copy Link',
      helpModalTitle: '📘 Quick Guide — vCard Executive NFC',
      helpStep1: 'Choose from 12 vertical executive templates. Swipe across the screen (or drag with your mouse) to flip in 3D between Front and Back with clickable contacts.',
      helpStep2: 'Get a PVC card with an NTAG213, NTAG215 or NTAG216 chip. Open this app in Chrome on Android, click "NFC Link & QR Code" → "Write to NFC Card Now" and hold the card behind your phone.',
      helpStep3: 'Your client’s phone (iPhone or Android) opens your 3D Card instantly without installing anything! They can swipe to flip, message on WhatsApp, or tap "Save to Contacts".',
      helpStep4: '100% client-side: your data stays saved in your browser and compactly encoded inside the NFC link or chip. You can also lock the chip against overwrites.',
      hubTitle: '4u-Labs — Apps, support & community',
      hubSub: 'Explore the 4u-Labs ecosystem, browse our web app store, and follow our official channels:',
      hubGroupInst: 'Institutional & Ecosystem (6)',
      hubGroupSocial: 'Community, Code & Social (8)',
      donateBoxTitle: '♡ Support free software by 4u-Labs',
      donateBoxSub: 'Your contribution keeps our web apps 100% free and ad-free.'
    }
  };

  let currentLang = 'pt';

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'pt';
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'pt-BR';
    try { localStorage.setItem('4u_vcard_lang', currentLang); } catch {}

    const dict = I18N[currentLang];
    for (const el of document.querySelectorAll('[data-i18n]')) {
      const key = el.getAttribute('data-i18n');
      if (key === 'loginGmail' && state.gmailUser) continue;
      if (dict[key]) el.textContent = dict[key];
    }
    for (const btn of document.querySelectorAll('.lang-btn')) {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    }
    renderCard();
  }

  for (const btn of document.querySelectorAll('.lang-btn')) {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  }

  // Detect initial language (?lang=pt|en or localStorage or browser)
  function initLanguage() {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    const savedLang = localStorage.getItem('4u_vcard_lang');
    const navLang = (navigator.language || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
    setLanguage(urlLang || savedLang || navLang);
  }

  // Help & 4u-Labs Community Modals + Dynamic Footer Year
  if ($('footer-year')) $('footer-year').textContent = String(new Date().getFullYear());
  const openHelp = () => $('dialog-help')?.showModal();
  const openCommunity = () => $('dialog-community')?.showModal();
  $('btn-open-help')?.addEventListener('click', openHelp);
  $('footer-btn-help')?.addEventListener('click', openHelp);
  $('btn-open-community')?.addEventListener('click', openCommunity);
  $('footer-btn-community')?.addEventListener('click', openCommunity);

  // PWA Service Worker & Install Button Standard
  let deferredInstallPrompt = null;
  const pwaInstallBtn = $('btn-pwa-install');
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  if (pwaInstallBtn) {
    pwaInstallBtn.hidden = isStandalone;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (pwaInstallBtn && !isStandalone) pwaInstallBtn.hidden = false;
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    if (pwaInstallBtn) pwaInstallBtn.hidden = true;
    showToast(currentLang === 'en' ? '✓ App installed!' : '✓ Aplicativo instalado com sucesso!');
  });

  pwaInstallBtn?.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice?.outcome === 'accepted') {
        pwaInstallBtn.hidden = true;
      }
      deferredInstallPrompt = null;
    } else if (isIos) {
      showToast(
        currentLang === 'en'
          ? '📲 On iPhone/iPad: tap Share (⬆️) in Safari and select "Add to Home Screen".'
          : '📲 No iPhone/iPad: toque em Compartilhar (⬆️) no Safari e escolha "Adicionar à Tela de Início".'
      );
    } else {
      showToast(
        currentLang === 'en'
          ? '📲 To install: tap browser menu (⋮) and select "Install app" or "Add to Home screen".'
          : '📲 Para instalar: toque no menu (⋮) do navegador e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".'
      );
    }
  });

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=3.3', { updateViaCache: 'none' }).catch(() => {});
    });
  }

  for (const d of document.querySelectorAll('dialog')) {
    d.querySelector('[data-close]')?.addEventListener('click', () => {
      stopNfcOperations();
      d.close();
    });
    d.addEventListener('click', (e) => {
      if (e.target === d) {
        stopNfcOperations();
        d.close();
      }
    });
  }

  // Initialize
  loadInitialState();
  syncFormInputs();
  initLanguage();
  renderCard();
})();
