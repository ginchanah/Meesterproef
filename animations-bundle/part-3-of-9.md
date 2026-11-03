<!-- PART 3 OF 9 of the glossary animations code bundle. Contains: Control, Ecology, Friction. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

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

## 6. Ecology  (slug: `ecology`)

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

## 7. Friction  (slug: `friction`)

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

