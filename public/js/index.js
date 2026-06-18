// =====================================
// MARK: Span Split
// =====================================

// looks for an element with the class .span-split
const spanSplitContainer = document.querySelectorAll(".span-split");

// goes over each element and performs the function
spanSplitContainer?.forEach((element) => {

    element.innerHTML = element.textContent
        // splits text into separate elements
        .split("")
        // loop over every element in split and put it in a span
        .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
        // join every element together again
        .join("");
});

// =====================================
// MARK: Sibling Index
// =====================================

// looks for an element with the class .set-sibling-index
const siblingIndexContainer = document.querySelectorAll(".set-sibling-index");

// For each element it finds it does the following script
siblingIndexContainer?.forEach(container => {
// :scope refers to parent element, so all the direct children elements
    const directChildren = container.querySelectorAll(":scope > *");
    // for each of the directChildren does the following script
    directChildren.forEach(item => {
        // Provides the index of the children elements
        let selfIndex = Array.from(directChildren).indexOf(item);
        // Sets the index as an propery on the item
        item.style.setProperty("--index", selfIndex);
    });
    // Sets the length of the directChildren array as a property on the container
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
