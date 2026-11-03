<!-- PART 6 OF 9 of the glossary animations code bundle. Contains: Neutrum, Noise, Object. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

## 15. Neutrum  (slug: `neutrum`)

### Neutrum: HTML + JavaScript  (`src/animations/neutrum.astro`)

```astro
---

---

<div id="neutrum-water" class="neutrum-wrapper" data-text="neutrum "></div>

<script>
    // =====================================
    // MARK: Script neutrum
    // =====================================
    // @ts-nocheck
    (() => {
        // Behaviour only. Everything visual (tilt, bounce, fade, spin, type, sizes)
        // is in neutrum.css. This file paints the rings and spawns ripples.
        const CONFIG = {
            spawnDistance: 190,   // px the pointer must travel before the next ripple
            spawnInterval: 400,   // ms minimum between ripples
            ambient: true,        // soft drop when nobody is moving the pointer
            ambientEvery: 4500    // ms
        };

        const water = document.getElementById("neutrum-water");
        const section = water.closest(".animation-section");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // the settings live on the wrapper in neutrum.css, not on :root
        const wrapperStyle = getComputedStyle(water);
        const readNumber = name => parseFloat(wrapperStyle.getPropertyValue(name));
        const TWO_PI = Math.PI * 2;

        const ripples = [];
        let prototype = null;
        let lastX = null, lastY = null, lastSpawn = 0, lastActivity = 0;

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        // pointer position measured against the animation itself, since it sits inside the page
        function getPointerPosition(e) {
            const r = water.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        }

        // Paint each ring's letters once into an image. Clones share the decoded
        // image, so a ripple is one element per ring instead of one per letter.
        function buildPrototype() {
            const text = water.dataset.text;
            const rings = readNumber("--rings");
            const first = readNumber("--first-ring");
            const gap = readNumber("--ring-gap");
            const spaceWidth = readNumber("--space-width");

            const cs = getComputedStyle(water);
            const fontSize = parseFloat(cs.fontSize);
            const font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            // measure the letters with the same font CSS uses
            const m = document.createElement("canvas").getContext("2d");
            m.font = font;
            const widths = [];
            let total = 0;
            for (const ch of text) {
                const cw = ch === " " ? m.measureText("n").width * spaceWidth : m.measureText(ch).width;
                widths.push(cw);
                total += cw;
            }

            const proto = document.createElement("div");
            proto.className = "ripple";

            for (let i = 0; i < rings; i++) {
                const r = first + i * gap;
                const circ = TWO_PI * r;
                const reps = Math.max(1, Math.round(circ / total));   // whole number of repeats
                const scale = circ / (reps * total);                  // stretched slightly so the text closes

                // paint this ring's letters once
                const half = Math.ceil(r + fontSize);
                const canvas = document.createElement("canvas");
                canvas.width = canvas.height = Math.round(half * 2 * dpr);
                const g = canvas.getContext("2d");
                g.scale(dpr, dpr);
                g.translate(half, half);
                g.font = font;
                g.fillStyle = cs.color;
                g.textAlign = "center";
                g.textBaseline = "middle";

                let offset = 0;
                for (let rep = 0; rep < reps; rep++) {
                    let k = 0;
                    for (const ch of text) {
                        const cw = widths[k++];
                        if (ch !== " ") {
                            g.save();
                            g.rotate(((offset + cw / 2) * scale) / r);   // radians, clockwise from the top
                            g.fillText(ch, 0, -r);
                            g.restore();
                        }
                        offset += cw;
                    }
                }

                const img = new Image();
                img.decoding = "async";
                img.alt = "";
                img.src = canvas.toDataURL("image/png");
                img.style.cssText =
                    "width:" + (half * 2) + "px;height:" + (half * 2) + "px;left:" + (-half) + "px;top:" + (-half) + "px";

                const ring = document.createElement("div");
                ring.className = "ring";
                ring.style.setProperty("--i", i);
                ring.appendChild(img);
                proto.appendChild(ring);
            }
            return proto;
        }

        function removeRipple(el) {
            el.remove();
            const idx = ripples.indexOf(el);
            if (idx !== -1) ripples.splice(idx, 1);
        }

        function spawnRipple(x, y, strength) {
            if (!prototype || isPaused()) return;
            const el = prototype.cloneNode(true);
            el.style.setProperty("--x", x);
            el.style.setProperty("--y", y);
            el.style.setProperty("--str", Math.max(0.35, Math.min(1, strength)));
            el.style.setProperty("--rot", Math.round(Math.random() * 360) + "deg");
            water.appendChild(el);
            ripples.push(el);

            // the outermost ring is the last to finish bouncing: then the ripple is gone
            el.lastElementChild.addEventListener("animationend", e => {
                if (e.animationName === "bounce") removeRipple(el);
            });
            lastSpawn = performance.now();
        }

        function handleMove(e) {
            const now = performance.now();
            const p = getPointerPosition(e);
            lastActivity = now;
            if (lastX === null) { lastX = p.x; lastY = p.y; }
            const dist = Math.hypot(p.x - lastX, p.y - lastY);
            if (dist >= CONFIG.spawnDistance && now - lastSpawn >= CONFIG.spawnInterval) {
                const dt = Math.max(16, now - lastSpawn);
                spawnRipple(p.x, p.y, (dist / dt) / 1.2);   // faster pointer = bigger swing
                lastX = p.x; lastY = p.y;
            }
        }

        function handleDown(e) {
            const p = getPointerPosition(e);
            lastActivity = performance.now();
            lastX = p.x; lastY = p.y;
            spawnRipple(p.x, p.y, 1);
        }

        // only the animation reacts, not the rest of the page
        water.addEventListener("pointermove", handleMove);
        water.addEventListener("pointerdown", handleDown);

        if (CONFIG.ambient && !reduceMotion) {
            setInterval(() => {
                if (isPaused()) return;
                const now = performance.now();
                if (now - lastActivity > CONFIG.ambientEvery && now - lastSpawn > CONFIG.ambientEvery) {
                    spawnRipple(water.clientWidth * (0.2 + Math.random() * 0.6),
                          water.clientHeight * (0.25 + Math.random() * 0.5), 0.6);
                }
            }, 500);
        }

        // build after fonts are ready so the measured widths match what CSS draws,
        // then drop a first ripple so the animation is not empty
        const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
        ready.then(() => {
            prototype = buildPrototype();
            spawnRipple(water.clientWidth / 2, water.clientHeight / 2, 0.8);
        });
    })();
</script>
```

