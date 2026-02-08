(function () {
  'use strict';

  var STORAGE_SNIPPETS = 'textRescuer_snippets';
  var STORAGE_SETTINGS = 'textRescuer_settings';
  var listEl = document.getElementById('list');
  var emptyEl = document.getElementById('empty');
  var errorEl = document.getElementById('error');
  var toastEl = document.getElementById('toast');
  var proBadge = document.getElementById('proBadge');
  var proCta = document.getElementById('proCta');
  var upgradeLink = document.getElementById('upgradeLink');
  var optionsLink = document.getElementById('optionsLink');

  var currentSnippets = [];
  var settings = { isPro: false, paymentUrl: '' };

  function i18n(id, subs) {
    if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
      return chrome.i18n.getMessage(id, subs || []) || id;
    }
    return id;
  }

  function getSettings() {
    return new Promise(function (resolve) {
      chrome.storage.local.get(STORAGE_SETTINGS, function (data) {
        var raw = data[STORAGE_SETTINGS] || {};
        resolve({
          isPro: !!raw.isPro,
          paymentUrl: (raw.paymentUrl || '').trim()
        });
      });
    });
  }

  function computeIsPro(raw) {
    var TRIAL_MS = 30 * 24 * 60 * 60 * 1000;
    var now = Date.now();
    var trialActive = (now - (raw.installedAt || 0)) < TRIAL_MS;
    var licenseOk = !!raw.licenseValid && (raw.licenseExpiresAt || 0) > now;
    return trialActive || licenseOk;
  }

  function getSettingsWithPro() {
    return new Promise(function (resolve) {
      chrome.storage.local.get(STORAGE_SETTINGS, function (data) {
        var raw = data[STORAGE_SETTINGS] || {};
        var trialMs = 30 * 24 * 60 * 60 * 1000;
        var now = Date.now();
        var trialActive = (now - (raw.installedAt || 0)) < trialMs;
        var licenseOk = !!raw.licenseValid && (raw.licenseExpiresAt || 0) > now;
        var paymentUrl = (raw.paymentUrl || '').trim();
        if (!paymentUrl && typeof TEXTRESCUER_CONFIG !== 'undefined') {
          paymentUrl = (TEXTRESCUER_CONFIG.CHECKOUT_URL || TEXTRESCUER_CONFIG.LANDING_URL || '').trim();
        }
        resolve({
          isPro: trialActive || licenseOk,
          paymentUrl: paymentUrl
        });
      });
    });
  }

  function formatTime(ts) {
    var d = new Date(ts);
    var now = new Date();
    var diff = now - d;
    if (diff < 60000) return i18n('timeNow');
    if (diff < 3600000) return (Math.floor(diff / 60000)) + ' ' + i18n('timeMinutes').replace('$1', '');
    if (diff < 86400000) return (Math.floor(diff / 3600000)) + ' ' + i18n('timeHours').replace('$1', '');
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  function formatTimeWithI18n(ts) {
    var d = new Date(ts);
    var now = new Date();
    var diff = now - d;
    if (diff < 60000) return i18n('timeNow');
    if (diff < 3600000) return i18n('timeMinutes', [String(Math.floor(diff / 60000))]);
    if (diff < 86400000) return i18n('timeHours', [String(Math.floor(diff / 3600000))]);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg;
    if (errorEl) errorEl.classList.remove('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');
    if (listEl) listEl.innerHTML = '';
    if (toastEl) toastEl.classList.add('hidden');
  }

  function showToast(msg) {
    if (toastEl) toastEl.textContent = msg;
    if (toastEl) toastEl.classList.remove('hidden');
    if (errorEl) errorEl.classList.add('hidden');
    setTimeout(function () { if (toastEl) toastEl.classList.add('hidden'); }, 2500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function applyPopupI18n() {
    var ids = ['popupTitle', 'popupSubtitle', 'proBadge', 'ctaText', 'upgradeLink', 'empty', 'optionsLink'];
    var msgIds = { popupTitle: 'popupTitle', popupSubtitle: 'popupSubtitle', proBadge: 'proBadge', ctaText: 'ctaFree', upgradeLink: 'upgradeBtn', empty: 'emptyState', optionsLink: 'settingsLink' };
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      var msgId = msgIds[id];
      if (el && msgId && chrome.i18n) {
        var msg = chrome.i18n.getMessage(msgId);
        if (msg) el.textContent = msg;
      }
    });
    var lang = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : 'en';
    var page = document.getElementById('popupPage');
    if (page) {
      page.lang = lang.split('-')[0];
      page.dir = (lang.toLowerCase().indexOf('he') !== -1 || lang.toLowerCase().indexOf('ar') !== -1) ? 'rtl' : 'ltr';
    }
  }

  function render(snippets) {
    currentSnippets = snippets || [];
    if (errorEl) errorEl.classList.add('hidden');

    if (settings.isPro) {
      if (proBadge) proBadge.classList.remove('hidden');
      if (proCta) proCta.classList.add('hidden');
    } else {
      if (proBadge) proBadge.classList.add('hidden');
      if (proCta) proCta.classList.remove('hidden');
      if (upgradeLink) upgradeLink.href = settings.paymentUrl || '#';
    }

    if (currentSnippets.length === 0) {
      if (listEl) listEl.innerHTML = '';
      if (emptyEl) {
        emptyEl.classList.remove('hidden');
        emptyEl.textContent = i18n('emptyState');
      }
      return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');
    var restoreBtnText = i18n('restoreBtn');
    listEl.innerHTML = currentSnippets.map(function (s, i) {
      var preview = (s.preview || s.text || '').slice(0, 80);
      var isMulti = (s.text || '').indexOf('\n') !== -1;
      return (
        '<div class="item" data-idx="' + i + '">' +
          '<p class="preview' + (isMulti ? ' multiline' : '') + '" title="' + escapeHtml((s.text || '').slice(0, 200)) + '">' + escapeHtml(preview || '(empty)') + '</p>' +
          (s.id ? '<div class="item-version">' + escapeHtml(String(s.id).slice(0, 30)) + '</div>' : '') +
          '<div class="meta">' +
            '<span class="time">' + formatTimeWithI18n(s.ts) + '</span>' +
            '<button type="button" class="btn" data-idx="' + i + '">' + restoreBtnText + '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    listEl.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var s = currentSnippets[idx];
        if (s && s.text !== undefined) restore(s.text);
      });
    });
  }

  function restore(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs[0]) {
        showError(i18n('errorNoTab'));
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, { action: 'restore', text: text }, function (response) {
        if (chrome.runtime.lastError) {
          navigator.clipboard.writeText(text).then(function () {
            showToast(i18n('toastCopied'));
          }).catch(function () {
            showError(i18n('errorRestore'));
          });
          return;
        }
        if (response && response.method === 'clipboard') {
          navigator.clipboard.writeText(text).then(function () {
            showToast(i18n('toastCopied'));
          }).catch(function () {
            showError(i18n('errorRestore'));
          });
        } else {
          showToast(i18n('toastRestored'));
        }
      });
    });
  }

  function load() {
    getSettingsWithPro().then(function (s) {
      settings = s;
      applyPopupI18n();
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0] ? tabs[0].url : '';
        if (!url || url.indexOf('chrome://') === 0 || url.indexOf('edge://') === 0 || url.indexOf('about:') === 0) {
          render([]);
          if (emptyEl) emptyEl.textContent = i18n('emptyState');
          return;
        }
        chrome.storage.local.get(STORAGE_SNIPPETS, function (data) {
          var store = data[STORAGE_SNIPPETS] || {};
          render(store[url] || []);
        });
      });
    });
  }

  if (optionsLink) {
    optionsLink.addEventListener('click', function (e) {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
  }

  load();
})();
