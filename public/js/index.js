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
