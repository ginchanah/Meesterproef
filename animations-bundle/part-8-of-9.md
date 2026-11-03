<!-- PART 8 OF 9 of the glossary animations code bundle. Contains: Recursivity, Reinforcing Feedback, Remote Control. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

## 20. Recursivity  (slug: `recursivity`)

### Recursivity: HTML + JavaScript  (`src/animations/recursivity.astro`)

```astro
---

---

<div class="recursivity-container" id="recursivity-container">
    <canvas id="recursivity-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Recursivity Animation
    // =====================================
    const container = document.getElementById("recursivity-container");
    const cv = document.getElementById("recursivity-canvas");
    if (container && cv) {
        const ctx = cv.getContext("2d");
        const WORD = "recursivity ";
        const FONT = "11px Inter, system-ui, sans-serif";
        const COLOR = "#f2f2f2";
        const spacing = 13;
        let W = 0,
            H = 0,
            dpr = 1,
            cx = 0,
            cy = 0,
            s,
            maxRx = 1,
            rings = [],
            timer = null,
            t0 = 0;
        let atlas = null;
        const seqs = []; // [0] crisp glyphs, [1] glyphs with a baked-in soft glow
        const PAD = 6; // extra sprite margin so the glow isn't clipped
        let animId = null;
        let isVisible = true;
        let isRunning = true;

        // Check motion preference and hook up animation button
        const animationButton =
            container.closest(".animation-section")?.querySelector(".animation-button") ||
            document.querySelector(".animation-button");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function startTimer() {
            clearInterval(timer);
            if (isRunning && isVisible) {
                timer = setInterval(generate, 12000);
            }
        }

        function stopTimer() {
            clearInterval(timer);
        }

        if (animationButton) {
            if (prefersReducedMotion) {
                animationButton.classList.add("stop-animation");
                isRunning = false;
            } else {
                animationButton.classList.add("play-animation");
                isRunning = true;
            }

            animationButton.addEventListener("click", () => {
                animationButton.classList.toggle("stop-animation");
                animationButton.classList.toggle("play-animation");
                isRunning = animationButton.classList.contains("play-animation");
                if (isRunning && isVisible) {
                    startTimer();
                    if (!animId) animId = requestAnimationFrame(runLoop);
                } else {
                    stopTimer();
                }
            });
        }

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        isVisible = entry.isIntersecting;
                        if (isVisible && isRunning) {
                            startTimer();
                            if (!animId) animId = requestAnimationFrame(runLoop);
                        } else {
                            stopTimer();
                        }
                    }
                },
                { threshold: 0.05 }
            );
            observer.observe(container);
        }

        // Bake characters into a single GPU atlas to avoid thousands of texture re-binds per frame
        function buildSprites() {
            const m = document.createElement("canvas").getContext("2d");
            m.font = FONT;
            const charWidths = [...WORD].map((ch) => m.measureText(ch).width + 0.5);

            const rowH = Math.ceil(16 + PAD * 2);
            let totalW = 0;
            for (let i = 0; i < WORD.length; i++) {
                totalW += Math.ceil(charWidths[i]) + 4 + PAD * 2 + 4;
            }

            atlas = document.createElement("canvas");
            atlas.width = Math.ceil(totalW * dpr);
            atlas.height = Math.ceil(rowH * 2 * dpr);
            const g = atlas.getContext("2d");
            g.scale(dpr, dpr);
            g.font = FONT;

            [false, true].forEach((glow, si) => {
                const pad = glow ? PAD : 0;
                const yOffset = si * rowH;
                let currentX = 0;

                seqs[si] = [...WORD].map((ch, idx) => {
                    const a = charWidths[idx];
                    const w = Math.ceil(a) + 4 + pad * 2;
                    const h = 16 + pad * 2;

                    g.save();
                    g.fillStyle = COLOR;
                    if (glow) {
                        g.shadowColor = "rgba(255,255,255,0.9)";
                        g.shadowBlur = 5;
                    }
                    g.fillText(ch, currentX + 2 + pad, yOffset + 12 + pad);
                    g.restore();

                    const info = {
                        sx: Math.round(currentX * dpr),
                        sy: Math.round(yOffset * dpr),
                        sw: Math.round(w * dpr),
                        sh: Math.round(h * dpr),
                        w,
                        h,
                        a,
                        pad,
                        blank: ch === " ",
                    };
                    currentX += w + 4;
                    return info;
                });
            });
        }

        function resizeCanvas() {
            if (!container || !cv) return false;
            const rect = container.getBoundingClientRect();
            W = Math.floor(container.clientWidth || rect.width || window.innerWidth);
            H = Math.floor(container.clientHeight || rect.height || window.innerHeight);
            if (W <= 0 || H <= 0) return false;

            const isMobile = W < 768;
            dpr = isMobile
                ? Math.min(window.devicePixelRatio || 1, 1.25)
                : Math.min(window.devicePixelRatio || 1, 1.75);
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            cx = W / 2;
            cy = H / 2;
            buildSprites();
            return true;
        }

        // ---------- hover ripples ----------
        const RIPPLE_LIFE = 2.0,
            RIPPLE_SPEED = 170,
            MAX_RIPPLES = 5;
        const ripples = [];
        let act = [],
            ox = 0,
            oy = 0;

        function prepareRipples(now) {
            act = [];
            for (let i = ripples.length - 1; i >= 0; i--) {
                const age = (now - ripples[i].born) / 1000;
                if (age > RIPPLE_LIFE) {
                    ripples.splice(i, 1);
                    continue;
                }
                const k = 1 - age / RIPPLE_LIFE;
                act.push({
                    x: ripples[i].x,
                    y: ripples[i].y,
                    front: age * RIPPLE_SPEED,
                    w: 34 + age * 16,
                    fade: k * k * Math.min(1, age * 6),
                    amp: 6,
                });
            }
        }

        function getRippleAt(x, y) {
            ox = oy = 0;
            for (let i = 0; i < act.length; i++) {
                const r = act[i],
                    dx = x - r.x,
                    dy = y - r.y,
                    d2 = dx * dx + dy * dy;
                const lo = r.front - r.w * 3,
                    hi = r.front + r.w * 3;
                if (d2 > hi * hi || (lo > 0 && d2 < lo * lo)) continue;
                const d = Math.sqrt(d2) || 1,
                    u = (d - r.front) / r.w;
                const env = Math.exp(-u * u * 0.5) * r.fade;
                const disp = r.amp * env * Math.cos(u * 2.2);
                ox += (dx / d) * disp;
                oy += (dy / d) * disp;
            }
        }

        function getRippleGlowAt(x, y) {
            let ob = 0;
            for (let i = 0; i < act.length; i++) {
                const r = act[i],
                    dx = x - r.x,
                    dy = y - r.y,
                    d2 = dx * dx + dy * dy;
                const lo = r.front - r.w * 3,
                    hi = r.front + r.w * 3;
                if (d2 > hi * hi || (lo > 0 && d2 < lo * lo)) continue;
                const d = Math.sqrt(d2) || 1,
                    u = (d - r.front) / r.w;
                ob += Math.exp(-u * u * 0.5) * r.fade;
            }
            return ob;
        }

        function draw(t) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, cv.width, cv.height);

            const p1 = s.p1 + t * 0.35,
                p2 = s.p2 + t * 0.28,
                p3 = s.p3 - t * 0.31,
                p4 = s.p4 + t * 0.22;
            const p5 = s.p5 + t * 0.9,
                p6 = s.p6 - t * 0.7,
                p7 = s.p7 + t * 0.8,
                p8 = s.p8 - t * 1.0;
            const f1 = s.f1,
                f2 = s.f2,
                a1 = s.amp1,
                a2 = s.amp2;

            prepareRipples(performance.now());
            const hasRipples = act.length > 0;

            const farX = Math.max(cx, W - cx) + 130,
                farY = Math.max(cy, H - cy) + 130;
            let currentAlpha = -1;

            for (let rIdx = 0; rIdx < rings.length; rIdx++) {
                const ring = rings[rIdx];
                if ((farX / ring.rx) ** 2 + (farY / ring.ry) ** 2 < 1) continue;

                const { n, cos, sin, xs, ys, lens } = ring;

                let d =
                    0.5 +
                    0.35 * Math.sin(ring.i * 0.4 - t * 1.1) +
                    0.15 * Math.sin(ring.i * 0.13 + t * 0.5);
                d = d < 0 ? 0 : d > 1 ? 1 : d;
                const ringAlpha = 0.16 + 0.84 * Math.pow(d, 1.6);
                const gs = (0.78 + 0.5 * d) * (1 - (0.22 * ring.rx) / maxRx);
                const seq = d > 0.78 ? seqs[1] : seqs[0];
                const wW = ring.wordW * gs;
                const w = Math.sin(ring.i * 0.22 - t * 1.6) * 4;
                const rx = ring.rx + w,
                    ry = ring.ry + w * 1.35;

                for (let j = 0; j < n; j++) {
                    const bx = cx + cos[j] * rx,
                        by = cy + sin[j] * ry;
                    xs[j] =
                        bx +
                        Math.sin(bx * f1 + p1) * Math.cos(by * f1 + p2) * a1 +
                        Math.sin(bx * f2 + p5) * Math.cos(by * f2 + p6) * a2;
                    ys[j] =
                        by +
                        Math.cos(bx * f1 + p3) * Math.sin(by * f1 + p4) * a1 +
                        Math.cos(bx * f2 + p7) * Math.sin(by * f2 + p8) * a2;
                    if (hasRipples) {
                        getRippleAt(xs[j], ys[j]);
                        xs[j] += ox;
                        ys[j] += oy;
                    }
                }
                xs[n] = xs[0];
                ys[n] = ys[0];

                let L = 0;
                for (let j = 0; j < n; j++) {
                    const l = Math.hypot(xs[j + 1] - xs[j], ys[j + 1] - ys[j]);
                    lens[j] = l;
                    L += l;
                }

                const scale = L / (Math.max(1, Math.round(L / wW)) * wW);
                let k = 0,
                    sp = seq[0],
                    ad = sp.a * gs * scale,
                    pos = -ring.phase * wW * scale,
                    mid = pos + ad / 2,
                    L0 = 0;

                for (let j = 0; j < n; j++) {
                    const x0 = xs[j],
                        y0 = ys[j],
                        x1 = xs[j + 1],
                        y1 = ys[j + 1];

                    const len = lens[j];
                    if (len < 1e-6) continue;
                    const L1 = L0 + len;

                    // Fast reject if the whole segment is off-screen
                    if (
                        (x0 < -35 && x1 < -35) ||
                        (x0 > W + 35 && x1 > W + 35) ||
                        (y0 < -35 && y1 < -35) ||
                        (y0 > H + 35 && y1 > H + 35)
                    ) {
                        while (mid <= L1) {
                            pos += ad;
                            k++;
                            sp = seq[k % seq.length];
                            ad = sp.a * gs * scale;
                            mid = pos + ad / 2;
                        }
                        L0 = L1;
                        continue;
                    }

                    const ca = (x1 - x0) / len,
                        sa = (y1 - y0) / len;

                    while (mid <= L1) {
                        const f = mid - L0,
                            mx = x0 + ca * f,
                            my = y0 + sa * f;

                        if (
                            mid >= 0 &&
                            !sp.blank &&
                            mx > -20 &&
                            mx < W + 20 &&
                            my > -20 &&
                            my < H + 20
                        ) {
                            const h = (sp.a * gs) / 2;
                            const vx = (mx - W / 2) / (W / 2),
                                vy = (my - H / 2) / (H / 2);
                            const v =
                                1 - 0.55 * Math.min(1, (vx * vx + vy * vy) / 1.6);
                            let alpha = ringAlpha * v;

                            if (hasRipples) {
                                const ob = getRippleGlowAt(mx, my);
                                alpha = Math.min(1, alpha + ob * 0.22);
                            }

                            const roundedAlpha = Math.round(alpha * 100) / 100;
                            if (roundedAlpha !== currentAlpha) {
                                ctx.globalAlpha = currentAlpha = roundedAlpha;
                            }

                            const gx = ca * dpr * gs,
                                gy = sa * dpr * gs;
                            ctx.setTransform(
                                gx,
                                gy,
                                -gy,
                                gx,
                                (mx - ca * h) * dpr,
                                (my - sa * h) * dpr,
                            );
                            ctx.drawImage(
                                atlas,
                                sp.sx,
                                sp.sy,
                                sp.sw,
                                sp.sh,
                                -2 - sp.pad,
                                -12 - sp.pad,
                                sp.w,
                                sp.h,
                            );
                        }
                        pos += ad;
                        k++;
                        sp = seq[k % seq.length];
                        ad = sp.a * gs * scale;
                        mid = pos + ad / 2;
                    }
                    L0 = L1;
                }
            }
        }

        function generate() {
            cv.classList.add("restart");
            void cv.getBoundingClientRect();
            cv.classList.remove("restart");
            rings = [];
            const r = () => Math.random() * Math.PI * 2;
            s = {
                p1: r(),
                p2: r(),
                p3: r(),
                p4: r(),
                p5: r(),
                p6: r(),
                p7: r(),
                p8: r(),
                f1: 0.003 + Math.random() * 0.003,
                amp1: 45 + Math.random() * 30,
                f2: 0.01 + Math.random() * 0.01,
                amp2: 10 + Math.random() * 15,
            };

            // Full diagonal reference preserved so depth scale (gs) is pixel-identical
            maxRx = Math.hypot(W, H) * 1.1;

            // Generate rings to cover visible canvas from center past corners
            const cornerDist = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy));
            const maxRadius = cornerDist + spacing * 4;
            const numRings = Math.max(8, Math.floor(maxRadius / spacing));

            for (let i = 1; i <= numRings; i++) {
                const rx = i * spacing,
                    ry = i * spacing * 1.35;
                // Cap vertex density to prevent outer rings from lagging while keeping curves smooth
                const n = Math.min(180, Math.max(60, i * 4));
                const cos = new Float32Array(n),
                    sin = new Float32Array(n);
                for (let j = 0; j < n; j++) {
                    const a = (j / n) * Math.PI * 2;
                    cos[j] = Math.cos(a);
                    sin[j] = Math.sin(a);
                }
                rings.push({
                    i,
                    rx,
                    ry,
                    n,
                    cos,
                    sin,
                    xs: new Float32Array(n + 1),
                    ys: new Float32Array(n + 1),
                    lens: new Float32Array(n),
                    phase: Math.random(),
                    wordW: seqs[0].reduce((t, g) => t + g.a, 0),
                });
            }
            t0 = performance.now();
            draw(0);
        }

        function runLoop(now) {
            if (!isRunning || !isVisible) {
                animId = null;
                return;
            }
            animId = requestAnimationFrame(runLoop);
            draw((now - t0) / 1000);
        }

        function restart() {
            generate();
            startTimer();
        }

        let initialized = false;
        function init() {
            if (initialized) return;
            initialized = true;
            if (!resizeCanvas()) return;
            restart();
            if (isRunning && isVisible && !animId) {
                animId = requestAnimationFrame(runLoop);
            }
        }

        Promise.race([
            document.fonts.load(FONT),
            new Promise((r) => setTimeout(r, 1500)),
        ]).then(init, init);

        let last = null;
        cv.addEventListener(
            "pointermove",
            (e) => {
                const rect = cv.getBoundingClientRect();
                const px = e.clientX - rect.left;
                const py = e.clientY - rect.top;
                const now = performance.now();
                if (
                    last &&
                    Math.hypot(px - last.x, py - last.y) < 60 &&
                    now - last.t < 180
                )
                    return;
                last = { x: px, y: py, t: now };
                ripples.push({ x: px, y: py, born: now });
                if (ripples.length > MAX_RIPPLES) ripples.shift();
            },
            { passive: true }
        );

        cv.addEventListener(
            "pointerdown",
            (e) => {
                const rect = cv.getBoundingClientRect();
                const px = e.clientX - rect.left;
                const py = e.clientY - rect.top;
                ripples.push({ x: px, y: py, born: performance.now() });
                if (ripples.length > MAX_RIPPLES) ripples.shift();
            },
            { passive: true }
        );

        let resizeTimer = null;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (resizeCanvas()) {
                    restart();
                }
            }, 120);
        }

        if ("ResizeObserver" in window && container) {
            const ro = new ResizeObserver(handleResize);
            ro.observe(container);
        } else {
            window.addEventListener("resize", handleResize);
        }
    }
</script>
```

