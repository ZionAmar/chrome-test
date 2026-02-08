/**
 * Storage schema and helpers for Text Rescuer.
 * Free: 30 min retention, 10 snippets per page.
 * Pro: 7 days retention, 50 snippets, time machine (multiple versions per field).
 */

const STORAGE_SNIPPETS = 'textRescuer_snippets';
const STORAGE_SETTINGS = 'textRescuer_settings';

const DEFAULTS = {
  isPro: false,
  licenseKey: '',
  paymentUrl: 'https://example.com/text-rescuer-pro',
  maxAgeMsFree: 30 * 60 * 1000,        // 30 minutes
  maxAgeMsPro: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSnippetsFree: 10,
  maxSnippetsPro: 50,
  maxVersionsPerFieldPro: 5
};

function getSettings() {
  return new Promise(resolve => {
    chrome.storage.local.get(STORAGE_SETTINGS, data => {
      resolve({ ...DEFAULTS, ...(data[STORAGE_SETTINGS] || {}) });
    });
  });
}

function setSettings(settings) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_SETTINGS]: settings }, resolve);
  });
}

function getSnippets() {
  return new Promise(resolve => {
    chrome.storage.local.get(STORAGE_SNIPPETS, data => {
      resolve(data[STORAGE_SNIPPETS] || {});
    });
  });
}

function setSnippets(store) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_SNIPPETS]: store }, resolve);
  });
}

function getSnippetsForUrl(url) {
  return getSnippets().then(store => store[url] || []);
}

// Export for use in content script (no modules in extension without bundling - we'll duplicate constants or use a shared pattern)
if (typeof window !== 'undefined') {
  window.TextRescuerStorage = {
    STORAGE_SNIPPETS,
    STORAGE_SETTINGS,
    DEFAULTS,
    getSettings,
    setSettings,
    getSnippets,
    setSnippets,
    getSnippetsForUrl
  };
}
