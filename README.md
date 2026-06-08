# Minor Web Design & Development Meesterproef
## Adding new glossary items:

Whenever you want to add a new glossary item, you can do so inside the file **data.js**, which you can find inside the folder **src > data > daja.js**.

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

All media should be added inside **public > assets > media**
To use that image inside your detail page for the corresponding glossary item, you add the source inside your **data.js** using the path:

**/public/assets/images/example.png** (add the name of your file here)

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

## Explanation of all folders:

```
public
├── assets
│   ├── fonts
│   └── images
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
- Use `@layer` to organize CSS (e.g. base, components, utilities).

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
