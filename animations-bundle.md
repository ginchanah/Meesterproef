# Glossary animations: complete code bundle

Every typographic animation (29 in total) of the "(Inter)facing the Hybrid City" glossary website, an Astro project.

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

- Each animation's CSS and script only affect its own wrapper. Scripts pause when the play/stop button has the class `.stop-animation`, and while `document.hidden` is true.
- `.astro` files: the part between the `---` fences at the top is server-side frontmatter. Most are empty. `intra-action.astro` uses it to generate repeated markup with `{...map()}`.
- External library: **interaction** uses Matter.js (`npm install matter-js@0.19.0`, imported with `import Matter from "matter-js"`). Outside Astro, load it from https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js and use the global `Matter`.

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

## Contents

1. Adaptation (`adaptation`)
2. Affect (`affect`)
3. Balancing Feedback (`balancing-feedback`)
4. Beyond Control (`beyond-control`)
5. Control (`control`)
6. Cybernetics (`cybernetics`)
7. Ecology (`ecology`)
8. Friction (`friction`)
9. In-between (`in-between`)
10. Interaction (`interaction`)
11. Interface (`interface`)
12. Intra-action (`intra-action`)
13. Intraface (`intraface`)
14. Invisible (`invisible`)
15. Latent Space (`latent-space`)
16. Liminal Space (`liminal-space`)
17. Lines of Flight (`lines-of-flight`)
18. Neutrum (`neutrum`)
19. Noise (`noise`)
20. Object (`object`)
21. Out of Control (`out-of-control`)
22. Proximity (`proximity`)
23. Recursivity (`recursivity`)
24. Reinforcing Feedback (`reinforcing-feedback`)
25. Remote Control (`remote-control`)
26. Silence (`silence`)
27. Subject (`subject`)
28. System (`system`)
29. Trigger (`trigger`)

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

## 3. Balancing Feedback  (slug: `balancing-feedback`)

### Balancing Feedback: HTML + JavaScript  (`src/animations/balancing-feedback.astro`)

```astro
---

---

<div class="balancing-container" aria-label="An interactive text animation where the letters of 'BALANCING FEEDBACK' bounce, tilt, and react to mouse movements like a balancing scale">
    <div class="row">
        <!-- ===================================== -->
        <!-- MARK: Balancing Word                  -->
        <!-- ===================================== -->

        <!-- Each letter of the word "BALANCING" is its own element so they can move independently -->
        <div class="block word-balancing">B</div>
        <div class="block word-balancing">A</div>
        <div class="block word-balancing">L</div>
        <div class="block word-balancing">A</div>
        <div class="block word-balancing">N</div>
        <div class="block word-balancing">C</div>
        <div class="block word-balancing">I</div>
        <div class="block word-balancing">N</div>
        <div class="block word-balancing">G</div>

        <!-- ===================================== -->
        <!-- MARK: Feedback Word                   -->
        <!-- ===================================== -->

        <!-- Each letter of the word "FEEDBACK" is its own element so they can move independently -->
        <div class="block word-feedback margin-left">F</div>
        <div class="block word-feedback">E</div>
        <div class="block word-feedback">E</div>
        <div class="block word-feedback">D</div>
        <div class="block word-feedback">B</div>
        <div class="block word-feedback">A</div>
        <div class="block word-feedback">C</div>
        <div class="block word-feedback">K</div>
    </div>
</div>

<script>
    // @ts-nocheck

    // =====================================
    // MARK: Balancing Feedback Animation
    //
    // How this animation works:
    // The words "BALANCING FEEDBACK" are displayed as individual letters.
    // The letters behave like a balancing scale: when one moves up,
    // its neighbors follow. Moving the mouse up or down pulls the
    // middle letter, and the rest of the letters react like a chain.
    // Hovering over a letter gives it a small bounce.
    // Clicking a letter gives it a big bounce.
    // The letters always slowly settle back to the center line.
    // =====================================

    // ---------- Setup ----------

    // Select the animation container from the page
    const container = document.querySelector(".balancing-container");

    // Select all 17 individual letter elements (B-A-L-A-N-C-I-N-G + F-E-E-D-B-A-C-K)
    const letters = container.querySelectorAll(".block");

    // Store the total number of letters (17)
    const totalLetters = letters.length;

    // ---------- State ----------

    // For each letter, keep track of 3 things:
    //   - y: how far above or below the center line it currently is (in pixels)
    //   - speedY: how fast it is currently moving up or down
    //   - angle: how much it is tilted (in degrees)
    // All start at 0 (centered, not moving, not tilted)
    const letterStates = Array.from({ length: totalLetters }, () => ({
        y: 0,
        speedY: 0,
        angle: 0,
    }));

    // Where the mouse is trying to pull the middle letter (0 = no pull)
    let targetY = 0;

    // =====================================
    // MARK: Initialization
    // =====================================

    // When the user moves their mouse inside the animation area,
    // update the pull target so the middle letter follows the mouse
    container.addEventListener("mousemove", (e) => updateTargetY(e.clientY));

    // When the mouse leaves the animation area, stop pulling (reset to center)
    container.addEventListener("mouseleave", () => {
        targetY = 0;
    });

    // Same behavior for touch screens (phones and tablets):
    // dragging a finger pulls the middle letter
    container.addEventListener(
        "touchmove",
        (e) => {
            if (e.touches.length > 0) updateTargetY(e.touches[0].clientY);
        },
        { passive: true },
    );

    // When the finger is lifted, stop pulling (reset to center)
    container.addEventListener("touchend", () => {
        targetY = 0;
    });

    // Give every letter a hover effect and a click effect
    letters.forEach((letterElement, index) => {
        // When the mouse hovers over a letter, give it a small bounce
        letterElement.addEventListener("mouseenter", () =>
            handleLetterHover(index),
        );
        // When a letter is clicked, give it a big bounce
        letterElement.addEventListener("click", () => handleLetterClick(index));
    });

    // Start the animation loop
    requestAnimationFrame(() => updatePhysics());

    // =====================================
    // MARK: Functions
    // =====================================

    // Converts the mouse position to a pull strength (max 50 pixels up or down).
    // The higher the mouse is in the container, the more it pulls the middle letter up.
    // The lower the mouse is, the more it pulls the middle letter down.
    const updateTargetY = (clientY) => {
        const rect = container.getBoundingClientRect();
        // Calculate how far up or down the mouse is (-1 = top, 0 = center, 1 = bottom)
        const normY = ((clientY - rect.top) / rect.height) * 2 - 1;
        // Scale that to a maximum of 50 pixels of pull
        targetY = normY * 50;
    };

    // When the mouse hovers over a letter, push it (and its neighbors) in a random direction.
    // The push is small so it feels like a gentle bounce.
    const handleLetterHover = (index) => {
        // Randomly choose to push up (-1) or down (1)
        const direction = Math.random() < 0.5 ? -1 : 1;

        // Push the hovered letter
        letterStates[index].speedY += direction * 4;

        // Also give its left and right neighbors a smaller push
        if (index > 0) letterStates[index - 1].speedY += direction * 1.2;
        if (index < totalLetters - 1)
            letterStates[index + 1].speedY += direction * 1.2;
    };

    // When a letter is clicked, push it much harder so it swings dramatically.
    // Same logic as hover, but with bigger numbers.
    const handleLetterClick = (index) => {
        const direction = Math.random() < 0.5 ? -1 : 1;

        // Big push on the clicked letter
        letterStates[index].speedY += direction * 35;

        // Medium push on its neighbors
        if (index > 0) letterStates[index - 1].speedY += direction * 17.5;
        if (index < totalLetters - 1)
            letterStates[index + 1].speedY += direction * 17.5;
    };

    // =====================================
    // MARK: Main Animation Loop
    // This function runs once per frame.
    // It calculates the new position and tilt of every letter,
    // then moves them on screen.
    // =====================================
    const updatePhysics = () => {
        // The middle letter is the one the mouse can pull (letter number 9 out of 17)
        const middleIndex = Math.floor(totalLetters / 2);

        // Go through every letter one by one
        for (let i = 0; i < totalLetters; i++) {
            let letter = letterStates[i];

            // ---------- Step 1: Which neighbor does this letter follow? ----------
            // Letters form a chain: each one follows the letter next to it that is closer to the center.
            let neighborY = letter.y;

            // Letters on the left side follow the letter to their right
            if (i < middleIndex) {
                neighborY = letterStates[i + 1].y;
            }
            // Letters on the right side follow the letter to their left
            else if (i > middleIndex) {
                neighborY = letterStates[i - 1].y;
            }

            // ---------- Step 2: Calculate all the forces acting on this letter ----------

            // Force 1: Pull toward the neighbor (25% of the gap between them)
            // This is what makes the letters move as a connected chain
            let pullToNeighbor = (neighborY - letter.y) * 0.25;

            // Force 2: The first and last letters are "anchored" to the center line
            // This keeps the ends of the chain from flying away
            let pullToAnchor = 0;
            if (i === 0 || i === totalLetters - 1) {
                pullToAnchor = (0 - letter.y) * 0.3;
            }

            // Force 3: A gentle pull on every letter back to center
            // This makes the whole animation settle down over time
            let pullToCenter = (0 - letter.y) * 0.07;

            // Force 4: Only the middle letter is pulled by the mouse
            let pullToMouse = 0;
            if (i === middleIndex) {
                pullToMouse = (targetY - letter.y) * 0.08;
            }

            // ---------- Step 3: Apply all forces to move the letter ----------

            // Combine all four forces into the letter's speed
            letter.speedY +=
                pullToNeighbor + pullToAnchor + pullToCenter + pullToMouse;

            // Friction: reduce the speed by 20% each frame so it doesn't bounce forever
            letter.speedY *= 0.8;

            // Move the letter by its current speed
            letter.y += letter.speedY;

            // ---------- Step 4: Tilt the letter ----------
            // Letters tilt based on the difference between their position and their neighbor.
            // This makes the chain look like it's bending, not just moving up and down.
            if (i < middleIndex) {
                letter.angle = (letter.y - neighborY) * -0.16; // Tilt left side
            } else if (i > middleIndex) {
                letter.angle = (letter.y - neighborY) * 0.16; // Tilt right side
            } else {
                letter.angle = 0; // Keep the middle letter straight
            }
        }

        // ---------- Step 5: Update the screen ----------
        // Move and rotate each letter element to its new position
        for (let i = 0; i < totalLetters; i++) {
            letters[i].style.transform =
                `translateY(${letterStates[i].y}px) rotate(${letterStates[i].angle}deg)`;
        }

        // Run this function again on the next frame to keep the animation going
        requestAnimationFrame(updatePhysics);
    };
</script>
```

### Balancing Feedback: CSS  (`public/styles/animation-css/balancing-feedback.css`)

```css
@layer base, components, utilities;

/* =====================================
MARK: Variables
===================================== */
:root {
    --spacing-large: clamp(8px, 2vw, 32px);
    --block-size-w: clamp(14px, 4.5vw, 60px);
    --block-size-h: clamp(24px, 6vh, 60px);
    --block-font-size: clamp(12px, 4vw, 3.2rem);
}



@layer components {

    /* ---------- Layout Containers ---------- */
    .balancing-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100%;
        background-color: var(--color-background);
        color: var(--color-text);
        font-family: var(--inter-regular);
        overflow: hidden;
        position: relative;
    }

    .animation-section {
        --animation-height: 80vh;
    }

    @media (min-width: 1024px) {
        .balancing-container {
            height: 100vh;
        }

        .animation-section {
            --animation-height: 100vh;
        }
    }

    .balancing-container .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
    }

    /* ---------- Blocks ---------- */
    .balancing-container .block {
        width: var(--block-size-w);
        height: var(--block-size-h);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 clamp(1px, 0.3vw, 2px);
        font-family: var(--inter-regular);
        font-weight: 900;
        font-size: var(--block-font-size);
        color: var(--color-text);
        user-select: none;
        will-change: transform;
        cursor: pointer;
    }
}

@layer utilities {

    /* ---------- Spacing ---------- */
    .balancing-container .margin-left {
        margin-left: var(--spacing-large);
    }
}
```

---

## 4. Beyond Control  (slug: `beyond-control`)

### Beyond Control: HTML + JavaScript  (`src/animations/beyond-control.astro`)

```astro
---

---

<div class="beyond-control-wrapper">
    <canvas class="beyond-control-canvas" id="beyond-control-canvas"></canvas>
</div>

<script>
    // =====================================
    // MARK: Script beyond-control
    // =====================================
    // @ts-nocheck
    (() => {
        const cv = document.getElementById("beyond-control-canvas");
        const ctx = cv.getContext("2d");
        const wrapper = cv.closest(".beyond-control-wrapper");
        const section = cv.closest(".animation-section");

        // ---------- Tunable parameters ----------
        // distances/speeds are defined for a 600px screen height and scale with the screen
        const P = {
            words: ["BEYOND", "CONTROL"],   // every line spells ONE of these words (the lines take turns)
            repeat: 1,                // how many times the word is spelled on one line
            tracking: 1.3,            // space between letters along a line (1 = letters touch, higher = more air)
            lines: 400,               // how many lines (snakes) there are
            size: 10,                 // letter size (px at 600px screen height)
            fontWeight: 100,          // letter thickness: 100 = thinnest, 200 = extra light, 400 = regular, 700 = bold
            minSpeed: 2.4,            // head speed range
            maxSpeed: 3.5,
            maxForce: 0.19,           // limit on turning: lower = wider, smoother corners
            smooth: 0.1,              // how slowly steering changes: lower = smoother, lazier
            vision: 260,              // how far a head sees the other heads
            sepDist: 6,               // heads keep at least this far from each other
            sepW: 0.5,                // separation strength between heads
            spreadDist: 100,          // a gentle, longer-range push that spreads the lines over the whole page
            spreadW: 0,
            aliW: 0.08,               // alignment: heads match each other's heading (high = lines run side by side in formation)
            cohW: 0.003,              // cohesion: heads drift towards each other (keeps all the lines in one tight group)
            headW: 0.1,               // pull of every head towards one shared direction (keeps the group travelling one way, even after a disturbance)
            flockW: 0,                // faint pull to the group's centre (stops it splitting for good)
            leadW: 0.00012,           // pull towards a wandering lead point (pulls the group into shapes)
            leadSpeed: 2.4,           // speed of that lead point
            leadWander: 0.012,        // how often the lead point changes direction
            wiggle: 0.05,             // sideways sway of each head: this is the slither
            wiggleSpeed: 0.0045,      // how fast the sway runs
            deviate: 0.6,             // how far each line's own preferred direction wanders from the group's (radians; 0 = all lines head the same way)
            variety: 0.18,            // how much each line differs in speed and sway (breaks up the formation; 0 = identical lines)
            avoidR: 0.85,             // heads steer away from any letter within this many letter-sizes
            avoidW: 0.15,             // how firmly (softly steered, so lines weave instead of colliding)
            lookAhead: 10,            // how many frames ahead a head looks for other lines
            edgeW: 0.4,               // push away from the walls
            margin: 50,              // distance from the wall where the push starts
            wallLook: 5,             // how many frames ahead a head looks for the wall (so it turns early)
            cursorR: 140,             // radius in which the cursor is felt
            cursorW: 1.6,             // how strongly heads bend away from the cursor (the range is cursorR, unchanged)
            cursorMax: 0.8,           // most a head may bend per frame (keeps the curve smooth)
            trail: 1                  // 1 = crisp frames, lower = smear
        };

        const TEXTS = P.words.map(w => Array(P.repeat).fill(w.toUpperCase()).join(" "));
        const L = Math.max(...TEXTS.map(t => t.length));   // longest line (array size)
        const M = P.lines;

        let W = 600, H = 600, u = 1, dpr = 1;
        const mouse = { x: 0, y: 0, active: false };
        let sqColor = "#000", birdColor = "#fff";   // background / letter colour
        let sized = false;
        let sheet = null, gw = 1, gh = 1, spacing = 6, fontPx = 10, atlasKey = "";
        const CHARS = Array.from(new Set(TEXTS.join("").replace(/ /g, "").split("")));
        const GLYPHS = TEXTS.map(t => t.split("").map(ch => CHARS.indexOf(ch)));   // sprite index per position (-1 = space)
        const lead = { x: 300, y: 300, h: Math.random() * 6.28, hv: 0 };

        // Each line: node positions (node 0 is the head), the head's recorded path (px, py),
        // and the head's velocity / steering. Every other node sits ON the recorded path,
        // exactly one letter-width further back, so the body can only ever follow the head's route.
        const lines = [];
        for (let m = 0; m < M; m++) {
            const wi = m % TEXTS.length;
            lines.push({
                n: TEXTS[wi].length, glyph: GLYPHS[wi],
                x: new Float32Array(L), y: new Float32Array(L),
                px: [], py: [],
                vx: 0, vy: 0, ax: 0, ay: 0,
                phase: Math.random() * Math.PI * 2,
                side: Math.random() < 0.5 ? 1 : -1,
                off: (Math.random() * 2 - 1) * P.deviate * 0.5,        // this line's own heading offset, which keeps drifting
                speedK: 1 + (Math.random() * 2 - 1) * P.variety,
                swayK: 1 + (Math.random() * 2 - 1) * P.variety * 3
            });
        }

        // Inter (loaded in general.css) is a variable font with a true thin weight; the system fonts after it are the fallback
        const FONT = P.fontWeight + ' {px}px "Inter", Helvetica, sans-serif';

        // all letters live side by side on ONE sprite sheet: fewer texture switches than one canvas per letter
        function buildAtlas() {
            fontPx = Math.max(6, P.size * u);
            const key = fontPx + "|" + dpr + "|" + birdColor;
            if (key === atlasKey && sheet) return;           // nothing that affects the letters changed
            atlasKey = key;
            const font = FONT.replace("{px}", fontPx);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = font;
            const advance = ctx.measureText("M").width || fontPx * 0.6;   // every letter gets the same advance (the width of an M)
            spacing = advance * P.tracking;                               // distance between neighbouring letters on a line
            ctx.restore();
            gw = Math.ceil(advance * 1.3); gh = Math.ceil(fontPx * 1.3);
            sheet = document.createElement("canvas");
            sheet.width = Math.ceil(gw * dpr) * CHARS.length; sheet.height = Math.ceil(gh * dpr);
            const g = sheet.getContext("2d");
            g.fillStyle = birdColor;
            g.font = font;
            g.textAlign = "center";
            g.textBaseline = "middle";
            const cw = Math.ceil(gw * dpr);
            CHARS.forEach((ch, k) => {
                g.setTransform(dpr, 0, 0, dpr, k * cw, 0);
                g.fillText(ch, gw / 2, gh / 2 + fontPx * 0.04);
            });
        }

        // the colours are set as --page and --ink on the wrapper in beyond-control.css
        function readColors() {
            const cs = getComputedStyle(wrapper);
            sqColor = cs.getPropertyValue("--page").trim() || "#000";
            birdColor = cs.getPropertyValue("--ink").trim() || "#fff";
        }

        function resizeCanvas() {
            const r = cv.getBoundingClientRect();
            if (!(r.width > 2 && r.height > 2)) return;          // ignore hidden / zero-size layouts
            const oW = W, oH = H, oU = u;
            dpr = Math.min(2, window.devicePixelRatio || 1);
            W = r.width; H = r.height;
            u = Math.min(W, H) / 600;
            const pw = Math.round(W * dpr), ph = Math.round(H * dpr);
            if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; }   // resizing the canvas clears it, so only when needed
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            readColors();
            buildAtlas();
            if (sized && (oW !== W || oH !== H)) {
                const fx = W / oW, fy = H / oH, fv = u / oU;
                for (const a of lines) {
                    for (let j = 0; j < a.n; j++) { a.x[j] *= fx; a.y[j] *= fy; }
                    for (let i = 0; i < a.px.length; i++) { a.px[i] *= fx; a.py[i] *= fy; }
                    a.vx *= fv; a.vy *= fv;
                }
                lead.x *= fx; lead.y *= fy;
                for (const a of lines) layoutLine(a);   // letter spacing may have changed with the size
            }
            ctx.fillStyle = sqColor;
            ctx.fillRect(0, 0, W, H);
            if (!sized) { sized = true; spawnLines(); }
        }

        // place every node on the recorded path, one letter-width apart (measured along the path)
        function layoutLine(a) {
            const px = a.px, py = a.py;
            let ax = a.x[0], ay = a.y[0];
            let need = spacing;
            let i = px.length - 1;
            let j = 1;
            const L = a.n;
            while (j < L && i >= 0) {
                const dx = px[i] - ax, dy = py[i] - ay;
                const seg = Math.sqrt(dx * dx + dy * dy);
                if (seg < 1e-6) { i--; continue; }
                if (seg >= need) {
                    const f = need / seg;
                    ax += dx * f; ay += dy * f;
                    a.x[j] = ax; a.y[j] = ay;
                    j++; need = spacing;
                } else {
                    need -= seg; ax = px[i]; ay = py[i]; i--;
                }
            }
            // path too short (only right after a restart): continue straight back
            while (j < L) {
                let dx = a.x[j - 1] - a.x[Math.max(0, j - 2)], dy = a.y[j - 1] - a.y[Math.max(0, j - 2)];
                let d = Math.sqrt(dx * dx + dy * dy);
                if (d < 1e-6) { dx = 1; dy = 0; d = 1; }
                a.x[j] = a.x[j - 1] + dx / d * spacing;
                a.y[j] = a.y[j - 1] + dy / d * spacing;
                j++;
            }
            // forget the part of the path that no letter will ever need again
            if (i > 16) { px.splice(0, i - 2); py.splice(0, i - 2); }
        }

        const REC2 = 0.8 * 0.8;
        function recordHead(a) {
            const n = a.px.length;
            const ddx = n ? a.x[0] - a.px[n - 1] : 0, ddy = n ? a.y[0] - a.py[n - 1] : 0;
            if (n === 0 || ddx * ddx + ddy * ddy >= REC2 * u * u) {
                a.px.push(a.x[0]); a.py.push(a.y[0]);
            }
        }

        // lay a line out straight, ending at the head, then record that as its past path
        function placeLine(a, hx, hy, h) {
            const len = (a.n + 2) * spacing;
            const ds = 0.8 * u;
            a.px.length = 0; a.py.length = 0;
            for (let s = len; s > 0; s -= ds) {
                a.px.push(hx - Math.cos(h) * s);
                a.py.push(hy - Math.sin(h) * s);
            }
            a.x[0] = hx; a.y[0] = hy;
            a.ax = 0; a.ay = 0;
            layoutLine(a);
        }

        function spawnLines() {
            lead.x = W / 2; lead.y = H / 2;
            const heading = lead.h;
            lines.forEach((a) => {
                // a loose clump: heads scattered close together, each heading a little differently,
                // so the lines start out crossing and weaving instead of lined up side by side
                const ang = Math.random() * Math.PI * 2, rad = Math.sqrt(Math.random()) * Math.min(W, H) * 0.16;
                const mx = W / 2 + Math.cos(ang) * rad, my = H / 2 + Math.sin(ang) * rad;
                const h = heading + (Math.random() - 0.5) * 1.4;
                const sp = (P.minSpeed + P.maxSpeed) / 2 * u * a.speedK;
                a.vx = Math.cos(h) * sp; a.vy = Math.sin(h) * sp;
                placeLine(a, mx, my, h);
            });
        }

        function respawnLine(a) {
            const h = lead.h;
            a.off = 0;
            a.vx = Math.cos(h) * P.minSpeed * u; a.vy = Math.sin(h) * P.minSpeed * u;
            placeLine(a, W / 2 + (Math.random() - 0.5) * W * 0.2, H / 2 + (Math.random() - 0.5) * H * 0.2, h);
        }

        // A push that points against the direction of travel would only slow the head down (and the speed
        // limit undoes that), so a head would drive straight into whatever it is avoiding. Turn that
        // push into a sideways steer instead: the head curves away, like a snake would.
        let tx = 0, ty = 0;                       // asTurn's result (scratch, so nothing is allocated per call)
        function turnSideways(fx, fy, a) {
            const sp = Math.sqrt(a.vx * a.vx + a.vy * a.vy) || 1;
            const vx = a.vx / sp, vy = a.vy / sp;
            const along = fx * vx + fy * vy;
            if (along >= 0) { tx = fx; ty = fy; return; }
            const nx = -vy, ny = vx;
            const side = fx * nx + fy * ny;
            const mag = Math.sqrt(fx * fx + fy * fy);
            const sgn = Math.abs(side) > 0.25 * mag ? Math.sign(side) : a.side;
            tx = nx * sgn * mag; ty = ny * sgn * mag;
        }

        function moveLead(k) {
            // a point that wanders on a smooth path and turns back from the walls
            lead.hv += (Math.random() - 0.5) * P.leadWander * k;
            lead.hv *= 0.985;
            lead.hv = Math.max(-0.05, Math.min(0.05, lead.hv));
            lead.h += lead.hv * k;
            const m = Math.min(W, H) * 0.22;
            const near = Math.max(0, m - Math.min(lead.x, lead.y, W - lead.x, H - lead.y)) / m;
            if (near > 0) {
                const to = Math.atan2(H / 2 - lead.y, W / 2 - lead.x);
                let d = to - lead.h;
                d = Math.atan2(Math.sin(d), Math.cos(d));
                lead.h += d * 0.06 * near * k;
            }
            lead.x += Math.cos(lead.h) * P.leadSpeed * u * k;
            lead.y += Math.sin(lead.h) * P.leadSpeed * u * k;
        }

        function step(k, t) {
            moveLead(k);
            const vis = P.vision * u, vis2 = vis * vis;
            const sepD = P.sepDist * u, sepD2 = sepD * sepD;
            const spD = P.spreadDist * u, spD2 = spD * spD;
            const avR = P.avoidR * fontPx, avR2 = avR * avR;
            const m = P.margin * u;
            const mR = P.cursorR * u, mR2 = mR * mR;
            const minS = P.minSpeed * u, maxS = P.maxSpeed * u;
            const cruise = (minS + maxS) / 2;
            const maxF = P.maxForce * u;

            let gx = 0, gy = 0;
            for (const a of lines) { gx += a.x[0]; gy += a.y[0]; }
            gx /= M; gy /= M;

            for (let i = 0; i < M; i++) {
                const a = lines[i];
                const x = a.x[0], y = a.y[0];
                let n = 0, avx = 0, avy = 0, cx = 0, cy = 0, sx = 0, sy = 0, px2 = 0, py2 = 0;
                for (let j = 0; j < M; j++) {
                    if (j === i) continue;
                    const b = lines[j];
                    const dx = b.x[0] - x, dy = b.y[0] - y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < vis2) {
                        n++; avx += b.vx; avy += b.vy; cx += b.x[0]; cy += b.y[0];
                        if (d2 < sepD2 && d2 > 0.0001) {
                            const d = Math.sqrt(d2);
                            const w = (1 - d / sepD) / d;
                            sx -= dx * w; sy -= dy * w;
                        }
                        if (d2 < spD2 && d2 > 0.0001) {
                            const d = Math.sqrt(d2);
                            const w = (1 - d / spD) / d;
                            px2 -= dx * w; py2 -= dy * w;
                        }
                    }
                }

                let fx = 0, fy = 0;
                if (n) {
                    fx += (avx / n - a.vx) * P.aliW + (cx / n - x) * P.cohW;
                    fy += (avy / n - a.vy) * P.aliW + (cy / n - y) * P.cohW;
                }
                fx += sx * P.sepW * u + px2 * P.spreadW * u; fy += sy * P.sepW * u + py2 * P.spreadW * u;
                // each line follows the shared direction plus its own slowly drifting offset, so paths fan out and cross
                const th = 0.004;                                          // how quickly an offset pulls back to zero (about 250 frames)
                a.off += -th * a.off * k + P.deviate * Math.sqrt(2 * th) * (Math.random() + Math.random() + Math.random() - 1.5) * 2 * Math.sqrt(Math.max(k, 0));
                const want = lead.h + a.off;
                fx += (Math.cos(want) * cruise - a.vx) * P.headW;
                fy += (Math.sin(want) * cruise - a.vy) * P.headW;
                fx += (lead.x - x) * P.leadW + (gx - x) * P.flockW;
                fy += (lead.y - y) * P.leadW + (gy - y) * P.flockW;

                // slither: a sideways sway that the body then follows down the path
                const sp0 = Math.sqrt(a.vx * a.vx + a.vy * a.vy) || 1;
                const sway = Math.sin(t * P.wiggleSpeed * a.swayK + a.phase) * P.wiggle * a.swayK * u;
                fx += -a.vy / sp0 * sway; fy += a.vx / sp0 * sway;

                // steer around letters of other lines (and its own tail), looking a little ahead.
                // Avoiding a collision takes priority over the flock rules.
                const lx = x + a.vx * P.lookAhead, ly = y + a.vy * P.lookAhead;
                let ux = 0, uy = 0, avoidQ = 0;
                for (let j = 0; j < M; j++) {
                    const b = lines[j];
                    for (let q = (j === i ? 12 : 0); q < b.n; q += 2) {
                        const dx = lx - b.x[q], dy = ly - b.y[q];
                        const d2 = dx * dx + dy * dy;
                        if (d2 < avR2 && d2 > 0.0001) {
                            const d = Math.sqrt(d2);
                            const near = 1 - d / avR;
                            if (near > avoidQ) avoidQ = near;
                            const w = near * P.avoidW * u / d;
                            ux += dx * w; uy += dy * w;
                        }
                    }
                }
                if (avoidQ > 0) { turnSideways(ux, uy, a); ux = tx; uy = ty; }
                fx = fx * (1 - 0.7 * avoidQ) + ux; fy = fy * (1 - 0.7 * avoidQ) + uy;

                // walls: the head looks ahead and the push grows smoothly, so it curves away early.
                // Near a wall the push takes priority over the flock rules and may turn harder than usual.
                const wx = x + a.vx * P.wallLook, wy = y + a.vy * P.wallLook;
                let qx = 0, qy = 0;
                if (wx < m) qx = Math.min(1, 1 - wx / m);
                else if (wx > W - m) qx = -Math.min(1, 1 - (W - wx) / m);
                if (wy < m) qy = Math.min(1, 1 - wy / m);
                else if (wy > H - m) qy = -Math.min(1, 1 - (H - wy) / m);
                const wallQ = Math.max(Math.abs(qx), Math.abs(qy));
                fx *= 1 - wallQ; fy *= 1 - wallQ;
                let wfx = P.edgeW * u * Math.sign(qx) * qx * qx * 3;
                let wfy = P.edgeW * u * Math.sign(qy) * qy * qy * 3;
                if (wallQ > 0) { turnSideways(wfx, wfy, a); wfx = tx; wfy = ty; }
                fx += wfx; fy += wfy;

                // limit how sharply the head can turn, then smooth the steering over time
                const fm = Math.sqrt(fx * fx + fy * fy);
                const lim = maxF * (1 + 1.2 * wallQ);
                if (fm > lim) { fx = fx / fm * lim; fy = fy / fm * lim; }
                const sm = P.smooth + wallQ * 0.5;      // react faster near a wall
                a.ax += (fx - a.ax) * sm;
                a.ay += (fy - a.ay) * sm;

                let nvx = a.vx + a.ax * k, nvy = a.vy + a.ay * k;

                // flee the cursor
                if (mouse.active) {
                    const dx = x - mouse.x, dy = y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < mR2 && d2 > 0.01) {
                        const d = Math.sqrt(d2);
                        const f = (1 - d / mR) * P.cursorW * u;         // same range and falloff as always: only the strength changed
                        // a push against the direction of travel would only slow the head, so turn it into a sideways bend
                        turnSideways(dx / d * f, dy / d * f, a);
                        let bx = tx, by = ty;
                        const bm = Math.sqrt(bx * bx + by * by), cap = P.cursorMax * u;
                        if (bm > cap) { bx *= cap / bm; by *= cap / bm; }   // limit the bend per frame so the line curves, never kinks
                        const clear = 1 - wallQ;                            // a wall takes priority: the cursor never pushes a head into it
                        nvx += bx * clear * k; nvy += by * clear * k;
                    }
                }

                const sp = Math.sqrt(nvx * nvx + nvy * nvy);
                const brake = 1 - 0.4 * wallQ;                          // ease off near a wall, so the turn is tighter
                const hiS = maxS * a.speedK * brake, loS = minS * a.speedK * brake;     // each line has its own cruising speed
                if (sp > hiS) { nvx = nvx / sp * hiS; nvy = nvy / sp * hiS; }
                else if (sp < loS && sp > 0) { nvx = nvx / sp * loS; nvy = nvy / sp * loS; }
                a.vx = nvx; a.vy = nvy;

                a.x[0] += a.vx * k; a.y[0] += a.vy * k;
                // last-resort safety net (the wall push should turn the head long before this):
                // stop moving outwards instead of bouncing, so the path never makes a hard corner
                if (a.x[0] < 0) { a.x[0] = 0; a.vx = Math.max(a.vx, 0.3 * minS); }
                else if (a.x[0] > W) { a.x[0] = W; a.vx = Math.min(a.vx, -0.3 * minS); }
                if (a.y[0] < 0) { a.y[0] = 0; a.vy = Math.max(a.vy, 0.3 * minS); }
                else if (a.y[0] > H) { a.y[0] = H; a.vy = Math.min(a.vy, -0.3 * minS); }

                // the body is the head's own past: record the new position, then re-lay the letters along it
                recordHead(a);
                layoutLine(a);
                if (!(a.x[0] === a.x[0] && a.y[0] === a.y[0] && a.x[a.n - 1] === a.x[a.n - 1] && a.y[a.n - 1] === a.y[a.n - 1] && a.vx === a.vx && a.vy === a.vy)) respawnLine(a);
            }
        }

        function draw() {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (P.trail < 1) ctx.globalAlpha = P.trail;
            ctx.fillStyle = sqColor;
            ctx.fillRect(0, 0, W, H);
            if (P.trail < 1) ctx.globalAlpha = 1;

            const cw = Math.ceil(gw * dpr), ch = Math.ceil(gh * dpr);
            const hw = -gw / 2, hh = -gh / 2;
            for (let m = 0; m < M; m++) {
                const a = lines[m], X = a.x, Y = a.y, L = a.n, gl = a.glyph;
                for (let j = 0; j < L; j++) {
                    const g = gl[L - 1 - j];            // the last letter leads, so the sentence reads along the direction of travel
                    if (g < 0) continue;
                    const i0 = j > 0 ? j - 1 : 0, i1 = j < L - 1 ? j + 1 : L - 1;
                    // direction of the neighbours gives the rotation directly, no trigonometry needed
                    let dx = X[i0] - X[i1], dy = Y[i0] - Y[i1];
                    const len = Math.sqrt(dx * dx + dy * dy);
                    if (len > 1e-9) { dx /= len; dy /= len; } else { dx = 1; dy = 0; }
                    ctx.setTransform(dx * dpr, dy * dpr, -dy * dpr, dx * dpr, X[j] * dpr, Y[j] * dpr);
                    ctx.drawImage(sheet, g * cw, 0, cw, ch, hw, hh, gw, gh);
                }
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        let last = performance.now();
        function runLoop(now) {
            // the first frame's timestamp can come out slightly earlier than `last`: never let the step go negative or zero
            const k = Math.min(2, Math.max(0.25, (now - last) / 16.667 || 1));
            last = now;
            if (sized && !isPaused()) { step(k, now); draw(); }
            requestAnimationFrame(runLoop);
        }

        function setPointer(e) {
            const r = cv.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
            mouse.active = true;
        }
        cv.addEventListener("pointermove", setPointer);
        cv.addEventListener("pointerdown", setPointer);
        cv.addEventListener("pointerleave", () => { mouse.active = false; });
        cv.addEventListener("pointerup", e => { if (e.pointerType === "touch") mouse.active = false; });
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); buildAtlas(); });

        // the thin font loads after the page: once it is ready, redraw the letters with it
        if (document.fonts && document.fonts.load) {
            document.fonts.load(P.fontWeight + ' 16px "Inter"').then(() => { if (sized) { atlasKey = ""; buildAtlas(); } }).catch(() => {});
        }

        new ResizeObserver(resizeCanvas).observe(cv);
        resizeCanvas();
        requestAnimationFrame(runLoop);
    })();
</script>
```

