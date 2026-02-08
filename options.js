(function () {
  'use strict';

  var STORAGE_SETTINGS = 'textRescuer_settings';
  var TRIAL_MS = 30 * 24 * 60 * 60 * 1000;
  var licenseKeyEl = document.getElementById('licenseKey');
  var paymentUrlEl = document.getElementById('paymentUrl');
  var verifyApiUrlEl = document.getElementById('verifyApiUrl');
  var verifyBtn = document.getElementById('verifyBtn');
  var savePaymentBtn = document.getElementById('savePayment');
  var saveApiUrlBtn = document.getElementById('saveApiUrl');
  var buyProLink = document.getElementById('buyPro');
  var proStatusEl = document.getElementById('proStatus');
  var toastEl = document.getElementById('optionsToast');

  var settings = {
    installedAt: 0,
    licenseKey: '',
    licenseValid: false,
    licenseExpiresAt: 0,
    verifyApiUrl: '',
    paymentUrl: ''
  };

  function i18n(id, subs) {
    if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
      return chrome.i18n.getMessage(id, subs || []);
    }
    return id;
  }

  function getSettings() {
    return new Promise(function (resolve) {
      chrome.storage.local.get(STORAGE_SETTINGS, function (data) {
        var raw = data[STORAGE_SETTINGS] || {};
        settings.installedAt = raw.installedAt || 0;
        settings.licenseKey = raw.licenseKey || '';
        settings.licenseValid = !!raw.licenseValid;
        settings.licenseExpiresAt = raw.licenseExpiresAt || 0;
        settings.verifyApiUrl = (raw.verifyApiUrl || '').trim();
        settings.paymentUrl = (raw.paymentUrl || '').trim();
        settings.instanceId = raw.instanceId || '';
        if (!settings.installedAt) {
          settings.installedAt = Date.now();
          chrome.storage.local.set({ [STORAGE_SETTINGS]: settings });
        }
        resolve(settings);
      });
    });
  }

  function setSettings(s) {
    return new Promise(function (resolve) {
      chrome.storage.local.set({ [STORAGE_SETTINGS]: s }, resolve);
    });
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    setTimeout(function () { toastEl.classList.add('hidden'); }, 3000);
  }

  function isPro() {
    var now = Date.now();
    var trialActive = (now - (settings.installedAt || 0)) < TRIAL_MS;
    var licenseOk = settings.licenseValid && (settings.licenseExpiresAt || 0) > now;
    return trialActive || licenseOk;
  }

  function renderStatus() {
    if (!proStatusEl) return;
    var now = Date.now();
    var trialActive = (now - (settings.installedAt || 0)) < TRIAL_MS;
    var licenseOk = settings.licenseValid && (settings.licenseExpiresAt || 0) > now;

    if (licenseOk) {
      proStatusEl.textContent = i18n('proStatusActive');
      proStatusEl.className = 'pro-status active';
    } else if (trialActive) {
      var daysLeft = Math.ceil((TRIAL_MS - (now - settings.installedAt)) / (24 * 60 * 60 * 1000));
      proStatusEl.textContent = i18n('proStatusTrial', [String(daysLeft)]);
      proStatusEl.className = 'pro-status active';
    } else {
      proStatusEl.textContent = i18n('proStatusInactive');
      proStatusEl.className = 'pro-status inactive';
    }
  }

  function verifyLicense() {
    var key = (licenseKeyEl && licenseKeyEl.value) ? licenseKeyEl.value.trim() : '';
    if (!key) {
      showToast(i18n('toastInvalidKey'));
      return;
    }
    var apiUrl = (verifyApiUrlEl && verifyApiUrlEl.value) ? verifyApiUrlEl.value.trim() : (settings.verifyApiUrl || '').trim();
    if (!apiUrl) {
      showToast(i18n('toastVerifyError'));
      return;
    }
    if (verifyApiUrlEl && verifyApiUrlEl.value.trim()) settings.verifyApiUrl = verifyApiUrlEl.value.trim();
    var instanceId = settings.instanceId || ('x' + Math.random().toString(36).slice(2) + Date.now().toString(36));
    if (!settings.instanceId) {
      settings.instanceId = instanceId;
      setSettings(settings);
    }
    var url = apiUrl + (apiUrl.indexOf('?') !== -1 ? '&' : '?') + 'key=' + encodeURIComponent(key) + '&instance_id=' + encodeURIComponent(instanceId);

    verifyBtn.disabled = true;
    fetch(url, { method: 'GET', mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        settings.licenseKey = key;
        settings.licenseValid = !!(data && data.valid);
        // One-time purchase: expires_at null = unlock forever (year 2099)
        var exp = (data && data.expires_at) ? new Date(data.expires_at).getTime() : null;
        settings.licenseExpiresAt = exp || new Date('2099-12-31').getTime();
        return setSettings(settings);
      })
      .then(function () {
        renderStatus();
        showToast(settings.licenseValid ? i18n('toastProActivated') : i18n('toastInvalidKey'));
      })
      .catch(function () {
        showToast(i18n('toastVerifyError'));
      })
      .then(function () {
        verifyBtn.disabled = false;
      });
  }

  function load() {
    getSettings().then(function () {
      var paymentUrl = settings.paymentUrl;
      var verifyApiUrl = settings.verifyApiUrl;
      if (typeof TEXTRESCUER_CONFIG !== 'undefined') {
        if (!paymentUrl) paymentUrl = (TEXTRESCUER_CONFIG.CHECKOUT_URL || TEXTRESCUER_CONFIG.LANDING_URL || '').trim();
        if (!verifyApiUrl) verifyApiUrl = (TEXTRESCUER_CONFIG.VERIFY_API_URL || '').trim();
      }
      if (licenseKeyEl) licenseKeyEl.value = settings.licenseKey || '';
      if (paymentUrlEl) paymentUrlEl.value = paymentUrl || '';
      if (verifyApiUrlEl) verifyApiUrlEl.value = verifyApiUrl || '';
      if (buyProLink) buyProLink.href = paymentUrl || '#';
      renderStatus();
      applyI18n();
    });
  }

  function saveApiUrl() {
    var url = (verifyApiUrlEl && verifyApiUrlEl.value) ? verifyApiUrlEl.value.trim() : '';
    settings.verifyApiUrl = url;
    setSettings(settings).then(function () {
      showToast(i18n('toastSaved'));
    });
  }

  function applyI18n() {
    var ids = ['optionsTitle', 'optionsSubtitle', 'proSectionTitle', 'proSectionDesc', 'licenseLabel', 'verifyBtn', 'buyProBtn', 'paymentUrlLabel', 'savePaymentBtn', 'privacyTitle', 'privacyText'];
    var msgIds = { optionsTitle: 'optionsTitle', optionsSubtitle: 'optionsSubtitle', proSectionTitle: 'proSectionTitle', proSectionDesc: 'proSectionDesc', licenseLabel: 'licenseLabel', verifyBtn: 'verifyBtn', buyProBtn: 'buyProBtn', paymentUrlLabel: 'paymentUrlLabel', savePaymentBtn: 'savePaymentBtn', privacyTitle: 'privacyTitle', privacyText: 'privacyText' };
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      var msgId = msgIds[id] || id;
      if (el && chrome.i18n) {
        var msg = chrome.i18n.getMessage(msgId);
        if (msg) el.textContent = msg;
      }
    });
    if (licenseKeyEl && chrome.i18n) licenseKeyEl.placeholder = chrome.i18n.getMessage('licensePlaceholder') || licenseKeyEl.placeholder;
    var lang = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : 'en';
    var page = document.getElementById('optionsPage');
    if (page) {
      page.lang = lang.split('-')[0];
      page.dir = (lang.toLowerCase().indexOf('he') !== -1 || lang.toLowerCase().indexOf('ar') !== -1) ? 'rtl' : 'ltr';
    }
  }

  if (verifyBtn) verifyBtn.addEventListener('click', verifyLicense);
  if (saveApiUrlBtn) saveApiUrlBtn.addEventListener('click', saveApiUrl);
  if (savePaymentBtn) {
    savePaymentBtn.addEventListener('click', function () {
      var url = (paymentUrlEl && paymentUrlEl.value) ? paymentUrlEl.value.trim() : '';
      settings.paymentUrl = url;
      setSettings(settings).then(function () {
        if (buyProLink) buyProLink.href = settings.paymentUrl || '#';
        showToast(i18n('toastSaved'));
      });
    });
  }
  if (buyProLink) {
    buyProLink.addEventListener('click', function (e) {
      if (!settings.paymentUrl) {
        e.preventDefault();
        showToast('Set checkout URL first.');
      }
    });
  }

  load();
})();
