# My Home Restaurant

A polished static menu app for a bilingual home restaurant experience. It is designed for friends and family to browse dishes, switch between Chinese and English, search by dish or ingredient, and filter by category.

## What is included

- Vanilla HTML, CSS, and JavaScript with no build step.
- Bilingual menu content with Chinese as the default language.
- Search across names, descriptions, ingredients, and tags.
- Category filters with live dish counts.
- Responsive dish cards with local visual assets and graceful image fallbacks.
- Language preference saved in `localStorage`.
- Relative asset paths that work on GitHub Pages.

## Run locally

Use any static file server. With VS Code Live Server, open the project at:

```text
http://127.0.0.1:5500
```

Or run:

```bash
python3 -m http.server 5500
```

Then open `http://127.0.0.1:5500`.

## Edit the menu

Menu content lives in `data.js`. Add or update dishes by editing the `myMenu` array. Each dish should include:

- `slug`
- bilingual `name` and `description`
- `categories`
- bilingual `ingredients` and `tags`
- optional `rating`
- `image.src` and bilingual `image.alt`

Put new dish images in `assets/dishes/` and reference them with a relative path like `./assets/dishes/my-dish.svg`.

## Deploy to GitHub Pages

This project is fully static, so it can be deployed directly from the repository root with GitHub Pages:

1. Push the project to GitHub.
2. Open the repository settings.
3. Enable Pages from the main branch and root folder.
4. Visit the generated GitHub Pages URL.
