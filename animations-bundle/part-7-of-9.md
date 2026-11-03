<!-- PART 7 OF 9 of the glossary animations code bundle. Contains: Out of Control, Proximity. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

## 18. Out of Control  (slug: `out-of-control`)

### Out of Control: HTML + JavaScript  (`src/animations/out-of-control.astro`)

```astro
---

---

<div class="container">
    <div class="animation-section active anim-out-of-control">
        <canvas id="atomism-canvas"></canvas>
    </div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Out of Control Animation
    // =====================================

    const canvas = document.getElementById("atomism-canvas");
    const ctx = canvas.getContext("2d");
    const container = canvas.closest(".animation-section");

    // Get CSS variables to use in the canvas
    const containerStyles = getComputedStyle(container);
    const bgColor = containerStyles.getPropertyValue("--bg-color").trim();
    const fgColor = containerStyles.getPropertyValue("--fg-color").trim();
    const bgRgb = containerStyles.getPropertyValue("--bg-rgb").trim();
    const fgRgb = containerStyles.getPropertyValue("--fg-rgb").trim();

    // ---------- State ----------
    let width, height;
    let time = 0;
    let mouse = { x: -1000, y: -1000, isDown: false };

    // Word/letter state
    let word = [];          // Target points for the particles
    let wx, wy;             // Rendered positions (reused every frame for performance)
    let step = 8;           // Grid spacing for the word particles
    let mode = "letters";   // 'letters' or 'whitespace'
    let style = "atom";    // 'atom', 'diamond' or 'pixel'
    let progress = 0;       // 0 = chaos, 1 = word fully visible

    // ---------- Helper: get position relative to canvas ----------
    function getCanvasPos(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    // ---------- Initialisation ----------
    function buildWord() {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = width; 
        offCanvas.height = height;
        const offCtx = offCanvas.getContext("2d");

        const lines = ["OUT OF", "CONTROL"];
        const fontFamily = '"Arial Black", Impact, Arial, sans-serif';
        
        // Calculate a responsive font size
        offCtx.font = `900 100px ${fontFamily}`;
        const maxW = Math.max(...lines.map(l => offCtx.measureText(l).width));
        const fontSize = Math.min((width * 0.86 / maxW) * 100, height * 0.36);

        // Draw the text to an offscreen canvas
        offCtx.font = `900 ${fontSize}px ${fontFamily}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillStyle = fgColor;
        lines.forEach((line, index) => {
            offCtx.fillText(line, width / 2, height / 2 + (index - 0.5) * fontSize);
        });

        step = Math.max(6, Math.round(Math.min(width, height) / 110));
        const data = offCtx.getImageData(0, 0, width, height).data;

        word = [];
        for (let y = step / 2; y < height; y += step) {
            for (let x = step / 2; x < width; x += step) {
                // Check the alpha channel to see whether the pixel belongs to the text
                if (data[((y | 0) * width + (x | 0)) * 4 + 3] > 128) {
                    word.push({
                        tx: x, 
                        ty: y,
                        ax: Math.random() - 0.5,
                        ay: Math.random() - 0.5
                    });
                }
            }
        }
        
        wx = new Float32Array(word.length);
        wy = new Float32Array(word.length);
    }

    function resizeCanvas() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        buildWord();
    }

    // ---------- Event listeners (scoped to canvas/container) ----------
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousemove", (e) => {
        const pos = getCanvasPos(e.clientX, e.clientY);
        mouse.x = pos.x; mouse.y = pos.y;
    });
    canvas.addEventListener("mousedown", () => { mouse.isDown = true; });
    canvas.addEventListener("mouseup", () => { mouse.isDown = false; });
    canvas.addEventListener("mouseleave", () => {
        mouse.isDown = false;
        mouse.x = -1000; mouse.y = -1000;
    });

    canvas.addEventListener("touchmove", (e) => {
        const pos = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
        mouse.x = pos.x;
        mouse.y = pos.y;
    });
    canvas.addEventListener("touchstart", (e) => {
        const pos = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
        mouse.x = pos.x;
        mouse.y = pos.y;
        mouse.isDown = true;
    });
    canvas.addEventListener("touchend", () => {
        mouse.isDown = false;
        mouse.x = -1000;
        mouse.y = -1000;
    });

    window.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "w") {
            mode = mode === "letters" ? "whitespace" : "letters";
        }
        if (e.key.toLowerCase() === "s") {
            const stylesList = ["atom", "diamond", "pixel"];
            style = stylesList[(stylesList.indexOf(style) + 1) % stylesList.length];
        }
    });

    // ---------- Render logic ----------
    function drawWord() {
        if (progress < 0.005) return;
        
        const ease = progress * progress * (3 - 2 * progress); // Smooth transition (smoothstep)
        const invEase = 1 - ease;

        // Calculate positions by interpolating from chaos to target (the word)
        for (let i = 0; i < word.length; i++) {
            const w = word[i];
            wx[i] = w.tx + w.ax * invEase * width * 0.9 + (Math.random() - 0.5) * (invEase * 80 + 1.5);
            wy[i] = w.ty + w.ay * invEase * height * 0.9 + (Math.random() - 0.5) * (invEase * 80 + 1.5);
        }

        // Pass 1: dark background masking (creates a halo/hole in the chaos)
        const darkSize = mode === "letters" ? step * 2.4 : step * 1.6;
        ctx.fillStyle = `rgba(${bgRgb}, ${Math.min(1, ease * 1.3)})`;
        for (let i = 0; i < word.length; i++) {
            ctx.fillRect(wx[i] - darkSize / 2, wy[i] - darkSize / 2, darkSize, darkSize);
        }

        // Pass 2: draw the letters (only in letter mode)
        if (mode === "letters") {
            ctx.globalAlpha = ease;
            ctx.fillStyle = fgColor;
            ctx.strokeStyle = fgColor;

            if (style === "atom") {
                // Hollow squares with a core, in an alternating checkerboard pattern
                const s = step * 1.15;
                const n = s * 0.4;
                ctx.lineWidth = Math.max(1, step * 0.14);
                ctx.beginPath();
                for (let i = 0; i < word.length; i++) {
                    ctx.rect(wx[i] - s / 2, wy[i] - s / 2, s, s);
                }
                ctx.stroke();
                
                for (let i = 0; i < word.length; i++) {
                    const w = word[i];
                    if (((w.tx / step | 0) + (w.ty / step | 0)) % 2 === 0) {
                        ctx.fillRect(wx[i] - n / 2, wy[i] - n / 2, n, n);
                    }
                }
            } else if (style === "diamond") {
                // Rotated squares (diamonds)
                const h = step * 0.7;
                ctx.beginPath();
                for (let i = 0; i < word.length; i++) {
                    const x = wx[i], y = wy[i];
                    ctx.moveTo(x, y - h);
                    ctx.lineTo(x + h, y);
                    ctx.lineTo(x, y + h);
                    ctx.lineTo(x - h, y);
                    ctx.closePath();
                }
                ctx.fill();
            } else {
                // Default loose pixel blocks
                const s = step * 0.7;
                for (let i = 0; i < word.length; i++) {
                    ctx.fillRect(wx[i] - s / 2, wy[i] - s / 2, s, s);
                }
            }
            ctx.globalAlpha = 1;
        }
    }

    function draw() {
        // Motion blur background: longer trails while the mouse is pressed
        const fadeAlpha = mouse.isDown ? 0.08 : 0.2;
        ctx.fillStyle = `rgba(${bgRgb}, ${fadeAlpha})`;
        ctx.fillRect(0, 0, width, height);

        const cols = 24;
        const rows = 16;
        const spacingX = width / cols;
        const spacingY = height / rows;

        // Draw the background chaos grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let baseX = spacingX * i + spacingX / 2;
                let baseY = spacingY * j + spacingY / 2;

                let wave = Math.sin(time + (i * 0.3) + (j * 0.3));
                let cosWave = Math.cos(time * 0.5 - (i * 0.2) + (j * 0.2));

                let size = Math.abs(wave) * (spacingX * 0.6);
                let rotation = cosWave * Math.PI;

                let dx = baseX - mouse.x;
                let dy = baseY - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                let renderX = baseX;
                let renderY = baseY;

                if (mouse.isDown) {
                    renderX += (Math.random() - 0.5) * 120;
                    renderY += (Math.random() - 0.5) * 120;
                    rotation += Math.random() * 20;
                    size *= Math.random() * 2;
                } else if (dist < 200) {
                    let force = (200 - dist) / 200;
                    renderX += (dx / dist) * force * 50;
                    renderY += (dy / dist) * force * 50;
                    rotation += force * 5;
                }

                ctx.save();
                ctx.translate(renderX, renderY);
                ctx.rotate(rotation);

                ctx.strokeStyle = `rgba(${fgRgb}, ${mouse.isDown ? 1 : 0.85})`;
                ctx.lineWidth = mouse.isDown ? 3 : 1.5;
                ctx.strokeRect(-size / 2, -size / 2, size, size);

                let innerSize = size * 0.4;
                ctx.fillStyle = (i + j) % 2 === 0 ? `rgba(${fgRgb}, 0.9)` : `rgba(${bgRgb}, 0.9)`;
                ctx.fillRect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);

                ctx.restore();
            }
        }

        // The word forms while clicking and dissolves on release
        progress = Math.max(0, Math.min(1, progress + (mouse.isDown ? 0.05 : -0.08)));
        drawWord();

        time += mouse.isDown ? 0.08 : 0.025;
        requestAnimationFrame(draw);
    }

    // Start
    resizeCanvas();
    draw();
