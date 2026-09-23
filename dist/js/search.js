
(function() {
  let searchIndex = null;
  let isFetching = false;

  async function loadIndex() {
    if (searchIndex || isFetching) return;
    isFetching = true;
    try {
      const res = await fetch('/js/search-index.json');
      searchIndex = await res.json();
    } catch (e) {
      console.error('Failed to load search index:', e);
    }
  }

  function initSearch() {
    const input = document.getElementById('headerSearchInput');
    const btn = document.getElementById('headerSearchBtn');
    const dropdown = document.getElementById('headerSearchResults');
    if (!input || !dropdown) return;

    input.addEventListener('focus', () => {
      loadIndex();
      if (input.value.trim()) renderResults(input.value.trim());
    });

    input.addEventListener('input', () => {
      loadIndex();
      const val = input.value.trim();
      if (!val) {
        dropdown.style.display = 'none';
        return;
      }
      renderResults(val);
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadIndex();
        const val = input.value.trim();
        if (val) renderResults(val);
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        loadIndex();
        const val = input.value.trim();
        if (val) renderResults(val);
      } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search-wrapper')) {
        dropdown.style.display = 'none';
      }
    });

    function renderResults(query) {
      if (!searchIndex) return;
      const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      if (terms.length === 0) {
        dropdown.style.display = 'none';
        return;
      }

      const matches = searchIndex.filter(item => {
        const text = (item.title + ' ' + item.summary + ' ' + item.type + ' ' + (item.keywords || '')).toLowerCase();
        return terms.every(term => text.includes(term));
      }).slice(0, 15);

      if (matches.length === 0) {
        dropdown.innerHTML = '<div style="padding:1rem; text-align:center; font-size:0.85rem; color:var(--text-muted);">未找到与 “' + escapeHtml(query) + '” 相关的文章与资讯</div>';
      } else {
        dropdown.innerHTML = matches.map(item => `
          <a href="${item.url}" class="search-result-item">
            <div class="search-item-header">
              <span class="search-item-title">${escapeHtml(item.title)}</span>
              <span class="search-item-badge">${escapeHtml(item.type)}</span>
            </div>
            <div class="search-item-excerpt">${escapeHtml(item.summary)}</div>
          </a>
        `).join('');
      }
      dropdown.style.display = 'block';
    }

    function escapeHtml(str) {
      return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