### Recursivity: CSS  (`public/styles/animation-css/recursivity.css`)

```css
/* =====================================
MARK: Recursivity Animation
===================================== */

.recursivity-container {
    position: relative;
    width: 100%;
    height: var(--animation-height, 80vh);
    background-color: #000;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
}

@media (min-width: 1024px) {
    .recursivity-container {
        height: var(--animation-height, 90vh);
    }
}

.recursivity-container canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    animation: fadeIn .9s ease-out both;
}

.recursivity-container canvas.restart {
    animation: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
```

---

## 21. Reinforcing Feedback  (slug: `reinforcing-feedback`)

### Reinforcing Feedback: HTML + JavaScript  (`src/animations/reinforcing-feedback.astro`)

```astro
---

---

<div class="reinforcing-feedback-wrapper" id="animation-wrapper">
    <div class="word" id="word">
        <p class="span-split">reinforcing feedback</p>
    </div>
</div>

<script>
    // ====================================
    // MARK: TUNING VARIABLES
    // ====================================

    // Mouse interaction
    const mouseStopDelay = 60;
    const interactionRadius = 200;
    const influencePower = 4;
    const energyGain = 1.4;

    // Neighbour spread
    const neighbourSpread = 0.5;
    const neighbourGain = 0.1;

    // Weight
    const baseWeight = 100;
    const maxWeight = 900;
    const weightMultiplier = 25;
    const weightStep = 10;

    // Scaling
    const scaleStartEnergy = 20;
    const scaleDivisor = 15;
    const scaleCurve = 1.4;

    const maxScaleX = 5;
    const maxScaleY = 5;

    // Vertical takeover
    const stretchStartScale = 3;
    const stretchRange = 0.5;
    const stretchMultiplier = 25;
    const stretchBaseScale = 4;

    // Collapse
    const collapseThreshold = 60;
    const resetDelay = 600;

    // Colors
    const lightBackground = "var(--color-white)";
    const lightText = "var(--color-black)";
    const darkBackground = "var(--color-black)";
    const darkText = "var(--color-white)";

    // ====================================

    const letters = [...document.querySelectorAll(".word span")];

    const wrapper = document.getElementById("animation-wrapper");

    // Start black background with white text

    

    const state = letters.map(() => ({
        energy: 0,
        hoverInfluence: 0,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    let isMoving = false;
    let moveTimeout;

    let resetting = false;

    let darkMode = true;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        isMoving = true;

        clearTimeout(moveTimeout);

        moveTimeout = setTimeout(() => {
            isMoving = false;
        }, mouseStopDelay);
    });

    function resetSystem() {
        state.forEach((s) => {
            s.energy = 0;
            s.hoverInfluence = 0;
        });
    }

    function animate() {
        state.forEach((s) => {
            s.hoverInfluence = 0;
        });

        // =====================================
        // MARK: MOUSE INFLUENCE
        // =====================================

        letters.forEach((letter, i) => {
            const rect = letter.getBoundingClientRect();

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = mouseX - cx;
            const dy = mouseY - cy;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius) {
                const influence = Math.pow(1 - dist / interactionRadius, influencePower);

                state[i].energy += influence * energyGain;

                state[i].hoverInfluence = influence;
            }
        });

        // =====================================
        // MARK: NEIGHBOUR SPREAD
        // =====================================

        if (isMoving) {
            state.forEach((s, i) => {
                const spread = s.hoverInfluence * neighbourSpread;

                if (state[i - 1]) {
                    state[i - 1].energy += spread * neighbourGain;
                }

                if (state[i + 1]) {
                    state[i + 1].energy += spread * neighbourGain;
                }
            });
        }

        // =====================================
        // MARK: AVERAGE ENERGY
        // =====================================

        let totalEnergy = 0;

        state.forEach((s) => {
            totalEnergy += s.energy;
        });

        const averageEnergy = totalEnergy / state.length;

        // =====================================
        // MARK: LETTERS
        // =====================================

        state.forEach((s, i) => {
            const weight = Math.min(maxWeight, baseWeight + s.energy * weightMultiplier);

            let scaleX = 1;
            let scaleY = 1;

            // ---------- Phase 1: uniform growth ----------

            if (s.energy > scaleStartEnergy) {
                const growth = 1 + Math.pow((s.energy - scaleStartEnergy) / scaleDivisor, scaleCurve);

                scaleX = growth;
                scaleY = growth;
            }

            scaleX = Math.min(scaleX, maxScaleX);
            scaleY = Math.min(scaleY, maxScaleY);

            // ---------- Phase 2: vertical takeover ----------

            if (scaleY > stretchStartScale) {
                const stretchProgress =
                    (scaleY - stretchStartScale) / stretchRange;

                scaleY = stretchBaseScale + stretchProgress * stretchMultiplier;
            }

            letters[i].style.fontVariationSettings = `"wght" ${
                Math.round(weight / weightStep) * weightStep
            }`;

            letters[i].style.transform = `scale(${scaleX},${scaleY})`;
        });

        // =====================================
        // MARK: COLLAPSE EVENT
        // =====================================

        if (averageEnergy > collapseThreshold && !resetting) {
            resetting = true;

            darkMode = !darkMode;

            if (darkMode) {
                wrapper.style.backgroundColor = darkBackground;

                wrapper.style.color = darkText;
            } else {
                wrapper.style.backgroundColor = lightBackground;

                wrapper.style.color = lightText;
            }

            setTimeout(() => {
                resetSystem();

                resetting = false;
            }, resetDelay);
        }

        requestAnimationFrame(animate);
    }

    animate();
</script>
```

