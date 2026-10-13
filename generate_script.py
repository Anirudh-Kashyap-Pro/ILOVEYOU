import json

with open("heart_data.json", "r", encoding="utf-8") as f:
    heart_data = json.load(f)

with open("heart_animation.py", "r", encoding="utf-8") as f:
    python_source = f.read()

js_code = f"""/**
 * Liquid Love Heart • Core Interactive Engine
 * Faithfully re-creates the Python Turtle/Tkinter multilingual heart animation
 * with modern Liquid Glass aesthetics, Web Audio API, and 60fps Canvas.
 */

// Embedded original dataset computed by the uploaded Python algorithm
const HEART_ITEMS = {json.dumps(heart_data, ensure_ascii=False, indent=2)};

// Uploaded Python script source code
const PYTHON_SCRIPT_SOURCE = {json.dumps(python_source)};

/* =====================================================================
   APP STATE & CONFIGURATION
   ===================================================================== */
const CONFIG = {{
  baseWidth: 800,
  baseHeight: 800,
  animDuration: 10,     // seconds
  animFrames: 42,       // ANIM frames per item
  liftDistance: 34,     // LIFT pixels
  fontFamily: 'Arial, -apple-system, sans-serif',
  bgColor: [6, 2, 8],   // #060208
  flashColor: [1.0, 0.78, 0.78],
  speedMultiplier: 1.0,
  particlesEnabled: true,
  shimmerEnabled: true,
  soundEnabled: false
}};

let state = {{
  activeView: 'landing', // 'landing' | 'hero'
  placedItems: [],
  activeItems: [],
  settledItems: [],
  shimmeringItems: new Map(), // itemId -> {{ flashIntensity, startTime }}
  spawning: false,
  spawnIndex: 0,
  spawnAcc: 0,
  lastFrameTime: performance.now(),
  mouse: {{ x: -1000, y: -1000, isHover: false }},
  audioCtx: null,
  nextChimeTime: 0
}};

/* =====================================================================
   DOM ELEMENTS
   ===================================================================== */
const landingView = document.getElementById('landing-view');
const heroView = document.getElementById('hero-view');
const enterHeartBtn = document.getElementById('enter-heart-btn');
const backToLandingBtn = document.getElementById('back-to-landing-btn');
const replayBtn = document.getElementById('replay-btn');
const dockReplayBtn = document.getElementById('dock-replay-btn');
const heartCanvas = document.getElementById('heart-canvas');
const heartCtx = heartCanvas.getContext('2d');
const ambientCanvas = document.getElementById('ambient-canvas');
const ambientCtx = ambientCanvas.getContext('2d');
const cursorGlow = document.getElementById('cursor-glow');
const statusBadge = document.getElementById('animation-status-badge');
const statusText = document.getElementById('status-text');
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
const codeModal = document.getElementById('code-modal');
const openCodeModalBtn = document.getElementById('open-code-modal-btn');
const viewScriptBtnLanding = document.getElementById('view-script-btn-landing');
const closeModalBtn = document.getElementById('close-modal-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const copyCodeText = document.getElementById('copy-code-text');
const pythonCodeContent = document.getElementById('python-code-content');
const modalRunPythonBtn = document.getElementById('modal-run-python-btn');
const dockRunNativeBtn = document.getElementById('dock-run-native-btn');
const dockParticlesBtn = document.getElementById('dock-particles-btn');
const dockShimmerBtn = document.getElementById('dock-shimmer-btn');
const speedButtons = document.querySelectorAll('.dock-speed-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

/* =====================================================================
   INITIALIZATION
   ===================================================================== */
window.addEventListener('DOMContentLoaded', () => {{
  initCanvas();
  initAmbientParticles();
  initModalCode();
  setupEventListeners();
  
  // Handle URL hash navigation
  if (window.location.hash === '#heart' || window.location.hash === '#hero') {{
    switchView('hero');
  }}

  requestAnimationFrame(mainAnimationLoop);
}});

window.addEventListener('resize', () => {{
  resizeCanvases();
}});

function initCanvas() {{
  resizeCanvases();
}}

function resizeCanvases() {{
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  ambientCanvas.width = w * dpr;
  ambientCanvas.height = h * dpr;
  ambientCtx.scale(dpr, dpr);

  heartCanvas.width = w * dpr;
  heartCanvas.height = h * dpr;
  heartCtx.scale(dpr, dpr);
}}

function showToast(msg) {{
  toastMessage.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {{
    toast.classList.remove('show');
  }}, 3200);
}}

/* =====================================================================
   VIEW NAVIGATION
   ===================================================================== */
function switchView(viewName) {{
  if (state.activeView === viewName) return;
  state.activeView = viewName;

  if (viewName === 'hero') {{
    landingView.classList.remove('active');
    setTimeout(() => {{
      heroView.classList.add('active');
      window.location.hash = 'heart';
      startHeartAnimation();
    }}, 200);
  }} else {{
    heroView.classList.remove('active');
    setTimeout(() => {{
      landingView.classList.add('active');
      window.location.hash = '';
      stopHeartAnimation();
    }}, 200);
  }}
}}

window.addEventListener('popstate', () => {{
  if (window.location.hash === '#heart' || window.location.hash === '#hero') {{
    switchView('hero');
  }} else {{
    switchView('landing');
  }}
}});

/* =====================================================================
   AUDIO SYNTHESIZER (WEB AUDIO API)
   Generates ethereal romantic chimes, warm sub-bass, and celestial chords
   ===================================================================== */
function initAudio() {{
  if (!state.audioCtx) {{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContext();
  }}
  if (state.audioCtx.state === 'suspended') {{
    state.audioCtx.resume();
  }}
}}

// Pentatonic warm romantic notes
const CHIME_FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

function playHarmonicChime(freqIndex = null, gainMultiplier = 1.0) {{
  if (!CONFIG.soundEnabled || !state.audioCtx) return;
  try {{
    const ctx = state.audioCtx;
    const now = ctx.currentTime;
    
    const freq = freqIndex !== null 
      ? CHIME_FREQS[freqIndex % CHIME_FREQS.length]
      : CHIME_FREQS[Math.floor(Math.random() * CHIME_FREQS.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm soft bell tone envelope
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09 * gainMultiplier, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.6);
  }} catch (e) {{
    // Silently handle audio context restrictions
  }}
}}

function playHeartbeatThump() {{
  if (!CONFIG.soundEnabled || !state.audioCtx) return;
  try {{
    const ctx = state.audioCtx;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }} catch (e) {{}}
}}

/* =====================================================================
   HEART ANIMATION ENGINE (FAITHFUL TO PYTHON SCRIPT)
   ===================================================================== */
function startHeartAnimation() {{
  state.activeItems = [];
  state.settledItems = [];
  state.shimmeringItems.clear();
  state.spawning = true;
  state.spawnIndex = 0;
  state.spawnAcc = 0;

  statusBadge.style.opacity = '1';
  statusText.textContent = 'Weaving multilingual affirmations...';

  if (CONFIG.soundEnabled) {{
    playHeartbeatThump();
  }}
}}

function stopHeartAnimation() {{
  state.spawning = false;
  state.activeItems = [];
  state.settledItems = [];
  state.shimmeringItems.clear();
}}

function spawnItem(itemData, index) {{
  const dx = (Math.random() - 0.5) * 20; // rng.uniform(-10, 10) in python
  const item = {{
    id: index,
    x: itemData.x,
    y: itemData.y,
    text: itemData.text,
    size: itemData.size,
    color: itemData.color,
    rad: itemData.rad,
    edge: itemData.edge,
    f: 0,
    dx: dx,
    flashVal: 0,
    isSettled: false
  }};
  state.activeItems.push(item);

  // Play gentle harmonic chime occasionally
  const now = performance.now();
  if (now > state.nextChimeTime) {{
    playHarmonicChime(index % CHIME_FREQS.length, 0.7);
    state.nextChimeTime = now + 120 + Math.random() * 80;
  }}
}}

function mix(a, b, k) {{
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k
  ];
}}

function clamp(v, min = 0, max = 1) {{
  return Math.max(min, Math.min(max, v));
}}

function rgbString(c, alpha = 1.0) {{
  const r = Math.round(clamp(c[0]) * 255);
  const g = Math.round(clamp(c[1]) * 255);
  const b = Math.round(clamp(c[2]) * 255);
  return `rgba(${{r}}, ${{g}}, ${{b}}, ${{alpha}})`;
}}

/* =====================================================================
   MAIN RENDER LOOP (60 FPS)
   ===================================================================== */
function mainAnimationLoop(timestamp) {{
  const dt = (timestamp - state.lastFrameTime) / 1000;
  state.lastFrameTime = timestamp;

  // Render ambient background
  renderAmbientParticles();

  // If on hero view, render heart canvas
  if (state.activeView === 'hero') {{
    renderHeartFrame(dt);
  }}

  requestAnimationFrame(mainAnimationLoop);
}}

function renderHeartFrame(dt) {{
  const w = window.innerWidth;
  const h = window.innerHeight;

  heartCtx.clearRect(0, 0, w, h);

  // Calculate dynamic responsive scale
  // Heart bounds: width ~ 680, height ~ 680
  const baseDim = 720;
  const minScreenDim = Math.min(w, h * 0.88);
  const scale = Math.max(0.65, Math.min(1.4, minScreenDim / baseDim));

  const cx = w / 2;
  // Center Y shifted slightly upward to center the heart optical mass
  const cy = h / 2 - 20;

  // SPAWNING TICK
  if (state.spawning) {{
    const totalItems = HEART_ITEMS.length;
    // Rate in python: len(ORDER) / (DURATION * 1000 / TICK)
    // Here we compute items per second:
    const itemsPerSec = (totalItems / (CONFIG.animDuration * CONFIG.speedMultiplier));
    state.spawnAcc += itemsPerSec * dt;

    while (state.spawnAcc >= 1 && state.spawnIndex < totalItems) {{
      state.spawnAcc -= 1;
      spawnItem(HEART_ITEMS[state.spawnIndex], state.spawnIndex);
      state.spawnIndex++;
    }}

    if (state.spawnIndex >= totalItems) {{
      state.spawning = false;
      setTimeout(() => {{
        if (state.activeView === 'hero') {{
          statusBadge.style.opacity = '0.5';
          statusText.textContent = '127 multilingual affirmations pulsating in harmony';
        }}
      }}, 1000);
    }}
  }}

  // UPDATE ACTIVE ANIMATING ITEMS
  const stillActive = [];
  for (let i = 0; i < state.activeItems.length; i++) {{
    const p = state.activeItems[i];
    p.f += (1 / CONFIG.speedMultiplier);
    const u = clamp(p.f / CONFIG.animFrames);
    const e = 1 - Math.pow(1 - u, 3); // Cubic ease-out
    p.ease = e;

    // Flash calculation from Python: 0.75 * sin(pi * clamp((u - 0.55)/0.45))
    const flashProgress = clamp((u - 0.55) / 0.45);
    const flash = 0.75 * Math.sin(Math.PI * flashProgress);
    p.flashVal = flash;

    if (u >= 1) {{
      p.isSettled = true;
      state.settledItems.push(p);
    }} else {{
      stillActive.push(p);
    }}
  }}
  state.activeItems = stillActive;

  // TRIGGER RANDOM SHIMMER (continuous sparkle when settled)
  if (CONFIG.shimmerEnabled && state.settledItems.length > 0 && Math.random() < 0.12) {{
    const randomItem = state.settledItems[Math.floor(Math.random() * state.settledItems.length)];
    if (!state.shimmeringItems.has(randomItem.id)) {{
      state.shimmeringItems.set(randomItem.id, {{
        intensity: 0.75,
        startTime: performance.now()
      }});
      if (Math.random() < 0.25) {{
        playHarmonicChime(null, 0.4);
      }}
    }}
  }}

  // UPDATE SHIMMER STATES
  const now = performance.now();
  for (const [id, sh] of state.shimmeringItems.entries()) {{
    const elapsed = now - sh.startTime;
    if (elapsed > 400) {{
      state.shimmeringItems.delete(id);
    }} else {{
      sh.intensity = 0.75 * (1 - elapsed / 400);
    }}
  }}

  // DRAW ALL SETTLED ITEMS FIRST
  for (let i = 0; i < state.settledItems.length; i++) {{
    const p = state.settledItems[i];
    drawPhraseItem(p, cx, cy, scale, 1.0, 0, true);
  }}

  // DRAW ALL ACTIVE FLYING ITEMS ON TOP
  for (let i = 0; i < state.activeItems.length; i++) {{
    const p = state.activeItems[i];
    drawPhraseItem(p, cx, cy, scale, p.ease, p.flashVal, false);
  }}
}}

function drawPhraseItem(p, cx, cy, scale, ease, flashVal, isSettled) {{
  // Coordinate transform: python uses Cartesian (x, -y)
  const finalX = cx + p.x * scale;
  const finalY = cy - p.y * scale;

  let drawX = finalX;
  let drawY = finalY;

  const bgcNorm = [CONFIG.bgColor[0] / 255, CONFIG.bgColor[1] / 255, CONFIG.bgColor[2] / 255];
  let textColor = p.color;

  // Interactive mouse repel effect
  let mouseOffsetDist = 0;
  if (state.mouse.isHover) {{
    const mdx = drawX - state.mouse.x;
    const mdy = drawY - state.mouse.y;
    const distSq = mdx * mdx + mdy * mdy;
    if (distSq < 10000) {{ // 100px radius
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / 100) * 12;
      drawX += (mdx / dist) * force;
      drawY += (mdy / dist) * force;
      mouseOffsetDist = force;
    }}
  }}

  const fontSize = Math.round(p.size * scale * 1.08);
  heartCtx.font = `bold ${{fontSize}}px ${{CONFIG.fontFamily}}`;
  heartCtx.textAlign = 'center';
  heartCtx.textBaseline = 'middle';

  if (!isSettled) {{
    // Flying in from above
    const hover = (1 - ease) * CONFIG.liftDistance * scale;
    drawX = finalX + p.dx * (1 - ease) * scale;
    drawY = finalY - hover;

    // Halo shadow
    const haloColor = mix(bgcNorm, [p.color[0] * 0.2, p.color[1] * 0.2, p.color[2] * 0.2], ease * ease);
    heartCtx.fillStyle = rgbString(haloColor, 0.4);
    heartCtx.fillText(p.text, drawX, drawY);

    // Color transition: mix(mix(BGC, c, e^1.5), FLASH, flash)
    const baseCol = mix(bgcNorm, p.color, Math.pow(ease, 1.5));
    textColor = mix(baseCol, CONFIG.flashColor, flashVal);

    // Glowing drop shadow for flying text
    heartCtx.shadowColor = rgbString(p.color, 0.8);
    heartCtx.shadowBlur = 10 * scale;
  }} else {{
    // Check if shimmering
    const shimmer = state.shimmeringItems.get(p.id);
    if (shimmer) {{
      textColor = mix(p.color, CONFIG.flashColor, shimmer.intensity);
      heartCtx.shadowColor = rgbString(CONFIG.flashColor, shimmer.intensity);
      heartCtx.shadowBlur = 14 * shimmer.intensity * scale;
    }} else if (mouseOffsetDist > 0) {{
      textColor = mix(p.color, CONFIG.flashColor, 0.4);
      heartCtx.shadowColor = 'rgba(255, 100, 140, 0.6)';
      heartCtx.shadowBlur = 12 * scale;
    }} else {{
      heartCtx.shadowColor = rgbString(p.color, p.edge ? 0.35 : 0.15);
      heartCtx.shadowBlur = p.edge ? 6 * scale : 2;
    }}
  }}

  // Deep shadow layer
  heartCtx.fillStyle = 'rgba(6, 2, 8, 0.6)';
  heartCtx.fillText(p.text, drawX + 1.5, drawY + 2);

  // Main vibrant text
  heartCtx.fillStyle = rgbString(textColor, 1.0);
  heartCtx.fillText(p.text, drawX, drawY);

  // Reset shadow
  heartCtx.shadowBlur = 0;
}}

/* =====================================================================
   AMBIENT BACKGROUND PARTICLES & FLOATING PETALS
   ===================================================================== */
const ambientParticles = [];
const PARTICLE_COUNT = 50;

function initAmbientParticles() {{
  ambientParticles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i++) {{
    ambientParticles.push(createParticle());
  }}
}}

function createParticle(startAtBottom = false) {{
  return {{
    x: Math.random() * window.innerWidth,
    y: startAtBottom ? window.innerHeight + 20 : Math.random() * window.innerHeight,
    size: 2 + Math.random() * 5,
    speedY: -(0.2 + Math.random() * 0.7),
    speedX: (Math.random() - 0.5) * 0.4,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    opacity: 0.15 + Math.random() * 0.45,
    isPetal: Math.random() < 0.35,
    hue: 340 + Math.random() * 25 // Rose / Magenta hues
  }};
}}

function renderAmbientParticles() {{
  const w = window.innerWidth;
  const h = window.innerHeight;
  ambientCtx.clearRect(0, 0, w, h);

  if (!CONFIG.particlesEnabled) return;

  for (let i = 0; i < ambientParticles.length; i++) {{
    const p = ambientParticles[i];
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    if (p.y < -30) {{
      ambientParticles[i] = createParticle(true);
      continue;
    }}

    ambientCtx.save();
    ambientCtx.translate(p.x, p.y);
    ambientCtx.rotate(p.rotation);
    ambientCtx.globalAlpha = p.opacity;

    if (p.isPetal) {{
      // Soft floating curved rose petal
      ambientCtx.fillStyle = `hsla(${{p.hue}}, 85%, 60%, ${{p.opacity}})`;
      ambientCtx.beginPath();
      ambientCtx.ellipse(0, 0, p.size * 1.8, p.size * 0.9, Math.PI / 4, 0, Math.PI * 2);
      ambientCtx.fill();
    }} else {{
      // Soft glowing bokeh orb
      const grad = ambientCtx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, `hsla(${{p.hue}}, 95%, 70%, ${{p.opacity}})`);
      grad.addColorStop(1, 'transparent');
      ambientCtx.fillStyle = grad;
      ambientCtx.beginPath();
      ambientCtx.arc(0, 0, p.size, 0, Math.PI * 2);
      ambientCtx.fill();
    }}

    ambientCtx.restore();
  }}
}}

/* =====================================================================
   PYTHON SCRIPT MODAL & RUNNER
   ===================================================================== */
function initModalCode() {{
  pythonCodeContent.textContent = PYTHON_SCRIPT_SOURCE;
}}

function openCodeModal() {{
  codeModal.classList.add('active');
  codeModal.setAttribute('aria-hidden', 'false');
}}

function closeCodeModal() {{
  codeModal.classList.remove('active');
  codeModal.setAttribute('aria-hidden', 'true');
}}

async function runNativePythonWindow() {{
  showToast('Launching Python Tkinter window on your system...');
  try {{
    const res = await fetch('/api/run-python', {{ method: 'POST' }});
    if (res.ok) {{
      const data = await res.json();
      showToast('✓ ' + (data.message || 'Python window opened!'));
    }} else {{
      fallbackRunPythonMessage();
    }}
  }} catch (e) {{
    fallbackRunPythonMessage();
  }}
}}

function fallbackRunPythonMessage() {{
  showToast('To run locally: open terminal and type `py heart_animation.py`');
}}

/* =====================================================================
   EVENT LISTENERS & USER CONTROLS
   ===================================================================== */
function setupEventListeners() {{
  // 1. Central Hero Button on Landing Page
  enterHeartBtn.addEventListener('click', (e) => {{
    initAudio();
    createButtonRipple(e, enterHeartBtn);
    setTimeout(() => {{
      switchView('hero');
    }}, 260);
  }});

  // 2. Back to Landing Page
  backToLandingBtn.addEventListener('click', () => {{
    switchView('landing');
  }});

  // 3. Replay Button
  replayBtn.addEventListener('click', () => {{
    startHeartAnimation();
    showToast('Replaying animation from start');
  }});

  dockReplayBtn.addEventListener('click', () => {{
    startHeartAnimation();
    showToast('Replaying animation from start');
  }});

  // 4. Ambient Audio Toggle
  audioToggleBtn.addEventListener('click', () => {{
    initAudio();
    CONFIG.soundEnabled = !CONFIG.soundEnabled;
    if (CONFIG.soundEnabled) {{
      audioToggleBtn.classList.add('glass-accent-btn');
      showToast('Ambient celestial sound enabled 🎵');
      playHeartbeatThump();
    }} else {{
      audioToggleBtn.classList.remove('glass-accent-btn');
      showToast('Sound muted');
    }}
  }});

  // 5. Code Modal Triggers
  openCodeModalBtn.addEventListener('click', openCodeModal);
  viewScriptBtnLanding.addEventListener('click', openCodeModal);
  closeModalBtn.addEventListener('click', closeCodeModal);

  codeModal.addEventListener('click', (e) => {{
    if (e.target === codeModal) closeCodeModal();
  }});

  // 6. Copy Code Button
  copyCodeBtn.addEventListener('click', () => {{
    navigator.clipboard.writeText(PYTHON_SCRIPT_SOURCE).then(() => {{
      copyCodeText.textContent = 'Copied!';
      copyCodeBtn.style.borderColor = 'rgba(100, 255, 150, 0.6)';
      setTimeout(() => {{
        copyCodeText.textContent = 'Copy Code';
        copyCodeBtn.style.borderColor = '';
      }}, 2000);
      showToast('Python script copied to clipboard!');
    }});
  }});

  // 7. Native Python Window Triggers
  modalRunPythonBtn.addEventListener('click', runNativePythonWindow);
  dockRunNativeBtn.addEventListener('click', runNativePythonWindow);

  // 8. Speed Buttons
  speedButtons.forEach(btn => {{
    btn.addEventListener('click', () => {{
      speedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CONFIG.speedMultiplier = parseFloat(btn.dataset.speed);
      showToast(`Animation speed set to ${{btn.textContent}}`);
    }});
  }});

  // 9. Particle Shower Toggle
  dockParticlesBtn.addEventListener('click', () => {{
    CONFIG.particlesEnabled = !CONFIG.particlesEnabled;
    dockParticlesBtn.classList.toggle('active', CONFIG.particlesEnabled);
    showToast(CONFIG.particlesEnabled ? 'Love petals & embers enabled' : 'Particles hidden');
  }});

  // 10. Shimmer Toggle
  dockShimmerBtn.addEventListener('click', () => {{
    CONFIG.shimmerEnabled = !CONFIG.shimmerEnabled;
    dockShimmerBtn.classList.toggle('active', CONFIG.shimmerEnabled);
    showToast(CONFIG.shimmerEnabled ? 'Sparkling shimmer enabled' : 'Shimmer paused');
  }});

  // 11. Interactive Canvas Mouse Hover & Magnetic Ripple
  window.addEventListener('mousemove', (e) => {{
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.isHover = true;

    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
  }});

  window.addEventListener('mouseleave', () => {{
    state.mouse.isHover = false;
    cursorGlow.style.opacity = '0';
  }});

  // 12. Interactive Canvas Click Burst
  heartCanvas.addEventListener('click', (e) => {{
    initAudio();
    playHarmonicChime(null, 1.2);
    // Burst small particles around click location
    for (let i = 0; i < 8; i++) {{
      const p = createParticle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.speedX = (Math.random() - 0.5) * 4;
      p.speedY = (Math.random() - 0.5) * 4;
      p.opacity = 0.9;
      ambientParticles.push(p);
    }}
  }});
}}

function createButtonRipple(e, btn) {{
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const d = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = `${{d}}px`;
  circle.style.left = `${{e.clientX - rect.left - d / 2}}px`;
  circle.style.top = `${{e.clientY - rect.top - d / 2}}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.background = 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,100,140,0.3) 60%, transparent 100%)';
  circle.style.transform = 'scale(0)';
  circle.style.animation = 'rippleExp 0.7s ease-out forwards';
  circle.style.pointerEvents = 'none';

  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 750);
}}

// Ripple keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes rippleExp {{
  to {{
    transform: scale(2.5);
    opacity: 0;
  }}
}}
`;
document.head.appendChild(styleSheet);
"""

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Successfully written script.js, size:", len(js_code))
