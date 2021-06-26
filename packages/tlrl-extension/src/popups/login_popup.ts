import { browser } from 'webextension-polyfill-ts';
const button = document.querySelector('button');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = (document.querySelector('#email') as HTMLInputElement).value;
  const password = (document.querySelector('#password') as HTMLInputElement)
    .value;

  // TODO validation and error handling
  if (email && password) {
    console.log(email, password);
    browser.runtime
      .sendMessage({
        message: 'login',
        payload: { email, password },
      })
      .then((res) => {
        console.log(res);
        window.location.replace('/popups/bookmark_popup.html');
      });
  } else {
    console.log('Invalid', email, password);
  }
});
