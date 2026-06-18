# California Republic

A premium, mobile-friendly GitHub Pages website for **California Republic St Ives** using only HTML, CSS and JavaScript.

## Website pages

- `index.html` — Homepage with hero, Order Online, Reserve, Taco Tuesday, Wednesday Burger Night, Happy Hour, Featured Menu, Kids & Family, Gallery and Contact
- `food-menu.html` — Full Food Menu page covering tacos, burgers, grill, Mexican favourites and kids menu
- `drinks-menu.html` — Full Drinks Menu page covering margaritas, cocktails and mocktails

## Key features

- Original uploaded California Republic logo image embedded directly as JPEG data URIs in the header navigation and favicon only, so no generated/vector logo is used and the logo never appears as a hero image, page image or background
- Navigation links for Home, Food Menu, Drinks Menu, Order Online, Reserve, Specials, Kids and Contact
- Square Online ordering links open in a new tab
- Now Book It reservation links open in a new tab
- Menu-led premium restaurant design with warm California red, charcoal, warm white and beige accents
- Image-led gallery and feature cards based on the supplied food, drink and venue photography themes
- Mobile-first layouts suitable for iPhone preview
- Inquiry modal connected to FormSubmit so GitHub Pages can send customer inquiries without a custom backend

## Inquiry form email setup

The “Email the Team” and “Make an inquiry” buttons open the on-page inquiry form. The form posts to FormSubmit at `https://formsubmit.co/ajax/hellocalirepublic@gmail.com`, which forwards submissions to `hellocalirepublic@gmail.com`.

FormSubmit requires a one-time activation: after the first real inquiry submission from the live site, open the confirmation email sent to `hellocalirepublic@gmail.com` and click the activation link. Until that confirmation is complete, FormSubmit may hold or reject deliveries. No paid account or API key is required for the current setup.

## Preview locally

No backend or build step is required.

```bash
npm run preview
```

Then open <http://localhost:4173> in your browser.

You can also use:

```bash
npm start
```

## Updating menus next time

The site is static, so menu updates are quick:

1. Edit the item names, descriptions and prices directly in `food-menu.html` or `drinks-menu.html`.
2. Keep each menu category inside the existing `menu-category` cards so the layout stays clean on mobile.
3. Replace food or drink photos by uploading the new image to `assets/photos/`, then updating the matching `<img src="./assets/photos/...">` path in the page.
4. Do not add the California Republic logo to page sections, cards, footers or backgrounds; keep it in the top-left navigation only.
5. Run `npm run check` after edits, then preview with `npm run preview`.

## Deploy to GitHub Pages

The GitHub Pages workflow is kept in `.github/workflows/pages.yml`.

To deploy:

1. Merge changes into `main`.
2. In GitHub repository settings, ensure Pages is enabled for GitHub Actions.
3. The `Deploy static site to GitHub Pages` workflow will upload the repository root and publish the site.
4. The live site URL appears in the workflow summary under the `github-pages` environment.

You can also run the workflow manually from the GitHub Actions tab using `workflow_dispatch`.

## Validation

```bash
npm run check
```
