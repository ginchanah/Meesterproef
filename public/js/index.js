// add class .set-sibling-index to add sibling index to all items in a container
const siblingIndexContainer = document.querySelectorAll(".set-sibling-index")

siblingIndexContainer?.forEach(container => {
    const directChildren = container.querySelectorAll(":scope > *")
    directChildren.forEach(item => {
        let selfIndex = Array.from(directChildren).indexOf(item)
        item.setAttribute("style", `--index:${selfIndex}`)
    })
    container.setAttribute("style", `--count:${directChildren.length}`)
})


// add class .span-split on a container with text to put all letters inside in a seperate span
const spanSplitContainer = document.querySelectorAll(".span-split")

spanSplitContainer?.forEach((el) => {
    el.innerHTML = el.textContent
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
});




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
});
