<!-- PART 2 OF 9 of the glossary animations code bundle. Contains: Balancing Feedback, Beyond Control. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

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

