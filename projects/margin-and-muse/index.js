// Small navigation enhancement, like the menu in the course example.
const menuButton = document.querySelector('.nav__toggle');
const menuLinks = document.querySelector('#nav-links');
const mobileScreen = window.matchMedia('(max-width: 640px)');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  menuLinks.hidden = mobileScreen.matches && !open;
}

menuButton.hidden = false;
setMenu(false);
menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
menuLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileScreen.matches && !menuLinks.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
mobileScreen.addEventListener('change', () => setMenu(false));
