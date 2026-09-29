# Minor Web Design & Development Meesterproef
## Setting up the project

#### Prerequisites

To run the website, you need to have **npm** installed on your computer.

To do this, you can follow the instructions on https://nodejs.org/en/download/https://nodejs.org/en/download/.
Only go further once this step is completed.

#### Code editor

For a code editor, we recommend **Visual Studio Code (VS Code)**, which is what we recommend.

Once you receive the zip-file, you can unpack it and then open the folder inside VS Code.

Once you have the folder open in VS Code, you should see the folder Meesterproef and inside the folders **.astro**, **.vscode**, **node_modules**, **public**, **src** and a few other files.

The only folders you have to worry about are **src** and **public**.

#### Starting up the site locally on your computer

To start up the website, we have to get a little technical. 
First you open the folder of the project inside **VS Code**.
Then, in the navigation bar at the top of the program, you look for **Terminal**.

Then you click on **Terminal > New Terminal**.

Inside **VS Code** on the bottom right, underneath the code, a window should open up, that also reads *Terminal*.

#### If you want to run the website for the first time ever

Inside the Terminal window, you run the command:

**npm install**

This will take a little bit, so wait until this process has finished before you go further.
Once this step is completed, you run another command inside the terminal.

**npm run dev**

This will also start up in a few seconds, and somewhere inside the text in the terminal you will read something along the lines of this:

**Local    http://localhost:4321/ 

This is a link you can copy and paste inside your browser to open up the website. You should now be able to see the website!

#### If you have opened up the website before

If you have already followed the all the steps above, but it is now a new day and you have restarted your computer and want to open up the website again, it's less difficult.

You do *not* need to run the **npm install** command again.

The only thing you need to do to open up the website is to open up the folder inside VS Code, open up the terminal and the run the command

**npm run dev**

## Adding new glossary items:

Whenever you want to add a new glossary item, you can do so inside the file **data.js**, which you can find inside the folder **src > data > data.js**.

In here you find a json file that stores all the data, that will be outputted into HTML.

## Adding an animation for a specific glossary item:

Once you have added all the data for your glossary items into your data.json file, you look for the **"slug"** that you gave the item. 

To add an animation to be loaded into the detailpage of your glossary item, you need to navigate to **src > pages > animations**.   

Inside this folder, you add a new file, with the name of your slug: **example-slug.astro** (add the name of your file here)

This is the file in which you can add the HTML code for your animation. 
### Adding specific CSS for an animation:

To add specific CSS for your animation component, you can use the ``<style>``tag, to add your CSS inline.

But you also have the option of adding a separate CSS file. 

To do this, you navigate to **public > styles > animation-css**
Inside this folder you add a new file, using the slug of your glossary item corresponding to the slug in your data.js: **example-slug.css** (add the name of your file here)

This CSS file will automatically be loaded into your detail-page by the AnimationHead.astro components.

### Adding media to be used for the detail page of the glossary item

All media (images, videos, ...) should be added from your computer inside the folder **public > assets > media**
To use that image inside your detail page for the corresponding glossary item, you add the source inside your **data.js** using the path:

**/public/assets/media/example.png** (add the name of your file here)

## General Styling:

Navigate to **public > styles**
Inside this folder you find all CSS files responsible for the styling.

## Where to link your Javascript:

### For the homepage:
Add your script link inside **src > index.astro**
In this file, link your script within the ``<MainLayout> </MainLayout>`` tag.

### For the glossary item detail page:
For general js applying to all glossary item detail pages, add your script link inside **src >  pages > glossary-items > [item].astro**

In this file, link your script within the ``<DetailLayout> </DetailLayout>`` tag.

Animation-specific JavaScript should be added inline within the ``<script></script>`` tag within your animation file at **src > pages > animations > example-item.astro** (replace with your slug name).

## How to add the accessible start- stop button to a new animation

In case you add a new animation to a glossary item, you can add a start- and stop button to it that is also connected to the users preferences. 

**This button currently only works if your animation is CSS only and doesn't involve JavaScript.**
This should be true for all the animations coming out of the animation tool.

When you have added a file with your animation, (see: Adding an animation for a specific glossary item) inside this file, all the way at the bottom, you can add the following code:

```
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
		// onAnimationStateChange(animationPlaying);	
		// }
	}
	
	animationButton?.addEventListener("click", toggleAnimation)

</script>
```

This enables the start- stop button on the page.

## Explanation of all folders:

```
public
├── assets
│   ├── fonts
│   └── media
├── js
├─── styles
│    └── animation-css
src
├── components
├── data
├── layout
└── pages
    ├── animations
    ├── glossary-items
    └── sub-pages

```

### Public
In here you can find all folders with data that is directly displayed in the browser as is.
- `public/assets`  
    Static assets aren't changed by the browser while running
    
    - `public/assets/fonts`  
        Custom font files used across the website, in our case Inter and Courier Prime.
        
    - `public/assets/media`  
        All images that are used within the homepage and detail pages.
        
- `public/js`  
    Contains all Javascript files that are being loaded in to the page
    
- `public/styles`  
    Global CSS files that are being used in all pages
    
    - `public/styles/animation-css`  
        CSS files for the specific animations used in the glossary item detail pages


### Src
In here you can find all folders with data that still needs to be processed before being displayed in the browser.

- `src/components`  
    Reusable components that are being used across multiple pages, like the footer and header.
    
- `src/data`  
    The JSON file that contains all the data that is being used to generate the detail pages about each separate glossary item.
    
- `src/layout`  
    Layout components that define the overall structure of the pages (where the header, footer and main components go)
    
- `src/pages`  
    Page components that define the different routes/pages that can be redirected to within the website
    
    - `src/pages/animations`  
        The specific html of the animations used in the detail page corresponding in name to the glossary item they belong to.
        
    - `src/pages/glossary-items`  
        The page layout that generates the pages for the individual glossary terms based on the data.js
        
    - `src/pages/sub-pages`  
        The about and contact pages


## Structuring the data.js
**Important**: Data that doesn't exist for a certain glossary item can be removed from the file or left empty 

```
title: "Example item"
```
This is the name of the glossary item


```
slug: "example-item",
```
This is the slug, the string of words used to name files and routes to the glossary item. This is the name of the glossary item in a machine readable way, without uppercase letters and spaces.


```
categories: ["category-1", "category-2"]
```
These are the categories under which the item can be grouped and filtered. You can add a minimum of one category here. A new category is added by adding another comma within the group.


```
content: []
```
Under content, you add all the sections that you want to appear on your detail page.
A section usually consists of a text and one or more images. The text inside one content block should relate to the image in the same block. So for several texts explaining different artworks, several content sections should be added


```
content: [	
	{
		type: "media-left",
	}
```
The type inside the content section is the name of the CSS-class that is added to the section. This is where the different layouts can be defined. You can choose here out of a set of existing CSS classes that we added as presets. But it is possible to add new classes and layouts by adding additional CSS classes in the stylesheet that is linked to the page.
The current options to choose from are:
- **"media-left"** -> the image/video on the left, the text on the right
- **"media-right"** -> the image video on the right, the text on the left
- **"media-full"** -> only media, no text
- **"text-full** -> no image, only text
- **"media-top"** -> media on top, text on the bottom
- **"media-bottom"** -> media on the bottom, text on the top 
- **"text-columns"** -> two text blocks next to each other


```
content: [	
	{
		intro: [
			{
		
				type: "quote",
				
				text: `<b>Lorem</b> ipsum`
			
			},
			{
		
				type: "text",
				
				text: `<i>Lorem</i> ipsum`
			
			}
		
		] 
	}
```
The intro is the text that is being displayed next to the media. 
It is an array, in which you can add one or more items that will be displayed as the text in your section. We chose to make it an array so that one section could contain both a quote and more general text.

Under **type** you can choose what kind of text is being displayed and the layout is changed accordingly.
The current options to choose from are:
- **"quote"** -> if the text is a direct quote
- **"text"** -> if the text is just a general text with no other specifications
Under **text** you add the actual text that is to be displayed. 
- If you want to add a few words to be displayed as bold you can wrap them in the html tag `<b></b>`.
- If you want to add words to be displayed in italic font you can wrap them in the html tag ``<i></i>``. 


```
content: [	
	{
		author: "John Doe"
	}
```
Under **author** you add the name of the source for the artwork and/or text that is being referred to within the section. The author relates to the following field: **subtext**.


```
content: [	
	{
		subtext: {
			
			type: "link",
			
			text: "https://www.example.html"
		
		},
	}
```
The **subtext** is where the actual source of the text and/or image in the section is being linked. 
- Under **type** the type of source is defined. We currently have two options:
	- **"link"** -> when the source is an actual weblink, leading to a page
	- **"source"** -> when the source is a literary source, that doesn't link to another page
