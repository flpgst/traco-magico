(() => {
  "use strict";

  const STORAGE_KEY = "traco-magico-v1";
  const LETTER_BOX = { w: 100, h: 130 };
  // Tolerances in letter-box units (scaled to canvas). Kids need a wide corridor —
  // success is stroke order + rough placement, not sitting on the guide pixel-perfect.
  const HIT_RADIUS_UNITS = 14;
  const START_RADIUS_UNITS = 18;
  const BACKTRACK_ALLOW = 0.14;
  const COMPLETE_RATIO = 0.78;
  // When matching the finger to the guide, only consider points near current progress
  // so self-crossing strokes (B, 8, O…) don't snap to the wrong segment.
  const PROGRESS_LOOKBACK = 0.06;
  const PROGRESS_LOOKAHEAD = 0.42;

  const state = {
    mode: "letters", // letters | numbers
    char: "A",
    strokeIndex: 0,
    progress: 0,
    drawing: false,
    userPath: [],
    completedStrokes: [],
    doneMap: {},
    stars: 0,
    hintPulse: 0,
    animId: null,
    celebrate: false,
  };

  const el = {
    home: document.getElementById("screen-home"),
    grid: document.getElementById("screen-grid"),
    play: document.getElementById("screen-play"),
    gridTitle: document.getElementById("grid-title"),
    charGrid: document.getElementById("char-grid"),
    playTitle: document.getElementById("play-title"),
    strokeLabel: document.getElementById("stroke-label"),
    progressDots: document.getElementById("progress-dots"),
    canvas: document.getElementById("trace-canvas"),
    canvasWrap: document.querySelector(".canvas-wrap"),
    feedback: document.getElementById("feedback"),
    btnRetry: document.getElementById("btn-retry"),
    btnNext: document.getElementById("btn-next"),
    overlay: document.getElementById("overlay-success"),
    successMsg: document.getElementById("success-msg"),
    earnedStars: document.getElementById("earned-stars"),
    toast: document.getElementById("toast-error"),
    toastText: document.getElementById("toast-text"),
    starsCount: document.getElementById("stars-count"),
    btnInstall: document.getElementById("btn-install"),
  };

  const ctx = el.canvas.getContext("2d");
  let layout = { pad: 36, scale: 1, ox: 0, oy: 0 };
  let deferredInstall = null;

  function loadSave() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      state.doneMap = data.doneMap || {};
      state.stars = data.stars || 0;
    } catch (_) {}
  }

  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ doneMap: state.doneMap, stars: state.stars })
    );
    el.starsCount.textContent = String(state.stars);
  }

  function showScreen(name) {
    [el.home, el.grid, el.play].forEach((s) => s.classList.remove("active"));
    if (name === "home") el.home.classList.add("active");
    if (name === "grid") el.grid.classList.add("active");
    if (name === "play") el.play.classList.add("active");
  }

  function charsForMode() {
    return state.mode === "letters" ? LETTERS : NUMBERS;
  }

  function renderGrid() {
    el.gridTitle.textContent = state.mode === "letters" ? "Alfabeto" : "Números";
    el.starsCount.textContent = String(state.stars);
    el.charGrid.innerHTML = "";
    charsForMode().forEach((ch) => {
      const btn = document.createElement("button");
      btn.className = "char-card" + (state.doneMap[ch] ? " done" : "");
      btn.type = "button";
      btn.textContent = ch;
      btn.addEventListener("click", () => {
        Sounds.tap();
        openPlay(ch);
      });
      el.charGrid.appendChild(btn);
    });
  }

  function openPlay(ch) {
    state.char = ch;
    resetTrace(false);
    el.playTitle.textContent = ch;
    el.btnNext.hidden = true;
    showScreen("play");
    resizeCanvas();
    startLoop();
  }

  function resetTrace(keepCelebrate) {
    state.strokeIndex = 0;
    state.progress = 0;
    state.drawing = false;
    state.userPath = [];
    state.completedStrokes = [];
    state.celebrate = !!keepCelebrate;
    updateStrokeMeta();
  }

  function currentCharData() {
    return STROKE_DATA[state.char];
  }

  function updateStrokeMeta() {
    const data = currentCharData();
    const total = data.strokes.length;
    const i = Math.min(state.strokeIndex + 1, total);
    el.strokeLabel.textContent =
      state.strokeIndex >= total
        ? "Pronto!"
        : `Traço ${i} de ${total}`;
    el.progressDots.innerHTML = "";
    for (let n = 0; n < total; n++) {
      const d = document.createElement("span");
      if (n < state.strokeIndex) d.className = "done";
      else if (n === state.strokeIndex) d.className = "current";
      el.progressDots.appendChild(d);
    }
  }

  function resizeCanvas() {
    const wrap = el.canvasWrap.getBoundingClientRect();
    const cssW = Math.min(wrap.width || 360, 380);
    const cssH = Math.min(wrap.height || 420, cssW * 1.15);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.canvas.style.width = cssW + "px";
    el.canvas.style.height = cssH + "px";
    el.canvas.width = Math.round(cssW * dpr);
    el.canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = 28;
    const usableW = cssW - pad * 2;
    const usableH = cssH - pad * 2;
    const scale = Math.min(usableW / LETTER_BOX.w, usableH / LETTER_BOX.h);
    layout = {
      pad,
      scale,
      ox: (cssW - LETTER_BOX.w * scale) / 2,
      oy: (cssH - LETTER_BOX.h * scale) / 2,
      cssW,
      cssH,
    };
  }

  function toCanvas(p) {
    return {
      x: layout.ox + p.x * layout.scale,
      y: layout.oy + p.y * layout.scale,
    };
  }

  function fromEvent(e) {
    const rect = el.canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - rect.left, y: t.clientY - rect.top };
  }

  function densify(points, step = 2.5) {
    if (points.length < 2) return points.slice();
    const out = [points[0]];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const n = Math.max(1, Math.ceil(dist / step));
      for (let k = 1; k <= n; k++) {
        out.push({ x: a.x + (dx * k) / n, y: a.y + (dy * k) / n });
      }
    }
    return out;
  }

  function strokeCanvasPoints(stroke) {
    return densify(stroke.map(toCanvas), 3);
  }

  function hitRadiusPx() {
    return Math.max(28, HIT_RADIUS_UNITS * layout.scale);
  }

  function startRadiusPx() {
    return Math.max(36, START_RADIUS_UNITS * layout.scale);
  }

  /**
   * Nearest densified guide point to `point`.
   * When `fromProgress` is set, search only a forward window along the path so
   * two nearby segments of the *same* stroke (self-cross / revisit) do not steal
   * the match and look like a wrong collision.
   */
  function nearestOnPath(path, point, fromProgress = null) {
    if (!path.length) return { dist: Infinity, index: 0 };

    let start = 0;
    let end = path.length - 1;
    if (fromProgress != null && path.length > 1) {
      const n = path.length - 1;
      start = Math.max(0, Math.floor((fromProgress - PROGRESS_LOOKBACK) * n));
      end = Math.min(n, Math.ceil((fromProgress + PROGRESS_LOOKAHEAD) * n));
      // Near the end of the stroke, keep the window open to the finish.
      if (fromProgress > 0.7) end = n;
    }

    let best = { dist: Infinity, index: start };
    for (let i = start; i <= end; i++) {
      const d = Math.hypot(path[i].x - point.x, path[i].y - point.y);
      if (d < best.dist) best = { dist: d, index: i };
    }
    return best;
  }

  function drawGuideLetter() {
    const data = currentCharData();
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#D7DEE6";
    ctx.lineWidth = Math.max(10, 14 * layout.scale * 0.35);
    data.strokes.forEach((stroke) => {
      const pts = stroke.map(toCanvas);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawCompleted() {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#3ECF8E";
    ctx.lineWidth = Math.max(8, 12 * layout.scale * 0.32);
    state.completedStrokes.forEach((stroke) => {
      if (!stroke.length) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawActiveGuide(path) {
    if (!path.length) return;
    const t = (Math.sin(state.hintPulse * 0.08) + 1) / 2;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = `rgba(255, 107, 90, ${0.25 + t * 0.2})`;
    ctx.lineWidth = Math.max(7, 10 * layout.scale * 0.3);
    ctx.setLineDash([10, 10]);
    ctx.lineDashOffset = -state.hintPulse * 0.4;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
    ctx.stroke();
    ctx.setLineDash([]);

    // progress fill on guide
    const end = Math.max(1, Math.floor(state.progress * (path.length - 1)));
    ctx.strokeStyle = "#FF6B5A";
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i <= end; i++) ctx.lineTo(path[i].x, path[i].y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // start dot + arrow
    const start = path[0];
    const look = path[Math.min(8, path.length - 1)];
    drawStartDot(start, look);
    ctx.restore();
  }

  function drawStartDot(start, look) {
    const pulse = 1 + Math.sin(state.hintPulse * 0.12) * 0.12;
    ctx.beginPath();
    ctx.fillStyle = "#FF6B5A";
    ctx.arc(start.x, start.y, 9 * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(start.x, start.y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    const ang = Math.atan2(look.y - start.y, look.x - start.x);
    const ax = start.x + Math.cos(ang) * 22;
    const ay = start.y + Math.sin(ang) * 22;
    ctx.save();
    ctx.translate(ax, ay);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.fillStyle = "#FF6B5A";
    ctx.moveTo(10, 0);
    ctx.lineTo(-6, 7);
    ctx.lineTo(-6, -7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawUserPath() {
    if (state.userPath.length < 2) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2B3A4A";
    ctx.lineWidth = Math.max(7, 11 * layout.scale * 0.3);
    ctx.beginPath();
    ctx.moveTo(state.userPath[0].x, state.userPath[0].y);
    for (let i = 1; i < state.userPath.length; i++) {
      ctx.lineTo(state.userPath[i].x, state.userPath[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawPaperTexture() {
    ctx.save();
    ctx.fillStyle = "#FFFDF7";
    roundRect(ctx, 0, 0, layout.cssW, layout.cssH, 28);
    ctx.fill();

    // soft lined paper
    ctx.strokeStyle = "rgba(125, 170, 200, 0.18)";
    ctx.lineWidth = 1;
    for (let y = 48; y < layout.cssH - 20; y += 28) {
      ctx.beginPath();
      ctx.moveTo(18, y);
      ctx.lineTo(layout.cssW - 18, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function render() {
    if (!layout.cssW) return;
    ctx.clearRect(0, 0, layout.cssW, layout.cssH);
    drawPaperTexture();
    drawGuideLetter();
    drawCompleted();

    const data = currentCharData();
    if (state.strokeIndex < data.strokes.length) {
      const path = strokeCanvasPoints(data.strokes[state.strokeIndex]);
      drawActiveGuide(path);
    }
    drawUserPath();
  }

  function startLoop() {
    cancelAnimationFrame(state.animId);
    const tick = () => {
      state.hintPulse++;
      render();
      state.animId = requestAnimationFrame(tick);
    };
    tick();
  }

  function showError(msg) {
    Sounds.error();
    el.canvasWrap.classList.remove("shake");
    void el.canvasWrap.offsetWidth;
    el.canvasWrap.classList.add("shake");
    el.toastText.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(showError._t);
    showError._t = setTimeout(() => {
      el.toast.hidden = true;
    }, 1600);
  }

  function showPop(emoji) {
    el.feedback.hidden = false;
    el.feedback.textContent = emoji;
    clearTimeout(showPop._t);
    showPop._t = setTimeout(() => {
      el.feedback.hidden = true;
    }, 500);
  }

  function onPointerDown(e) {
    e.preventDefault();
    Sounds.unlock();
    const data = currentCharData();
    if (state.strokeIndex >= data.strokes.length) return;

    const pt = fromEvent(e);
    const path = strokeCanvasPoints(data.strokes[state.strokeIndex]);
    // Restrict start matching to the beginning of the stroke (order).
    const near = nearestOnPath(path, pt, 0);

    if (near.dist > startRadiusPx() || near.index > path.length * 0.22) {
      showError("Comece na bolinha vermelha!");
      return;
    }

    state.drawing = true;
    state.userPath = [pt];
    state.progress = near.index / Math.max(1, path.length - 1);
  }

  function onPointerMove(e) {
    if (!state.drawing) return;
    e.preventDefault();
    const data = currentCharData();
    const path = strokeCanvasPoints(data.strokes[state.strokeIndex]);
    const pt = fromEvent(e);
    // Progress-windowed match: same-stroke self-crossings must not invalidate.
    const near = nearestOnPath(path, pt, state.progress);

    if (near.dist > hitRadiusPx()) {
      state.drawing = false;
      state.userPath = [];
      state.progress = 0;
      showError("Ops! Siga a setinha.");
      showPop("😅");
      return;
    }

    // Order: mostly move forward along the path (small backtrack allowed).
    const nextProgress = near.index / Math.max(1, path.length - 1);
    if (nextProgress + BACKTRACK_ALLOW < state.progress) {
      state.drawing = false;
      state.userPath = [];
      state.progress = 0;
      showError("Quase! Vá na direção da seta.");
      showPop("🙈");
      return;
    }

    state.progress = Math.max(state.progress, nextProgress);
    const last = state.userPath[state.userPath.length - 1];
    if (!last || Math.hypot(last.x - pt.x, last.y - pt.y) > 1.5) {
      state.userPath.push(pt);
    }
  }

  function onPointerUp(e) {
    if (!state.drawing) return;
    e.preventDefault();
    state.drawing = false;
    const data = currentCharData();
    const path = strokeCanvasPoints(data.strokes[state.strokeIndex]);

    if (state.progress >= COMPLETE_RATIO) {
      // snap completed stroke to guide for clean look
      state.completedStrokes.push(path);
      state.userPath = [];
      state.progress = 0;
      state.strokeIndex++;
      Sounds.strokeOk();
      showPop("✨");
      updateStrokeMeta();

      if (state.strokeIndex >= data.strokes.length) {
        finishChar();
      }
    } else {
      state.userPath = [];
      state.progress = 0;
      showError("Continue até o fim do traço!");
    }
  }

  function finishChar() {
    const firstTime = !state.doneMap[state.char];
    state.doneMap[state.char] = true;
    const earned = firstTime ? 3 : 1;
    state.stars += earned;
    save();
    Sounds.success();
    el.successMsg.textContent = firstTime
      ? `Você traçou o ${state.char} certinho!`
      : `De novo! O ${state.char} ficou perfeito!`;
    el.earnedStars.textContent = "⭐".repeat(earned);
    el.overlay.hidden = false;
    el.btnNext.hidden = false;
  }

  function nextChar() {
    const list = charsForMode();
    const idx = list.indexOf(state.char);
    const next = list[(idx + 1) % list.length];
    openPlay(next);
  }

  function demoHint() {
    Sounds.hint();
    // briefly animate progress along current stroke as a demo
    const data = currentCharData();
    if (state.strokeIndex >= data.strokes.length) return;
    let p = 0;
    const path = strokeCanvasPoints(data.strokes[state.strokeIndex]);
    const was = state.userPath.slice();
    const id = setInterval(() => {
      p += 0.04;
      const i = Math.min(path.length - 1, Math.floor(p * (path.length - 1)));
      state.userPath = path.slice(0, i + 1);
      state.progress = p;
      if (p >= 1) {
        clearInterval(id);
        state.userPath = was;
        state.progress = 0;
      }
    }, 30);
  }

  // Events
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      Sounds.unlock();
      Sounds.tap();
      state.mode = btn.getAttribute("data-go");
      renderGrid();
      showScreen("grid");
    });
  });

  document.getElementById("btn-back-home").addEventListener("click", () => {
    Sounds.tap();
    showScreen("home");
  });

  document.getElementById("btn-back-grid").addEventListener("click", () => {
    Sounds.tap();
    cancelAnimationFrame(state.animId);
    renderGrid();
    showScreen("grid");
  });

  el.btnRetry.addEventListener("click", () => {
    Sounds.tap();
    resetTrace(false);
  });

  el.btnNext.addEventListener("click", () => {
    Sounds.tap();
    el.overlay.hidden = true;
    nextChar();
  });

  document.getElementById("btn-replay").addEventListener("click", () => {
    Sounds.tap();
    el.overlay.hidden = true;
    resetTrace(false);
  });

  document.getElementById("btn-continue").addEventListener("click", () => {
    Sounds.tap();
    el.overlay.hidden = true;
    nextChar();
  });

  document.getElementById("btn-hint").addEventListener("click", demoHint);

  el.canvas.addEventListener("pointerdown", onPointerDown);
  el.canvas.addEventListener("pointermove", onPointerMove);
  el.canvas.addEventListener("pointerup", onPointerUp);
  el.canvas.addEventListener("pointercancel", onPointerUp);
  el.canvas.addEventListener("pointerleave", (e) => {
    if (state.drawing) onPointerUp(e);
  });

  window.addEventListener("resize", () => {
    if (el.play.classList.contains("active")) resizeCanvas();
  });

  // PWA install
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstall = e;
    el.btnInstall.hidden = false;
  });

  el.btnInstall.addEventListener("click", async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    el.btnInstall.hidden = true;
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  loadSave();
  el.starsCount.textContent = String(state.stars);
})();