### Beyond Control: CSS  (`public/styles/animation-css/beyond-control.css`)

```css
/* =====================================
MARK: Beyond Control Animation
Scoped to .beyond-control-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old body styles) ---------- */
/* the whole wrapper is the canvas: the flock turns back at its edges */
.beyond-control-wrapper {
    /* colours read by the script: background and letters */
    --page: var(--color-background, #000000);
    --ink: var(--color-text, #ffffff);

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--page);
}

.beyond-control-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
}
```

---

## 5. Control  (slug: `control`)

### Control: HTML + JavaScript  (`src/animations/control.astro`)

```astro
---

---

<div class="container">
    <div class="animation-section active anim-control">
        <canvas id="c"></canvas>
    </div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Control Animation
    // =====================================
    
    const cv = document.getElementById("c");
    const ctx = cv.getContext("2d");
    const container = cv.closest(".animation-section");
    const SP = 7;
    const G = 5;
    const PI = Math.PI;

    // ---------- Geometry Helper Functions ----------
    const makeLine = (a, b, c, d) => {
        const n = Math.max(2, Math.ceil(Math.hypot(c - a, d - b) / SP));
        return Array.from({ length: n + 1 }, (_, i) => [a + (c - a) * i / n, b + (d - b) * i / n]);
    };

    const makeArc = (cx, cy, r, a0, a1, closed) => {
        const n = Math.max(4, Math.ceil(Math.abs(a1 - a0) * r / SP));
        const m = closed ? n : n + 1;
        return Array.from({ length: m }, (_, i) => {
        const a = a0 + (a1 - a0) * i / n;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
        });
    };

    const makeCurve = (p0, c, p1) => Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        const u = 1 - t;
        return [
        u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0],
        u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]
        ];
    });

    const S = [];
    const addString = (pts, closed, X) => S.push({
        closed: !!closed,
        home: pts.map(p => [p[0] + X, p[1]]),
        o: pts.map(() => [0, 0]),
        v: pts.map(() => [0, 0])
    });

    // ---------- Letter Shape Definitions ----------
    function buildC(X) { for (let i = 0; i < 4; i++) addString(makeArc(50, 50, 50 - i * G, PI / 4, 7 * PI / 4), 0, X); }
    function buildO(X) {
        for (let i = 0; i < 8; i++) {
        const r = 50 - i * 4.5;
        addString(Array.from({ length: 36 }, (_, k) => [50 + r * Math.cos(k * PI / 18), 50 + r * Math.sin(k * PI / 18)]), true, X);
        }
    }
    function buildN(X) {
        for (let i = 0; i < 4; i++) {
        const r = 40 - i * G;
        addString(makeLine(50 - r, 0, 50 - r, 100), 0, X);
        addString(makeArc(50, 50, r, PI, 2 * PI).concat(makeLine(50 + r, 50, 50 + r, 100).slice(1)), 0, X);
        }
    }
    function buildT(X) {
        for (let i = 0; i < 3; i++) {
        addString(makeLine(30 + i * G, -35, 30 + i * G, 100), 0, X);
        addString(makeLine(5, 5 + i * G, 75, 5 + i * G), 0, X);
        }
    }
    function buildR(X) {
        for (let i = 0; i < 4; i++) {
        const x = 10 + i * G;
        addString(makeLine(x, 0, x, 100), 0, X);
        addString(makeCurve([x, 50], [x, i * G], [62, i * G]), 0, X);
        }
    }
    function buildL(X) {
        for (let i = 0; i < 4; i++) addString(makeLine(5 + i * G, -40, 5 + i * G, 100), 0, X);
    }

    const LS = [];
    [[buildC, 0], [buildO, 118], [buildN, 236], [buildT, 354], [buildR, 452], [buildO, 540], [buildL, 658]].forEach(([f, X]) => {
        LS.push(S.length);
        f(X);
    });

    let T = [];
    let all = S.slice();

    // Web connections
    const LINKS = [
        [[0, 0, 1], [1, 0, .625]], [[0, 0, 0], [1, 0, .375]], [[1, 0, .875], [2, 0, 0]], [[1, 0, .125], [2, 0, 1]],
        [[2, 1, 1], [3, 0, 1]], [[2, 1, .5], [3, 1, 0]], [[3, 1, 1], [4, 0, 0]], [[3, 0, 1], [4, 0, 1]],
        [[4, 1, 1], [5, 0, .625]], [[4, 0, 1], [5, 0, .375]], [[5, 0, .875], [6, 0, 0]], [[5, 0, .125], [6, 0, 1]],
        [[0, 0, .5], "L"], [[0, 0, .35], "BL"], [[0, 0, .65], "TL"], [[1, 0, .75], "T"], [[1, 0, .25], "B"],
        [[2, 1, .5], "T"], [[2, 0, 1], "B"], [[3, 0, 0], "T"], [[4, 0, 1], "B"], [[5, 0, .75], "T"], [[5, 0, .25], "B"],
        [[6, 0, 0], "TR"], [[6, 0, 1], "BR"], [[6, 0, .5], "R"]
    ];

    // Ties: stitching strings to neighbors
    const TIES = [];
    const tie = (A, B) => TIES.push([A, B, 1]);
    
    for (const k of [1, 5]) for (let j = 0; j < 7; j++) for (let m = 0; m < 6; m++) tie([k, j, m / 6], [k, j + 1, m / 6]);
    for (let j = 0; j < 3; j++) for (const f of [0, .25, .5, .75, 1]) tie([0, j, f], [0, j + 1, f]);
    for (let j = 0; j < 3; j++) for (const f of [0, .5, 1]) tie([6, j, f], [6, j + 1, f]);
    
    for (let i = 0; i < 4; i++) {
        if (i < 3) for (const f of [0, .5, 1]) {
        tie([2, 2 * i, f], [2, 2 * i + 2, f]);
        tie([2, 2 * i + 1, f], [2, 2 * i + 3, f]);
        tie([4, 2 * i, f], [4, 2 * i + 2, f]);
        tie([4, 2 * i + 1, f], [4, 2 * i + 3, f]);
        }
        tie([2, 2 * i, .5], [2, 2 * i + 1, 0]);
        tie([4, 2 * i, .5], [4, 2 * i + 1, 0]);
    }
    for (let i = 0; i < 3; i++) {
        if (i < 2) for (const f of [0, .5, 1]) {
        tie([3, 2 * i, f], [3, 2 * i + 2, f]);
        tie([3, 2 * i + 1, f], [3, 2 * i + 3, f]);
        }
        tie([3, 2 * i, (40 + i * 5) / 135], [3, 2 * i + 1, (25 + i * 5) / 70]);
    }

    const getAttachment = (k, j, f) => {
        const s = S[LS[k] + j];
        const n = s.home.length;
        return { s, i: Math.min(n - 1, Math.round(f * (s.closed ? n : n - 1))) % n };
    };

    const getCurrentPoint = a => [a.s.home[a.i][0] + a.s.o[a.i][0], a.s.home[a.i][1] + a.s.o[a.i][1]];
    const getEdgePoint = (e, h) => [e.includes("L") ? EL : e.includes("R") ? ER : h[0], e.includes("T") ? ET : e.includes("B") ? EB : h[1]];

    function buildTethers() {
        T = LINKS.concat(TIES).map(([A, B, w]) => {
        const a = getAttachment(...A);
        const b = typeof B === "string" ? { edge: B } : getAttachment(...B);
        const p = a.s.home[a.i];
        const q = b.edge ? getEdgePoint(b.edge, p) : b.s.home[b.i];
        const n = Math.max(6, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / 9));
        const makeZeros = () => Array.from({ length: n }, () => [0, 0]);
        return { a, b, kt: w ? .03 : .006, tie: !!w, closed: false, home: makeZeros(), o: makeZeros(), v: makeZeros() };
        });
        all = S.concat(T);
        grab = null;
    }

    const W_U = 683, TOP = -40, BOT = 100;

    // ---------- Layout State ----------
    let sc = 1, ox = 0, oy = 0, ink = "#ece9e1", bg = "#121212";
    let hot = null, grab = null, mx = 0, my = 0;
    let EL = 0, ER = 0, ET = 0, EB = 0;
    let RW = 0, RH = 0;
    let idleTime = 0; // Time for the idle animation

    function resizeCanvas() {
        const d = devicePixelRatio || 1;
        const w = container.clientWidth || cv.clientWidth;
        const h = container.clientHeight || cv.clientHeight;
        if (!w || !h) return;
        
        RW = w;
        RH = h;
        cv.width = w * d;
        cv.height = h * d;
        ctx.setTransform(d, 0, 0, d, 0, 0);
        
        sc = Math.min(w * .92 / W_U, h * .72 / (BOT - TOP));
        ox = (w - W_U * sc) / 2;
        oy = h / 2 - (TOP + BOT) / 2 * sc;
        
        // Read the CSS variables directly
        const rootStyles = getComputedStyle(document.documentElement);
        ink = rootStyles.getPropertyValue("--text").trim() || rootStyles.getPropertyValue("--color-text").trim() || "#ece9e1";
        bg = rootStyles.getPropertyValue("--bg").trim() || rootStyles.getPropertyValue("--color-background").trim() || "#121212";
        
        EL = -ox / sc;
        ER = (w - ox) / sc;
        ET = -oy / sc;
        EB = (h - oy) / sc;
        
        buildTethers();
    }

    addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ---------- Interaction Handling ----------
    const getPointerPosition = e => {
        const r = cv.getBoundingClientRect();
        return [e.clientX - r.left, e.clientY - r.top];
    };

    function findNearest(px, py, rad) {
        let best = null, bd = rad * rad;
        for (const s of all) {
        for (let i = 0; i < s.home.length; i++) {
            const x = ox + (s.home[i][0] + s.o[i][0]) * sc - px;
            const y = oy + (s.home[i][1] + s.o[i][1]) * sc - py;
            const d = x * x + y * y;
            if (d < bd) {
            bd = d;
            best = { s, i };
            }
        }
        }
        return best;
    }

    cv.addEventListener("pointerdown", e => {
        [mx, my] = getPointerPosition(e);
        grab = findNearest(mx, my, 30);
        if (grab) {
        hot = grab.s;
        cv.setPointerCapture(e.pointerId);
        cv.style.cursor = "grabbing";
        }
    });

    cv.addEventListener("pointermove", e => {
        [mx, my] = getPointerPosition(e);
        if (!grab) {
        const q = findNearest(mx, my, 30);
        hot = q && q.s;
        cv.style.cursor = q ? "grab" : "default";
        }
    });

    const releaseGrab = () => {
        grab = null;
        hot = null;
        cv.style.cursor = "default";
    };
    cv.addEventListener("pointerup", releaseGrab);
    cv.addEventListener("pointercancel", releaseGrab);

    // ---------- Physics: Spring-to-Home + Neighbor Coupling ----------
    const K = .012, C = .45, D = .03;
    function step() {
        idleTime += 0.02; // Advance the animation time every frame

        for (const t of T) {
        const p = getCurrentPoint(t.a);
        const q = t.b.edge ? getEdgePoint(t.b.edge, t.a.s.home[t.a.i]) : getCurrentPoint(t.b);
        const n = t.home.length;
        for (let j = 0; j < n; j++) {
            const u = j / (n - 1);
            t.home[j][0] = p[0] + (q[0] - p[0]) * u;
            t.home[j][1] = p[1] + (q[1] - p[1]) * u;
        }
        }
        
        for (const s of all) {
        const n = s.o.length, o = s.o, v = s.v;
        for (let i = 0; i < n; i++) {
            const a = s.closed ? o[(i + n - 1) % n] : o[Math.max(i - 1, 0)];
            const b = s.closed ? o[(i + 1) % n] : o[Math.min(i + 1, n - 1)];

            // Safe wave motion: subtly shift the rest point (target) instead of pushing the points
            const targetX = Math.sin(idleTime + s.home[i][1] * 0.05) * 4;
            const targetY = Math.cos(idleTime * 0.8 + s.home[i][0] * 0.05) * 4;

            v[i][0] += -K * (o[i][0] - targetX) + C * (a[0] + b[0] - 2 * o[i][0]) - D * v[i][0];
            v[i][1] += -K * (o[i][1] - targetY) + C * (a[1] + b[1] - 2 * o[i][1]) - D * v[i][1];
        }
        for (let i = 0; i < n; i++) {
            o[i][0] += v[i][0];
            o[i][1] += v[i][1];
        }
        }
        
        for (const t of T) {
        const n = t.o.length;
        if (t.a.s && t.b.s) {
            for (let k = 0; k < 2; k++) {
            const d = t.b.s.o[t.b.i][k] - t.a.s.o[t.a.i][k];
            t.a.s.v[t.a.i][k] += t.kt * d;
            t.b.s.v[t.b.i][k] -= t.kt * d;
            }
        }
        for (const e of [[t.a, 1], [t.b, n - 2]]) {
            if (e[0].s) {
            for (let k = 0; k < 2; k++) e[0].s.v[e[0].i][k] += .12 * t.o[e[1]][k];
            }
        }
        t.o[0][0] = t.o[0][1] = t.o[n - 1][0] = t.o[n - 1][1] = 0;
        t.v[0][0] = t.v[0][1] = t.v[n - 1][0] = t.v[n - 1][1] = 0;
        }
        
        if (grab) {
        const { s, i } = grab;
        s.o[i][0] = (mx - ox) / sc - s.home[i][0];
        s.o[i][1] = (my - oy) / sc - s.home[i][1];
        s.v[i][0] = s.v[i][1] = 0;
        }
    }

    // ---------- Rendering ----------
    function draw() {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, RW, RH);
        
        ctx.strokeStyle = ink;
        const base = Math.max(.9, sc * .4);
        ctx.lineJoin = ctx.lineCap = "round";
        
        for (const s of all) {
        let w = base, al = 1;
        if (s.a) {
            if (s.tie) { w = base * .55; al = .6; }
            else { w = base * .7; al = .8; }
        }
        if (s === hot) { w = base * 2; al = 1; }
        
        ctx.lineWidth = w;
        ctx.globalAlpha = al;
        
        const n = s.home.length;
        const getPoint = i => [ox + (s.home[i][0] + s.o[i][0]) * sc, oy + (s.home[i][1] + s.o[i][1]) * sc];
        
        ctx.beginPath();
        if (s.closed) {
            let a = getPoint(n - 1), b = getPoint(0);
            ctx.moveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
            for (let i = 0; i < n; i++) {
            const p = getPoint(i), q = getPoint((i + 1) % n);
            ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
            }
            ctx.closePath();
        } else {
            let p = getPoint(0);
            ctx.moveTo(p[0], p[1]);
            for (let i = 1; i < n - 1; i++) {
            const a = getPoint(i), b = getPoint(i + 1);
            ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
            }
            p = getPoint(n - 1);
            ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
        }
        
        // Knots where the web is tied to a letter
        ctx.globalAlpha = 1;
        ctx.lineWidth = base * .9;
        ctx.fillStyle = bg;
        for (const t of T) {
        if (!t.tie) {
            for (const e of [t.a, t.b]) {
            if (e.s) {
                const p = getCurrentPoint(e);
                ctx.beginPath();
                ctx.arc(ox + p[0] * sc, oy + p[1] * sc, Math.max(2, sc * .8), 0, 6.2832);
                ctx.fill();
                ctx.stroke();
            }
            }
        }
        }
    }

    function drawFrame() {
        if ((container.clientWidth && container.clientWidth !== RW) || (container.clientHeight && container.clientHeight !== RH) || !RW) resizeCanvas();
        if (!RW) {
        requestAnimationFrame(drawFrame);
        return;
        }
        step();
        step();
        draw();
        requestAnimationFrame(drawFrame);
    }
    
    drawFrame();
</script>
```

### Control: CSS  (`public/styles/animation-css/control.css`)

```css
@layer components, utilities;

/* =====================================
MARK: Control Animation
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
        background-color: var(--bg, #121212);
        color: var(--text, #ece9e1);
        overflow: hidden;
    }

    .anim-control {
        height: 100%;

        /* Base colours */
        --bg: #121212;
        --text: #ece9e1;
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
    .anim-control canvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
    }
}
```

---

## 6. Cybernetics  (slug: `cybernetics`)

### Cybernetics: HTML + JavaScript  (`src/animations/cybernetics.astro`)

