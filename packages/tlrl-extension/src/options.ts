// Don't forget to import this wherever you use it
import { browser } from 'webextension-polyfill-ts';

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();

  browser.runtime.sendMessage({ message: 'logout' });
});
