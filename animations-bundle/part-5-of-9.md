<!-- PART 5 OF 9 of the glossary animations code bundle. Contains: Latent Space, Liminal Space, Lines of Flight. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

## 12. Latent Space  (slug: `latent-space`)

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

## 13. Liminal Space  (slug: `liminal-space`)

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

## 14. Lines of Flight  (slug: `lines-of-flight`)

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