### Reinforcing Feedback: CSS  (`public/styles/animation-css/reinforcing-feedback.css`)

```css
/* =====================================
MARK: Reinforcing Feedback Animation
===================================== */

:root {
    --color-white: #ffffff;
    --color-black: #000000;
}

.reinforcing-feedback-wrapper *{
    margin:0;
    padding:0;
    box-sizing:border-box;

    color: inherit;
}

/* .animation-section in front keeps this rule stronger than the pause rule in detail-page.css (like the old id selector) */
.animation-section .reinforcing-feedback-wrapper{
    width:100vw;
    height:80vh;
    display:flex;
    justify-content:center;
    align-items:center;

    background:var(--color-black);
    color: var(--color-white);

    overflow:hidden;

    font-family: var(--inter-regular);

    transition:
        background-color 1.2s ease,
        color 1.2s ease;

    & span {
        color: inherit;
    }

}

.reinforcing-feedback-wrapper .word{
    display:flex;
    align-items:center;
    cursor:default;
}

.reinforcing-feedback-wrapper .word span{

    font-size:8vw;

    font-variation-settings:"wght" 100;

    display:inline-block;

    transform-origin:center center;

    transition:
        font-variation-settings .15s linear,
        transform .15s linear;
}

.reinforcing-feedback-wrapper .space{
    width:.4em;
}
```

