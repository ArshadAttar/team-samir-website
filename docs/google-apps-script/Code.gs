/**
 * TeamSamir – website enquiry backend (Google Apps Script)
 *
 * Paste this into Extensions → Apps Script of the "TeamSamir Enquiries" Google Sheet.
 * Setup steps: see docs/google-apps-script/SETUP.md
 *
 * What it does on every form submit:
 *   1. Saves the enquiry as a new row in the sheet (always – no daily limit).
 *   2. Emails it from the sheet owner's Gmail to the same Gmail (Inbox + Sent copy),
 *      while the daily Gmail quota allows.
 *   3. When the quota is nearly used up, the row is marked "Pending" and the hourly
 *      digest job emails all pending enquiries together in one summary email.
 */

// ───────────────────────── Settings ─────────────────────────

const CONFIG = {
  // ID of the "TeamSamir Enquiries" Google Sheet (from its URL).
  SPREADSHEET_ID: '1_ZIMvnp5y87DWKRrooJzG7okN9hTui-smz9894jRhiM',
  SHEET_NAME: 'Enquiries',
  TIMEZONE: 'Asia/Kolkata',
  BRAND: 'TeamSamir',
  // Quota kept back for the hourly digest emails (max 24 per day).
  DIGEST_RESERVE: 25,
  // Max enquiries listed in one digest email (the rest go in the next one).
  DIGEST_MAX_ROWS: 300,
  // Ignore a repeat submit from the same mobile number within this many seconds.
  DUPLICATE_WINDOW_SEC: 120,
  // Submits faster than this after the page loaded are treated as bots.
  MIN_FILL_MS: 2500,
  // Optional extra recipients, e.g. ['partner@example.com']. Each one uses quota.
  CC: [],
};

const HEADERS = [
  'Timestamp',
  'Name',
  'Mobile',
  'WhatsApp',
  'Email',
  'Goal',
  'Plan',
  'Preferred Contact',
  'Form',
  'Page',
  'Email Status',
  'Follow-up Status',
  'Notes',
];
const COL = Object.fromEntries(HEADERS.map((h, i) => [h, i + 1]));

const STATUS_SENT = 'Sent';
const STATUS_PENDING = 'Pending (digest)';

// ───────────────────────── Web endpoint ─────────────────────────

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot / too-fast submit: pretend success so bots learn nothing.
    if (body.website || Number(body.elapsedMs || 0) < CONFIG.MIN_FILL_MS) {
      return json_({ ok: true });
    }

    const data = clean_(body);
    const error = validate_(data);
    if (error) return json_({ ok: false, error: error });

    // Repeated click / double submit from the same number.
    const cache = CacheService.getScriptCache();
    const dupKey = 'm_' + data.mobile;
    if (cache.get(dupKey)) return json_({ ok: true, duplicate: true });
    cache.put(dupKey, '1', CONFIG.DUPLICATE_WINDOW_SEC);

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    let row;
    try {
      const sheet = getSheet_();
      sheet.appendRow([
        new Date(),
        data.name,
        data.mobile,
        data.whatsapp,
        data.email,
        data.goal,
        data.plan,
        data.contactMethod,
        data.form,
        data.page,
        STATUS_PENDING,
        'New',
        '',
      ]);
      row = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    // Email now if quota allows; otherwise the hourly digest picks it up.
    if (MailApp.getRemainingDailyQuota() > CONFIG.DIGEST_RESERVE + CONFIG.CC.length) {
      try {
        sendEnquiryEmail_(data, new Date());
        getSheet_().getRange(row, COL['Email Status']).setValue(STATUS_SENT);
      } catch (mailErr) {
        console.error('Email failed, left for digest: ' + mailErr);
      }
    }

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Server error. Please try again.' });
  }
}

function doGet() {
  return json_({ ok: true, service: CONFIG.BRAND + ' enquiry endpoint' });
}

// ───────────────────────── Hourly digest ─────────────────────────

