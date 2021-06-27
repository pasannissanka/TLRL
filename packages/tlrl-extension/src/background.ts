// eslint-disable-next-line import/no-unassigned-import
// import './options-storage';
// Don't forget to import this wherever you use it
import { browser } from 'webextension-polyfill-ts';

// browser.browserAction.onClicked.addListener(async (tab, info) => {
//   try {
//     const userStatus = await isLoggedIn();
//     if (userStatus.status) {
//       return browser.windows.create({
//         url: '/browser_action/bookmark_popup.html',
//         width: 300,
//         height: 600,
//         focused: true,
//       });
//     } else {
//       return browser.windows.create({
//         url: '/browser_action/login_popup.html',
//         width: 300,
//         height: 600,
//         focused: true,
//       });
//     }
//   } catch (error) {
//     return error;
//   }
// });

browser.runtime.onMessage.addListener(async (data, sender) => {
  console.log(data);
  if (data.message === 'login') {
    try {
      const res = await loginUser({ ...data.payload });
      console.log(res.data.token);
      browser.storage.local.set({
        token: res.data.token,
        userId: res.data.userId,
      });

      if (browser.runtime.lastError) {
        return Promise.reject(browser.runtime.lastError);
      }
      return Promise.resolve({
        response: { userId: res.data.userId },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'userInfo') {
    try {
      const status = await isLoggedIn();
      console.log(status);
      return Promise.resolve(status);
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'logout') {
    try {
      const status = await isLoggedIn();
      if (!status.status) {
        return Promise.reject(false);
      }
      await logoutUser();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'createBookmark') {
    try {
      const status = await isLoggedIn();
      const res = await newBookmark(data.payload, status.userInfo);
      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      Promise.reject(error);
    }
  }
  return Promise.reject(false);
});

async function loginUser(userInfo: any) {
  console.log(userInfo);
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
    body: JSON.stringify({
      email: userInfo.email,
      password: userInfo.password,
    }),
  });
  return response.json();
}

async function isLoggedIn() {
  const userInfo = await browser.storage.local.get(['token', 'userId']);
  if (browser.runtime.lastError) {
    return Promise.resolve({ status: false, userInfo: undefined });
  }
  console.log(userInfo);
  if (userInfo.token && userInfo.userId) {
    console.log('user info', userInfo.token, userInfo.userId);
    return Promise.resolve({ status: true, userInfo: userInfo });
  }
  return Promise.resolve({ status: false, userInfo: undefined });
}

async function logoutUser() {
  await browser.storage.local.remove(['token', 'userId']);
  if (browser.runtime.lastError) {
    return Promise.reject();
  }
  return Promise.resolve('ok');
}

async function newBookmark(data, userInfo) {
  const response = await fetch('http://localhost:4000/bookmark/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userInfo.token}`,
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  return response.json();
}
