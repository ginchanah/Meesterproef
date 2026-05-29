# Minor Web Design & Development Meesterproef
## Glossary Item Animation

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