```astro
---

---

<!-- ===================================== -->
<!-- MARK: Cybernetics Animation           -->
<!-- ===================================== -->
<!-- Information transfer 15: wires running into three circles; the last one spells cybernetics, with beads running along them -->
<div class="cybernetics-wrapper">
  <svg class="cybernetics-svg" id="cybernetics-svg" viewBox="0 0 3000 3000">
    <defs>
        <g id="b1">
          <path d="M -160 756 L 40 756 A 96 96 0 0 0 136 660 L 136 620 A 24 24 0 0 1 160 596 L 260 596 A 24 24 0 0 1 284 620 L 284 660 A 96 96 0 0 0 380 756 L 720 756"/>
          <path d="M -160 732 L 40 732 A 72 72 0 0 0 112 660 L 112 620 A 48 48 0 0 1 160 572 L 260 572 A 48 48 0 0 1 308 620 L 308 660 A 72 72 0 0 0 380 732 L 720 732"/>
          <path d="M -160 708 L 40 708 A 48 48 0 0 0 88 660 L 88 620 A 72 72 0 0 1 160 548 L 260 548 A 72 72 0 0 1 332 620 L 332 660 A 48 48 0 0 0 380 708 L 720 708"/>
          <path d="M -160 684 L 40 684 A 24 24 0 0 0 64 660 L 64 620 A 96 96 0 0 1 160 524 L 260 524 A 96 96 0 0 1 356 620 L 356 660 A 24 24 0 0 0 380 684 L 720 684"/>
        </g>
        <g id="b2">
          <path d="M 668 -160 L 668 0 A 38 38 0 0 1 630 38 L 570 38 A 62 62 0 0 0 508 100 L 508 200 A 62 62 0 0 0 570 262 L 630 262 A 38 38 0 0 1 668 300 L 668 720"/>
          <path d="M 692 -160 L 692 0 A 62 62 0 0 1 630 62 L 570 62 A 38 38 0 0 0 532 100 L 532 200 A 38 38 0 0 0 570 238 L 630 238 A 62 62 0 0 1 692 300 L 692 720"/>
        </g>
        <g id="b3">
          <path d="M 768 -160 L 768 0 A 62 62 0 0 0 830 62 L 890 62 A 38 38 0 0 1 928 100 L 928 200 A 38 38 0 0 1 890 238 L 830 238 A 62 62 0 0 0 768 300 L 768 720"/>
          <path d="M 792 -160 L 792 0 A 38 38 0 0 0 830 38 L 890 38 A 62 62 0 0 1 952 100 L 952 200 A 62 62 0 0 1 890 262 L 830 262 A 38 38 0 0 0 792 300 L 792 720"/>
        </g>
        <g id="b4">
          <path d="M 1128 -160 L 1128 40 A 28 28 0 0 1 1100 68 L 1100 68 A 52 52 0 0 0 1048 120 L 1048 200 A 52 52 0 0 0 1100 252 L 1100 252 A 28 28 0 0 1 1128 280 L 1128 460 A 88 88 0 0 1 1040 548 L 640 548"/>
          <path d="M 1152 -160 L 1152 40 A 52 52 0 0 1 1100 92 L 1100 92 A 28 28 0 0 0 1072 120 L 1072 200 A 28 28 0 0 0 1100 228 L 1100 228 A 52 52 0 0 1 1152 280 L 1152 460 A 112 112 0 0 1 1040 572 L 640 572"/>
        </g>
        <g id="b5">
          <path d="M -160 1204 L 40 1204 A 36 36 0 0 1 76 1240 L 76 1300 A 84 84 0 0 0 160 1384 L 280 1384 A 84 84 0 0 0 364 1300 L 364 1240 A 36 36 0 0 1 400 1204 L 600 1204 A 144 144 0 0 0 744 1060 L 744 720"/>
          <path d="M -160 1180 L 40 1180 A 60 60 0 0 1 100 1240 L 100 1300 A 60 60 0 0 0 160 1360 L 280 1360 A 60 60 0 0 0 340 1300 L 340 1240 A 60 60 0 0 1 400 1180 L 600 1180 A 120 120 0 0 0 720 1060 L 720 720"/>
          <path d="M -160 1156 L 40 1156 A 84 84 0 0 1 124 1240 L 124 1300 A 36 36 0 0 0 160 1336 L 280 1336 A 36 36 0 0 0 316 1300 L 316 1240 A 84 84 0 0 1 400 1156 L 600 1156 A 96 96 0 0 0 696 1060 L 696 720"/>
        </g>
        <g id="b6">
          <path d="M 720 756 L 1060 756 A 44 44 0 0 1 1104 800 L 1104 840 A 116 116 0 0 0 1220 956 L 1380 956 A 116 116 0 0 0 1496 840 L 1496 800 A 44 44 0 0 1 1540 756 L 1760 756 A 124 124 0 0 1 1884 880 L 1884 1320"/>
          <path d="M 720 732 L 1060 732 A 68 68 0 0 1 1128 800 L 1128 840 A 92 92 0 0 0 1220 932 L 1380 932 A 92 92 0 0 0 1472 840 L 1472 800 A 68 68 0 0 1 1540 732 L 1760 732 A 148 148 0 0 1 1908 880 L 1908 1320"/>
          <path d="M 720 708 L 1060 708 A 92 92 0 0 1 1152 800 L 1152 840 A 68 68 0 0 0 1220 908 L 1380 908 A 68 68 0 0 0 1448 840 L 1448 800 A 92 92 0 0 1 1540 708 L 1760 708 A 172 172 0 0 1 1932 880 L 1932 1320"/>
          <path d="M 720 684 L 1060 684 A 116 116 0 0 1 1176 800 L 1176 840 A 44 44 0 0 0 1220 884 L 1380 884 A 44 44 0 0 0 1424 840 L 1424 800 A 116 116 0 0 1 1540 684 L 1760 684 A 196 196 0 0 1 1956 880 L 1956 1320"/>
        </g>
        <g id="b7">
          <path d="M 2348 -160 L 2348 540 A 92 92 0 0 0 2440 632 L 2480 632 A 68 68 0 0 1 2548 700 L 2548 860 A 68 68 0 0 1 2480 928 L 2440 928 A 92 92 0 0 0 2348 1020 L 2348 1140 A 108 108 0 0 1 2240 1248 L 1920 1248"/>
          <path d="M 2372 -160 L 2372 540 A 68 68 0 0 0 2440 608 L 2480 608 A 92 92 0 0 1 2572 700 L 2572 860 A 92 92 0 0 1 2480 952 L 2440 952 A 68 68 0 0 0 2372 1020 L 2372 1140 A 132 132 0 0 1 2240 1272 L 1920 1272"/>
        </g>
        <g id="b8">
          <path d="M 3160 1416 L 2740 1416 A 94 94 0 0 0 2646 1510 L 2646 1570 A 46 46 0 0 1 2600 1616 L 2440 1616 A 46 46 0 0 1 2394 1570 L 2394 1510 A 94 94 0 0 0 2300 1416 L 1920 1416"/>
          <path d="M 3160 1440 L 2740 1440 A 70 70 0 0 0 2670 1510 L 2670 1570 A 70 70 0 0 1 2600 1640 L 2440 1640 A 70 70 0 0 1 2370 1570 L 2370 1510 A 70 70 0 0 0 2300 1440 L 1920 1440"/>
          <path d="M 3160 1464 L 2740 1464 A 46 46 0 0 0 2694 1510 L 2694 1570 A 94 94 0 0 1 2600 1664 L 2440 1664 A 94 94 0 0 1 2346 1570 L 2346 1510 A 46 46 0 0 0 2300 1464 L 1920 1464"/>
        </g>
        <g id="b9">
          <path d="M -160 1584 L 40 1584 A 16 16 0 0 1 56 1600 L 56 1640 A 64 64 0 0 0 120 1704 L 240 1704 A 64 64 0 0 0 304 1640 L 304 1600 A 16 16 0 0 1 320 1584 L 740 1584 A 144 144 0 0 0 884 1440 A 96 96 0 0 1 980 1344 L 1200 1344 A 36 36 0 0 1 1236 1380 L 1236 1420 A 84 84 0 0 0 1320 1504 L 1480 1504 A 84 84 0 0 0 1564 1420 L 1564 1380 A 36 36 0 0 1 1600 1344 L 1920 1344"/>
          <path d="M -160 1560 L 40 1560 A 40 40 0 0 1 80 1600 L 80 1640 A 40 40 0 0 0 120 1680 L 240 1680 A 40 40 0 0 0 280 1640 L 280 1600 A 40 40 0 0 1 320 1560 L 740 1560 A 120 120 0 0 0 860 1440 A 120 120 0 0 1 980 1320 L 1200 1320 A 60 60 0 0 1 1260 1380 L 1260 1420 A 60 60 0 0 0 1320 1480 L 1480 1480 A 60 60 0 0 0 1540 1420 L 1540 1380 A 60 60 0 0 1 1600 1320 L 1920 1320"/>
          <path d="M -160 1536 L 40 1536 A 64 64 0 0 1 104 1600 L 104 1640 A 16 16 0 0 0 120 1656 L 240 1656 A 16 16 0 0 0 256 1640 L 256 1600 A 64 64 0 0 1 320 1536 L 740 1536 A 96 96 0 0 0 836 1440 A 144 144 0 0 1 980 1296 L 1200 1296 A 84 84 0 0 1 1284 1380 L 1284 1420 A 36 36 0 0 0 1320 1456 L 1480 1456 A 36 36 0 0 0 1516 1420 L 1516 1380 A 84 84 0 0 1 1600 1296 L 1920 1296"/>
        </g>
        <g id="b10">
          <path d="M 1872 1320 L 1872 1640 A 118 118 0 0 0 1990 1758 L 2030 1758 A 22 22 0 0 1 2052 1780 L 2052 1880 A 22 22 0 0 1 2030 1902 L 1990 1902 A 118 118 0 0 0 1872 2020 L 1872 2120 A 152 152 0 0 1 1720 2272 L 1220 2272"/>
          <path d="M 1896 1320 L 1896 1640 A 94 94 0 0 0 1990 1734 L 2030 1734 A 46 46 0 0 1 2076 1780 L 2076 1880 A 46 46 0 0 1 2030 1926 L 1990 1926 A 94 94 0 0 0 1896 2020 L 1896 2120 A 176 176 0 0 1 1720 2296 L 1220 2296"/>
          <path d="M 1920 1320 L 1920 1640 A 70 70 0 0 0 1990 1710 L 2030 1710 A 70 70 0 0 1 2100 1780 L 2100 1880 A 70 70 0 0 1 2030 1950 L 1990 1950 A 70 70 0 0 0 1920 2020 L 1920 2120 A 200 200 0 0 1 1720 2320 L 1220 2320"/>
          <path d="M 1944 1320 L 1944 1640 A 46 46 0 0 0 1990 1686 L 2030 1686 A 94 94 0 0 1 2124 1780 L 2124 1880 A 94 94 0 0 1 2030 1974 L 1990 1974 A 46 46 0 0 0 1944 2020 L 1944 2120 A 224 224 0 0 1 1720 2344 L 1220 2344"/>
          <path d="M 1968 1320 L 1968 1640 A 22 22 0 0 0 1990 1662 L 2030 1662 A 118 118 0 0 1 2148 1780 L 2148 1880 A 118 118 0 0 1 2030 1998 L 1990 1998 A 22 22 0 0 0 1968 2020 L 1968 2120 A 248 248 0 0 1 1720 2368 L 1220 2368"/>
        </g>
        <g id="b11">
          <path d="M -160 1824 L 140 1824 A 36 36 0 0 1 176 1860 L 176 1900 A 84 84 0 0 0 260 1984 L 420 1984 A 84 84 0 0 0 504 1900 L 504 1860 A 36 36 0 0 1 540 1824 L 1100 1824 A 96 96 0 0 1 1196 1920 L 1196 2320"/>
          <path d="M -160 1800 L 140 1800 A 60 60 0 0 1 200 1860 L 200 1900 A 60 60 0 0 0 260 1960 L 420 1960 A 60 60 0 0 0 480 1900 L 480 1860 A 60 60 0 0 1 540 1800 L 1100 1800 A 120 120 0 0 1 1220 1920 L 1220 2320"/>
          <path d="M -160 1776 L 140 1776 A 84 84 0 0 1 224 1860 L 224 1900 A 36 36 0 0 0 260 1936 L 420 1936 A 36 36 0 0 0 456 1900 L 456 1860 A 84 84 0 0 1 540 1776 L 1100 1776 A 144 144 0 0 1 1244 1920 L 1244 2320"/>
        </g>
        <g id="b12">
          <path d="M -160 2356 L 440 2356 A 24 24 0 0 1 464 2380 L 464 2420 A 96 96 0 0 0 560 2516 L 680 2516 A 96 96 0 0 0 776 2420 L 776 2380 A 24 24 0 0 1 800 2356 L 1220 2356"/>
          <path d="M -160 2332 L 440 2332 A 48 48 0 0 1 488 2380 L 488 2420 A 72 72 0 0 0 560 2492 L 680 2492 A 72 72 0 0 0 752 2420 L 752 2380 A 48 48 0 0 1 800 2332 L 1220 2332"/>
          <path d="M -160 2308 L 440 2308 A 72 72 0 0 1 512 2380 L 512 2420 A 48 48 0 0 0 560 2468 L 680 2468 A 48 48 0 0 0 728 2420 L 728 2380 A 72 72 0 0 1 800 2308 L 1220 2308"/>
          <path d="M -160 2284 L 440 2284 A 96 96 0 0 1 536 2380 L 536 2420 A 24 24 0 0 0 560 2444 L 680 2444 A 24 24 0 0 0 704 2420 L 704 2380 A 96 96 0 0 1 800 2284 L 1220 2284"/>
        </g>
        <g id="b13">
          <path d="M 1264 -160 L 1264 400 A 156 156 0 0 0 1420 556 L 1680 556 A 156 156 0 0 0 1836 400 L 1836 -120"/>
          <path d="M 1288 -160 L 1288 400 A 132 132 0 0 0 1420 532 L 1680 532 A 132 132 0 0 0 1812 400 L 1812 -120"/>
          <path d="M 1312 -160 L 1312 400 A 108 108 0 0 0 1420 508 L 1680 508 A 108 108 0 0 0 1788 400 L 1788 -120"/>
          <path d="M 1336 -160 L 1336 400 A 84 84 0 0 0 1420 484 L 1680 484 A 84 84 0 0 0 1764 400 L 1764 -120"/>
        </g>
        <g id="b14">
          <path d="M 2616 -160 L 2616 400 A 164 164 0 0 0 2780 564 L 3120 564"/>
          <path d="M 2640 -160 L 2640 400 A 140 140 0 0 0 2780 540 L 3120 540"/>
          <path d="M 2664 -160 L 2664 400 A 116 116 0 0 0 2780 516 L 3120 516"/>
        </g>
        <g id="b15">
          <path d="M 3160 1836 L 2600 1836 A 164 164 0 0 0 2436 2000 L 2436 2160 A 164 164 0 0 0 2600 2324 L 3120 2324"/>
          <path d="M 3160 1860 L 2600 1860 A 140 140 0 0 0 2460 2000 L 2460 2160 A 140 140 0 0 0 2600 2300 L 3120 2300"/>
          <path d="M 3160 1884 L 2600 1884 A 116 116 0 0 0 2484 2000 L 2484 2160 A 116 116 0 0 0 2600 2276 L 3120 2276"/>
        </g>
        <g id="b16">
          <path d="M -160 2724 L 460 2724 A 116 116 0 0 1 576 2840 L 576 3120"/>
          <path d="M -160 2700 L 460 2700 A 140 140 0 0 1 600 2840 L 600 3120"/>
          <path d="M -160 2676 L 460 2676 A 164 164 0 0 1 624 2840 L 624 3120"/>
        </g>
        <g id="b17">
          <path d="M 1258 2400 L 1258 2634 A 24 24 0 0 1 1234 2658 L 1196 2658 A 48 48 0 0 0 1148 2706 L 1148 2814 A 48 48 0 0 0 1196 2862 L 1438 2862"/>
          <path d="M 1282 2400 L 1282 2634 A 48 48 0 0 1 1234 2682 L 1196 2682 A 24 24 0 0 0 1172 2706 L 1172 2814 A 24 24 0 0 0 1196 2838 L 1438 2838"/>
          <path d="M 1328 2670 L 1328 2838"/>
          <path d="M 1352 2670 L 1352 2838"/>
          <path d="M 1438 2670 L 1438 2944 A 24 24 0 0 1 1414 2968 L 1340 2968"/>
          <path d="M 1462 2670 L 1462 2944 A 48 48 0 0 1 1414 2992 L 1340 2992"/>
          <path d="M 1508 2550 L 1508 2814 A 48 48 0 0 0 1556 2862 L 1594 2862 A 48 48 0 0 0 1642 2814 L 1642 2706 A 48 48 0 0 0 1594 2658 L 1532 2658"/>
          <path d="M 1532 2550 L 1532 2814 A 24 24 0 0 0 1556 2838 L 1594 2838 A 24 24 0 0 0 1618 2814 L 1618 2706 A 24 24 0 0 0 1594 2682 L 1532 2682"/>
          <path d="M 1712 2772 L 1774 2772 A 48 48 0 0 0 1822 2724 L 1822 2706 A 48 48 0 0 0 1774 2658 L 1736 2658 A 48 48 0 0 0 1688 2706 L 1688 2814 A 48 48 0 0 0 1736 2862 L 1844 2862 A 48 48 0 0 0 1892 2814 L 1892 2706 A 24 24 0 0 1 1916 2682 L 1960 2682"/>
          <path d="M 1712 2748 L 1774 2748 A 24 24 0 0 0 1798 2724 L 1798 2706 A 24 24 0 0 0 1774 2682 L 1736 2682 A 24 24 0 0 0 1712 2706 L 1712 2814 A 24 24 0 0 0 1736 2838 L 1844 2838 A 24 24 0 0 0 1868 2814 L 1868 2704 A 46 46 0 0 1 1914 2658 L 1960 2658"/>
          <path d="M 2042 2850 L 2042 2706 A 24 24 0 0 1 2066 2682 L 2104 2682 A 24 24 0 0 1 2128 2706 L 2128 2850"/>
          <path d="M 2018 2850 L 2018 2706 A 48 48 0 0 1 2066 2658 L 2104 2658 A 48 48 0 0 1 2152 2706 L 2152 2850"/>
          <path d="M 2222 2772 L 2284 2772 A 48 48 0 0 0 2332 2724 L 2332 2706 A 48 48 0 0 0 2284 2658 L 2246 2658 A 48 48 0 0 0 2198 2706 L 2198 2814 A 48 48 0 0 0 2246 2862 L 2390 2862 A 48 48 0 0 0 2438 2814 L 2438 2580"/>
          <path d="M 2222 2748 L 2284 2748 A 24 24 0 0 0 2308 2724 L 2308 2706 A 24 24 0 0 0 2284 2682 L 2246 2682 A 24 24 0 0 0 2222 2706 L 2222 2814 A 24 24 0 0 0 2246 2838 L 2390 2838 A 24 24 0 0 0 2414 2814 L 2414 2580"/>
          <path d="M 2380 2682 L 2480 2682"/>
          <path d="M 2380 2658 L 2480 2658"/>
          <path d="M 2730 2658 L 2656 2658 A 48 48 0 0 0 2608 2706 L 2608 2838"/>
          <path d="M 2730 2682 L 2656 2682 A 24 24 0 0 0 2632 2706 L 2632 2838"/>
          <path d="M 2538 2670 L 2538 2814 A 48 48 0 0 0 2586 2862 L 2874 2862 A 48 48 0 0 0 2922 2814 L 2922 2796 A 48 48 0 0 0 2874 2748 L 2836 2748 A 24 24 0 0 1 2812 2724 L 2812 2706 A 24 24 0 0 1 2836 2682 L 2910 2682 L 3160 2682"/>
          <path d="M 2562 2670 L 2562 2814 A 24 24 0 0 0 2586 2838 L 2874 2838 A 24 24 0 0 0 2898 2814 L 2898 2796 A 24 24 0 0 0 2874 2772 L 2836 2772 A 48 48 0 0 1 2788 2724 L 2788 2706 A 48 48 0 0 1 2836 2658 L 2910 2658 L 3160 2658"/>
        </g>
        <g id="b19">
          <path d="M 1996 -160 L 1996 240 A 84 84 0 0 0 2080 324 L 2090 324 A 36 36 0 0 1 2126 360 L 2126 540 A 36 36 0 0 1 2090 576 L 2080 576 A 84 84 0 0 0 1996 660 L 1996 1320"/>
          <path d="M 2020 -160 L 2020 240 A 60 60 0 0 0 2080 300 L 2090 300 A 60 60 0 0 1 2150 360 L 2150 540 A 60 60 0 0 1 2090 600 L 2080 600 A 60 60 0 0 0 2020 660 L 2020 1320"/>
          <path d="M 2044 -160 L 2044 240 A 36 36 0 0 0 2080 276 L 2090 276 A 84 84 0 0 1 2174 360 L 2174 540 A 84 84 0 0 1 2090 624 L 2080 624 A 36 36 0 0 0 2044 660 L 2044 1320"/>
        </g>
        <g id="b20">
          <path d="M -160 2224 L 520 2224 A 64 64 0 0 0 584 2160 L 584 2160 A 16 16 0 0 1 600 2144 L 1220 2144"/>
          <path d="M -160 2200 L 520 2200 A 40 40 0 0 0 560 2160 L 560 2160 A 40 40 0 0 1 600 2120 L 1220 2120"/>
          <path d="M -160 2176 L 520 2176 A 16 16 0 0 0 536 2160 L 536 2160 A 64 64 0 0 1 600 2096 L 1220 2096"/>
        </g>
        <g id="b21">
          <path d="M 3160 204 L 3000 204 A 64 64 0 0 1 2936 140 L 2936 -160"/>
          <path d="M 3160 228 L 3000 228 A 88 88 0 0 1 2912 140 L 2912 -160"/>
          <path d="M 3160 252 L 3000 252 A 112 112 0 0 1 2888 140 L 2888 -160"/>
          <path d="M 3160 276 L 3000 276 A 136 136 0 0 1 2864 140 L 2864 -160"/>
        </g>
        <g id="b22">
          <path d="M -160 1094 L 1236 1094 A 40 40 0 0 1 1276 1134 L 1276 1136 A 88 88 0 0 0 1364 1224 L 1920 1224"/>
          <path d="M -160 1070 L 1236 1070 A 64 64 0 0 1 1300 1134 L 1300 1136 A 64 64 0 0 0 1364 1200 L 1920 1200"/>
          <path d="M -160 1046 L 1236 1046 A 88 88 0 0 1 1324 1134 L 1324 1136 A 40 40 0 0 0 1364 1176 L 1920 1176"/>
        </g>
        <g id="b23">
          <path d="M -160 2924 L 210 2924 A 66 66 0 0 1 276 2990 L 276 3160"/>
          <path d="M -160 2900 L 210 2900 A 90 90 0 0 1 300 2990 L 300 3160"/>
          <path d="M -160 2876 L 210 2876 A 114 114 0 0 1 324 2990 L 324 3160"/>
        </g>
        <g id="b24">
          <path d="M 1006 2320 L 1006 2636 A 40 40 0 0 1 966 2676 L 964 2676 A 88 88 0 0 0 876 2764 L 876 2796 A 88 88 0 0 0 964 2884 L 966 2884 A 40 40 0 0 1 1006 2924 L 1006 3160"/>
          <path d="M 1030 2320 L 1030 2636 A 64 64 0 0 1 966 2700 L 964 2700 A 64 64 0 0 0 900 2764 L 900 2796 A 64 64 0 0 0 964 2860 L 966 2860 A 64 64 0 0 1 1030 2924 L 1030 3160"/>
          <path d="M 1054 2320 L 1054 2636 A 88 88 0 0 1 966 2724 L 964 2724 A 40 40 0 0 0 924 2764 L 924 2796 A 40 40 0 0 0 964 2836 L 966 2836 A 88 88 0 0 1 1054 2924 L 1054 3160"/>
        </g>
        <g id="b25">
          <path d="M 3160 1126 L 2770 1126 A 94 94 0 0 0 2676 1220 L 2676 1270 A 46 46 0 0 1 2630 1316 L 1920 1316"/>
          <path d="M 3160 1150 L 2770 1150 A 70 70 0 0 0 2700 1220 L 2700 1270 A 70 70 0 0 1 2630 1340 L 1920 1340"/>
          <path d="M 3160 1174 L 2770 1174 A 46 46 0 0 0 2724 1220 L 2724 1270 A 94 94 0 0 1 2630 1364 L 1920 1364"/>
        </g>
        <g id="b27">
          <path d="M 3160 736 L 2904 736 A 108 108 0 0 0 2796 844 L 2796 956 A 60 60 0 0 1 2736 1016 L 2204 1016 A 108 108 0 0 0 2096 1124 L 2096 1320"/>
          <path d="M 3160 760 L 2904 760 A 84 84 0 0 0 2820 844 L 2820 956 A 84 84 0 0 1 2736 1040 L 2204 1040 A 84 84 0 0 0 2120 1124 L 2120 1320"/>
          <path d="M 3160 784 L 2904 784 A 60 60 0 0 0 2844 844 L 2844 956 A 108 108 0 0 1 2736 1064 L 2204 1064 A 60 60 0 0 0 2144 1124 L 2144 1320"/>
        </g>
        <g id="b28">
          <path d="M -160 2592 L 408 2592 A 64 64 0 0 0 472 2528 L 472 2292 A 40 40 0 0 1 512 2252 L 756 2252 A 40 40 0 0 1 796 2292 L 796 2360 A 64 64 0 0 0 860 2424 L 1220 2424"/>
          <path d="M -160 2568 L 408 2568 A 40 40 0 0 0 448 2528 L 448 2292 A 64 64 0 0 1 512 2228 L 756 2228 A 64 64 0 0 1 820 2292 L 820 2360 A 40 40 0 0 0 860 2400 L 1220 2400"/>
        </g>
        <g id="b29">
          <path d="M 2436 -160 L 2436 344 A 64 64 0 0 1 2372 408 L 2280 408 A 112 112 0 0 0 2168 520 L 2168 712 A 64 64 0 0 1 2104 776 L 1912 776 A 112 112 0 0 0 1800 888 L 1800 1320"/>
          <path d="M 2460 -160 L 2460 344 A 88 88 0 0 1 2372 432 L 2280 432 A 88 88 0 0 0 2192 520 L 2192 712 A 88 88 0 0 1 2104 800 L 1912 800 A 88 88 0 0 0 1824 888 L 1824 1320"/>
          <path d="M 2484 -160 L 2484 344 A 112 112 0 0 1 2372 456 L 2280 456 A 64 64 0 0 0 2216 520 L 2216 712 A 112 112 0 0 1 2104 824 L 1912 824 A 64 64 0 0 0 1848 888 L 1848 1320"/>
        </g>
        <g id="b31">
          <path d="M 828 -160 L 828 324 A 124 124 0 0 0 952 448 L 1152 448 A 100 100 0 0 1 1252 548 L 1252 824 A 124 124 0 0 0 1376 948 L 1504 948 A 100 100 0 0 1 1604 1048 L 1604 1496 A 100 100 0 0 1 1504 1596 L 1248 1596 A 124 124 0 0 0 1124 1720 L 1124 2320"/>
          <path d="M 852 -160 L 852 324 A 100 100 0 0 0 952 424 L 1152 424 A 124 124 0 0 1 1276 548 L 1276 824 A 100 100 0 0 0 1376 924 L 1504 924 A 124 124 0 0 1 1628 1048 L 1628 1496 A 124 124 0 0 1 1504 1620 L 1248 1620 A 100 100 0 0 0 1148 1720 L 1148 2320"/>
        </g>
        <g id="b33">
          <path d="M 2724 -160 L 2724 192 A 88 88 0 0 1 2636 280 L 2544 280 A 112 112 0 0 0 2432 392 L 2432 1920 A 88 88 0 0 1 2344 2008 L 1440 2008 A 112 112 0 0 0 1328 2120 L 1328 2320"/>
          <path d="M 2748 -160 L 2748 192 A 112 112 0 0 1 2636 304 L 2544 304 A 88 88 0 0 0 2456 392 L 2456 1920 A 112 112 0 0 1 2344 2032 L 1440 2032 A 88 88 0 0 0 1352 2120 L 1352 2320"/>
        </g>
        <g id="b34">
          <path d="M 3160 324 L 2968 324 A 88 88 0 0 0 2880 412 L 2880 612 A 64 64 0 0 1 2816 676 L 2744 676 A 88 88 0 0 0 2656 764 L 2656 1124 A 64 64 0 0 1 2592 1188 L 1920 1188"/>
          <path d="M 3160 348 L 2968 348 A 64 64 0 0 0 2904 412 L 2904 612 A 88 88 0 0 1 2816 700 L 2744 700 A 64 64 0 0 0 2680 764 L 2680 1124 A 88 88 0 0 1 2592 1212 L 1920 1212"/>
        </g>
        <g id="b36">
          <path d="M -160 924 L 720 924"/>
          <path d="M -160 900 L 720 900"/>
          <path d="M -160 876 L 720 876"/>
        </g>
        <g id="b38">
          <path d="M 2136 -160 L 2136 212 A 120 120 0 0 1 2016 332 L 1876 332 A 168 168 0 0 0 1708 500 L 1708 1320"/>
          <path d="M 2160 -160 L 2160 212 A 144 144 0 0 1 2016 356 L 1876 356 A 144 144 0 0 0 1732 500 L 1732 1320"/>
          <path d="M 2184 -160 L 2184 212 A 168 168 0 0 1 2016 380 L 1876 380 A 120 120 0 0 0 1756 500 L 1756 1320"/>
        </g>
        <g id="b39">
          <path d="M 1704 -160 L 1704 208 A 76 76 0 0 1 1628 284 L 1500 284 A 100 100 0 0 0 1400 384 L 1400 2320"/>
          <path d="M 1728 -160 L 1728 208 A 100 100 0 0 1 1628 308 L 1500 308 A 76 76 0 0 0 1424 384 L 1424 2320"/>
        </g>
        <g id="b40">
          <path d="M -160 2796 L 124 2796 A 100 100 0 0 0 224 2696 L 224 892 A 76 76 0 0 1 300 816 L 720 816"/>
          <path d="M -160 2772 L 124 2772 A 76 76 0 0 0 200 2696 L 200 892 A 100 100 0 0 1 300 792 L 720 792"/>
        </g>
        <g id="b41">
          <path d="M -12 -160 L -12 44 A 144 144 0 0 0 132 188 L 468 188 A 120 120 0 0 1 588 308 L 588 720"/>
          <path d="M 12 -160 L 12 44 A 120 120 0 0 0 132 164 L 468 164 A 144 144 0 0 1 612 308 L 612 720"/>
        </g>
        <g id="b42">
          <path d="M -160 2424 L 304 2424 A 144 144 0 0 0 448 2280 L 448 1536 A 120 120 0 0 1 568 1416 L 1920 1416"/>
          <path d="M -160 2400 L 304 2400 A 120 120 0 0 0 424 2280 L 424 1536 A 144 144 0 0 1 568 1392 L 1920 1392"/>
        </g>
        <g id="b43">
          <path d="M -160 1296 L 12 1296 A 124 124 0 0 0 136 1172 L 136 748 A 100 100 0 0 1 236 648 L 720 648"/>
          <path d="M -160 1272 L 12 1272 A 100 100 0 0 0 112 1172 L 112 748 A 124 124 0 0 1 236 624 L 720 624"/>
        </g>
        <g id="b44">
          <path d="M -160 3000 L 600 3000 A 100 100 0 0 0 700 2900 L 700 2300 A 76 76 0 0 1 776 2224 L 1220 2224"/>
          <path d="M -160 2976 L 600 2976 A 76 76 0 0 0 676 2900 L 676 2300 A 100 100 0 0 1 776 2200 L 1220 2200"/>
        </g>
        <g id="b45">
          <path d="M 792 3160 L 792 2992 A 40 40 0 0 1 832 2952 L 936 2952 A 64 64 0 0 0 1000 2888 L 1000 2844 A 64 64 0 0 0 936 2780 L 880 2780 A 40 40 0 0 1 840 2740 L 840 2524 A 40 40 0 0 1 880 2484 L 1120 2484 A 64 64 0 0 0 1184 2420 L 1184 2320"/>
          <path d="M 768 3160 L 768 2992 A 64 64 0 0 1 832 2928 L 936 2928 A 40 40 0 0 0 976 2888 L 976 2844 A 40 40 0 0 0 936 2804 L 880 2804 A 64 64 0 0 1 816 2740 L 816 2524 A 64 64 0 0 1 880 2460 L 1120 2460 A 40 40 0 0 0 1160 2420 L 1160 2320"/>
        </g>
        <g id="b46">
          <path d="M 3160 1512 L 2912 1512 A 120 120 0 0 1 2792 1392 L 2792 1264 A 144 144 0 0 0 2648 1120 L 1920 1120"/>
          <path d="M 3160 1536 L 2912 1536 A 144 144 0 0 1 2768 1392 L 2768 1264 A 120 120 0 0 0 2648 1144 L 1920 1144"/>
        </g>
        <g id="b47">
          <path d="M 1476 -160 L 1476 68 A 100 100 0 0 1 1376 168 L 952 168 A 124 124 0 0 0 828 292 L 828 720"/>
          <path d="M 1500 -160 L 1500 68 A 124 124 0 0 1 1376 192 L 952 192 A 100 100 0 0 0 852 292 L 852 720"/>
        </g>
        <g id="b48">
          <path d="M 3160 1272 L 2692 1272 A 88 88 0 0 0 2604 1360 L 2604 1440 A 64 64 0 0 1 2540 1504 L 1920 1504"/>
          <path d="M 3160 1296 L 2692 1296 A 64 64 0 0 0 2628 1360 L 2628 1440 A 88 88 0 0 1 2540 1528 L 1920 1528"/>
        </g>
      </defs>

    <g class="nodes"><circle cx="2550" cy="2590" r="13"/></g>
  </svg>
</div>

<script>
  // @ts-nocheck
  // =====================================
  // MARK: Cybernetics Animation
  // =====================================
  // Information transfer 15: cybernetics
  // The HTML only holds the wire shapes. This script
  // 0. lets wires that leave the picture carry on, so they run off any screen,
  // 1. builds a bundle (lines + beads + hover area) for every wire group,
  // 2. adds a thin row along the outside of each bundle,
  // 3. bends every wire that reaches a hub onto that hub's circle.
  // Everything that moves afterwards is plain CSS (see cybernetics.css).

  const NS = "http://www.w3.org/2000/svg";
  // the animation's own svg: the page has other svgs (icons), so never just "the first svg"
  const svg = document.getElementById("cybernetics-svg");
  const defs = svg.querySelector("defs");
  const nodes = svg.querySelector(".nodes");
  const HUBS = [[720, 720], [1920, 1320], [1220, 2320]];
  const RIM = 250, LANES = [198, 174, 150, 126, 102, 78], TAU = Math.PI * 2;

  const makeElement = (tag, attrs, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.append(el);
    return el;
  };
  const makeBundle = (style, refs) => {                // refs: [class, href]
    const g = makeElement("g", { class: "bundle", style });
    refs.forEach(([cls, href]) => makeElement("use", { class: cls, href }, g));
    svg.insertBefore(g, nodes);
    return g;
  };

  // ---------- Path helpers: the wires are only M, L and A (quarter-circle) commands ----------
  const parsePath = d => d.match(/[MLA][^MLA]*/g).map(s => [s[0], ...s.slice(1).trim().split(/[\s,]+/).map(Number)]);
  const getUnitVector = (a, b) => { const l = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; return [(a[0] - b[0]) / l, (a[1] - b[1]) / l]; };
  function findArcCentre(P, Q, r, sweep) {             // centre of the arc from P to Q
    const dx = Q[0] - P[0], dy = Q[1] - P[1], len = Math.hypot(dx, dy), h = Math.sqrt(Math.max(0, r * r - len * len / 4));
    const C = [(P[0] + Q[0]) / 2 - dy / len * h, (P[1] + Q[1]) / 2 + dx / len * h];
    const cross = (P[0] - C[0]) * (Q[1] - C[1]) - (P[1] - C[1]) * (Q[0] - C[0]);
    return (cross > 0) === (sweep === 1) ? C : [P[0] + Q[0] - C[0], P[1] + Q[1] - C[1]];
  }
  function flattenPath(d, step) {                      // a path as a list of points, about `step` apart
    const pts = []; let P;
    for (const [c, ...n] of parsePath(d)) {
      const Q = n.slice(-2);
      if (c === "M") pts.push(Q);
      else if (c === "L") {
        const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
        for (let k = step; k < len; k += step) pts.push([P[0] + (Q[0] - P[0]) * k / len, P[1] + (Q[1] - P[1]) * k / len]);
        pts.push(Q);
      } else {
        const [r, , , , sweep] = n, C = findArcCentre(P, Q, r, sweep), a = Math.atan2(P[1] - C[1], P[0] - C[0]);
        let da = Math.atan2(Q[1] - C[1], Q[0] - C[0]) - a;
        if (sweep && da < 0) da += TAU; else if (!sweep && da > 0) da -= TAU;
        const steps = Math.max(1, Math.ceil(Math.abs(da) * r / step));
        for (let k = 1; k <= steps; k++) pts.push([C[0] + r * Math.cos(a + da * k / steps), C[1] + r * Math.sin(a + da * k / steps)]);
      }
      P = Q;
    }
    return pts;
  }

  // ---------- 0. Wires that leave the picture just keep going ----------
  const OUT = 3000;                                    // = 20 bead gaps, so the beads keep their rhythm
  const isOutside = q => q[0] < 5 || q[0] > 2995 || q[1] < 5 || q[1] > 2995;
  defs.querySelectorAll("path").forEach(p => {
    const seg = parsePath(p.getAttribute("d")), first = seg[0].slice(1), second = seg[1].slice(-2);
    const last = seg.at(-1).slice(-2), before = seg.at(-1)[0] === "L" ? seg.at(-2).slice(-2) : null;
    let d = p.getAttribute("d");
    if (isOutside(first)) { const u = getUnitVector(first, second); d = d.replace(/^M\s*[-\d.]+[\s,]+[-\d.]+/, `M${first[0] + u[0] * OUT} ${first[1] + u[1] * OUT} L${first}`); }
    if (isOutside(last) && before) { const u = getUnitVector(last, before); d += ` L${last[0] + u[0] * OUT} ${last[1] + u[1] * OUT}`; }
    p.setAttribute("d", d);
  });

  // ---------- 1. Bundles: "group id : seconds per bead gap", in drawing order ----------
  const ORDER = "40:2.06 41:1.89 42:1.69 43:2.33 44:2.21 45:1.62 46:2.05 47:1.98 48:2.44 49:2.25 50:1.67 51:2.57 28:2.36 29:1.53 31:2.13 33:2.01 34:1.38 36:1.57 38:1.86 39:1.71 19:2.05 20:1.82 21:2.57 22:1.36 23:2.42 24:1.68 25:1.49 27:1.7 1:1.72 2:1.5 3:2.15 4:1.39 5:2.0 6:1.78 7:1.38 8:1.96 9:1.35 10:1.86 11:1.39 12:1.42 13:1.85 14:2.37 15:1.46 16:1.59 17:2.12";
  const bundles = ORDER.split(" ").flatMap((s, i) => {
    const [n, d] = s.split(":"), id = "b" + n;
    if (!defs.querySelector("#" + id)) return [];
    const g = makeBundle(`--t:${[-1.35, 0, -.45, -.9][i % 4]}s;--d:${d}s`,
      ["lines", "beads big", "beads small", "hit"].map(c => [c, "#" + id]));
    return [{ id, g }];
  });

  // ---------- 2. Outer rows: a copy of a path moved sideways; arcs stay arcs ----------
  function offsetPath(d, o) {
    let P, out = "";
    for (const [c, ...n] of parsePath(d)) {
      if (c === "M") { P = n; continue; }
      const Q = n.slice(-2), dx = Q[0] - P[0], dy = Q[1] - P[1], len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;                         // zero-length piece
      let A, B, arc = "";
      if (c === "L") {                                  // shift along the normal
        const nx = -dy / len * o, ny = dx / len * o;
        A = [P[0] + nx, P[1] + ny]; B = [Q[0] + nx, Q[1] + ny];
      } else {                                          // same centre, other radius
        const [r, , , , sweep] = n, C = findArcCentre(P, Q, r, sweep);
        const r2 = Math.max(1, r + (sweep ? -o : o)), k = r2 / r;
        A = [C[0] + (P[0] - C[0]) * k, C[1] + (P[1] - C[1]) * k];
        B = [C[0] + (Q[0] - C[0]) * k, C[1] + (Q[1] - C[1]) * k];
        arc = `A${r2} ${r2} 0 0 ${sweep} `;
      }
      if (!out) out = `M${A.map(v => v.toFixed(1))} `;
      out += (c === "L" ? "L" : arc) + B.map(v => v.toFixed(1)).join(" ") + " ";
      P = Q;
    }
    return out;
  }
  const getSide = (p, other) => {                      // which way is "away from the other wires"
    const [[, x, y], [, dx, dy]] = parsePath(p.getAttribute("d")), [, ox, oy] = parsePath(other.getAttribute("d"))[0];
    return (-(dy - y) * (ox - x) + (dx - x) * (oy - y)) > 0 ? -1 : 1;
  };
  bundles.forEach(({ id, g }) => {
    if (id === "b17") return;                           // the letters
    const ps = [...defs.querySelectorAll(`#${id} path`)];
    const rows = makeElement("g", { id: id + "_x" }, defs);
    [[ps[0], ps[1]], [ps.at(-1), ps.at(-2)]].forEach(([p, other]) =>
      makeElement("path", { d: offsetPath(p.getAttribute("d"), 16 * getSide(p, other)) }, rows));
    g.querySelector(".lines").after(makeElement("use", { class: "edge lines", href: "#" + id + "_x" }));
  });

  // ---------- 3. Hubs: cut every wire at the rim and run it tangentially onto the outer lane ----------
  const findHub = q => HUBS.findIndex(c => Math.hypot(q[0] - c[0], q[1] - c[1]) < RIM);
  const isInRim = (q, h) => Math.hypot(q[0] - HUBS[h][0], q[1] - HUBS[h][1]) < RIM;

  function bendOntoLane(P, dir, C, outgoing) {         // points after P, heading dir, ending on the circle
    const s = outgoing ? -1 : 1, a = Math.atan2(P[1] - C[1], P[0] - C[0]) + s * .7;
    const arc = Array.from({ length: 41 }, (_, i) => {
      const t = a + s * i / 40 * TAU * .22;
      return [C[0] + LANES[0] * Math.cos(t), C[1] + LANES[0] * Math.sin(t)];
    });
    const tan = getUnitVector(arc[2], arc[0]), len = Math.hypot(arc[0][0] - P[0], arc[0][1] - P[1]) * .45 + 10;
    const c1 = [P[0] + dir[0] * len, P[1] + dir[1] * len], c2 = [arc[0][0] - tan[0] * len, arc[0][1] - tan[1] * len];
    const bez = Array.from({ length: 30 }, (_, i) => {  // smooth join from the rim to the circle
      const u = (i + 1) / 30, v = 1 - u;
      return [0, 1].map(k => v ** 3 * P[k] + 3 * v * v * u * c1[k] + 3 * v * u * u * c2[k] + u ** 3 * arc[0][k]);
    });
    return bez.concat(arc.slice(1));
  }
  const straightenPoints = pts => pts.filter((q, i) => {   // drop points that lie on a straight run
    const a = pts[i - 1], b = pts[i + 1];
    return !a || !b || Math.abs((q[0] - a[0]) * (b[1] - q[1]) - (q[1] - a[1]) * (b[0] - q[0])) > .05;
  });

  defs.querySelectorAll("path").forEach(p => {
    let w = flattenPath(p.getAttribute("d"), 6);
    const hs = findHub(w[0]), he = findHub(w.at(-1));
    if (hs < 0 && he < 0) return;
    let i = 0, j = w.length - 1;
    while (hs >= 0 && i < j && isInRim(w[i], hs)) i++;
    while (he >= 0 && j > i && isInRim(w[j], he)) j--;
    w = w.slice(i, j + 1);
    if (w.length < 2) return p.setAttribute("d", "M-999 -999L-998 -998");
    if (he >= 0) w = w.concat(bendOntoLane(w.at(-1), getUnitVector(w.at(-1), w.at(-2)), HUBS[he], false));
    if (hs >= 0) w = bendOntoLane(w[0], getUnitVector(w[0], w[1]), HUBS[hs], true).reverse().concat(w);
    p.setAttribute("d", "M" + straightenPoints(w).map(q => q.map(v => v.toFixed(1))).join("L"));
  });

  // ---------- The circles themselves: six lanes, faster towards the centre (see .l0 .. .l5 in the CSS) ----------
  // ids get a "cybernetics-" prefix so they can't clash with anything else on the page
  HUBS.forEach(([cx, cy], h) => {
    const ring = makeElement("g", { id: "cybernetics-ring" + h }, defs);
    LANES.forEach((r, i) => {
      makeElement("circle", { id: `cybernetics-ring${h}_${i}`, cx, cy, r, pathLength: 1050 }, defs);
      makeElement("use", { href: `#cybernetics-ring${h}_${i}` }, ring);
    });
    makeBundle(`--t:${-h * .4}s;--d:1.7s`, [
      ["lines", "#cybernetics-ring" + h],
      ...LANES.flatMap((_, i) => [[`beads big l${i}`, `#cybernetics-ring${h}_${i}`], [`beads small l${i}`, `#cybernetics-ring${h}_${i}`]]),
      ["hit", "#cybernetics-ring" + h]]).classList.add("ring");
  });

  // ---------- Dots fade out near wire ends that sit in the open, so they never pop in or out ----------
  const fade = makeElement("radialGradient", { id: "cybernetics-fade" }, defs);
  [[0, "#000"], [.5, "#000"], [1, "#fff"]].forEach(([offset, c]) => makeElement("stop", { offset, "stop-color": c }, fade));
  bundles.forEach(({ id, g }, i) => {
    const ends = [...defs.querySelectorAll(`#${id} path, #${id}_x path`)].flatMap(p => {
      const pts = parsePath(p.getAttribute("d")), l = pts.length;
      return [pts[0].slice(1), pts[l - 1].slice(-2)];
    }).filter(q => q[0] > 10 && q[0] < 2990 && q[1] > 10 && q[1] < 2990);
    if (!ends.length) return;
    const bb = g.getBBox(), box = { x: bb.x - 200, y: bb.y - 200, width: bb.width + 400, height: bb.height + 400 };
    const mask = makeElement("mask", { id: "cybernetics-mask" + i, maskUnits: "userSpaceOnUse", ...box }, defs);
    makeElement("rect", { ...box, fill: "#fff" }, mask);
    ends.forEach(q => makeElement("circle", { cx: q[0], cy: q[1], r: 60, fill: "url(#cybernetics-fade)" }, mask));
    const dots = makeElement("g", { mask: `url(#cybernetics-mask${i})` });
    g.querySelector(".beads").before(dots);
    dots.append(...g.querySelectorAll(".beads"));
  });