### Neutrum: CSS  (`public/styles/animation-css/neutrum.css`)

```css
/* =====================================
MARK: Neutrum Animation
Scoped to .neutrum-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old :root and body styles) ---------- */
.neutrum-wrapper {
    /* look */
    --bg: var(--color-background, #000000);
    --ink: var(--color-text, #ffffff);
    --font-family: ui-monospace, Menlo, Consolas, monospace;
    --font-size: 21px;
    --font-weight: 200;                 /* 700 = bold; 800 only shows if the font has it */
    --space-width: 1;                   /* a space compared to a normal letter; smaller = tighter words */

    /* shape (numbers are px, without unit) */
    --rings: 10;                        /* rings per ripple, all created at once */
    --first-ring: 40;
    --ring-gap: 42;

    /* view */
    --perspective: 900px;
    --tilt: 70deg;                      /* 0deg = looking straight down, 90deg = edge-on */

    /* movement */
    --height: 30px;                     /* how far a ring travels up and down */
    --bounce-time: 3.4s;                /* length of one whole ripple; smaller = quicker bounce */
    --wave-speed: 240;                  /* px per second the movement travels outward */

    /* wiggle: how far each ring travels, from the centre outward */
    --swing-reach: 200;                 /* distance where the swing has dropped to half */
    --swing-curve: 1;                   /* 0.5 = stays big far out, 1 = gentle, 2 = drops quickly */

    /* opacity: how bright each ring is, from the centre outward */
    --opacity-max: 1;                   /* brightest a ring can get at the centre */
    --opacity-reach: 100;               /* distance where the brightness has dropped to half */
    --opacity-curve: 0.5;               /* 0.5 = stays bright far out, 1 = gentle, 2 = drops quickly */
    --opacity-follows-swing: 0.5;       /* 0 = opacity uses its own falloff, 1 = opacity falls off exactly like the wiggle */

    --spin-time: 52s;                   /* one slow turn of the text on a ring */

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    color: var(--ink);
    font: var(--font-weight) var(--font-size) / 1 var(--font-family);
    touch-action: none;
    user-select: none;
}

@media (prefers-reduced-motion: reduce) {
    .neutrum-wrapper {
        --height: 8px;
        --bounce-time: 2.4s;
        --spin-time: 400s;
    }
}

/* ---------- one ripple: a tilted plane at the pointer ---------- */
.neutrum-wrapper .ripple {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    translate: calc(var(--x) * 1px) calc(var(--y) * 1px);   /* --x, --y, --str, --rot are set by the script */
    transform: perspective(var(--perspective)) rotateX(var(--tilt));
    transform-style: preserve-3d;
    pointer-events: none;
}

/* ---------- one ring of text: it moves up and down through the plane ---------- */
.neutrum-wrapper .ring {
    /* radius, arrival time, swing size and brightness, all from the ring's number --i */
    --r: calc(var(--first-ring) + var(--i) * var(--ring-gap));
    --delay: calc(var(--r) / var(--wave-speed) * 1s);
    --swing-falloff: pow(calc(1 / (1 + var(--r) / var(--swing-reach))), var(--swing-curve));           /* 1 at the centre, smaller further out */
    --opacity-falloff: pow(calc(1 / (1 + var(--r) / var(--opacity-reach))), var(--opacity-curve));
    --opacity-mix: calc(var(--opacity-follows-swing) * var(--swing-falloff) + (1 - var(--opacity-follows-swing)) * var(--opacity-falloff));
    --amp: calc(var(--height) * var(--str) * var(--swing-falloff));     /* wiggle size of this ring */
    --peak: calc(var(--opacity-max) * var(--str) * var(--opacity-mix)); /* brightest this ring gets */
    --spin-from: calc(var(--rot) + var(--i) * 75deg);

    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    will-change: translate, opacity, rotate;

    animation-name: bounce, fade, spin;
    animation-duration: var(--bounce-time), var(--bounce-time), var(--spin-time);
    animation-delay: var(--delay), var(--delay), 0s;
    animation-timing-function: ease-in-out, linear, linear;
    animation-fill-mode: both, both, none;      /* invisible until the movement reaches the ring */
    animation-iteration-count: 1, 1, infinite;
}

.neutrum-wrapper .ring:nth-child(even) {
    animation-direction: normal, normal, reverse;
}

/* ---------- the ring's text, painted once into an image by the script ---------- */
.neutrum-wrapper .ring img {
    position: absolute;
    display: block;
    max-width: none;
    pointer-events: none;
}

/* ---------- Keyframes ----------
   bounce: a damped up-and-down, one stop per peak, eased in between.
   fade:   opacity hits the same peaks at the same moments as bounce, scaled
           to the ring's brightness, so brightness tracks the wiggle size.
   spin:   slow rotation of the text around the ring.                     */
@keyframes bounce {
    0%    { translate: 0 0 0px; }
    4.9%  { translate: 0 0 calc(var(--amp) *  0.649); }
    14.7% { translate: 0 0 calc(var(--amp) * -1); }
    24.5% { translate: 0 0 calc(var(--amp) *  0.855); }
    34.3% { translate: 0 0 calc(var(--amp) * -0.616); }
    44.1% { translate: 0 0 calc(var(--amp) *  0.406); }
    53.9% { translate: 0 0 calc(var(--amp) * -0.255); }
    63.7% { translate: 0 0 calc(var(--amp) *  0.155); }
    73.5% { translate: 0 0 calc(var(--amp) * -0.092); }
    83.3% { translate: 0 0 calc(var(--amp) *  0.053); }
    100%  { translate: 0 0 0px; }
}

@keyframes fade {
    0%    { opacity: 0; }
    4.9%  { opacity: calc(var(--peak) * 0.649); }
    14.7% { opacity: var(--peak); }
    24.5% { opacity: calc(var(--peak) * 0.855); }
    34.3% { opacity: calc(var(--peak) * 0.616); }
    44.1% { opacity: calc(var(--peak) * 0.406); }
    53.9% { opacity: calc(var(--peak) * 0.255); }
    63.7% { opacity: calc(var(--peak) * 0.155); }
    73.5% { opacity: calc(var(--peak) * 0.092); }
    83.3% { opacity: calc(var(--peak) * 0.053); }
    100%  { opacity: 0; }
}

@keyframes spin {
    from { rotate: var(--spin-from); }
    to   { rotate: calc(var(--spin-from) + 360deg); }
}
```

