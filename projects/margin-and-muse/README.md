# Margin & Muse — E-commerce course project

A bookstore concept by Brittany Alley, adapted from the FES Institute E-Commerce lesson. The supplied reference and book artwork are course resources; the storefront layout, colors and copy have been customized. Book covers belong to their respective rights holders.

## Run
Open this folder in VS Code, then open index.html with Live Server.

## Course techniques
- Semantic HTML and an external CSS file.
- BEM-style classes, reusable row and button styles.
- Flexbox navigation, hero, highlights and wrapping product rows.
- Responsive media queries at 900px and 640px.
- CSS hover transitions and a small JavaScript mobile-menu enhancement.

## Scope
Static storefront: twelve sample product listings, illustrative prices, and working section navigation. No checkout or payments. No fabricated customer ratings or business awards.

## Understand the layout
The desktop product width subtracts three 24px gaps before dividing by four. On tablet it uses two columns, subtracting one gap before dividing by two. The mobile menu toggles the hidden attribute and keeps aria-expanded in sync.

## Review before publishing
Open on a wide and narrow browser window. Check the navigation menu, keyboard focus, all cover images, section links and the email contact link.

## Git workflow
Create an empty GitHub repository called ecommerce-project. In this folder:

```bash
git init -b main
git add index.html styles.css index.js assets README.md
git commit -m "Build responsive Margin and Muse storefront"
git remote add origin https://github.com/bj-ship-it/ecommerce-project.git
git push -u origin main
```

For subsequent sections or changes: git add, git commit with a descriptive message, then git push. Enable GitHub Pages from main and /(root) when ready.