---

## 22. Remote Control  (slug: `remote-control`)

### Remote Control: HTML + JavaScript  (`src/animations/remote-control.astro`)

```astro
---

---

<div class="remote-control-wrapper" id="remote-control-stage">
    <svg>
        <g>
            <path class="rope"/><path class="rope"/><path class="rope"/><path class="rope"/><path class="rope"/>
            <path class="rope"/><path class="rope"/><path class="rope"/><path class="rope"/><path class="rope"/>
            <path class="rope"/><path class="rope"/><path class="rope"/>
        </g>
        <!-- one letter per balloon, in order -->
        <g>
            <text class="letter">R</text><text class="letter">E</text><text class="letter">M</text>
            <text class="letter">O</text><text class="letter">T</text><text class="letter">E</text>
            <text class="letter">C</text><text class="letter">O</text><text class="letter">N</text>
            <text class="letter">T</text><text class="letter">R</text><text class="letter">O</text>
            <text class="letter">L</text>
        </g>
    </svg>
</div>

<script>
    // =====================================
    // MARK: Script remote-control
    // =====================================
    // @ts-nocheck
    (() => {
        // HTML owns the letters and the structure, CSS owns colours and line widths.
        // This script only runs the rope physics and writes each rope's path and each letter's position.
        const stage = document.getElementById("remote-control-stage");
        const section = stage.closest(".animation-section");
        const ropes = Array.from(stage.querySelectorAll(".rope"));
        const letters = Array.from(stage.querySelectorAll(".letter"));
        const N = Math.min(ropes.length, letters.length);

        let W = 1, H = 1;
        function fitStage() { W = Math.max(1, stage.clientWidth); H = Math.max(1, stage.clientHeight); }
        new ResizeObserver(fitStage).observe(stage);
        fitStage();

        function getPointerPosition(e) { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }

        const NS = 48;   // points per rope
        const RR = 16;   // balloon radius used for collisions
        const LF = Array.from({ length: N }, (_, i) => .97 - i * (.76 / Math.max(1, N - 1)) - (i >= (N - 1) / 2 ? .04 : 0));
        let balloons = null, base = { x: 0, y: 0, vx: 0, sx: 0 }, tgt = null, mouseX = null, t = 0, acc = 0, lastMX = null, lastMove = 0, iw = 0;

        stage.addEventListener("pointermove", e => { mouseX = getPointerPosition(e).x; });
        stage.addEventListener("pointerdown", e => { mouseX = getPointerPosition(e).x; });

        function init() {
            base.x = W / 2; base.sx = base.x; base.y = H;
            balloons = LF.map((lf, i) => {
                const L = lf * (H - 50), p = [];
                for (let k = 0; k <= NS; k++) {
                    const x = base.x + (i - (N - 1) / 2) * 5, y = base.y - k / NS * L;
                    p.push({ x, y, px: x, py: y, ox: x, oy: y });
                }
                return { lf, r: RR, ph: i * 1.3, p, rope: ropes[i], letter: letters[i] };
            });
        }

        function step() {
            const dt = 1 / 120, ax = base.sx, ay = base.y, g = 800 / NS * dt * dt, buoy = 5000 * dt * dt;
            for (const b of balloons) {
                const p = b.p;
                for (let i = 0; i <= NS; i++) { p[i].ox = p[i].x; p[i].oy = p[i].y; }
                p[0].x = ax; p[0].y = ay; p[0].px = ax; p[0].py = ay;
                for (let i = 1; i <= NS; i++) {
                    const q = p[i], vx = (q.x - q.px) * .9874, vy = (q.y - q.py) * .9874;
                    q.px = q.x; q.py = q.y;
                    q.x += vx; q.y += vy + (i === NS ? -buoy : g);
                    if (i === NS) q.x += Math.sin(t * 1.1 + b.ph) * 0.025;
                }
            }
            for (let it = 0; it < 30; it++) {
                for (const b of balloons) {
                    const seg = b.lf * (H - 50) / NS, p = b.p;
                    for (let i = 0; i < NS; i++) {
                        const a = p[i], c = p[i + 1], dx = c.x - a.x, dy = c.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1e-6, diff = (d - seg) / d;
                        if (i === 0) { c.x -= dx * diff; c.y -= dy * diff; }
                        else { const h = .5 * diff; a.x += dx * h; a.y += dy * h; c.x -= dx * h; c.y -= dy * h; }
                    }
                    for (let i = NS - 1; i >= 0; i--) {
                        const a = p[i], c = p[i + 1], dx = c.x - a.x, dy = c.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1e-6, diff = (d - seg) / d;
                        if (i === 0) { c.x -= dx * diff; c.y -= dy * diff; }
                        else { const h = .5 * diff; a.x += dx * h; a.y += dy * h; c.x -= dx * h; c.y -= dy * h; }
                    }
                }
                for (let i = 0; i < balloons.length; i++) for (let j = i + 1; j < balloons.length; j++) {
                    const a = balloons[i].p[NS], c = balloons[j].p[NS], mn = balloons[i].r + balloons[j].r + 8;
                    const dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy) || 1e-6;
                    if (d < mn) { const k = (mn - d) / d * .5; a.x -= dx * k; a.y -= dy * k; c.x += dx * k; c.y += dy * k; }
                }
            }
            for (const b of balloons) { const q = b.p[NS]; q.x = Math.max(b.r, Math.min(W - b.r, q.x)); q.y = Math.max(b.r + 4, q.y); }
        }

        const formatNumber = v => v.toFixed(1);

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        let last = performance.now();
        function drawFrame(ts) {
            const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
            if (isPaused()) { requestAnimationFrame(drawFrame); return; }
            t += dt;
            if (!balloons && W > 50) init();
            if (balloons) {
                if (mouseX !== null && mouseX !== lastMX) { lastMX = mouseX; lastMove = t; }
                const idleW = mouseX === null ? 1 : Math.min(1, Math.max(0, (t - lastMove - 10) / .8)),
                    wd = W / 2 + (Math.sin(t * 0.8) * .85 + Math.sin(t * 1.9 + 1) * .15) * W * 0.46;
                iw += (idleW - iw) * (1 - Math.exp(-dt * 3));
                const tx = (mouseX === null ? wd : mouseX * (1 - iw) + wd * iw);
                base.y = H;
                if (tgt === null) tgt = tx;
                tgt += (tx - tgt) * (1 - Math.exp(-dt * 8));
                base.vx += ((tgt - base.x) * 16 - base.vx * 6.5) * dt;
                base.x += base.vx * dt;
                if (base.x < 24) { base.x = 24; base.vx = 0; } else if (base.x > W - 24) { base.x = W - 24; base.vx = 0; }

                acc += dt;
                const ns = Math.min(8, Math.floor(acc * 120)), from = base.sx;
                for (let m = 1; m <= ns; m++) { base.sx = from + (base.x - from) * (m / ns); step(); }
                acc -= ns / 120;
                if (acc > 1 / 120) acc = 0;
                const al = Math.min(1, acc * 120), interpolatePoint = (q, k) => q["o" + k] + (q[k] - q["o" + k]) * al;

                // ropes: a smooth curve through the points; letters: at the free end
                for (const b of balloons) {
                    const p = b.p;
                    let d = "M" + formatNumber(interpolatePoint(p[0], "x")) + " " + formatNumber(interpolatePoint(p[0], "y"));
                    for (let i = 1; i < NS; i++) {
                        const x1 = interpolatePoint(p[i], "x"), y1 = interpolatePoint(p[i], "y"), x2 = interpolatePoint(p[i + 1], "x"), y2 = interpolatePoint(p[i + 1], "y");
                        d += "Q" + formatNumber(x1) + " " + formatNumber(y1) + " " + formatNumber((x1 + x2) / 2) + " " + formatNumber((y1 + y2) / 2);
                    }
                    const ex = interpolatePoint(p[NS], "x"), ey = interpolatePoint(p[NS], "y");
                    d += "L" + formatNumber(ex) + " " + formatNumber(ey);
                    b.rope.setAttribute("d", d);
                    b.letter.setAttribute("x", formatNumber(ex));
                    b.letter.setAttribute("y", formatNumber(ey));
                }
            }
            requestAnimationFrame(drawFrame);
        }
        requestAnimationFrame(drawFrame);
    })();
</script>
```

### Remote Control: CSS  (`public/styles/animation-css/remote-control.css`)

```css
/* =====================================
MARK: Remote Control Animation
Scoped to .remote-control-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old body styles) ---------- */
.remote-control-wrapper {
    /* colours: background and ropes/letters */
    --bg: var(--color-background, #000000);
    --ink: var(--color-text, #ffffff);

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    touch-action: none;
    cursor: crosshair;

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    .rope {
        fill: none;
        stroke: var(--ink);
        stroke-width: 1.2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    /* the letter gets a halo in the background colour, so ropes never run through it */
    .letter {
        fill: var(--ink);
        stroke: var(--bg);
        stroke-width: 7;
        stroke-linejoin: round;
        paint-order: stroke;
        font: bold 30px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        text-anchor: middle;
        dominant-baseline: central;
        user-select: none;
    }
}
```

---