---

## 16. Noise  (slug: `noise`)

### Noise: HTML + JavaScript  (`src/animations/noise.astro`)

```astro
---

---

<div class="noise-wrapper">
    <canvas class="noise-canvas" id="noise-canvas"></canvas>
</div>

<script>
    // =====================================
    // MARK: Script noise
    // =====================================
    // @ts-nocheck

    // The streaky noise texture runs everywhere. Moving the pointer makes the noise inside the
    // letters hold still and travel with the pointer, so the word fades in. Stopping lets it dissolve again.
    (function () {
        "use strict";

        const WORD = "NOISE";
        const STOP_DELAY = 250;     // ms without movement before the fade-out starts
        const FADE_IN = 1200;       // ms for the letters to appear
        const FADE_OUT = 2200;      // ms for the letters to dissolve
        const FOLLOW = 1;           // how far the noise in the letters travels per px of pointer movement (1 = same distance)
        const INVERT = false;       // false = the noise moves the same way as the pointer, true = the opposite way
        const TEXTURE_MS = 33;      // the texture itself updates about 30 times a second
        const GRAIN_TOP = 0.8;      // how much random grain sits on top of the texture at the very top (the original texture had 0.05)
        const GRAIN = 0.4;          // the same from about 60% of the screen height downwards; it eases between the two
        const SPLIT = 1;            // where the dark grey area meets the light grey area, as a fraction of the screen height. 1 = dark grey everywhere, 0.5 = split through the word
        const LIGHT_TOP = 0.35;     // share of the streaks that are light grey at the top of the screen (0 = none, 1 = all)
        const LIGHT_BOTTOM = 0.6;   // the same at the bottom; the share changes smoothly in between
        const BLOCKS = 0.1;         // share of the screen covered by flickering black and white blocks (the original texture only had them along its contours)
        const BLACK_COLUMNS = 0.05; // share of columns that are a black streak (the original had 0.015)
        const WHITE_COLUMNS = 0.16; // share of columns with white streaks (the original had 0.08)

        const cv = document.getElementById("noise-canvas");
        const ctx = cv.getContext("2d");
        const section = cv.closest(".animation-section");
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

        let W, H, cell, img, px, live, frozen, mask, thresh;
        let ch, seg, vel, ctone, dk, wl;           // per-column texture settings
        let moving = false, reveal = 0, stopTimer = null;
        let ox = 0, oy = 0;                        // how far the noise inside the letters has travelled, in grains
        let lastX = null, lastY = null;
        let t = 0, lastT = 0, lastTex = 0;
        let ready = false;

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        // grey value (0-255) to packed pixel
        const GRAY = new Uint32Array(256);
        for (let v = 0; v < 256; v++) GRAY[v] = (255 << 24) | (v << 16) | (v << 8) | v;

        function hashNumber(n) {
            n = Math.imul(n ^ (n >>> 15), 2246822507);
            n = Math.imul(n ^ (n >>> 13), 3266489909);
            return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
        }

        function buildMask() {
            if (!ready) return;
            const m = document.createElement("canvas");
            m.width = W; m.height = H;
            const g = m.getContext("2d");
            g.fillStyle = "#fff";
            g.textAlign = "center";
            g.textBaseline = "middle";
            const family = '"Inter", sans-serif';   // Inter is loaded in general.css
            g.font = "900 100px " + family;
            const base = g.measureText(WORD).width;
            const size = Math.min(100 * (W * 0.85) / base, H * 0.6);
            g.font = "900 " + size + "px " + family;
            g.fillText(WORD, W / 2, H / 2);
            const d = g.getImageData(0, 0, W, H).data;
            mask = new Uint8Array(W * H);
            for (let i = 0; i < W * H; i++) mask[i] = d[i * 4 + 3] > 127 ? 1 : 0;
        }

        function init() {
            // sized to the animation area, not the window
            const r = cv.getBoundingClientRect();
            if (!(r.width > 2 && r.height > 2)) return;     // ignore hidden / zero-size layouts
            cell = Math.max(1.5, Math.sqrt(r.width * r.height / 180000));   // screen px per grain
            W = Math.ceil(r.width / cell);
            H = Math.ceil(r.height / cell);
            cv.width = W; cv.height = H;
            img = ctx.createImageData(W, H);
            px = new Uint32Array(img.data.buffer);
            live = new Uint8Array(W * H);
            frozen = new Uint8Array(W * H);
            thresh = new Float32Array(W * H);
            for (let i = 0; i < W * H; i++) thresh[i] = Math.random();

            ch = new Float32Array(W); seg = new Float32Array(W); vel = new Float32Array(W);
            ctone = new Float32Array(W); dk = new Uint8Array(W); wl = new Uint8Array(W);
            for (let x = 0; x < W; x++) {
                ch[x] = hashNumber(x * 7 + 1);
                const r = hashNumber(x * 11 + 3);
                seg[x] = 3 + Math.floor(r * r * 150);
                vel[x] = (hashNumber(x * 13 + 5) - 0.5) * 70;
                ctone[x] = hashNumber(x * 3 + 11) - 0.5;
                dk[x] = hashNumber(x * 17 + 2) > 1 - BLACK_COLUMNS ? 1 : 0;
                wl[x] = hashNumber(x * 23 + 7) > 1 - WHITE_COLUMNS ? 1 : 0;
            }
            ready = true;
            buildMask();
            drawTexture();
            frozen.set(live);
        }

        // the streaky noise texture: fills `live` with grey values
        function drawTexture() {
            const c1x = W * (0.35 + 0.25 * Math.sin(t * 0.5)), c1y = H * (0.2 + 0.05 * Math.sin(t * 0.7)), a1 = W * 0.6, b1 = H * 0.055;
            const c2x = W * (0.6 + 0.3 * Math.sin(t * 0.35 + 2)), c2y = H * (0.42 + 0.04 * Math.sin(t * 0.5 + 1)), a2 = W * 0.45, b2 = H * 0.045;
            const c3x = W * (0.5 + 0.35 * Math.sin(t * 0.3 + 4)), c3y = H * 0.74, a3 = W * 0.9, b3 = H * 0.2;

            const rh = Math.max(2, Math.round(H / 150)), tk = Math.floor(t * 4);
            for (let y = 0; y < H; y++) {
                const lower = y > H * SPLIT, by = Math.floor(y / rh);
                const lightShare = LIGHT_TOP + (LIGHT_BOTTOM - LIGHT_TOP) * (y / H);
                const grain = GRAIN_TOP + (GRAIN - GRAIN_TOP) * Math.min(1, y / (H * 0.6));
                const rl = 3 + Math.floor(hashNumber(by * 5 + 1) * 11), ro = Math.floor(hashNumber(by * 3 + 2) * 40);
                const blob = y > H * 0.9 ? (y - H * 0.9) / (H * 0.1) * 0.65 : 0;
                for (let x = 0; x < W; x++) {
                    const s = seg[x], shift = ch[x] * 100 + vel[x] * t;
                    const cl = Math.floor((y + shift) / s), ys = cl * s - shift;

                    const dx = x + ys * 0.25;
                    const e1 = Math.hypot((dx - c1x) / a1, (ys - c1y) / b1);
                    const e2 = Math.hypot((dx - c2x) / a2, (ys - c2y) / b2);
                    const e3 = Math.hypot((dx - c3x) / a3, (ys - c3y) / b3);
                    const f = Math.min(e1, e2, e3 * 0.8) * 3.5;
                    const lv = Math.floor(f), fr = f - lv;

                    // smooth region: soft vertical streaks
                    // each streak segment is either light grey or dark grey; light ones become more common towards the bottom
                    const light = hashNumber((x * 29 + cl * 613 + 5) | 0) < lightShare;
                    let g = (light ? 0.84 : 0.58) + ctone[x] * (light ? 0.16 : 0.2) + (hashNumber((x * 31 + cl * 977) | 0) - 0.5) * 0.08;
                    if (wl[x] && hashNumber(cl * 53 + x) > 0.3) g = 0.97;
                    if (dk[x]) g = 0.04;

                    // blocky detail around contour edges and bottom blobs
                    const det = lower ? (fr < 0.1 || fr > 0.93) : (lv >= 1 && lv <= 3 && fr < 0.6);
                    const bl = blob > 0 && hashNumber(Math.floor(x / 5) * 17 + by * 31 + tk) < blob;
                    const extra = hashNumber(Math.floor(x / 5) * 29 + by * 41 + tk * 11 + 3) < BLOCKS;   // blocks scattered over the whole screen
                    if (det || bl || extra) {
                        const cx = Math.floor((x + ro) / rl), hv = hashNumber(cx * 131 + by * 977 + tk * 13);
                        g = bl || hv > 0.55 ? 0.04 : (hv > 0.2 ? 0.88 : 0.97);
                        if (y % rh === 0 || (x + (by & 1)) % 6 === 0) g = 0.97;
                    }
                    if (fr < 0.03) g = 0.97;

                    // random grain on everything except the light lines, which stay crisp
                    if (g < 0.9) g += (Math.random() - 0.5) * grain;

                    g = g < 0 ? 0 : g > 1 ? 1 : g;
                    live[y * W + x] = (g * 255) | 0;
                }
            }
        }

        // the noise inside the letters travels by exactly as much as the pointer moved
        function trackPointer(x, y) {
            if (lastX !== null) {
                const k = (INVERT ? -1 : 1) * FOLLOW / cell;
                ox += (x - lastX) * k;
                oy += (y - lastY) * k;
            }
            lastX = x; lastY = y;
            handleMove();
        }

        function forgetPointer() { lastX = lastY = null; }

        function handleMove() {
            // capture a new frozen frame only when the letters are fully gone,
            // so moving again mid-fade doesn't make the image jump
            if (!moving && reveal < 0.01) frozen.set(live);
            moving = true;
            clearTimeout(stopTimer);
            stopTimer = setTimeout(() => { moving = false; }, STOP_DELAY);
        }

        function drawFrame(now) {
            requestAnimationFrame(drawFrame);
            const dt = Math.min(100, now - lastT);
            lastT = now;
            if (!ready || isPaused()) { lastTex = now; return; }

            reveal += moving ? dt / FADE_IN : -dt / FADE_OUT;
            reveal = Math.min(1, Math.max(0, reveal));
            const r = reveal * reveal * (3 - 2 * reveal); // smoothstep easing

            if (now - lastTex >= TEXTURE_MS) {
                t += Math.min((now - lastTex) / 1000, 0.1) * (reduce ? 0.15 : 1);
                lastTex = now;
                drawTexture();
            }

            // grains inside the letters switch to the travelling frozen texture one by one as r rises
            const ix = Math.floor(ox), iy = Math.floor(oy);
            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const i = y * W + x;
                    let v = live[i];
                    if (r > 0 && mask[i] && r > thresh[i]) {
                        const sx = (((x - ix) % W) + W) % W, sy = (((y - iy) % H) + H) % H;
                        v = frozen[sy * W + sx];
                    }
                    px[i] = GRAY[v];
                }
            }
            ctx.putImageData(img, 0, 0);
        }

        // rebuild whenever the animation area changes size (window resize, rotation)
        let resizeTimer;
        new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            if (!ready) init();
            else resizeTimer = setTimeout(init, 150);
        }).observe(cv);

        // only the animation reacts, not the rest of the page
        cv.addEventListener("pointermove", e => trackPointer(e.clientX, e.clientY));
        cv.addEventListener("pointerdown", forgetPointer);
        cv.addEventListener("pointercancel", forgetPointer);
        cv.addEventListener("pointerleave", forgetPointer);

        init();
        // the letter mask needs Inter: rebuild it once the font has loaded
        if (document.fonts && document.fonts.load) {
            document.fonts.load('900 100px "Inter"', WORD).then(buildMask).catch(() => {});
        }
        requestAnimationFrame(drawFrame);
    })();
</script>
```

