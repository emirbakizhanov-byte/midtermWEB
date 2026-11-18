# ElectroTech — Electronics Store

**Topic:** A responsive and interactive online electronics store.

## Group members

- Student 1 — Emir Bakizhanov
- Student 2 — Isatay Makhambetuly
- Student 3 — Arlan Narushev

## Project description

ElectroTech is a storefront for browsing electronics, comparing smartphone specifications, learning about the company, and contacting customer support.

The midterm version was a static, responsive website built with HTML, CSS, and Bootstrap. For the endterm project the same website was extended with JavaScript and jQuery: a registration form with client-side validation, live product search with category filters, a product table with full CRUD operations, and an image gallery with a lightbox. All midterm pages, layouts, and responsive behavior were kept.

For the final project the website was extended with a light/dark theme, a sign-in system based on `localStorage`, a jQuery FAQ section, and live product data from a public API.

## Features implemented

### Midterm

- Five pages: home, product catalog, product comparison, about/team, and contact/support.
- Responsive Bootstrap grid and navigation with a mobile burger menu.
- Product cards and a responsive comparison table.
- Contact form with client-side validation for required fields, email, and phone.
- GitHub Actions workflow that deploys the site to GitHub Pages.

### Endterm

- **Form validation** (`contact.html`, `js/validation.js`): registration form with required field checks, email format check with a regular expression, a password strength indicator (weak / medium / strong), and a password confirmation check. Feedback is shown in real time while typing, and the form is not submitted until every field is valid.
- **Dynamic search and filter** (`products.html`, `js/catalog.js`): a search bar that filters products by name and specifications as the user types, and category buttons (All, Smartphones, Laptops, Audio, Accessories) that work together with the search. Filtering is case-insensitive and does not reload the page.
- **Dynamic table with CRUD** (`compare.html`, `js/table.js`): a product inventory table where items can be added and edited through a modal form, viewed in a details dialog, and deleted after a confirmation prompt. Inputs are validated in real time and the data is saved in `localStorage`.
- **Image gallery** (`products.html`, `js/catalog.js`): product images open in a lightbox with previous/next arrows, keyboard navigation, and smooth transitions made with jQuery `.fadeIn()`, `.fadeOut()`, and `.animate()`.
- **Shared script** (`js/script.js`): a "back to top" button that appears on scroll and scrolls the page up with a jQuery animation.

### Final

- **Light/Dark theme** (`js/theme.js`, `css/style.css`, all pages): a 🌙 / ☀️ button in the navbar switches the theme. The choice is saved in `localStorage`, so it stays the same on every page and after a refresh.
- **Sign-in / Sign-out** (`js/auth.js`, all pages): a "Sign in" button opens a form with name, email, and password fields that are validated before sign-in. Only the name and email are saved in `localStorage` (the password is never stored). Signed-in users see "Hi, *name*" and a "Sign out" button in the navbar and a personal greeting on the home page, and stay signed in after a refresh. "Sign out" clears the saved state.
- **FAQ** (`about.html`, `js/faq.js`): five questions about orders, warranty, and support. Answers open and close with jQuery `.slideToggle()`, and a + / − icon shows the current state.
- **Public API** (`products.html`, `js/catalog.js`): electronics products are loaded from the [Fake Store API](https://fakestoreapi.com/) with `fetch()`, parsed from JSON, and shown as cards. A spinner is shown while loading, a "Refresh" button loads the data again, the search bar also filters the API products, and an error message is shown if the request fails.

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6), jQuery 3.7, Fake Store API, GitHub Actions, and GitHub Pages.

## Individual contributions

| Group member | Midterm | Endterm | Final |
| --- | --- | --- | --- |
| Student 1 — Emir Bakizhanov | Semantic HTML structure and content for the home page, product catalog, and comparison table (`index.html`, `products.html`, `compare.html`); product images, links, and lazy loading. | Registration form with client-side validation: required fields, RegEx email check, password strength indicator, and password confirmation (`contact.html`, `js/validation.js`); shared "back to top" script (`js/script.js`). | Public API integration with `fetch()`: loading state, refresh button, and error handling (`products.html`, `js/catalog.js`); project report and screenshots (`Report.md`, `screenshots/`). |
| Student 2 — Isatay Makhambetuly | Shared CSS variables and styling, Flexbox navigation, Grid/Flexbox layouts, sticky header, team cards, and interaction states (`about.html`, `css/style.css`). | Real-time product search, category filter buttons, and the image gallery with a jQuery lightbox (`products.html`, `js/catalog.js`, `css/style.css`). | jQuery FAQ section with `.slideToggle()` and + / − indicators; unified page layouts and CSS variables (`about.html`, `js/faq.js`, `css/style.css`). |
| Student 3 — Arlan Narushev | Bootstrap contact form and validation, responsive Bootstrap grid and navigation across all five pages, tablet/mobile media queries, and GitHub Pages deployment (`contact.html`, all pages, `css/style.css`, `.github/workflows/pages.yml`). | Dynamic product inventory table with full CRUD operations: add, view, edit, and delete with confirmation (`compare.html`, `js/table.js`, `css/style.css`). | Light/dark theme toggle and sign-in / sign-out with `localStorage` (`js/theme.js`, `js/auth.js`, all pages, `css/style.css`); README, GitHub Pages deployment, and commit history. |

## Published website

[Open ElectroTech on GitHub Pages](https://emirbakizhanov-byte.github.io/midtermWEB/)

Repository: https://github.com/emirbakizhanov-byte/midtermWEB
