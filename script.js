document.title = CONFIG.pageTitle || document.title;

/* ------------------------------------------------------------
   Helper: checkerboard-fallback image
------------------------------------------------------------ */
function imageOrPlaceholder(src, alt) {
  const wrap = document.createElement('div');
  wrap.style.width = '100%';
  wrap.style.height = '100%';
  const img = new Image();
  img.alt = alt || '';
  img.onload = () => { wrap.innerHTML = ''; wrap.appendChild(img); };
  img.onerror = () => {
    wrap.innerHTML = `<div class="checkerboard">${pixelIcon('magnifier')}</div>`;
  };
  img.src = src;
  wrap.innerHTML = `<div class="checkerboard">${pixelIcon('magnifier')}</div>`;
  return wrap;
}

/* ------------------------------------------------------------
   1. BOOT SEQUENCE
------------------------------------------------------------ */
(function boot() {
  const fill = document.getElementById('loadingFill');
  const pct = document.getElementById('loadingPct');
  const hint = document.getElementById('bootHint');
  const enterBtn = document.getElementById('bootEnterBtn');

  requestAnimationFrame(() => { fill.style.width = '100%'; });

  let n = 0;
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.round(Math.random() * 9) + 3);
    pct.textContent = n + '%';
    if (n >= 100) {
      clearInterval(tick);
      pct.textContent = '100%';
      setTimeout(() => hint.classList.add('show'), 250);
    }
  }, 180);

  enterBtn.addEventListener('click', () => {
    document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ------------------------------------------------------------
   2. WINDOW REVEAL ON SCROLL
------------------------------------------------------------ */
(function revealWindows() {
  const windows = document.querySelectorAll('.window');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  windows.forEach((w) => io.observe(w));
})();

/* ------------------------------------------------------------
   3. TYPEWRITER INTRO
------------------------------------------------------------ */
(function intro() {
  document.getElementById('introTitle').textContent = 'Pesan Baru';
  const container = document.getElementById('typeLines');
  const lines = CONFIG.openingLines || [];
  let shown = false;

  function reveal() {
    if (shown) return;
    shown = true;
    lines.forEach((line, i) => {
      const p = document.createElement('p');
      p.textContent = line;
      container.appendChild(p);
      setTimeout(() => p.classList.add('shown'), i * 550 + 150);
    });
    const caret = document.createElement('span');
    caret.className = 'caret';
    setTimeout(() => container.appendChild(caret), lines.length * 550 + 200);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) reveal(); });
  }, { threshold: 0.4 });
  io.observe(document.getElementById('intro'));
})();

/* ------------------------------------------------------------
   4. PHOTO GALLERY
------------------------------------------------------------ */
(function gallery() {
  const photos = CONFIG.photos || [];
  const frame = document.getElementById('galleryFrame');
  const caption = document.getElementById('galleryCaption');
  const dotsWrap = document.getElementById('galleryDots');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  prevBtn.innerHTML = pixelIcon('cursor', 'rot-left');
  nextBtn.innerHTML = pixelIcon('cursor', 'rot-right');
  prevBtn.style.transform = 'scaleX(-1)';

  if (!photos.length) { frame.innerHTML = `<div class="checkerboard"></div>`; return; }

  let idx = 0;
  photos.forEach((_, i) => {
    const d = document.createElement('span');
    dotsWrap.appendChild(d);
  });

  function render() {
    frame.innerHTML = '';
    frame.appendChild(imageOrPlaceholder(photos[idx].src, photos[idx].caption));
    caption.textContent = photos[idx].caption || '';
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  prevBtn.addEventListener('click', () => { idx = (idx - 1 + photos.length) % photos.length; render(); });
  nextBtn.addEventListener('click', () => { idx = (idx + 1) % photos.length; render(); });
  render();
})();

/* ------------------------------------------------------------
   5. MUSIC PLAYER
------------------------------------------------------------ */
(function player() {
  const tracks = CONFIG.music || [];
  const audio = document.getElementById('audioEl');
  const titleEl = document.getElementById('trackTitle');
  const artistEl = document.getElementById('trackArtist');
  const playBtn = document.getElementById('trackPlay');
  const prevBtn = document.getElementById('trackPrev');
  const nextBtn = document.getElementById('trackNext');
  const seek = document.getElementById('trackSeek');
  const timeNow = document.getElementById('timeNow');
  const timeTotal = document.getElementById('timeTotal');

  prevBtn.innerHTML = pixelIcon('note');
  nextBtn.innerHTML = pixelIcon('note');
  let playing = false;
  let i = 0;

  function fmt(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }
  function setIcon() { playBtn.innerHTML = pixelIcon(playing ? 'exclaim' : 'star'); }
  function load(n) {
    if (!tracks.length) { titleEl.textContent = 'Belum ada lagu'; artistEl.textContent = ''; return; }
    i = (n + tracks.length) % tracks.length;
    titleEl.textContent = tracks[i].title || '';
    artistEl.textContent = tracks[i].artist || '';
    audio.src = tracks[i].src || '';
    playing = false; setIcon();
  }
  playBtn.addEventListener('click', () => {
    if (!tracks.length) return;
    if (playing) { audio.pause(); }
    else { audio.play().catch(() => {}); }
  });
  audio.addEventListener('play', () => { playing = true; setIcon(); });
  audio.addEventListener('pause', () => { playing = false; setIcon(); });
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
    timeNow.textContent = fmt(audio.currentTime);
    timeTotal.textContent = fmt(audio.duration);
  });
  seek.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
  });
  prevBtn.addEventListener('click', () => load(i - 1));
  nextBtn.addEventListener('click', () => load(i + 1));
  load(0);
})();