### Noise: CSS  (`public/styles/animation-css/noise.css`)

```css
/* =====================================
MARK: Noise Animation
Scoped to .noise-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old body styles) ---------- */
.noise-wrapper {
    /* shown until the first frame is drawn */
    --page: #141414;

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--page);
}

.noise-canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
    touch-action: none;   /* finger drags reach the script instead of scrolling */
    cursor: crosshair;
}
```

---

## 17. Object  (slug: `object`)

### Object: HTML + JavaScript  (`src/animations/object.astro`)

```astro
---

---

<div class="object-container" id="object-container">
    <div class="scene">
        <!-- 750px Outer Cube -->
        <div class="cube-4">
            <div class="face front"></div>
            <div class="face back"></div>
            <div class="face right"></div>
            <div class="face left"></div>
            <div class="face top"></div>
            <div class="face bottom"></div>

            <!-- 500px Mid-Outer Cube -->
            <div class="cube-3">
                <div class="face front"></div>
                <div class="face back"></div>
                <div class="face right"></div>
                <div class="face left"></div>
                <div class="face top"></div>
                <div class="face bottom"></div>

                <!-- 300px Mid-Inner Cube -->
                <div class="cube-2">
                    <div class="face front"></div>
                    <div class="face back"></div>
                    <div class="face right"></div>
                    <div class="face left"></div>
                    <div class="face top"></div>
                    <div class="face bottom"></div>

                    <!-- 120px White Inner Cube -->
                    <div class="cube-1">
                        <div class="face front"></div>
                        <div class="face back"></div>
                        <div class="face right"></div>
                        <div class="face left"></div>
                        <div class="face top"></div>
                        <div class="face bottom"></div>

                        <!-- Central Black Text -->
                        <div class="object-core">OBJECT</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Object Animation
    // =====================================
    const container = document.getElementById("object-container");
    const animationButton =
        container?.closest(".animation-section")?.querySelector(".animation-button") ||
        document.querySelector(".animation-button");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (animationButton) {
        if (prefersReducedMotion) {
            animationButton.classList.add("stop-animation");
        } else {
            animationButton.classList.add("play-animation");
        }

        animationButton.addEventListener("click", () => {
            animationButton.classList.toggle("stop-animation");
            animationButton.classList.toggle("play-animation");
        });
    }
</script>
```

