<!-- PART 1 OF 9 of the glossary animations code bundle. Contains: Adaptation, Affect. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

# Glossary animations: complete code bundle

This file contains every typographic animation of the "(Inter)facing the Hybrid City" glossary website (an Astro project).

## How the files are linked

- Every animation is identified by its **slug** (for example `noise`).
- `src/animations/<slug>.astro` holds the animation's HTML and its inline `<script>`.
- `public/styles/animation-css/<slug>.css` holds its CSS. The detail page loads it automatically as `/styles/animation-css/<slug>.css`.
- On the detail page each animation is placed inside this wrapper (from `src/components/Header.astro`):

```html
<div class="animation-section">
    <div class="hidden-section" aria-hidden="true">
        <button class="animation-button"><span></span></button>
        <!-- the animation component (<slug>.astro) is placed here -->
    </div>
</div>
```

- Scripts pause when the play/stop button has the class `.stop-animation`, and use `document.hidden` as well.
- Only one animation is on a page at a time, so ids like `#c` are reused across animations.
- `.astro` files: the part between the `---` fences at the top is server-side frontmatter. Most are empty. `intra-action.astro` uses it to generate repeated markup with `{...map()}`.

## Shared setup the animations depend on

Fonts (self-hosted, from `public/styles/general.css`; files live in `/assets/fonts/`):

```css
@font-face {
    font-family: "Inter";
    src: url(/assets/fonts/Inter/Inter-VariableFont_opsz\,wght.ttf);
    font-weight: 100 900;
}
@font-face {
    font-family: "Inter Italic";
    src: url(/assets/fonts/Inter/Inter-Italic-VariableFont_opsz\,wght.ttf);
    font-weight: 100 900;
}
@font-face {
    font-family: "Courier Prime Regular";
    src: url(/assets/fonts/Courier_Prime/CourierPrime-Regular.ttf);
}
@font-face {
    font-family: "Courier Prime Italic";
    src: url(/assets/fonts/Courier_Prime/CourierPrime-Italic.ttf);
}
@font-face {
    font-family: "Courier Prime Bold";
    src: url(/assets/fonts/Courier_Prime/CourierPrime-Bold.ttf);
}
@font-face {
    font-family: "Courier Prime Bold Italic";
    src: url(/assets/fonts/Courier_Prime/CourierPrime-BoldItalic.ttf);
}
```

Global variables (from `public/styles/general.css`). In both light and dark mode the site uses `--color-text: var(--white)` and `--color-background: var(--black)`, plus the global rule `* { color: var(--color-text); }`:

