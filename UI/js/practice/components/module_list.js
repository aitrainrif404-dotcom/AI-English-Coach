/**
 * ==========================================================================
 * PRACTICE UI COMPONENTS — Module list (module_list.js)
 * Left-pane list for the module view: thumbnail + title + done state.
 * Done (green) / todo (white) comes from ModulePractice progress store.
 * modulepractice.js renders the list through here; markup lives here.
 * Styles: UI/css/practice.css (section 8. MODULE VIEW).
 *
 * API: window.ModuleList.renderList(container, opts)
 * opts: { track, level, items: [{ id, title, desc, type, emoji }],
 *         fallbackEmoji, selectedId, onSelect(item, idx) }
 * Returns selected element (or null). Skeletons are NOT built here —
 * modulepractice.js owns the empty state.
 * ==========================================================================
 */
(function () {
    function esc(s) {
        if (typeof window.escapeHtml === 'function') return window.escapeHtml(s);
        if (typeof escapeHtml === 'function') return escapeHtml(s);
        const div = document.createElement('div');
        div.textContent = (s == null ? '' : String(s));
        return div.innerHTML;
    }

    function doneOf(track, level, id) {
        if (window.ModulePractice && typeof window.ModulePractice.isComplete === 'function') {
            return window.ModulePractice.isComplete(track, level, id);
        }
        return false;
    }

    function renderList(container, opts) {
        if (!container) return null;
        const o = opts || {};
        const track = o.track || 'grammar';
        const level = o.level || '';
        const items = Array.isArray(o.items) ? o.items : [];
        container.innerHTML = '';

        let selectedEl = null;
        items.forEach((item, idx) => {
            const id = item.id || ('module-' + (idx + 1));
            const done = doneOf(track, level, id);
            const btn = document.createElement('button');
            btn.className = 'module-card'
                + (done ? ' is-done' : '')
                + (o.selectedId === id ? ' selected' : '');
            btn.dataset.module = id;
            btn.innerHTML = `
                <span class="module-thumb">${esc(item.emoji || o.fallbackEmoji || '📝')}</span>
                <span class="module-body">
                    <span class="module-title">${esc(item.title || ('Module ' + (idx + 1)))}</span>
                    <span class="caption">${esc(item.desc || '')}</span>
                </span>
                ${done ? '<span class="module-done-badge">✓ Done</span>' : '<span class="module-type">' + esc(item.type || 'Lesson') + '</span>'}
            `;
            btn.addEventListener('click', () => {
                container.querySelectorAll('.module-card').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                if (typeof o.onSelect === 'function') o.onSelect(item, idx);
            });
            if (o.selectedId === id) selectedEl = btn;
            container.appendChild(btn);
        });
        return selectedEl;
    }

    window.ModuleList = { renderList };
})();
