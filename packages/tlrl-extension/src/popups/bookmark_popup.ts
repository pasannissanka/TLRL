import { browser } from 'webextension-polyfill-ts';

let imgUrl: string;
const executing = browser.tabs.executeScript({
  code: `document.querySelector('img').currentSrc`,
});

executing
  .then((result) => {
    imgUrl = result[0];
  })
  .catch((err) => {
    console.log(err);
  });

let loader = `
  <svg
  class="animate-spin -ml-1 mr-3 h-10 w-10 text-black"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  >
  <circle
    class="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="4"
  ></circle>
  <path
    class="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  ></path>
  </svg>
`;

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const tab = await browser.tabs.query({ currentWindow: true, active: true });

  const category = (document.querySelector('#category') as HTMLInputElement)
    .value;
  const tag = (document.querySelector('#tag') as HTMLInputElement).value;

  const bookmark = {
    title: tab[0].title,
    url: tab[0].url,
    hostname: new URL(tab[0].url).hostname,
    imgUrl: imgUrl,
    faviconUrl: tab[0].favIconUrl,
    tags: [tag],
  };

  console.log(bookmark);

  const content = document.getElementById('form').innerHTML;
  document.getElementById('form').innerHTML = loader;
  let response: any;
  try {
    response = await browser.runtime.sendMessage({
      message: 'createBookmark',
      payload: bookmark,
    });
  } catch (error) {
    console.log(error);
  }
  document.getElementById('form').innerHTML = content;
  if (response.message === 'SUCCESS') {
    window.close();
  }

  console.log(response);
});
