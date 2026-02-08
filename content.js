/**
 * Text Rescuer - Content Script
 * Free: 24h retention, 10 snippets. Pro (trial or paid): 30 days, 50 snippets, time machine.
 * Works on any site; never saves passwords or card fields.
 */

(function () {
  'use strict';

  var DEBOUNCE_MS = 500;
  var STORAGE_SNIPPETS = 'textRescuer_snippets';
  var STORAGE_SETTINGS = 'textRescuer_settings';
  var TRIAL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
  var DEFAULTS = {
    installedAt: 0,
    licenseKey: '',
    licenseValid: false,
    licenseExpiresAt: 0,
    verifyApiUrl: '',
    paymentUrl: '',
    instanceId: '',
    maxAgeMsFree: 24 * 60 * 60 * 1000,   // 1 day
    maxAgeMsPro: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxSnippetsFree: 10,
    maxSnippetsPro: 50,
    maxVersionsPerFieldPro: 5
  };

  function getSettings(cb) {
    try {
      chrome.storage.local.get(STORAGE_SETTINGS, function (data) {
        try {
          var raw = data[STORAGE_SETTINGS] || {};
          var settings = {};
          for (var k in DEFAULTS) settings[k] = raw[k] !== undefined ? raw[k] : DEFAULTS[k];
          if (!settings.instanceId) {
            settings.instanceId = 'x' + Math.random().toString(36).slice(2) + Date.now().toString(36);
            chrome.storage.local.set({ [STORAGE_SETTINGS]: settings });
          }
          if (!settings.installedAt) {
            settings.installedAt = Date.now();
            chrome.storage.local.set({ [STORAGE_SETTINGS]: settings });
          }
          var now = Date.now();
          var trialActive = (now - (settings.installedAt || 0)) < TRIAL_MS;
          var licenseOk = settings.licenseValid && (settings.licenseExpiresAt || 0) > now;
          settings.isPro = trialActive || licenseOk;
          cb(settings);
        } catch (e) {
          cb(DEFAULTS);
        }
      });
    } catch (e) {
      cb(DEFAULTS);
    }
  }

  function shouldSkipElement(el) {
    if (!el || !el.tagName) return true;
    var tag = el.tagName.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') return true;
    if (el.type === 'password') return true;
    var name = (el.name || '').toLowerCase();
    var id = (el.id || '').toLowerCase();
    var autocomplete = (el.getAttribute('autocomplete') || '').toLowerCase();
    var sensitive = ['password', 'cc_number', 'cc-number', 'cvv', 'cvc', 'cardnumber', 'creditcard', 'cc_csc', 'cc-exp'];
    for (var i = 0; i < sensitive.length; i++) {
      if (name.indexOf(sensitive[i]) !== -1 || id.indexOf(sensitive[i]) !== -1 || autocomplete.indexOf(sensitive[i]) !== -1) return true;
    }
    return false;
  }

  function getElementKey(el) {
    try {
      var tag = el.tagName.toLowerCase();
      var name = (el.name || '').replace(/"/g, '');
      var id = (el.id || '').replace(/"/g, '');
      var placeholder = (el.placeholder || '').slice(0, 20).replace(/\s/g, '_');
      var inputs = document.querySelectorAll(tag);
      var idx = -1;
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] === el) { idx = i; break; }
      }
      return tag + '_' + (id || name || 'n') + '_' + idx + '_' + placeholder;
    } catch (e) {
      return 'field_' + Date.now();
    }
  }

  var saveTimeout = null;
  function saveText(el, text) {
    if (shouldSkipElement(el)) return;
    var url = window.location.href;
    var key = getElementKey(el);
    var snippet = {
      id: key,
      text: text,
      ts: Date.now(),
      url: url,
      preview: String(text).slice(0, 60).replace(/\n/g, ' ')
    };

    getSettings(function (settings) {
      var isPro = !!settings.isPro;
      var maxAge = isPro ? settings.maxAgeMsPro : settings.maxAgeMsFree;
      var maxSnippets = isPro ? settings.maxSnippetsPro : settings.maxSnippetsFree;
      var maxVersions = isPro ? (settings.maxVersionsPerFieldPro || 5) : 1;

      chrome.storage.local.get(STORAGE_SNIPPETS, function (data) {
        try {
          var store = data[STORAGE_SNIPPETS] || {};
          if (!store[url]) store[url] = [];
          var list = store[url];
          var cutoff = Date.now() - maxAge;
          list = list.filter(function (s) { return s.ts > cutoff; });

          if (maxVersions <= 1) {
            list = list.filter(function (s) { return s.id !== key; });
          }
          list.unshift(snippet);
          if (maxVersions > 1) {
            var byId = {};
            var out = [];
            for (var i = 0; i < list.length; i++) {
              var s = list[i];
              if (!byId[s.id]) byId[s.id] = [];
              if (byId[s.id].length < maxVersions) {
                byId[s.id].push(s);
                out.push(s);
              }
            }
            list = out.slice(0, maxSnippets);
          } else {
            list = list.slice(0, maxSnippets);
          }
          store[url] = list;
          chrome.storage.local.set({ [STORAGE_SNIPPETS]: store });
        } catch (err) {
          console.warn('[Text Rescuer] save error', err);
        }
      });
    });
  }

  function onInput(e) {
    var el = e && e.target;
    if (!el || shouldSkipElement(el)) return;
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function () {
      try {
        saveText(el, el.value);
      } catch (err) {
        console.warn('[Text Rescuer] input error', err);
      }
    }, DEBOUNCE_MS);
  }

  function cleanupOld() {
    getSettings(function (settings) {
      var maxAge = settings.isPro ? settings.maxAgeMsPro : settings.maxAgeMsFree;
      var cutoff = Date.now() - maxAge;
      chrome.storage.local.get(STORAGE_SNIPPETS, function (data) {
        try {
          var store = data[STORAGE_SNIPPETS] || {};
          var changed = false;
          for (var u in store) {
            var before = store[u].length;
            store[u] = store[u].filter(function (s) { return s.ts > cutoff; });
            if (store[u].length !== before) changed = true;
          }
          if (changed) chrome.storage.local.set({ [STORAGE_SNIPPETS]: store });
        } catch (e) {}
      });
    });
  }

  try {
    document.addEventListener('input', onInput, true);
    document.addEventListener('keyup', onInput, true);
  } catch (e) {}

  chrome.runtime.onMessage.addListener(function (msg, _sender, sendResponse) {
    if (msg.action !== 'restore' || msg.text === undefined) return;
    try {
      var active = document.activeElement;
      var tag = active && active.tagName ? active.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') {
        active.value = msg.text;
        active.dispatchEvent(new Event('input', { bubbles: true }));
        sendResponse({ ok: true, method: 'field' });
      } else {
        sendResponse({ ok: true, method: 'clipboard' });
      }
    } catch (e) {
      sendResponse({ ok: true, method: 'clipboard' });
    }
    return true;
  });

  cleanupOld();
})();