/** Emails every row still marked Pending in one summary email. Runs hourly. */
function sendPendingDigest() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    if (MailApp.getRemainingDailyQuota() < 1 + CONFIG.CC.length) return; // try next hour

    const sheet = getSheet_();
    const last = sheet.getLastRow();
    if (last < 2) return;

    const values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
    const pending = [];
    for (let i = 0; i < values.length && pending.length < CONFIG.DIGEST_MAX_ROWS; i++) {
      if (values[i][COL['Email Status'] - 1] === STATUS_PENDING) {
        pending.push({ row: i + 2, v: values[i] });
      }
    }
    if (!pending.length) return;

    const rowsHtml = pending
      .map((p) => {
        const v = p.v;
        return (
          '<tr>' +
          td_(fmtDate_(v[COL['Timestamp'] - 1])) +
          td_(v[COL['Name'] - 1]) +
          td_(phoneLink_(v[COL['Mobile'] - 1]), true) +
          td_(waLink_(v[COL['WhatsApp'] - 1]), true) +
          td_(v[COL['Email'] - 1] || '—') +
          td_(v[COL['Goal'] - 1] || '—') +
          td_(v[COL['Plan'] - 1] || '—') +
          td_(v[COL['Preferred Contact'] - 1]) +
          '</tr>'
        );
      })
      .join('');

    const head = ['Time', 'Name', 'Mobile', 'WhatsApp', 'Email', 'Goal', 'Plan', 'Contact by']
      .map((h) => '<th style="' + TH + '">' + h + '</th>')
      .join('');

    const html =
      wrap_(
        '<h2 style="margin:0 0 4px;font-size:20px;color:#171A21">' +
          pending.length +
          ' new enquir' + (pending.length === 1 ? 'y' : 'ies') +
          '</h2>' +
          '<p style="margin:0 0 16px;color:#646B78;font-size:13px">Today\'s single-email limit was reached, so these are grouped. All enquiries are also in the sheet.</p>' +
          '<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:13px"><thead><tr>' +
          head +
          '</tr></thead><tbody>' +
          rowsHtml +
          '</tbody></table></div>' +
          sheetButton_()
      );

    MailApp.sendEmail({
      to: ownerEmail_(),
      cc: CONFIG.CC.join(','),
      subject: '[' + CONFIG.BRAND + '] ' + pending.length + ' new enquiries – summary ' + fmtDate_(new Date()),
      htmlBody: html,
      name: CONFIG.BRAND + ' Website',
    });

    const stamp = 'Sent in digest ' + fmtDate_(new Date());
    pending.forEach((p) => sheet.getRange(p.row, COL['Email Status']).setValue(stamp));
  } finally {
    lock.releaseLock();
  }
}

// ───────────────────────── One-time setup ─────────────────────────

/** Run once from the Apps Script editor: headers, formatting and the hourly trigger. */
function setup() {
  const ss = getSpreadsheet_();
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);

  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight('bold')
    .setBackground('#1769FF')
    .setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
  sheet.getRange('A:A').setNumberFormat('dd-mmm-yyyy hh:mm am/pm');
  sheet.getRange(1, COL['Mobile'], sheet.getMaxRows(), 2).setNumberFormat('@'); // keep numbers as text
  sheet.setColumnWidths(1, HEADERS.length, 150);
  sheet.setColumnWidth(COL['Plan'], 260);
  sheet.setColumnWidth(COL['Notes'], 260);

  const followUp = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Called', 'No Answer', 'Demo Booked', 'Converted', 'Not Interested'], true)
    .build();
  sheet.getRange(2, COL['Follow-up Status'], sheet.getMaxRows() - 1, 1).setDataValidation(followUp);

  // Remove the default empty "Sheet1" if our sheet is separate.
  const def = ss.getSheetByName('Sheet1');
  if (def && def.getName() !== CONFIG.SHEET_NAME && def.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(def);
  }

  // Hourly digest trigger (recreated so running setup twice is safe).
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'sendPendingDigest')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendPendingDigest').timeBased().everyHours(1).create();

  console.log('Setup done. Emails go to: ' + ownerEmail_() + '. Quota left today: ' + MailApp.getRemainingDailyQuota());
}

/** Optional: run from the editor to send yourself a sample enquiry email. */
function testEmail() {
  sendEnquiryEmail_(
    {
      name: 'Test Enquiry',
      mobile: '9876543210',
      whatsapp: '9876543210',
      email: 'test@example.com',
      goal: 'Fat Loss / Weight Management',
      plan: 'Trial – INR 1,999',
      contactMethod: 'Phone Call',
      form: 'Book Your Free Demo Session',
      page: 'https://example.com',
    },
    new Date()
  );
}

// ───────────────────────── Email ─────────────────────────

const TH = 'text-align:left;padding:8px 10px;background:#EEF5FF;color:#0B3D91;border-bottom:1px solid #E1E6EF;white-space:nowrap';
const TD = 'padding:8px 10px;border-bottom:1px solid #E1E6EF;color:#171A21;vertical-align:top';

