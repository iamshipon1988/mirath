'use strict';

/* ─── CURRENCIES ──────────────────────────────────────── */
var CURRENCIES = [
  { sym: '$',        code: 'USD', label: 'USD', name: 'US Dollar',    flag: '\uD83C\uDDFA\uD83C\uDDF8' },
  { sym: '\u00A3',   code: 'GBP', label: 'GBP', name: 'Brit. Pound',  flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  { sym: '\u20AC',   code: 'EUR', label: 'EUR', name: 'Euro',          flag: '\uD83C\uDDEA\uD83C\uDDFA' },
  { sym: 'C$',       code: 'CAD', label: 'CAD', name: 'Canada',        flag: '\uD83C\uDDE8\uD83C\uDDE6' },
  { sym: 'A$',       code: 'AUD', label: 'AUD', name: 'Australia',     flag: '\uD83C\uDDE6\uD83C\uDDFA' },
  { sym: 'S$',       code: 'SGD', label: 'SGD', name: 'Singapore',     flag: '\uD83C\uDDF8\uD83C\uDDEC' },
  { sym: '\u20B9',   code: 'INR', label: 'INR', name: 'India',         flag: '\uD83C\uDDEE\uD83C\uDDF3' },
  { sym: '\u09F3',   code: 'BDT', label: 'BDT', name: 'Bangladesh',    flag: '\uD83C\uDDE7\uD83C\uDDE9' },
  { sym: '\u20A8',   code: 'PKR', label: 'PKR', name: 'Pakistan',      flag: '\uD83C\uDDF5\uD83C\uDDF0' },
  { sym: 'RM',       code: 'MYR', label: 'MYR', name: 'Malaysia',      flag: '\uD83C\uDDF2\uD83C\uDDFE' },
  { sym: 'Rp',       code: 'IDR', label: 'IDR', name: 'Indonesia',     flag: '\uD83C\uDDEE\uD83C\uDDE9' },
  { sym: '\u062F.\u0625', code: 'AED', label: 'AED', name: 'UAE',      flag: '\uD83C\uDDE6\uD83C\uDDEA' },
  { sym: 'SR',       code: 'SAR', label: 'SAR', name: 'Saudi Arabia',  flag: '\uD83C\uDDF8\uD83C\uDDE6' },
  { sym: 'QR',       code: 'QAR', label: 'QAR', name: 'Qatar',         flag: '\uD83C\uDDF6\uD83C\uDDE6' },
  { sym: 'KD',       code: 'KWD', label: 'KWD', name: 'Kuwait',        flag: '\uD83C\uDDF0\uD83C\uDDFC' },
  { sym: 'BD',       code: 'BHD', label: 'BHD', name: 'Bahrain',       flag: '\uD83C\uDDE7\uD83C\uDDED' },
  { sym: 'OMR',      code: 'OMR', label: 'OMR', name: 'Oman',          flag: '\uD83C\uDDF4\uD83C\uDDF2' },
  { sym: 'JD',       code: 'JOD', label: 'JOD', name: 'Jordan',        flag: '\uD83C\uDDEF\uD83C\uDDF4' },
  { sym: '\u20BA',   code: 'TRY', label: 'TRY', name: 'Turkey',        flag: '\uD83C\uDDF9\uD83C\uDDF7' },
  { sym: 'E\u00A3',  code: 'EGP', label: 'EGP', name: 'Egypt',         flag: '\uD83C\uDDEA\uD83C\uDDEC' },
  { sym: 'MAD',      code: 'MAD', label: 'MAD', name: 'Morocco',       flag: '\uD83C\uDDF2\uD83C\uDDE6' },
  { sym: 'DA',       code: 'DZD', label: 'DZD', name: 'Algeria',       flag: '\uD83C\uDDE9\uD83C\uDDFF' },
  { sym: '\u20A6',   code: 'NGN', label: 'NGN', name: 'Nigeria',       flag: '\uD83C\uDDF3\uD83C\uDDEC' },
  { sym: '\u20B8',   code: 'KZT', label: 'KZT', name: 'Kazakhstan',    flag: '\uD83C\uDDF0\uD83C\uDDFF' }
];

/* ─── QUESTIONS ───────────────────────────────────────── */
var QUESTIONS = [
  {
    id: 'gender', type: 'choice', cat: 'The Deceased', icon: '\uD83D\uDC64',
    question: 'Was the deceased male or female?',
    hint: "This affects the spouse\u2019s share and other calculations.",
    options: [
      { val: 'male',   icon: '\u2642\uFE0F', label: 'Male'   },
      { val: 'female', icon: '\u2640\uFE0F', label: 'Female' }
    ]
  },
  {
    id: 'spouse', type: 'yesno', cat: 'Spouse', icon: '\uD83D\uDC8D',
    question: 'Did the deceased leave a surviving spouse?',
    hint: 'A legally recognised Islamic marriage at the time of death.'
  },
  {
    id: 'sons', type: 'stepper', cat: 'Children', icon: '\uD83D\uDC66',
    question: 'How many sons survived the deceased?',
    hint: 'Include biological sons only. Adopted children do not inherit under Islamic law.'
  },
  {
    id: 'daughters', type: 'stepper', cat: 'Children', icon: '\uD83D\uDC67',
    question: 'How many daughters survived the deceased?',
    hint: 'Include biological daughters only.'
  },
  {
    id: 'fatherAlive', type: 'yesno', cat: 'Parents', icon: '\uD83D\uDC68',
    question: "Is the deceased\u2019s father still alive?",
    hint: 'The father is a primary heir and significantly affects the distribution.'
  },
  {
    id: 'motherAlive', type: 'yesno', cat: 'Parents', icon: '\uD83D\uDC69',
    question: "Is the deceased\u2019s mother still alive?",
    hint: 'The mother receives a fixed Quranic share from the estate.'
  },
  {
    id: 'currency', type: 'currency', cat: 'Estate Currency', icon: '\uD83D\uDCB1',
    question: 'Select the currency for the estate',
    hint: 'All amounts will be displayed in this currency.'
  },
  {
    id: 'cash', type: 'amount', cat: 'Cash & Savings', icon: '\uD83C\uDFE6',
    question: 'How much cash and bank savings are in the estate?',
    hint: 'Include all bank accounts, cash at home, and easily accessible funds.'
  },
  {
    id: 'property', type: 'amount', cat: 'Property & Real Estate', icon: '\uD83C\uDFE0',
    question: 'What is the value of property or real estate?',
    hint: 'Use current market value. Include all homes, land, and buildings owned.'
  },
  {
    id: 'investments', type: 'amount', cat: 'Investments', icon: '\uD83D\uDCC8',
    question: 'What is the value of investments and stocks?',
    hint: 'Include shares, mutual funds, pension funds, and business interests.'
  },
  {
    id: 'gold', type: 'amount', cat: 'Gold & Jewelry', icon: '\u2728',
    question: 'What is the estimated value of gold and jewelry?',
    hint: 'Enter the current market value of all gold, silver, and precious items.'
  },
  {
    id: 'other', type: 'amount', cat: 'Other Assets', icon: '\uD83D\uDCE6',
    question: 'Any other assets not listed above?',
    hint: 'Vehicles, collectibles, receivables, or any other property. Enter 0 if none.'
  },
  {
    id: 'debts', type: 'amount', cat: 'Debts', icon: '\uD83D\uDCCB', isDeduction: true,
    question: 'What are the total outstanding debts?',
    hint: 'All loans, mortgages, and personal debts must be settled before distribution. Enter 0 if none.'
  },
  {
    id: 'funeral', type: 'amount', cat: 'Funeral Expenses', icon: '\uD83D\uDC8E', isDeduction: true,
    question: 'What are the funeral and burial expenses?',
    hint: 'Reasonable funeral and burial costs are deducted before distribution. Enter 0 if already covered.'
  },
  {
    id: 'wasiyyah', type: 'amount', cat: 'Bequest (Wasiyyah)', icon: '\uD83D\uDCDC', isDeduction: true,
    question: 'Is there a valid bequest (wasiyyah)?',
    hint: 'A valid bequest cannot exceed 1/3 of the estate after debts and funeral. Enter 0 if none.'
  }
];

/* ─── CHECKLIST ───────────────────────────────────────── */
var CHECKLIST_ITEMS = [
  'Obtained the official death certificate',
  'Notified all known creditors of the estate',
  'Listed all assets and obtained current valuations',
  'Checked for any existing written bequest (wasiyyah)',
  'Settled all outstanding debts from the estate',
  'Covered all funeral and burial expenses',
  'Notified all potential heirs of their shares',
  'Consulted a qualified Islamic scholar or Mufti',
  'Distributed estate per the scholar\u2019s guidance',
  'Documented the full distribution for all heirs'
];

/* ─── STATE ───────────────────────────────────────────── */
var state = {
  screen:      'welcome',
  qIdx:        0,
  fromReview:  false,
  answers:     {},
  checklist:   []
};

function initAnswers() {
  state.answers = {
    gender:      null,
    spouse:      null,
    sons:        0,
    daughters:   0,
    fatherAlive: null,
    motherAlive: null,
    currency:    null,
    cash:        0,
    property:    0,
    investments: 0,
    gold:        0,
    other:       0,
    debts:       0,
    funeral:     0,
    wasiyyah:    0
  };
  state.checklist = new Array(CHECKLIST_ITEMS.length).fill(false);
}

/* ─── PERSISTENCE ─────────────────────────────────────── */
function save() {
  try {
    localStorage.setItem('mirath_v1', JSON.stringify({
      answers:   state.answers,
      checklist: state.checklist
    }));
  } catch (e) {}
}

function load() {
  try {
    var raw = localStorage.getItem('mirath_v1');
    if (!raw) return;
    var saved = JSON.parse(raw);
    if (saved.answers)   Object.assign(state.answers, saved.answers);
    if (saved.checklist) state.checklist = saved.checklist;
  } catch (e) {}
}

initAnswers();
load();

/* ─── NAVIGATION ──────────────────────────────────────── */
function go(toId) {
  var from = document.getElementById('s-' + state.screen);
  var to   = document.getElementById('s-' + toId);
  if (from) from.classList.remove('active');
  if (to)   { to.classList.add('active'); window.scrollTo(0, 0); }
  state.screen = toId;
}

/* ─── CURRENCY GRID ───────────────────────────────────── */
function buildCurrencyGrid(containerId) {
  var grid = document.getElementById(containerId);
  if (!grid) return;
  var cur = state.answers.currency;
  grid.innerHTML = CURRENCIES.map(function(c, i) {
    var sel = (cur && cur.code === c.code) ? ' sel' : '';
    return '<button class="curr-btn' + sel + '" data-idx="' + i + '" onclick="App.pickCurrency(this)">' +
      '<div class="curr-flag">' + c.flag + '</div>' +
      '<div class="curr-name">' + c.label + '</div>' +
      '<div class="curr-country">' + c.name + '</div>' +
      '</button>';
  }).join('');
}

/* ─── QUESTION RENDER ─────────────────────────────────── */
function renderQuestion() {
  var q   = QUESTIONS[state.qIdx];
  var tot = QUESTIONS.length;

  document.getElementById('q-step-lbl').textContent = 'Step ' + (state.qIdx + 1) + ' of ' + tot;

  var dotsEl = document.getElementById('q-dots');
  dotsEl.innerHTML = Array.from({ length: tot }, function(_, i) {
    var cls = i < state.qIdx ? 'done' : i === state.qIdx ? 'now' : '';
    return '<span class="' + cls + '"></span>';
  }).join('');

  document.getElementById('q-cat').innerHTML =
    '<span style="font-size:14px">' + q.icon + '</span>\u00A0' + q.cat;

  var body    = document.getElementById('q-body');
  var hintHtml = q.hint
    ? '<div class="hint-box"><span class="hint-icon">\u2139\uFE0F</span><span>' + q.hint + '</span></div>'
    : '';

  /* ── choice ── */
  if (q.type === 'choice') {
    var curVal  = state.answers[q.id];
    var optHtml = q.options.map(function(o) {
      var sel = curVal === o.val ? ' sel' : '';
      return '<button class="choice-btn' + sel + '" onclick="App.pickChoice(\'' + o.val + '\')">' +
        '<span class="choice-icon">' + o.icon + '</span>' +
        '<span class="choice-label">' + o.label + '</span>' +
        '</button>';
    }).join('');
    body.innerHTML =
      '<div class="q-text">' + q.question + '</div>' + hintHtml +
      '<div class="spacer"></div>' +
      '<div class="choice-grid">' + optHtml + '</div>';

  /* ── yesno ── */
  } else if (q.type === 'yesno') {
    body.innerHTML =
      '<div class="q-text">' + q.question + '</div>' + hintHtml +
      '<div class="spacer"></div>' +
      '<div class="yn-wrap">' +
        '<button class="btn-yn btn-yn-yes" onclick="App.answerYes()">\u2714\u00A0\u00A0Yes</button>' +
        '<button class="btn-yn btn-yn-no"  onclick="App.answerNo()">\u2716\u00A0\u00A0No</button>' +
      '</div>';

  /* ── stepper ── */
  } else if (q.type === 'stepper') {
    var cnt = state.answers[q.id] || 0;
    body.innerHTML =
      '<div class="q-text">' + q.question + '</div>' + hintHtml +
      '<div class="spacer"></div>' +
      '<div class="stepper-wrap">' +
        '<div class="stepper">' +
          '<button class="step-btn" onclick="App.stepMinus()">\u2212</button>' +
          '<div class="step-val" id="step-val">' + cnt + '</div>' +
          '<button class="step-btn" onclick="App.stepPlus()">+</button>' +
        '</div>' +
        '<div class="step-hint">tap + or \u2212 to adjust, then tap Next</div>' +
      '</div>' +
      '<div style="height:20px"></div>' +
      '<button class="btn-primary" onclick="App.submitStepper()">Next \u2192</button>';

  /* ── currency ── */
  } else if (q.type === 'currency') {
    body.innerHTML =
      '<div class="curr-heading">' + q.question + '</div>' +
      '<p class="curr-sub">Tap to select \u2014 continues automatically</p>' +
      '<div class="curr-grid" id="curr-grid"></div>';
    buildCurrencyGrid('curr-grid');

  /* ── amount ── */
  } else if (q.type === 'amount') {
    var sym    = state.answers.currency ? state.answers.currency.sym : '$';
    var amtVal = state.answers[q.id] || 0;
    body.innerHTML =
      '<div class="q-text">' + q.question + '</div>' + hintHtml +
      '<div class="spacer"></div>' +
      '<div class="amt-wrap">' +
        '<div class="amt-sym">' + sym + '</div>' +
        '<input id="amt" class="amt-input" type="number"' +
          ' inputmode="decimal" min="0" step="any"' +
          ' placeholder="0" autocomplete="off"' +
          ' value="' + (amtVal > 0 ? amtVal : '') + '"' +
          ' onkeydown="if(event.key===\'Enter\')App.submitAmt()" />' +
      '</div>' +
      '<div style="height:16px"></div>' +
      '<button class="btn-primary" onclick="App.submitAmt()">Next \u2192</button>';
    setTimeout(function() {
      var inp = document.getElementById('amt');
      if (inp) { inp.focus(); if (amtVal > 0) inp.select(); }
    }, 80);
  }
}

/* ─── REVIEW RENDER ───────────────────────────────────── */
function renderReview() {
  var sym            = state.answers.currency ? state.answers.currency.sym : '$';
  var totalAssets    = 0;
  var totalDeductions = 0;
  var html           = '';

  QUESTIONS.forEach(function(q, idx) {
    var displayVal = '';
    var isDim      = false;

    if (q.type === 'choice') {
      var cv = state.answers[q.id];
      if (cv === 'male')        displayVal = 'Male';
      else if (cv === 'female') displayVal = 'Female';
      else                      { displayVal = '\u2014'; isDim = true; }

    } else if (q.type === 'yesno') {
      var yv = state.answers[q.id];
      if (yv === true)       displayVal = 'Yes';
      else if (yv === false) { displayVal = 'No'; isDim = true; }
      else                   { displayVal = '\u2014'; isDim = true; }

    } else if (q.type === 'stepper') {
      var sv = state.answers[q.id] || 0;
      displayVal = String(sv);
      if (sv === 0) isDim = true;

    } else if (q.type === 'currency') {
      var cc = state.answers.currency;
      displayVal = cc ? (cc.flag + '\u00A0' + cc.label + ' \u2014 ' + cc.name) : '\u2014';
      if (!cc) isDim = true;

    } else if (q.type === 'amount') {
      var av = state.answers[q.id] || 0;
      if (av > 0) {
        displayVal = sym + fmtNum(av);
        if (q.isDeduction) totalDeductions += av; else totalAssets += av;
      } else {
        displayVal = '\u2014'; isDim = true;
      }
    }

    html +=
      '<div class="r-item" onclick="App.editQ(' + idx + ')">' +
        '<div class="r-icon' + (isDim ? ' dim' : '') + '">' + q.icon + '</div>' +
        '<div class="r-content">' +
          '<div class="r-label">' + q.cat + '</div>' +
          '<div class="r-value' + (isDim ? ' dim' : '') + '">' + displayVal + '</div>' +
        '</div>' +
        '<div class="r-edit">Edit</div>' +
      '</div>';
  });

  document.getElementById('review-list').innerHTML = html;

  var net     = Math.max(0, totalAssets - totalDeductions);
  var sumHtml =
    '<div class="sum-row"><span>Total Assets</span><span>' + sym + fmtNum(totalAssets) + '</span></div>';
  if (totalDeductions > 0) {
    sumHtml +=
      '<div class="sum-row"><span>Total Deductions</span>' +
      '<span class="val-red">\u2212' + sym + fmtNum(totalDeductions) + '</span></div>';
  }
  sumHtml +=
    '<div class="sum-row"><span>Net Heritable Estate</span>' +
    '<span class="val-green">' + sym + fmtNum(net) + '</span></div>';
  document.getElementById('review-summary').innerHTML = sumHtml;
}

/* ─── INHERITANCE CALCULATION ─────────────────────────── */
function calculateInheritance() {
  var a           = state.answers;
  var isMale      = a.gender === 'male';
  var hasSpouse   = a.spouse === true;
  var sons        = a.sons || 0;
  var daughters   = a.daughters || 0;
  var fatherAlive = a.fatherAlive === true;
  var motherAlive = a.motherAlive === true;
  var hasChildren = sons > 0 || daughters > 0;

  var grossAssets     = (a.cash || 0) + (a.property || 0) + (a.investments || 0) + (a.gold || 0) + (a.other || 0);
  var totalDeductions = (a.debts || 0) + (a.funeral || 0) + (a.wasiyyah || 0);
  var net             = Math.max(0, grossAssets - totalDeductions);

  var heirs      = [];
  var fixedTotal = 0;
  var notes      = [];
  var isComplex  = false;

  function addFixed(id, icon, label, fraction, count, explanation) {
    heirs.push({ id: id, icon: icon, label: label, fraction: fraction, count: count, explanation: explanation });
    fixedTotal += fraction;
  }

  /* Spouse */
  if (hasSpouse) {
    if (isMale) {
      var wf = hasChildren ? 1/8 : 1/4;
      addFixed('wife', '\uD83D\uDC8D', 'Wife', wf, 1,
        hasChildren ? '1/8 share \u2014 children are present' : '1/4 share \u2014 no children');
    } else {
      var hf = hasChildren ? 1/4 : 1/2;
      addFixed('husband', '\uD83D\uDC8D', 'Husband', hf, 1,
        hasChildren ? '1/4 share \u2014 children are present' : '1/2 share \u2014 no children');
    }
  }

  /* Mother */
  if (motherAlive) {
    if (!hasChildren && fatherAlive && hasSpouse) {
      /* Umariyyataan case: spouse + both parents, no children */
      isComplex = true;
      notes.push(
        'This appears to be the \u201CUmariyyataan\u201D case (spouse + both parents, no children). ' +
        'The mother receives 1/3 of the remainder after the spouse\u2019s share, not 1/3 of the full estate. ' +
        'Please consult a qualified scholar to confirm the exact distribution.'
      );
      var spouseF = isMale ? 1/4 : 1/2;
      addFixed('mother', '\uD83D\uDC69', 'Mother', (1 - spouseF) / 3, 1,
        '1/3 of remainder (Umariyyataan) \u2014 see note below');
    } else {
      var mf = hasChildren ? 1/6 : 1/3;
      addFixed('mother', '\uD83D\uDC69', 'Mother', mf, 1,
        hasChildren ? '1/6 share \u2014 children are present' : '1/3 share \u2014 no children');
    }
  }

  /* Father (fixed 1/6 when children exist) */
  if (fatherAlive && hasChildren) {
    var fatherExp = sons > 0
      ? '1/6 fixed share \u2014 sons are present'
      : '1/6 fixed share + residuary \u2014 daughters present, no sons';
    addFixed('father', '\uD83D\uDC68', 'Father', 1/6, 1, fatherExp);
  }

  /* Residue after fixed shares */
  var residue = 1 - fixedTotal;

  /* Children */
  if (sons > 0 && daughters > 0) {
    var units   = sons * 2 + daughters;
    var perUnit = residue / units;
    heirs.push({
      id: 'sons', icon: '\uD83D\uDC66',
      label: sons === 1 ? 'Son' : 'Sons (' + sons + ')',
      fraction: perUnit * 2 * sons, count: sons,
      explanation: 'Residuary \u2014 each son receives double a daughter\u2019s share'
    });
    heirs.push({
      id: 'daughters', icon: '\uD83D\uDC67',
      label: daughters === 1 ? 'Daughter' : 'Daughters (' + daughters + ')',
      fraction: perUnit * daughters, count: daughters,
      explanation: 'Residuary \u2014 each daughter receives half a son\u2019s share'
    });
    residue = 0;

  } else if (sons > 0) {
    heirs.push({
      id: 'sons', icon: '\uD83D\uDC66',
      label: sons === 1 ? 'Son' : 'Sons (' + sons + ')',
      fraction: residue, count: sons,
      explanation: sons === 1
        ? 'Residuary heir \u2014 receives all remaining estate'
        : 'Residuary heirs \u2014 share remaining estate equally'
    });
    residue = 0;

  } else if (daughters > 0) {
    var dFixed = daughters === 1 ? 1/2 : 2/3;
    var dShare = Math.min(dFixed, residue);
    heirs.push({
      id: 'daughters', icon: '\uD83D\uDC67',
      label: daughters === 1 ? 'Daughter' : 'Daughters (' + daughters + ')',
      fraction: dShare, count: daughters,
      explanation: daughters === 1
        ? '1/2 fixed share \u2014 only daughter, no sons'
        : '2/3 fixed share \u2014 shared equally among all daughters'
    });
    residue -= dShare;

    /* Father takes remaining residue when daughters present but no sons */
    if (fatherAlive && residue > 0.0001) {
      var fi = -1;
      heirs.forEach(function(h, i) { if (h.id === 'father') fi = i; });
      if (fi >= 0) {
        heirs[fi].fraction += residue;
        heirs[fi].explanation = '1/6 fixed + ' + fmtFractionStr(residue) +
          ' residuary \u2014 daughters present, no sons';
        residue = 0;
      }
    }

    if (residue > 0.0001) {
      isComplex = true;
      notes.push(
        'There is ' + fmtFractionStr(residue) + ' of the estate with no residuary heir. ' +
        'This should be returned proportionally to the daughters (Radd) or referred to ' +
        'Islamic authorities. Please consult a scholar.'
      );
    }
  }

  /* Father (no children) takes residue */
  if (fatherAlive && !hasChildren) {
    heirs.push({
      id: 'father', icon: '\uD83D\uDC68', label: 'Father',
      fraction: residue, count: 1,
      explanation: 'Residuary heir \u2014 receives all remaining estate after fixed shares'
    });
    residue = 0;
  }

  /* No residuary heir at all */
  if (residue > 0.0001 && !fatherAlive && sons === 0 && daughters === 0) {
    isComplex = true;
    notes.push(
      'No residuary heir identified (' + fmtFractionStr(residue) + ' of estate unclaimed). ' +
      'Other relatives such as grandsons, brothers, or paternal uncles may be entitled. ' +
      'Please consult a qualified Islamic scholar.'
    );
  }

  return {
    heirs:           heirs,
    net:             net,
    grossAssets:     grossAssets,
    totalDeductions: totalDeductions,
    isComplex:       isComplex,
    notes:           notes
  };
}

/* ─── RESULT RENDER ───────────────────────────────────── */
function renderResult() {
  var result = calculateInheritance();
  var sym    = state.answers.currency ? state.answers.currency.sym : '$';
  var heirs  = result.heirs;
  var net    = result.net;

  document.getElementById('res-header').innerHTML =
    '<div class="result-eyebrow">Net Heritable Estate</div>' +
    '<div class="result-amount"><span class="result-sym">' + sym + '</span>' + fmtNum(net) + '</div>' +
    '<div class="result-sub">after deductions \u2014 ready for distribution</div>';

  var html = '';

  /* Distribution */
  if (heirs.length === 0) {
    html +=
      '<div class="flag-box">' +
        '<span style="flex-shrink:0;font-size:20px">\u26A0\uFE0F</span>' +
        '<div><strong>No eligible heirs identified</strong>' +
        '<p style="margin-top:5px">This situation requires scholarly guidance. The estate may be ' +
        'referred to a mosque or Islamic authority (bayt al-mal).</p></div>' +
      '</div>';
  } else {
    html += '<div class="dist-card"><div class="dist-card-title">Distribution Breakdown</div>';
    heirs.forEach(function(h) {
      var amount = h.fraction * net;
      var each   = h.count > 1
        ? '<div class="dist-pct">' + sym + fmtNum(amount / h.count) + ' each</div>'
        : '';
      html +=
        '<div class="dist-row">' +
          '<div class="dist-icon">' + h.icon + '</div>' +
          '<div class="dist-info">' +
            '<div class="dist-heir">' + h.label + '</div>' +
            '<div class="dist-exp">' + h.explanation + '</div>' +
          '</div>' +
          '<div class="dist-right">' +
            '<div class="dist-fraction">' + fmtFractionStr(h.fraction) + '</div>' +
            '<div class="dist-amount">' + sym + fmtNum(amount) + '</div>' +
            each +
          '</div>' +
        '</div>';
    });
    html += '</div>';
  }

  /* Estate summary */
  html +=
    '<div class="dist-card">' +
      '<div class="dist-card-title">Estate Summary</div>' +
      '<div class="dist-row">' +
        '<div class="dist-icon">\uD83D\uDCBC</div>' +
        '<div class="dist-info"><div class="dist-heir">Gross Estate</div></div>' +
        '<div class="dist-right"><div class="dist-amount">' + sym + fmtNum(result.grossAssets) + '</div></div>' +
      '</div>';

  if (result.totalDeductions > 0) {
    html +=
      '<div class="dist-row">' +
        '<div class="dist-icon">\uD83D\uDCCB</div>' +
        '<div class="dist-info"><div class="dist-heir">Deductions (debts, funeral, bequest)</div></div>' +
        '<div class="dist-right"><div class="dist-amount" style="color:var(--red)">' +
          '\u2212' + sym + fmtNum(result.totalDeductions) + '</div></div>' +
      '</div>';
  }

  html +=
      '<div class="dist-row">' +
        '<div class="dist-icon">\u2696\uFE0F</div>' +
        '<div class="dist-info">' +
          '<div class="dist-heir" style="font-weight:700">Net Heritable Estate</div>' +
        '</div>' +
        '<div class="dist-right">' +
          '<div class="dist-amount" style="color:var(--primary);font-size:17px">' +
            sym + fmtNum(net) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* Scholarly review flag */
  if (result.isComplex) {
    html += '<div class="flag-box"><span style="flex-shrink:0;font-size:20px">\u26A0\uFE0F</span><div>';
    html += '<strong>Scholarly Review Recommended</strong>';
    result.notes.forEach(function(n) {
      html += '<p style="margin-top:6px;line-height:1.6">' + n + '</p>';
    });
    html += '</div></div>';
  }

  /* Disclaimer */
  html +=
    '<div class="disclaimer-box">' +
      '<strong>Important Disclaimer \u2014 </strong>' +
      'This tool provides an estimate for common cases only. It does not account for grandchildren, ' +
      'siblings, paternal uncles, or other distant heirs. ' +
      '<strong>Always consult a qualified Islamic scholar or Mufti</strong> before distributing any estate.' +
    '</div>';

  /* Checklist */
  html += buildChecklistHtml();

  document.getElementById('res-body').innerHTML = html;

  /* Attach checklist click listeners */
  document.querySelectorAll('.cl-item').forEach(function(el) {
    var idx = parseInt(el.getAttribute('data-idx'), 10);
    el.addEventListener('click', function() { App.toggleCheck(idx); });
  });
}

function buildChecklistHtml() {
  var done  = state.checklist.filter(Boolean).length;
  var total = CHECKLIST_ITEMS.length;
  var pct   = Math.round((done / total) * 100);

  var html =
    '<div class="cl-card">' +
      '<div class="cl-header">' +
        '<div class="cl-title">Post-Inheritance Checklist</div>' +
        '<div class="cl-prog">' + done + '/' + total + '</div>' +
      '</div>' +
      '<div class="cl-track"><div class="cl-fill" style="width:' + pct + '%"></div></div>';

  CHECKLIST_ITEMS.forEach(function(item, i) {
    var checked = state.checklist[i];
    html +=
      '<div class="cl-item' + (checked ? ' done' : '') + '" data-idx="' + i + '">' +
        '<div class="cl-box"></div>' +
        '<div class="cl-text">' + item + '</div>' +
      '</div>';
  });

  html += '</div>';
  return html;
}

/* ─── FORMATTING ──────────────────────────────────────── */
function fmtNum(n) {
  var v     = Math.round(n * 100) / 100;
  var parts = v.toFixed(2).split('.');
  parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function fmtFractionStr(f) {
  var FRACS = [
    [1,      '1'],    [1/2,    '1/2'],  [1/3,  '1/3'],   [2/3,  '2/3'],
    [1/4,    '1/4'],  [3/4,    '3/4'],  [1/6,  '1/6'],   [5/6,  '5/6'],
    [1/8,    '1/8'],  [3/8,    '3/8'],  [5/8,  '5/8'],   [7/8,  '7/8'],
    [1/12,   '1/12'], [5/12,   '5/12'], [7/12, '7/12'],  [11/12,'11/12']
  ];
  var best = null, bestDiff = 1;
  FRACS.forEach(function(pair) {
    var diff = Math.abs(f - pair[0]);
    if (diff < bestDiff) { bestDiff = diff; best = pair[1]; }
  });
  if (bestDiff < 0.015 && best) return best;
  return (f * 100).toFixed(1) + '%';
}

/* ─── APP CONTROLLER ──────────────────────────────────── */
var App = {
  start: function() {
    state.qIdx       = 0;
    state.fromReview = false;
    renderQuestion();
    go('question');
  },

  back: function() {
    if (state.screen === 'question') {
      if (state.fromReview) {
        state.fromReview = false;
        renderReview();
        go('review');
        return;
      }
      if (state.qIdx === 0) {
        go('welcome');
      } else {
        state.qIdx--;
        renderQuestion();
      }
    } else if (state.screen === 'review') {
      state.qIdx = QUESTIONS.length - 1;
      renderQuestion();
      go('question');
    } else if (state.screen === 'result') {
      renderReview();
      go('review');
    }
  },

  pickChoice: function(val) {
    var q = QUESTIONS[state.qIdx];
    state.answers[q.id] = val;
    save();
    renderQuestion();
    var self = this;
    setTimeout(function() { self._advance(); }, 260);
  },

  answerYes: function() {
    var q = QUESTIONS[state.qIdx];
    state.answers[q.id] = true;
    save();
    this._advance();
  },

  answerNo: function() {
    var q = QUESTIONS[state.qIdx];
    state.answers[q.id] = false;
    save();
    this._advance();
  },

  stepPlus: function() {
    var q = QUESTIONS[state.qIdx];
    state.answers[q.id] = (state.answers[q.id] || 0) + 1;
    var el = document.getElementById('step-val');
    if (el) el.textContent = String(state.answers[q.id]);
  },

  stepMinus: function() {
    var q   = QUESTIONS[state.qIdx];
    var cur = state.answers[q.id] || 0;
    if (cur > 0) {
      state.answers[q.id] = cur - 1;
      var el = document.getElementById('step-val');
      if (el) el.textContent = String(state.answers[q.id]);
    }
  },

  submitStepper: function() {
    save();
    this._advance();
  },

  pickCurrency: function(btn) {
    document.querySelectorAll('#curr-grid .curr-btn').forEach(function(b) {
      b.classList.remove('sel');
    });
    btn.classList.add('sel');
    state.answers.currency = CURRENCIES[parseInt(btn.dataset.idx, 10)];
    save();
    var self = this;
    setTimeout(function() { self._advance(); }, 260);
  },

  submitAmt: function() {
    var q   = QUESTIONS[state.qIdx];
    var inp = document.getElementById('amt');
    var val = Math.max(0, parseFloat(inp ? inp.value : '0') || 0);
    state.answers[q.id] = val;
    save();
    this._advance();
  },

  _advance: function() {
    if (state.fromReview) {
      state.fromReview = false;
      renderReview();
      go('review');
      return;
    }
    state.qIdx++;
    if (state.qIdx >= QUESTIONS.length) {
      renderReview();
      go('review');
    } else {
      renderQuestion();
    }
  },

  editQ: function(idx) {
    state.fromReview = true;
    state.qIdx       = idx;
    renderQuestion();
    go('question');
  },

  showResult: function() {
    renderResult();
    go('result');
  },

  restart: function() {
    initAnswers();
    state.qIdx       = 0;
    state.fromReview = false;
    save();
    go('welcome');
  },

  toggleCheck: function(idx) {
    state.checklist[idx] = !state.checklist[idx];
    save();
    var oldCard = document.querySelector('.cl-card');
    if (oldCard) {
      var tmp = document.createElement('div');
      tmp.innerHTML = buildChecklistHtml();
      var newCard = tmp.firstChild;
      oldCard.parentNode.replaceChild(newCard, oldCard);
      document.querySelectorAll('.cl-item').forEach(function(el) {
        var i = parseInt(el.getAttribute('data-idx'), 10);
        el.addEventListener('click', function() { App.toggleCheck(i); });
      });
    }
  },

  share: function() {
    var result = calculateInheritance();
    var sym    = state.answers.currency ? state.answers.currency.sym : '$';
    var lines  = result.heirs.map(function(h) {
      return h.label + ' \u2192 ' + sym + fmtNum(h.fraction * result.net);
    });
    var text = 'Islamic Inheritance (Mirath) \u2014 Estate: ' + sym + fmtNum(result.net) +
               '\n' + lines.join('\n');
    if (navigator.share) {
      navigator.share({ title: 'Mirath Calculation', text: text, url: location.href }).catch(function() {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(function() { alert('Copied to clipboard!'); })
        .catch(function() { alert(text); });
    } else {
      alert(text);
    }
  }
};