```css
:root {
    /* ---------- Fonts ---------- */
    --inter-regular: "Inter", Helvetica;
    --inter-italic: "Inter Italic", Helvetica;

    --courier-prime-regular: "Courier Prime Regular", Courier, Monaco;
    --courier-prime-italic: "Courier Prime Italic", Courier, Monaco;
    --courier-prime-bold: "Courier Prime Bold", Courier, Monaco;
    --courier-prime-bold-italic: "Courier Prime Bold Italic", Courier, Monaco;


    /* ---------- Colors ---------- */
    --black: #000;
    --white: #ffffff;
    --grey: grey;

    --color-text: var(--black);
    --color-background: var(--white);
    --color-border: var(--black);



    /* ---------- Text ---------- */
    /* Title/H1 */
    --font-title-size: 5rem;
    --font-title-size-index: clamp(3.5rem, 2rem + 5vw, 5rem);

    --font-title-family: var(--inter-regular);
    --font-title-weight: bold;
    --font-title-transform: uppercase;

    /* Heading 2 */
    --font-heading-2-size: 3.5rem;
    --font-heading-2-family: var(--inter-regular);
    --font-heading-2-weight: bold;

    /* Heading 2 in body text */
    --font-heading-2-text-size: 1.2rem;
    --font-heading-2-text-family: var(--courier-prime-bold);
    --font-heading-2-text-weight: bold;

    /* Body Text */
    --font-body-text-size: clamp(1rem, 1rem + 0.1vw, 1.2rem);
    --font-body-text-family: var(--courier-prime-regular);
    --font-body-text-weight: normal;
    --font-body-line-height: 1.35;
    --font-body-letter-spacing: -0.5px;

    /* Body Text Bold */
    --font-body-text-bold-size: 1.2rem;
    --font-body-text-bold-family: var(--courier-prime-bold);
    --font-body-text-bold-weight: bold;

    /* Body Text Italic */
    --font-body-text-italic-size: 1.2rem;
    --font-body-text-italic-family: var(--courier-prime-italic);
    --font-body-text-italic-weight: normal;
    --font-body-text-italic-style: italic;

    /* Button Small */
    --font-button-small-size: 1.2rem;
    --font-button-small-family: var(--inter-regular);
    --font-button-small-weight: light;
    --font-button-small-transform: uppercase;

    /* Button Big */
    --font-button-big-size: 3.5rem;
    --font-button-big-family: var(--inter-regular);
    --font-button-big-weight: light;
    --font-button-big-transform: uppercase;

    /* Animation */
    --font-animation-size: 1.2rem;
    --font-animation-family: var(--inter-regular);
    --font-animation-weight: light;
    --font-animation-transform: uppercase;


    /* ---------- Sizes & Styles ---------- */
    --thin-border: 1px;
    --transition-time: 0.3s;
    --hover-opacity: 65%;


    /* ---------- Margin & Paddings ---------- */
    /* body padding */
    --body-padding: clamp(1.3rem, 1rem + 1vw, 2rem);
    --padding-medium: 2em;
    --padding-small: 1rem;
    --padding-extra-small: 0.5rem;
    --padding-buttons-standard: 1em 1.5em;


    /* desktop */
    --section-padding-large: 4rem 15rem;
    --section-margin-large: 0rem 0;

    --nav-padding-large: 4rem 15rem;

    /* tablet */
    --section-padding-medium: 0 5rem;
    --section-margin-medium: 4rem 0;

    --nav-padding-medium: 4rem 2rem;

    /* phone */
    --section-padding-small: 0 1rem;
    --section-margin-small: 4rem 0;

    --nav-padding-small: 0;



    /* ---------- Breakpoints ---------- */
    --breakpoint-phone: 0px;
    --breakpoint-tablet: 490px;
    --breakpoint-desktop: 891px;
}
```

Animation-related rules from `public/styles/detail-page.css`:

```css
:root {
    --animation-height: 90vh;
}

.animation-section {
    font-family: var(--font-animation-family);
    height: var(--animation-height, 100vh);
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: clip;
}

.hidden-section {
    position: relative;

    .animation-button {
        background: var(--black);
        position: absolute;
        z-index: 10000;
        appearance: none;
        border: none;
        right: 20px;
        top: 20px;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        place-items: center;

        cursor: pointer;

        span {
            display: inline-block;
            width: 80%;
            height: 80%;
            
            background-position: center;
            
            background-repeat: no-repeat;

            
        }

        &.stop-animation span {
            background-image: url("/assets/media/start.svg");
            background-size: 80%;
        }

        &.play-animation span {
            background-image: url("/assets/media/stop.svg");
            background-size: 100%;
        }
    }
}


.animation-button {
    display: none;
}

.animation-button.play-animation,
.animation-button.stop-animation {
    display: grid; 
}

.animation-section:has(.stop-animation) * {
    animation-play-state: paused !important;
    transition: none;
}
```

---

## 1. Adaptation  (slug: `adaptation`)

### Adaptation: HTML + JavaScript  (`src/animations/adaptation.astro`)

