// =====================================
// MARK: Span Split
// =====================================

// add class .span-split on a container with text to put all letters inside in a separate span
const spanSplitContainer = document.querySelectorAll(".span-split");

spanSplitContainer?.forEach((element) => {
    element.innerHTML = element.textContent
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
});


// =====================================
// MARK: Sibling Index
// =====================================

// add class .set-sibling-index to add sibling index to all items in a container
const siblingIndexContainer = document.querySelectorAll(".set-sibling-index");

siblingIndexContainer?.forEach(container => {
    const directChildren = container.querySelectorAll(":scope > *");
    directChildren.forEach(item => {
        let selfIndex = Array.from(directChildren).indexOf(item);
        item.style.setProperty("--index", selfIndex);
    });
    container.style.setProperty("--count", directChildren.length);
});






// =====================================
// MARK: Footer Banner
// =====================================

// infinite banner in footer
document.addEventListener("DOMContentLoaded", () => {
    const bannerContent = document.getElementById("bannerContent");
    if (!bannerContent) return;

    let word = bannerContent.dataset.word;
    if (!word) {
        const h1Element = document.querySelector("h1");
        word = h1Element ? h1Element.textContent.trim() : "glossary";
    }
    const repetitions = 10; // Ensure enough repetitions to fill wide screens

    // Create one continuous string of the word
    let halfContent = "";
    for (let i = 0; i < repetitions; i++) {
        halfContent += `<span class="banner-text">${word}</span>`;
    }

    // Duplicate the content to allow the seamless infinite CSS translation (-50%)
    bannerContent.innerHTML = halfContent + halfContent;

    // Adjust animation duration to ensure a consistent slow speed
    // Calculate distance traveled (50% of the total width)
    const distance = bannerContent.offsetWidth / 2;
    // Set a constant speed: pixels per second (adjust if needed to make it slower or faster)
    const pixelsPerSecond = 40;
    const duration = distance / pixelsPerSecond;
    
    bannerContent.style.animationDuration = `${duration}s`;
});