- Under **text** the actual source is linked (in case of a link, the whole link, starting with https://). 


```
content: [	

	media: [
	
		{
			type: "image",
			
			src: "/public/assets/media/example.png",
			
			alt: "This is a nice and descriptive alt-text",
		
		},
		{
			type: "video",
			
			src: "/public/assets/media/example.mp4",
			
			alt: "This is a nice and descriptive alt-text",
		
		},
	
	]
```
**Media** is where you add any kind of media you want to appear within the section. You can add several media types, but in the currently defined CSS-classes (under **type = "example-class"**), only two media instances per section are supported. Adding more media requires additional CSS classes to retain a proper layout.
- Under **type** you define the type of media. Currently supported are:
	- **"image"** 
	- **"video"**
- Under **src** you define the media source, always starting with **/public/assets/media/** and then the name of the file.
- Under **alt**, the alt text for the image/video is defined. This should be long and descriptive and enough to explain the image to a visually impaired person.


```
generalImage: {
	
	type: "image",
	
	src: "/public/assets/media/example.png"
	
	}
}
```
**generalImage** is where the typographic text example for the current word is defined. This image is not currently used in the layout, but we added it in the data since it was part of the original set of date we received, and might be included in later iterations of the website.




## Code Conventions
### General

- Annotate unfinished code with `TODO` in the appropriate comment style for each language (e.g. `<!-- TODO -->`).
- Everything is in English (code, comments, commit messages, issues, documentation).
- Work with `main` and `dev` branches.
- Always branch from `main` or `dev`.
- Keep track of work using issues.
- Branch naming:
  - `feature/header`
  - `fix/menu-bug`
  - `style/layout`
- Commit messages use imperative past tense, e.g. `changed value`.
- Make frequent commits for proper version control.
- Push to Git at least once per day.
- At the end of each week, review and delete branches that are no longer needed.
- In comments, explain what your code does (intent and behavior), not just what it is.
- Use double quotes by default; for nested quotes in content, use single quotes inside:
  - `"leslie zei 'kan je dat nog een keer zeggen'"`
- Think carefully about whether nesting (HTML/CSS) adds clarity; avoid deep or unnecessary nesting.
- Merges are reviewed: at least one other person looks at the code before merging (no solo merges).
- Always cite sources where applicable (e.g. code snippets, tutorials, articles).
- For large text blocks, enable soft wrap/word wrap in the editor (e.g. Alt+Z) to keep lines readable.

---

### HTML Conventions

- Use semantic HTML elements where possible (`<main>`, `<section>`, `<header>`, `<nav>`, etc.).
- Keep attributes on one line when reasonable (avoid excessive line breaks for a single tag).
- Class and id naming: use **kebab-case**:
  - Examples: `main-header`, `glossary-item`, `primary-button`.
- Prefer classes over ids for styling (ids should not be used as CSS hooks).

#### HTML Comment Style

```html
<!-- ===================================== -->
<!-- MARK: Hero                           -->
<!-- ===================================== -->

<!-- ---------- Sections ---------- -->

<!-- Small notes -->
```

---

### CSS Conventions

- Use CSS custom properties for values that may change or be reused:
  - Examples: `--primary-color`, `--spacing-large`, `--animation-duration`.
- Naming for custom properties and animation-related tokens uses `--name` style:
  - `--primary-color`
  - `--fade-in-duration`
- Use utility classes for simple, reusable patterns:
  - Example: `.background-red`, `.text-center`.
- Do **not** style by `id`; use classes instead.
- Class names use **kebab-case**:
  - `.main-header`, `.glossary-item-link`, `.primary-button`.
- Use CSS nesting thoughtfully:
  - Nest when it improves readability.
  - Avoid deep nesting that makes selectors hard to follow.

#### CSS Comment Style

```css
/* =====================================
MARK: Hero
===================================== */

/* ---------- Sections ---------- */

/* Small notes */
```

---

### JavaScript Conventions

- Function names are imperative (commands), describing what they do:
  - Examples: `changeHeaderColor`, `updateMenuState`, `handleFormSubmit`.
- Use **camelCase** for variables and function names:
  - `currentUser`, `menuIsOpen`, `scrollPosition`.
- Prefer **arrow functions** for function declarations.
- File structure / order:
  1. Declare variables.
  2. Call functions (initialization / setup code).
  3. Declare functions.

#### JavaScript Comment Style

```js
// =====================================
// MARK: Hero
// =====================================

// ---------- Sections ----------

// Small notes
```