```astro
---

---

<div class="container">
    <!-- ===================================== -->
    <!-- MARK: Adaptation Animation            -->
    <!-- ===================================== -->
    <div class="animation-section active anim-5">
        <!-- The animation is made up of 3 vertical strips (black, white, black) that can be resized -->
        <div class="adaptation-background">
            <div class="adaptation-pane pane-black"></div>
            <div class="adaptation-pane pane-white"></div>
            <div class="adaptation-pane pane-black"></div>
        </div>
        <!-- The word "ADAPTATION" is displayed on top of the strips -->
        <div class="adaptation-word">ADAPTATION</div>
    </div>
</div>

<script>
    // @ts-nocheck

    // =====================================
    // MARK: Adaptation Animation
    // This animation shows 3 vertical strips (black, white, black).
    // The strips automatically resize to random widths every 1.5 seconds.
    // The user can also click and drag the borders between the strips
    // to manually resize them. When the user stops dragging,
    // the automatic animation starts again after 1 second.
    // =====================================

    // ---------- Setup ----------
    // Select the elements we need from the page

    // The container that holds all 3 strips
    const background = document.querySelector(".adaptation-background");

    // Select all 3 strips and give them individual names
    const panes = document.querySelectorAll(".adaptation-pane");
    const leftPane = panes[0]; // first black strip
    const middlePane = panes[1]; // white strip
    const rightPane = panes[2]; // second black strip

    // Keep track of what the user is doing:
    let draggingSide = null; // which border the user is dragging ("left" or "right"), or null if not dragging
    let idleTimer = null; // a countdown that starts the automatic animation after the user stops interacting
    let animationTimer = null; // a countdown that keeps the automatic animation looping

    // ---------- Functions ----------

    // Called when the user releases the mouse / lifts their finger.
    // Resets the drag state and starts the countdown to resume the automatic animation.
    const stopDragging = () => {
        draggingSide = null;
        background.style.cursor = "default";
        resetIdleTimer();
    };

    // Runs the automatic animation:
    // Picks 3 random widths and smoothly slides the strips to those sizes.
    // Then calls itself again after 1.5 seconds to keep looping.
    const playAnimation = () => {
        // Enable smooth sliding so the size changes look animated
        panes.forEach(
            (pane) => (pane.style.transition = "flex 1s ease-in-out"),
        );

        // Generate a random width for each strip (between 10% and 43% of the total width)
        const p1 = Math.random() * 33 + 10;
        const p2 = Math.random() * 33 + 10;
        // The third strip gets whatever space is left, but at least 10%
        const p3 = Math.max(10, 100 - p1 - p2);

        // Apply the new widths to each strip
        leftPane.style.flex = p1;
        middlePane.style.flex = p2;
        rightPane.style.flex = p3;

        // Repeat this function after 1.5 seconds to keep the animation going
        animationTimer = setTimeout(playAnimation, 1500);
    };

    // Stops the automatic animation immediately.
    // Freezes the strips at their current position so they don't jump to a new size.
    const stopAnimation = () => {
        // Cancel the next scheduled animation step
        if (animationTimer) clearTimeout(animationTimer);

        // Lock each strip at its current visual width (as a percentage)
        // so the layout doesn't suddenly snap when it stops
        const width = background.getBoundingClientRect().width;
        leftPane.style.flex =
            (leftPane.getBoundingClientRect().width / width) * 100;
        middlePane.style.flex =
            (middlePane.getBoundingClientRect().width / width) * 100;
        rightPane.style.flex =
            (rightPane.getBoundingClientRect().width / width) * 100;

        // Disable smooth sliding so that manual dragging feels instant
        panes.forEach((pane) => (pane.style.transition = "none"));
    };

    // Restarts the idle countdown.
    // If the user is not dragging, the automatic animation will resume after 1 second.
    const resetIdleTimer = () => {
        // Cancel any existing countdown
        if (idleTimer) clearTimeout(idleTimer);

        // Only start a new countdown if the user is not currently dragging
        if (draggingSide === null) {
            idleTimer = setTimeout(playAnimation, 1000);
        }
    };

    // ---------- Initialization ----------

    // On mobile, prevent the page from scrolling when the user touches the animation
    background.style.touchAction = "none";

    // Start the idle countdown, the animation will begin after 1 second
    resetIdleTimer();

    // =====================================
    // MARK: Dragging Logic
    // Lets the user click (or tap) and drag the borders between the strips
    // to manually control their widths.
    // =====================================

    // When the user clicks or taps on the animation area
    background.addEventListener("pointerdown", (event) => {
        // Stop the automatic animation so the user can take over
        stopAnimation();

        // Find the position of the two borders between the strips
        const leftEdge = leftPane.getBoundingClientRect().right; // border between left and middle strip
        const rightEdge = rightPane.getBoundingClientRect().left; // border between middle and right strip

        // Figure out which border is closer to where the user clicked,
        // and start dragging that one
        if (
            Math.abs(event.clientX - leftEdge) <
            Math.abs(event.clientX - rightEdge)
        ) {
            draggingSide = "left";
        } else {
            draggingSide = "right";
        }

        // Change the cursor to a drag arrow cursor to show the user they can drag
        background.style.cursor = "ew-resize";

        // Keep tracking the mouse even if it moves outside the animation area
        background.setPointerCapture(event.pointerId);
    });

    // When the user moves the mouse or drags their finger
    background.addEventListener("pointermove", (event) => {
        // If the user is not dragging, just show a resize cursor
        // when they hover near one of the borders (within 40 pixels)
        if (draggingSide === null) {
            const leftEdge = leftPane.getBoundingClientRect().right;
            const rightEdge = rightPane.getBoundingClientRect().left;
            const nearLeft = Math.abs(event.clientX - leftEdge) < 40;
            const nearRight = Math.abs(event.clientX - rightEdge) < 40;

            background.style.cursor =
                nearLeft || nearRight ? "ew-resize" : "default";
            return;
        }

        // The user is dragging: reset the idle countdown so the
        // automatic animation doesn't restart while they're still interacting
        resetIdleTimer();

        // Convert the mouse position to a percentage (0% = left edge, 100% = right edge)
        const rect = background.getBoundingClientRect();
        const width = rect.width;
        let mouse = Math.max(
            0,
            Math.min(100, ((event.clientX - rect.left) / width) * 100),
        );

        // Get the current widths of the left and right strips as percentages
        let left = (leftPane.getBoundingClientRect().width / width) * 100;
        let right = (rightPane.getBoundingClientRect().width / width) * 100;

        // Move the border that the user is dragging to follow the mouse,
        // but don't let it overlap the other border
        if (draggingSide === "left") {
            left = Math.min(mouse, 100 - right);
        } else {
            right = Math.min(100 - mouse, 100 - left);
        }

        // The middle strip fills whatever space is left between the other two
        const middle = 100 - left - right;

        // Apply the new widths
        leftPane.style.flex = left;
        middlePane.style.flex = middle;
        rightPane.style.flex = right;
    });

    // When the user releases the mouse button or lifts their finger, stop dragging
    background.addEventListener("pointerup", stopDragging);
    // Also stop if the browser cancels the interaction
    background.addEventListener("pointercancel", stopDragging);
</script>
```

