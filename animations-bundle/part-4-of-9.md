<!-- PART 4 OF 9 of the glossary animations code bundle. Contains: Interface, Intra-action, Intraface, Invisible. -->
<!-- More parts follow: wait until you have all 9 parts before starting. -->

## 8. Interface  (slug: `interface`)

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

## 9. Intra-action  (slug: `intra-action`)

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

## 10. Intraface  (slug: `intraface`)

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

## 11. Invisible  (slug: `invisible`)

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