</script>
```

### Cybernetics: CSS  (`public/styles/animation-css/cybernetics.css`)

```css
/* =====================================
MARK: Cybernetics Animation
Information transfer 15: wires with beads running along them.
Everything that moves is plain CSS. Scoped to .cybernetics-wrapper
so it doesn't affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Wrapper (replaces old :root and body styles) ---------- */
.cybernetics-wrapper {
    --bg: var(--color-background, #000000);
    --line: var(--color-text, #ffffff);
    --bead: var(--line);
    --gap: 150;             /* distance between beads; must match the -150 in @keyframes cybernetics-flow */
    --weight: 13px;         /* the line itself */
    --size: 26px;           /* the big beads */
    --small: var(--weight); /* the small beads sit inside the line, so they are invisible at rest */
    --d: 1.8s;              /* time for a bead to move one gap; each bundle overrides it */
    --boost: 3;             /* extra speed while hovering: 1 + 3 = 4x */

    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: clip;
    background: var(--bg);
}

/* the drawing is centred and fits the area; wires carry on past its edges, so there is never a cut-off */
.cybernetics-svg {
    display: block;
    width: 100%;
    height: 100%;
}

/* ---------- Wires ---------- */
.cybernetics-wrapper .lines {
    fill: none;
    stroke: var(--line);
    stroke-width: var(--weight);
    stroke-linecap: round;
    pointer-events: none;
}

.cybernetics-wrapper .edge {
    --weight: 5px;          /* the thin outer rows of a bundle */
}

/* ---------- Beads: a dashed line with zero-length dashes and round caps ---------- */
.cybernetics-wrapper .beads {
    fill: none;
    stroke: var(--bead);
    stroke-linecap: round;
    stroke-dasharray: 0 var(--gap);
    pointer-events: none;
    /* two flows are added together: the first always runs, the second only while hovering */
    animation: cybernetics-flow var(--d) linear infinite, cybernetics-flow calc(var(--d) / var(--boost)) linear infinite;
    animation-composition: replace, add;
    animation-delay: var(--t, 0s), 0s;
    animation-play-state: running, paused;
}

.cybernetics-wrapper .bundle:hover .beads {
    animation-play-state: running, running;
}

.cybernetics-wrapper .big {
    stroke-width: var(--size);
}

.cybernetics-wrapper .small {
    stroke-width: var(--small);
    animation-delay: calc(var(--t, 0s) - var(--d) / 2), 0s;   /* half a gap behind the big ones */
    transition: stroke-width .5s cubic-bezier(.2, .8, .3, 1);
}

.cybernetics-wrapper .bundle:hover .small {
    stroke-width: var(--size);
}

/* wide invisible stroke so thin wires are easy to hover */
.cybernetics-wrapper .hit {
    fill: none;
    stroke: transparent;
    stroke-width: 50;
    pointer-events: stroke;
    cursor: crosshair;
}

/* ---------- The three circles: the closer to the centre, the faster the beads ---------- */
.cybernetics-wrapper .l0 { --d: 2s; }
.cybernetics-wrapper .l1 { --d: 1.6s; }
.cybernetics-wrapper .l2 { --d: 1.25s; }
.cybernetics-wrapper .l3 { --d: .96s; }
.cybernetics-wrapper .l4 { --d: .71s; }
.cybernetics-wrapper .l5 { --d: .52s; }

.cybernetics-wrapper .nodes {
    fill: var(--line);
    pointer-events: none;
}

/* ---------- Keyframes (prefixed so they can't clash with another animation's "flow") ---------- */
@keyframes cybernetics-flow {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -150; }   /* = --gap */
}

@media (prefers-reduced-motion: reduce) {
    .cybernetics-wrapper .beads {
        animation-duration: 20s, 20s;
    }
}
```

---

## 7. Ecology  (slug: `ecology`)

### Ecology: HTML + JavaScript  (`src/animations/ecology.astro`)

```astro
---

---

<div class="animation-container">
    <canvas id="c"></canvas>
</div>

<script>
    // @ts-nocheck

    // =====================================
    // MARK: 3. LOAD CSS COLOURS INTO JAVASCRIPT
    // =====================================
    // Get the computed styles of the main document (HTML)
    const rootStyles = getComputedStyle(document.documentElement);

    // Read the specific CSS variables and remove any extra spaces (.trim())
    const colorText = rootStyles.getPropertyValue("--text-color").trim();
    const colorEdges = rootStyles.getPropertyValue("--edges-color").trim();
    const colorNodes = rootStyles.getPropertyValue("--nodes-color").trim();

    // =====================================
    // MARK: 4. BASIC SETTINGS & VARIABLES
    // =====================================
    const C = document.getElementById("c");
    const ctx = C.getContext("2d"); // The 2D drawing context
    const container = C.closest(".animation-container"); // The container the canvas sits in

    // Adjust the number of dots to the screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const N = isMobile ? 180 : isTablet ? 300 : 420; // Fewer dots on smaller screens

    // The word decides the groups (clusters). 7 letters = 7 clusters of dots.
    const word = "ECOLOGY";
    const CLUSTERS = word.length;

    // Global variables for screen size, centre (cx, cy), radius, zoom and camera position (pan)
    let W,
        H,
        cx,
        cy,
        R,
        zoom = 1,
        panX = 0,
        panY = 0,
        drag = null,
        pan = null;

    // =====================================
    // MARK: 5. HELPER FUNCTIONS
    // =====================================

    // Makes sure the canvas always fills the container, also when the window is resized
    function resizeCanvas() {
        const d = devicePixelRatio || 1; // Takes retina/high resolution screens into account
        W = container.clientWidth;
        H = container.clientHeight;
        C.width = W * d;
        C.height = H * d;
        C.style.width = W + "px";
        C.style.height = H + "px";
        ctx.setTransform(d, 0, 0, d, 0, 0); // Scale the context along
        cx = W / 2; // X centre
        cy = H / 2; // Y centre
        // Smaller radius on mobile so the letters sit closer to the centre and more white space is left
        R = isMobile ? Math.min(W, H) * 0.28 : isTablet ? Math.min(W, H) * 0.33 : Math.min(W, H) * 0.38;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas); // Adjust when the window changes size

    // Generates a 'normal distribution' (Gaussian), so dots gather more often in the middle of a letter
    function getGaussRandom() {
        let u = 0,
            v = 0;
        while (!u) u = Math.random();
        while (!v) v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    // =====================================
    // MARK: 6. DATA GENERATION (CLUSTERS, NODES, EDGES)
    // =====================================

    // Decide the target locations (clusters) for every letter in a circle pattern
    // Smaller spread per cluster on mobile for more compact letters
    const clusterSpread = isMobile ? 15 + Math.random() * 30 : 30 + Math.random() * 60;

    const clusters = Array.from({ length: CLUSTERS }, (_, i) => {
        const a = (i / CLUSTERS) * Math.PI * 2; // Angle in the circle
        const d = R * (0.3 + Math.random() * 0.7); // Distance from the centre
        return {
            x: cx + Math.cos(a) * d,
            y: cy + Math.sin(a) * d,
            s: isMobile ? 15 + Math.random() * 30 : 30 + Math.random() * 60, // Smaller spread on mobile
            char: word[i], // Store the specific letter ("E", "C", "O", etc.)
        };
    });

    // Create the dots (nodes) and assign each to a random cluster (letter)
    const nodes = Array.from({ length: N }, () => {
        const c = clusters[(Math.random() * CLUSTERS) | 0]; // Pick a random cluster
        const a = Math.random() * Math.PI * 2;
        const r = Math.abs(getGaussRandom()) * c.s; // Use Gauss to concentrate them in the middle
        return {
            x: c.x + Math.cos(a) * r,
            y: c.y + Math.sin(a) * r,
            vx: 0, // Velocity X
            vy: 0, // Velocity Y
            r: isMobile ? 1.6 + Math.random() * 1.2 : 2.2 + Math.random() * 1.8, // Smaller dots on mobile
            ci: clusters.indexOf(c), // Index of the cluster this node belongs to
        };
    });

    // Connect the nodes with lines (edges)
    const edges = [];
    const edgeSet = new Set(); // Prevents duplicate lines

    function addEdge(a, b) {
        const k = a < b ? a + "-" + b : b + "-" + a; // Unique key
        if (a === b || edgeSet.has(k)) return; // Stop if the line already exists or a node connects to itself
        edgeSet.add(k);
        edges.push([a, b]);
    }

    // Connect nodes based on distance. High chance within the same letter, low chance between different letters.
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);

            // P is the chance of a connection
            const p =
                nodes[i].ci === nodes[j].ci
                    ? Math.max(0, 0.35 - d / 300)
                    : Math.max(0, 0.012 - d / 8000);
            if (Math.random() < p) addEdge(i, j);
        }
    }

    // Make sure no dot gets fully disconnected (isolated nodes connect to their nearest neighbour)
    for (let i = 0; i < N; i++) {
        if (!edges.some(([a, b]) => a === i || b === i)) {
            let best = 0,
                bestD = Infinity;
            for (let j = 0; j < N; j++) {
                if (j !== i) {
                    const d =
                        (nodes[i].x - nodes[j].x) ** 2 +
                        (nodes[i].y - nodes[j].y) ** 2;
                    if (d < bestD) {
                        bestD = d;
                        best = j;
                    }
                }
            }
            addEdge(i, best);
        }
    }

    // Create 'hubs': connect a few random nodes to many other nodes for a web effect
    for (let h = 0; h < 8; h++) {
        const hub = (Math.random() * N) | 0;
        for (let i = 0; i < 8 + Math.random() * 12; i++) {
            addEdge(hub, (Math.random() * N) | 0);
        }
    }

    // =====================================
    // MARK: 7. INPUT HANDLERS (MOUSE / TOUCH)
    // =====================================

    // Translate mouse coordinates to "world" coordinates (takes zoom and pan into account)
    function convertScreenToWorld(sx, sy) {
        const rect = C.getBoundingClientRect();
        const localX = sx - rect.left;
        const localY = sy - rect.top;
        return {
            x: (localX - W / 2) / zoom + cx - panX,
            y: (localY - H / 2) / zoom + cy - panY,
        };
    }

    // Find the dot closest to the mouse click
    function findNode(sx, sy) {
        const { x, y } = convertScreenToWorld(sx, sy);
        let best = -1,
            bd = 18 / zoom; // Detection radius adapts to the zoom
        for (let i = 0; i < N; i++) {
            const d = Math.hypot(nodes[i].x - x, nodes[i].y - y);
            if (d < bd) {
                bd = d;
                best = i;
            }
        }
        return best;
    }

    // Mouse/touch actions
    C.onmousedown = (e) => {
        const i = findNode(e.clientX, e.clientY);
        i >= 0 ? (drag = i) : (pan = { x: e.clientX, y: e.clientY }); // Drag a node, OR move the whole canvas
    };

    C.onmousemove = (e) => {
        if (drag !== null) {
            // Move a grabbed node
            const p = convertScreenToWorld(e.clientX, e.clientY);
            nodes[drag].x = p.x;
            nodes[drag].y = p.y;
            nodes[drag].vx = nodes[drag].vy = 0;
        } else if (pan) {
            // Pan (slide) across the whole field
            panX += (e.clientX - pan.x) / zoom;
            panY += (e.clientY - pan.y) / zoom;
            pan.x = e.clientX;
            pan.y = e.clientY;
        }
    };

    C.onmouseup = C.onmouseleave = () => {
        drag = null;
        pan = null;
    }; // Release

    // =====================================
    // MARK: TOUCH EVENT HANDLERS (MOBILE)
    // =====================================
    C.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const t = e.touches[0];
        const i = findNode(t.clientX, t.clientY);
        i >= 0 ? (drag = i) : (pan = { x: t.clientX, y: t.clientY });
    }, { passive: false });

    C.addEventListener("touchmove", (e) => {
        e.preventDefault();
        const t = e.touches[0];
        if (drag !== null) {
            const p = convertScreenToWorld(t.clientX, t.clientY);
            nodes[drag].x = p.x;
            nodes[drag].y = p.y;
            nodes[drag].vx = nodes[drag].vy = 0;
        } else if (pan) {
            panX += (t.clientX - pan.x) / zoom;
            panY += (t.clientY - pan.y) / zoom;
            pan.x = t.clientX;
            pan.y = t.clientY;
        }
    }, { passive: false });

    C.addEventListener("touchend", () => {
        drag = null;
        pan = null;
    });

    // =====================================
    // MARK: 8. PHYSICS AND RENDER LOOP (ANIMATION LOOP)
    // =====================================
    requestAnimationFrame(function runLoop() {
        // Calculate the edges of the screen in "world" coordinates
        const minX = -W / 2 / zoom + cx - panX;
        const maxX = W / 2 / zoom + cx - panX;
        const minY = -H / 2 / zoom + cy - panY;
        const maxY = H / 2 / zoom + cy - panY;

        // This stores the average position of the dots in one letter
        const clusterCenters = Array.from({ length: CLUSTERS }, () => ({
            x: 0,
            y: 0,
            count: 0,
        }));

        // 8A. Line physics (springs)
        // Pulls connected nodes towards each other
        for (const [a, b] of edges) {
            const dx = nodes[b].x - nodes[a].x;
            const dy = nodes[b].y - nodes[a].y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            const restLen = isMobile ? 25 : 50; // Shorter rest length on mobile for a more compact network
            const f = (d - restLen) * 0.0004; // Spring constant
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            if (a !== drag) {
                nodes[a].vx += fx;
                nodes[a].vy += fy;
            }
            if (b !== drag) {
                nodes[b].vx -= fx;
                nodes[b].vy -= fy;
            }
        }

        // 8B. Node physics
        for (let i = 0; i < N; i++) {
            if (i === drag) continue; // Skip the node while the user is holding it

            // Stronger attraction on mobile so the network stays more in the middle
            const centerForce = isMobile ? 0.00025 : 0.00008;
            nodes[i].vx += (cx - nodes[i].x) * centerForce;
            nodes[i].vy += (cy - nodes[i].y) * centerForce;

            // Dots gently push each other away when they get too close
            for (let k = 0; k < 5; k++) {
                const j = (Math.random() * N) | 0; // Check a few random nodes per frame (optimisation)
                if (j === i) continue;
                const dx = nodes[i].x - nodes[j].x,
                    dy = nodes[i].y - nodes[j].y,
                    d2 = dx * dx + dy * dy;
                if (d2 < (isMobile ? 1200 : 2500) && d2 > 0.1) {
                    const f = 80 / d2;
                    nodes[i].vx += dx * f;
                    nodes[i].vy += dy * f;
                }
            }

            // Friction (stops the nodes from accelerating forever)
            nodes[i].vx *= 0.92;
            nodes[i].vy *= 0.92;

            // Apply velocity to position
            nodes[i].x += nodes[i].vx;
            nodes[i].y += nodes[i].vy;

            // Bounce against the edges of the window
            if (nodes[i].x < minX + nodes[i].r) {
                nodes[i].x = minX + nodes[i].r;
                nodes[i].vx *= -1;
            } else if (nodes[i].x > maxX - nodes[i].r) {
                nodes[i].x = maxX - nodes[i].r;
                nodes[i].vx *= -1;
            }
            if (nodes[i].y < minY + nodes[i].r) {
                nodes[i].y = minY + nodes[i].r;
                nodes[i].vy *= -1;
            } else if (nodes[i].y > maxY - nodes[i].r) {
                nodes[i].y = maxY - nodes[i].r;
                nodes[i].vy *= -1;
            }

            // Add up the positions to calculate the centre of mass of a letter
            clusterCenters[nodes[i].ci].x += nodes[i].x;
            clusterCenters[nodes[i].ci].y += nodes[i].y;
            clusterCenters[nodes[i].ci].count++;
        }

        // =====================================
        // MARK: 9. DRAW ON THE CANVAS
        // =====================================
        ctx.clearRect(0, 0, W, H); // Clear the previous frame

        ctx.save();
        // Move the origin to the centre, apply zoom and pan
        ctx.translate(W / 2, H / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-cx + panX, -cy + panY);

        // ---------- 9A. Draw the letters behind the swarm ----------
        // Dynamic letter size based on the screen
        const fontSize = isMobile ? 60 : isTablet ? 100 : 160;
        ctx.font = `bold ${fontSize}px "Inter", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.strokeStyle = colorText; // Colour from CSS variables
        ctx.lineWidth = 1;

        for (let i = 0; i < CLUSTERS; i++) {
            if (clusterCenters[i].count > 0) {
                // Calculates the exact X and Y of the letter, based on where its nodes are
                const px = clusterCenters[i].x / clusterCenters[i].count;
                const py = clusterCenters[i].y / clusterCenters[i].count;
                ctx.strokeText(clusters[i].char, px, py);
            }
        }

        // ---------- 9B. Draw the connecting lines ----------
        ctx.beginPath();
        ctx.strokeStyle = colorEdges; // Colour from CSS variables
        ctx.lineWidth = isMobile ? 0.3 : 0.5;
        for (const [a, b] of edges) {
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
        }
        ctx.stroke();

        // ---------- 9C. Draw the dots (nodes) ----------
        ctx.fillStyle = colorNodes; // Colour from CSS variables
        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore(); // Restore the canvas state for the next iteration

        // Call the loop again for the next frame
        requestAnimationFrame(runLoop);
    });
</script>
```

### Ecology: CSS  (`public/styles/animation-css/ecology.css`)

```css
/* =====================================
MARK: 1. CSS VARIABLES (COLOURS)
===================================== */

/* The colours are defined at the highest level (:root).
    JavaScript reads them, so you only need to change colours here in CSS.
*/
:root {
    --bg-color: #000000;
    /* Background colour (dark grey/black) */
    --text-color: rgba(255, 255, 255, 1);
    /* Colour of the letters (e.g. ECOLOGY) */
    --edges-color: rgba(255, 255, 255, 0.8);
    /* Colour of the lines between the dots */
    --nodes-color: #ffffff;
    /* Colour of the dots (nodes) themselves */
}

/* =====================================
MARK: 2. BASE LAYOUT
===================================== */
.animation-container {
    margin: 0;
    overflow: clip;
    /* Prevent scrollbars without blocking scrolling */
    background-color: var(--bg-color);
    /* Use the CSS variable for the background */
    width: 100%;
    height: var(--animation-height, 90vh);
}

.animation-container canvas {
    display: block;
    cursor: grab;
    /* Show that the canvas can be grabbed and dragged */
}

/* Change the cursor while the user holds the mouse button down */
.animation-container canvas:active {
    cursor: grabbing;
}

/* =====================================
MARK: 3. RESPONSIVE ADJUSTMENTS
===================================== */

/* Tablet */
@media (max-width: 1024px) {
    .animation-container {
        height: var(--animation-height, 70vh);
    }
}

/* Mobile */
@media (max-width: 768px) {
    .animation-container {
        height: var(--animation-height, 55vh);
    }

    .animation-container canvas {
        /* Prevent default browser touch behaviour (scrolling, zooming) so the canvas interaction works */
        touch-action: none;
    }
}
```

---

## 8. Friction  (slug: `friction`)

### Friction: HTML + JavaScript  (`src/animations/friction.astro`)

```astro
---

---

<div class="friction-wrapper" id="friction-stage">
    <!-- circle A: a plain disc -->
    <div class="disc a"></div>
    <!-- circle B: a disc. Inside it sits a copy of A in the background colour; B clips that copy, so what is left is the overlap of A and B.
         The word sits inside that copy and is clipped by it as well, so it only shows in the overlap. -->
    <div class="disc b">
        <div class="disc lens">
            <span class="word">Friction</span>
        </div>
    </div>
</div>

<script>
    // =====================================
    // MARK: Script friction
    // =====================================
    // @ts-nocheck
    (() => {
        // The only thing HTML and CSS cannot do: the physics. This moves circle A and writes its offset into --x / --y; CSS does the rest.
        const stage = document.getElementById("friction-stage");
        const section = stage.closest(".animation-section");
        const q = { x: 0, y: 0, vx: 0, vy: 0 }, P = { x: 0, y: 0 }, T = { x: 0, y: 0 };   // q: A's offset from the centre, P: smoothed pointer, T: pointer
        let R = 1, still = 99, clock = 0;

        // feel (accelerations in px/s², everything scales with the radius)
        const KS = 60,        // spring between pointer and circle A
              CA = 14,        // damping
              PUSH = 2.2,     // peak push, in units of KS·R: the closer the circles, the harder they push apart
              SOFT = 0.15,    // the push is at full strength from SOFT radii of offset on
              IDLE_AFTER = 2.5,   // seconds without pointer movement before the idle mode takes over
              RANGE = 5.0;    // the push starts when the two centres are RANGE radii apart

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        function updateLayout() {
            const r = stage.querySelector(".a").offsetWidth / 2;   // the radius is decided in the CSS
            if (!r) return;                                         // ignore hidden / zero-size layouts
            const k = r / R; R = r;
            q.x *= k; q.y *= k; P.x *= k; P.y *= k; T.x *= k; T.y *= k;
        }
        new ResizeObserver(updateLayout).observe(stage);

        // pointer position measured from the centre of the animation, since it sits inside the page
        function setPointer(e) {
            const r = stage.getBoundingClientRect();
            T.x = e.clientX - r.left - r.width / 2;
            T.y = e.clientY - r.top - r.height / 2;
            still = 0;
        }
        stage.addEventListener("pointermove", setPointer);
        stage.addEventListener("pointerdown", setPointer);

        // idle: the imaginary pointer swings slowly through the middle along a line that itself turns,
        // so the circles drift apart, push each other away, and now and then slip past each other: the word flashes up and is gone
        function getIdleTarget() { const a = clock * 0.13, r = R * 1.7 * Math.sin(clock * 0.8); return [Math.cos(a) * r, Math.sin(a) * r]; }

        function step(dt) {
            clock += dt; still += dt;
            if (still > IDLE_AFTER) [T.x, T.y] = getIdleTarget();
            const k = 1 - Math.exp(-dt * (still > IDLE_AFTER ? 1.2 : 30));    // idle takes over gently, the pointer takes back control at once
            P.x += (T.x - P.x) * k; P.y += (T.y - P.y) * k;
            const m = Math.hypot(q.x, q.y), d = 2 * m, D = RANGE * R;
            let fx = 0, fy = 0;
            if (d < D && m > 1e-6) {
                const f = KS * PUSH * R * Math.min(1, m / (SOFT * R)) * (1 - d / D) ** 1.5;
                fx = q.x / m * f; fy = q.y / m * f;                              // outwards: A is pushed away from B, B (the mirror of A) away from A
            }
            q.vx += (KS * (P.x - q.x) + fx - CA * q.vx) * dt; q.vy += (KS * (P.y - q.y) + fy - CA * q.vy) * dt;
            q.x += q.vx * dt; q.y += q.vy * dt;
        }

        let last = 0, acc = 0;
        function drawFrame(t) {
            const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
            if (!isPaused()) {
                acc += dt;
                while (acc >= 1 / 240) { step(1 / 240); acc -= 1 / 240; }
                stage.style.setProperty("--x", q.x.toFixed(2) + "px");
                stage.style.setProperty("--y", q.y.toFixed(2) + "px");
            }
            requestAnimationFrame(drawFrame);
        }
        updateLayout();
        requestAnimationFrame(drawFrame);
    })();
</script>
```

### Friction: CSS  (`public/styles/animation-css/friction.css`)

```css
/* =====================================
MARK: Friction Animation
Scoped to .friction-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old :root and body styles) ---------- */
.friction-wrapper {
    /* colours: background and discs/word */
    --bg: var(--color-background, #000000);
    --ink: var(--color-text, #ffffff);

    --r: 40cqmin;         /* radius of the circles (40% of the animation area's shortest side) */
    --x: 0px;             /* offset of circle A from the centre (set by the script); circle B sits at the opposite offset */
    --y: 0px;

    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;         /* clip, not hidden: hidden makes this a scroll container, which can swallow the page's wheel scroll */
    background: var(--bg);
    container-type: size;   /* so cqmin above measures the wrapper, not the window */
    touch-action: none;

    /* every disc is as wide as 2r, centred on the middle of the area, and clipped to a circle */
    .disc {
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(var(--r) * 2);
        height: calc(var(--r) * 2);
        margin: calc(var(--r) * -1) 0 0 calc(var(--r) * -1);
        border-radius: 50%;
        clip-path: circle(50%);
        background: var(--ink);
    }

    .a { transform: translate(var(--x), var(--y)); }
    .b { transform: translate(calc(var(--x) * -1), calc(var(--y) * -1)); }

    /* copy of A in the background colour, drawn inside B: it starts at B's top-left corner, so it needs to move by A's position minus B's position = 2 offsets */
    .lens {
        left: 0;
        top: 0;
        margin: 0;
        background: var(--bg);
        transform: translate(calc(var(--x) * 2), calc(var(--y) * 2));
    }

    /* the word must stay in the middle of the area: from inside the lens that is one offset back the other way */
    .word {
        position: absolute;
        left: 50%;
        top: 50%;
        color: var(--ink);
        white-space: nowrap;
        font: 700 calc(var(--r) * 0.4) / 1 "Helvetica Neue", Arial, sans-serif;     /* 0.4·r wide enough: the word is ~1.5·r wide */
        transform: translate(-50%, -50%) translate(calc(var(--x) * -1), calc(var(--y) * -1));
    }
}
```

---

## 9. In-between  (slug: `in-between`)

### In-between: HTML + JavaScript  (`src/animations/in-between.astro`)

```astro
---

---

<div class="in-between-wrapper">
    <canvas class="in-between-canvas" id="in-between-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: In-between Animation
    // =====================================
    const cv = document.getElementById("in-between-canvas");
    const section = cv.closest(".animation-section");
    const ctx = cv.getContext("2d");
    const E = (50 * Math.PI) / 180,
        cE = Math.cos(E),
        sE = Math.sin(E);
    const C = 0.22,
        KB = Math.acosh(1 / C);
    const TOPR = 1.12; // top rim radius (was 0.8) -> bigger top circle
    const KT = Math.acosh(TOPR / C);
    const DS = 0.05;
    let UB = 1.5; // bottom flare; recomputed so letters reach every screen edge

    function profile(v, ub) {
        if (v < 0) {
            const u = -v * ub;
            return [C * Math.cosh(KB * u), -1.3 * C * KB * u];
        }
        return [C * Math.cosh(KT * v), 3.2 * C * KT * v];
    }

    // framing bounds: top rim fully + bottom up to r = 1
    let fMinY = 1e9,
        fMaxY = -1e9,
        fMaxX = 0;
    for (let i = 0; i <= 400; i++) {
        const [r, h] = profile(-1 + (2 * i) / 400, 1);
        fMaxX = Math.max(fMaxX, r);
        fMaxY = Math.max(fMaxY, h * cE + r * sE);
        fMinY = Math.min(fMinY, h * cE - r * sE);
    }

    const Lt = [-0.6, 0.5, 0.7],
        ll = Math.hypot(...Lt),
        LX = Lt[0] / ll,
        LY = Lt[1] / ll,
        LZ = Lt[2] / ll;
    const WORD = "in-between",
        UNIQ = [...new Set(WORD)];

    // ---------- glyph atlas ----------
    const G = 64,
        LV = 10;
    const atlas = document.createElement("canvas");
    atlas.width = G * UNIQ.length;
    atlas.height = G * LV;
    const ax = atlas.getContext("2d");
    const FONT = (fs) => "700 " + fs + "px Inter, Helvetica, Arial, sans-serif";
    function buildAtlas() {
        ax.fillStyle = "#fff";
        ax.fillRect(0, 0, atlas.width, atlas.height);
        ax.textAlign = "center";
        ax.textBaseline = "middle";
        for (let l = 0; l < LV; l++) {
            const sd = l / (LV - 1);
            const size = 0.62 + 0.55 * sd,
                ink = Math.round(255 * (1 - (0.5 + 0.5 * sd)));
            ax.fillStyle = "rgb(" + ink + "," + ink + "," + ink + ")";
            ax.font = FONT(G * 0.875 * size);
            UNIQ.forEach((ch, c) =>
                ax.fillText(ch, c * G + G / 2, l * G + G / 2 + 2),
            );
        }
    }
    buildAtlas();
    document.fonts
        .load(FONT(56))
        .then(buildAtlas)
        .catch(() => {});

    // ---------- geometry (rebuilt on resize so the bottom disc always bleeds off-screen) ----------
    let rings,
        M,
        CB,
        SB,
        RING,
        LET,
        SX,
        SY,
        CA,
        SA,
        SCL,
        KEY,
        LVL,
        order,
        cnt,
        dmin,
        dmax,
        dScale;
    const NB = 4096;
    let W = 0,
        H = 0,
        sc = 1,
        ox = 0,
        oy = 0;

    function build() {
        const rNeed = Math.min(
            5,
            1.15 * Math.hypot(W / 2 / sc, (H / 2 / sc + 0.6) / sE),
        );
        UB = Math.max(1, Math.acosh(rNeed / C) / KB);
        const N = 6000,
            P = [],
            S = [0];
        for (let i = 0; i <= N; i++) P.push(profile(-1 + (2 * i) / N, UB));
        for (let i = 1; i <= N; i++)
            S.push(
                S[i - 1] +
                    Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]),
            );
        const total = S[N];
        rings = [];
        M = 0;
        let idx = 0;
        for (let k = 0, s = 0; s <= total; k++, s = k * DS) {
            while (idx < N - 1 && S[idx + 1] < s) idx++;
            const [r, h] = P[idx];
            const dr = P[idx + 1][0] - P[idx][0],
                dh = P[idx + 1][1] - P[idx][1],
                dl = Math.hypot(dr, dh) || 1;
            const n = Math.max(6, Math.round((2 * Math.PI * r) / DS));
            rings.push({
                r,
                h,
                tr: dr / dl,
                th: dh / dl,
                v: -1 + (2 * idx) / N,
                s,
                k,
                n,
                dth: (2 * Math.PI) / n,
                start: M,
            });
            M += n;
        }
        CB = new Float32Array(M);
        SB = new Float32Array(M);
        RING = new Uint16Array(M);
        LET = new Uint8Array(M);
        for (const R of rings)
            for (let j = 0; j < R.n; j++) {
                const i = R.start + j,
                    a = j * R.dth + R.k * 0.35 * R.dth;
                CB[i] = Math.cos(a);
                SB[i] = Math.sin(a);
                RING[i] = R.k;
                LET[i] = UNIQ.indexOf(WORD[(j + R.k) % WORD.length]);
            }
        SX = new Float32Array(M);
        SY = new Float32Array(M);
        CA = new Float32Array(M);
        SA = new Float32Array(M);
        SCL = new Float32Array(M);
        KEY = new Int16Array(M);
        LVL = new Uint8Array(M);
        order = new Uint32Array(M);
        cnt = new Int32Array(NB + 1);
        dmin = 1e9;
        dmax = -1e9;
        for (const R of rings) {
            dmin = Math.min(dmin, R.h * sE - R.r * cE);
            dmax = Math.max(dmax, R.h * sE + R.r * cE);
        }
        dScale = (NB - 1) / (dmax - dmin);
    }

    function resizeCanvas() {
        if (!cv.clientWidth || !cv.clientHeight) return; // ignore hidden / zero-size layouts
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        W = cv.width = Math.round(cv.clientWidth * dpr);
        H = cv.height = Math.round(cv.clientHeight * dpr);
        ctx.imageSmoothingQuality = "medium";
        const pad = 0.015 * Math.min(W, H);
        sc = Math.min(
            (W - 2 * pad) / (2 * fMaxX),
            (H - 2 * pad) / (fMaxY - fMinY),
        );
        ox = W / 2;
        oy = H / 2 + (sc * (fMinY + fMaxY)) / 2;
        build();
    }

    // ---------- interaction state ----------
    let rot = 0,
        vel = 0.35;
    let px = 0,
        py = 0,
        pa = 0,
        paT = 0,
        drag = false,
        lastCX = 0,
        moved = 0;
    const rip = [];
    function getPointerPosition(e) {
        const r = cv.getBoundingClientRect(),
            k = W / r.width;
        return [(e.clientX - r.left) * k, (e.clientY - r.top) * k];
    }

    cv.addEventListener("pointerdown", (e) => {
        cv.setPointerCapture(e.pointerId);
        [px, py] = getPointerPosition(e);
        drag = true;
        moved = 0;
        lastCX = e.clientX;
        cv.classList.add("drag");
    });
    cv.addEventListener("pointermove", (e) => {
        [px, py] = getPointerPosition(e);
        if (drag) {
            const dx = e.clientX - lastCX;
            lastCX = e.clientX;
            moved += Math.abs(dx);
            rot += dx * 0.012;
            vel = Math.max(-8, Math.min(8, vel * 0.8 + dx * 0.012 * 60 * 0.2));
        }
    });
    function releaseDrag(e, tap) {
        if (!drag) return;
        drag = false;
        cv.classList.remove("drag");
        if (e.pointerType !== "mouse") paT = 0;
    }
    cv.addEventListener("pointerup", (e) => releaseDrag(e, true));
    cv.addEventListener("pointercancel", (e) => releaseDrag(e, false));
    cv.addEventListener("pointerleave", (e) => {
        if (e.pointerType === "mouse") paT = 0;
    });
    // the wheel spins the shape; the page still scrolls, so nobody gets stuck on the animation
    cv.addEventListener(
        "wheel",
        (e) => {
            vel += e.deltaY * 0.004;
        },
        { passive: true },
    );

    // ---------- per-frame ----------
    let V = 0;
    function update(t, dt) {
        pa += (paT - pa) * Math.min(1, dt * 10);
        if (!drag) {
            vel += (0.35 - vel) * Math.min(1, dt * 1.2);
            rot += vel * dt;
        }
        for (let k = rip.length - 1; k >= 0; k--) {
            rip[k].age += dt;
            if (rip[k].age > 1.8) rip.splice(k, 1);
        }
        const mn = Math.min(W, H),
            pr = 0.2 * mn,
            pr2 = pr * pr,
            rw = 0.1 * mn,
            ramp = 0.045 * mn,
            rspeed = 0.9 * Math.max(W, H);
        const usePtr = pa > 0.01,
            nr = rip.length;
        cnt.fill(0);
        const m = DS * sc * 3;
        for (const R of rings) {
            const off = rot + 0.22 * Math.sin(t * 0.9 - R.s * 5);
            const co = Math.cos(off),
                so = Math.sin(off);
            const r = R.r,
                h = R.h,
                tr = R.tr,
                th = R.th,
                hc = h * cE,
                hs = h * sE;
            const end = R.start + R.n;
            for (let i = R.start; i < end; i++) {
                const ca = CB[i] * co - SB[i] * so,
                    sa = SB[i] * co + CB[i] * so;
                const pz = r * sa;
                let sx = ox + r * ca * sc,
                    sy = oy - (hc - pz * sE) * sc;
                if (sx < -m || sx > W + m || sy < -m || sy > H + m) {
                    KEY[i] = -1;
                    continue;
                }
                let ny = tr,
                    nl = -th * (ca * LX + sa * LZ);
                let lam = nl + ny * LY;
                if (ny * sE - sa * th * cE < 0) lam = -nl - ny * LY;
                if (lam < 0) lam = 0;
                let dark = 0.8 * (1 - lam);
                if (R.v > 0) dark += 0.55 * (1 - R.v);
                dark = dark < 0 ? 0 : dark > 1 ? 1 : dark;
                let lv = Math.sqrt(dark) * LV,
                    s2 = 1;
                if (usePtr) {
                    const dx = sx - px,
                        dy = sy - py,
                        d2 = dx * dx + dy * dy;
                    if (d2 < pr2) {
                        const d = Math.sqrt(d2) + 0.001;
                        let f = 1 - d / pr;
                        f = f * f * pa;
                        const push = f * pr * 0.3;
                        sx += (dx / d) * push;
                        sy += (dy / d) * push;
                        s2 += 1.5 * f;
                        lv += 4 * f;
                    }
                }
                for (let k = 0; k < nr; k++) {
                    const rp = rip[k],
                        dx = sx - rp.x,
                        dy = sy - rp.y,
                        d = Math.sqrt(dx * dx + dy * dy) + 0.001;
                    const w = (d - rp.age * rspeed) / rw;
                    if (w > -1 && w < 1) {
                        let e = Math.cos((w * Math.PI) / 2);
                        e = e * e * (1 - rp.age / 1.8);
                        sx += (dx / d) * e * ramp;
                        sy += (dy / d) * e * ramp;
                        s2 += 1.2 * e;
                        lv += 4 * e;
                    }
                }
                SX[i] = sx;
                SY[i] = sy;
                CA[i] = ca;
                SA[i] = sa;
                SCL[i] = s2;
                LVL[i] = Math.min(LV - 1, lv | 0);
                const key = ((pz * cE + hs - dmin) * dScale) | 0;
                KEY[i] = key;
                cnt[key + 1]++;
            }
        }
        for (let b = 0; b < NB; b++) cnt[b + 1] += cnt[b];
        V = cnt[NB];
        for (let i = 0; i < M; i++) {
            const k = KEY[i];
            if (k >= 0) order[cnt[k]++] = i;
        }
    }

    function draw() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, W, H);
        const h2 = DS / 2;
        for (let q = 0; q < V; q++) {
            const i = order[q],
                R = rings[RING[i]],
                ca = CA[i],
                sa = SA[i],
                k = sc * SCL[i];
            ctx.setTransform(
                -sa * k,
                ca * sE * k,
                -R.tr * ca * k,
                (R.th * cE - R.tr * sa * sE) * k,
                SX[i],
                SY[i],
            );
            ctx.drawImage(
                atlas,
                LET[i] * G,
                LVL[i] * G,
                G,
                G,
                -h2,
                -h2,
                DS,
                DS,
            );
        }
    }

    let t0 = performance.now(),
        last = t0;
    // the play/stop button of the detail page adds .stop-animation when paused
    const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

    let pausedTime = 0;
    function drawFrame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (!rings || isPaused()) {
            pausedTime += dt; // the clock stands still while paused
        } else {
            update((now - t0) / 1000 - pausedTime, dt);
            draw();
        }
        requestAnimationFrame(drawFrame);
    }
    // rebuild whenever the animation area changes size (window resize, rotation)
    new ResizeObserver(resizeCanvas).observe(cv);
    resizeCanvas();
    requestAnimationFrame(drawFrame);
</script>
```

### In-between: CSS  (`public/styles/animation-css/in-between.css`)

```css
/* =====================================
MARK: In-between Animation
Scoped to .in-between-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Wrapper (replaces old :root and body styles) ---------- */
.in-between-wrapper {
    color-scheme: light;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;
    background: #fff;
}

/* ---------- Canvas ---------- */
.in-between-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    touch-action: none;
    cursor: grab;
}

.in-between-canvas.drag {
    cursor: grabbing;
}
```

---

## 10. Interaction  (slug: `interaction`)

### Interaction: HTML + JavaScript  (`src/animations/interaction.astro`)

```astro
---

---

<!-- ===================================== -->
<!-- MARK: Interaction Animation           -->
<!-- ===================================== -->
<!-- the letters of INTER / ACTION are physics bodies: grab, throw and stack them -->
<div class="interaction-stage" id="interaction-stage"></div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Interaction Animation
    // =====================================
    // Matter.js is installed with npm (package.json), so Astro bundles it with the site
    import Matter from "matter-js";

    const LINES = ["INTER", "ACTION"];
    const FONT = "\"Helvetica Neue\", Helvetica, Arial, sans-serif";

    const SAMPLE_STEP = 2;    // px between alpha samples when tracing a glyph
    const PAD = 2;            // transparent margin so the trace can close around the ink

    // Which letter starts off balance: row, letter index, tilt in radians.
    // Row 0 index 0 is INTER's I: it sits on the apex of ACTION's A.
    const TIP = { row: 0, index: 0, angle: 0.1 };

    // The ceiling sits well above the visible stage, so letters can be thrown out of
    // frame and come back. The sides stay flush, so nothing lands out of reach.
    const OVERFLOW = { sides: 0, top: 2.6 };

    // ---------- Sinking ----------
    const IDLE_MS = 5000;       // no input for this long before anything sinks
    const GAP_MS = 2500;        // pause after a letter respawns, before the next sinks
    const SINK_PX_PER_S = 24;   // sink speed

    const { Engine, Runner, Bodies, Body, Composite, Query, Vertices,
            Mouse, MouseConstraint, Events } = Matter;

    const stage = document.getElementById("interaction-stage");
    const section = stage.closest(".animation-section");

    const engine = Engine.create();
    engine.enableSleeping = true;
    const runner = Runner.create();
    Runner.run(runner, engine);

    const measure = document.createElement("canvas").getContext("2d");
    const getFont = size => `700 ${size}px ${FONT}`;

    let glyphs = [], bodies = [], walls = [];

    // ---------- Sinking state ----------
    let lastInput = performance.now();
    let lastTick = performance.now();
    let nextSinkAt = 0;
    let sinker = null;        // only one letter sinks at a time
    let lastDropped = null;   // the letter that just respawned
    const done = new Set();   // letters that already sank this round

    // the play/stop button of the detail page adds .stop-animation when paused
    const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));


    // =====================================
    // MARK: Draw the glyph, cropped tight to its ink
    // =====================================
    function renderGlyph(char, font, dpr, colour) {
        measure.font = font;
        const m = measure.measureText(char);

        const left = m.actualBoundingBoxLeft;
        const ascent = m.actualBoundingBoxAscent;
        const w = Math.ceil(m.actualBoundingBoxRight + left) + PAD * 2;
        const h = Math.ceil(ascent + m.actualBoundingBoxDescent) + PAD * 2;

        const canvas = document.createElement("canvas");
        canvas.className = "glyph";
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.scale(dpr, dpr);
        ctx.font = font;
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = colour;
        ctx.fillText(char, PAD + left, PAD + ascent);

        return { canvas, ctx, w, h, dpr, left, ascent, advance: m.width };
    }


    // =====================================
    // MARK: Walk the alpha boundary (marching squares)
    // =====================================
    function traceOutline({ ctx, w, h, dpr }) {
        const img = ctx.getImageData(0, 0, Math.round(w * dpr), Math.round(h * dpr));
        const iw = img.width, ih = img.height;
        const gw = Math.ceil(w / SAMPLE_STEP), gh = Math.ceil(h / SAMPLE_STEP);
        const grid = new Uint8Array(gw * gh);

        for (let gy = 0; gy < gh; gy++) {
            for (let gx = 0; gx < gw; gx++) {
                const px = Math.min(Math.round(gx * SAMPLE_STEP * dpr), iw - 1);
                const py = Math.min(Math.round(gy * SAMPLE_STEP * dpr), ih - 1);
                grid[gy * gw + gx] = img.data[(py * iw + px) * 4 + 3] > 110 ? 1 : 0;
            }
        }

        const getCell = (x, y) => (x < 0 || y < 0 || x >= gw || y >= gh) ? 0 : grid[y * gw + x];

        let sx = -1, sy = -1;
        outer: for (let y = 0; y < gh; y++)
            for (let x = 0; x < gw; x++)
                if (grid[y * gw + x]) { sx = x; sy = y; break outer; }
        if (sx < 0) return null;

        const pts = [];
        let x = sx, y = sy, dx = 0, dy = 0, pdx = 0, pdy = 0, guard = 0;

        do {
            const state =
                (getCell(x - 1, y - 1) ? 1 : 0) | (getCell(x, y - 1) ? 2 : 0) |
                (getCell(x - 1, y) ? 4 : 0) | (getCell(x, y) ? 8 : 0);

            dx = 0; dy = 0;
            switch (state) {
                case 1: case 5: case 13: dy = -1; break;
                case 2: case 3: case 7: dx = 1; break;
                case 4: case 12: case 14: dx = -1; break;
                case 8: case 10: case 11: dy = 1; break;
                case 6: dy = (pdx === -1) ? -1 : 1; break;
                case 9: dx = (pdy === -1) ? 1 : -1; break;
                default: return null;
            }

            if (dx !== pdx || dy !== pdy) pts.push({ x: x * SAMPLE_STEP, y: y * SAMPLE_STEP });
            x += dx; y += dy; pdx = dx; pdy = dy;
        } while ((x !== sx || y !== sy) && ++guard < 40000);

        return pts.length > 6 ? pts : null;
    }


    // =====================================
    // MARK: Build
    // =====================================
    function fitSize() {
        const REF = 100;
        measure.font = getFont(REF);
        const widest = Math.max(...LINES.map(l => measure.measureText(l).width));

        const byWidth = (stage.clientWidth * 0.88) / widest * REF;
        const byHeight = stage.clientHeight * 0.36;
        return Math.max(48, Math.min(byWidth, byHeight));
    }

    function buildLetters() {
        glyphs.forEach(g => g.canvas.remove());
        Composite.remove(engine.world, bodies);
        glyphs = []; bodies = [];

        // reset sinking state, so a resize doesn't leave stale references behind
        sinker = null; done.clear(); lastDropped = null;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const size = fitSize();
        const font = getFont(size);
        // the letter colour is set as --ink on the stage in interaction.css
        const colour = getComputedStyle(stage).getPropertyValue("--ink").trim() || "#fff";

        measure.font = font;

        // stack by actual cap height, so INTER rests directly on ACTION
        const lineHeight = measure.measureText("H").actualBoundingBoxAscent + 2;

        // a small gap under everything, so the word drops a fraction and settles
        const drop = Math.max(4, size * 0.05);

        // ACTION is centred. Every line above it is placed so its first letter centres
        // on ACTION's first letter, which puts the I on the A's narrow apex.
        const last = LINES.length - 1;
        const baseX = (stage.clientWidth - measure.measureText(LINES[last]).width) / 2;
        const getFirstAdvance = line => measure.measureText(line[0]).width;

        LINES.forEach((line, row) => {
            let penX = baseX + (getFirstAdvance(LINES[last]) - getFirstAdvance(line)) / 2;
            const baselineY = stage.clientHeight - (last - row) * lineHeight - 1 - drop;

            [...line].forEach((char, i) => {
                const g = renderGlyph(char, font, dpr, colour);
                stage.appendChild(g.canvas);

                // convex hull of the traced outline: angled edges survive, notches fill in
                const raw = traceOutline(g);
                const verts = raw ? Vertices.hull(raw) : null;

                const body = verts && verts.length >= 3
                    ? Bodies.fromVertices(0, 0, [verts])
                    : Bodies.rectangle(0, 0, g.w, g.h);

                Body.set(body, {
                    restitution: 0.25,
                    friction: 0.6,
                    frictionAir: 0.012,
                    density: 0.0018
                });

                // vector from the canvas's top-left corner to the body's centre of mass
                const minX = verts ? Math.min(...verts.map(p => p.x)) : 0;
                const minY = verts ? Math.min(...verts.map(p => p.y)) : 0;
                const offX = minX - body.bounds.min.x;
                const offY = minY - body.bounds.min.y;

                Body.setPosition(body, {
                    x: penX - PAD - g.left + offX,
                    y: baselineY - PAD - g.ascent + offY
                });

                if (row === TIP.row && i === TIP.index) {
                    // tilt it, then set it back down so its lowest point just touches the baseline
                    Body.setAngle(body, TIP.angle);
                    Body.translate(body, { x: 0, y: baselineY - 2 - body.bounds.max.y });
                }

                glyphs.push({ canvas: g.canvas, body, offX, offY });
                bodies.push(body);
                Composite.add(engine.world, body);

                penX += g.advance;
            });
        });
    }


    // =====================================
    // MARK: Walls, input, loop
    // =====================================
    function buildWalls() {
        Composite.remove(engine.world, walls);

        const w = stage.clientWidth, h = stage.clientHeight, t = 400;
        const left = -w * OVERFLOW.sides;
        const right = w + w * OVERFLOW.sides;
        const top = -h * OVERFLOW.top;
        const bottom = h;

        const spanX = (right - left) + t * 2;
        const spanY = (bottom - top) + t * 2;

        walls = [
            Bodies.rectangle((left + right) / 2, bottom + t / 2, spanX, t, { isStatic: true }),
            Bodies.rectangle((left + right) / 2, top - t / 2, spanX, t, { isStatic: true }),
            Bodies.rectangle(left - t / 2, (top + bottom) / 2, t, spanY, { isStatic: true }),
            Bodies.rectangle(right + t / 2, (top + bottom) / 2, t, spanY, { isStatic: true })
        ];
        Composite.add(engine.world, walls);
    }

    const mouse = Mouse.create(stage);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.14,
            damping: 0.04,
            // at 0 the full torque applies and the centre of mass swings under the grab point
            angularStiffness: 0,
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);
    // Matter's wheel handler calls preventDefault, which blocks scrolling: remove it, so the page still scrolls
    // over the animation. Matter registers it as "mousewheel" and "DOMMouseScroll" (not "wheel"), so remove both.
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    Events.on(mouseConstraint, "startdrag", () => stage.classList.add("holding"));
    Events.on(mouseConstraint, "enddrag", () => stage.classList.remove("holding"));

    // Matter only listens on the stage: if the cursor leaves it mid-drag, Matter never
    // sees the button release. Force a drop instead.
    function releaseLetter() {
        if (!mouseConstraint.body) return;
        mouse.button = -1;
        stage.classList.remove("holding");
    }

    stage.addEventListener("mouseleave", releaseLetter);
    window.addEventListener("blur", releaseLetter);
    stage.addEventListener("touchcancel", releaseLetter);

    // Hover is hit-tested against the physics shapes, so the cursor only changes over real ink.
    let hovering = false;

    stage.addEventListener("mousemove", e => {
        if (mouseConstraint.body) return;
        const r = stage.getBoundingClientRect();
        const point = { x: e.clientX - r.left, y: e.clientY - r.top };
        const hit = Query.point(bodies, point).length > 0;
        if (hit !== hovering) stage.classList.toggle("hover", hovering = hit);
    });

    stage.addEventListener("mouseleave", () => {
        hovering = false;
        stage.classList.remove("hover");
    });

    function drawGlyphs() {
        // the physics stops while paused; the sink clock must not jump when it resumes
        const paused = isPaused();
        runner.enabled = !paused;
        if (paused) lastTick = performance.now();

        for (const { canvas, body, offX, offY } of glyphs) {
            const a = body.angle, cos = Math.cos(a), sin = Math.sin(a);
            canvas.style.transform =
                `translate(${body.position.x - (offX * cos - offY * sin)}px, ` +
                `${body.position.y - (offX * sin + offY * cos)}px) rotate(${a}rad)`;
        }
        requestAnimationFrame(drawGlyphs);
    }


    // =====================================
    // MARK: Sinking
    // Idle letters on the ground sink one at a time, then
    // drop back in somewhere else. Every letter goes once per round.
    // =====================================

    // only input on the animation itself counts as activity
    ["pointerdown", "pointermove", "keydown", "touchstart"].forEach(type =>
        stage.addEventListener(type, () => { lastInput = performance.now(); }, { passive: true })
    );

    function isGrounded(b) {
        return b !== mouseConstraint.body &&
            b.speed < 0.3 &&
            b.bounds.max.y >= stage.clientHeight - 4;
    }

    function respawnLetter(b) {
        Body.setStatic(b, false);
        Body.setVelocity(b, { x: 0, y: 0 });
        Body.setAngularVelocity(b, 0);
        Body.setAngle(b, (Math.random() - 0.5) * 0.6);

        // random x inside the stage, at least a quarter of the stage away from where it sank
        const W = stage.clientWidth;
        const hw = (b.bounds.max.x - b.bounds.min.x) / 2;
        const cx = (b.bounds.min.x + b.bounds.max.x) / 2;
        const minShift = Math.max(hw * 2, W * 0.25);
        const pickX = () => hw + Math.random() * Math.max(0, W - hw * 2);

        let targetX = pickX();
        for (let i = 0; i < 20 && Math.abs(targetX - cx) < minShift; i++) targetX = pickX();
        // fallback: mirror it to the other side
        if (Math.abs(targetX - cx) < minShift) targetX = Math.min(W - hw, Math.max(hw, W - cx));

        Body.translate(b, { x: targetX - cx, y: -60 - b.bounds.max.y });
        Matter.Sleeping.set(b, false);

        sinker = null;
        lastDropped = b;
        nextSinkAt = performance.now() + GAP_MS;
    }

    function pickSinker() {
        const grounded = bodies.filter(isGrounded);
        if (!grounded.length) return null;

        // everyone has had a turn -> new round (the letter that just dropped sits it out)
        if (done.size >= bodies.length) {
            done.clear();
            if (lastDropped) done.add(lastDropped);
        }

        let pool = grounded.filter(b => !done.has(b));
        // fallback: the remaining letters are stacked and not grounded yet,
        // so any grounded letter except the one that just dropped may go
        if (!pool.length) pool = grounded.filter(b => b !== lastDropped);
        if (!pool.length) return null;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    Events.on(engine, "beforeUpdate", () => {
        const now = performance.now();
        const dt = (now - lastTick) / 1000;
        lastTick = now;

        if (sinker) {
            Body.translate(sinker, { x: 0, y: SINK_PX_PER_S * dt });

            // keep letters resting on the sinker awake, so they follow it down
            for (const b of bodies) if (b.isSleeping) Matter.Sleeping.set(b, false);

            // fully below the stage -> drop it in again
            if (sinker.bounds.min.y > stage.clientHeight + 2) respawnLetter(sinker);
            return;
        }

        if (now - lastInput < IDLE_MS || now < nextSinkAt) return;

        const next = pickSinker();
        if (!next) return;

        sinker = next;
        done.add(sinker);
        Body.setStatic(sinker, true);   // static + translate = glides down through the floor
    });


    // =====================================
    // MARK: Start
    // =====================================
    function init() {
        if (!stage.clientWidth || !stage.clientHeight) return;   // ignore hidden / zero-size layouts
        buildWalls();
        buildLetters();
    }

    init();
    drawGlyphs();

    // rebuild whenever the animation area changes size (window resize, rotation)
    let resizeTimer;
    let lastWidth = stage.clientWidth, lastHeight = stage.clientHeight;
    new ResizeObserver(() => {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h || (w === lastWidth && h === lastHeight && glyphs.length)) return;
        lastWidth = w; lastHeight = h;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, glyphs.length ? 200 : 0);
    }).observe(stage);
</script>
```

### Interaction: CSS  (`public/styles/animation-css/interaction.css`)

```css
/* =====================================
MARK: Interaction Animation
Scoped to .interaction-stage so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Stage (replaces old :root and body styles) ---------- */
.interaction-stage {
    --ink: var(--color-text, #ffffff);   /* letter colour, read by the script */

    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--color-background, #000000);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    touch-action: none;
    cursor: default;
}

.interaction-stage.hover {
    cursor: grab;
}

.interaction-stage.holding {
    cursor: grabbing;
}

/* ---------- Letters ---------- */
.interaction-stage .glyph {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;   /* required: the script rotates letters about the top-left */
    will-change: transform;
    pointer-events: none;
}
```

---

## 11. Interface  (slug: `interface`)

### Interface: HTML + JavaScript  (`src/animations/interface.astro`)

```astro
---

---

<div class="interface-wrapper">
    <div class="interface-stage" id="interface-stage"></div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Interface Animation
    // =====================================
    const DELAY = 150;         // ms between each automatic switch (higher = fewer switching)
    const GROUP_COUNT = 50;    // roughly how many switches are on at once
    const TOP_WORD = "INTER";
    const BOTTOM_WORD = "FACE";

    const SWITCH_PX = 76;      // fixed switch size, never scaled to the window
    const GAP_PX = 20;         // fixed gap between switches

    const stage = document.getElementById("interface-stage");
    const wrapper = stage.closest(".interface-wrapper");
    const section = stage.closest(".animation-section");

    let timer = null;

    function setSizes() {
        const scale = SWITCH_PX / 80;
        wrapper.style.setProperty("--switch-size", SWITCH_PX + "px");
        wrapper.style.setProperty("--gap", GAP_PX + "px");
        wrapper.style.setProperty("--displacement-1", 10 * scale + "px");
        wrapper.style.setProperty("--displacement-2", 4 * scale + "px");
        wrapper.style.setProperty("--blur-1", 15 * scale + "px");
        wrapper.style.setProperty("--blur-2", 10 * scale + "px");
    }

    function buildGrid() {
        const W = stage.clientWidth;
        const H = stage.clientHeight;

        const cellWidth = SWITCH_PX * 2 + GAP_PX;
        const cellHeight = SWITCH_PX + GAP_PX;

        // Width needed to show the longest word horizontally, one letter per switch.
        const wordWidth = TOP_WORD.length * SWITCH_PX * 2 + (TOP_WORD.length - 1) * GAP_PX;
        const vertical = W < wordWidth;

        let columns = Math.ceil((W + GAP_PX) / cellWidth) + 1;
        let rows = Math.ceil((H + GAP_PX) / cellHeight) + 1;

        let letterAt;

        if (!vertical) {
            // Horizontal: an odd number of columns so INTER sits exactly in the centre,
            // and an even number of rows so there are two middle rows.
            columns = Math.max(columns, TOP_WORD.length);
            if (columns % 2 === 0) columns++;
            if (rows % 2 !== 0) rows++;

            const topRow = rows / 2 - 1;
            const bottomRow = rows / 2;
            const startC = (columns - TOP_WORD.length) / 2;

            letterAt = (r, c) => {
                const k = c - startC;
                if (r === topRow && k >= 0 && k < TOP_WORD.length) return TOP_WORD[k];
                if (r === bottomRow && k >= 0 && k < BOTTOM_WORD.length) return BOTTOM_WORD[k];
                return null;
            };
        } else {
            // Vertical (narrow screens): an even number of columns so there are two
            // middle columns, and an odd number of rows so INTER is centred vertically.
            // INTER runs down the left middle column, FACE down the right one.
            columns = Math.max(columns, 2);
            if (columns % 2 !== 0) columns++;
            rows = Math.max(rows, TOP_WORD.length);
            if (rows % 2 === 0) rows++;

            const leftCol = columns / 2 - 1;
            const rightCol = columns / 2;
            const startR = (rows - TOP_WORD.length) / 2;

            letterAt = (r, c) => {
                const k = r - startR;
                if (c === leftCol && k >= 0 && k < TOP_WORD.length) return TOP_WORD[k];
                if (c === rightCol && k >= 0 && k < BOTTOM_WORD.length) return BOTTOM_WORD[k];
                return null;
            };
        }

        stage.style.gridTemplateColumns = "repeat(" + columns + ", calc(2 * var(--switch-size)))";

        // Build everything off-screen and add it in one go, so the page lays out once.
        const fragment = document.createDocumentFragment();
        const inputs = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const letter = letterAt(r, c);

                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.tabIndex = -1;
                label.appendChild(input);

                if (letter) {
                    const span = document.createElement("span");
                    span.className = "letter";
                    span.textContent = letter;
                    label.appendChild(span);
                }

                const knob = document.createElement("span");
                knob.className = "knob";
                label.appendChild(knob);

                fragment.appendChild(label);
                inputs.push(input);
            }
        }

        stage.replaceChildren(fragment);
        return inputs;
    }

    // One listener for the whole grid instead of one per switch.
    // Hovering with a mouse flips the switch; clicking/tapping flips it again
    // (that part is the checkbox's normal behaviour).
    stage.addEventListener("pointerover", (e) => {
        if (e.pointerType !== "mouse") return;
        const label = e.target.closest("label");
        if (!label || label.contains(e.relatedTarget)) return;
        const input = label.firstElementChild;
        input.checked = !input.checked;
    });

    // The play/stop button of the detail page adds .stop-animation when paused.
    const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

    function startSwitching(inputs) {
        clearInterval(timer);

        // Switches are split into groups, and each group keeps one switch on.
        const groups = Array.from({ length: GROUP_COUNT }, () => []);
        inputs.forEach((input) => {
            const g = Math.floor(Math.random() * GROUP_COUNT);
            input.dataset.group = g;
            groups[g].push(input);
        });

        // Start with one switch on per group, so it isn't empty at first.
        const activeByGroup = new Map();
        groups.forEach((members, g) => {
            if (!members.length) return;
            const first = members[Math.floor(Math.random() * members.length)];
            first.checked = true;
            activeByGroup.set(g, first);
        });

        // A single timer: each tick moves one group's "on" switch to a new one.
        timer = setInterval(() => {
            if (isPaused()) return;
            const input = inputs[Math.floor(Math.random() * inputs.length)];
            const g = Number(input.dataset.group);
            const previous = activeByGroup.get(g);
            if (previous === input) return;
            if (previous) previous.checked = false;
            input.checked = true;
            activeByGroup.set(g, input);
        }, DELAY);
    }

    function startGrid() {
        setSizes();
        startSwitching(buildGrid());
    }

    // Rebuild whenever the stage changes size (window resize, rotation), since the
    // layout (horizontal vs vertical) depends on the available width.
    let resizeTimer;
    let lastWidth = 0;
    let lastHeight = 0;
    new ResizeObserver(() => {
        const W = stage.clientWidth;
        const H = stage.clientHeight;
        if (!W || !H || (W === lastWidth && H === lastHeight)) return;
        const first = !lastWidth;
        lastWidth = W;
        lastHeight = H;
        clearTimeout(resizeTimer);
        if (first) startGrid();
        else resizeTimer = setTimeout(startGrid, 200);
    }).observe(stage);
</script>
```

### Interface: CSS  (`public/styles/animation-css/interface.css`)

```css
/* =====================================
MARK: Interface Animation
===================================== */

/* ---------- Layout ---------- */
.animation-section .hidden-section {
    height: 100%;
}

.interface-wrapper {
    --light: white;
    --dark: black;

    /* How much of each colour is used. Everything below is derived from these. */
    --bg-mix: 87%;               /* background: this much light, the rest dark */
    --knob-mix: 93%;             /* knob: slightly lighter than the background */
    --shadow-opacity: 40%;       /* dark shadows */
    --highlight-opacity: 100%;   /* light shadows */
    --letter-opacity: 50%;       /* the letters spelling INTERFACE */

    --bg: color-mix(in srgb, var(--light) var(--bg-mix), var(--dark));
    --knob: color-mix(in srgb, var(--light) var(--knob-mix), var(--dark));
    --shadow: color-mix(in srgb, var(--dark) var(--shadow-opacity), transparent);
    --highlight: color-mix(in srgb, var(--light) var(--highlight-opacity), transparent);
    --letter: color-mix(in srgb, var(--dark) var(--letter-opacity), transparent);

    /* Sizes (the script sets these too, so change SWITCH_PX and GAP_PX there) */
    --displacement-1: 10px;
    --displacement-2: 4px;
    --blur-1: 15px;
    --blur-2: 10px;
    --switch-size: 76px;
    --gap: 20px;

    color-scheme: light;
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--bg);
    overflow: hidden;
}

/* ---------- Grid ---------- */
.interface-stage {
    position: absolute;
    inset: 0;
    display: grid;
    justify-content: center;
    align-content: center;
    gap: var(--gap);
    overflow: hidden;
}

/* ---------- Switch ---------- */
.interface-stage > label {
    --knob-size: calc(0.75 * var(--switch-size));
    --pad: calc((var(--switch-size) - var(--knob-size)) / 2);

    display: inline-grid;
    align-items: center;

    input,
    .letter,
    .knob {
        grid-area: 1 / 1;
    }

    input {
        appearance: none;
        -webkit-appearance: none;
        font-size: inherit;
        margin: 0;
        padding: 0;
        border: 0;
        background: var(--bg);
        width: calc(2 * var(--switch-size));
        height: var(--switch-size);
        border-radius: var(--switch-size);
        cursor: pointer;

        box-shadow:
            var(--shadow) var(--displacement-2) var(--displacement-2) var(--blur-2),
            var(--highlight) calc(-1 * var(--displacement-2)) calc(-1 * var(--displacement-2)) var(--blur-2),
            var(--shadow) var(--displacement-2) var(--displacement-2) var(--blur-2) inset,
            var(--highlight) calc(-1 * var(--displacement-2)) calc(-1 * var(--displacement-2)) var(--blur-2) inset;
    }

    /* A letter sits in the left half of the track, underneath the knob. The knob
       covers it while the switch is off and slides away to reveal it when on. */
    .letter {
        justify-self: start;
        width: var(--switch-size);
        text-align: center;
        font: 500 calc(var(--switch-size) * 0.5) / var(--switch-size) system-ui, -apple-system, "Segoe UI", sans-serif;
        color: var(--letter);
        text-shadow: 1px 1px 1px var(--highlight);
        pointer-events: none;
        user-select: none;
    }

    /* The knob is a real element that comes after the input, so a plain sibling
       selector moves it. Only `translate` animates, which the browser can do on
       the GPU without repainting the shadows. */
    .knob {
        width: var(--knob-size);
        height: var(--knob-size);
        margin-left: var(--pad);
        border-radius: 50%;
        background: var(--knob);
        pointer-events: none;
        box-shadow:
            var(--shadow) calc(var(--displacement-1) / 2) calc(var(--displacement-1) / 2) calc(var(--blur-1) / 2),
            var(--shadow) calc(var(--displacement-2) / 2) calc(var(--displacement-2) / 2) calc(var(--blur-2) / 2) inset,
            var(--highlight) calc(-1 * var(--displacement-2) / 2) calc(-1 * var(--displacement-2) / 2) calc(var(--blur-2) / 2) inset;
        transition: translate 0.5s;
        will-change: translate;
    }

    input:checked ~ .knob {
        translate: var(--switch-size) 0;
    }
}
```

---

## 12. Intra-action  (slug: `intra-action`)

### Intra-action: HTML + JavaScript  (`src/animations/intra-action.astro`)

```astro
---
const sections = [1, 2, 3];
const pPerSection = 22;
---
<!-- generate three sections with each 22 p's inside -->
<div class="animation-container">
	{sections.map((section) => (
		<div class={`set-sibling-index intra-section intra-section-${section}`} id={`intra-section-${section}`}>
			{Array.from({ length: pPerSection }).map(() => (
				<p class="blend" draggable="true">intra-action</p>
			))}
		</div>
	))}
</div>


<script>
	// @ts-nocheck
	// =====================================
	// MARK: Section 1
	// =====================================
	// define section to do drag & drop in
	const section = document.getElementById("intra-section-1");
	// define the element that is being dragged
	let draggedEl = null;
	// define the offset where the element is being dropped
	let offsetX = 0;
	let offsetY = 0;


	// Make a .blend elements draggable
	document.querySelectorAll(".blend").forEach(el => {
		// what happens when dragging is initiated
		el.addEventListener("dragstart", e => {
			// which element is being dragged
			draggedEl = e.target;

			// get the mouse coordinates
			const rect = draggedEl.getBoundingClientRect();
			
			// distance from the element's top‑left corner to the mouse pointer, in viewport coordinates
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			// For some browsers, required to start drag
			e.dataTransfer.setData("text/plain", "");
			// add dragging class for styling
			draggedEl.classList.add("dragging");
		});

		// remove dragging class when ending the drag
		el.addEventListener("dragend", () => {
				if (draggedEl) {
					draggedEl.classList.remove("dragging");
					draggedEl = null;
				}
			});
		});


		// Make drop possible inside the section
		section.addEventListener("dragover", e => {
			e.preventDefault();
		});

		

		// Define the what happens on drop, making sure it's dropped inside the container
		section.addEventListener("drop", e => {
			e.preventDefault();
			if (!draggedEl) return;

			// get size of the section
			const sectionRect = section.getBoundingClientRect();

			// size of element to be dropped, offsetWidth gets the size including padding and margin
			const elWidth = draggedEl.offsetWidth;
			const elHeight = draggedEl.offsetHeight;

			// Position of the element relative to the section
			// mouse position - left edge of the section - distance from the element’s left edge to the mouse when you started dragging
			let x = e.clientX - sectionRect.left - offsetX;
			let y = e.clientY - sectionRect.top - offsetY;

			// make sure the element doesn't escape the section
			const maxX = sectionRect.width - elWidth;
			const maxY = sectionRect.height - elHeight;
			// max -> use the largest number of any of the two, so anything below 0 is always 0
			// min -> use the smallest number -> if x is bigger than maxX use maxX instead
			x = Math.max(0, Math.min(x, maxX));
			y = Math.max(0, Math.min(y, maxY));

			draggedEl.style.position = "absolute";
			draggedEl.style.left = x + "px";
			draggedEl.style.top = y + "px";


			draggedEl.classList.remove("dragging");
			draggedEl.classList.add("dragged");

			draggedEl = null;
		});


	// =====================================
	// MARK: Section 2
	// =====================================
	const section2 = document.getElementById("intra-section-2");
	let draggedEl2 = null;
	let offsetX2 = 0;
	let offsetY2 = 0;


	document.querySelectorAll(".blend").forEach(el => {
		el.addEventListener("dragstart", e => {
			draggedEl2 = e.target;

			const rect = draggedEl2.getBoundingClientRect();
			offsetX2 = e.clientX - rect.left;
			offsetY2 = e.clientY - rect.top;

			e.dataTransfer.setData("text/plain", "");

			draggedEl2.classList.add("dragging");
		});


		el.addEventListener("dragend", () => {
			if (draggedEl2) {
				draggedEl2.classList.remove("dragging");
				draggedEl2 = null;
			}
		});

	});


	section2.addEventListener("dragover", e => {
		e.preventDefault();
	});


	section2.addEventListener("drop", e => {
		e.preventDefault();
		if (!draggedEl2) return;

		const sectionRect = section2.getBoundingClientRect();
	
		const elWidth = draggedEl2.offsetWidth;
		const elHeight = draggedEl2.offsetHeight;

		let x = e.clientX - sectionRect.left - offsetX2;
		let y = e.clientY - sectionRect.top - offsetY2;


		const maxX = sectionRect.width - elWidth;
		const maxY = sectionRect.height - elHeight;
		x = Math.max(0, Math.min(x, maxX));
		y = Math.max(0, Math.min(y, maxY));

		draggedEl2.style.position = "absolute";
		draggedEl2.style.left = x + "px";
		draggedEl2.style.top = y + "px";

		draggedEl2.classList.remove("dragging");
		draggedEl2.classList.add("dragged");
		draggedEl2 = null;
	});


	// =====================================
	// MARK: Section 3
	// =====================================

	const section3 = document.getElementById("intra-section-3");
	let draggedEl3 = null;
	let offsetX3 = 0;
	let offsetY3 = 0;

	document.querySelectorAll(".blend").forEach(el => {
		el.addEventListener("dragstart", e => {
			draggedEl3 = e.target;

			const rect = draggedEl3.getBoundingClientRect();
			offsetX3 = e.clientX - rect.left;
			offsetY3 = e.clientY - rect.top;

			e.dataTransfer.setData("text/plain", "");

			draggedEl3.classList.add("dragging");

		});

		el.addEventListener("dragend", () => {
		if (draggedEl3) {
				draggedEl3.classList.remove("dragging");
				draggedEl3 = null;
			}
		});

	});


	section3.addEventListener("dragover", e => {
		e.preventDefault();
	});

	section3.addEventListener("drop", e => {
		e.preventDefault();
		if (!draggedEl3) return;

		const sectionRect = section3.getBoundingClientRect();

		const elWidth = draggedEl3.offsetWidth;
		const elHeight = draggedEl3.offsetHeight;

		let x = e.clientX - sectionRect.left - offsetX3;
		let y = e.clientY - sectionRect.top - offsetY3;

		const maxX = sectionRect.width - elWidth;
		const maxY = sectionRect.height - elHeight;
		x = Math.max(0, Math.min(x, maxX));
		y = Math.max(0, Math.min(y, maxY));


		draggedEl3.style.position = "absolute";
		draggedEl3.style.left = x + "px";
		draggedEl3.style.top = y + "px";
		draggedEl3.classList.remove("dragging");
		draggedEl3.classList.add("dragged");
		draggedEl3 = null;
	});
</script>



<script>
	// @ts-nocheck
	// =====================================
	// MARK: Animation Pause button
	// =====================================

	const animationButton = document.querySelector(".animation-button");
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let animationPlaying;

	// check if the user has motion preferences and set the according class on the button
	if(prefersReducedMotion === true) {
		animationButton?.classList.add("stop-animation");
		animationPlaying = false;
	} else {
		animationButton?.classList.add("play-animation");
		animationPlaying = true;
	}

	// toggle animation
	function toggleAnimation() {
		animationButton.classList.toggle("stop-animation");
		animationButton.classList.toggle("play-animation");

		let animationClass = document.querySelector(".stop-animation");

		animationClass ? animationPlaying = false : animationPlaying = true;

		// use this if ever implemented in general js
		// if (typeof onAnimationStateChange === "function") {
		// 	onAnimationStateChange(animationPlaying);
		// }
	}

	animationButton?.addEventListener("click", toggleAnimation)

</script>
```

### Intra-action: CSS  (`public/styles/animation-css/intra-action.css`)

```css
/* =====================================
MARK: specific animation styling
===================================== */
/* give your css file the same slug name as the page you're working on */

@property --animation-height {
    syntax: "<length> | <percentage>";
    inherits: true;
    initial-value: 0px;
}

.animation-container {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: clip;
    gap: 1rem;
    background: #111;
}

.intra-section {
    --animation-height: 140vh;


    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: start;
    
    background: #111;
    position: relative;
    width: max-content;      
    height: 100vh;
    padding-top: 1.5rem;
    overflow: clip;
    
    p {
        position: relative;
        grid-row: 1/2;
        grid-column: 1/2;
        font-size: 6.5vw;

        @media (max-width: 1551px) {
            font-size: 5.9rem;
        }
        @media (max-width: 1440px) {
            font-size: 5.5rem;
        }
        @media (max-width: 1345px) {
            font-size: 5rem;
        }
        @media (max-width: 1226px) {
            font-size: 6vw;
        }
        @media (max-width: 1193px) {
            font-size: 9vw;
        }
        @media (max-width: 670px) {
            font-size: 17vw;
        }

        margin: 0;

    
        animation: moveUpDown 4s ease-in-out infinite alternate;

        animation-delay: calc(var(--index) * 0.3s );

        &.dragging {
            cursor: grabbing;
            animation: none;
            color: var(--grey);
        }

        &.dragged {
            animation-delay: 0s;
        }

    }

    &:hover {
        cursor: pointer;
    }

    &:active {
        cursor: grabbing;
    }
}

.animation-section:has(.stop-animation) * {
    animation-play-state: paused !important;
}

.animation-section:has(.play-animation) * {
    animation-play-state: running !important;
}





@media (max-width: 1193px) {
    .intra-section-3 {
        display: none;
    }
}
@media (max-width: 670px) {
    .intra-section-2 {
        display: none;
    }
}

.intra-section-2 {
    color: red;
}

.background-p {
    color: #111;
    isolation: isolate;
}

.blend {
    color: #111;
    mix-blend-mode: screen;
}

.absolute {
    color: #111;
    font-size: 3rem;
    position: absolute;
    writing-mode: vertical-lr;
    
}

@keyframes moveUpDown {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(calc(var(--animation-height)/2));
    }
    100% {
        transform: translateY(0);
    }
}
```

---

## 13. Intraface  (slug: `intraface`)

### Intraface: HTML + JavaScript  (`src/animations/intraface.astro`)

```astro
---

---

<div class="intraface-wrapper">
    <div class="scene">
        <div class="cube">
            <!-- 6 faces -->
            <div class="face front">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
            <div class="face back">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
            <div class="face left">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
            <div class="face right">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
            <div class="face top">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
            <div class="face bottom">
                <div class="ascii-container">
                    <div class="ascii-layer base"></div><div
                        class="ascii-layer glitch-1"
                    >
                    </div><div class="ascii-layer glitch-2 invert"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // @ts-nocheck

    // =====================================
    // MARK: Intraface Animation
    // =====================================

    // Find the wrapper
    const wrapper = document.querySelector(".intraface-wrapper");

    // Theme switching (automatic + on click)
    let themeInterval;

    function toggleTheme() {
        wrapper.classList.toggle("inverted");
    }

    function startThemeInterval() {
        themeInterval = setInterval(toggleTheme, 4000);
    }

    // Start the timer for the first time
    startThemeInterval();

    // Invert when the user clicks the wrapper
    wrapper.addEventListener("click", () => {
        toggleTheme();
        // Reset the timer so it doesn't flip back right after the click
        clearInterval(themeInterval);
        startThemeInterval();
    });

    // Character sets for the dynamic generator
    const symbolsFull = "@%#*+=-::";
    const symbolsHeavy = "@%#*";
    const symbolsLight = "+=-::";
    const numbersFull = "0123456789";
    const numbersBinary = "01";

    function generateRandomString(chars, length) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function generateFragment(type) {
        if (Math.random() < 0.15) return "        ";

        let len = Math.floor(Math.random() * 6) + 3;

        switch (type) {
            case "front":
                return generateRandomString(symbolsFull, len);
            case "back":
                return generateRandomString(numbersBinary, len + 4);
            case "left":
                return generateRandomString(numbersFull, len);
            case "right":
                return generateRandomString(symbolsFull + numbersFull, len);
            case "top":
                return generateRandomString(symbolsHeavy, len);
            case "bottom":
                return generateRandomString(symbolsLight, len);
            default:
                return generateRandomString(symbolsFull, len);
        }
    }

    function generateTypingGlitchLayer(wordsArray) {
        return wordsArray
            .map((w) => {
                if (w === "        ") return w;
                if (w.length > 3 && Math.random() < 0.4) {
                    let keepLen =
                        Math.floor(Math.random() * (w.length - 1)) + 1;
                    let chopped = w.substring(0, keepLen);
                    return chopped + (Math.random() > 0.5 ? "_" : "");
                }
                return w;
            })
            .join("  ");
    }

    // Only look for faces inside the wrapper (not the whole page)
    const faceElements = wrapper.querySelectorAll(".face");
    const faceData = [];

    faceElements.forEach((face) => {
        const type = face.classList[1];

        let words = [];
        for (let i = 0; i < 100; i++) {
            words.push(generateFragment(type));
        }

        faceData.push({
            type: type,
            words: words,
            baseLayer: face.querySelector(".base"),
            glitch1Layer: face.querySelector(".glitch-1"),
            glitch2Layer: face.querySelector(".glitch-2"),
        });
    });

    // Pre-compute the glitch-2 "intraface" text (it never changes)
    const intrafaceText = new Array(100).fill("intraface").join("  ");
    faceData.forEach((data) => {
        data.glitch2Layer.textContent = intrafaceText;
    });

    // Use requestAnimationFrame instead of setInterval for a smoother animation
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 120; // ms between text updates

    function animateIntraface(timestamp) {
        if (timestamp - lastUpdate >= UPDATE_INTERVAL) {
            lastUpdate = timestamp;

            faceData.forEach((data) => {
                // Shift and add a new word (for the base layer)
                data.words.shift();
                data.words.push(generateFragment(data.type));

                // Base and glitch-1 (not inverted) show the normal matrix-like code
                data.baseLayer.textContent = data.words.join("  ");
                data.glitch1Layer.textContent = generateTypingGlitchLayer(
                    data.words,
                );
            });
        }

        requestAnimationFrame(animateIntraface);
    }

    requestAnimationFrame(animateIntraface);
</script>
```

### Intraface: CSS  (`public/styles/animation-css/intraface.css`)

```css
/* =====================================
MARK: Intraface Animation
Scoped to .intraface-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- WRAPPER (replaces old body styles) ---------- */
.intraface-wrapper {
    background-color: #050505;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Courier New", Courier, monospace;
    overflow: hidden;
    transition: background-color 0.5s;
    cursor: pointer;
}

/* Automatic background switch based on the .inverted class on the wrapper */
.intraface-wrapper.inverted {
    background-color: #fafafa;
}

/* ---------- 3D KUBUS ---------- */
.intraface-wrapper .scene {
    width: 300px;
    height: 300px;
    perspective: 100px;
}

.intraface-wrapper .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: spinCube 45s infinite linear; 
}

.intraface-wrapper .face {
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: #000;
    border: 1px solid #111;
    transition: background-color 0.3s;
}

.intraface-wrapper .front  { transform: rotateY(  0deg) translateZ(150px); }
.intraface-wrapper .back   { transform: rotateY(180deg) translateZ(150px); }
.intraface-wrapper .left   { transform: rotateY(-90deg) translateZ(150px); }
.intraface-wrapper .right  { transform: rotateY( 90deg) translateZ(150px); }
.intraface-wrapper .top    { transform: rotateX( 90deg) translateZ(150px); }
.intraface-wrapper .bottom { transform: rotateX(-90deg) translateZ(150px); }

@keyframes spinCube {
    0%   { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* ---------- ASCII GLITCH EFFECT ---------- */
.intraface-wrapper .ascii-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 15px;
    line-height: 15px; 
    letter-spacing: -1px; 
    white-space: pre-wrap; 
    word-break: break-all; 
    font-weight: bold;
    overflow: hidden; 
    transform: scaleX(-1); /* Mirror the text */
}

.intraface-wrapper .ascii-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.1s, color 0.1s;
    will-change: clip-path, transform;
    contain: layout style paint;
}

/* Default colours */
.intraface-wrapper .base {
    z-index: 1;
    color: #fff;
    background-color: #000;
}
.intraface-wrapper .glitch-1 {
    z-index: 2;
    background-color: #000; 
    color: #fff;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.intraface-wrapper .glitch-2.invert {
    z-index: 3;
    background-color: #fff;
    color: #000;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

/* ---------- Inverted colours (on the wrapper, not on body) ---------- */
.intraface-wrapper.inverted .face {
    background-color: #fff;
    border: 1px solid #ccc;
}
.intraface-wrapper.inverted .base {
    color: #000;
    background-color: #fff;
}
.intraface-wrapper.inverted .glitch-1 {
    background-color: #fff;
    color: #000;
}
.intraface-wrapper.inverted .glitch-2.invert {
    background-color: #000;
    color: #fff;
}

/* Glitch animations (this creates the moving blocks with clip-path) */
@keyframes glitch-anim-1 {
    0% { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 0); }
    20% { clip-path: inset(80% 0 10% 0); transform: translate(4px, 0); }
    40% { clip-path: inset(30% 0 50% 0); transform: translate(-4px, 0); }
    60% { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
    80% { clip-path: inset(5% 0 90% 0); transform: translate(-4px, 0); }
    100% { clip-path: inset(90% 0 5% 0); transform: translate(4px, 0); }
}

@keyframes glitch-anim-2 {
    0% { clip-path: inset(15% 0 70% 0); transform: translate(3px, 0); }
    25% { clip-path: inset(60% 0 20% 0); transform: translate(-3px, 0); }
    50% { clip-path: inset(25% 0 55% 0); transform: translate(3px, 0); }
    75% { clip-path: inset(85% 0 10% 0); transform: translate(-3px, 0); }
    100% { clip-path: inset(40% 0 40% 0); transform: translate(3px, 0); }
}
```

---

## 14. Invisible  (slug: `invisible`)

### Invisible: HTML + JavaScript  (`src/animations/invisible.astro`)

```astro
<div class="invisible-container">
  <p class="invisible-title">INVISIBLE</p>
  <div class="mouse-tracker-container">
    <p class="background-word"></p>
  </div>
</div>

<script>
// =====================================
// MARK: move letters
// =====================================
// @ts-nocheck

// ---------- creating background ----------
const backgroundText = document.querySelector(".background-word")
if (backgroundText) {
  // repeats the word invisible a whole lot
  backgroundText.textContent = "invisible".repeat(450)
}

// selects the background text container to also use it to track the mouse position
const container = document.querySelector(".mouse-tracker-container")

if (backgroundText && container) {
    container.addEventListener("mousemove", (e) => {
        const widthX = container.clientWidth
        const heightY = container.clientHeight
        // Get height and width of textcontainer

        const centerX = widthX / 2
        const centerY = heightY / 2
        // Gets center of the axis

        const rect = container.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        // Tracks mousePosition
        // Source: https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element

        const ratioX = Math.abs(mouseX - centerX) / centerX
        const ratioY = Math.abs(mouseY - centerY) / centerY
        // Calcs the percentage of mouse from the center
        console.log("mouseX" + ratioX)
        console.log("mouseY" + ratioY) 

        const biggest = 1 - Math.max(ratioX, ratioY)
        // Get's biggest of the two percentages
        const spacing = (2 * biggest) + 0.02
        backgroundText.style.letterSpacing = spacing + "em"
        backgroundText.style.lineHeight = (0.75 + 2 * spacing) + "em"
        // Changes letter spacing and lineheight based on mouseposition.
    })
}
</script>
```

### Invisible: CSS  (`public/styles/animation-css/invisible.css`)

```css
/* =====================================
MARK: Invisible Animation
===================================== */

.invisible-container {
    width: 100dvw;
    height: 90dvh;
    position: relative;

    div {
        width: 101%;
        height: 101%;
        display: grid;
        place-items: center;
        overflow: hidden;
    }

    p {
        font-family: "Courier Prime", monospace;
        pointer-events: none;
        font-size: clamp(0.75em, 4vw, 1.75em);
        line-height: 0.75;

        text-wrap: wrap;
        word-break: break-all;
        text-align: center;
        /* breaks words at every letters */

        width: 100%;
        margin: 0;
    }

    span {
        margin: 1em;
    }

    .invisible-title {
        font-family: Inter;
        font-weight: bold;
        font-size: clamp(1rem, 20vw, 12em);
        text-transform: uppercase;
        text-wrap: nowrap;
        color: var(--color-background);

        position: absolute;
        display: block;
        place-items: center;
        left: 50%;
        top: 50%;
        translate: -50% -50%;
        /* displays title center */
        
        
        pointer-events: none;
    }

    @media (max-width: 800px) {
        .invisible-title {
            font-size: 9em;
            writing-mode: vertical-rl;
            width: fit-content;
            /* changes font size and direction */
        }
    }
}
```

---

## 15. Latent Space  (slug: `latent-space`)

### Latent Space: HTML + JavaScript  (`src/animations/latent-space.astro`)

```astro
---

---

<div class="latent-space-container" id="latent-space-container">
    <canvas id="space-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    const container = document.getElementById("latent-space-container");
    const canvas = document.getElementById("space-canvas");
    const ctx = canvas.getContext("2d");

    // =====================================
    // MARK: COLOUR VARIABLES (from CSS custom properties)
    // =====================================
    const containerStyles = getComputedStyle(container);
    const COLOR_BACKGROUND =
        containerStyles.getPropertyValue("--color-background").trim() || "#000";
    const COLOR_PARTICLES =
        containerStyles.getPropertyValue("--color-particles").trim() || "#fff";

    let width, height;
    let particles = [];
    let textCoordinates = [];

    const NUM_PARTICLES = 8000;
    const FIELD_DEPTH = 3000;
    const BASE_SPEED = 12;
    const FOV = 1000;

    const STATES = ["TEXT", "CHAOS"];
    let currentStateIndex = 0;
    let time = 0;
    let autoTimer;

    let camX = 0;
    let camY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    function extractTextCoordinates() {
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        offCanvas.width = container.clientWidth;
        offCanvas.height = container.clientHeight;

        // These colours only define the invisible mask for the text shape,
        // they don't need to change when you change the look.
        offCtx.fillStyle = "black";
        offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);

        offCtx.fillStyle = "white";
        const fontSize = Math.min(window.innerWidth * 0.16, 220);
        offCtx.font = `900 ${fontSize}px 'Inter', sans-serif`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";

        offCtx.fillText(
            "LATENT",
            offCanvas.width / 2,
            offCanvas.height / 2 - fontSize * 0.45,
        );
        offCtx.fillText(
            "SPACE",
            offCanvas.width / 2,
            offCanvas.height / 2 + fontSize * 0.45,
        );

        const imgData = offCtx.getImageData(
            0,
            0,
            offCanvas.width,
            offCanvas.height,
        ).data;
        textCoordinates = [];

        const step = 4;
        for (let y = 0; y < offCanvas.height; y += step) {
            for (let x = 0; x < offCanvas.width; x += step) {
                const index = (y * offCanvas.width + x) * 4;
                const red = imgData[index];

                if (red > 128) {
                    textCoordinates.push({
                        x: x - offCanvas.width / 2,
                        y: y - offCanvas.height / 2,
                    });
                }
            }
        }
    }

    class Particle {
        constructor() {
            this.z = Math.random() * FIELD_DEPTH;
            this.angle = Math.random() * Math.PI * 2;
            this.textTargetIndex = Math.floor(Math.random() * 999999);

            const chaosRadius = Math.random() * 3000;
            this.cx = Math.cos(this.angle) * chaosRadius;
            this.cy = Math.sin(this.angle) * chaosRadius;

            this.x = this.cx;
            this.y = this.cy;

            this.vx = 0;
            this.vy = 0;

            // Uses the variable for the particle colour
            this.color = COLOR_PARTICLES;

            this.baseSize = Math.random() * 1.2 + 0.5;
        }

        update(state) {
            this.z -= BASE_SPEED;

            if (this.z <= 0) {
                this.z += FIELD_DEPTH;
                this.x = this.getTargetX(state);
                this.y = this.getTargetY(state);
                this.vx = 0;
                this.vy = 0;
            }

            const targetX = this.getTargetX(state);
            const targetY = this.getTargetY(state);

            let force = state === "TEXT" ? 0.02 : 0.002;
            let friction = state === "TEXT" ? 0.85 : 0.95;

            this.vx += (targetX - this.x) * force;
            this.vy += (targetY - this.y) * force;

            this.vx *= friction;
            this.vy *= friction;

            this.x += this.vx;
            this.y += this.vy;
        }

        getTargetX(state) {
            return this.calculateTarget(state, "x");
        }

        getTargetY(state) {
            return this.calculateTarget(state, "y");
        }

        calculateTarget(state, axis) {
            if (state === "TEXT" && textCoordinates.length > 0) {
                const target =
                    textCoordinates[
                        this.textTargetIndex % textCoordinates.length
                    ];
                const val = axis === "x" ? target.x : target.y;

                const zScale = (FOV + this.z) / FOV;
                return val * zScale;
            }

            return axis === "x" ? this.cx : this.cy;
        }

        draw(ctx, camX, camY) {
            const scale = FOV / (FOV + this.z);

            let projX = (this.x - camX) * scale;
            let projY = (this.y - camY) * scale;

            const rot = time * 0.0003;
            const screenX =
                projX * Math.cos(rot) - projY * Math.sin(rot) + width / 2;
            const screenY =
                projY * Math.cos(rot) + projX * Math.sin(rot) + height / 2;

            if (
                screenX < 0 ||
                screenX > width ||
                screenY < 0 ||
                screenY > height
            )
                return;

            const size = this.baseSize * scale * 2;
            if (size < 0.2) return;

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function toggleState(isManual = false) {
        currentStateIndex = (currentStateIndex + 1) % STATES.length;

        if (isManual) {
            clearInterval(autoTimer);
            startTimer();
        }
    }

    function startTimer() {
        autoTimer = setInterval(() => {
            toggleState(false);
        }, 7000);
    }

    function init() {
        window.addEventListener("resize", handleResize);
        handleResize();

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            targetCamX = (e.clientX - rect.left - width / 2) * 2.0;
            targetCamY = (e.clientY - rect.top - height / 2) * 2.0;
        });
        container.addEventListener("touchmove", (e) => {
            const rect = container.getBoundingClientRect();
            targetCamX = (e.touches[0].clientX - rect.left - width / 2) * 2.0;
            targetCamY = (e.touches[0].clientY - rect.top - height / 2) * 2.0;
        });

        container.addEventListener("click", () => toggleState(true));
        container.addEventListener(
            "touchstart",
            (e) => {
                e.preventDefault();
                toggleState(true);
            },
            { passive: false },
        );

        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
        }

        startTimer();
        requestAnimationFrame(animate);
    }

    function handleResize() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        extractTextCoordinates();
    }

    let lastTime = 0;

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        time += deltaTime;

        // Uses the variable for the background colour
        ctx.fillStyle = COLOR_BACKGROUND;
        ctx.fillRect(0, 0, width, height);

        const currentState = STATES[currentStateIndex];

        camX += (targetCamX - camX) * 0.05;
        camY += (targetCamY - camY) * 0.05;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update(currentState);
            particles[i].draw(ctx, camX, camY);
        }

        requestAnimationFrame(animate);
    }

    document.fonts.ready.then(() => {
        init();
    });
</script>
```

### Latent Space: CSS  (`public/styles/animation-css/latent-space.css`)

```css
/* =====================================
MARK: Latent Space Animation
===================================== */

.latent-space-container {
    /* Colour variables */
    --color-background: #000; /* Colour of the space/background */
    --color-particles: #fff; /* Colour of the dots */

    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    cursor: pointer;
}

.latent-space-container canvas {
    display: block;
    width: 100%;
    height: 100%;
}
```

---

## 16. Liminal Space  (slug: `liminal-space`)

### Liminal Space: HTML + JavaScript  (`src/animations/liminal-space.astro`)

```astro
---

---

<div class="liminal-wrapper">
<section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>  
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>  
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>  
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
  <section class="tunnel-slice">
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
      <div>
        <div class="track">
          <p>liminal space</p>
          <p>liminal space</p>
          <p>liminal space</p>
        </div>
      </div>
    </section>
</div>

<script>
// =====================================
// MARK: Script liminal-space
// =====================================
// @ts-nocheck

const wrapper = document.querySelector(".liminal-wrapper");

const LOOK = 20;        // how far the view shifts
const SMOOTHING = 0.12; // seconds: higher = slower, softer follow

let targetX = 0, targetY = 0;   // where the finger/mouse is (-1 to 1)
let currentX = 0, currentY = 0; // what's currently shown
let lastTime = 0;
let running = false;

function handlePointer(e) {
    // Measured against the animation itself, not the window, since it sits inside the page
    const rect = wrapper.getBoundingClientRect();
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    targetX = (e.clientX - rect.left - halfW) / halfW;
    targetY = (halfH - (e.clientY - rect.top)) / halfH;

    if (!running) {
        running = true;
        lastTime = performance.now();
        requestAnimationFrame(updatePerspective);
    }
}

function updatePerspective(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    // Frame-rate independent easing toward the target
    const k = 1 - Math.exp(-dt / SMOOTHING);
    currentX += (targetX - currentX) * k;
    currentY += (targetY - currentY) * k;

    wrapper.style.perspectiveOrigin =
        (50 - currentX * LOOK) + "% " + (50 + currentY * LOOK) + "%";

    // Stop the loop once it has settled, so it doesn't run forever
    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(updatePerspective);
    } else {
        running = false;
    }
}

document.addEventListener("pointermove", handlePointer);
document.addEventListener("pointerdown", handlePointer);
</script>
```

### Liminal Space: CSS  (`public/styles/animation-css/liminal-space.css`)

```css
/* =====================================
MARK: Liminal Space Animation
===================================== */

@property --delay {
  syntax: "<time>";
  inherits: true;
  initial-value: 0s;
}

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
  height: 100%;
}

/* ---------- WRAPPER (replaces old body styles) ---------- */
.liminal-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  place-content: center;
  overflow: clip;
  perspective: 10em;
  perspective-origin: 50% 50%; /* updated from the script */
}

.tunnel-slice {
  --size-slice: 50em;
  --font-size: 6em;
  --sides: 4;
  --duration: 10s;
  --repeat-span: 1;

  --count: 18;
  --depth: 90em;
  --near: 8em;
  --speed: 24s;
  --i: calc(sibling-index() - 1);
  --delay: calc(var(--speed) / var(--count) * var(--i) * -1);

  width: var(--size-slice);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
  grid-area: 1 / 1;

  animation: walk var(--speed) linear infinite;
  animation-delay: var(--delay);
}

.tunnel-slice > div {
  grid-area: 1 / 1;
  height: var(--font-size);
  width: 100%;
  overflow: hidden;
  container-type: inline-size;
  position: relative;
  transform:
    rotateZ(calc(360deg / var(--sides) * sibling-index()))
    translateY(calc((var(--size-slice) - 0.05em) / 2))
    rotateX(90deg);
}

.track {
  position: absolute;
  inset-block: 0;
  display: flex;
  align-items: center;
  animation: slide var(--duration) linear infinite reverse;
}

.track p {
  flex: 0 0 calc(100cqw * var(--repeat-span));
  margin: 0;
  font-family: var(--inter-regular);
  font-weight: 500;
  font-size: var(--font-size);
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.tunnel-slice:nth-child(2n) .track {
  animation-direction: normal;
}

@keyframes walk {
  from { transform: translateZ(calc(var(--depth) * -1)); }
  to   { transform: translateZ(var(--near)); }
}

@keyframes slide {
  from { translate: 0; }
  to   { translate: calc(-100cqw * var(--repeat-span)); }
}
```

---

## 17. Lines of Flight  (slug: `lines-of-flight`)

### Lines of Flight: HTML + JavaScript  (`src/animations/lines-of-flight.astro`)

```astro
---

---

<!-- ===================================== -->
<!-- MARK: Lines of Flight                 -->
<!-- ===================================== -->
<!-- This animation shows 7 rows of scrolling "LINES OF FLIGHT" text on a 3D-tilted plane.
    Moving the mouse tilts the plane and speeds up nearby rows. Clicking a row reverses its direction. -->
<div class="main-frame">
    <div class="text-plane set-sibling-index">
        <!-- 7 rows of scrolling text, each scrolls at a different speed -->
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
        <div class="row">
            <div class="scrolling-text"></div>
        </div>
    </div>
</div>

<script>
    // @ts-nocheck
    
    // =====================================
    // MARK: Lines of Flight Animation
    //
    // How this animation works:
    // 7 rows of text all say "LINES OF FLIGHT" and scroll horizontally.
    // Each row scrolls at its own speed. The whole text block is tilted
    // in 3D perspective, and moving the mouse changes the tilt angle.
    // Rows near the mouse speed up. Clicking a row flips its direction.
    // The text loops seamlessly by using two copies placed side by side.
    // =====================================

    // ---------- Setup ----------

    // The text that will be repeated across each row
    const repeatedText = " LINES OF FLIGHT ".repeat(10);

    // Select all 7 scrolling text elements and their parent row containers
    const rows = document.querySelectorAll(".scrolling-text");
    const rowContainers = document.querySelectorAll(".row");

    // The 3D-tilted plane that holds all the rows
    const textPlane = document.querySelector(".text-plane");

    // ---------- State ----------

    // Each row has its own horizontal position (how far it has scrolled)
    const positions = [];

    // Each row scrolls at a different base speed (pixels per frame)
    const speeds = [1.2, 0.9, 1.4, 0.8, 1.5, 1.0, 1.3];

    // Each row has a direction: -1 means scrolling left, 1 means scrolling right
    const directions = [];

    // Track the mouse position as a value between 0 and 1
    // (0 = left/top edge of the screen, 1 = right/bottom edge)
    let mouseX = 0.5;
    let mouseY = 0.5;
    let mouseOnScreen = false;

    // The current 3D rotation angles of the text plane (in degrees)
    let rotationY = 30; // horizontal tilt (left/right)
    let rotationX = 0; // vertical tilt (up/down)

    // =====================================
    // MARK: Initialization
    // =====================================

    // When the user moves the mouse, save its position
    // and mark that the mouse is on screen
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        mouseOnScreen = true;
    });

    // When the mouse leaves the browser window, stop tracking it
    window.addEventListener("mouseleave", () => {
        mouseOnScreen = false;
    });

    // Same behavior for touch screens (phones and tablets)
    window.addEventListener(
        "touchmove",
        (e) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX / window.innerWidth;
                mouseY = e.touches[0].clientY / window.innerHeight;
                mouseOnScreen = true;
            }
        },
        { passive: true },
    );

    // When the finger is lifted, stop tracking
    window.addEventListener("touchend", () => {
        mouseOnScreen = false;
    });

    // When a row is clicked, reverse its scroll direction
    // (if it was going left, it now goes right, and vice versa)
    rowContainers.forEach((row, i) => {
        row.addEventListener("click", () => {
            directions[i] *= -1;
        });
    });

    // =====================================
    // MARK: Functions
    // =====================================

    // Fill each row with two identical copies of the text placed side by side.
    // This creates the illusion of infinite scrolling: when one copy scrolls
    // off-screen, the other copy is already in view, and the position resets.
    const fillRows = () => {
        rows.forEach((row, i) => {
            // Place two copies of the text next to each other
            row.innerHTML = `<span>${repeatedText}</span><span>${repeatedText}</span>`;

            // Give each row a slightly different starting position so they don't all align
            positions.push(-i * 100);

            // All rows start scrolling to the left
            directions.push(-1);
        });
    };

    // =====================================
    // MARK: Main Animation Loop
    // This function runs once per frame.
    // It updates the 3D tilt and moves every row of text.
    // =====================================
    const animate = () => {
        // ---------- Part 1: Update the 3D tilt of the text plane ----------

        // Default tilt when the mouse is not on screen
        let targetY = 30;
        let targetX = 0;

        if (mouseOnScreen) {
            // Moving the mouse left-to-right rotates the plane between 20° and 45°
            targetY = 20 + mouseX * 25;
            // Moving the mouse up-to-down tilts the plane between -4° and 4°
            targetX = (mouseY - 0.5) * -8;
        }

        // Smoothly move the current rotation toward the target
        // (only move 4% of the remaining distance each frame, so it feels smooth)
        rotationY += (targetY - rotationY) * 0.04;
        rotationX += (targetX - rotationX) * 0.04;

        // Apply the 3D rotation to the text plane
        if (textPlane) {
            textPlane.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        }

        // ---------- Part 2: Move each row of scrolling text ----------
        rows.forEach((row, i) => {
            // Start with this row's base speed
            let speed = speeds[i];

            // If the mouse is on screen, speed up rows that are close to the cursor.
            // The closer the mouse is to a row, the faster that row scrolls.
            if (mouseOnScreen) {
                // Find the vertical center of this row on screen
                const rect = rowContainers[i].getBoundingClientRect();
                const rowMiddle = (rect.top + rect.bottom) / 2;

                // Find the mouse's vertical position in pixels
                const mousePixelY = mouseY * window.innerHeight;

                // Calculate the distance between the mouse and this row
                const distance = Math.abs(mousePixelY - rowMiddle);

                // Convert distance to a "closeness" value (1 = right on it, 0 = far away)
                const closeness = Math.max(
                    0,
                    1 - distance / (window.innerHeight / 2),
                );

                // Add up to 3x extra speed based on how close the mouse is
                speed += closeness * 3;
            }

            // Move the row by its speed in its current direction
            positions[i] += speed * directions[i];

            // Seamless looping: the text is two copies side by side.
            // When the first copy scrolls completely off-screen, jump back
            // so the second copy takes its place (the user doesn't see the jump).
            const halfWidth = row.scrollWidth / 2;
            if (positions[i] <= -halfWidth) positions[i] += halfWidth;
            if (positions[i] >= 0) positions[i] -= halfWidth;

            // Apply the new horizontal position to this row
            row.style.transform = `translateX(${positions[i]}px)`;
        });

        // Run this function again on the next frame to keep the animation going
        requestAnimationFrame(animate);
    };

    // ---------- Start ----------
    // Fill the rows with text, then begin the animation loop
    fillRows();
    requestAnimationFrame(animate);
</script>
```

### Lines of Flight: CSS  (`public/styles/animation-css/lines-of-flight.css`)

```css
@layer components, utilities;

@layer components {
    /* =====================================
    MARK: Layout Components
    ===================================== */

    /* ---------- Frame ---------- */
    .main-frame {
        width: 100%;
        height: 100%;
        perspective: 1500px;
        perspective-origin: right;
    }

    /* ---------- Text Plane ---------- */
    .text-plane {
        width: 150%;
        height: 100%;
        display: flex;
        flex-direction: column;
        transform: rotateY(30deg);
        transform-origin: left center;
    }

    /* ---------- Rows ---------- */
    .row {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-top: 2px solid var(--border-color);
        cursor: pointer;
    }

    /* ---------- Scrolling Text ---------- */
    .scrolling-text {
        display: flex;
        width: max-content;
    }

    .scrolling-text span {
        font-family: var(--inter-regular);
        font-weight: 900;
        font-size: clamp(2.5rem, 11vh, 11vh);
        color: var(--text-color);
        white-space: pre;
        line-height: 1;
        user-select: none;
    }
}
```

---

## 18. Neutrum  (slug: `neutrum`)

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

## 19. Noise  (slug: `noise`)

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

## 20. Object  (slug: `object`)

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

## 21. Out of Control  (slug: `out-of-control`)

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

## 22. Proximity  (slug: `proximity`)

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

## 23. Recursivity  (slug: `recursivity`)

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

## 24. Reinforcing Feedback  (slug: `reinforcing-feedback`)

### Reinforcing Feedback: HTML + JavaScript  (`src/animations/reinforcing-feedback.astro`)

```astro
---

---

<!-- ===================================== -->
<!-- MARK: Reinforcing Feedback Animation  -->
<!-- ===================================== -->
<!-- doubling field: every dot keeps splitting until the screen is full, then the field dissolves and starts again -->
<div class="reinforcing-feedback-wrapper">
    <canvas class="reinforcing-feedback-canvas" id="reinforcing-feedback-canvas"></canvas>
    <div class="reinforcing-feedback-title" id="reinforcing-feedback-title"><span>REINFORCING</span><span>FEEDBACK</span></div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Reinforcing Feedback Animation
    // =====================================
    (() => {
        const canvas = document.getElementById("reinforcing-feedback-canvas");
        const ctx = canvas.getContext("2d");                 // transparent: it only holds what moves. Everything that has settled lives on canvases underneath
        const titleEl = document.getElementById("reinforcing-feedback-title");
        const wrapper = canvas.closest(".reinforcing-feedback-wrapper");
        const section = canvas.closest(".animation-section");

        // ---------- Parameters ----------
        const DENSITY = 30000;     // where the resolution starts: about this many dot-spacings fit on the screen. Higher = more, smaller dots
        const AUTO_RES = true;     // after every cycle the resolution goes up if the device had room to spare, and down if it struggled
        const DENSITY_MIN = 6000, DENSITY_MAX = 120000;
        const MIN_SPACING = 3.5;   // never let dots get closer than this many px
        const PERIOD = 650;        // ms between one dot's splits (every dot has the same clock)
        const SPEEDUP = 0.35;      // by the end of the ramp the clock is this much shorter (0.35 = 35% faster)
        const SPEEDUP_MS = 20000;  // how long the ramp lasts, counted from the start of a cycle
        const JITTER = 0.25;       // +/- random variation of that clock
        const ATTEMPTS = 14;       // tries to find free space for a child before the dot gives up
        const HOLD_MS = 1000;      // how long the full field stays before it dissolves
        const DISSOLVE_MS = 2800;  // how long the dissolve wave takes to cross the field
        const EMPTY_MS = 5000;     // pause on the empty screen before a new seed appears
        const MAX_GROW_MS = 70000; // safety: never stay in the growing state forever
        const MAX_DOTS = 100000;
        const SHADE_PERIOD = 0.7;  // finished rings get brighter and dimmer per generation: this is how fast (radians per generation)
        const SPAWN_MAX = 3.5;     // minimum reach of a child, in dot-spacings (never less than half the title's text size either)
        const GROW_MS = 350;       // a new dot grows to full size in this time
        const LINK_MS = 700, PULSE_MS = 500;
        const FX_MAX = 2500;       // most link/pulse effects alive at once: when it is busy, some births skip theirs
        const BUCKETS = 6;         // fades are drawn in this many steps, so each step is one draw call instead of one per dot
        const MASK_CELL = 1;       // px per mask cell
        const TREE = 0.16;         // opacity of the family tree: every parent -> child line stays faintly visible (0 = off)

        let W = 0, H = 0, dpr = 1, MIN_D = 10, MIN2 = 100, DOT_R = 4, REACH = 100;
        let FG = "", BG = "", TXT = "", FONT = "";   // read from the CSS variables --fg, --bg, --text, --font on the wrapper
        const LINES = ["REINFORCING", "FEEDBACK"];
        let title = null;                            // {fs, lh, cy}
        let mask = null, maskW = 0, maskH = 0;       // cells where dots may not start: the letter shapes plus some air
        let layer = null, lctx = null;               // canvas under this one: every full-size dot (filled or hollow) is drawn here once
        let tree = null, tctx = null;                // canvas under that: the faint family tree. The browser stacks them, so none of this is redrawn per frame
        let treeOpacity = 1, fxCap = FX_MAX, slow = 0;
        let density = DENSITY;                       // the resolution in use now
        let cyc = { sum: 0, n: 0, worst: 0, win: [], winSum: 0 };   // frame times of this cycle
        const pend = new Float32Array(4 * MAX_DOTS); let pendN = 0;   // links born this frame, drawn onto the tree in one go

        // ---------- Dots live in typed arrays (no objects, no garbage) ----------
        const X = new Float32Array(MAX_DOTS), Y = new Float32Array(MAX_DOTS);
        const BORN = new Float64Array(MAX_DOTS), NEXT = new Float64Array(MAX_DOTS);
        const GEN = new Uint16Array(MAX_DOTS);       // how many splits from the seed
        const ACTIVE = new Uint8Array(MAX_DOTS);     // still reproducing
        const BAKED = new Uint8Array(MAX_DOTS);      // already drawn full-size on the layer
        let count = 0;
        let act = new Int32Array(MAX_DOTS), act2 = new Int32Array(MAX_DOTS), actN = 0;   // reproducing dots (two buffers, swapped)
        const young = new Int32Array(MAX_DOTS);      // dots that are still growing, in birth order
        let yHead = 0, yTail = 0;

        // Spatial grid: one dot per cell at most (cell = spacing / sqrt 2), so a space check is 25 array reads
        let cs = 1, gw = 0, gh = 0, occ = new Int32Array(1);

        // Short-lived effects: ring buffers in birth order, so the oldest are always at the front
        const fxL = { x1: new Float32Array(FX_MAX), y1: new Float32Array(FX_MAX), x2: new Float32Array(FX_MAX), y2: new Float32Array(FX_MAX), t: new Float64Array(FX_MAX), head: 0, n: 0 };
        const fxP = { x1: new Float32Array(FX_MAX), y1: new Float32Array(FX_MAX), t: new Float64Array(FX_MAX), head: 0, n: 0 };

        let ready = false;         // false until the canvas has a real size (the animation area may start at height 0)
        let T = 0;                 // simulation time (ms)
        let state = "empty";       // empty -> grow -> hold -> dissolve -> empty
        let stateT = 0, erased = 0;

        // the play/stop button of the detail page adds .stop-animation when paused
        const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

        // ---------- Setup ----------
        function createUnderCanvas() {                                     // a canvas of the same size, stacked below the main one
            const c = document.createElement("canvas");
            c.className = "under";
            canvas.parentNode.insertBefore(c, canvas);
            return c;
        }
        function resizeCanvas() {
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            W = canvas.clientWidth; H = canvas.clientHeight;
            if (W < 2 || H < 2) { ready = false; return; }      // nothing to draw on yet: the resize observer calls us again
            canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const cssVar = n => getComputedStyle(wrapper).getPropertyValue(n).trim();
            FG = cssVar("--fg"); BG = cssVar("--bg"); TXT = cssVar("--text"); FONT = cssVar("--font");

            if (!tree) { tree = createUnderCanvas(); layer = createUnderCanvas(); tctx = tree.getContext("2d"); lctx = layer.getContext("2d"); }
            for (const c of [tree, layer]) { c.width = canvas.width; c.height = canvas.height; }
            tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            lctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            MIN_D = Math.max(MIN_SPACING, Math.sqrt(W * H / density));   // dots keep this distance: this sets the field's capacity
            MIN2 = MIN_D * MIN_D;
            DOT_R = Math.min(5, MIN_D * 0.37);                           // dot size relative to the spacing
            cs = MIN_D / Math.SQRT2;
            gw = Math.ceil(W / cs) + 1; gh = Math.ceil(H / cs) + 1;
            occ = new Int32Array(gw * gh);
            layoutText();
            clearAll();
            ready = true;
        }

        // ---------- Title in the middle ----------
        // Lays out the title and builds a mask of its letter shapes (grown by some air). Dots may not start
        // inside the mask, so they form around the letters, not around a box. The title itself is normal HTML text: only its size is set here.
        function layoutText() {
            ctx.save();
            ctx.font = "800 100px " + FONT;
            const w100 = Math.max(...LINES.map(l => ctx.measureText(l).width));
            ctx.restore();
            const LH = 1.0;
            const fs = Math.max(24, Math.min(W * 0.9 / w100 * 100, H * 0.62 / (LINES.length * LH)));
            const lh = fs * LH, cy = H / 2;
            title = { fs, lh, cy };
            REACH = Math.max(MIN_D * SPAWN_MAX, fs * 0.5);   // a child can jump over a letter stroke into the holes inside letters

            const air = DOT_R * 1.15 + 1;   // gap between a dot's centre and the edge of a letter
            maskW = Math.ceil(W / MASK_CELL); maskH = Math.ceil(H / MASK_CELL);
            const m = document.createElement("canvas");
            m.width = maskW; m.height = maskH;
            const mc = m.getContext("2d", { willReadFrequently: true });
            mc.scale(1 / MASK_CELL, 1 / MASK_CELL);
            mc.fillStyle = "#000"; mc.fillRect(0, 0, W, H);
            mc.font = "800 " + fs + "px " + FONT;
            mc.textAlign = "center"; mc.textBaseline = "middle";
            mc.lineJoin = "round"; mc.lineWidth = air * 2;
            mc.fillStyle = "#fff"; mc.strokeStyle = "#fff";
            LINES.forEach((l, i) => {
                const y = cy + (i - (LINES.length - 1) / 2) * lh;
                mc.strokeText(l, W / 2, y);    // the fat outline is the "air"
                mc.fillText(l, W / 2, y);
            });
            const px = mc.getImageData(0, 0, maskW, maskH).data;
            mask = new Uint8Array(maskW * maskH);
            for (let i = 0; i < mask.length; i++) mask[i] = px[i * 4] > 100 ? 1 : 0;

            titleEl.style.fontSize = fs + "px";
        }
        const isBlocked = (x, y) => {
            const ix = (x / MASK_CELL) | 0, iy = (y / MASK_CELL) | 0;
            return ix >= 0 && iy >= 0 && ix < maskW && iy < maskH && mask[iy * maskW + ix] === 1;
        };

        function setTreeOpacity(a) {                           // the browser fades the whole tree canvas: free for us
            if (Math.abs(a - treeOpacity) < 0.01 && a !== 0 && a !== 1) return;
            treeOpacity = a; tree.style.opacity = a;
        }

        function clearAll() {
            count = 0; actN = 0; yHead = yTail = 0; erased = 0;
            fxL.head = fxL.n = fxP.head = fxP.n = 0;
            occ.fill(-1);
            if (lctx) lctx.clearRect(0, 0, W, H);
            if (tctx) tctx.clearRect(0, 0, W, H);
            pendN = 0;
            setTreeOpacity(1);
            state = "empty"; stateT = 0;
        }

        // ---------- Space check ----------
        const isInside = (x, y) => x > 16 && x < W - 16 && y > 16 && y < H - 16 && !isBlocked(x, y);   // not on or next to the letters
        function isFree(x, y) {
            const gx = (x / cs) | 0, gy = (y / cs) | 0;
            const x0 = Math.max(0, gx - 2), x1 = Math.min(gw - 1, gx + 2), y0 = Math.max(0, gy - 2), y1 = Math.min(gh - 1, gy + 2);
            for (let j = y0; j <= y1; j++) for (let i = x0; i <= x1; i++) {
                const d = occ[j * gw + i];
                if (d >= 0) { const dx = X[d] - x, dy = Y[d] - y; if (dx * dx + dy * dy < MIN2) return false; }
            }
            return true;
        }

        function addDot(x, y, parent) {
            const i = count++;
            GEN[i] = parent >= 0 ? GEN[parent] + 1 : 0;
            X[i] = x; Y[i] = y; BORN[i] = T; NEXT[i] = T + getNextDelay(); ACTIVE[i] = 1; BAKED[i] = 0;
            occ[((y / cs) | 0) * gw + ((x / cs) | 0)] = i;
            young[yTail++] = i;
            return i;
        }
        function plantSeed(x, y) {
            if (!isInside(x, y) || !isFree(x, y) || count >= MAX_DOTS) return false;
            act[actN++] = addDot(x, y, -1);
            return true;
        }

        // ---------- Input: a click plants a seed ----------
        canvas.addEventListener("pointerdown", e => {
            if (state === "hold" || state === "dissolve" || isPaused()) return;   // let the field finish its cycle
            const r = canvas.getBoundingClientRect();
            if (plantSeed(e.clientX - r.left, e.clientY - r.top) && state === "empty") { state = "grow"; stateT = 0; }
        });

        // ---------- Simulation ----------
        // Time until a dot's next split. The clock slowly gets shorter during a cycle (subtle speed-up).
        function getNextDelay() {
            const ramp = state === "grow" ? Math.min(1, stateT / SPEEDUP_MS) : 0;
            return PERIOD * (1 - SPEEDUP * ramp) * (1 + (Math.random() * 2 - 1) * JITTER);
        }

        // A finished dot becomes a hollow ring on the layer; after that it costs nothing per frame
        function deactivate(i) {
            ACTIVE[i] = 0;
            if (BAKED[i]) {                                       // it was drawn filled: wipe that first
                lctx.globalCompositeOperation = "destination-out";
                lctx.beginPath(); lctx.arc(X[i], Y[i], DOT_R + 0.9, 0, Math.PI * 2); lctx.fill();
                lctx.globalCompositeOperation = "source-over";
            }
            lctx.strokeStyle = FG; lctx.lineWidth = Math.max(0.8, DOT_R * 0.3);
            lctx.globalAlpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.cos(GEN[i] * SHADE_PERIOD));   // waves of brighter and dimmer rings spread out from the seed
            lctx.beginPath(); lctx.arc(X[i], Y[i], DOT_R, 0, Math.PI * 2); lctx.stroke();
            lctx.globalAlpha = 1;
        }

        function pushLink(x1, y1, x2, y2) {
            if (fxL.n >= fxCap) return;                          // busy: skip this one
            const k = (fxL.head + fxL.n++) % FX_MAX;
            fxL.t[k] = T; fxL.x1[k] = x1; fxL.y1[k] = y1; fxL.x2[k] = x2; fxL.y2[k] = y2;
        }
        function pushPulse(x, y) {
            if (fxP.n >= fxCap) return;
            const k = (fxP.head + fxP.n++) % FX_MAX;
            fxP.t[k] = T; fxP.x1[k] = x; fxP.y1[k] = y;
        }

        function splitDot(p) {
            for (let a = 0; a < ATTEMPTS; a++) {
                const ang = Math.random() * Math.PI * 2;
                const dd = MIN_D * 1.1 + Math.random() * (REACH - MIN_D * 1.1);
                const x = X[p] + Math.cos(ang) * dd, y = Y[p] + Math.sin(ang) * dd;
                if (isInside(x, y) && isFree(x, y)) {
                    const c = addDot(x, y, p);
                    pushLink(X[p], Y[p], x, y);
                    if (TREE) { pend[pendN++] = X[p]; pend[pendN++] = Y[p]; pend[pendN++] = x; pend[pendN++] = y; }
                    pushPulse(X[p], Y[p]);
                    NEXT[p] = T + getNextDelay();
                    return c;
                }
            }
            deactivate(p);      // no space left for this dot: it stops reproducing
            return -1;
        }

        function step(dt, frameMs) {
            T += dt; stateT += dt;
            slow = frameMs > 30 ? slow + 1 : Math.max(0, slow - 2);   // a run of slow frames: do less
            if (slow > 20) { fxCap = Math.max(300, fxCap >> 1); slow = 10; }   // fewer link and pulse effects
            else if (slow === 0 && fxCap < FX_MAX) fxCap = Math.min(FX_MAX, fxCap + 8);

            if (state === "grow") {
                let n = 0;
                for (let k = 0; k < actN; k++) {
                    const d = act[k];
                    if (T < NEXT[d]) { act2[n++] = d; continue; }
                    if (count >= MAX_DOTS) { deactivate(d); continue; }
                    const c = splitDot(d);
                    if (c >= 0) { act2[n++] = d; act2[n++] = c; }
                }
                [act, act2] = [act2, act]; actN = n;
                if (count > 0 && (actN === 0 || stateT > MAX_GROW_MS)) {   // the field only stops when there is no free space left anywhere
                    state = "hold"; stateT = 0;
                    for (let k = 0; k < actN; k++) deactivate(act[k]);
                    actN = 0;
                }
            } else if (state === "hold") {
                if (stateT >= HOLD_MS) { state = "dissolve"; stateT = 0; }
            } else if (state === "dissolve") {
                if (stateT >= DISSOLVE_MS) { clearAll(); finishCycle(); }
            } else if (state === "empty") {
                // Loop: after a pause the field seeds itself with a single dot
                if (stateT >= EMPTY_MS) {
                    const x = 0.15 * W + Math.random() * 0.7 * W, y = 0.15 * H + Math.random() * 0.6 * H;
                    if (plantSeed(x, y)) { state = "grow"; stateT = 0; }
                }
            }

            // expire effects (oldest first)
            while (fxL.n && T - fxL.t[fxL.head] >= LINK_MS) { fxL.head = (fxL.head + 1) % FX_MAX; fxL.n--; }
            while (fxP.n && T - fxP.t[fxP.head] >= PULSE_MS) { fxP.head = (fxP.head + 1) % FX_MAX; fxP.n--; }

            // dots that have finished growing are drawn once onto the layer and leave the live list
            lctx.fillStyle = FG;
            lctx.beginPath();
            let any = false;
            while (yHead < yTail && T - BORN[young[yHead]] >= GROW_MS) {
                const i = young[yHead++];
                if (ACTIVE[i]) { lctx.moveTo(X[i] + DOT_R, Y[i]); lctx.arc(X[i], Y[i], DOT_R, 0, Math.PI * 2); BAKED[i] = 1; any = true; }
            }
            if (any) lctx.fill();

            if (pendN) {                                          // this frame's births join the family tree
                tctx.strokeStyle = FG; tctx.globalAlpha = TREE; tctx.lineWidth = 0.7;
                tctx.beginPath();
                for (let i = 0; i < pendN; i += 4) { tctx.moveTo(pend[i], pend[i + 1]); tctx.lineTo(pend[i + 2], pend[i + 3]); }
                tctx.stroke();
                pendN = 0;
            }
        }

        // ---------- Drawing ----------
        const getBucket = f => Math.min(BUCKETS - 1, (f * BUCKETS) | 0);    // f: 0 = new, 1 = gone

        function drawLinks() {
            ctx.lineWidth = 1;
            let b = -1;
            for (let j = 0; j < fxL.n; j++) {
                const k = (fxL.head + j) % FX_MAX, f = (T - fxL.t[k]) / LINK_MS, nb = getBucket(f);
                if (nb !== b) { if (b >= 0) ctx.stroke(); b = nb; ctx.globalAlpha = 0.5 * (1 - (b + 0.5) / BUCKETS); ctx.beginPath(); }
                ctx.moveTo(fxL.x1[k], fxL.y1[k]); ctx.lineTo(fxL.x2[k], fxL.y2[k]);
            }
            if (b >= 0) ctx.stroke();
        }
        function drawPulses() {
            ctx.lineWidth = 1;
            let b = -1;
            for (let j = 0; j < fxP.n; j++) {
                const k = (fxP.head + j) % FX_MAX, f = (T - fxP.t[k]) / PULSE_MS, nb = getBucket(f);
                if (nb !== b) { if (b >= 0) ctx.stroke(); b = nb; ctx.globalAlpha = 0.6 * (1 - (b + 0.5) / BUCKETS); ctx.beginPath(); }
                const r = DOT_R + f * MIN_D * 1.2;
                ctx.moveTo(fxP.x1[k] + r, fxP.y1[k]); ctx.arc(fxP.x1[k], fxP.y1[k], r, 0, Math.PI * 2);
            }
            if (b >= 0) ctx.stroke();
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);                           // the only full-screen operation per frame
            ctx.globalAlpha = 1;
            ctx.strokeStyle = FG; ctx.fillStyle = FG;

            // the family tree fades out while the field dissolves
            setTreeOpacity(state === "dissolve" ? Math.max(0, 1 - stateT / (DISSOLVE_MS * 0.6)) : 1);

            drawLinks();
            drawPulses();
            ctx.globalAlpha = 1;

            if (state !== "dissolve") {
                ctx.beginPath();                                   // only the dots that are still growing are drawn live
                for (let q = yHead; q < yTail; q++) {
                    const i = young[q];
                    if (!ACTIVE[i]) continue;
                    const r = DOT_R * Math.min(1, (T - BORN[i]) / GROW_MS);
                    ctx.moveTo(X[i] + r, Y[i]); ctx.arc(X[i], Y[i], r, 0, Math.PI * 2);
                }
                ctx.fill();
            } else {
                // Dissolving: a wave runs through the dots, oldest first. Dots in front of the wave stay on the layer;
                // dots inside the wave flash and burst into a widening ring; behind it they are gone.
                const n = count;
                const band = Math.max(40, n * 0.1);                // how many dots are bursting at the same time
                const pos = (stateT / DISSOLVE_MS) * (n + band);

                const upTo = Math.min(n, Math.floor(pos) + 1);     // wipe the dots the wave has reached from the layer
                if (erased < upTo) {
                    lctx.globalCompositeOperation = "destination-out";
                    lctx.beginPath();
                    for (; erased < upTo; erased++) { const i = erased; lctx.moveTo(X[i] + DOT_R + 0.9, Y[i]); lctx.arc(X[i], Y[i], DOT_R + 0.9, 0, Math.PI * 2); }
                    lctx.fill();
                    lctx.globalCompositeOperation = "source-over";
                }

                const lo = Math.max(0, Math.ceil(pos - band)), hi = Math.min(n - 1, Math.floor(pos));
                ctx.lineWidth = Math.max(0.8, DOT_R * 0.3);
                ctx.globalAlpha = 1;
                ctx.beginPath();                                   // flash: the dots just hit by the wave fill in
                for (let i = Math.max(lo, Math.ceil(pos - band * 0.25)); i <= hi; i++) {
                    ctx.moveTo(X[i] + DOT_R * 1.15, Y[i]); ctx.arc(X[i], Y[i], DOT_R * 1.15, 0, Math.PI * 2);
                }
                ctx.fill();
                let b = -1;                                        // then a ring expands and fades
                for (let i = hi; i >= lo; i--) {                   // newest hit first: f runs 0 -> 1
                    const f = (pos - i) / band, nb = Math.min(BUCKETS - 1, (f * BUCKETS) | 0);
                    if (nb !== b) { if (b >= 0) ctx.stroke(); b = nb; ctx.globalAlpha = 1 - (b + 0.5) / BUCKETS; ctx.beginPath(); }
                    const r = DOT_R * (1 + 2.6 * f);
                    ctx.moveTo(X[i] + r, Y[i]); ctx.arc(X[i], Y[i], r, 0, Math.PI * 2);
                }
                if (b >= 0) ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }

        // ---------- Resolution: as high as the device can carry ----------
        // Frame times are collected during growth and dissolve. At the end of a cycle the density is raised when the
        // frames were smooth, and lowered when they were not. If a device is hopelessly slow, it restarts at once, coarser.
        function measureFrame(frameMs) {
            if (state !== "grow" && state !== "hold" && state !== "dissolve") return;
            cyc.sum += frameMs; cyc.n++;
            cyc.win.push(frameMs); cyc.winSum += frameMs;
            if (cyc.win.length > 45) cyc.winSum -= cyc.win.shift();
            if (cyc.win.length === 45) {
                const avg = cyc.winSum / 45;
                cyc.worst = Math.max(cyc.worst, avg);
                if (AUTO_RES && state === "grow" && avg > 60 && count > 800) retune(0.6);    // far too slow: start again, coarser
            }
        }
        function retune(factor) {
            const next = Math.max(DENSITY_MIN, Math.min(DENSITY_MAX, Math.round(density * factor)));
            cyc = { sum: 0, n: 0, worst: 0, win: [], winSum: 0 };
            if (next === density) return;
            density = next;
            resizeCanvas();                                           // rebuilds the grid, the dot size and the title mask, and empties the screen
        }
        function finishCycle() {                               // called when the dissolve is over
            if (!AUTO_RES || cyc.n < 120) { cyc = { sum: 0, n: 0, worst: 0, win: [], winSum: 0 }; return; }
            const mean = cyc.sum / cyc.n, worst = cyc.worst;
            if (worst > 24) retune(0.75);                       // it stuttered: fewer, bigger dots
            else if (mean < 17.5 && worst < 19) retune(1.35);   // smooth at 60 fps with room over: more, smaller dots
            else cyc = { sum: 0, n: 0, worst: 0, win: [], winSum: 0 };
        }

        // ---------- Loop ----------
        let last = performance.now();
        function drawFrame(now) {
            const frameMs = now - last, dt = Math.min(frameMs, 50);
            last = now;
            // paused frames are skipped completely, so they don't count as slow frames either
            if (ready && !isPaused()) { measureFrame(frameMs); step(dt, frameMs); draw(); }
            requestAnimationFrame(drawFrame);
        }

        let resizeTimer = 0;                                   // resizing rebuilds everything: wait until the area stops changing
        const scheduleRebuild = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 150); };
        new ResizeObserver(scheduleRebuild).observe(canvas);           // also fires when the animation area is resized after loading
        resizeCanvas();
        // Inter is loaded in general.css; measure the title again once it is ready
        if (document.fonts && document.fonts.load) {
            document.fonts.load("800 40px Inter").then(() => { if (ready) layoutText(); }).catch(() => {});
        }
        requestAnimationFrame(drawFrame);
    })();
</script>
```

### Reinforcing Feedback: CSS  (`public/styles/animation-css/reinforcing-feedback.css`)

```css
/* =====================================
MARK: Reinforcing Feedback Animation
Doubling field. Scoped to .reinforcing-feedback-wrapper
so it doesn't affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Wrapper (replaces old :root and body styles) ---------- */
.reinforcing-feedback-wrapper {
    --black: #000;
    --white: #fff;
    --bg: var(--black);
    --fg: var(--white);
    --text: var(--black);   /* title colour: same as the background on purpose, so the title only shows as the gap in the dots */
    --font: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;   /* Inter is loaded in general.css */

    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font);
}

/* ---------- Canvases ---------- */
/* three canvases are stacked: the family tree, the settled dots, and on top whatever moves. The browser composites them. */
.reinforcing-feedback-wrapper canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
}

.reinforcing-feedback-wrapper canvas.under {
    pointer-events: none;
}

.reinforcing-feedback-canvas {
    touch-action: none;
    cursor: crosshair;
}

/* ---------- Title ---------- */
/* the title is normal text on top, in the background colour: it shows as the gap in the dots */
.reinforcing-feedback-title {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    color: var(--text);
    text-align: center;
    font: 800 100px/1 var(--font);
}

/* general.css gives every element the text colour (* { color }): the spans must keep the title's colour */
.reinforcing-feedback-title span {
    color: inherit;
}
```

---

## 25. Remote Control  (slug: `remote-control`)

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

## 26. Silence  (slug: `silence`)

### Silence: HTML + JavaScript  (`src/animations/silence.astro`)

```astro
---

---

<div class="silence-container" id="silence-container">
    <!-- Container gets 'is-visible' by default so it shows on load -->
    <div id="silence-word" class="word-container is-visible">
        <span class="letter">s</span>
        <span class="letter">i</span>
        <span class="letter">l</span>
        <span class="letter">e</span>
        <span class="letter">n</span>
        <span class="letter">c</span>
        <span class="letter">e</span>
    </div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Silence Animation
    // =====================================
    const container = document.getElementById("silence-container");
    const wordEl = document.getElementById("silence-word");

    if (container && wordEl) {
        let timeoutId;
        const stillnessDelay = 600; // ms to wait before the word comes back

        function handleMovement() {
            wordEl.classList.remove("is-visible");
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                wordEl.classList.add("is-visible");
            }, stillnessDelay);
        }

        // Listen to movement ONLY within the animation container
        container.addEventListener("pointermove", handleMovement, { passive: true });
        container.addEventListener("pointerdown", handleMovement, { passive: true });
        container.addEventListener("pointerleave", () => {
            clearTimeout(timeoutId);
            wordEl.classList.add("is-visible");
        }, { passive: true });

        // Connect animation pause button and reduced motion
        const animationButton =
            container.closest(".animation-section")?.querySelector(".animation-button") ||
            document.querySelector(".animation-button");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (animationButton) {
            if (prefersReducedMotion) {
                animationButton.classList.add("stop-animation");
                wordEl.classList.add("is-visible");
            } else {
                animationButton.classList.add("play-animation");
            }

            animationButton.addEventListener("click", () => {
                animationButton.classList.toggle("stop-animation");
                animationButton.classList.toggle("play-animation");
            });
        }
    }
</script>
```

### Silence: CSS  (`public/styles/animation-css/silence.css`)

```css
/* =====================================
MARK: Silence Animation
===================================== */

.silence-container {
    --paper-color: #d3d3d3;
    position: relative;
    width: 100%;
    height: var(--animation-height, 80vh);
    background-color: var(--paper-color);
    /* SVG Noise texture to perfectly mimic grainy paper */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
    color: var(--paper-color);
    font-family: "Inter", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
}

@media (min-width: 1024px) {
    .silence-container {
        height: var(--animation-height, 90vh);
    }
}

.silence-container .word-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: clamp(3.5rem, 13vw, 11.5rem);
    font-weight: 200;
    letter-spacing: clamp(0.5rem, 1.8vw, 1.8rem);
    cursor: crosshair;
    padding: 2rem 1rem;
    box-sizing: border-box;
    max-width: 100%;
}

.silence-container .letter {
    display: inline-block;
    /* Perfectly matches background and no shadow = Completely Invisible */
    color: var(--paper-color);
    text-shadow: none;
    /* Fade the embossed shadow with a smooth, elegant easing */
    transition: text-shadow 3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Default state: Word is visible when the container has 'is-visible' */
.silence-container .word-container.is-visible .letter {
    /* Finetuned Paper Letterpress / Embossed effect scaled for larger size */
    text-shadow:
        -1.5px -1.5px 3px rgba(255, 255, 255, 0.9),
        /* Crisp top-left highlight */
        1.5px 1.5px 3px rgba(175, 165, 155, 0.6),
        /* Crisp bottom-right shadow (tinted to match paper) */
        -5px -5px 14px rgba(255, 255, 255, 0.7),
        /* Soft ambient light */
        5px 5px 14px rgba(175, 165, 155, 0.4);
    /* Soft ambient shadow */
}
```

---

## 27. Subject  (slug: `subject`)

### Subject: HTML + JavaScript  (`src/animations/subject.astro`)

```astro
---

---

<!-- the wrapper is the size container, so the scene inside can size itself to the animation area -->
<div class="subject-wrapper" id="subject-wrapper">
    <div class="subject-scene" aria-label="Three nested cubes with their faces pulled apart, slowly rotating">
        <div class="subject-rig" id="subject-rig"><p class="subject-word" id="subject-word">SUBJECT</p></div>
    </div>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Subject Animation
    // =====================================
    (function () {
        // Three nested cubes: face size (s) and how far each face sits from the centre (o), in scene units.
        var CUBES = [
            { s: 28, o: 38 },
            { s: 18, o: 25 },
            { s: 12, o: 14 },
        ];
        var FACES = [
            "translateZ(var(--o))",
            "rotateY(180deg) translateZ(var(--o))",
            "rotateY(90deg) translateZ(var(--o))",
            "rotateY(-90deg) translateZ(var(--o))",
            "rotateX(90deg) translateZ(var(--o))",
            "rotateX(-90deg) translateZ(var(--o))",
        ];

        var wrapper = document.getElementById("subject-wrapper");
        var section = wrapper.closest(".animation-section");
        var rig = document.getElementById("subject-rig");
        var word = document.getElementById("subject-word");
        CUBES.forEach(function (c) {
            var cube = document.createElement("div");
            cube.className = "cube";
            FACES.forEach(function (t) {
                var f = document.createElement("div");
                f.className = "face";
                f.style.setProperty("--s", c.s);
                f.style.setProperty("--o", "calc(" + c.o + " * var(--u))");
                f.style.transform = t;
                cube.appendChild(f);
            });
            rig.appendChild(cube);
        });

        var SPEED = 56; // degrees per second, matches the source clip
        var yaw = 20,
            pitch = 0;
        var dragging = false,
            lastX = 0,
            lastY = 0,
            velYaw = 0;
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // the play/stop button of the detail page adds .stop-animation when paused
        var isPaused = function () { return document.hidden || (section && section.querySelector(".stop-animation")); };

        function renderRig() {
            rig.style.transform = "rotateX(" + pitch + "deg) rotateY(" + yaw + "deg)";
            // keep the word facing the viewer while the panels turn around it
            word.style.transform =
                "rotateY(" +
                -yaw +
                "deg) rotateX(" +
                -pitch +
                "deg) translate(-50%, -50%)";
        }

        // a drag only starts on the animation; once started it may continue outside it
        wrapper.addEventListener("pointerdown", function (e) {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            wrapper.classList.add("dragging");
        });
        window.addEventListener("pointermove", function (e) {
            if (!dragging) return;
            var dx = e.clientX - lastX,
                dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            yaw += dx * 0.4;
            velYaw = dx * 0.4;
            pitch = Math.max(-60, Math.min(60, pitch - dy * 0.3));
        });
        function releaseDrag() {
            dragging = false;
            wrapper.classList.remove("dragging");
        }
        window.addEventListener("pointerup", releaseDrag);
        window.addEventListener("pointercancel", releaseDrag);

        var prev = performance.now();
        function drawFrame(now) {
            var dt = Math.min(0.05, (now - prev) / 1000);
            prev = now;
            if (!dragging && !isPaused()) {
                if (!reduce) yaw += SPEED * dt;
                yaw += velYaw;
                velYaw *= 0.92; // inertia after a flick
                pitch += (0 - pitch) * Math.min(1, dt * 2.5); // ease back to level
            }
            renderRig();
            requestAnimationFrame(drawFrame);
        }
        renderRig();
        requestAnimationFrame(drawFrame);
    })();
</script>
```

### Subject: CSS  (`public/styles/animation-css/subject.css`)

```css
/* =====================================
MARK: Subject Animation
Scoped to .subject-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Wrapper (replaces old :root and body styles) ---------- */
.subject-wrapper {
    --bg: #000;
    --face: rgba(0, 0, 0, .7);
    --edge: rgba(196, 196, 210, .85);

    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;
    background: var(--bg);
    container-type: size;   /* lets the scene measure the animation area instead of the window */
    touch-action: none;
    cursor: grab;
}

.subject-wrapper.dragging {
    cursor: grabbing;
}

/* ---------- Scene ---------- */
.subject-scene {
    --u: calc(min(100cqw, 100cqh) / 100);   /* one scene unit: 1% of the shortest side of the animation area */
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    perspective: calc(var(--u) * 150);
}

.subject-rig {
    position: relative;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
}

.subject-wrapper .cube {
    position: absolute;
    left: 0;
    top: 0;
    transform-style: preserve-3d;
}

.subject-wrapper .face {
    position: absolute;
    width: calc(var(--s) * var(--u));
    height: calc(var(--s) * var(--u));
    left: calc(var(--s) * var(--u) / -2);
    top: calc(var(--s) * var(--u) / -2);
    background: var(--face);
    border: 1px solid var(--edge);
    box-sizing: border-box;
    backface-visibility: visible;
}

/* ---------- Word ---------- */
.subject-word {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    transform-origin: 0 0;
    margin: 0;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    font: 300 calc(var(--u) * 5) / 1 "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: .08em;
    color: #f2f2f7;
    text-shadow: 0 0 12px rgba(0, 0, 0, .9), 0 0 2px rgba(0, 0, 0, 1);
}
```

---

## 28. System  (slug: `system`)

### System: HTML + JavaScript  (`src/animations/system.astro`)

```astro
<div class="system set-sibling-index">
    <p class="span-split set-sibling-index">SYSTEM</p>
    <p class="span-split set-sibling-index">SYSTEM</p>
    <p class="span-split set-sibling-index">SYSTEM</p>
    <p class="span-split set-sibling-index">SYSTEM</p>
    <p class="span-split set-sibling-index">SYSTEM</p>
    <p class="span-split set-sibling-index">SYSTEM</p>
</div>

  

<script>
	// @ts-nocheck
	// =====================================
	// MARK: Animation Pause button
	// =====================================

	const animationButton = document.querySelector(".animation-button");
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let animationPlaying;

	// check if the user has motion preferences and set the according class on the button
	if(prefersReducedMotion === true) {
		animationButton?.classList.add("stop-animation");
		animationPlaying = false;
	} else {
		animationButton?.classList.add("play-animation");
		animationPlaying = true;
	}

	// toggle animation
	function toggleAnimation() {
		animationButton.classList.toggle("stop-animation");
		animationButton.classList.toggle("play-animation");

		let animationClass = document.querySelector(".stop-animation");

		animationClass ? animationPlaying = false : animationPlaying = true;

		// use this if ever implemented in general js
		// if (typeof onAnimationStateChange === "function") {
		// 	onAnimationStateChange(animationPlaying);
		// }
	}

	animationButton?.addEventListener("click", toggleAnimation)

</script>
```

### System: CSS  (`public/styles/animation-css/system.css`)

```css
/* =====================================
MARK: System Animation
===================================== */

.system {
    width: 100dvw;
    height: 90dvh;

    /* positions all p elements in center */
    display: grid;
    place-items: center;

    position: relative;
}

.system p{
    position: absolute;

    /* Sets width of p element, incrementing per element */
    width: calc(9rem * (1.25 + var(--index)));

    aspect-ratio: 1/1;
    border-radius: 50%;

    font-size: 3em;
    font-weight: bold;

    /* Takes index of p and set's it to parent index to use with the spans */
    --parent-index: var(--index);

    /* Inverses p layering */
    z-index: calc(var(--count) - var(--index));
    display: grid;
    place-items: center;


    background-image: 
    /* Creates black circles around every p-tag */
    radial-gradient(
      closest-side,
      #0000 calc(100% - .6em), 
      white 0 calc(100% - .01em),
      #0000 0
    );

    span{
        display: inline-block;
        position: absolute;
        padding-inline: 10px;
        transform: 
            rotateZ(calc(var(--index) * 360deg / var(--count)))
            translateY(calc((var(--parent-index) + 1) * -4.5rem))
        ;
        /* Layers letters on top of the circles */
        z-index: 1;
        background-color: var(--color-background);
    }
}

/* Plays the animation  */
.system p:nth-child(2n) {
  animation: rotateSystem calc(var(--index) * 2s + 5s) calc(var(--index) * -0.5s) infinite;
}

.system p:nth-child(2n-1) {
  animation: rotateSystem calc(var(--index) * 2s + 5s) calc(var(--index) * -0.5s) infinite reverse;
}


.system p:hover,
.system p:hover ~ p,
.system p:focus-visible,
.system p:focus-visible ~ p {
  animation-play-state: paused;
}

/* Rotates object with pauses in between */
@keyframes rotateSystem {
  0%   { transform: rotate(0deg); }
  9%   { transform: rotate(60deg); }
  17%  { transform: rotate(60deg); }
  26%  { transform: rotate(120deg); }
  34%  { transform: rotate(120deg); }
  43%  { transform: rotate(180deg); }
  51%  { transform: rotate(180deg); }
  60%  { transform: rotate(240deg); }
  68%  { transform: rotate(240deg); }
  77%  { transform: rotate(300deg); }
  85%  { transform: rotate(300deg); }
  94%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 29. Trigger  (slug: `trigger`)

### Trigger: HTML + JavaScript  (`src/animations/trigger.astro`)

```astro
---

---

<div class="trigger-wrapper">
    <canvas class="trigger-canvas" id="trigger-canvas"></canvas>
</div>

<script>
    // @ts-nocheck
    // =====================================
    // MARK: Trigger Animation
    // =====================================
    const canvas = document.getElementById("trigger-canvas");
    const section = canvas.closest(".animation-section");
    const ctx = canvas.getContext("2d");

    let width = 0,
        height = 0,
        scale = 1;
    let particles = [];
    let textPoints = [];
    let spelled = false;
    const mouse = { x: -1000, y: -1000 };

    class Particle {
        constructor(radius, angle) {
            this.radius = radius;
            this.baseAngle = angle;
            this.x = width / 2 + Math.cos(angle) * radius * scale;
            this.y = height / 2 + Math.sin(angle) * radius * scale;
            this.vx = 0;
            this.vy = 0;
            this.tx = this.x;
            this.ty = this.y;
        }
        update() {
            this.baseAngle += 0.001 + (300 - this.radius) * 0.00002;

            let targetX, targetY;
            if (spelled) {
                targetX = this.tx;
                targetY = this.ty;
            } else {
                targetX =
                    width / 2 + Math.cos(this.baseAngle) * this.radius * scale;
                targetY =
                    height / 2 + Math.sin(this.baseAngle) * this.radius * scale;
            }

            const dx = mouse.x - this.x,
                dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0.01) {
                const force = (120 - dist) / 120;
                this.vx -= (dx / dist) * force * 5;
                this.vy -= (dy / dist) * force * 5;
            }

            this.vx += (targetX - this.x) * 0.05;
            this.vy += (targetY - this.y) * 0.05;
            this.vx *= 0.85;
            this.vy *= 0.85;
            this.x += this.vx;
            this.y += this.vy;
        }
        draw() {
            ctx.fillRect(this.x, this.y, 1.5, 1.5);
        }
    }

    function buildTextPoints() {
        const off = document.createElement("canvas");
        off.width = width;
        off.height = height;
        const o = off.getContext("2d");
        let size = Math.min(width * 0.2, 260);
        const font = (s) =>
            `900 ${s}px system-ui, -apple-system, "Segoe UI", Arial, sans-serif`;
        o.font = font(size);
        const maxW = width * 0.86;
        const w = o.measureText("TRIGGER").width;
        if (w > maxW) {
            size *= maxW / w;
            o.font = font(size);
        }
        o.fillStyle = "#fff";
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.fillText("TRIGGER", width / 2, height / 2);

        const data = o.getImageData(0, 0, width, height).data;
        const step = Math.max(2, Math.round(size / 40));
        const pts = [];
        for (let y = 0; y < height; y += step)
            for (let x = 0; x < width; x += step)
                if (data[(y * width + x) * 4 + 3] > 128) pts.push([x, y]);

        // shuffle so the particles fly to random spots in the letters
        for (let i = pts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pts[i], pts[j]] = [pts[j], pts[i]];
        }
        textPoints = pts;
    }

    function assignTargets() {
        if (!textPoints.length) return;
        for (let i = 0; i < particles.length; i++) {
            const p = textPoints[i % textPoints.length];
            particles[i].tx = p[0] + (Math.random() - 0.5) * 1.5;
            particles[i].ty = p[1] + (Math.random() - 0.5) * 1.5;
        }
    }

    function initParticles() {
        particles = [];
        for (let radius = 10; radius < 300; radius += 6) {
            const n = Math.floor((2 * Math.PI * radius) / 5);
            for (let i = 0; i < n; i++)
                particles.push(new Particle(radius, (i / n) * Math.PI * 2));
        }
        buildTextPoints();
        assignTargets();
    }

    function resizeCanvas() {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return; // ignore hidden / zero-size layouts
        if (w === width && h === height) return; // nothing changed: keep the current particles
        width = w;
        height = h;
        canvas.width = width;
        canvas.height = height;
        scale = Math.min(1, Math.min(width, height) / 660);
        initParticles();
    }
    // rebuild whenever the animation area changes size (window resize, rotation)
    new ResizeObserver(resizeCanvas).observe(canvas);
    resizeCanvas();

    // ---------- Interaction: a click/tap switches between the disc and the word ----------
    function toggleShape() {
        spelled = !spelled;
        if (spelled) assignTargets(); // a new random distribution on every trigger
    }
    // pointer position measured against the canvas, since it sits inside the page
    function setMouse(clientX, clientY) {
        const r = canvas.getBoundingClientRect();
        mouse.x = clientX - r.left;
        mouse.y = clientY - r.top;
    }
    function forgetMouse() {
        mouse.x = -1000;
        mouse.y = -1000;
    }
    canvas.addEventListener("mousemove", (e) => setMouse(e.clientX, e.clientY));
    canvas.addEventListener("mouseleave", forgetMouse);
    canvas.addEventListener("click", toggleShape); // works for mouse and tap
    canvas.addEventListener(
        "touchstart",
        (e) => setMouse(e.touches[0].clientX, e.touches[0].clientY),
        { passive: true },
    );
    canvas.addEventListener(
        "touchmove",
        (e) => setMouse(e.touches[0].clientX, e.touches[0].clientY),
        { passive: true },
    );
    canvas.addEventListener("touchend", forgetMouse);

    // the play/stop button of the detail page adds .stop-animation when paused
    const isPaused = () => document.hidden || (section && section.querySelector(".stop-animation"));

    function animate() {
        if (!width || isPaused()) {
            requestAnimationFrame(animate);
            return;
        }
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "white";
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
</script>
```

### Trigger: CSS  (`public/styles/animation-css/trigger.css`)

```css
/* =====================================
MARK: Trigger Animation
Scoped to .trigger-wrapper so it doesn't
affect the rest of the page layout.
===================================== */

/* ---------- Ensure parent fills the animation-section height ---------- */
.animation-section .hidden-section {
    height: 100%;
}

/* ---------- Wrapper (replaces old :root and body styles) ---------- */
.trigger-wrapper {
    color-scheme: dark;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: clip;
    background: #000;
    user-select: none;
    -webkit-user-select: none;
}

/* ---------- Canvas ---------- */
.trigger-canvas {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
}
```

---
