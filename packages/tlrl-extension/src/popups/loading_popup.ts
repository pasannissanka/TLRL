import { browser } from 'webextension-polyfill-ts';

browser.runtime.sendMessage({ message: 'userInfo' }).then((val) => {
  if (!val.status) {
    console.log(window.location.pathname);
    window.location.replace('/popups/login_popup.html');
  } else {
    window.location.replace('/popups/bookmark_popup.html');
  }
  console.log(val);
});