### Object: CSS  (`public/styles/animation-css/object.css`)

```css
/* =====================================
MARK: Object Animation
===================================== */

.object-container {
    position: relative;
    width: 100%;
    height: var(--animation-height, 80vh);
    background-color: #000;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (min-width: 1024px) {
    .object-container {
        height: var(--animation-height, 90vh);
    }
}

.object-container .scene {
    position: relative;
    width: 200px;
    height: 200px;
    perspective: 1200px;
}

@media (max-width: 768px) {
    .object-container .scene {
        transform: scale(0.65);
    }
}

@media (max-width: 480px) {
    .object-container .scene {
        transform: scale(0.5);
    }
}

/* Base styles for all cubes */
.object-container [class^="cube-"] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
}

/* Cube sizing & animation timings */
.object-container .cube-4 {
    width: 750px;
    height: 750px;
    animation: trippy-4 20s infinite linear;
}

.object-container .cube-3 {
    width: 500px;
    height: 500px;
    animation: trippy-3 15s infinite linear;
}

.object-container .cube-2 {
    width: 300px;
    height: 300px;
    animation: trippy-2 10s infinite linear;
}

.object-container .cube-1 {
    width: 120px;
    height: 120px;
    animation: trippy-1 6s infinite linear;
}

/* Outer transparent wireframe faces */
.object-container .face {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.85);
    background: transparent;
}

.object-container .cube-4 > .face {
    width: 750px;
    height: 750px;
}

.object-container .cube-3 > .face {
    width: 500px;
    height: 500px;
}

.object-container .cube-2 > .face {
    width: 300px;
    height: 300px;
}

/* Inner solid white cube faces */
.object-container .cube-1 > .face {
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #000000;
}

/* 3D offsets (translateZ = width / 2) */
.object-container .cube-4 > .front {
    transform: translateZ(375px);
}

.object-container .cube-4 > .back {
    transform: rotateY(180deg) translateZ(375px);
}

.object-container .cube-4 > .right {
    transform: rotateY(90deg) translateZ(375px);
}

.object-container .cube-4 > .left {
    transform: rotateY(-90deg) translateZ(375px);
}

.object-container .cube-4 > .top {
    transform: rotateX(90deg) translateZ(375px);
}

.object-container .cube-4 > .bottom {
    transform: rotateX(-90deg) translateZ(375px);
}

.object-container .cube-3 > .front {
    transform: translateZ(250px);
}

.object-container .cube-3 > .back {
    transform: rotateY(180deg) translateZ(250px);
}

.object-container .cube-3 > .right {
    transform: rotateY(90deg) translateZ(250px);
}

.object-container .cube-3 > .left {
    transform: rotateY(-90deg) translateZ(250px);
}

.object-container .cube-3 > .top {
    transform: rotateX(90deg) translateZ(250px);
}

.object-container .cube-3 > .bottom {
    transform: rotateX(-90deg) translateZ(250px);
}

.object-container .cube-2 > .front {
    transform: translateZ(150px);
}

.object-container .cube-2 > .back {
    transform: rotateY(180deg) translateZ(150px);
}

.object-container .cube-2 > .right {
    transform: rotateY(90deg) translateZ(150px);
}

.object-container .cube-2 > .left {
    transform: rotateY(-90deg) translateZ(150px);
}

.object-container .cube-2 > .top {
    transform: rotateX(90deg) translateZ(150px);
}

.object-container .cube-2 > .bottom {
    transform: rotateX(-90deg) translateZ(150px);
}

.object-container .cube-1 > .front {
    transform: translateZ(60px);
}

.object-container .cube-1 > .back {
    transform: rotateY(180deg) translateZ(60px);
}

.object-container .cube-1 > .right {
    transform: rotateY(90deg) translateZ(60px);
}

.object-container .cube-1 > .left {
    transform: rotateY(-90deg) translateZ(60px);
}

.object-container .cube-1 > .top {
    transform: rotateX(90deg) translateZ(60px);
}

.object-container .cube-1 > .bottom {
    transform: rotateX(-90deg) translateZ(60px);
}

/* Keyframe Animations */
@keyframes trippy-4 {
    from {
        transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotateX(360deg) rotateY(720deg) rotateZ(180deg);
    }
}

@keyframes trippy-3 {
    from {
        transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotateX(-720deg) rotateY(-360deg) rotateZ(360deg);
    }
}

@keyframes trippy-2 {
    from {
        transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotateX(360deg) rotateY(-360deg) rotateZ(-360deg);
    }
}

@keyframes trippy-1 {
    from {
        transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotateX(-360deg) rotateY(360deg) rotateZ(720deg);
    }
}

/* Central Black Text inside White Cube */
.object-container .object-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--inter-regular), system-ui, -apple-system, sans-serif;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #000000;
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
    z-index: 10;
}
```

---