### Adaptation: CSS  (`public/styles/animation-css/adaptation.css`)

```css
@layer components, utilities;

/* =====================================
MARK: Layout Components
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
    }

    .anim-5 {
        height: 100%;
    }

    @media (min-width: 1024px) {
        .container {
            height: 100vh;
        }
        
        .animation-section {
            --animation-height: 100vh;
        }
    }

    /* ---------- Adaptation Animation ---------- */
    .adaptation-background {
        position: absolute;
        inset: 0 5vw;
        display: flex;
    }

    @media (min-width: 1024px) {
        .adaptation-background {
            inset: 0;
        }
    }

    .adaptation-pane {
        flex: 1;
    }

    .pane-black {
        background-color: var(--color-background);
    }

    .pane-white {
        background-color: var(--color-text);
    }

    .adaptation-word {
        position: relative;
        z-index: 10;
        font-size: clamp(2rem, 10vw, 10rem);
        white-space: nowrap;
        font-weight: 900;
        text-transform: uppercase;
        mix-blend-mode: difference;
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode */
        color: var(--color-text);
        pointer-events: none;
        letter-spacing: 0.02em;
    }
}
```

---

## 2. Affect  (slug: `affect`)

### Affect: HTML + JavaScript  (`src/animations/affect.astro`)