/* ------------------------------------------------------------
   6. LETTER / PROFILE CARD
------------------------------------------------------------ */
(function letter() {
  document.getElementById('letterName').textContent = CONFIG.toName || 'Dia';
  document.getElementById('letterTitle').textContent = CONFIG.letterTitle || '';
  document.getElementById('letterText').textContent = CONFIG.letterText || '';
  const frame = document.getElementById('letterFrame');
  const firstPhoto = (CONFIG.photos && CONFIG.photos[0]) || null;
  frame.appendChild(imageOrPlaceholder(firstPhoto ? firstPhoto.src : '', CONFIG.toName));

  const likeBtn = document.getElementById('likeBtn');
  const noteBtn = document.getElementById('noteBtn');
  const toAskBtn = document.getElementById('toAskBtn');
  likeBtn.innerHTML = pixelIcon('heart');
  noteBtn.innerHTML = pixelIcon('note');
  toAskBtn.innerHTML = pixelIcon('envelope');

  likeBtn.addEventListener('click', () => likeBtn.classList.toggle('liked'));
  toAskBtn.addEventListener('click', () => {
    document.getElementById('ask').scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ------------------------------------------------------------
   7. QUESTION DIALOG + FINAL REVEAL
------------------------------------------------------------ */
(function ask() {
  document.getElementById('dialogQuestion').textContent = CONFIG.question || '';
  document.getElementById('cursorIcon').innerHTML = pixelIcon('cursor');
  document.getElementById('finalText').textContent = CONFIG.finalMessage || '';
  document.getElementById('envelopeIcon').innerHTML = pixelIcon('envelope');

  const okBtn = document.getElementById('okBtn');
  const finalSection = document.getElementById('final');
  const finalBody = document.getElementById('finalBody');
  const envelope = document.getElementById('envelopeIcon');

  function burstHearts() {
    if (!CONFIG.finalConfettiHearts) return;
    for (let n = 0; n < 14; n++) {
      const h = document.createElement('span');
      h.className = 'pxicon burst-heart';
      h.innerHTML = ICONS.heart;
      const angle = (Math.PI * 2 * n) / 14 + Math.random() * 0.3;
      const dist = 60 + Math.random() * 60;
      h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      h.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      h.style.left = '50%';
      h.style.top = '20%';
      finalBody.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
  }

  okBtn.addEventListener('click', () => {
    finalSection.classList.add('revealed');
    finalSection.classList.add('in-view');
    envelope.classList.add('opening');
    setTimeout(() => finalSection.scrollIntoView({ behavior: 'smooth' }), 100);
    burstHearts();
  });

  document.getElementById('replayBtn').addEventListener('click', () => {
    finalSection.classList.remove('revealed');
    document.getElementById('boot').scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ------------------------------------------------------------
   8. FOOTER
------------------------------------------------------------ */
(function footer() {
  const el = document.getElementById('siteFooter');
  el.innerHTML = `dibuat dengan ${pixelIcon('heart')} oleh ${CONFIG.fromName || ''}`;
})();