</script>
```

### Out of Control: CSS  (`public/styles/animation-css/out-of-control.css`)

```css
@layer components, utilities;

/* =====================================
MARK: Out of Control Animation
===================================== */
@layer components {

    /* ---------- Layout ---------- */
    .container {
        height: 80vh;
        position: relative;
    }

    .animation-section {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        --animation-height: 80vh;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
    }

    .anim-out-of-control {
        height: 100%;
        background: var(--bg-color);

        /* Base colours */
        --bg-color: #0f0f0f;
        --fg-color: #ffffff;

        /* RGB values for dynamic alpha transparency in the canvas */
        --bg-rgb: 15, 15, 15;
        --fg-rgb: 255, 255, 255;
    }

    @media (min-width: 1024px) {
        .container {
            height: 100vh;
        }

        .animation-section {
            --animation-height: 100vh;
        }
    }

    /* ---------- Canvas ---------- */
    .anim-out-of-control canvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
    }
}
```

---

## 19. Proximity  (slug: `proximity`)

### Proximity: HTML + JavaScript  (`src/animations/proximity.astro`)

```astro
---

---

<div class="proximity-container" id="proximity-container">
    <canvas id="proximity-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Proximity Animation
    // =====================================
    (function () {
        var container = document.getElementById("proximity-container");
        var canvas = document.getElementById("proximity-canvas");
        if (!container || !canvas) return;
        var ctx = canvas.getContext("2d");

        // ---------- Settings you can tweak ----------
        var WORD = "PROXIMITY";
        var CELL_W = 40; // horizontal spacing (px)
        var CELL_H = 46; // vertical spacing (px)
        var FONT_SIZE = 26; // resting letter size (px)
        var WEIGHT = 100; // font weight (100..900)
        var REACH = 230; // pointer influence radius (px)
        var MAX_SCALE = 3.2; // size multiplier right at the pointer
        var SPREAD = 0.9; // how far letters are pushed outward (fraction of cell)
        var TURN = 0; // 0 = no rotation, 1 = letters fully point at the pointer
        var SMOOTH = 0.16; // lower = softer, laggier
        var FONT = "Inter, sans-serif";

        var dpr, w = 0, h = 0, cols = 0, rows = 0, ox = 0, oy = 0, state;
        var pointer = {
            x: 0,
            y: 0,
            tx: 0,
            ty: 0,
            active: false,
            speed: 0,
            lastMove: 0,
        };
        var pulses = [];
        var animId = null;
        var isVisible = true;
        var isRunning = true;

        // Check motion preference and hook up animation button
        var animationButton =
            container.closest(".animation-section")?.querySelector(".animation-button") ||
            document.querySelector(".animation-button");
        var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (animationButton) {
            if (prefersReducedMotion) {
                animationButton.classList.add("stop-animation");
                isRunning = false;
            } else {
                animationButton.classList.add("play-animation");
                isRunning = true;
            }

            animationButton.addEventListener("click", function () {
                animationButton.classList.toggle("stop-animation");
                animationButton.classList.toggle("play-animation");
                isRunning = animationButton.classList.contains("play-animation");
                if (isRunning && isVisible && !animId) {
                    animId = requestAnimationFrame(drawFrame);
                }
            });
        }

        function resizeCanvas() {
            if (!container || !canvas) return;
            var rect = container.getBoundingClientRect();
            w = Math.floor(container.clientWidth || rect.width || window.innerWidth);
            h = Math.floor(container.clientHeight || rect.height || window.innerHeight);
            if (w <= 0 || h <= 0) return;

            var isMobile = w < 768;
            dpr = isMobile
                ? Math.min(window.devicePixelRatio || 1, 1.5)
                : Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            cols = Math.ceil(w / CELL_W) + 1;
            rows = Math.ceil(h / CELL_H) + 1;
            ox = (w - (cols - 1) * CELL_W) / 2;
            oy = (h - (rows - 1) * CELL_H) / 2;
            state = new Float32Array(cols * rows); // smoothed "nearness" per letter
            if (!pointer.lastMove) {
                pointer.x = pointer.tx = w / 2;
                pointer.y = pointer.ty = h / 2;
            }
        }

        var resizeTimer = null;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeCanvas, 100);
        }

        if ("ResizeObserver" in window && container) {
            var ro = new ResizeObserver(handleResize);
            ro.observe(container);
        } else {
            window.addEventListener("resize", handleResize);
        }
        resizeCanvas();

        function setTarget(e) {
            var rect = canvas.getBoundingClientRect();
            pointer.tx = e.clientX - rect.left;
            pointer.ty = e.clientY - rect.top;
            pointer.active = true;
            pointer.lastMove = performance.now();
        }

        canvas.addEventListener("pointermove", setTarget, { passive: true });
        canvas.addEventListener("pointerdown", function (e) {
            setTarget(e);
            var rect = canvas.getBoundingClientRect();
            pulses.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                t: performance.now(),
            });
        }, { passive: true });
        canvas.addEventListener("pointerleave", function () {
            pointer.active = false;
        }, { passive: true });

        // Pause animation when off-screen to preserve battery and performance
        if ("IntersectionObserver" in window && container) {
            var observer = new IntersectionObserver(
                function (entries) {
                    for (var k = 0; k < entries.length; k++) {
                        isVisible = entries[k].isIntersecting;
                        if (isVisible && isRunning && !animId) {
                            animId = requestAnimationFrame(drawFrame);
                        }
                    }
                },
                { threshold: 0.05 }
            );
            observer.observe(container);
        }

        function applyEase(x) {
            return x * x * (3 - 2 * x);
        }
        var TAU = Math.PI * 2;

        function drawFrame(now) {
            if (!isRunning || !isVisible) {
                animId = null;
                return;
            }

            // Idle: wander on a smooth path so it stays alive without input
            if (!pointer.active || now - pointer.lastMove > 3000) {
                var s = now / 1000;
                pointer.tx =
                    w / 2 +
                    Math.sin(s * 0.7) * w * 0.3 +
                    Math.sin(s * 1.9) * w * 0.06;
                pointer.ty =
                    h / 2 +
                    Math.cos(s * 0.5) * h * 0.28 +
                    Math.cos(s * 1.3) * h * 0.06;
            }

            var px = pointer.x,
                py = pointer.y;
            pointer.x += (pointer.tx - pointer.x) * 0.18;
            pointer.y += (pointer.ty - pointer.y) * 0.18;
            var speed = Math.hypot(pointer.x - px, pointer.y - py);
            pointer.speed += (Math.min(speed, 40) - pointer.speed) * 0.1;
            var reach = REACH + pointer.speed * 5; // moving fast widens the field

            pulses = pulses.filter(function (p) {
                return now - p.t < 1400;
            });

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = WEIGHT + " " + FONT_SIZE + "px " + FONT;

            for (var j = 0; j < rows; j++) {
                for (var i = 0; i < cols; i++) {
                    var k = j * cols + i;
                    var cx = ox + i * CELL_W,
                        cy = oy + j * CELL_H;
                    var dx = cx - pointer.x,
                        dy = cy - pointer.y;
                    var d = Math.sqrt(dx * dx + dy * dy) || 0.001;

                    var target = applyEase(Math.max(0, 1 - d / reach));

                    // click / tap shockwaves
                    for (var q = 0; q < pulses.length; q++) {
                        var p = pulses[q];
                        var age = (now - p.t) / 1400;
                        var rd = Math.hypot(cx - p.x, cy - p.y);
                        var band = Math.max(
                            0,
                            1 - Math.abs(rd - age * Math.max(w, h) * 0.7) / 80,
                        );
                        target = Math.min(1, target + band * (1 - age));
                    }

                    state[k] += (target - state[k]) * SMOOTH;
                    var n = state[k];

                    // letters tilt so their tops point at the pointer
                    var ang = Math.atan2(-dy, -dx) + Math.PI / 2;
                    ang = ((((ang + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
                    var rot = ang * n * TURN;

                    var sc = 1 + (MAX_SCALE - 1) * n * n;
                    var push = n * n * SPREAD * CELL_W;
                    var x = cx + (dx / d) * push;
                    var y = cy + (dy / d) * push;

                    var letterWeight = Math.round(WEIGHT + (900 - WEIGHT) * n);
                    ctx.font = letterWeight + " " + FONT_SIZE + "px " + FONT;
                    ctx.globalAlpha = 0.25 + 0.75 * Math.min(1, n * 1.6);
                    ctx.setTransform(
                        dpr * sc * Math.cos(rot),
                        dpr * sc * Math.sin(rot),
                        -dpr * sc * Math.sin(rot),
                        dpr * sc * Math.cos(rot),
                        x * dpr,
                        y * dpr,
                    );
                    ctx.fillText(WORD[(i + j * 3) % WORD.length], 0, 0);
                }
            }
            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(drawFrame);
        }

        // Start once the font is ready (or after a short timeout)
        var started = false;
        function startAnimation() {
            if (!started) {
                started = true;
                resizeCanvas();
                if (isRunning && isVisible && !animId) {
                    animId = requestAnimationFrame(drawFrame);
                }
            }
        }
        setTimeout(startAnimation, 1500);
        if (document.fonts && document.fonts.load) {
            document.fonts.load(WEIGHT + " 20px Inter").then(startAnimation, startAnimation);
        } else {
            startAnimation();
        }
    })();
</script>
```

### Proximity: CSS  (`public/styles/animation-css/proximity.css`)

```css
/* =====================================
MARK: Proximity Animation
===================================== */

.proximity-container {
    position: relative;
    width: 100%;
    height: var(--animation-height, 80vh);
    background-color: #000;
    overflow: hidden;
}

@media (min-width: 1024px) {
    .proximity-container {
        height: var(--animation-height, 90vh);
    }
}

.proximity-container canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    cursor: none;
}
```

---