```astro
---

---

<div class="affect-container" id="affect-container">
    <canvas id="affect-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Affect Animation
    // =====================================
    const container = document.getElementById("affect-container");
    const cv = document.getElementById("affect-canvas");
    const ctx = cv.getContext("2d");
    const FONT_FAMILY = '"Inter", "Helvetica Neue", Arial, sans-serif';

    const NUM_RINGS = 50;
    let n = NUM_RINGS;
    let M = 200;
    let totalPoints = 0;
    let W = 0,
        H = 0,
        DPR = 1;

    let bx = null,
        by = null,
        dx = null,
        dy = null,
        vx = null,
        vy = null;
    let ringAlphas = null;
    let insideSegs = null;

    let agent = { x: 0, y: 0 };
    let ptrX = 0,
        ptrY = 0,
        hasPtr = false,
        ptrAt = -99;
    let animId = null;
    let isVisible = true;
    let isRunning = true;
    let lastTime = 0;

    const animationButton =
        container
            ?.closest(".animation-section")
            ?.querySelector(".animation-button") ||
        document.querySelector(".animation-button");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

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
            if (isRunning && isVisible && !animId) {
                lastTime = performance.now();
                animId = requestAnimationFrame(drawFrame);
            }
        });
    }

    function buildScene() {
        if (!container || !cv) return false;

        const rect = container.getBoundingClientRect();
        W = Math.floor(
            container.clientWidth || rect.width || window.innerWidth,
        );
        H = Math.floor(
            container.clientHeight || rect.height || window.innerHeight,
        );

        // Abort if container has no layout size yet
        if (W <= 0 || H <= 0) return false;

        const isMobile = W < 768;
        DPR = isMobile
            ? Math.min(window.devicePixelRatio || 1, 1.25)
            : Math.min(window.devicePixelRatio || 1, 1.75);

        cv.width = Math.round(W * DPR);
        cv.height = Math.round(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        n = NUM_RINGS;
        M = isMobile ? 180 : 240;

        const cx = W / 2;
        const cy = H / 2;
        const maxR = Math.hypot(W, H) / 2;
        const gap = (maxR - 10) / n;

        // Render word mask off-screen
        const m = document.createElement("canvas");
        m.width = W;
        m.height = H;
        const g = m.getContext("2d", { willReadFrequently: true });
        let fs = 100;
        g.font = `600 ${fs}px ${FONT_FAMILY}`;
        const measuredWidth = g.measureText("affect").width || 1;
        fs = Math.min((fs * W * 0.82) / measuredWidth, H * 0.5);

        g.font = `600 ${fs}px ${FONT_FAMILY}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "#fff";
        g.fillText("affect", cx, cy + fs * 0.04);
        const px = g.getImageData(0, 0, W, H).data;

        const cosAngles = new Float32Array(M);
        const sinAngles = new Float32Array(M);
        const TWO_PI = Math.PI * 2;
        for (let k = 0; k < M; k++) {
            const a = (k / M) * TWO_PI;
            cosAngles[k] = Math.cos(a);
            sinAngles[k] = Math.sin(a);
        }

        totalPoints = n * M;
        bx = new Float32Array(totalPoints);
        by = new Float32Array(totalPoints);
        dx = new Float32Array(totalPoints);
        dy = new Float32Array(totalPoints);
        vx = new Float32Array(totalPoints);
        vy = new Float32Array(totalPoints);
        const isInside = new Uint8Array(totalPoints);
        ringAlphas = new Float32Array(n);

        const checkInside = (x, y) => {
            const xi = Math.round(x);
            const yi = Math.round(y);
            return (
                xi >= 0 &&
                yi >= 0 &&
                xi < W &&
                yi < H &&
                px[(yi * W + xi) * 4 + 3] > 80
            );
        };

        for (let i = 0; i < n; i++) {
            ringAlphas[i] = (0.75 - (i / n) * 0.35) * 0.38;
            const r = 10 + i * gap;
            const start = i * M;
            for (let k = 0; k < M; k++) {
                const idx = start + k;
                const x = cx + cosAngles[k] * r;
                const y = cy + sinAngles[k] * r;
                bx[idx] = x;
                by[idx] = y;

                if (checkInside(x, y)) {
                    isInside[idx] = 1;
                }
            }
        }

        const segs = [];
        for (let i = 0; i < n; i++) {
            const start = i * M;
            for (let k = 0; k < M; k++) {
                const a = start + k;
                const b = start + ((k + 1) % M);
                const midX = (bx[a] + bx[b]) * 0.5;
                const midY = (by[a] + by[b]) * 0.5;

                if ((isInside[a] && isInside[b]) || checkInside(midX, midY)) {
                    segs.push(a, b);
                }
            }
        }
        insideSegs = new Int32Array(segs);

        agent.x = cx;
        agent.y = cy;
        return true;
    }

    function drawFrame(now) {
        if (!isRunning || !isVisible) {
            animId = null;
            return;
        }

        // GUARD: Do not execute physics if build() has not successfully initialized arrays
        if (!bx || !insideSegs || totalPoints === 0) {
            animId = requestAnimationFrame(drawFrame);
            return;
        }

        if (!lastTime) lastTime = now;
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        const dtMultiplier = dt * 60;

        const t = now / 1000;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);

        const isInteracting = hasPtr && t - ptrAt < 2.5;
        let tx, ty;
        if (isInteracting) {
            tx = ptrX;
            ty = ptrY;
        } else {
            tx = W / 2 + Math.sin(t * 0.23) * W * 0.3;
            ty = H / 2 + Math.sin(t * 0.31 + 1) * H * 0.3;
        }

        const followRate = isInteracting ? 0.18 : 0.04;
        const lerpFactor = 1 - Math.pow(1 - followRate, dtMultiplier);
        agent.x += (tx - agent.x) * lerpFactor;
        agent.y += (ty - agent.y) * lerpFactor;

        const ambientAmp = 75 * Math.sin(t * 0.4);
        const amp = isInteracting
            ? Math.abs(ambientAmp) < 45
                ? ambientAmp >= 0
                    ? 55
                    : -55
                : ambientAmp
            : ambientAmp;

        const isMobile = W < 768;
        const R = Math.min(W, H) * (isMobile ? 0.32 : 0.28);
        const R2 = R * R;
        const invR2 = 1 / R2;
        const maxDist2 = R2 * 6.25;

        const ax = agent.x;
        const ay = agent.y;
        const springK = 0.06 * dtMultiplier;
        const damping = Math.pow(0.82, dtMultiplier);

        // 1. Physics update
        for (let i = 0; i < totalPoints; i++) {
            const ex = bx[i] - ax;
            const ey = by[i] - ay;
            const d2 = ex * ex + ey * ey;

            if (d2 < maxDist2) {
                const d = Math.sqrt(d2) || 1;
                const f = Math.exp(-d2 * invR2) * amp;
                vx[i] += ((ex / d) * f - dx[i]) * springK;
                vy[i] += ((ey / d) * f - dy[i]) * springK;
            } else {
                vx[i] += -dx[i] * springK;
                vy[i] += -dy[i] * springK;
            }

            vx[i] *= damping;
            vy[i] *= damping;
            dx[i] += vx[i];
            dy[i] += vy[i];
        }

        // 2. Draw base rings
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        for (let i = 0; i < n; i++) {
            const start = i * M;
            ctx.globalAlpha = ringAlphas[i];
            ctx.beginPath();
            ctx.moveTo(bx[start] + dx[start], by[start] + dy[start]);
            for (let k = 1; k < M; k++) {
                const idx = start + k;
                ctx.lineTo(bx[idx] + dx[idx], by[idx] + dy[idx]);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 3. Draw text segments
        if (insideSegs.length > 0) {
            ctx.lineWidth = isMobile ? 2.4 : 2.8;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            for (let s = 0; s < insideSegs.length; s += 2) {
                const a = insideSegs[s];
                const b = insideSegs[s + 1];
                ctx.moveTo(bx[a] + dx[a], by[a] + dy[a]);
                ctx.lineTo(bx[b] + dx[b], by[b] + dy[b]);
            }
            ctx.stroke();
        }

        // 4. Draw agent
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, isMobile ? 3 : 4, 0, Math.PI * 2);
        ctx.fill();

        animId = requestAnimationFrame(drawFrame);
    }

    function updatePointer(e) {
        if (!cv) return;
        const rect = cv.getBoundingClientRect();
        ptrX = e.clientX - rect.left;
        ptrY = e.clientY - rect.top;
        hasPtr = true;
        ptrAt = performance.now() / 1000;
    }

    cv.addEventListener("pointermove", updatePointer, { passive: true });
    cv.addEventListener("pointerdown", updatePointer, { passive: true });
    cv.addEventListener(
        "pointerup",
        () => {
            hasPtr = false;
        },
        { passive: true },
    );
    cv.addEventListener(
        "pointerleave",
        () => {
            hasPtr = false;
        },
        { passive: true },
    );

    if ("IntersectionObserver" in window && container) {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    isVisible = entry.isIntersecting;
                    if (isVisible && isRunning && !animId) {
                        lastTime = performance.now();
                        animId = requestAnimationFrame(drawFrame);
                    }
                }
            },
            { threshold: 0.05 },
        );
        observer.observe(container);
    }

    let resizeTimer = null;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (buildScene() && isRunning && isVisible && !animId) {
                lastTime = performance.now();
                animId = requestAnimationFrame(drawFrame);
            }
        }, 120);
    }

    if ("ResizeObserver" in window && container) {
        const ro = new ResizeObserver(handleResize);
        ro.observe(container);
    } else {
        window.addEventListener("resize", handleResize);
    }

    const startAnimation = () => {
        const built = buildScene();
        if (!built) {
            // Retry once layout resolves if dimensions were 0 on initial pass
            requestAnimationFrame(() => {
                buildScene();
                if (isRunning && isVisible && !animId) {
                    lastTime = performance.now();
                    animId = requestAnimationFrame(drawFrame);
                }
            });
            return;
        }

        if (isRunning && isVisible && !animId) {
            lastTime = performance.now();
            animId = requestAnimationFrame(drawFrame);
        }
    };

    // Ensure custom font is fully loaded before calculating text metrics
    if (document.fonts && document.fonts.load) {
        document.fonts
            .load(`600 100px ${FONT_FAMILY}`)
            .then(startAnimation)
            .catch(startAnimation);
    } else {
        window.addEventListener("load", startAnimation);
    }
</script>
```

### Affect: CSS  (`public/styles/animation-css/affect.css`)

```css
/* =====================================
MARK: Affect Animation
===================================== */

.affect-container {
    position: relative;
    width: 100%;
    height: var(--animation-height, 80vh);
    background-color: #000;
    overflow: hidden;
}

@media (min-width: 1024px) {
    .affect-container {
        height: var(--animation-height, 90vh);
    }
}

.affect-container canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
}
```

---

