# California Republic

A simple, mobile-friendly static website foundation for **California Republic St Ives**, matching the clean white/red direction of the current live website.

## Current foundation

- Header/logo area inspired by the live California Republic website
- Navigation: Home, About Us, What’s On, Reservations, Menus, Gift Cards
- Clean white background with California Republic red accents
- Basic homepage sections only: Menus, About Us, What’s On, Menus links and Contact footer
- Working reservation link to Now Book It
- Working takeaway/order link to Square Online
- GitHub Pages deployment workflow kept unchanged

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
npm run validate:links
```
