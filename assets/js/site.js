/**
 * Page behaviour: section entrances, the work index, and the year dial.
 * Everything here is an enhancement; the page reads fully without it.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var year = document.getElementById('yearCurrent');
  if (year) year.textContent = new Date().getFullYear();

  /* Entrances: each section's parts arrive in reading order, once. */
  var staggered = [
    '.exp-head > *', '.exp-part', '.job', '.work-title', '.work-item',
    '.offer h2', '.offer-list > div', '.offer-stack p', '.rows li', '.foot-invite > *', '.foot-links li'
  ];
  staggered.forEach(function (selector) {
    var groups = new Map();
    document.querySelectorAll(selector).forEach(function (el) {
      var parent = el.closest('section, footer') || document.body;
      var i = groups.get(parent) || 0;
      groups.set(parent, i + 1);
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--i', Math.min(i, 8));
    });
  });

  var revealed = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Work index: hover or focus a name, the frame shows its plate. */
  var items = document.querySelectorAll('.work-item');
  function activate(item) {
    items.forEach(function (other) { other.classList.toggle('is-active', other === item); });
    document.querySelectorAll('.work-frame .plate').forEach(function (plate) {
      plate.classList.toggle('is-active', plate.id === 'plate-' + item.getAttribute('data-plate'));
    });
  }
  items.forEach(function (item) {
    var name = item.querySelector('.work-name');
    item.addEventListener('mouseenter', function () { activate(item); });
    name.addEventListener('focus', function () { activate(item); });
    if (name.tagName === 'BUTTON') name.addEventListener('click', function () { activate(item); });
  });

  /* On a phone there is no frame: copy each plate above its name. */
  function fillInlinePlates() {
    items.forEach(function (item) {
      var source = document.getElementById('plate-' + item.getAttribute('data-plate'));
      var target = item.querySelector('.plate-inline');
      if (source && target) target.innerHTML = source.innerHTML;
    });
  }
  fillInlinePlates();
  document.addEventListener('langchange', fillInlinePlates);

  /* The year dial: which roles were running in the chosen year. */
  var dial = document.querySelector('[data-dial]');
  var range = document.getElementById('year');
  var jobs = Array.prototype.slice.call(document.querySelectorAll('.job[data-from]'));

  function readYear() {
    var y = parseInt(range.value, 10);
    var output = dial.querySelector('.dial-year');
    var read = dial.querySelector('.dial-read');
    var running = [];
    output.textContent = y;
    jobs.forEach(function (job) {
      var from = parseFloat(job.getAttribute('data-from'));
      var to = parseFloat(job.getAttribute('data-to'));
      var on = from < y + 1 && to >= y;
      job.classList.toggle('is-on', on);
      job.classList.toggle('is-off', !on);
      if (on) {
        running.push(job.querySelector('.job-role').textContent + ', ' + job.querySelector('.job-co').textContent);
      }
    });
    read.textContent = running.join(' · ');
  }

  /* The roles as a git log graph: one commit per role on main, and the
     freelance years as a branch that forks and merges back. */
  var log = document.querySelector('[data-log]');
  var graph = log && log.querySelector('.log-graph');

  function lineCentre(row) {
    var role = row.querySelector('.job-role');
    var y = 0;
    for (var el = role; el && el !== log; el = el.offsetParent) y += el.offsetTop;
    return y + parseFloat(getComputedStyle(role).lineHeight) / 2;
  }

  function drawLog() {
    if (!graph) return;
    var rows = Array.prototype.slice.call(log.querySelectorAll(':scope > .job'));
    var w = graph.getBoundingClientRect().width;
    var x = [w * 0.22, w * 0.56];
    var at = {};
    var main = [];
    var svg = '';

    rows.forEach(function (row) {
      var lane = row.getAttribute('data-lane') === '1' ? 1 : 0;
      at[row.id] = { y: lineCentre(row), lane: lane, row: row };
      if (lane === 0) main.push(at[row.id].y);
    });

    svg += '<path class="lane-0" pathLength="1" d="M' + x[0] + ' ' + main[0] + 'V' + main[main.length - 1] + '"/>';

    rows.forEach(function (row) {
      if (row.getAttribute('data-lane') !== '1') return;
      var b = at[row.id].y;
      var f = at[row.getAttribute('data-fork')].y;
      var m = at[row.getAttribute('data-merge')].y;
      var up = Math.min(48, (b - m) / 2);
      svg += '<path class="lane-1" pathLength="1" d="M' + x[0] + ' ' + f +
        'C' + x[0] + ' ' + (f + b) / 2 + ' ' + x[1] + ' ' + (f + b) / 2 + ' ' + x[1] + ' ' + b +
        'V' + (m + up) +
        'C' + x[1] + ' ' + (m + up / 3) + ' ' + x[0] + ' ' + (m + up / 3) + ' ' + x[0] + ' ' + m + '"/>';
    });

    rows.forEach(function (row) {
      var p = at[row.id];
      svg += '<circle class="lane-' + p.lane + (row.classList.contains('is-on') ? ' is-on' : '') +
        '" cx="' + x[p.lane] + '" cy="' + p.y + '" r="7"/>';
    });

    graph.innerHTML = svg;
  }

  if (log && graph) {
    log.querySelectorAll('details').forEach(function (d) { d.addEventListener('toggle', drawLog); });
    window.addEventListener('resize', drawLog);
    document.addEventListener('langchange', drawLog);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLog);
    drawLog();

    if ('IntersectionObserver' in window) {
      var drawn = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        log.classList.add('is-drawn');
        drawn.disconnect();
      }, { threshold: 0.15 });
      drawn.observe(log);
    } else {
      log.classList.add('is-drawn');
    }
  }

  if (dial && range) {
    dial.hidden = false;
    range.addEventListener('input', function () { readYear(); drawLog(); });
    document.addEventListener('langchange', readYear);
    readYear();
    drawLog();
  }
})();