function sendEnquiryEmail_(d, when) {
  const row = (label, value) =>
    '<tr><td style="' + TD + ';color:#646B78;width:150px;white-space:nowrap">' + label + '</td><td style="' + TD + ';font-weight:600">' + value + '</td></tr>';

  const html = wrap_(
    '<h2 style="margin:0 0 4px;font-size:20px;color:#171A21">New enquiry from ' + esc_(d.name) + '</h2>' +
      '<p style="margin:0 0 16px;color:#646B78;font-size:13px">' + esc_(d.form || 'Website enquiry form') + ' · ' + fmtDate_(when) + '</p>' +
      '<table style="border-collapse:collapse;width:100%;font-size:14px">' +
      row('Name', esc_(d.name)) +
      row('Mobile', phoneLink_(d.mobile)) +
      row('WhatsApp', waLink_(d.whatsapp)) +
      row('Email', d.email ? '<a href="mailto:' + esc_(d.email) + '">' + esc_(d.email) + '</a>' : '—') +
      row('Goal', esc_(d.goal || '—')) +
      row('Plan', esc_(d.plan || '—')) +
      row('Preferred contact', esc_(d.contactMethod)) +
      row('Submitted from', d.page ? esc_(d.page) : '—') +
      '</table>' +
      sheetButton_()
  );

  const text =
    'New enquiry – ' + d.name + '\n\n' +
    'Name: ' + d.name + '\nMobile: +91 ' + d.mobile + '\nWhatsApp: +91 ' + d.whatsapp +
    '\nEmail: ' + (d.email || '-') + '\nGoal: ' + (d.goal || '-') + '\nPlan: ' + (d.plan || '-') +
    '\nPreferred contact: ' + d.contactMethod + '\nForm: ' + d.form + '\nTime: ' + fmtDate_(when) +
    '\n\nSheet: ' + getSpreadsheet_().getUrl();

  const options = {
    to: ownerEmail_(),
    subject: 'New Enquiry – ' + d.name + (d.plan ? ' – ' + d.plan : ''),
    body: text,
    htmlBody: html,
    name: CONFIG.BRAND + ' Website',
  };
  if (CONFIG.CC.length) options.cc = CONFIG.CC.join(',');
  if (d.email) options.replyTo = d.email; // "Reply" in Gmail goes to the customer
  MailApp.sendEmail(options);
}

function wrap_(inner) {
  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;background:#F5F7FB;padding:20px">' +
    '<div style="max-width:760px;margin:0 auto;background:#FFFFFF;border:1px solid #E1E6EF;border-radius:12px;overflow:hidden">' +
    '<div style="background:#111318;color:#FFFFFF;padding:14px 20px;font-weight:bold;font-size:15px">' + CONFIG.BRAND + ' · Website Enquiry</div>' +
    '<div style="padding:20px">' + inner + '</div></div></div>'
  );
}

function sheetButton_() {
  return (
    '<p style="margin:20px 0 0"><a href="' + getSpreadsheet_().getUrl() +
    '" style="display:inline-block;background:#1769FF;color:#FFFFFF;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:13px;font-weight:bold">Open enquiries sheet</a></p>'
  );
}

// ───────────────────────── Helpers ─────────────────────────

function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function getSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME, 0);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ownerEmail_() {
  return Session.getEffectiveUser().getEmail();
}

function clean_(b) {
  // Trim, cap length, and stop spreadsheet formula injection (=, +, -, @).
  const s = (v, max) => {
    let t = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
    if (/^[=+\-@]/.test(t)) t = "'" + t;
    return t;
  };
  const digits = (v) => String(v == null ? '' : v).replace(/\D/g, '').slice(-10);
  return {
    name: s(b.fullName, 50),
    email: s(b.email, 100),
    mobile: digits(b.mobileNumber),
    whatsapp: digits(b.whatsappNumber || b.mobileNumber),
    goal: s(b.goal, 80),
    plan: s(b.plan, 150),
    contactMethod: ['Phone Call', 'WhatsApp', 'Email'].indexOf(b.contactMethod) >= 0 ? b.contactMethod : 'Phone Call',
    form: s(b.formTitle, 120),
    page: s(b.pageUrl, 300),
  };
}

function validate_(d) {
  if (d.name.length < 2) return 'Name is required.';
  if (!/^[A-Za-z][A-Za-z .'-]*$/.test(d.name)) return 'Use letters and spaces only in the name.';
  if (!/^[6-9]\d{9}$/.test(d.mobile)) return 'Enter a valid 10-digit mobile number.';
  if (!/^[6-9]\d{9}$/.test(d.whatsapp)) return 'Enter a valid 10-digit WhatsApp number.';
  if (d.email && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(d.email)) return 'Enter a valid email.';
  return '';
}

function esc_(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Table cell; text is escaped unless it is our own pre-built link HTML (raw = true). */
function td_(v, raw) {
  const str = String(v == null ? '' : v);
  return '<td style="' + TD + '">' + (raw ? str : esc_(str)) + '</td>';
}

function phoneLink_(n) {
  n = String(n || '');
  return n ? '<a href="tel:+91' + esc_(n) + '">+91 ' + esc_(n) + '</a>' : '—';
}

function waLink_(n) {
  n = String(n || '');
  return n ? '<a href="https://wa.me/91' + esc_(n) + '">+91 ' + esc_(n) + '</a>' : '—';
}

function fmtDate_(d) {
  return d instanceof Date ? Utilities.formatDate(d, CONFIG.TIMEZONE, 'dd MMM yyyy, hh:mm a') : String(d || '');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
