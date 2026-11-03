<!-- PART 9 OF 9 of the glossary animations code bundle. Contains: Silence, System. -->
<!-- This is the last part: you now have all 9 parts. -->

## 23. Silence  (slug: `silence`)

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

## 24. System  (slug: `system`)

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
