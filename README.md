# California Republic

A premium, mobile-friendly GitHub Pages website for **California Republic St Ives** using only HTML, CSS and JavaScript.

## Website pages

- `index.html` — Homepage with hero, Order Online, Reserve, Taco Tuesday, Wednesday Burger Night, Happy Hour, Featured Menu, Kids & Family, Gallery and Contact
- `food-menu.html` — Full Food Menu page covering tacos, burgers, grill, Mexican favourites and kids menu
- `drinks-menu.html` — Full Drinks Menu page covering margaritas, cocktails and mocktails

## Key features

- Official California Republic logo in the header, hero, footer and favicon
- Navigation links for Home, Food Menu, Drinks Menu, Order Online, Reserve, Specials, Kids and Contact
- Square Online ordering links open in a new tab
- Now Book It reservation links open in a new tab
- Menu-led premium restaurant design with warm California red, charcoal, warm white and beige accents
- Image-led gallery and feature cards based on the supplied food, drink and venue photography themes
- Mobile-first layouts suitable for iPhone preview

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
