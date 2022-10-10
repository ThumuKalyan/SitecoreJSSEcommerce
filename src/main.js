import { handleEditorAnchors } from '@sitecore-jss/sitecore-jss-vue';
import i18ninit from './i18n';
import { createApp } from './createApp';
import config from './temp/config';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

let initLanguage = config.defaultLanguage;

const firebaseConfig = {
  apiKey: 'AIzaSyAiHXvFOJXLuJ-vyWquHaN1tBdPUWR8etM',
  authDomain: 'sitecore-jss.firebaseapp.com',
  projectId: 'sitecore-jss',
  storageBucket: 'sitecore-jss.appspot.com',
  messagingSenderId: '55520058253',
  appId: '1:55520058253:web:4c12670bcbcc45635f7bc4',
  measurementId: 'G-WWMCE1HXBQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the server will provide the window.__JSS_STATE__ object
  for us to acquire the initial state to run with on the client.

  This enables us to skip a network request to load up the layout data.

  SSR is initiated from /server/server.js.
*/
let __JSS_STATE__ = null;
const ssrRawJson = document.getElementById('__JSS_STATE__');
if (ssrRawJson) {
  __JSS_STATE__ = JSON.parse(ssrRawJson.innerHTML);
}
if (__JSS_STATE__) {
  // set i18n language SSR state language instead of static config default language
  initLanguage = __JSS_STATE__.sitecore.context.language;
}

// initialize the dictionary, then render the app
// note: if not making a multlingual app, the dictionary init can be removed.
i18ninit(initLanguage).then((i18n) => {
  // HTML element to place the app into
  const rootElement = document.getElementById('root');

  const initialState = __JSS_STATE__ || null;

  const { app } = createApp(initialState, i18n);
  app.mount(rootElement);

  handleEditorAnchors();
});
