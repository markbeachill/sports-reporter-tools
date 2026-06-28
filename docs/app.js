/* Sports Reporter Tools — site behaviour */
(function () {
  // ---- Theme ----
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('sr-theme'); } catch (e) {}
  if (stored) {
    root.setAttribute('data-theme', stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('sr-theme', next); } catch (e) {}
    });
  }

  // ---- Mobile menu ----
  var menuBtn = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) && e.target !== menuBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ---- Copy prompt ----
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-src');
      var status = document.getElementById('copyStatus');
      var done = function (msg, ok) {
        if (status) status.textContent = msg;
        if (ok) {
          var orig = btn.textContent;
          btn.textContent = 'Copied ✓';
          btn.classList.add('copied');
          setTimeout(function () { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
        }
      };
      var writeText = function (text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text).then(function () {
            done('Prompt copied to your clipboard.', true);
          });
        }
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        done('Prompt copied to your clipboard.', true);
        return Promise.resolve();
      };
      // Prefer the prompt embedded in the page (works offline / from file://)
      var embedded = document.getElementById('rawPrompt');
      if (embedded && embedded.value) {
        writeText(embedded.value).catch(function () {
          done('Could not copy automatically — select the text below to copy manually.', false);
        });
        return;
      }
      // Fallback: fetch the raw file (works when served over http/https)
      fetch(src).then(function (r) {
        if (!r.ok) throw new Error('fetch failed');
        return r.text();
      }).then(writeText).catch(function () {
        done('Could not copy automatically — open ' + src + ' to copy manually.', false);
      });
    });
  });

  // ---- Active TOC highlight on scroll ----
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length) {
    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) map[id] = a;
    });
    var ids = Object.keys(map);
    var onScroll = function () {
      var pos = window.scrollY + 120;
      var current = null;
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      });
      tocLinks.forEach(function (a) { a.classList.remove('active'); });
      if (current && map[current]) map[current].classList.add('active');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
