# ElectroTech — Electronics Store

**Topic:** A responsive and interactive online electronics store.

## Group members

- Student 1 — Emir Bakizhanov
- Student 2 — Isatay Makhambetuly
- Student 3 — Arlan Narushev

## Project description

ElectroTech is a storefront for browsing electronics, comparing smartphone specifications, learning about the company, and contacting customer support.

The midterm version was a static, responsive website built with HTML, CSS, and Bootstrap. For the endterm project the same website was extended with JavaScript and jQuery: a registration form with client-side validation, live product search with category filters, a product table with full CRUD operations, and an image gallery with a lightbox. All midterm pages, layouts, and responsive behavior were kept.

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

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6), jQuery 3.7, GitHub Actions, and GitHub Pages.

## Individual contributions

| Group member | Midterm | Endterm |
| --- | --- | --- |
| Student 1 — Emir Bakizhanov | Semantic HTML structure and content for the home page, product catalog, and comparison table (`index.html`, `products.html`, `compare.html`); product images, links, and lazy loading. | Registration form with client-side validation: required fields, RegEx email check, password strength indicator, and password confirmation (`contact.html`, `js/validation.js`); shared "back to top" script (`js/script.js`). |
| Student 2 — Isatay Makhambetuly | Shared CSS variables and styling, Flexbox navigation, Grid/Flexbox layouts, sticky header, team cards, and interaction states (`about.html`, `css/style.css`). | Real-time product search, category filter buttons, and the image gallery with a jQuery lightbox (`products.html`, `js/catalog.js`, `css/style.css`). |
| Student 3 — Arlan Narushev | Bootstrap contact form and validation, responsive Bootstrap grid and navigation across all five pages, tablet/mobile media queries, and GitHub Pages deployment (`contact.html`, all pages, `css/style.css`, `.github/workflows/pages.yml`). | Dynamic product inventory table with full CRUD operations: add, view, edit, and delete with confirmation (`compare.html`, `js/table.js`, `css/style.css`). |

## Published website

[Open ElectroTech on GitHub Pages](https://emirbakizhanov-byte.github.io/midtermWEB/)
